export interface PaymentPlan {
  period: string;
  amount: number;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  icon: string;
}

export interface FloorPlan {
  title: string;
  subtitle: string; // price_min or legacy single price
  price_max?: string; // optional max price for range
  area: string; // area_min or legacy single area
  area_max?: string; // optional max area for range
  image_url: string;
}

export interface Property {
  id: string;
  title: string;
  title_ar?: string | null;
  title_ru?: string | null;
  location: string;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqm: number | null;
  transaction_type: 'sale' | 'rent' | 'commercial';
  property_type: string;
  region: string;
  district: string | null;
  layout: string | null;
  images: string[];
  description: string;
  description_ar?: string | null;
  description_ru?: string | null;
  long_description?: string | null;
  long_description_ar?: string | null;
  long_description_ru?: string | null;
  features: string[];
  year_built: number | null;
  status: 'available' | 'sold' | 'rented' | 'draft';
  is_featured: boolean;
  slug: string;
  furnished: boolean | null;
  gated_community: boolean | null;
  construction_status: string | null;
  property_id: string | null;
  completion_date: string | null;
  plot_ratio: string | null;
  clear_height: string | null;
  payment_plans: PaymentPlan[];
  nearby_places: NearbyPlace[];
  floor_plans: FloorPlan[];
  video_url: string | null;
  map_embed_url: string | null;
  map_link_url: string | null;
  latitude: number | null;
  longitude: number | null;
  area_population: string | null;
  area_sex_ratio_male: string | null;
  area_sex_ratio_female: string | null;
  area_class: string | null;
  investment_return_1y: string | null;
  investment_return_3y: string | null;
  investment_return_5y: string | null;
  why_this_property: string | null;
  why_this_property_ar?: string | null;
  why_this_property_ru?: string | null;
  blocks: number | null;
  floors: number | null;
  rental_yield: string | null;
  down_payment_percentage: string | null;
  installments_count: number | null;
  benefit: string | null;
  benefit_ar?: string | null;
  benefit_ru?: string | null;
  delivery_date: string | null;
  title_deed: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyFilters {
  country?: string;
  city?: string;
  region?: string;
  district?: string;
  propertyType?: string;
  layout?: string;
  transactionType?: string;
  minPrice?: string;
  maxPrice?: string;
  constructionStatus?: string;
  benefit?: string;
  benefits?: string[];
  amenities?: string[];
}
