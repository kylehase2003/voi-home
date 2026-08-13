import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  steps: Step[];
}

const ProcessSteps = ({ tag, title, description, image, steps }: ProcessStepsProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="min-h-[90vh] grid md:grid-cols-2 bg-primary text-primary-foreground mx-2 md:mx-3 my-3 rounded-[20px] overflow-hidden">
      <RevealOnScroll className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-20">
        <div className="text-xs font-medium uppercase tracking-[1.5px] text-primary-foreground/35 mb-4">{tag}</div>
        <h2 className={`text-3xl md:text-[42px] leading-[1.1] tracking-[-1.5px] mb-5 max-w-[440px] ${isRTL ? "font-arabic" : "font-serif"}`}>
          {title}
        </h2>
        <p className="text-base text-primary-foreground/55 leading-[1.7] max-w-[400px] mb-12">{description}</p>

        <div className="grid grid-cols-2 gap-px bg-primary-foreground/[0.06] rounded-xl overflow-hidden">
          {steps.map((step) => (
            <div key={step.num} className="p-5 bg-primary text-center">
              <div className="font-mono text-[10px] text-primary-foreground/20 mb-2">{step.num}</div>
              <div className="text-sm font-medium mb-1">{step.title}</div>
              <div className="text-[11.5px] text-primary-foreground/35 leading-[1.5]">{step.desc}</div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
      <div className="relative hidden md:block">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
      </div>
    </section>
  );
};

export default ProcessSteps;
