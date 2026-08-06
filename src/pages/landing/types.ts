export type LandingLang = "en" | "tr" | "ar";

export interface LandingContext {
  t: (key: string) => string;
  isRtl: boolean;
  scrollToForm: () => void;
  lang: LandingLang;
}
