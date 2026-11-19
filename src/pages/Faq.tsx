import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Info, Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServicesCta from "@/components/services/ServicesCta";
import FaqList, { faqLang } from "@/components/faq/FaqList";
import { FAQ_DISCLAIMER, FAQ_SECTIONS } from "@/data/faq";

// The client's 60 questions in his 10 sections. Each answer links to the
// in-depth guide that covers it, so the page works as an index to the guides.
const Faq = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const lng = faqLang(i18n.language);
  const serif = isRTL ? "font-arabic" : "font-serif";
  const [query, setQuery] = useState("");

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_SECTIONS;
    return FAQ_SECTIONS.map((s) => ({
      ...s,
      items: s.items.filter((i) => `${i.q[lng]} ${i.a[lng]}`.toLowerCase().includes(q)),
    })).filter((s) => s.items.length > 0);
  }, [query, lng]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_SECTIONS.flatMap((s) =>
        s.items.map((i) => ({
          "@type": "Question",
          name: i.q.en,
          acceptedAnswer: { "@type": "Answer", text: i.a.en },
        })),
      ),
    }),
    [],
  );

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="Buying Property & Living in Istanbul: FAQ | Voi Home"
        description="Answers to 60 common questions about living in Istanbul, residence permits, buying property in Turkey, citizenship by investment, renting, taxes and daily life."
        path="/faq"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="px-6 pt-14 md:pt-20 pb-10 md:pb-14">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-16 md:items-end">
              <div>
                <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-5">
                  {t("faqPage.eyebrow")}
                </div>
                <h1 className={`text-4xl md:text-[56px] leading-[1.05] tracking-[-1.5px] text-foreground ${serif}`}>
                  {t("faqPage.title")}
                </h1>
              </div>
              <div>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.7] mb-6">{t("faqPage.lead")}</p>
                <label className="relative block">
                  <span className="sr-only">{t("faqPage.searchPlaceholder")}</span>
                  <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-4 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("faqPage.searchPlaceholder")}
                    className="h-12 w-full rounded-full border border-border bg-card ps-11 pe-11 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus:border-evergreen/60 [&::-webkit-search-cancel-button]:hidden"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label={t("faqPage.clearSearch")}
                      className="absolute top-1/2 -translate-y-1/2 end-3 h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </label>
              </div>
            </RevealOnScroll>

            {/* Jump to a section */}
            {!query && (
              <RevealOnScroll delay={80} className="mt-10 md:mt-12">
                <nav aria-label={t("faqPage.sectionsLabel")} className="-mx-6 px-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible">
                  {FAQ_SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="shrink-0 rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-evergreen hover:bg-evergreen hover:text-white"
                    >
                      {s.title[lng]}
                    </a>
                  ))}
                </nav>
              </RevealOnScroll>
            )}
          </div>
        </section>

        {/* Sections */}
        <section className="px-6 pb-14 md:pb-20">
          <div className="max-w-6xl mx-auto">
            {sections.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">{t("faqPage.noResults")}</p>
            ) : (
              <div className="space-y-14 md:space-y-20">
                {sections.map((s) => {
                  const index = FAQ_SECTIONS.findIndex((x) => x.id === s.id);
                  return (
                    <div
                      key={s.id}
                      id={s.id}
                      className="scroll-mt-32 grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-16"
                    >
                      <div>
                        <div className="md:sticky md:top-32">
                          <div className="text-sm tabular-nums text-muted-foreground mb-3">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <h2 className={`text-2xl md:text-[32px] leading-[1.15] tracking-[-0.8px] text-foreground mb-2 ${serif}`}>
                            {s.title[lng]}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {t("faqPage.questionCount", { count: s.items.length })}
                          </p>
                        </div>
                      </div>
                      <FaqList items={s.items} />
                    </div>
                  );
                })}
              </div>
            )}

            <RevealOnScroll className="mt-14 md:mt-20 flex gap-3 rounded-2xl bg-muted/60 px-5 py-4 text-sm leading-[1.6] text-muted-foreground">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                <span className="font-medium text-foreground">{t("faqPage.importantInfo")}. </span>
                {FAQ_DISCLAIMER[lng]}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <ServicesCta />
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
