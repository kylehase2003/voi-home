import { X, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MultiSelectCheckboxProps {
  value: string; // Comma-separated string
  onChange: (value: string) => void;
  placeholder: string;
  defaultOptions: string[];
  customOptions: string[];
  onDeleteDefault?: (value: string) => void;
  onDeleteCustom?: (value: string) => void;
  customInputValue?: string;
  onCustomInputChange?: (value: string) => void;
  onAddCustom?: () => void;
  formatOption?: (value: string) => string;
  addCustomPlaceholder?: string;
  className?: string;
}

export function MultiSelectCheckbox({
  value,
  onChange,
  placeholder,
  defaultOptions,
  customOptions,
  onDeleteDefault,
  onDeleteCustom,
  customInputValue = '',
  onCustomInputChange,
  onAddCustom,
  formatOption,
  addCustomPlaceholder = 'Add custom value',
  className,
}: MultiSelectCheckboxProps) {
  const selectedValues = value ? value.split(',').filter(Boolean).map(v => v.trim()) : [];

  const handleToggle = (option: string, checked: boolean) => {
    const newSelected = checked
      ? [...selectedValues, option]
      : selectedValues.filter(v => v !== option);
    onChange(newSelected.join(','));
  };

  const handleRemoveValue = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = selectedValues.filter(v => v !== valueToRemove);
    onChange(newSelected.join(','));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-background"
          >
            <span className="text-muted-foreground">
              {selectedValues.length > 0 
                ? `${selectedValues.length} selected` 
                : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-background z-50 p-4" align="start">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Select one or more options
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {/* Default options */}
              {defaultOptions.map((option) => {
                const isChecked = selectedValues.includes(option);
                return (
                  <div key={option} className="flex items-center justify-between group">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleToggle(option, e.target.checked)}
                        className="h-4 w-4 rounded border-input accent-primary"
                      />
                      <span className="text-sm">
                        {formatOption ? formatOption(option) : option}
                      </span>
                    </label>
                    {onDeleteDefault && (
                      <button
                        type="button"
                        onClick={() => onDeleteDefault(option)}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })}
              
              {/* Custom options */}
              {customOptions.map((option) => {
                const isChecked = selectedValues.includes(option);
                return (
                  <div key={option} className="flex items-center justify-between group">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleToggle(option, e.target.checked)}
                        className="h-4 w-4 rounded border-input accent-primary"
                      />
                      <span className="text-sm">
                        {formatOption ? formatOption(option) : option}
                      </span>
                    </label>
                    {onDeleteCustom && (
                      <button
                        type="button"
                        onClick={() => onDeleteCustom(option)}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Add custom option */}
            {onCustomInputChange && onAddCustom && (
              <div className="border-t pt-3">
                <div className="flex gap-2">
                  <Input
                    placeholder={addCustomPlaceholder}
                    value={customInputValue}
                    onChange={(e) => onCustomInputChange(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={onAddCustom}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected values as badges */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((val) => (
            <Badge
              key={val}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <span>{formatOption ? formatOption(val) : val}</span>
              <button
                type="button"
                onClick={(e) => handleRemoveValue(val, e)}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
