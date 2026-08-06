import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Property } from '@/types/property';

// Storage keys for custom options
export const STORAGE_KEYS = {
  CUSTOM_LOCATIONS: 'property_custom_locations',
  CUSTOM_PROPERTY_TYPES: 'property_custom_types',
  CUSTOM_BENEFITS: 'property_custom_benefits',
  CUSTOM_TITLE_DEEDS: 'property_custom_title_deeds',
  CUSTOM_STATUSES: 'property_custom_statuses',
  CUSTOM_AMENITIES: 'property_custom_amenities',
  CUSTOM_TRANSACTION_TYPES: 'property_custom_transaction_types',
  CUSTOM_DISTRICTS: 'property_custom_districts',
  CUSTOM_CLASSES: 'property_custom_classes',
  CUSTOM_LAYOUTS: 'property_custom_layouts',
  CUSTOM_CITIES: 'property_custom_cities',
} as const;

// Default values configuration
export const DEFAULT_OPTIONS = {
  locations: ['Dubai', 'Turkey'],
  propertyTypes: ['Apartment', 'Villa', 'Penthouse', 'Commercial', 'Office', 'Warehouse'],
  benefits: ['High ROI', 'Citizenship Eligible', 'Rental Yields', 'Lifestyle', 'Investment Opportunity'],
  titleDeeds: ['Freehold', 'Leasehold', 'Shared Ownership', 'Ready', 'Not Ready'],
  statuses: ['available', 'sold', 'rented', 'ready', 'under_construction', 'draft'],
  transactionTypes: ['sale', 'rent'],
  classes: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'Premium', 'Luxury'],
  layouts: ['0+1', '1+1', '2+1', '3+1', '4+1', '5+1'],
} as const;

// Category configuration for unified handling
export interface CategoryConfig {
  storageKey: string;
  hiddenStorageKey: string;
  allDefaults: readonly string[];
  propertyField: keyof Property;
  isMultiValue?: boolean;
}

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  region: {
    storageKey: STORAGE_KEYS.CUSTOM_LOCATIONS,
    hiddenStorageKey: 'hidden_default_locations',
    allDefaults: DEFAULT_OPTIONS.locations,
    propertyField: 'region',
  },
  property_type: {
    storageKey: STORAGE_KEYS.CUSTOM_PROPERTY_TYPES,
    hiddenStorageKey: 'hidden_default_property_types',
    allDefaults: DEFAULT_OPTIONS.propertyTypes,
    propertyField: 'property_type',
    isMultiValue: true,
  },
  benefit: {
    storageKey: STORAGE_KEYS.CUSTOM_BENEFITS,
    hiddenStorageKey: 'hidden_default_benefits',
    allDefaults: DEFAULT_OPTIONS.benefits,
    propertyField: 'benefit',
    isMultiValue: true,
  },
  title_deed: {
    storageKey: STORAGE_KEYS.CUSTOM_TITLE_DEEDS,
    hiddenStorageKey: 'hidden_default_title_deeds',
    allDefaults: DEFAULT_OPTIONS.titleDeeds,
    propertyField: 'title_deed',
  },
  status: {
    storageKey: STORAGE_KEYS.CUSTOM_STATUSES,
    hiddenStorageKey: 'hidden_default_statuses',
    allDefaults: DEFAULT_OPTIONS.statuses,
    propertyField: 'status',
  },
  transaction_type: {
    storageKey: STORAGE_KEYS.CUSTOM_TRANSACTION_TYPES,
    hiddenStorageKey: 'hidden_default_transaction_types',
    allDefaults: DEFAULT_OPTIONS.transactionTypes,
    propertyField: 'transaction_type',
  },
  layout: {
    storageKey: STORAGE_KEYS.CUSTOM_LAYOUTS,
    hiddenStorageKey: 'hidden_default_layouts',
    allDefaults: DEFAULT_OPTIONS.layouts,
    propertyField: 'layout',
    isMultiValue: true,
  },
  district: {
    storageKey: STORAGE_KEYS.CUSTOM_DISTRICTS,
    hiddenStorageKey: '',
    allDefaults: [],
    propertyField: 'district',
  },
  class: {
    storageKey: STORAGE_KEYS.CUSTOM_CLASSES,
    hiddenStorageKey: 'hidden_default_classes',
    allDefaults: DEFAULT_OPTIONS.classes,
    propertyField: 'area_class',
  },
  amenity: {
    storageKey: STORAGE_KEYS.CUSTOM_AMENITIES,
    hiddenStorageKey: '',
    allDefaults: [],
    propertyField: 'features' as keyof Property,
    isMultiValue: true,
  },
  city: {
    storageKey: STORAGE_KEYS.CUSTOM_CITIES,
    hiddenStorageKey: '',
    allDefaults: [],
    propertyField: 'location',
  },
};

