import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface FounderProfileProps {
  image: string;
  imageAlt?: string;
  quote: string;
  name: string;
  role: string;
}

// Full-bleed profile, not a rounded media card - the portrait runs edge to
// edge in its column and the copy sits opposite it behind an oversized
// quotation mark, closer to a magazine profile than a marketing row.
const FounderProfile = ({ image, imageAlt = "", quote, name, role }: FounderProfileProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[42%_58%] min-h-0 md:min-h-[640px]">
        <div className="relative h-[360px] md:h-auto">
          <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 md:px-16 py-14 md:py-0">
          <RevealOnScroll className="max-w-lg">
            <span
              aria-hidden
              className="block text-7xl md:text-8xl leading-none text-border font-serif mb-2"
            >
              &ldquo;
            </span>
            <p
              className={`text-lg md:text-xl text-foreground leading-[1.6] mb-8 ${
                isRTL ? "font-arabic" : "font-serif"
              }`}
            >
              {quote}
            </p>
            <div className="text-sm uppercase tracking-[1.5px] text-muted-foreground">
              {name} <span className="text-border mx-1.5">&middot;</span> {role}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default FounderProfile;
