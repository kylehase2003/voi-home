import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HiddenDefaults {
  [key: string]: string[];
}

interface RestoreHiddenOptionsProps {
  hiddenDefaults: HiddenDefaults;
  onRestore: (category: string, value: string) => void;
  categoryLabels?: Record<string, string>;
  formatOption?: (category: string, value: string) => string;
}

const DEFAULT_CATEGORY_LABELS: Record<string, string> = {
  region: 'Region',
  locations: 'Region',
  property_type: 'Property Type',
  property_types: 'Property Type',
  layout: 'Layout',
  layouts: 'Layout',
  transaction_type: 'Transaction Type',
  transaction_types: 'Transaction Type',
  title_deed: 'Title Deed',
  title_deeds: 'Title Deed',
  status: 'Status',
  statuses: 'Status',
  benefit: 'Benefit',
  benefits: 'Benefit',
};

const formatStatusValue = (value: string): string => {
  if (value === 'under_construction') return 'Under Construction';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatTransactionValue = (value: string): string => {
  if (value === 'sale') return 'For Sale';
  if (value === 'rent') return 'For Rent';
  return value;
};

export function RestoreHiddenOptions({
  hiddenDefaults,
  onRestore,
  categoryLabels = DEFAULT_CATEGORY_LABELS,
  formatOption,
}: RestoreHiddenOptionsProps) {
  const hasHiddenItems = Object.values(hiddenDefaults).some(arr => arr && arr.length > 0);

  if (!hasHiddenItems) {
    return null;
  }

  const getDisplayValue = (category: string, value: string): string => {
    if (formatOption) {
      return formatOption(category, value);
    }
    
    if (category === 'status' || category === 'statuses') {
      return formatStatusValue(value);
    }
    if (category === 'transaction_type' || category === 'transaction_types') {
      return formatTransactionValue(value);
    }
    return value;
  };

  const getCategoryLabel = (category: string): string => {
    return categoryLabels[category] || category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-3 mb-6">
      <div className="bg-amber-500/10 border-l-4 border-amber-500 px-4 py-2 rounded">
        <h3 className="text-lg font-bold text-amber-600 flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          Restore Hidden Options
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Click to restore previously deleted default options
        </p>
      </div>
      <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md">
        {Object.entries(hiddenDefaults).map(([category, values]) =>
          values?.map((value) => (
            <Button
              key={`${category}-${value}`}
              variant="outline"
              size="sm"
              onClick={() => onRestore(category, value)}
              className="gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              {getDisplayValue(category, value)} ({getCategoryLabel(category)})
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
