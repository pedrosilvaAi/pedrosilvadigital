import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    subtitle: "(15–30 min)",
    description: "Analisamos os vossos processos de orçamentação, gestão de plantas e fluxo com fornecedores",
  },
  {
    number: "02",
    title: "Configuração",
    subtitle: "",
    description: "Configuramos o sistema para as vossas plantas, fornecedores e especificidades técnicas",
  },
  {
    number: "03",
    title: "Implementação",
    subtitle: "",
    description: "Ativamos o sistema, formamos a equipa e acompanhamos os primeiros projetos",
  },
];

export function Process() {
  return (
    <section id="processo" className="py-20 md:py-28 bg-secondary/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-3/4 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como <span className="text-gradient">Trabalhamos</span>
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} totalSteps={steps.length} />
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={600} className="text-center mt-12">
            <p className="text-muted-foreground italic text-lg px-6 py-4 rounded-xl bg-card/50 border border-border inline-block">
              "Primeiro percebemos o projeto; depois configuramos a tecnologia."
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: typeof steps[0];
  index: number;
  totalSteps: number;
}

function ProcessStep({ step, index, totalSteps }: ProcessStepProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative">
      {/* Animated connector line for desktop */}
      {index < totalSteps - 1 && (
        <div 
          className={`hidden md:block absolute top-8 left-[60%] w-full h-[2px] transition-all duration-1000 ease-out ${
            isVisible ? "bg-gradient-to-r from-primary/50 to-primary/20" : "bg-transparent"
          }`}
          style={{ transitionDelay: `${(index + 1) * 200}ms` }}
        >
          {isVisible && (
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-shimmer"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          )}
        </div>
      )}
      
      <div 
        className={`text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4 transition-all duration-500 ${
          isVisible ? "scale-100 shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]" : "scale-75"
        }`}
        style={{ transitionDelay: `${index * 150 + 100}ms` }}
        >
          <span className="relative z-10">{step.number}</span>
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: "2s" }} />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {step.title}
          {step.subtitle && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {step.subtitle}
            </span>
          )}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
