import { Link } from "react-router-dom";

interface PillOption {
  label: string;
  to?: string;
  value?: string;
}

interface PillPickerProps {
  options: PillOption[];
  active?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

const pillClass = (isActive: boolean) =>
  `px-6 py-3 rounded-full border text-[15px] transition-all duration-300 ${
    isActive
      ? "bg-primary text-primary-foreground border-primary"
      : "border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
  }`;

const PillPicker = ({ options, active, onSelect, className }: PillPickerProps) => (
  <div className={`flex flex-wrap justify-center gap-2.5 ${className ?? ""}`}>
    {options.map((option) =>
      option.to ? (
        <Link key={option.label} to={option.to} className={pillClass(active === option.value)}>
          {option.label}
        </Link>
      ) : (
        <button
          key={option.label}
          type="button"
          onClick={() => option.value && onSelect?.(option.value)}
          className={pillClass(active === option.value)}
        >
          {option.label}
        </button>
      ),
    )}
  </div>
);

export default PillPicker;
