import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { TeamLang, TeamMember } from "@/data/team";

interface TeamSectionProps {
  eyebrow: string;
  title: string;
  intro: string;
  members: TeamMember[];
}

// Each person gets their own card - portrait, name, role and a short
// introduction - rather than a wall of headshots. Cards wrap and center, so
// an uneven last row still sits balanced.
// Without a photo, the portrait shows the person's number in the same
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

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-16">
          {members.map((m, i) => (
            <RevealOnScroll
              key={`${m.name}-${i}`}
              delay={(i % 4) * 60}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)]"
            >
              <article>
                <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-muted mb-5">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center text-6xl font-serif text-foreground/15 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <h3 className={`text-xl leading-[1.25] tracking-[-0.3px] text-foreground mb-1.5 ${serif}`}>{m.name}</h3>
                <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                  {m.role[lang] ?? m.role.en}
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65]">{m.bio[lang] ?? m.bio.en}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
