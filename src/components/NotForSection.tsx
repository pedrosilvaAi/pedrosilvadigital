import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import { X } from "lucide-react";

const exclusionCriteria = [
  "Ainda não tens um WhatsApp Business activo",
  "O teu negócio recebe menos de 10 mensagens por semana",
  "Queres uma solução genérica sem personalização",
  "Não tens tempo para uma chamada de 15 minutos",
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
              Isto <span className="text-destructive">NÃO</span> é para ti se...
            </h2>
          </AnimatedSection>

          <div className="grid gap-4">
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
        </div>
      </div>
    </section>
  );
}
