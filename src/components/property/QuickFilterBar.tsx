import { useTranslation } from "react-i18next";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { ISTANBUL_DISTRICTS } from "@/constants/property";
import { PropertyFilters as Filters } from "@/types/property";

// The slim bar above the listings: city, layout (1+1 ... 5+), area and a price
// range. The full filter list still lives behind "More filters".

const CITIES = [{ value: "istanbul", label: "Istanbul", labelAr: "إسطنبول" }];
const LAYOUTS = ["1+1", "2+1", "3+1", "4+1", "5+"];
const POPULAR_AREAS = ["Sarıyer", "Beşiktaş", "Şişli", "Beyoğlu", "Kadıköy", "Üsküdar", "Beykoz", "Başakşehir"];
const OTHER_AREAS = ISTANBUL_DISTRICTS.filter((d) => !POPULAR_AREAS.includes(d));

export const PRICE_MAX = 1_000_000; // the top of the slider means "and above"
const PRICE_STEP = 50_000;
const PRICE_MARKS = [200_000, 400_000, 600_000, PRICE_MAX];

const fmt = (n: number) => (n === 0 ? "$0" : n >= 1_000_000 ? `$${n / 1_000_000}M` : `$${n / 1000}k`);

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onOpenMore: () => void;
  activeMoreCount: number;
}

const Pill = ({ label, value, active, onClear, children, wide }: {
  label: string; value: string; active: boolean; onClear: () => void; children: React.ReactNode; wide?: boolean;
}) => (
  <Popover>
    <div className="relative">
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex h-12 w-full min-w-0 flex-col items-start justify-center rounded-full border px-5 text-start transition-colors ${
            active ? "border-burgundy/50 bg-burgundy/[0.04]" : "border-border bg-white hover:border-foreground/30"
          } ${active ? "pe-10" : "pe-9"}`}
        >
          <span className="text-[10px] font-medium uppercase tracking-[1.2px] text-muted-foreground">{label}</span>
          <span className="w-full truncate text-sm text-foreground">{value}</span>
        </button>
      </PopoverTrigger>
      {active ? (
        <button
          type="button"
          aria-label={`Clear ${label}`}
          onClick={onClear}
          className="absolute end-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
    </div>
    <PopoverContent align="start" className={`${wide ? "w-[340px]" : "w-60"} rounded-2xl p-2`}>{children}</PopoverContent>
  </Popover>
);

const Option = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-start text-sm transition-colors hover:bg-muted ${
      selected ? "font-medium text-foreground" : "text-foreground/80"
    }`}
  >
    {children}
    {selected && <Check className="h-4 w-4 text-burgundy" />}
  </button>
);

