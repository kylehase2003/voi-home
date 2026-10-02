// Team shown on the About page. Fill in each person's name, role and short
// introduction ("who they are"), and drop their portrait into
// src/assets/team/ then import it here as `photo`. Portraits should be
// landscape (3:2), at least 1600px wide.
//
// `role` and `bio` take en/ar/ru; any language left out falls back to English.

import hakamPhoto from "@/assets/team/hakam.webp";
import lujainPhoto from "@/assets/team/lujain.webp";

export type TeamLang = "en" | "ar" | "ru";

export interface TeamMember {
  name: string;
  // Name as written in Arabic/Russian; falls back to `name`.
  localName?: Partial<Record<TeamLang, string>>;
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

export const TEAM: TeamMember[] = [
  {
    name: "Hakam",
    localName: { ar: "حكم", ru: "Хакам" },
    photo: hakamPhoto,
    role: { en: "Founder & CEO", ar: "المؤسس والرئيس التنفيذي", ru: "Основатель и генеральный директор" },
    bio: {
      en: "Hakam founded Voi Home on a simple conviction: that buying a home in Türkiye should feel as considered as the home itself. As CEO, Hakam sets the standard every property is measured against, and stays personally involved with the clients Voi Home advises.",
      ar: "أسّس حكم Voi Home انطلاقاً من قناعة بسيطة: أن شراء منزل في تركيا ينبغي أن يكون مدروساً بقدر المنزل نفسه. وبصفته الرئيس التنفيذي، يضع المعيار الذي يُقاس به كل عقار، ويبقى على صلة شخصية بالعملاء الذين تقدّم لهم Voi Home المشورة.",
      ru: "Хакам основал Voi Home, исходя из простого убеждения: покупка дома в Турции должна быть такой же продуманной, как и сам дом. Как генеральный директор, он задаёт стандарт, по которому оценивается каждый объект, и лично остаётся рядом с клиентами Voi Home.",
    },
  },
  {
    name: "Lujain",
    localName: { ar: "لجين", ru: "Луджейн" },
    photo: lujainPhoto,
    role: { en: "Property Advisor", ar: "مستشار عقاري", ru: "Консультант по недвижимости" },
    bio: {
      en: "Lujain guides clients from the first shortlist to the keys: arranging viewings, walking the streets around each home, and making sure no question goes unanswered along the way.",
      ar: "يرافق لجين العملاء من القائمة المختصرة الأولى حتى تسلّم المفاتيح: يرتّب المعاينات، ويمشي في الشوارع المحيطة بكل منزل، ويحرص على ألا يبقى أي سؤال دون جواب.",
      ru: "Луджейн сопровождает клиентов от первого короткого списка до ключей: организует просмотры, обходит улицы вокруг каждого дома и следит, чтобы ни один вопрос не остался без ответа.",
    },
  },
  placeholder(3),
  placeholder(4),
];
