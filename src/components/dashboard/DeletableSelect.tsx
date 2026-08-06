import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DeletableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  defaultOptions: string[];
  customOptions: string[];
  onDeleteDefault?: (value: string) => void;
  onDeleteCustom?: (value: string) => void;
  customValue?: string;
  onCustomValueChange?: (value: string) => void;
  addCustomLabel?: string;
  formatOption?: (value: string) => string;
  disabled?: boolean;
  className?: string;
}

export function DeletableSelect({
  value,
  onValueChange,
  placeholder,
  defaultOptions,
  customOptions,
  onDeleteDefault,
  onDeleteCustom,
  customValue = '',
  onCustomValueChange,
  addCustomLabel = '+ Add Custom',
  formatOption,
  disabled = false,
  className,
}: DeletableSelectProps) {
  const displayValue = formatOption ? formatOption(value) : value;

  return (
    <div className={className}>
      <Select
        value={value}
        onValueChange={(val) => {
          onValueChange(val);
          if (val !== 'custom' && onCustomValueChange) {
            onCustomValueChange('');
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger className="bg-background">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          {defaultOptions.map((option) => (
            <div 
              key={option} 
              className="relative flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer group"
            >
              <SelectItem value={option} className="flex-1 border-0 bg-transparent p-0">
                {formatOption ? formatOption(option) : option}
              </SelectItem>
              {onDeleteDefault && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDefault(option);
                  }}
                  className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
          {customOptions.map((option) => (
            <div 
              key={option} 
              className="relative flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer group"
            >
              <SelectItem value={option} className="flex-1 border-0 bg-transparent p-0">
                {formatOption ? formatOption(option) : option}
              </SelectItem>
              {onDeleteCustom && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCustom(option);
                  }}
                  className="opacity-0 group-hover:opacity-100 ml-2 text-destructive hover:text-destructive/80 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
          <SelectItem value="custom">{addCustomLabel}</SelectItem>
        </SelectContent>
      </Select>
      {value === 'custom' && onCustomValueChange && (
        <Input
          className="mt-2"
          placeholder="Enter custom value"
          value={customValue}
          onChange={(e) => onCustomValueChange(e.target.value)}
          required
        />
      )}
    </div>
  );
}