export interface OptionsState {
  defaults: string[];
  custom: string[];
  hidden: string[];
}

export interface AffectedProperty {
  id: string;
  title: string;
  slug: string | null;
}

export interface DeleteConfirmation {
  type: 'default' | 'custom';
  category: string;
  value: string;
  affectedCount: number;
  affectedProperties: AffectedProperty[];
}

export function useCustomOptions(properties: Property[]) {
  // State for all option categories
  const [optionsState, setOptionsState] = useState<Record<string, OptionsState>>({
    region: { defaults: [...DEFAULT_OPTIONS.locations], custom: [], hidden: [] },
    property_type: { defaults: [...DEFAULT_OPTIONS.propertyTypes], custom: [], hidden: [] },
    benefit: { defaults: [...DEFAULT_OPTIONS.benefits], custom: [], hidden: [] },
    title_deed: { defaults: [...DEFAULT_OPTIONS.titleDeeds], custom: [], hidden: [] },
    status: { defaults: [...DEFAULT_OPTIONS.statuses], custom: [], hidden: [] },
    transaction_type: { defaults: [...DEFAULT_OPTIONS.transactionTypes], custom: [], hidden: [] },
    layout: { defaults: [...DEFAULT_OPTIONS.layouts], custom: [], hidden: [] },
    class: { defaults: [...DEFAULT_OPTIONS.classes], custom: [], hidden: [] },
    district: { defaults: [], custom: [], hidden: [] },
    amenity: { defaults: [], custom: [], hidden: [] },
    city: { defaults: [], custom: [], hidden: [] },
  });

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmation | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load all custom values from localStorage
  const loadCustomValues = useCallback(() => {
    const newState = { ...optionsState };

    // Load custom values
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const category = key.toLowerCase().replace('custom_', '').replace('_', '_');
        const categoryKey = mapStorageKeyToCategory(storageKey);
        if (categoryKey && newState[categoryKey]) {
          newState[categoryKey].custom = JSON.parse(saved);
        }
      }
    });

    // Load hidden defaults and filter visible defaults
    Object.entries(CATEGORY_CONFIGS).forEach(([category, config]) => {
      if (config.hiddenStorageKey) {
        const hidden = localStorage.getItem(config.hiddenStorageKey);
        if (hidden) {
          const hiddenValues = JSON.parse(hidden);
          newState[category] = {
            ...newState[category],
            hidden: hiddenValues,
            defaults: config.allDefaults.filter(d => !hiddenValues.includes(d)) as string[],
          };
        }
      }
    });

    setOptionsState(newState);
  }, []);

  // Save custom value
  const saveCustomValue = useCallback((category: string, value: string) => {
    const config = CATEGORY_CONFIGS[category];
    if (!config || !value.trim()) return;

    const currentCustom = optionsState[category]?.custom || [];
    if (currentCustom.includes(value.trim())) return;

    const updated = [...currentCustom, value.trim()];
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
    
    setOptionsState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        custom: updated,
      },
    }));
    
    toast.success(`${value} added`);
  }, [optionsState]);

  // Delete custom value
  const deleteCustomValue = useCallback((category: string, value: string) => {
    const config = CATEGORY_CONFIGS[category];
    if (!config) return;

    const currentCustom = optionsState[category]?.custom || [];
    const updated = currentCustom.filter(item => item !== value);
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
    
    setOptionsState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        custom: updated,
      },
    }));
    
    toast.success('Option deleted');
  }, [optionsState]);

  // Delete default value (hide it)
  const deleteDefaultValue = useCallback((category: string, value: string) => {
    const config = CATEGORY_CONFIGS[category];
    if (!config || !config.hiddenStorageKey) return;

    const currentDefaults = optionsState[category]?.defaults || [];
    const currentHidden = optionsState[category]?.hidden || [];
    
    const updatedDefaults = currentDefaults.filter(item => item !== value);
    const updatedHidden = [...currentHidden, value];
    
    localStorage.setItem(config.hiddenStorageKey, JSON.stringify(updatedHidden));
    
    setOptionsState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        defaults: updatedDefaults,
        hidden: updatedHidden,
      },
    }));
    
    toast.success(`${value} hidden`);
  }, [optionsState]);

  // Restore hidden default
  const restoreHiddenDefault = useCallback((category: string, value: string) => {
    const config = CATEGORY_CONFIGS[category];
    if (!config || !config.hiddenStorageKey) return;

    const currentDefaults = optionsState[category]?.defaults || [];
    const currentHidden = optionsState[category]?.hidden || [];
    
    const updatedDefaults = [...currentDefaults, value];
    const updatedHidden = currentHidden.filter(item => item !== value);
    
    localStorage.setItem(config.hiddenStorageKey, JSON.stringify(updatedHidden));
    
    setOptionsState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        defaults: updatedDefaults,
        hidden: updatedHidden,
      },
    }));
    
    toast.success(`${value} restored`);
  }, [optionsState]);

  // Get affected properties
  const getAffectedProperties = useCallback((category: string, value: string): AffectedProperty[] => {
    const config = CATEGORY_CONFIGS[category];
    if (!config) return [];

    return properties.filter(prop => {
      const fieldValue = prop[config.propertyField];
      if (!fieldValue) return false;

      if (config.isMultiValue) {
        if (typeof fieldValue === 'string') {
          return fieldValue.split(',').map(v => v.trim()).includes(value);
        }
        if (Array.isArray(fieldValue)) {
          return (fieldValue as unknown[]).some(v => 
            typeof v === 'string' && v === value
          );
        }
        return false;
      }
      
      return fieldValue === value;
    }).map(prop => ({
      id: prop.id,
      title: prop.title,
      slug: prop.slug || null,
    }));
  }, [properties]);

  // Request delete confirmation
  const requestDeleteConfirmation = useCallback((
    type: 'default' | 'custom',
    category: string,
    value: string
  ) => {
    const affectedProperties = getAffectedProperties(category, value);
    setDeleteConfirm({ 
      type, 
      category, 
      value, 
      affectedCount: affectedProperties.length,
      affectedProperties 
    });
    setDeleteDialogOpen(true);
  }, [getAffectedProperties]);

  // Confirm delete
  const confirmDelete = useCallback(() => {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === 'default') {
      deleteDefaultValue(deleteConfirm.category, deleteConfirm.value);
    } else {
      deleteCustomValue(deleteConfirm.category, deleteConfirm.value);
    }

    setDeleteDialogOpen(false);
    setDeleteConfirm(null);
  }, [deleteConfirm, deleteDefaultValue, deleteCustomValue]);

  // Cancel delete
  const cancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setDeleteConfirm(null);
  }, []);

  // Get all options for a category (defaults + custom)
  const getOptions = useCallback((category: string): { defaults: string[]; custom: string[] } => {
    return {
      defaults: optionsState[category]?.defaults || [],
      custom: optionsState[category]?.custom || [],
    };
  }, [optionsState]);

  // Get all hidden defaults
  const getAllHiddenDefaults = useCallback((): Record<string, string[]> => {
    const hidden: Record<string, string[]> = {};
    Object.keys(optionsState).forEach(category => {
      if (optionsState[category]?.hidden?.length > 0) {
        hidden[category] = optionsState[category].hidden;
      }
    });
    return hidden;
  }, [optionsState]);

  return {
    optionsState,
    loadCustomValues,
    saveCustomValue,
    deleteCustomValue,
    deleteDefaultValue,
    restoreHiddenDefault,
    requestDeleteConfirmation,
    confirmDelete,
    cancelDelete,
    getOptions,
    getAllHiddenDefaults,
    deleteConfirm,
    deleteDialogOpen,
    setDeleteDialogOpen,
  };
}

// Helper function to map storage key to category
function mapStorageKeyToCategory(storageKey: string): string | null {
  const mapping: Record<string, string> = {
    [STORAGE_KEYS.CUSTOM_LOCATIONS]: 'region',
    [STORAGE_KEYS.CUSTOM_PROPERTY_TYPES]: 'property_type',
    [STORAGE_KEYS.CUSTOM_BENEFITS]: 'benefit',
    [STORAGE_KEYS.CUSTOM_TITLE_DEEDS]: 'title_deed',
    [STORAGE_KEYS.CUSTOM_STATUSES]: 'status',
    [STORAGE_KEYS.CUSTOM_AMENITIES]: 'amenity',
    [STORAGE_KEYS.CUSTOM_TRANSACTION_TYPES]: 'transaction_type',
    [STORAGE_KEYS.CUSTOM_DISTRICTS]: 'district',
    [STORAGE_KEYS.CUSTOM_CLASSES]: 'class',
    [STORAGE_KEYS.CUSTOM_LAYOUTS]: 'layout',
    [STORAGE_KEYS.CUSTOM_CITIES]: 'city',
  };
  return mapping[storageKey] || null;
}
