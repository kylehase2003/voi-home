import scrollerSkylineTower from "@/assets/photos/scroller-skyline-tower.webp";
import scrollerBosphorusFerry from "@/assets/photos/scroller-bosphorus-ferry.webp";
import scrollerHillsideHomes from "@/assets/photos/scroller-hillside-homes.webp";
import scrollerBosphorusBridge from "@/assets/photos/scroller-bosphorus-bridge.webp";
import scrollerPeraFacades from "@/assets/photos/scroller-pera-facades.webp";
import scrollerTurret from "@/assets/photos/scroller-turret.webp";

// Municipality cards for the homepage photo strip. Each card links to
// /blog/<blogSlug>, so a published blog post with that exact slug must exist
// in the dashboard for the link to resolve.
export interface Municipality {
  blogSlug: string;
  image: string;
  name: { en: string; ar: string; ru: string };
}

export const MUNICIPALITIES: Municipality[] = [
  { blogSlug: "sisli", image: scrollerSkylineTower, name: { en: "Şişli", ar: "شيشلي", ru: "Шишли" } },
  { blogSlug: "uskudar", image: scrollerBosphorusFerry, name: { en: "Üsküdar", ar: "أوسكودار", ru: "Ускюдар" } },
  { blogSlug: "beykoz", image: scrollerHillsideHomes, name: { en: "Beykoz", ar: "بيكوز", ru: "Бейкоз" } },
  { blogSlug: "sariyer", image: scrollerBosphorusBridge, name: { en: "Sarıyer", ar: "صاريير", ru: "Сарыер" } },
  { blogSlug: "beyoglu", image: scrollerPeraFacades, name: { en: "Beyoğlu", ar: "بيوغلو", ru: "Бейоглу" } },
  { blogSlug: "kadikoy", image: scrollerTurret, name: { en: "Kadıköy", ar: "قاضي كوي", ru: "Кадыкёй" } },
];
