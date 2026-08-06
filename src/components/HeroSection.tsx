import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import { COUNTRIES, TURKIYE_CITIES, getDistrictsForCity } from "@/constants/property";
import { useFilterOptions } from "@/hooks/useFilterOptions";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Filter state
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [layout, setLayout] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // Use the same filter options hook as the Properties page
  const { filterOptions } = useFilterOptions(country);

  // Local state for districts (based on country/city selection)
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [customCities, setCustomCities] = useState<string[]>([]);

  // Load custom cities from localStorage
  useEffect(() => {
    const storedCustomCities = JSON.parse(localStorage.getItem('property_custom_cities') || '[]');
    setCustomCities(storedCustomCities);
  }, []);

  // Reset city and district when country changes
  useEffect(() => {
    setCity("");
    setDistrict("");
    setAvailableDistricts([]);
  }, [country]);

  // Load districts when city changes (or country for Dubai)
  useEffect(() => {
    setDistrict("");
    
    if (country === 'dubai') {
      const defaultDistricts = [...getDistrictsForCity('dubai', '')];
      const customDistricts = JSON.parse(localStorage.getItem('property_custom_districts') || '[]');
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else if (country === 'turkiye' && city) {
      const defaultDistricts = [...getDistrictsForCity('turkiye', city)];
      const customDistricts = JSON.parse(localStorage.getItem('property_custom_districts') || '[]');
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else {
      setAvailableDistricts([]);
    }
  }, [country, city]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (country) params.append("country", country);
    if (city) params.append("city", city);
    if (district) params.append("district", district);
    if (propertyType) params.append("property_type", propertyType);
    if (layout) params.append("layout", layout);
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    navigate(`/properties?${params.toString()}`);
  };

  // Get city options for Turkey (predefined + custom)
  const getCityOptions = () => {
    const predefinedCities = TURKIYE_CITIES.map(c => ({ value: c.value, label: c.label }));
    const customCityOptions = customCities.map(c => ({ value: c.toLowerCase().replace(/\s+/g, '-'), label: c }));
    return [...predefinedCities, ...customCityOptions];
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-44 pb-20 md:pt-32 md:pb-20">
      {/* Hero background video */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/hero-background.mp4"
          poster={heroIstanbul1}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p role="heading" aria-level={2} className={`text-3xl md:text-6xl text-primary-foreground mb-3 md:mb-6 leading-tight whitespace-pre-line ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
          {t("hero.title")}
          <span className="block text-gold text-xl md:text-3xl font-normal mt-2 md:mt-4 whitespace-normal">
            {t("hero.subtitle")}
          </span>
        </p>

        <div style={{ animationDelay: "0.6s" }} className="w-full bg-white/10 backdrop-blur-xl rounded-lg p-4 md:p-6 shadow-luxury animate-fade-in border border-white/20 my-0">
          <div className={`grid grid-cols-1 md:grid-cols-4 ${country === 'turkiye' ? 'lg:grid-cols-7' : 'lg:grid-cols-6'} gap-2`}>
            {/* Country Select */}
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="bg-background" aria-label={t("hero.selectCountry")}>
                <SelectValue placeholder={t("hero.selectCountry")} />
              </SelectTrigger>
              <SelectContent className="z-[60] bg-background">
                {COUNTRIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Select - Only show for Turkey */}
            {country === 'turkiye' ? (
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-background" aria-label={t("hero.selectCity")}>
                  <SelectValue placeholder={t("hero.selectCity")} />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-background max-h-[300px]">
                  {getCityOptions().map(c => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              /* District Select - Show when country is Dubai or when Turkey city is selected */
              <Select 
                value={district} 
                onValueChange={setDistrict} 
                disabled={!country || (country === 'turkiye' && !city) || availableDistricts.length === 0}
              >
                <SelectTrigger className="bg-background" aria-label={t("hero.selectDistrict")}>
                  <SelectValue placeholder={t("hero.selectDistrict")} />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-background max-h-[300px]">
                  {availableDistricts.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* District Select for Turkey (when city is selected) */}
            {country === 'turkiye' && (
              <Select 
                value={district} 
                onValueChange={setDistrict} 
                disabled={!city || availableDistricts.length === 0}
              >
                <SelectTrigger className="bg-background" aria-label={t("hero.selectDistrict")}>
                  <SelectValue placeholder={t("hero.selectDistrict")} />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-background max-h-[300px]">
                  {availableDistricts.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-background" aria-label={t("hero.selectPropertyType")}>
                <SelectValue placeholder={t("hero.selectPropertyType")} />
              </SelectTrigger>
              <SelectContent className="z-[60] bg-background">
                {filterOptions.propertyTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={layout} onValueChange={setLayout}>
              <SelectTrigger className="bg-background" aria-label={t("hero.selectLayout")}>
                <SelectValue placeholder={t("hero.selectLayout")} />
              </SelectTrigger>
              <SelectContent className="z-[60] bg-background">
                {filterOptions.layouts.map(l => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder={t("hero.minPrice")}
              aria-label={t("hero.minPrice")}
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="bg-background"
              step="10000"
              min="0"
            />

            <Input
              type="number"
              placeholder={t("hero.maxPrice")}
              aria-label={t("hero.maxPrice")}
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="bg-background"
              step="10000"
              min="0"
            />
          </div>

          <Button onClick={handleSearch} className="bg-gold hover:bg-gold/90 text-white w-full mt-4">
            <Search className="mr-2 h-4 w-4 text-white" />
            {t("hero.search")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
