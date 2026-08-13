import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2, X, Building, CalendarIcon, Edit, School, ShoppingBag, UtensilsCrossed, Hospital, Trees, Waves, Train, Plane, Church, Dumbbell, Pill, Landmark, Store, Fuel, ShieldCheck, Coffee, GraduationCap, ParkingCircle, Heart, Building2, GripVertical, Milestone, Flame, Film, Baby, Sparkles, TowerControl, LayoutGrid, Bus, LandPlot, Library, Presentation, Sailboat, Eye, EyeOff, ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';
import RichTextEditor from '@/components/dashboard/RichTextEditor';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { MultiImageUpload } from '@/components/dashboard/MultiImageUpload';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { Property, PaymentPlan, NearbyPlace, FloorPlan } from '@/types/property';
import { ResponsiveTable, MobileCard, MobileCardRow } from '@/components/dashboard/ResponsiveTable';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import MapPicker from '@/components/dashboard/MapPicker';
import { LanguageTabs } from '@/components/dashboard/LanguageTabs';
import { DeletableSelect } from '@/components/dashboard/DeletableSelect';
import { MultiSelectCheckbox } from '@/components/dashboard/MultiSelectCheckbox';
import { RestoreHiddenOptions } from '@/components/dashboard/RestoreHiddenOptions';
import { DeleteConfirmDialog } from '@/components/dashboard/DeleteConfirmDialog';
import { useCustomOptions, STORAGE_KEYS, DEFAULT_OPTIONS, CATEGORY_CONFIGS } from '@/hooks/useCustomOptions';

// ==================== CONSTANTS ====================

import { COUNTRIES, TURKIYE_CITIES, getDistrictsForCity, DUBAI_DISTRICTS, getCityForDistrict } from '@/constants/property';

const COUNTRIES_OPTIONS = COUNTRIES;
const TURKIYE_CITIES_OPTIONS = TURKIYE_CITIES;

const NEARBY_PLACE_ICONS = [
  { value: 'School', label: 'School', icon: School },
  { value: 'ShoppingBag', label: 'Shopping Mall', icon: ShoppingBag },
  { value: 'UtensilsCrossed', label: 'Restaurant', icon: UtensilsCrossed },
  { value: 'Hospital', label: 'Hospital', icon: Hospital },
  { value: 'Trees', label: 'Park', icon: Trees },
  { value: 'Waves', label: 'Beach', icon: Waves },
  { value: 'Train', label: 'Metro/Train', icon: Train },
  { value: 'Plane', label: 'Airport', icon: Plane },
  { value: 'Church', label: 'Mosque/Church', icon: Church },
  { value: 'Dumbbell', label: 'Gym', icon: Dumbbell },
  { value: 'Pill', label: 'Pharmacy', icon: Pill },
  { value: 'Landmark', label: 'Bank', icon: Landmark },
  { value: 'Store', label: 'Supermarket', icon: Store },
  { value: 'Fuel', label: 'Gas Station', icon: Fuel },
  { value: 'ShieldCheck', label: 'Police Station', icon: ShieldCheck },
  { value: 'Coffee', label: 'Cafe', icon: Coffee },
  { value: 'GraduationCap', label: 'University', icon: GraduationCap },
  { value: 'ParkingCircle', label: 'Parking', icon: ParkingCircle },
  { value: 'Heart', label: 'Healthcare', icon: Heart },
  { value: 'Building2', label: 'Office', icon: Building2 },
  { value: 'Milestone', label: 'Highway', icon: Milestone },
  { value: 'TowerControl', label: 'Bridge', icon: TowerControl },
  { value: 'LayoutGrid', label: 'Square', icon: LayoutGrid },
  { value: 'Bus', label: 'Bus Station', icon: Bus },
  { value: 'LandPlot', label: 'Neighborhood', icon: LandPlot },
  { value: 'Sailboat', label: 'Sea', icon: Sailboat },
];

const AMENITY_ICON_OPTIONS = [
  { value: 'Waves', label: 'Swimming Pool / Water', icon: Waves },
  { value: 'Dumbbell', label: 'Gym / Fitness', icon: Dumbbell },
  { value: 'ShieldCheck', label: 'Security', icon: ShieldCheck },
  { value: 'ParkingCircle', label: 'Parking', icon: ParkingCircle },
  { value: 'Coffee', label: 'Café / Lounge', icon: Coffee },
  { value: 'Trees', label: 'Garden / Park', icon: Trees },
  { value: 'Baby', label: 'Kids Area', icon: Baby },
  { value: 'Sparkles', label: 'Spa / Wellness', icon: Sparkles },
  { value: 'Flame', label: 'Sauna / Steam', icon: Flame },
  { value: 'UtensilsCrossed', label: 'BBQ / Restaurant', icon: UtensilsCrossed },
  { value: 'Film', label: 'Cinema / Entertainment', icon: Film },
  { value: 'Building2', label: 'Business Center', icon: Building2 },
  { value: 'Heart', label: 'Healthcare', icon: Heart },
  { value: 'GraduationCap', label: 'Education', icon: GraduationCap },
  { value: 'Store', label: 'Retail / Shop', icon: Store },
];

const AMENITY_ICONS: Record<string, React.ElementType> = {
  'Swimming Pool': Waves, 'Gym': Dumbbell, '24/7 Security': ShieldCheck,
  'Parking': ParkingCircle, 'Concierge Service': Coffee, 'Marina View': Waves,
  'Garden': Trees, 'Playground': Baby, 'Pool': Waves, 'Spa': Sparkles,
  'Sauna': Flame, 'Kids Area': Baby, 'BBQ Area': UtensilsCrossed, 'Cinema': Film,
  'Conference Hall': Presentation, 'Library': Library,
};

// Add custom amenity icons to the lookup
const CUSTOM_AMENITY_ICONS: Record<string, string> = {};
const getCustomAmenityIconStorage = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem('custom_amenity_icons');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveCustomAmenityIcon = (amenityName: string, iconValue: string) => {
  const icons = getCustomAmenityIconStorage();
  icons[amenityName] = iconValue;
  localStorage.setItem('custom_amenity_icons', JSON.stringify(icons));
};

const getAmenityIcon = (name: string): React.ElementType => {
  // Check default icons first
  if (AMENITY_ICONS[name]) return AMENITY_ICONS[name];
  
  // Check custom icons from localStorage
  const customIcons = getCustomAmenityIconStorage();
  const iconValue = customIcons[name];
  if (iconValue) {
    const found = AMENITY_ICON_OPTIONS.find(opt => opt.value === iconValue);
    if (found) return found.icon;
  }
  
  return Sparkles;
};

const DEFAULT_AMENITIES = [
  'Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Concierge Service',
  'Marina View', 'Garden', 'Playground', 'Pool', 'Spa', 'Sauna',
  'Kids Area', 'BBQ Area', 'Cinema', 'Conference Hall', 'Library'
];

// ==================== HELPER FUNCTIONS ====================

const safeFormatDate = (dateString: string | null | undefined, formatStr: string = "PPP"): string | null => {
  if (!dateString || dateString.trim() === '') return null;
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : format(date, formatStr);
  } catch { return null; }
};

const getIconComponent = (iconName: string) => NEARBY_PLACE_ICONS.find(i => i.value === iconName)?.icon || Building2;

const formatTransactionType = (type: string) => {
  if (type === 'sale') return 'For Sale';
  if (type === 'rent') return 'For Rent';
  return type;
};

const formatStatus = (status: string) => {
  if (status === 'under_construction') return 'Under Construction';
  if (status === 'draft') return 'Draft';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getStatusBadgeVariant = (status: string): 'default' | 'destructive' | 'secondary' | 'outline' => {
  switch (status) {
    case 'available':
    case 'ready':
      return 'default';
    case 'sold':
      return 'destructive';
    case 'draft':
      return 'outline';
    default:
      return 'secondary';
  }
};

const formatLayout = (layout: string) => layout === '0+1' ? '0+1 (Studio)' : layout;

// ==================== SORTABLE ROW COMPONENT ====================

interface SortableRowProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onToggleDraft: (property: Property) => void;
  t: (key: string) => string;
}

