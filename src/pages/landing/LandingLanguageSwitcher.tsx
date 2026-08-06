import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LandingLang } from "./types";

const visibleLangs: { key: LandingLang; label: string; short: string }[] = [
  { key: "en", label: "English", short: "EN" },
  { key: "ar", label: "العربية", short: "AR" },
];

interface Props {
  lang: LandingLang;
  setLang: (l: LandingLang) => void;
}

const LandingLanguageSwitcher = ({ lang, setLang }: Props) => (
  <div className="fixed top-4 right-4 z-50">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-primary/80 backdrop-blur-sm text-primary-foreground hover:text-gold hover:bg-primary/90 gap-2 rounded-full px-4"
        >
          <Globe className="h-4 w-4" />
          <span>{visibleLangs.find(l => l.key === lang)?.short ?? "EN"}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card z-[60]">
        {visibleLangs.map((l) => (
          <DropdownMenuItem
            key={l.key}
            onClick={() => setLang(l.key)}
            className={lang === l.key ? "bg-gold/10 text-gold" : ""}
          >
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default LandingLanguageSwitcher;
