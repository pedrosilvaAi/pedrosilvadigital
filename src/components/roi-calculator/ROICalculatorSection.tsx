import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

const setupFeatures = [
  "Agente personalizado com o teu tom e serviços",
  "Integração com o teu WhatsApp Business",
  "Painel de leads no Airtable",
  "Escalação automática para humano",
  "Teste ao vivo antes de activar",
];

const maintenanceFeatures = [
  "Suporte técnico incluído",
  "Ajustes de respostas e fluxos",
  "Sem contratos longos",
  "Cancelas quando quiseres",
];

export function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="precos" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Investimento claro,{" "}
              <span className="text-gradient">sem surpresas</span>
            </h2>
          </AnimatedSection>

          {/* Pricing Cards */}
          <div
            ref={ref}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Setup Card */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500">
              <h3 className="text-xl font-semibold text-foreground mb-2">Setup</h3>
              <div className="text-xl md:text-2xl font-bold text-primary mb-3">
                Pagamento único
              </div>
              <p className="text-muted-foreground mb-6">
                Configuração completa e personalizada do agente para o teu negócio. Pago uma vez.
              </p>
              <ul className="space-y-3">
                {setupFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maintenance Card */}
            <div className="bg-card rounded-2xl border border-primary/30 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Manutenção Mensal</h3>
              <div className="text-xl md:text-2xl font-bold text-primary mb-3">
                Mensal flexível
              </div>
              <p className="text-muted-foreground mb-6">
                Suporte contínuo, ajustes e melhorias ao agente.
              </p>
              <ul className="space-y-3">
                {maintenanceFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom text + CTA */}
          <AnimatedSection animation="fade-up" delay={300} className="text-center mt-12">
            <p className="text-muted-foreground italic text-lg px-6 py-4 rounded-xl bg-card/50 border border-border inline-block mb-8">
              "O primeiro mês paga-se sozinho com uma única marcação que o agente captura fora de horas."
            </p>
            <div>
              <Button
                variant="hero"
                size="xl"
                className="hover-glow whitespace-normal h-auto py-4"
                onClick={() => window.open(CALENDLY_URL, "_blank")}
              >
                <span className="flex flex-col items-center leading-tight">
                  <span>Fala comigo para perceberes qual o plano certo para o teu negócio</span>
                  <span className="text-xs opacity-80 font-normal">15 minutos • Sem compromisso</span>
                </span>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
