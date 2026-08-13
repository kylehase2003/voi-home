import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Property, PropertyFilters, PaymentPlan, NearbyPlace, FloorPlan } from '@/types/property';
import { getDistrictsForCity, TURKIYE_CITIES } from '@/constants/property';

const normalizeLocationText = (value?: string | null) =>
  (value || '')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getCityAliases = (city: string) => {
  const normalizedCity = normalizeLocationText(city);
  const cityOption = TURKIYE_CITIES.find((option) =>
    normalizeLocationText(option.value) === normalizedCity ||
    normalizeLocationText(option.label) === normalizedCity
  );

  return Array.from(new Set([
    normalizedCity,
    cityOption ? normalizeLocationText(cityOption.value) : '',
    cityOption ? normalizeLocationText(cityOption.label) : '',
  ].filter(Boolean)));
};

const propertyMatchesCity = (property: { region?: string | null; location?: string | null; district?: string | null }, city: string) => {
  const cityAliases = getCityAliases(city);
  if (cityAliases.length === 0) return true;

  const normalizedRegion = normalizeLocationText(property.region);
  const normalizedLocation = normalizeLocationText(property.location);
  const normalizedDistrict = normalizeLocationText(property.district);

  if (cityAliases.some((alias) => normalizedRegion.includes(alias) || normalizedLocation.includes(alias))) {
    return true;
  }

  const cityOption = TURKIYE_CITIES.find((option) =>
    cityAliases.includes(normalizeLocationText(option.value)) ||
    cityAliases.includes(normalizeLocationText(option.label))
  );
  const cityDistricts = cityOption ? getDistrictsForCity('turkiye', cityOption.value) : [];

  return cityDistricts.some((district) => {
    const normalizedKnownDistrict = normalizeLocationText(district);
    return normalizedDistrict === normalizedKnownDistrict || normalizedDistrict.includes(normalizedKnownDistrict);
  });
};

