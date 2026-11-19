import type { Guide } from "./types";
import { livingInIstanbul, europeanVsAsianSide, familyAreas, dailyLife } from "./articles/lifestyle";
import { residencePermit, howToBuy, tapuGuide, offPlan } from "./articles/buying";
import { taxesAndCosts, investingInIstanbul, rentalYield, rentingOut } from "./articles/money";

export type { Guide } from "./types";

// Keep in sync with the guide slugs in scripts/generate-sitemap.ts.
export const GUIDES: Guide[] = [
  residencePermit,
  livingInIstanbul,
  taxesAndCosts,
  howToBuy,
  europeanVsAsianSide,
  investingInIstanbul,
  tapuGuide,
  familyAreas,
  rentalYield,
  offPlan,
  dailyLife,
  rentingOut,
];

export const findGuide = (slug: string | undefined) => GUIDES.find((g) => g.slug === slug);

/**
 * Merge static guides into a list of blog rows from the database. A database
 * row with the same slug wins, so a guide can later be moved into the admin
 * panel without duplicates. Result is sorted newest first.
 */
export function mergeWithGuides<T extends { slug: string; published_at: string | null }>(rows: T[]): (T | Guide)[] {
  const slugs = new Set(rows.map((r) => r.slug));
  const merged: (T | Guide)[] = [...rows, ...GUIDES.filter((g) => !slugs.has(g.slug))];
  return merged.sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));
}
