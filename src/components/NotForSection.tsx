import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

const exclusionCriteria = [
  "Procura apenas uma ferramenta barata sem implementação estratégica",
  "Quer apenas um chatbot genérico",
  "Não está disposto a rever processos internos",
  "Não quer envolver a equipa na automação",
  "Procura soluções rápidas sem impacto real no negócio",
];

export function NotForSection() {
  return (
    <section id="para-quem-nao-e" className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Para quem <span className="text-destructive">não é</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Não trabalhamos com todas as empresas. Para garantir resultados reais, somos transparentes sobre quando não somos a escolha certa.
            </p>
          </AnimatedSection>

          <div className="grid gap-4 mb-12">
            {exclusionCriteria.map((criteria, index) => (
              <AnimatedCard key={index} index={index} hoverEffect="lift">
                <div className="flex items-center gap-4 p-5 rounded-xl bg-background/80 border border-border/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <p className="text-foreground font-medium">{criteria}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={300} className="text-center">
            <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
              Trabalhamos com empresas que querem <strong className="text-primary">resultados concretos</strong>, eficiência operacional e crescimento sustentável através de automação inteligente.
            </p>
            <Button
              variant="hero"
              size="xl"
              className="hover-glow"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
            >
              Agendar diagnóstico gratuito (15 min)
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
