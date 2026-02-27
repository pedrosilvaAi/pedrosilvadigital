import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Check, Building2, Users, MessageSquare, Cog, TrendingUp } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

const idealCriteria = [
  {
    text: "PME em crescimento",
    icon: Building2,
  },
  {
    text: "Equipas comerciais",
    icon: Users,
  },
  {
    text: "Empresas com muitos pedidos de contacto",
    icon: MessageSquare,
  },
  {
    text: "Operações manuais e repetitivas",
    icon: Cog,
  },
  {
    text: "Negócios que querem escalar sem aumentar headcount",
    icon: TrendingUp,
  },
  {
    text: "Empresas que perdem leads por falta de follow-up",
    icon: Users,
  },
];

export function IdealForSection() {
  return (
    <section id="para-quem-e" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-1/3 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Para quem <span className="text-gradient">é ideal</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {idealCriteria.map((criteria, index) => {
              const IconComponent = criteria.icon;
              return (
                <AnimatedCard key={index} index={index} hoverEffect="glow">
                  <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20 h-full">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{criteria.text}</p>
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-auto">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          <AnimatedSection animation="fade-up" delay={300} className="text-center">
            <Button
              variant="hero"
              size="lg"
              className="hover-glow whitespace-normal h-auto py-3 px-6"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>Agendar diagnóstico gratuito</span>
                <span className="text-xs opacity-80 font-normal">15 minutos • Sem compromisso</span>
              </span>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
