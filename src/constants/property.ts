// Countries
export const COUNTRIES = [
  { value: 'turkiye', label: 'Türkiye' },
  { value: 'dubai', label: 'Dubai' },
] as const;

// Turkish Cities
export const TURKIYE_CITIES = [
  { value: 'istanbul', label: 'Istanbul' },
  { value: 'ankara', label: 'Ankara' },
  { value: 'izmir', label: 'İzmir' },
  { value: 'antalya', label: 'Antalya' },
  { value: 'bursa', label: 'Bursa' },
  { value: 'bodrum', label: 'Bodrum' },
  { value: 'trabzon', label: 'Trabzon' },
  { value: 'mersin', label: 'Mersin' },
  { value: 'alanya', label: 'Alanya' },
  { value: 'fethiye', label: 'Fethiye' },
] as const;

// Istanbul Districts (All 39 official districts)
export const ISTANBUL_DISTRICTS = [
  "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler",
  "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü",
  "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt",
  "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy",
  "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe",
  "Sarıyer", "Silivri", "Sultangazi", "Sultanbeyli", "Şile", "Şişli",
  "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"
] as const;

// Ankara Districts
export const ANKARA_DISTRICTS = [
  "Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan",
  "Altındağ", "Pursaklar", "Gölbaşı", "Polatlı"
] as const;

// İzmir Districts
export const IZMIR_DISTRICTS = [
  "Konak", "Karşıyaka", "Bornova", "Buca", "Bayraklı", "Çiğli",
  "Gaziemir", "Balçova", "Narlıdere", "Güzelbahçe", "Urla", "Çeşme", "Aliağa"
] as const;

// Antalya Districts
export const ANTALYA_DISTRICTS = [
  "Muratpaşa", "Kepez", "Konyaaltı", "Aksu", "Döşemealtı", "Lara", "Kundu",
  "Belek", "Kaş", "Kalkan", "Finike", "Kumluca", "Manavgat", "Side"
] as const;

// Bursa Districts
export const BURSA_DISTRICTS = [
  "Nilüfer", "Osmangazi", "Yıldırım", "Mudanya", "Gemlik", "Gürsu",
  "Kestel", "İnegöl", "Mustafakemalpaşa"
] as const;

// Bodrum Districts
export const BODRUM_DISTRICTS = [
  "Bodrum Merkez", "Yalıkavak", "Gündoğan", "Türkbükü", "Göltürkbükü",
  "Gümüşlük", "Turgutreis", "Bitez", "Ortakent", "Akyarlar"
] as const;

// Trabzon Districts
export const TRABZON_DISTRICTS = [
  "Ortahisar", "Yomra", "Akçaabat", "Araklı", "Of", "Sürmene", "Maçka"
] as const;

// Mersin Districts
export const MERSIN_DISTRICTS = [
  "Mezitli", "Yenişehir", "Toroslar", "Akdeniz", "Tarsus", "Erdemli", "Silifke"
] as const;

// Alanya Districts
export const ALANYA_DISTRICTS = [
  "Merkez", "Mahmutlar", "Kestel", "Oba", "Tosmur", "Avsallar", "Konaklı", "Kargıcak"
] as const;

// Fethiye Districts
export const FETHIYE_DISTRICTS = [
  "Merkez", "Ölüdeniz", "Çalış", "Hisarönü", "Ovacık", "Kayaköy", "Calis"
] as const;

// Dubai Districts/Communities
export const DUBAI_DISTRICTS = [
  "Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay",
  "Dubai Hills Estate", "Arabian Ranches", "Jumeirah Lake Towers (JLT)",
  "Dubai Sports City", "Dubai Silicon Oasis", "International City",
  "Jumeirah Beach Residence (JBR)", "La Mer", "Bluewaters Island",
  "DIFC", "City Walk", "Al Barsha", "Jumeirah Village Circle (JVC)",
  "Damac Hills", "Town Square", "Meydan", "Mohammed Bin Rashid City",
  "Dubai Creek Harbour", "Emaar Beachfront", "Port de La Mer",
  "Madinat Jumeirah Living", "District One", "The Villa", "Mudon",
  "Villanova", "Serena", "Pearl Jumeirah", "Al Wasl"
] as const;

// Legacy exports for backward compatibility
export const REGIONS = [
  { value: 'istanbul', label: 'Turkey - Istanbul' },
  { value: 'bodrum', label: 'Turkey - Bodrum' },
  { value: 'dubai', label: 'Dubai' },
] as const;

