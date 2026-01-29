import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

export function FinalCTA() {
  const scrollToGuide = () => {
    const element = document.querySelector("#guia");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-card text-foreground relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="zoom-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm text-primary">Pronto para começar?</span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para <span className="text-gradient">automatizar</span> o seu negócio?
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Marque uma chamada de 15–30 minutos, sem compromisso. Vamos identificar as melhores oportunidades para si.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="scale-in" delay={300}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="hero"
                size="xl"
                className="group relative overflow-hidden hover-glow"
                onClick={() => window.open(CALENDLY_URL, "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  Marcar Chamada Agora
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400}>
            <p className="text-sm text-muted-foreground mt-6">
              Ou{" "}
              <button
                onClick={scrollToGuide}
                className="underline hover:text-foreground transition-colors hover:decoration-primary"
              >
                receba o guia gratuito
              </button>{" "}
              e explore por si próprio.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
