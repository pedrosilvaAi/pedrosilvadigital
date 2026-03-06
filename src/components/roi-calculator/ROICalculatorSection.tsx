import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

const withoutAgent = [
  "Mensagens perdidas fora do horário",
  "Leads que esfriam antes de responderes",
  "Fins-de-semana e feriados sem atendimento",
  "Tempo gasto a repetir as mesmas informações",
  "Marcações esquecidas ou mal registadas",
];

const withAgent = [
  "Resposta em segundos, 24 horas por dia",
  "Leads qualificados automaticamente",
  "Agenda preenchida mesmo fora de horas",
  "Zero tempo em perguntas repetitivas",
  "Notificação só quando realmente importa",
];

export function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="resultados" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              O que muda no{" "}
              <span className="text-gradient">teu negócio</span>
            </h2>
          </AnimatedSection>

          <div
            ref={ref}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Without Agent */}
            <div className="bg-card rounded-2xl border border-destructive/30 p-6 md:p-8 shadow-lg transition-all duration-500">
              <h3 className="text-xl font-semibold text-destructive mb-6">Sem agente</h3>
              <ul className="space-y-4">
                {withoutAgent.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With Agent */}
            <div className="bg-card rounded-2xl border border-primary/30 p-6 md:p-8 shadow-lg transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              <h3 className="text-xl font-semibold text-primary mb-6">Com agente</h3>
              <ul className="space-y-4">
                {withAgent.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <AnimatedSection animation="fade-up" delay={300} className="text-center mt-12">
            <Button
              variant="hero"
              size="xl"
              className="hover-glow"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
            >
              Quero ver como funciona
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