export const useProperties = (filters?: PropertyFilters, featured?: boolean) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [filters, featured]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('properties')
        .select('*')
        .neq('status', 'draft'); // Always exclude draft properties from public view

      if (featured) {
        query = query.eq('is_featured', true).limit(2);
      }

      if (filters?.region && filters.region !== 'all') {
        // Normalize region filter for database query
        // Database may have "Turkey" while filter sends "turkiye"
        const regionValue = filters.region.toLowerCase();
        if (regionValue === 'turkiye' || regionValue === 'turkey') {
          query = query.or('location.ilike.%Turkey%,location.ilike.%Türkiye%,region.ilike.%Turkey%,region.ilike.%Türkiye%,region.ilike.%Turkiye%,region.ilike.%Istanbul%,region.ilike.%İstanbul%');
        } else if (regionValue === 'dubai') {
          query = query.or('location.ilike.%Dubai%,region.ilike.%Dubai%');
        } else {
          query = query.ilike('region', `%${filters.region}%`);
        }
      }

      if (filters?.district && filters.district !== 'all') {
        query = query.eq('district', filters.district);
      }

      if (filters?.propertyType && filters.propertyType !== 'all') {
        // Use case-insensitive matching for property type (may be comma-separated in DB)
        query = query.ilike('property_type', `%${filters.propertyType}%`);
      }

      if (filters?.layout && filters.layout !== 'all') {
        // Use ilike to match within comma-separated layout values
        query = query.ilike('layout', `%${filters.layout}%`);
      }

      if (filters?.transactionType && filters.transactionType !== 'all') {
        query = query.eq('transaction_type', filters.transactionType);
      }

      if (filters?.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }

      if (filters?.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      if (filters?.constructionStatus && filters.constructionStatus !== 'all') {
        // Match against both `status` and `construction_status`, accounting for
        // hyphen/underscore variants (e.g. "under-construction" vs "under_construction").
        const selected = filters.constructionStatus;
        const variants = Array.from(new Set([
          selected,
          selected.replace(/-/g, '_'),
          selected.replace(/_/g, '-'),
        ]));
        const orClauses = variants
          .flatMap(v => [`status.eq.${v}`, `construction_status.eq.${v}`])
          .join(',');
        query = query.or(orClauses);
      }

      // Legacy single benefit filter
      if (filters?.benefit && filters.benefit !== 'all') {
        query = query.ilike('benefit', `%${filters.benefit}%`);
      }

      // Benefits array filter - filter properties that have ANY of the selected benefits
      // Note: We'll filter client-side after fetching since benefits are comma-separated text
      const benefitsFilter = filters?.benefits && filters.benefits.length > 0 ? filters.benefits : null;

      if (filters?.amenities && filters.amenities.length > 0) {
        // Filter properties that have ALL selected amenities
        // Use cs (contains) operator for JSONB array filtering
        query = query.filter('features', 'cs', JSON.stringify(filters.amenities));
      }

      const { data, error: fetchError } = await query.order('title', { ascending: false });

      if (fetchError) throw fetchError;
      
      // Apply client-side city filter because properties store city via region/district data
      let filteredData = data || [];
      if (filters?.city && filters.city !== 'all') {
        filteredData = filteredData.filter(property => propertyMatchesCity(property, filters.city || ''));
      }

      // Apply client-side benefits filter if needed
      if (benefitsFilter && benefitsFilter.length > 0) {
        filteredData = filteredData.filter(property => {
          if (!property.benefit) return false;
          const propertyBenefits = property.benefit.split(',').map(b => b.trim().toLowerCase());
          return benefitsFilter.some(fb => 
            propertyBenefits.some(pb => pb.includes(fb.toLowerCase()) || fb.toLowerCase().includes(pb))
          );
        });
      }

      const mappedProperties: Property[] = filteredData.map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images as string[] : [],
        features: Array.isArray(item.features) ? item.features as string[] : [],
        payment_plans: Array.isArray(item.payment_plans) ? item.payment_plans as unknown as PaymentPlan[] : [],
        nearby_places: Array.isArray(item.nearby_places) ? item.nearby_places as unknown as NearbyPlace[] : [],
        floor_plans: Array.isArray(item.floor_plans) ? item.floor_plans as unknown as FloorPlan[] : [],
        transaction_type: item.transaction_type as 'sale' | 'rent' | 'commercial',
        status: item.status as 'available' | 'sold' | 'rented',
        map_embed_url: item.map_embed_url || null,
        area_population: item.area_population || null,
        area_sex_ratio_male: item.area_sex_ratio_male || null,
        area_sex_ratio_female: item.area_sex_ratio_female || null,
        area_class: item.area_class || null,
        investment_return_1y: item.investment_return_1y || null,
        investment_return_3y: item.investment_return_3y || null,
        investment_return_5y: item.investment_return_5y || null,
        why_this_property: item.why_this_property || null,
        why_this_property_ar: item.why_this_property_ar || null,
        blocks: item.blocks || null,
        floors: item.floors || null,
        rental_yield: item.rental_yield || null,
        down_payment_percentage: item.down_payment_percentage || null,
        benefit: item.benefit || null,
        benefit_ar: item.benefit_ar || null,
        delivery_date: item.delivery_date || null,
        title_deed: item.title_deed || null,
        title_ar: item.title_ar || null,
        description_ar: item.description_ar || null,
      }));
      
      setProperties(mappedProperties);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, error, refetch: fetchProperties };
};

export const useProperty = (slug?: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  const fetchProperty = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        const propertyData: Property = {
          ...data,
          images: Array.isArray(data.images) ? data.images as string[] : [],
          features: Array.isArray(data.features) ? data.features as string[] : [],
          payment_plans: Array.isArray(data.payment_plans) ? data.payment_plans as unknown as PaymentPlan[] : [],
          nearby_places: Array.isArray(data.nearby_places) ? data.nearby_places as unknown as NearbyPlace[] : [],
          floor_plans: Array.isArray(data.floor_plans) ? data.floor_plans as unknown as FloorPlan[] : [],
          transaction_type: data.transaction_type as 'sale' | 'rent' | 'commercial',
          status: data.status as 'available' | 'sold' | 'rented',
          map_embed_url: data.map_embed_url || null,
          area_population: data.area_population || null,
          area_sex_ratio_male: data.area_sex_ratio_male || null,
          area_sex_ratio_female: data.area_sex_ratio_female || null,
          area_class: data.area_class || null,
          investment_return_1y: data.investment_return_1y || null,
          investment_return_3y: data.investment_return_3y || null,
          investment_return_5y: data.investment_return_5y || null,
          why_this_property: data.why_this_property || null,
          why_this_property_ar: data.why_this_property_ar || null,
          blocks: data.blocks || null,
          floors: data.floors || null,
          rental_yield: data.rental_yield || null,
          down_payment_percentage: data.down_payment_percentage || null,
          installments_count: data.installments_count || null,
          benefit: data.benefit || null,
          benefit_ar: data.benefit_ar || null,
          delivery_date: data.delivery_date || null,
          title_deed: data.title_deed || null,
          title_ar: data.title_ar || null,
          description_ar: data.description_ar || null,
        };
        setProperty(propertyData);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { property, loading, error, refetch: fetchProperty };
};
