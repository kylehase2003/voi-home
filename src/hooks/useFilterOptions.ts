import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOptions {
  regions: FilterOption[];
  districts: FilterOption[];
  propertyTypes: FilterOption[];
  layouts: FilterOption[];
  transactionTypes: FilterOption[];
  benefits: FilterOption[];
  statuses: FilterOption[];
  amenities: string[];
}

/**
 * Custom hook to fetch and manage all filter options from dashboard and database
 */
const CUSTOM_DISTRICTS_KEY = 'property_custom_districts';

export const useFilterOptions = (selectedRegion?: string) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    regions: [],
    districts: [],
    propertyTypes: [],
    layouts: [],
    transactionTypes: [],
    benefits: [],
    statuses: [],
    amenities: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch main filter options from database and localStorage
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);

        // Fetch all properties data for filter options
        const { data, error } = await supabase
          .from('properties')
          .select('region, district, property_type, layout, transaction_type, benefit, construction_status, status, features');

        if (error) throw error;

        // === REGIONS ===
        const defaultLocations = ['Dubai', 'Turkey', 'Istanbul'];
        const hiddenLocations = JSON.parse(localStorage.getItem('hidden_default_locations') || '[]');
        const customLocations = JSON.parse(localStorage.getItem('property_custom_locations') || '[]');
        const activeDefaultLocations = defaultLocations.filter(loc => !hiddenLocations.includes(loc));
        const allLocations = [...activeDefaultLocations, ...customLocations];

        const uniqueRegions = new Set<string>();
        data?.forEach(property => {
          if (property.region) {
            const matchesAllowed = allLocations.some(loc =>
              property.region.toLowerCase().includes(loc.toLowerCase())
            );
            if (matchesAllowed) {
              uniqueRegions.add(property.region); // Keep original case
            }
          }
        });

        const regions = Array.from(uniqueRegions)
          .map(region => ({
            value: region, // Keep original case for matching
            label: region.charAt(0).toUpperCase() + region.slice(1),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        // === PROPERTY TYPES ===
        const customPropertyTypes = JSON.parse(localStorage.getItem('property_custom_types') || '[]');
        const uniquePropertyTypes = new Set<string>();
        data?.forEach(property => {
          if (property.property_type) uniquePropertyTypes.add(property.property_type);
        });
        customPropertyTypes.forEach((type: string) => uniquePropertyTypes.add(type));

        const propertyTypes = Array.from(uniquePropertyTypes)
          .map(type => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        // === LAYOUTS ===
        // Split comma-separated layouts into individual options
        const uniqueLayouts = new Set<string>();
        data?.forEach(property => {
          if (property.layout) {
            // Split by comma and trim each value
            const layoutValues = property.layout.split(',').map(l => l.trim()).filter(l => l);
            layoutValues.forEach(l => uniqueLayouts.add(l));
          }
        });

        const layouts = Array.from(uniqueLayouts)
          .map(layout => ({
            value: layout,
            label: layout === '0+1' ? '0+1 (Studio)' : layout,
          }))
          .sort((a, b) => {
            const aNum = parseFloat(a.value);
            const bNum = parseFloat(b.value);
            if (isNaN(aNum) && isNaN(bNum)) return a.value.localeCompare(b.value);
            if (isNaN(aNum)) return 1;
            if (isNaN(bNum)) return -1;
            return aNum - bNum;
          });

        // === TRANSACTION TYPES ===
        const customTransactionTypes = JSON.parse(localStorage.getItem('property_custom_transaction_types') || '[]');
        const uniqueTransactionTypes = new Set<string>();
        data?.forEach(property => {
          if (property.transaction_type) uniqueTransactionTypes.add(property.transaction_type);
        });
        customTransactionTypes.forEach((type: string) => uniqueTransactionTypes.add(type));

        const transactionTypes = Array.from(uniqueTransactionTypes)
          .map(type => ({
            value: type,
            label: type === 'sale' ? 'For Sale' : type === 'rent' ? 'For Rent' : type.charAt(0).toUpperCase() + type.slice(1),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        // === BENEFITS ===
        // Split comma-separated benefits into individual options
        const customBenefits = JSON.parse(localStorage.getItem('property_custom_benefits') || '[]');
        const uniqueBenefits = new Set<string>();
        data?.forEach(property => {
          if (property.benefit) {
            // Split by comma and trim each value
            const benefitValues = property.benefit.split(',').map(b => b.trim()).filter(b => b);
            benefitValues.forEach(b => uniqueBenefits.add(b));
          }
        });
        customBenefits.forEach((benefit: string) => uniqueBenefits.add(benefit));

        const benefits = Array.from(uniqueBenefits)
          .map(benefit => ({
            value: benefit,
            label: benefit.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        // === STATUSES ===
        // Combine both property status and construction status
        const customStatuses = JSON.parse(localStorage.getItem('property_custom_statuses') || '[]');
        const uniqueStatuses = new Set<string>();
        
        // Normalize hyphen/underscore variants so "under_construction" and
        // "under-construction" collapse into a single option.
        const normalizeStatus = (s: string) => s.replace(/_/g, '-').toLowerCase();
        const addStatus = (s?: string | null) => {
          if (s) uniqueStatuses.add(normalizeStatus(s));
        };

        data?.forEach(property => {
          addStatus(property.construction_status);
          addStatus(property.status);
        });

        ['available', 'sold', 'rented'].forEach(addStatus);
        customStatuses.forEach((status: string) => addStatus(status));

        const statuses = Array.from(uniqueStatuses)
          .map(status => ({
            value: status,
            label:
              status === 'ready'
                ? 'Ready to Move'
                : status === 'under-construction'
                ? 'Under Construction'
                : status === 'available'
                ? 'Available'
                : status === 'sold'
                ? 'Sold'
                : status === 'rented'
                ? 'Rented'
                : status.charAt(0).toUpperCase() + status.slice(1),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        // === AMENITIES ===
        const allAmenities = new Set<string>();
        data?.forEach(property => {
          if (Array.isArray(property.features)) {
            property.features.forEach(feature => {
              if (feature && typeof feature === 'string') {
                allAmenities.add(feature);
              }
            });
          }
        });

        const amenities = Array.from(allAmenities).sort();

        setFilterOptions({
          regions,
          districts: [], // Will be loaded separately based on region
          propertyTypes,
          layouts,
          transactionTypes,
          benefits,
          statuses,
          amenities,
        });
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Load districts based on selected region
  useEffect(() => {
    if (!selectedRegion || selectedRegion === 'all') {
      setFilterOptions(prev => ({ ...prev, districts: [] }));
      return;
    }

    let districts: string[] = [];

    // Check for region-specific custom districts stored by dashboard
    if (selectedRegion.toLowerCase().includes('dubai')) {
      districts = JSON.parse(localStorage.getItem('property_custom_districts_dubai') || '[]');
    } else if (selectedRegion.toLowerCase().includes('turkey') || selectedRegion.toLowerCase().includes('istanbul')) {
      districts = JSON.parse(localStorage.getItem('property_custom_districts_turkey') || '[]');
    }
    
    // Also load general custom districts
    const generalCustomDistricts = JSON.parse(localStorage.getItem(CUSTOM_DISTRICTS_KEY) || '[]');
    
    // Combine and deduplicate
    const allDistricts = [...new Set([...districts, ...generalCustomDistricts])];

    const districtOptions = allDistricts
      .map(district => ({
        value: district,
        label: district,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setFilterOptions(prev => ({ ...prev, districts: districtOptions }));
  }, [selectedRegion]);

  return { filterOptions, loading };
};
