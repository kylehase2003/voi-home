import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Building2, Home, KeyRound, Landmark, ShieldCheck, Sofa, TrendingUp } from "lucide-react";
import { SERVICES_EN } from "./en";
import { SERVICES_AR } from "./ar";
import { SERVICES_RU } from "./ru";

// The eight core services, in the order of the client's brief
// ("VOI Eight Core Services - Developer Brief"). Each one gets a card on
// /services and its own page at /services/<slug>, rendered from one template.
//
// Images: Unsplash photos (free to use under the Unsplash License) chosen per
// service. Swap them here when the client sends his own photography.
import imgSales from "@/assets/photos/services/property-sales.webp";
import imgRentals from "@/assets/photos/services/property-rentals.webp";
import imgInvestment from "@/assets/photos/services/investment-advisory.webp";
import imgManagement from "@/assets/photos/services/property-management.webp";
import imgAfterSales from "@/assets/photos/services/after-sales-support.webp";
import imgCitizenship from "@/assets/photos/services/citizenship-assistance.webp";
import imgInterior from "@/assets/photos/services/interior-design.webp";
import imgProjectOffice from "@/assets/photos/services/project-sales-office-setup.webp";

export type ServiceSlug =
  | "property-sales"
  | "property-rentals"
  | "investment-advisory"
  | "property-management"
  | "after-sales-support"
  | "citizenship-assistance"
  | "interior-design"
  | "project-sales-office-setup";

export type ServiceCategory = "property" | "investment" | "project";

export interface ServiceDef {
  slug: ServiceSlug;
  category: ServiceCategory;
  icon: LucideIcon;
  image: string;
}

/** One block of "what we do" - a numbered sub-service with its activities. */
export interface ServiceSection {
  title: string;
  items: string[];
}

export interface ServiceContent {
  /** Card and page title. */
  name: string;
  /** One line for the overview card. */
  short: string;
  /** The brief's headline line for the service. */
  tagline: string;
  /** The brief's introduction paragraph. */
  intro: string;
  sections: ServiceSection[];
  /** Interior design only: the design styles ("schools") we work in. */
  styles?: { name: string; description: string }[];
  /** Scope / accuracy note required by the brief (citizenship, investment). */
  note?: string;
  /** SEO meta description. */
  seoDescription: string;
}

export type ServiceLang = "en" | "ar" | "ru";

export const SERVICES: ServiceDef[] = [
  { slug: "property-sales", category: "property", icon: Home, image: imgSales },
  { slug: "property-rentals", category: "property", icon: KeyRound, image: imgRentals },
  { slug: "investment-advisory", category: "investment", icon: TrendingUp, image: imgInvestment },
  { slug: "property-management", category: "property", icon: Building2, image: imgManagement },
  { slug: "after-sales-support", category: "property", icon: ShieldCheck, image: imgAfterSales },
  { slug: "citizenship-assistance", category: "investment", icon: Landmark, image: imgCitizenship },
  { slug: "interior-design", category: "project", icon: Sofa, image: imgInterior },
  { slug: "project-sales-office-setup", category: "project", icon: BriefcaseBusiness, image: imgProjectOffice },
];

const CONTENT: Record<ServiceLang, Record<ServiceSlug, ServiceContent>> = {
  en: SERVICES_EN,
  ar: SERVICES_AR,
  ru: SERVICES_RU,
};

export const serviceLang = (lng: string): ServiceLang => (lng === "ar" || lng === "ru" ? lng : "en");

export const getServiceContent = (slug: ServiceSlug, lng: string): ServiceContent =>
  CONTENT[serviceLang(lng)][slug] ?? CONTENT.en[slug];

export const findService = (slug: string | undefined): ServiceDef | undefined =>
  SERVICES.find((s) => s.slug === slug);
