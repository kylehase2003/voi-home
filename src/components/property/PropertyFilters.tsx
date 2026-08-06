import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyFilters as Filters } from "@/types/property";
import { useTranslation } from "react-i18next";
import { COUNTRIES, TURKIYE_CITIES, getDistrictsForCity } from "@/constants/property";
interface FilterOption {
  value: string;
  label: string;
}
interface PropertyFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | string[]) => void;
  onClearFilters: () => void;
  locationFilter?: string;
  availableAmenities?: string[];
  availableRegions?: FilterOption[];
  availableDistricts?: FilterOption[];
  availablePropertyTypes?: FilterOption[];
  availableLayouts?: FilterOption[];
  availableTransactionTypes?: FilterOption[];
  availableBenefits?: FilterOption[];
  availableStatuses?: FilterOption[];
}
export const PropertyFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  locationFilter = "all",
  availableAmenities = [],
  availablePropertyTypes = [],
  availableLayouts = [],
  availableTransactionTypes = [],
  availableBenefits = [],
  availableStatuses = []
}: PropertyFiltersProps) => {
  const {
    t
  } = useTranslation();
  const isDubai = locationFilter === "dubai";
  const labelClass = `text-sm font-medium mb-2 block transition-colors duration-500 ${isDubai ? "text-white" : "text-foreground"}`;
  const inputClass = isDubai ? "bg-[hsl(0,0%,15%)] border-white/20 text-white placeholder:text-white/70" : "bg-background";
  const selectContentClass = isDubai ? "z-[60] bg-[hsl(0,0%,15%)] border-white/20 text-white" : "z-[60] bg-background";

  // Helper to translate dynamic filter values
  const translateWith = (namespace: string, value: string) => {
    const key = `properties.${namespace}.${value}`;
    const translated = t(key);
    return translated !== key ? translated : value;
  };
  const translateBenefit = (v: string) => translateWith('benefitValues', v);
  const translateAmenity = (v: string) => translateWith('amenityValues', v);
  const translateTransaction = (v: string) => translateWith('transactionValues', v);
  const translateStatus = (v: string) => translateWith('statusValues', v);
  const translateCountry = (v: string) => translateWith('countryValues', v);
  const translateCity = (v: string) => translateWith('cityValues', v);
  const translatePropertyType = (v: string) =>
    v.split(',').map(s => s.trim()).filter(Boolean).map(s => translateWith('propertyTypeValues', s)).join(', ');
  const translateLayout = (v: string) => {
    if (v === '0+1') return t('properties.studioLayout', { defaultValue: '0+1 (Studio)' });
    // Layouts like "1+1", "2+1" are language-agnostic; return as-is.
    return v;
  };

  // Local state for dynamic districts
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [customCities, setCustomCities] = useState<string[]>([]);

  // Load custom cities from localStorage
  useEffect(() => {
    const storedCustomCities = JSON.parse(localStorage.getItem('property_custom_cities') || '[]');
    setCustomCities(storedCustomCities);
  }, []);

  // Load districts when country or city changes
  useEffect(() => {
    const country = filters.country || "";
    const city = filters.city || "";
    if (country === 'dubai') {
      // For Dubai, load districts directly from country
      const defaultDistricts = [...getDistrictsForCity('dubai', '')];
      const customDistricts = JSON.parse(localStorage.getItem('property_custom_districts') || '[]');
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else if (country === 'turkiye' && city) {
      // For Turkey, load districts based on selected city
      const defaultDistricts = [...getDistrictsForCity('turkiye', city)];
      const customDistricts = JSON.parse(localStorage.getItem('property_custom_districts') || '[]');
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else {
      setAvailableDistricts([]);
    }
  }, [filters.country, filters.city]);

  // Get city options for Turkey (predefined + custom)
  const getCityOptions = () => {
    const predefinedCities = TURKIYE_CITIES.map(c => ({
      value: c.value,
      label: c.label
    }));
    const customCityOptions = customCities.map(c => ({
      value: c.toLowerCase().replace(/\s+/g, '-'),
      label: c
    }));
    return [...predefinedCities, ...customCityOptions];
  };

  // Handle country change
  const handleCountryChange = (value: string) => {
    onFilterChange("country", value);
    onFilterChange("city", "");
    onFilterChange("district", "");
    // Also update region to maintain compatibility with useProperties
    onFilterChange("region", value === "all" ? "" : value);
  };

  // Handle city change
  const handleCityChange = (value: string) => {
    onFilterChange("city", value);
    onFilterChange("district", "");
  };
  return <div className="space-y-4">
      {/* 1. Country */}
      <div>
        <label className={labelClass}>{t("properties.country")}</label>
        <Select value={filters.country || ""} onValueChange={handleCountryChange}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder={t("hero.selectCountry")} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">{t("properties.allCountries")}</SelectItem>
            {COUNTRIES.map(country => <SelectItem key={country.value} value={country.value}>
                {translateCountry(country.value)}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 2. City - Only show for Turkey */}
      {filters.country === 'turkiye' && <div>
          <label className={labelClass}>{t("properties.city")}</label>
          <Select value={filters.city || ""} onValueChange={handleCityChange}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder={t("hero.selectCity")} />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="all">{t("properties.allCities")}</SelectItem>
              {getCityOptions().map(city => <SelectItem key={city.value} value={city.value}>
                  {translateCity(city.value)}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>}

      {/* 3. District/Area - Show for Dubai or when Turkey city is selected */}
      {(filters.country === 'dubai' || filters.country === 'turkiye' && filters.city && filters.city !== 'all') && availableDistricts.length > 0 && <div>
          <label className={labelClass}>{t("properties.district")}</label>
          <Select value={filters.district || ""} onValueChange={v => onFilterChange("district", v)}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder={t("properties.allDistricts")} />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="all">{t("properties.allDistricts")}</SelectItem>
              {availableDistricts.map(district => <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>}

      {/* 4. Property Type */}
      <div>
        <label className={labelClass}>{t("properties.propertyType")}</label>
        <Select value={filters.propertyType} onValueChange={v => onFilterChange("propertyType", v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder={t("properties.allTypes")} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">{t("properties.allTypes")}</SelectItem>
            {availablePropertyTypes.map(type => <SelectItem key={type.value} value={type.value}>
                {translatePropertyType(type.value)}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 5. Layout */}
      <div>
        <label className={labelClass}>{t("properties.layout")}</label>
        <Select value={filters.layout} onValueChange={v => onFilterChange("layout", v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder={t("properties.allLayouts")} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">{t("properties.allLayouts")}</SelectItem>
            {availableLayouts.map(layout => <SelectItem key={layout.value} value={layout.value}>
                {translateLayout(layout.value)}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 6. Price Range */}
      <div>
        <label className={labelClass}>{t("properties.priceRange")}</label>
        <div className="flex gap-2">
          <Input type="number" placeholder={t("properties.minPrice")} value={filters.minPrice} onChange={e => onFilterChange("minPrice", e.target.value)} className={inputClass} step="10000" min="0" />
          <Input type="number" placeholder={t("properties.maxPrice")} value={filters.maxPrice} onChange={e => onFilterChange("maxPrice", e.target.value)} className={inputClass} step="10000" min="0" />
        </div>
      </div>

      {/* 7. Transaction Type */}
      <div>
        <label className={labelClass}>{t("properties.transactionType")}</label>
        <Select value={filters.transactionType} onValueChange={v => onFilterChange("transactionType", v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder={t("properties.allTypes")} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">{t("properties.allTypes")}</SelectItem>
            {availableTransactionTypes.map(type => <SelectItem key={type.value} value={type.value}>
                {translateTransaction(type.value)}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 8. Status */}
      <div>
        <label className={labelClass}>{t("properties.status")}</label>
        <Select value={filters.constructionStatus} onValueChange={v => onFilterChange("constructionStatus", v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder={t("properties.all")} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">{t("properties.all")}</SelectItem>
            {availableStatuses.map(status => <SelectItem key={status.value} value={status.value}>
                {translateStatus(status.value)}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 9. Benefits - Checkboxes */}
      <div>
        <label className={labelClass}>{t("properties.benefits")}</label>
        <div className={`space-y-3 max-h-[200px] overflow-y-auto border rounded-md p-3 ${isDubai ? "bg-[hsl(0,0%,15%)] border-white/20" : "bg-background"}`}>
          {availableBenefits.length > 0 ? availableBenefits.map(benefit => <div key={benefit.value} className="flex items-center space-x-2 gap-[8px]">
                <Checkbox id={`benefit-${benefit.value}`} checked={filters.benefits?.includes(benefit.value) || filters.benefit === benefit.value} onCheckedChange={checked => {
            const currentBenefits = filters.benefits || [];
            const newBenefits = checked ? [...currentBenefits, benefit.value] : currentBenefits.filter(b => b !== benefit.value);
            onFilterChange("benefits", newBenefits);
            // Also clear legacy single benefit when using multi-select
            if (filters.benefit) {
              onFilterChange("benefit", "");
            }
          }} className={isDubai ? "border-white/20 bg-[hsl(0,0%,20%)] data-[state=checked]:bg-gold data-[state=checked]:border-gold" : ""} />
                <label htmlFor={`benefit-${benefit.value}`} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer transition-colors duration-500 ${isDubai ? "text-white" : ""}`}>
                  {translateBenefit(benefit.value)}
                </label>
              </div>) : <p className="text-sm text-muted-foreground">{t("properties.noBenefits")}</p>}
        </div>
      </div>

      {/* 10. Amenities */}
      <div>
        <label className={labelClass}>{t("properties.amenities")}</label>
        <div className={`space-y-3 max-h-[300px] overflow-y-auto border rounded-md p-3 ${isDubai ? "bg-[hsl(0,0%,15%)] border-white/20" : "bg-background"}`}>
          {availableAmenities.length > 0 ? availableAmenities.map(amenity => <div key={amenity} className="flex items-center space-x-2 gap-[8px]">
                <Checkbox id={amenity} checked={filters.amenities?.includes(amenity)} onCheckedChange={checked => {
            const currentAmenities = filters.amenities || [];
            const newAmenities = checked ? [...currentAmenities, amenity] : currentAmenities.filter(a => a !== amenity);
            onFilterChange("amenities", newAmenities);
          }} className={isDubai ? "border-white/20 bg-[hsl(0,0%,20%)] data-[state=checked]:bg-gold data-[state=checked]:border-gold" : ""} />
                <label htmlFor={amenity} className={`text-sm text-secondary-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer transition-colors duration-500 ${isDubai ? "text-white" : ""}`}>
                  {translateAmenity(amenity)}
                </label>
              </div>) : <p className="text-sm text-muted-foreground">{t("properties.noAmenities")}</p>}
        </div>
      </div>

      <Button variant="outline" className={`w-full ${isDubai ? "bg-[hsl(0,0%,15%)] border-white/20 text-white " : ""}`} onClick={onClearFilters}>
        {t("properties.clearFilters")}
      </Button>
    </div>;
};