function SortableRow({ property, onEdit, onDelete, onToggleDraft, t }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: property.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const isDraft = property.status === 'draft';

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <button className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded" {...listeners}>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell>
        {property.images?.length > 0 ? (
          <img src={property.images[0]} alt={property.title} className="w-16 h-16 object-cover rounded" />
        ) : (
          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs">No image</div>
        )}
      </TableCell>
      <TableCell className="font-medium">{property.title}</TableCell>
      <TableCell>{property.property_type}</TableCell>
      <TableCell>{property.location}</TableCell>
      <TableCell>${property.price.toLocaleString()}</TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(property.status || 'available')}>
          {formatStatus(property.status || 'available')}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onToggleDraft(property)}
            title={isDraft ? "Publish" : "Set as Draft"}
          >
            {isDraft ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-green-600" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(property)}><Pencil className="h-4 w-4" /></Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(property.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

// ==================== INITIAL FORM DATA ====================

const getInitialFormData = () => ({
  title: '', title_ar: '', slug: '',
  description: '', description_ar: '',
  long_description: '', long_description_ar: '',
  property_type: '', transaction_type: 'sale', price: '',
  location: '', region: '', district: '', layout: '',
  country: '', city: '',
  bedrooms: '', bathrooms: '', area_sqm: '', year_built: '',
  status: 'available', is_featured: false,
  images: [] as string[], features: [] as string[], newFeature: '',
  property_id: '', completion_date: '', plot_ratio: '', clear_height: '',
  payment_plans: [] as PaymentPlan[], nearby_places: [] as NearbyPlace[], floor_plans: [] as FloorPlan[],
  video_url: '', map_embed_url: '', map_link_url: '',
  map_latitude: null as number | null, map_longitude: null as number | null,
  area_population: '', area_sex_ratio_male: '', area_sex_ratio_female: '', area_class: '',
  investment_return_1y: '', investment_return_3y: '', investment_return_5y: '',
  why_this_property: '', why_this_property_ar: '',
  blocks: '', floors: '', rental_yield: '', down_payment_percentage: '', installments_count: '',
  benefit: '', benefit_ar: '', delivery_date: '', title_deed: '',
  newFloorTitle: '', newFloorPriceMin: '', newFloorPriceMax: '', newFloorAreaMin: '', newFloorAreaMax: '', newFloorImage: '',
  customLocation: '', customPropertyType: '', customBenefit: '', customTitleDeed: '',
  customStatus: '', customAmenity: '', customTransactionType: '', customDistrict: '',
  customClass: '', customLayout: '', customCity: '',
  newNearbyName: '', newNearbyDistance: '', newNearbyIcon: ''
});

// ==================== MAIN COMPONENT ====================

const PropertiesManagement = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmCloseDialogOpen, setConfirmCloseDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState(getInitialFormData());
  
  // Custom options hook
  const {
    optionsState,
    loadCustomValues,
    saveCustomValue,
    requestDeleteConfirmation,
    confirmDelete,
    cancelDelete,
    restoreHiddenDefault,
    getAllHiddenDefaults,
    deleteConfirm,
    deleteDialogOpen,
    setDeleteDialogOpen,
  } = useCustomOptions(properties);

  // Legacy state for backward compatibility during transition
  const [customDistricts, setCustomDistricts] = useState<string[]>([]);
  const [customAmenityDialogOpen, setCustomAmenityDialogOpen] = useState(false);
  const [customAmenityInput, setCustomAmenityInput] = useState('');
  const [customAmenityIcon, setCustomAmenityIcon] = useState('');

  // Edit dialogs state
  const [editingNearbyPlaceIndex, setEditingNearbyPlaceIndex] = useState<number | null>(null);
  const [editNearbyPlaceDialogOpen, setEditNearbyPlaceDialogOpen] = useState(false);
  const [editNearbyPlaceData, setEditNearbyPlaceData] = useState({ icon: '', name: '', distance: '' });
  const [editingFloorPlanIndex, setEditingFloorPlanIndex] = useState<number | null>(null);
  const [editFloorPlanDialogOpen, setEditFloorPlanDialogOpen] = useState(false);
  const [editFloorPlanData, setEditFloorPlanData] = useState({ image_url: '', title: '', subtitle: '', price_max: '', area: '', area_max: '' });
  
  // Delete confirmation state
  const [deletePropertyDialogOpen, setDeletePropertyDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Sorting state
  type SortField = 'title' | 'property_type' | 'location' | 'price' | 'status';
  type SortDirection = 'asc' | 'desc';
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Form tracking
  const initialFormDataRef = useRef<string>('');

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ==================== EFFECTS ====================

  useEffect(() => {
    loadProperties();
    loadCustomValues();
    loadLegacyCustomValues();
  }, []);

  useEffect(() => {
    if (dialogOpen) {
      if (initialFormDataRef.current === '') {
        initialFormDataRef.current = JSON.stringify(formData);
      } else if (JSON.stringify(formData) !== initialFormDataRef.current) {
        setHasUnsavedChanges(true);
      }
    } else {
      initialFormDataRef.current = '';
    }
  }, [dialogOpen, formData]);

  // ==================== DATA LOADING ====================

  const loadLegacyCustomValues = () => {
    const districts = localStorage.getItem(STORAGE_KEYS.CUSTOM_DISTRICTS);
    if (districts) setCustomDistricts(JSON.parse(districts));
  };

  const loadProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('properties').select('*').order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to load properties');
    } else {
      const parsedProperties = (data || []).map(prop => ({
        ...prop,
        images: Array.isArray(prop.images) ? prop.images : [],
        features: Array.isArray(prop.features) ? prop.features : [],
        payment_plans: Array.isArray(prop.payment_plans) ? prop.payment_plans as unknown as PaymentPlan[] : [],
        nearby_places: Array.isArray(prop.nearby_places) ? prop.nearby_places as unknown as NearbyPlace[] : [],
        floor_plans: Array.isArray(prop.floor_plans) ? prop.floor_plans as unknown as FloorPlan[] : [],
      })) as Property[];
      setProperties(parsedProperties);
    }
    setLoading(false);
  };

  // Sorting logic
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.title_ar || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q) ||
        (p.property_type || '').toLowerCase().includes(q) ||
        (p.status || '').toLowerCase().includes(q) ||
        (p.district || '').toLowerCase().includes(q) ||
        (p.property_id || '').toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortField) {
        case 'title':
          aValue = (a.title || '').toLowerCase();
          bValue = (b.title || '').toLowerCase();
          break;
        case 'property_type':
          aValue = (a.property_type || '').toLowerCase();
          bValue = (b.property_type || '').toLowerCase();
          break;
        case 'location':
          aValue = (a.location || '').toLowerCase();
          bValue = (b.location || '').toLowerCase();
          break;
        case 'price':
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case 'status':
          aValue = (a.status || '').toLowerCase();
          bValue = (b.status || '').toLowerCase();
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [properties, sortField, sortDirection, searchQuery]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" /> 
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  // ==================== FORM HANDLERS ====================

  const resetForm = () => {
    setEditingProperty(null);
    setHasUnsavedChanges(false);
    initialFormDataRef.current = '';
    setFormData(getInitialFormData());
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      setConfirmCloseDialogOpen(true);
    } else {
      setDialogOpen(open);
      if (!open) resetForm();
    }
  };

  const confirmDiscard = () => {
    setConfirmCloseDialogOpen(false);
    setDialogOpen(false);
    resetForm();
  };

  const formatPrice = (value: string) => {
    const number = value.replace(/,/g, '');
    return number === '' ? '' : parseFloat(number).toLocaleString();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    const locLower = (property.location || '').toLowerCase();
    const regLower = (property.region || '').toLowerCase();
    const isDubai =
      regLower === 'dubai' ||
      locLower === 'dubai' ||
      locLower === 'uae' ||
      locLower.includes('dubai');
    const derivedCountry = isDubai
      ? 'dubai'
      : property.region || property.location
      ? 'turkiye'
      : '';
    const derivedCity = !isDubai
      ? getCityForDistrict('turkiye', property.district || '') ||
        (locLower.includes('istanbul') ? 'istanbul' :
         locLower.includes('ankara') ? 'ankara' :
         locLower.includes('izmir') ? 'izmir' :
         locLower.includes('antalya') ? 'antalya' :
         locLower.includes('bursa') ? 'bursa' :
         locLower.includes('bodrum') ? 'bodrum' :
         locLower.includes('trabzon') ? 'trabzon' :
         locLower.includes('mersin') ? 'mersin' :
         locLower.includes('alanya') ? 'alanya' :
         locLower.includes('fethiye') ? 'fethiye' : '')
      : '';
    setFormData({
      ...getInitialFormData(),
      title: property.title || '',
      slug: property.slug || '',
      title_ar: property.title_ar || '',
      description: property.description || '',
      description_ar: property.description_ar || '',
      long_description: property.long_description || '',
      long_description_ar: property.long_description_ar || '',
      property_type: property.property_type || '',
      transaction_type: property.transaction_type || 'sale',
      price: property.price?.toLocaleString() || '',
      location: property.location || '',
      region: property.region || '',
      country: derivedCountry,
      city: derivedCity,
      district: property.district || '',
      layout: property.layout || '',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      area_sqm: property.area_sqm?.toString() || '',
      year_built: property.year_built?.toString() || '',
      status: property.status || 'available',
      is_featured: property.is_featured || false,
      images: property.images || [],
      features: property.features || [],
      property_id: property.property_id || '',
      completion_date: property.completion_date || '',
      plot_ratio: property.plot_ratio || '',
      clear_height: property.clear_height || '',
      payment_plans: property.payment_plans || [],
      nearby_places: property.nearby_places || [],
      floor_plans: property.floor_plans || [],
      video_url: property.video_url || '',
      map_embed_url: property.map_embed_url || '',
      map_link_url: (property as any).map_link_url || '',
      map_latitude: property.latitude || null,
      map_longitude: property.longitude || null,
      area_population: property.area_population || '',
      area_sex_ratio_male: property.area_sex_ratio_male || '',
      area_sex_ratio_female: property.area_sex_ratio_female || '',
      area_class: property.area_class || '',
      investment_return_1y: property.investment_return_1y || '',
      investment_return_3y: property.investment_return_3y || '',
      investment_return_5y: property.investment_return_5y || '',
      why_this_property: property.why_this_property || '',
      why_this_property_ar: property.why_this_property_ar || '',
      blocks: property.blocks?.toString() || '',
      floors: property.floors?.toString() || '',
      rental_yield: property.rental_yield || '',
      down_payment_percentage: property.down_payment_percentage || '',
      installments_count: property.installments_count?.toString() || '',
      benefit: property.benefit || '',
      benefit_ar: property.benefit_ar || '',
      delivery_date: property.delivery_date || '',
      title_deed: property.title_deed || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPropertyToDelete(id);
    setDeletePropertyDialogOpen(true);
  };

  const confirmDeleteProperty = async () => {
    if (!propertyToDelete) return;
    const { error } = await supabase.from('properties').delete().eq('id', propertyToDelete);
    if (error) {
      toast.error('Failed to delete property');
    } else {
      toast.success('Property deleted successfully');
      loadProperties();
    }
    setDeletePropertyDialogOpen(false);
    setPropertyToDelete(null);
  };

  const handleToggleDraft = async (property: Property) => {
    const DRAFT_STORAGE_KEY = 'property_previous_status';
    
    let newStatus: string;
    
    if (property.status === 'draft') {
      // Restore the original status
      const storedStatuses = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '{}');
      newStatus = storedStatuses[property.id] || 'available';
      // Clean up stored status after restoring
      delete storedStatuses[property.id];
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(storedStatuses));
    } else {
      // Store current status before drafting
      const storedStatuses = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '{}');
      storedStatuses[property.id] = property.status || 'available';
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(storedStatuses));
      newStatus = 'draft';
    }
    
    const { error } = await supabase
      .from('properties')
      .update({ status: newStatus })
      .eq('id', property.id);
    
    if (error) {
      toast.error('Failed to update property status');
    } else {
      toast.success(newStatus === 'draft' ? 'Property set to draft' : `Property restored to ${newStatus}`);
      loadProperties();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save custom values if provided
    if (formData.location === 'custom' && formData.customLocation.trim()) {
      saveCustomValue('region', formData.customLocation.trim());
    }
    if (formData.district === 'custom' && formData.customDistrict.trim()) {
      const updated = [...customDistricts, formData.customDistrict.trim()];
      setCustomDistricts(updated);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DISTRICTS, JSON.stringify(updated));
    }

    const propertyData = {
      title: formData.title,
      slug: formData.slug || null,
      title_ar: formData.title_ar || null,
      description: formData.description,
      description_ar: formData.description_ar || null,
      long_description: formData.long_description || null,
      long_description_ar: formData.long_description_ar || null,
      property_type: formData.property_type,
      transaction_type: formData.transaction_type === 'custom' ? formData.customTransactionType : formData.transaction_type,
      price: parseFloat(formData.price.replace(/,/g, '')),
      location: formData.location === 'custom' ? formData.customLocation : formData.location,
      region: formData.location === 'custom' ? formData.customLocation : formData.region,
      district: formData.district === 'custom' ? formData.customDistrict : (formData.district || null),
      layout: formData.layout || null,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      area_sqm: formData.area_sqm ? parseFloat(formData.area_sqm) : null,
      year_built: formData.year_built ? parseInt(formData.year_built) : null,
      status: formData.status,
      is_featured: formData.is_featured,
      images: formData.images,
      features: formData.features,
      property_id: formData.property_id || null,
      completion_date: formData.completion_date || null,
      plot_ratio: formData.plot_ratio || null,
      clear_height: formData.clear_height || null,
      payment_plans: formData.payment_plans as any,
      nearby_places: formData.nearby_places as any,
      floor_plans: formData.floor_plans as any,
      video_url: formData.video_url || null,
      map_embed_url: formData.map_embed_url || null,
      map_link_url: formData.map_link_url || null,
      latitude: formData.map_latitude,
      longitude: formData.map_longitude,
      area_population: formData.area_population || null,
      area_sex_ratio_male: formData.area_sex_ratio_male || null,
      area_sex_ratio_female: formData.area_sex_ratio_female || null,
      area_class: formData.area_class === 'custom' ? formData.customClass : (formData.area_class || null),
      investment_return_1y: formData.investment_return_1y || null,
      investment_return_3y: formData.investment_return_3y || null,
      investment_return_5y: formData.investment_return_5y || null,
      why_this_property: formData.why_this_property || null,
      why_this_property_ar: formData.why_this_property_ar || null,
      blocks: formData.blocks ? parseInt(formData.blocks) : null,
      floors: formData.floors ? parseInt(formData.floors) : null,
      rental_yield: formData.rental_yield || null,
      down_payment_percentage: formData.down_payment_percentage || null,
      installments_count: formData.installments_count ? parseInt(formData.installments_count) : null,
      benefit: formData.benefit || null,
      benefit_ar: formData.benefit_ar || null,
      delivery_date: formData.delivery_date || null,
      title_deed: formData.title_deed === 'custom' ? formData.customTitleDeed : (formData.title_deed || null),
    };

    if (editingProperty) {
      const { error } = await supabase.from('properties').update(propertyData).eq('id', editingProperty.id);
      if (error) {
        toast.error('Failed to update property');
      } else {
        toast.success('Property updated successfully');
        setDialogOpen(false);
        loadProperties();
        resetForm();
      }
    } else {
      const { error } = await supabase.from('properties').insert([propertyData]);
      if (error) {
        toast.error('Failed to create property');
      } else {
        toast.success('Property created successfully');
        setDialogOpen(false);
        loadProperties();
        resetForm();
      }
    }
  };

  // ==================== DRAG AND DROP ====================

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = properties.findIndex(p => p.id === active.id);
      const newIndex = properties.findIndex(p => p.id === over.id);
      const reorderedProperties = arrayMove(properties, oldIndex, newIndex);
      setProperties(reorderedProperties);

      try {
        for (const [index, property] of reorderedProperties.entries()) {
          await supabase.from('properties').update({ display_order: index }).eq('id', property.id);
        }
        toast.success('Property order updated');
      } catch (error) {
        toast.error('Failed to update property order');
        loadProperties();
      }
    }
  };

  // ==================== FLOOR PLANS & NEARBY PLACES ====================

  const addFloorPlan = () => {
    if (formData.newFloorTitle.trim() && formData.newFloorPriceMin.trim() && formData.newFloorAreaMin.trim() && formData.newFloorImage.trim()) {
      setFormData(prev => ({
        ...prev,
        floor_plans: [...prev.floor_plans, {
          title: prev.newFloorTitle.trim(),
          subtitle: prev.newFloorPriceMin.trim(),
          price_max: prev.newFloorPriceMax.trim(),
          area: prev.newFloorAreaMin.trim(),
          area_max: prev.newFloorAreaMax.trim(),
          image_url: prev.newFloorImage.trim()
        }],
        newFloorTitle: '', newFloorPriceMin: '', newFloorPriceMax: '', newFloorAreaMin: '', newFloorAreaMax: '', newFloorImage: ''
      }));
    }
  };

  const removeFloorPlan = (index: number) => {
    setFormData(prev => ({ ...prev, floor_plans: prev.floor_plans.filter((_, i) => i !== index) }));
    toast.success("Apartment type removed");
  };

  const openEditFloorPlan = (index: number) => {
    const plan = formData.floor_plans[index];
    setEditingFloorPlanIndex(index);
    setEditFloorPlanData({ 
      image_url: plan.image_url, 
      title: plan.title, 
      subtitle: plan.subtitle, 
      price_max: plan.price_max || '',
      area: plan.area,
      area_max: plan.area_max || ''
    });
    setEditFloorPlanDialogOpen(true);
  };

  const saveEditFloorPlan = () => {
    if (editingFloorPlanIndex !== null && editFloorPlanData.title.trim() && editFloorPlanData.subtitle.trim() && editFloorPlanData.area.trim() && editFloorPlanData.image_url.trim()) {
      const updatedPlans = [...formData.floor_plans];
      updatedPlans[editingFloorPlanIndex] = {
        title: editFloorPlanData.title.trim(),
        subtitle: editFloorPlanData.subtitle.trim(),
        price_max: editFloorPlanData.price_max.trim(),
        area: editFloorPlanData.area.trim(),
        area_max: editFloorPlanData.area_max.trim(),
        image_url: editFloorPlanData.image_url.trim()
      };
      setFormData(prev => ({ ...prev, floor_plans: updatedPlans }));
      setEditFloorPlanDialogOpen(false);
      setEditingFloorPlanIndex(null);
      setEditFloorPlanData({ image_url: '', title: '', subtitle: '', price_max: '', area: '', area_max: '' });
      toast.success("Apartment type updated successfully");
    }
  };

  const addNearbyPlace = () => {
    if (formData.newNearbyName.trim() && formData.newNearbyDistance.trim() && formData.newNearbyIcon.trim()) {
      setFormData(prev => ({
        ...prev,
        nearby_places: [...prev.nearby_places, {
          name: prev.newNearbyName.trim(),
          distance: prev.newNearbyDistance.trim(),
          icon: prev.newNearbyIcon.trim()
        }],
        newNearbyName: '', newNearbyDistance: '', newNearbyIcon: ''
      }));
    }
  };

  const removeNearbyPlace = (index: number) => {
    setFormData(prev => ({ ...prev, nearby_places: prev.nearby_places.filter((_, i) => i !== index) }));
    toast.success("Nearby place removed");
  };

  const openEditNearbyPlace = (index: number) => {
    const place = formData.nearby_places[index];
    setEditingNearbyPlaceIndex(index);
    setEditNearbyPlaceData({ icon: place.icon, name: place.name, distance: place.distance });
    setEditNearbyPlaceDialogOpen(true);
  };

  const saveEditNearbyPlace = () => {
    if (editingNearbyPlaceIndex !== null && editNearbyPlaceData.name.trim() && editNearbyPlaceData.distance.trim() && editNearbyPlaceData.icon.trim()) {
      const updatedPlaces = [...formData.nearby_places];
      updatedPlaces[editingNearbyPlaceIndex] = {
        name: editNearbyPlaceData.name.trim(),
        distance: editNearbyPlaceData.distance.trim(),
        icon: editNearbyPlaceData.icon.trim()
      };
      setFormData(prev => ({ ...prev, nearby_places: updatedPlaces }));
      setEditNearbyPlaceDialogOpen(false);
      setEditingNearbyPlaceIndex(null);
      setEditNearbyPlaceData({ icon: '', name: '', distance: '' });
      toast.success("Nearby place updated successfully");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  // ==================== GET OPTIONS HELPER ====================

  const getOptionsForCategory = (category: string) => {
    const state = optionsState[category];
    return { defaults: state?.defaults || [], custom: state?.custom || [] };
  };

  const hiddenDefaults = getAllHiddenDefaults();

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('propertiesManagement.pageTitle')}</h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {properties.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{t('propertiesManagement.subtitle')}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('propertiesManagement.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background h-10 w-full"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                {t('propertiesManagement.addProperty')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl mb-6">
                  {editingProperty ? t('propertiesManagement.editProperty') : t('propertiesManagement.addNewProperty')}
                </DialogTitle>
              </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* RESTORE HIDDEN OPTIONS */}
              <RestoreHiddenOptions
                hiddenDefaults={hiddenDefaults}
                onRestore={restoreHiddenDefault}
              />

              {/* BASIC DETAILS SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.basicDetails')}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>1. {t('propertiesManagement.uploadImages')} *</Label>
                    <div className="mt-2">
                      <MultiImageUpload
                        bucket="property-images"
                        images={formData.images}
                        onImagesChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                        maxImages={15}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 px-4 bg-muted/30 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="is_featured" className="text-base font-semibold cursor-pointer">
                        {t('propertiesManagement.featuredProperty')}
                      </Label>
                      <p className="text-sm text-muted-foreground">{t('propertiesManagement.featuredPropertyDesc')}</p>
                    </div>
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                    />
                  </div>

                  <div>
                    <Label>2. {t('propertiesManagement.titleLabel')} *</Label>
                    <LanguageTabs filledLanguages={{ en: !!formData.title, ar: !!formData.title_ar }}>
                      {(lang) => (
                        <Input
                          value={lang === 'ar' ? formData.title_ar : formData.title}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            ...(lang === 'ar' ? { title_ar: e.target.value } : { title: e.target.value })
                          }))}
                          required={lang === 'en'}
                          placeholder={lang === 'ar' ? 'عنوان العقار بالعربية' : 'Property title in English'}
                        />
                      )}
                    </LanguageTabs>
                  </div>

                  {/* Slug Field - Only show when editing */}
                  {editingProperty && (
                    <div>
                      <Label>{t('propertiesManagement.slug') || 'Slug (URL)'}</Label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => {
                          // Auto-format slug: lowercase, replace spaces with hyphens, remove special chars
                          const formatted = e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-]/g, '');
                          setFormData(prev => ({ ...prev, slug: formatted }));
                        }}
                        placeholder="property-url-slug (e.g., mr-001)"
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('propertiesManagement.slugHelp') || 'The URL-friendly identifier for this property. Auto-generated if left empty.'}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label>3. {t('propertiesManagement.shortDescription')} *</Label>
                    <LanguageTabs filledLanguages={{ en: !!formData.description, ar: !!formData.description_ar }}>
                      {(lang) => (
                        <Textarea
                          value={lang === 'ar' ? formData.description_ar : formData.description}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            ...(lang === 'ar' ? { description_ar: e.target.value } : { description: e.target.value })
                          }))}
                          rows={3}
                          required={lang === 'en'}
                        />
                      )}
                    </LanguageTabs>
                  </div>

                  {/* Country Select */}
                  <div>
                    <Label>4. {t('propertiesManagement.country')} *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData(prev => ({
                        ...prev,
                        country: value,
                        location: value === 'dubai' ? 'Dubai' : 'Turkey',
                        region: value === 'dubai' ? 'Dubai' : 'Turkey',
                        city: '',
                        district: '',
                        customDistrict: ''
                      }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder={t('propertiesManagement.selectCountry')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {COUNTRIES_OPTIONS.map((country) => (
                          <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City Select - Only for Türkiye */}
                  {formData.country === 'turkiye' && (
                    <div>
                      <Label>5. {t('propertiesManagement.city')} *</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          city: value,
                          district: '',
                          customDistrict: '',
                          customCity: ''
                        }))}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder={t('propertiesManagement.selectCity')} />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          {TURKIYE_CITIES_OPTIONS.map((city) => (
                            <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                          ))}
                          {optionsState.city?.custom?.map((city) => (
                            <div key={city} className="relative flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer group">
                              <SelectItem value={city} className="flex-1 border-0 bg-transparent p-0">{city}</SelectItem>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); requestDeleteConfirmation('custom', 'city', city); }}
                                className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          <SelectItem value="custom">{t('propertiesManagement.addCustomCity')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.city === 'custom' && (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder={t('propertiesManagement.enterCustomCity')}
                            value={formData.customCity}
                            onChange={(e) => setFormData(prev => ({ ...prev, customCity: e.target.value }))}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (formData.customCity.trim()) {
                                saveCustomValue('city', formData.customCity.trim());
                                setFormData(prev => ({
                                  ...prev,
                                  city: formData.customCity.trim(),
                                  customCity: ''
                                }));
                              }
                            }}
                          >
                            {t('common.add') || 'Add'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* District/Area Select */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '6' : '5'}. {t('propertiesManagement.districtArea')}</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, district: value, customDistrict: '' }))}
                      disabled={!formData.country || (formData.country === 'turkiye' && !formData.city)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder={
                          !formData.country 
                            ? t('propertiesManagement.selectCountryFirst') 
                            : formData.country === 'turkiye' && !formData.city 
                              ? t('propertiesManagement.selectCityFirst') 
                              : t('propertiesManagement.selectDistrict')
                        } />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {getDistrictsForCity(formData.country, formData.city).map((district) => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                        {customDistricts.map((district) => (
                          <div key={district} className="relative flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer group">
                            <SelectItem value={district} className="flex-1 border-0 bg-transparent p-0">{district}</SelectItem>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); requestDeleteConfirmation('custom', 'district', district); }}
                              className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <SelectItem value="custom">{t('propertiesManagement.addCustomDistrict')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.district === 'custom' && (
                      <Input
                        className="mt-2"
                        placeholder={t('propertiesManagement.enterCustomDistrict')}
                        value={formData.customDistrict}
                        onChange={(e) => setFormData(prev => ({ ...prev, customDistrict: e.target.value }))}
                        required
                      />
                    )}
                  </div>

                  {/* Layout Multi-Select */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '7' : '6'}. {t('propertiesManagement.layout')} *</Label>
                    <MultiSelectCheckbox
                      value={formData.layout}
                      onChange={(value) => setFormData(prev => ({ ...prev, layout: value }))}
                      placeholder={t('propertiesManagement.selectLayout')}
                      defaultOptions={getOptionsForCategory('layout').defaults}
                      customOptions={getOptionsForCategory('layout').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'layout', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'layout', value)}
                      customInputValue={formData.customLayout}
                      onCustomInputChange={(value) => setFormData(prev => ({ ...prev, customLayout: value }))}
                      onAddCustom={() => {
                        if (formData.customLayout.trim()) {
                          saveCustomValue('layout', formData.customLayout.trim());
                          const selectedLayouts = formData.layout.split(',').filter(Boolean);
                          setFormData(prev => ({
                            ...prev,
                            layout: [...selectedLayouts, formData.customLayout.trim()].join(','),
                            customLayout: ''
                          }));
                        }
                      }}
                      formatOption={formatLayout}
                      addCustomPlaceholder="Add custom layout (e.g., 6+1)"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* SIDE CARD DETAILS SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.sideCardDetails')}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Transaction Type */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '8' : '7'}. {t('propertiesManagement.transactionType')} *</Label>
                    <DeletableSelect
                      value={formData.transaction_type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, transaction_type: value, customTransactionType: '' }))}
                      placeholder={t('propertiesManagement.selectTransactionType')}
                      defaultOptions={getOptionsForCategory('transaction_type').defaults}
                      customOptions={getOptionsForCategory('transaction_type').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'transaction_type', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'transaction_type', value)}
                      customValue={formData.customTransactionType}
                      onCustomValueChange={(value) => setFormData(prev => ({ ...prev, customTransactionType: value }))}
                      formatOption={formatTransactionType}
                      addCustomLabel="+ Add Custom Type"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '9' : '8'}. Price *</Label>
                    <Input
                      value={formData.price}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '');
                        if (!isNaN(Number(value)) || value === '') {
                          setFormData(prev => ({ ...prev, price: formatPrice(value) }));
                        }
                      }}
                      placeholder="e.g., 1,000,000"
                      required
                    />
                  </div>

                  {/* Property Type Multi-Select */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '10' : '9'}. Property Type *</Label>
                    <MultiSelectCheckbox
                      value={formData.property_type}
                      onChange={(value) => setFormData(prev => ({ ...prev, property_type: value }))}
                      placeholder="Select property types"
                      defaultOptions={getOptionsForCategory('property_type').defaults}
                      customOptions={getOptionsForCategory('property_type').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'property_type', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'property_type', value)}
                      customInputValue={formData.customPropertyType}
                      onCustomInputChange={(value) => setFormData(prev => ({ ...prev, customPropertyType: value }))}
                      onAddCustom={() => {
                        if (formData.customPropertyType.trim()) {
                          saveCustomValue('property_type', formData.customPropertyType.trim());
                          const selected = formData.property_type.split(',').filter(Boolean);
                          setFormData(prev => ({
                            ...prev,
                            property_type: [...selected, formData.customPropertyType.trim()].join(','),
                            customPropertyType: ''
                          }));
                        }
                      }}
                      addCustomPlaceholder="Add custom property type"
                    />
                  </div>

                  {/* Benefit Multi-Select */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '11' : '10'}. Benefit</Label>
                    <MultiSelectCheckbox
                      value={formData.benefit}
                      onChange={(value) => setFormData(prev => ({ ...prev, benefit: value }))}
                      placeholder="Select benefits"
                      defaultOptions={getOptionsForCategory('benefit').defaults}
                      customOptions={getOptionsForCategory('benefit').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'benefit', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'benefit', value)}
                      customInputValue={formData.customBenefit}
                      onCustomInputChange={(value) => setFormData(prev => ({ ...prev, customBenefit: value }))}
                      onAddCustom={() => {
                        if (formData.customBenefit.trim()) {
                          saveCustomValue('benefit', formData.customBenefit.trim());
                          const selected = formData.benefit ? formData.benefit.split(',').map(b => b.trim()).filter(Boolean) : [];
                          setFormData(prev => ({
                            ...prev,
                            benefit: [...selected, formData.customBenefit.trim()].join(', '),
                            customBenefit: ''
                          }));
                        }
                      }}
                      addCustomPlaceholder="Add custom benefit"
                    />
                  </div>

                  {/* Delivery Date */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '12' : '11'}. Delivery Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.delivery_date && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {safeFormatDate(formData.delivery_date) || <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.delivery_date ? (() => { try { const d = new Date(formData.delivery_date); return isNaN(d.getTime()) ? undefined : d; } catch { return undefined; } })() : undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, delivery_date: date ? format(date, 'yyyy-MM-dd') : '' }))}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={2020}
                          toYear={2040}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Title Deed */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '13' : '12'}. Title Deed</Label>
                    <DeletableSelect
                      value={formData.title_deed || ''}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, title_deed: value, customTitleDeed: '' }))}
                      placeholder="Select title deed"
                      defaultOptions={getOptionsForCategory('title_deed').defaults}
                      customOptions={getOptionsForCategory('title_deed').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'title_deed', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'title_deed', value)}
                      customValue={formData.customTitleDeed}
                      onCustomValueChange={(value) => setFormData(prev => ({ ...prev, customTitleDeed: value }))}
                      addCustomLabel="+ Add Custom Title Deed"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <Label>{formData.country === 'turkiye' ? '14' : '13'}. Status *</Label>
                    <DeletableSelect
                      value={formData.status}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, status: value, customStatus: '' }))}
                      placeholder="Select status"
                      defaultOptions={getOptionsForCategory('status').defaults}
                      customOptions={getOptionsForCategory('status').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'status', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'status', value)}
                      customValue={formData.customStatus}
                      onCustomValueChange={(value) => setFormData(prev => ({ ...prev, customStatus: value }))}
                      formatOption={formatStatus}
                      addCustomLabel="+ Add Custom Status"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* SECTION 1 DETAILS */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.section1Details')}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>14. {t('propertiesManagement.projectLayout')} - {t('propertiesManagement.blocks')}</Label>
                    <Input type="number" value={formData.blocks} onChange={(e) => setFormData(prev => ({ ...prev, blocks: e.target.value }))} placeholder="Number of blocks" />
                  </div>
                  <div>
                    <Label>14. {t('propertiesManagement.projectLayout')} - {t('propertiesManagement.floors')}</Label>
                    <Input type="number" value={formData.floors} onChange={(e) => setFormData(prev => ({ ...prev, floors: e.target.value }))} placeholder="Number of floors" />
                  </div>
                  <div>
                    <Label>15. {t('propertiesManagement.propertyArea')}</Label>
                    <Input type="number" value={formData.area_sqm} onChange={(e) => setFormData(prev => ({ ...prev, area_sqm: e.target.value }))} placeholder="Area in square meters" />
                  </div>
                  <div>
                    <Label>16. {t('propertiesManagement.paymentMethod')} - {t('propertiesManagement.downPayment')}</Label>
                    <div className="relative">
                      <Input value={formData.down_payment_percentage} onChange={(e) => setFormData(prev => ({ ...prev, down_payment_percentage: e.target.value }))} placeholder="e.g., 20" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label>16. {t('propertiesManagement.paymentMethod')} - {t('propertiesManagement.installmentsCount')}</Label>
                    <Input type="number" value={formData.installments_count} onChange={(e) => setFormData(prev => ({ ...prev, installments_count: e.target.value }))} placeholder="Number of months" />
                  </div>
                  <div>
                    <Label>17. {t('propertiesManagement.rentalYield')} ({t('propertyDetail.annually')})</Label>
                    <div className="relative">
                      <Input value={formData.rental_yield} onChange={(e) => setFormData(prev => ({ ...prev, rental_yield: e.target.value }))} placeholder="e.g., 7" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* AREA DETAILS SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.areaDetails')}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>18. {t('propertiesManagement.population')}</Label>
                    <Input value={formData.area_population} onChange={(e) => setFormData(prev => ({ ...prev, area_population: e.target.value }))} placeholder="e.g., 50,000" />
                  </div>
                  <div>
                    <Label>18. {t('propertiesManagement.sexRatioMale')}</Label>
                    <div className="relative">
                      <Input value={formData.area_sex_ratio_male} onChange={(e) => setFormData(prev => ({ ...prev, area_sex_ratio_male: e.target.value }))} placeholder="e.g., 55" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label>18. {t('propertiesManagement.sexRatioFemale')}</Label>
                    <div className="relative">
                      <Input value={formData.area_sex_ratio_female} onChange={(e) => setFormData(prev => ({ ...prev, area_sex_ratio_female: e.target.value }))} placeholder="e.g., 45" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label>18. {t('propertiesManagement.class')}</Label>
                    <DeletableSelect
                      value={formData.area_class}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, area_class: value, customClass: '' }))}
                      placeholder="Select class"
                      defaultOptions={getOptionsForCategory('class').defaults}
                      customOptions={getOptionsForCategory('class').custom}
                      onDeleteDefault={(value) => requestDeleteConfirmation('default', 'class', value)}
                      onDeleteCustom={(value) => requestDeleteConfirmation('custom', 'class', value)}
                      customValue={formData.customClass}
                      onCustomValueChange={(value) => setFormData(prev => ({ ...prev, customClass: value }))}
                      addCustomLabel="+ Add Custom Class"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* INVESTMENT RETURNS SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.investmentReturns')}</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>19. {t('propertiesManagement.oneYear')}</Label>
                    <div className="relative">
                      <Input value={formData.investment_return_1y} onChange={(e) => setFormData(prev => ({ ...prev, investment_return_1y: e.target.value }))} placeholder="e.g., 10" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label>19. {t('propertiesManagement.threeYears')}</Label>
                    <div className="relative">
                      <Input value={formData.investment_return_3y} onChange={(e) => setFormData(prev => ({ ...prev, investment_return_3y: e.target.value }))} placeholder="e.g., 35" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label>19. {t('propertiesManagement.fiveYears')}</Label>
                    <div className="relative">
                      <Input value={formData.investment_return_5y} onChange={(e) => setFormData(prev => ({ ...prev, investment_return_5y: e.target.value }))} placeholder="e.g., 60" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* WHY THIS PROPERTY SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.whyThisPropertyDetails')}</h3>
                </div>
                
                <div>
                  <Label>20. {t('propertiesManagement.whyThisPropertyMulti')}</Label>
                  <LanguageTabs filledLanguages={{ en: !!formData.why_this_property, ar: !!formData.why_this_property_ar }}>
                    {(lang) => (
                      <RichTextEditor
                        content={lang === 'ar' ? (formData.why_this_property_ar || '') : (formData.why_this_property || '')}
                        onChange={(content) => setFormData(prev => ({
                          ...prev,
                          [lang === 'en' ? 'why_this_property' : `why_this_property_${lang}`]: content
                        }))}
                        placeholder={`Why invest in this property in ${lang === 'ar' ? 'Arabic' : 'English'}...`}
                      />
                    )}
                  </LanguageTabs>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* PROJECT INFORMATION SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.projectInfoDetails')}</h3>
                </div>
                
                <div>
                  <Label>21. {t('propertiesManagement.projectInfoMulti')}</Label>
                  <LanguageTabs filledLanguages={{ en: !!formData.long_description, ar: !!formData.long_description_ar }}>
                    {(lang) => (
                      <RichTextEditor
                        content={lang === 'ar' ? (formData.long_description_ar || '') : (formData.long_description || '')}
                        onChange={(content) => setFormData(prev => ({
                          ...prev,
                          [lang === 'en' ? 'long_description' : `long_description_${lang}`]: content
                        }))}
                        placeholder={`Detailed project information in ${lang === 'ar' ? 'Arabic' : 'English'}...`}
                      />
                    )}
                  </LanguageTabs>
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* AMENITIES SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.amenitiesDetails')}</h3>
                </div>
                
                <div>
                  <Label>22. {t('propertiesManagement.amenities')}</Label>
                  
                  {/* Custom Amenity Dialog */}
                  <Dialog open={customAmenityDialogOpen} onOpenChange={(open) => {
                    setCustomAmenityDialogOpen(open);
                    if (!open) {
                      setCustomAmenityInput('');
                      setCustomAmenityIcon('');
                    }
                  }}>
                    <DialogContent className="sm:max-w-[500px] bg-background border-[#941300]/20">
                      <DialogHeader>
                        <DialogTitle className="text-[#000000]">{t('propertiesManagement.addCustomAmenity')}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">{t('propertiesManagement.selectAmenityIcon')}</Label>
                          <Select value={customAmenityIcon} onValueChange={setCustomAmenityIcon}>
                            <SelectTrigger className="bg-background h-12">
                              <SelectValue placeholder={t('propertiesManagement.chooseAnIcon')} />
                            </SelectTrigger>
                            <SelectContent className="bg-background z-50 max-h-[300px]">
                              {AMENITY_ICON_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <option.icon className="h-5 w-5" />
                                    <span>{option.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">{t('propertiesManagement.enterCustomAmenityName')}</Label>
                          <Input
                            value={customAmenityInput}
                            onChange={(e) => setCustomAmenityInput(e.target.value)}
                            placeholder={t('propertiesManagement.customAmenityPlaceholder')}
                            className="h-12"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && customAmenityInput.trim() && customAmenityIcon) {
                                saveCustomAmenityIcon(customAmenityInput.trim(), customAmenityIcon);
                                saveCustomValue('amenity', customAmenityInput.trim());
                                if (!formData.features.includes(customAmenityInput.trim())) {
                                  setFormData(prev => ({ ...prev, features: [...prev.features, customAmenityInput.trim()] }));
                                }
                                setCustomAmenityInput('');
                                setCustomAmenityIcon('');
                                setCustomAmenityDialogOpen(false);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => { 
                          setCustomAmenityInput(''); 
                          setCustomAmenityIcon('');
                          setCustomAmenityDialogOpen(false); 
                        }}>
                          {t('propertiesManagement.cancel')}
                        </Button>
                        <Button
                          type="button"
                          disabled={!customAmenityInput.trim() || !customAmenityIcon}
                          onClick={() => {
                            if (customAmenityInput.trim() && customAmenityIcon) {
                              saveCustomAmenityIcon(customAmenityInput.trim(), customAmenityIcon);
                              saveCustomValue('amenity', customAmenityInput.trim());
                              if (!formData.features.includes(customAmenityInput.trim())) {
                                setFormData(prev => ({ ...prev, features: [...prev.features, customAmenityInput.trim()] }));
                              }
                              setCustomAmenityInput('');
                              setCustomAmenityIcon('');
                              setCustomAmenityDialogOpen(false);
                            }
                          }}
                          className="bg-[#941300] hover:bg-[#941300]/90 text-[#000000]"
                        >
                          {t('propertiesManagement.ok')}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="mt-2">
                    <Select
                      value=""
                      onValueChange={(value) => {
                        if (value === 'custom') {
                          setCustomAmenityDialogOpen(true);
                        } else if (value && !formData.features.includes(value)) {
                          setFormData(prev => ({ ...prev, features: [...prev.features, value] }));
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background h-12">
                        <SelectValue placeholder={t('propertiesManagement.selectOrAddAmenity')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {DEFAULT_AMENITIES.map((amenity) => {
                          const Icon = getAmenityIcon(amenity);
                          return (
                            <SelectItem key={amenity} value={amenity}>
                              <div className="flex items-center gap-2"><Icon className="h-4 w-4" />{amenity}</div>
                            </SelectItem>
                          );
                        })}
                        {getOptionsForCategory('amenity').custom.map((amenity) => {
                          const CustomIcon = getAmenityIcon(amenity);
                          return (
                            <div key={amenity} className="relative flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer group">
                              <SelectItem value={amenity} className="flex-1 border-0 bg-transparent p-0">
                                <div className="flex items-center gap-2"><CustomIcon className="h-4 w-4" />{amenity}</div>
                              </SelectItem>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); requestDeleteConfirmation('custom', 'amenity', amenity); }}
                                className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          );
                        })}
                        <SelectItem value="custom">{t('propertiesManagement.addCustom')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.features.map((feature, idx) => {
                        const AmenityIcon = getAmenityIcon(feature);
                        return (
                          <div key={idx} className="bg-[#941300] text-[#000000] px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                            <AmenityIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">{feature}</span>
                            <button type="button" onClick={() => removeFeature(idx)} className="text-[#000000] hover:text-[#000000]/70 transition-colors">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* NEARBY PLACES SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('dashboard.nearbyPlacesDetails')}</h3>
                </div>
                
                {/* Edit Nearby Place Dialog */}
                <Dialog open={editNearbyPlaceDialogOpen} onOpenChange={setEditNearbyPlaceDialogOpen}>
                  <DialogContent className="sm:max-w-[500px] bg-background">
                    <DialogHeader>
                      <DialogTitle>{t('propertiesManagement.editNearbyPlace')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.selectIcon')} *</Label>
                        <Select value={editNearbyPlaceData.icon || undefined} onValueChange={(value) => setEditNearbyPlaceData(prev => ({ ...prev, icon: value }))}>
                          <SelectTrigger className="bg-background h-12"><SelectValue placeholder={t('propertiesManagement.selectIcon')} /></SelectTrigger>
                          <SelectContent className="bg-background z-50 max-h-[300px]">
                            {NEARBY_PLACE_ICONS.map((icon) => (
                              <SelectItem key={icon.value} value={icon.value}>
                                <div className="flex items-center gap-2"><icon.icon className="h-5 w-5" /><span>{icon.label}</span></div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.placeName')} *</Label>
                        <Input value={editNearbyPlaceData.name} onChange={(e) => setEditNearbyPlaceData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., School, Mall" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.distance')} *</Label>
                        <Input value={editNearbyPlaceData.distance} onChange={(e) => setEditNearbyPlaceData(prev => ({ ...prev, distance: e.target.value }))} placeholder={t('propertiesManagement.distancePlaceholder')} className="h-12" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => { setEditNearbyPlaceDialogOpen(false); setEditingNearbyPlaceIndex(null); setEditNearbyPlaceData({ icon: '', name: '', distance: '' }); }}>{t('propertiesManagement.cancel')}</Button>
                      <Button type="button" onClick={saveEditNearbyPlace} disabled={!editNearbyPlaceData.icon || !editNearbyPlaceData.name.trim() || !editNearbyPlaceData.distance.trim()}>{t('propertiesManagement.updatePlace')}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="space-y-4">
                  <Label>23. {t('propertiesManagement.addNearbyPlaces')}</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Select value={formData.newNearbyIcon} onValueChange={(value) => setFormData(prev => ({ ...prev, newNearbyIcon: value }))}>
                      <SelectTrigger className="bg-background"><SelectValue placeholder={t('propertiesManagement.selectIcon')} /></SelectTrigger>
                      <SelectContent className="bg-background z-50 max-h-[300px]">
                        {NEARBY_PLACE_ICONS.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center gap-2"><icon.icon className="h-4 w-4" /><span>{icon.label}</span></div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input value={formData.newNearbyName} onChange={(e) => setFormData(prev => ({ ...prev, newNearbyName: e.target.value }))} placeholder={t('propertiesManagement.placeName')} />
                    <Input value={formData.newNearbyDistance} onChange={(e) => setFormData(prev => ({ ...prev, newNearbyDistance: e.target.value }))} placeholder={t('propertiesManagement.distancePlaceholder')} />
                  </div>
                  <Button type="button" onClick={addNearbyPlace} variant="outline" disabled={!formData.newNearbyIcon || !formData.newNearbyName.trim() || !formData.newNearbyDistance.trim()}>
                    <Plus className="h-4 w-4 mr-2" />{t('propertiesManagement.addNearbyPlace')}
                  </Button>
                  
                  {formData.nearby_places.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm">{t('propertiesManagement.addedNearbyPlaces')}:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.nearby_places.map((place, idx) => {
                          const IconComponent = getIconComponent(place.icon);
                          return (
                            <div key={idx} className="bg-muted px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
                              <IconComponent className="h-4 w-4 text-[#941300]" />
                              <span>{place.name}</span>
                              <span className="text-muted-foreground">({place.distance})</span>
                              <Button type="button" variant="ghost" size="sm" onClick={() => openEditNearbyPlace(idx)} className="h-6 w-6 p-0"><Edit className="h-3 w-3" /></Button>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeNearbyPlace(idx)} className="h-6 w-6 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* APARTMENT TYPES SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.apartmentTypesDetails')}</h3>
                </div>
                
                {/* Edit Floor Plan Dialog */}
                <Dialog open={editFloorPlanDialogOpen} onOpenChange={setEditFloorPlanDialogOpen}>
                  <DialogContent className="sm:max-w-[550px] bg-background">
                    <DialogHeader>
                      <DialogTitle>{t('propertiesManagement.editApartmentType')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.imageLabel')} *</Label>
                        <ImageUpload bucket="property-images" onUpload={(url) => setEditFloorPlanData(prev => ({ ...prev, image_url: url }))} currentImage={editFloorPlanData.image_url} />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.titleLabel')} *</Label>
                        <Input value={editFloorPlanData.title} onChange={(e) => setEditFloorPlanData(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g., 2 Bedroom" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.priceRange')} *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Input value={editFloorPlanData.subtitle} onChange={(e) => setEditFloorPlanData(prev => ({ ...prev, subtitle: e.target.value }))} placeholder={t('propertiesManagement.priceMin')} className="h-12" />
                          <Input value={editFloorPlanData.price_max} onChange={(e) => setEditFloorPlanData(prev => ({ ...prev, price_max: e.target.value }))} placeholder={t('propertiesManagement.priceMax')} className="h-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>{t('propertiesManagement.areaRange')} *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Input value={editFloorPlanData.area} onChange={(e) => setEditFloorPlanData(prev => ({ ...prev, area: e.target.value }))} placeholder={t('propertiesManagement.areaMin')} className="h-12" />
                          <Input value={editFloorPlanData.area_max} onChange={(e) => setEditFloorPlanData(prev => ({ ...prev, area_max: e.target.value }))} placeholder={t('propertiesManagement.areaMax')} className="h-12" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => { setEditFloorPlanDialogOpen(false); setEditingFloorPlanIndex(null); setEditFloorPlanData({ image_url: '', title: '', subtitle: '', price_max: '', area: '', area_max: '' }); }}>{t('propertiesManagement.cancel')}</Button>
                      <Button type="button" onClick={saveEditFloorPlan} disabled={!editFloorPlanData.image_url || !editFloorPlanData.title.trim() || !editFloorPlanData.subtitle.trim() || !editFloorPlanData.area.trim()}>{t('propertiesManagement.updateApartmentType')}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="space-y-4">
                  <Label>25. {t('propertiesManagement.addApartmentType')}</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">{t('propertiesManagement.imageLabel')}</Label>
                      <ImageUpload bucket="property-images" onUpload={(url) => setFormData(prev => ({ ...prev, newFloorImage: url }))} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">{t('propertiesManagement.titleLabel')}</Label>
                        <Input value={formData.newFloorTitle} onChange={(e) => setFormData(prev => ({ ...prev, newFloorTitle: e.target.value }))} placeholder="e.g., 2 Bedroom" />
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">{t('propertiesManagement.priceRange')}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input value={formData.newFloorPriceMin} onChange={(e) => setFormData(prev => ({ ...prev, newFloorPriceMin: e.target.value }))} placeholder={t('propertiesManagement.priceMin')} />
                          <Input value={formData.newFloorPriceMax} onChange={(e) => setFormData(prev => ({ ...prev, newFloorPriceMax: e.target.value }))} placeholder={t('propertiesManagement.priceMax')} />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">{t('propertiesManagement.areaRange')}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input value={formData.newFloorAreaMin} onChange={(e) => setFormData(prev => ({ ...prev, newFloorAreaMin: e.target.value }))} placeholder={t('propertiesManagement.areaMin')} />
                          <Input value={formData.newFloorAreaMax} onChange={(e) => setFormData(prev => ({ ...prev, newFloorAreaMax: e.target.value }))} placeholder={t('propertiesManagement.areaMax')} />
                        </div>
                      </div>
                      <Button type="button" onClick={addFloorPlan} variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />{t('propertiesManagement.addApartmentType')}
                      </Button>
                    </div>
                  </div>
                  
                  {formData.floor_plans.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm">{t('propertiesManagement.addedApartmentTypes')}:</Label>
                      {formData.floor_plans.map((plan, idx) => {
                        const priceDisplay = plan.price_max ? `${plan.subtitle} - ${plan.price_max}` : plan.subtitle;
                        const areaDisplay = plan.area_max ? `${plan.area} - ${plan.area_max}` : plan.area;
                        return (
                          <div key={idx} className="border rounded-lg p-4 flex items-center gap-4">
                            <img src={plan.image_url} alt={plan.title} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{plan.title}</h4>
                              <p className="text-sm text-muted-foreground">Price: {priceDisplay}</p>
                              <p className="text-sm text-muted-foreground">Area: {areaDisplay}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button type="button" variant="outline" size="sm" onClick={() => openEditFloorPlan(idx)}><Edit className="h-4 w-4" /></Button>
                              <Button type="button" variant="outline" size="sm" onClick={() => removeFloorPlan(idx)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t-2 border-primary/20 my-6" />

              {/* MAP SECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
                  <h3 className="text-lg font-bold text-primary">{t('propertiesManagement.mapLocation')}</h3>
                </div>
                
                <div>
                  <Label>{t('propertiesManagement.pinPropertyLocation')}</Label>
                  <MapPicker
                    latitude={formData.map_latitude || undefined}
                    longitude={formData.map_longitude || undefined}
                    onLocationSelect={(lat, lng) => {
                      const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.${Math.floor(Math.random() * 1000000)}!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTInMzYuMCJOIDU1wrAxNicxNC40IkU!5e0!3m2!1sen!2sae!4v${Date.now()}`;
                      const linkUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                      setFormData(prev => ({ ...prev, map_latitude: lat, map_longitude: lng, map_embed_url: embedUrl, map_link_url: linkUrl }));
                    }}
                  />
                </div>
                
                <div>
                  <Label>{t('propertiesManagement.googleMapsLink', 'Google Maps Link (optional)')}</Label>
                  <Input
                    value={formData.map_link_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, map_link_url: e.target.value }))}
                    placeholder="https://www.google.com/maps?q=..."
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('propertiesManagement.googleMapsLinkHint', 'This link will open when users click on the map. Auto-filled when pinning location.')}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>{t('propertiesManagement.cancel')}</Button>
                <Button type="submit">{editingProperty ? t('propertiesManagement.updateProperty') : t('propertiesManagement.createProperty')}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* PROPERTY LIST */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('propertiesManagement.loadingProperties')}</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">{t('propertiesManagement.noPropertiesFound')}</p>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />{t('propertiesManagement.addFirstProperty')}
          </Button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No properties match your search.</p>
          <p className="text-xs text-muted-foreground mb-4">Try adjusting your search terms.</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border overflow-hidden">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12" />
                    <TableHead>{t('propertiesManagement.image')}</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-primary/10 select-none transition-colors"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        {t('propertiesManagement.tableTitle')}
                        <SortIcon field="title" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-primary/10 select-none transition-colors"
                      onClick={() => handleSort('property_type')}
                    >
                      <div className="flex items-center">
                        {t('propertiesManagement.type')}
                        <SortIcon field="property_type" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-primary/10 select-none transition-colors"
                      onClick={() => handleSort('location')}
                    >
                      <div className="flex items-center">
                        {t('propertiesManagement.location')}
                        <SortIcon field="location" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-primary/10 select-none transition-colors"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center">
                        {t('propertiesManagement.price')}
                        <SortIcon field="price" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-primary/10 select-none transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        {t('propertiesManagement.status')}
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">{t('propertiesManagement.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <SortableContext items={filteredProperties.map(p => p.id)} strategy={verticalListSortingStrategy}>
                    {filteredProperties.map((property) => (
                      <SortableRow key={property.id} property={property} onEdit={handleEdit} onDelete={handleDelete} onToggleDraft={handleToggleDraft} t={t} />
                    ))}
                  </SortableContext>
                </TableBody>
              </Table>
            </DndContext>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredProperties.map((property) => (
              <MobileCard key={property.id}>
                {property.images?.length > 0 && (
                  <img src={property.images[0]} alt={property.title} className="w-full h-40 object-cover rounded-md mb-3" />
                )}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <MobileCardRow label="Type" value={property.property_type} />
                  <MobileCardRow label="Location" value={property.location} />
                  <MobileCardRow label="Price" value={`$${property.price.toLocaleString()}`} />
                  <MobileCardRow label="Status" value={<Badge variant={getStatusBadgeVariant(property.status || 'available')}>{formatStatus(property.status || 'available')}</Badge>} />
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className={`flex-1 ${property.status !== 'draft' ? "text-green-600" : ""}`}
                      onClick={() => handleToggleDraft(property)}
                    >
                      {property.status === 'draft' ? <><EyeOff className="h-4 w-4 mr-2" />Publish</> : <><Eye className="h-4 w-4 mr-2 text-green-600" />Draft</>}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(property)}><Pencil className="h-4 w-4 mr-2" />Edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(property.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
                  </div>
                </div>
              </MobileCard>
            ))}
          </div>
        </>
      )}

      {/* Confirm Close Dialog */}
      <Dialog open={confirmCloseDialogOpen} onOpenChange={setConfirmCloseDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">You have unsaved changes. Are you sure you want to close without saving?</p>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setConfirmCloseDialogOpen(false)}>Continue Editing</Button>
            <Button type="button" variant="destructive" onClick={confirmDiscard}>Discard Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={deleteConfirm?.value || ''}
        affectedCount={deleteConfirm?.affectedCount || 0}
        affectedProperties={deleteConfirm?.affectedProperties || []}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Property Delete Confirmation Dialog */}
      <AlertDialog open={deletePropertyDialogOpen} onOpenChange={setDeletePropertyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPropertyToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProperty} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PropertiesManagement;