const QuickFilterBar = ({ filters, onChange, onOpenMore, activeMoreCount }: Props) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const city = CITIES.find((c) => c.value === filters.city);
  const cityLabel = city ? (isAr ? city.labelAr : city.label) : t("properties.quick.allCities");
  const layoutLabel = filters.layout ? (filters.layout === "5+" ? t("properties.quick.fivePlus") : filters.layout) : t("properties.quick.anyType");
  const areaLabel = filters.district || t("properties.quick.anyArea");

  const min = filters.minPrice ? Number(filters.minPrice) : 0;
  const max = filters.maxPrice ? Number(filters.maxPrice) : PRICE_MAX;
  const priceActive = min > 0 || max < PRICE_MAX;
  const priceLabel = !priceActive
    ? t("properties.quick.anyPrice")
    : `${fmt(min)} ${t("properties.quick.to")} ${max >= PRICE_MAX ? `${fmt(PRICE_MAX)}+` : fmt(max)}`;

  return (
    <div className="mx-auto mb-10 grid max-w-5xl grid-cols-2 gap-2 md:grid-cols-[1fr_1fr_1fr_1.4fr_auto] md:gap-3" dir={isAr ? "rtl" : "ltr"}>
      <Pill label={t("properties.quick.city")} value={cityLabel} active={!!filters.city} onClear={() => onChange({ city: "", district: "" })}>
        <Option selected={!filters.city} onClick={() => onChange({ city: "", district: "" })}>{t("properties.quick.allCities")}</Option>
        {CITIES.map((c) => (
          <Option key={c.value} selected={filters.city === c.value} onClick={() => onChange({ city: c.value, district: "" })}>
            {isAr ? c.labelAr : c.label}
          </Option>
        ))}
      </Pill>

      <Pill label={t("properties.quick.type")} value={layoutLabel} active={!!filters.layout} onClear={() => onChange({ layout: "" })}>
        <Option selected={!filters.layout} onClick={() => onChange({ layout: "" })}>{t("properties.quick.anyType")}</Option>
        {LAYOUTS.map((l) => (
          <Option key={l} selected={filters.layout === l} onClick={() => onChange({ layout: l })}>
            <span dir="ltr">{l === "5+" ? t("properties.quick.fivePlus") : l}</span>
          </Option>
        ))}
      </Pill>

      <Pill label={t("properties.quick.area")} value={areaLabel} active={!!filters.district} onClear={() => onChange({ district: "" })} wide>
        <div className="max-h-80 overflow-y-auto">
          <Option selected={!filters.district} onClick={() => onChange({ district: "" })}>{t("properties.quick.anyArea")}</Option>
          <div className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[1.2px] text-muted-foreground">{t("properties.quick.popular")}</div>
          {POPULAR_AREAS.map((d) => (
            <Option key={d} selected={filters.district === d} onClick={() => onChange({ city: "istanbul", district: d })}>{d}</Option>
          ))}
          <div className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[1.2px] text-muted-foreground">{t("properties.quick.allAreas")}</div>
          {OTHER_AREAS.map((d) => (
            <Option key={d} selected={filters.district === d} onClick={() => onChange({ city: "istanbul", district: d })}>{d}</Option>
          ))}
        </div>
      </Pill>

      <Pill
        label={t("properties.quick.price")}
        value={priceLabel}
        active={priceActive}
        onClear={() => onChange({ minPrice: "", maxPrice: "" })}
        wide
      >
        <div className="px-3 pb-3 pt-4" dir="ltr">
          <div className="mb-5 flex items-baseline justify-between text-sm">
            <span className="font-medium">{fmt(min)}</span>
            <span className="font-medium">{max >= PRICE_MAX ? `${fmt(PRICE_MAX)}+` : fmt(max)}</span>
          </div>
          <Slider
            className="[&_[role=slider]]:border-burgundy [&_.bg-primary]:bg-burgundy"
            min={0}
            max={PRICE_MAX}
            step={PRICE_STEP}
            minStepsBetweenThumbs={1}
            value={[min, max]}
            onValueChange={([lo, hi]) =>
              onChange({ minPrice: lo > 0 ? String(lo) : "", maxPrice: hi < PRICE_MAX ? String(hi) : "" })
            }
            aria-label={t("properties.quick.price")}
          />
          <div className="relative mt-3 h-4 text-[11px] text-muted-foreground">
            {PRICE_MARKS.map((m) => (
              <span
                key={m}
                className="absolute -translate-x-1/2 whitespace-nowrap last:translate-x-[-100%]"
                style={{ left: `${(m / PRICE_MAX) * 100}%` }}
              >
                {m === PRICE_MAX ? `${fmt(m)}+` : fmt(m)}
              </span>
            ))}
          </div>
        </div>
      </Pill>

      <button
        type="button"
        onClick={onOpenMore}
        className="col-span-2 flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm text-foreground transition-colors hover:border-foreground/30 md:col-span-1"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {t("properties.quick.moreFilters")}
        {activeMoreCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1.5 text-[11px] text-white">{activeMoreCount}</span>
        )}
      </button>
    </div>
  );
};

export default QuickFilterBar;
