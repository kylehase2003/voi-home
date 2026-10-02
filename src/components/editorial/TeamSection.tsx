import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { TeamLang, TeamMember } from "@/data/team";

interface TeamSectionProps {
  eyebrow: string;
  title: string;
  intro: string;
  members: TeamMember[];
}

// One person per row: a landscape photo on one side and their introduction
// on the other, alternating sides down the page like a magazine profile.
// Without a photo, the frame shows the person's number in the same
// oversized serif as the About page's manifesto list.
const TeamSection = ({ eyebrow, title, intro, members }: TeamSectionProps) => {
  const { i18n } = useTranslation();
  const lang = (["en", "ar", "ru"].includes(i18n.language) ? i18n.language : "en") as TeamLang;
  const isRTL = lang === "ar";
  const serif = isRTL ? "font-arabic" : "font-serif";

  return (
    <section className="py-16 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <RevealOnScroll className="max-w-2xl mb-14 md:mb-20">
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">{eyebrow}</div>
          <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground mb-5 ${serif}`}>
            {title}
          </h2>
          <p className="text-muted-foreground leading-[1.7] max-w-xl">{intro}</p>
        </RevealOnScroll>

        <div className="space-y-16 md:space-y-24">
          {members.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <RevealOnScroll key={`${m.name}-${i}`}>
                <article
                  className={`grid grid-cols-1 gap-8 md:gap-16 items-center ${
                    flip ? "md:grid-cols-[1fr_1.35fr]" : "md:grid-cols-[1.35fr_1fr]"
                  }`}
                >
                  <div
                    className={`relative aspect-[3/2] rounded-[20px] overflow-hidden bg-muted ${
                      flip ? "md:order-2" : ""
                    }`}
                  >
                    {m.photo ? (
                      <img src={m.photo} alt={m.localName?.[lang] ?? m.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl font-serif text-foreground/15 tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  <div className={`max-w-md ${flip ? "md:order-1 md:justify-self-end" : ""}`}>
                    <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
                      {m.role[lang] ?? m.role.en}
                    </div>
                    <h3
                      className={`text-3xl md:text-[40px] leading-[1.1] tracking-[-1px] text-foreground mb-5 ${serif}`}
                    >
                      {m.localName?.[lang] ?? m.name}
                    </h3>
                    <p className="text-muted-foreground leading-[1.7]">{m.bio[lang] ?? m.bio.en}</p>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
