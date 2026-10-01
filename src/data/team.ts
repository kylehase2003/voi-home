// Team shown on the About page. Fill in each person's name, role and short
// introduction ("who they are"), and drop their portrait into
// src/assets/team/ then import it here as `photo`. Portraits should be
// portrait-oriented (4:5), at least 800px wide.
//
// `role` and `bio` take en/ar/ru; any language left out falls back to English.

export type TeamLang = "en" | "ar" | "ru";

export interface TeamMember {
  name: string;
  photo?: string;
  role: Partial<Record<TeamLang, string>> & { en: string };
  bio: Partial<Record<TeamLang, string>> & { en: string };
}

const placeholder = (n: number): TeamMember => ({
  name: `Team member ${String(n).padStart(2, "0")}`,
  role: { en: "Role" },
  bio: {
    en: "Two or three sentences on who they are: their background, what they look after for our clients, and what they notice that others miss.",
  },
});

export const TEAM: TeamMember[] = Array.from({ length: 4 }, (_, i) => placeholder(i + 1));
