import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface ServiceRow {
  tag?: string;
  title: string;
  description: string;
  image: string;
  reversed?: boolean;
}

interface ServicesRowsProps {
  headline: string;
  subheadline?: string;
  rows: ServiceRow[];
}

// One black "Our Services" section holding several image/text rows, all at
// the same compact scale so they read as one consistent block rather than
// separate sections. Fades from the page background into black at the top
// and back out at the bottom.
const ServicesRows = ({ headline, subheadline, rows }: ServicesRowsProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // A plain two-stop gradient reads as a hard-ish smear because linear color
  // interpolation doesn't match perceived brightness. Layering a black
  // overlay with an eased opacity ramp (smoothstep-like stops) on top of a
  // solid background-colored base fades much more smoothly, and works
  // regardless of what --background actually resolves to.
  const fadeInStyle = {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 12%, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.2) 37%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.62) 62%, rgba(0,0,0,0.82) 75%, rgba(0,0,0,0.94) 87%, rgba(0,0,0,1) 100%)",
  };
  const fadeOutStyle = {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.82) 25%, rgba(0,0,0,0.62) 38%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 63%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.02) 88%, rgba(0,0,0,0) 100%)",
  };

  return (
    <section className="relative bg-black pt-32 md:pt-44 pb-56 md:pb-72">
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-background pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 pointer-events-none" style={fadeInStyle} />
      <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 bg-background pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 pointer-events-none" style={fadeOutStyle} />

      <RevealOnScroll className="relative px-6 md:px-14 pb-8 md:pb-12 text-center">
        <h3
          className={`text-2xl md:text-4xl leading-[1.15] tracking-[-1px] max-w-2xl mx-auto text-white ${
            isRTL ? "font-arabic" : "font-serif"
          }`}
        >
          {headline}
        </h3>
        {subheadline && (
          <p className="mt-4 text-base leading-[1.7] max-w-xl mx-auto text-white/60">{subheadline}</p>
        )}
      </RevealOnScroll>

      {rows.map((row, i) => (
        <div key={i} className="relative grid md:grid-cols-2 gap-0 items-center min-h-[50vh]">
          <RevealOnScroll
            className={`max-w-[480px] px-6 md:px-14 py-10 md:py-12 ${row.reversed ? "md:order-2 md:ml-auto" : "md:order-1 md:mr-auto"}`}
          >
            {row.tag && (
              <div className="text-xs font-medium uppercase tracking-[1.5px] mb-4 text-white/50">{row.tag}</div>
            )}
            <h2
              className={`text-2xl md:text-3xl leading-[1.12] tracking-[-1.2px] mb-5 text-white ${
                isRTL ? "font-arabic" : "font-serif"
              }`}
            >
              {row.title}
            </h2>
            <p className="text-sm leading-[1.7] mb-7 whitespace-pre-line text-white/65">{row.description}</p>
          </RevealOnScroll>
          <RevealOnScroll
            delay={100}
            className={`relative w-[calc(100%-2rem)] rounded-[20px] overflow-hidden aspect-[4/5] max-h-[42vh] m-4 bg-white/5 ${
              row.reversed ? "md:order-1 mr-auto" : "md:order-2 ml-auto"
            }`}
          >
            <img src={row.image} alt={row.title} className="absolute inset-0 w-full h-full object-cover" />
          </RevealOnScroll>
        </div>
      ))}
    </section>
  );
};

export default ServicesRows;