export const DUBAI_COMMUNITIES = DUBAI_DISTRICTS;

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'studio', label: 'Studio' },
  { value: 'loft', label: 'Loft' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'office', label: 'Office' },
  { value: 'shop', label: 'Shop' },
  { value: 'hotel-apartment', label: 'Hotel Apartment' },
  { value: 'land', label: 'Land' },
] as const;

export const LAYOUTS = [
  { value: '0+1', label: '0+1 (Studio)' },
  { value: '1+1', label: '1+1' },
  { value: '2+1', label: '2+1' },
  { value: '3+1', label: '3+1' },
  { value: '3.5+1', label: '3.5+1' },
  { value: '4+1', label: '4+1' },
  { value: '4.5+1', label: '4.5+1' },
  { value: '5+1', label: '5+1' },
  { value: '6+1', label: '6+1' },
  { value: '6.5+1', label: '6.5+1' },
  { value: '7+1', label: '7+1' },
  { value: '8+1', label: '8+1' },
  { value: '9+1', label: '9+1' },
  { value: '10+1', label: '10+1' },
  { value: '4+2', label: '4+2' },
  { value: '5+2', label: '5+2' },
  { value: '6+2', label: '6+2' },
  { value: '7+2', label: '7+2' },
  { value: '8+2', label: '8+2' },
  { value: '9+2', label: '9+2' },
  { value: '10+2', label: '10+2' },
  { value: '8+3', label: '8+3' },
  { value: '9+3', label: '9+3' },
  { value: '10+3', label: '10+3' },
] as const;

export const TRANSACTION_TYPES = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
] as const;

export const CONSTRUCTION_STATUSES = [
  { value: 'ready', label: 'Ready to Move' },
  { value: 'under-construction', label: 'Under Construction' },
] as const;

export const BENEFIT_OPTIONS = [
  { value: 'citizenship-eligible', label: 'Citizenship Eligible' },
  { value: 'high-roi', label: 'High ROI' },
  { value: 'rental-yields', label: 'Rental Yields' },
  { value: 'lifestyle', label: 'Lifestyle' },
] as const;

export const DEFAULT_FEATURES = [
  'Fully Furnished',
  'Smart Home System',
  'Central AC',
  'Security 24/7',
  'Parking Space',
  'Swimming Pool'
] as const;

// Get districts based on country and city
export const getDistrictsForCity = (country: string, city: string): readonly string[] => {
  if (country === 'dubai') return DUBAI_DISTRICTS;
  
  if (country === 'turkiye') {
    switch (city) {
      case 'istanbul': return ISTANBUL_DISTRICTS;
      case 'ankara': return ANKARA_DISTRICTS;
      case 'izmir': return IZMIR_DISTRICTS;
      case 'antalya': return ANTALYA_DISTRICTS;
      case 'bursa': return BURSA_DISTRICTS;
      case 'bodrum': return BODRUM_DISTRICTS;
      case 'trabzon': return TRABZON_DISTRICTS;
      case 'mersin': return MERSIN_DISTRICTS;
      case 'alanya': return ALANYA_DISTRICTS;
      case 'fethiye': return FETHIYE_DISTRICTS;
      default: return [];
    }
  }
  
  return [];
};

// Reverse lookup: find which city a district belongs to
export const getCityForDistrict = (country: string, district: string): string => {
  if (!district) return '';
  const normalized = district.trim().toLowerCase();
  if (country === 'dubai') return '';
  const cityMap: Record<string, readonly string[]> = {
    istanbul: ISTANBUL_DISTRICTS,
    ankara: ANKARA_DISTRICTS,
    izmir: IZMIR_DISTRICTS,
    antalya: ANTALYA_DISTRICTS,
    bursa: BURSA_DISTRICTS,
    bodrum: BODRUM_DISTRICTS,
    trabzon: TRABZON_DISTRICTS,
    mersin: MERSIN_DISTRICTS,
    alanya: ALANYA_DISTRICTS,
    fethiye: FETHIYE_DISTRICTS,
  };
  for (const [city, districts] of Object.entries(cityMap)) {
    if (districts.some((d) => d.toLowerCase() === normalized)) return city;
  }
  return '';
};

// Legacy function for backward compatibility
export const getDistrictOptions = (region: string) => {
  if (region === "istanbul") return ISTANBUL_DISTRICTS;
  if (region === "dubai") return DUBAI_DISTRICTS;
  return [];
};

export const getTransactionTypeLabel = (type: string): string => {
  const found = TRANSACTION_TYPES.find(t => t.value === type);
  return found?.label || type;
};
