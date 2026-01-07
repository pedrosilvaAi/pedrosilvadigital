import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/pmgs5-ai/chamada-inicial?month=2026-01";

export function FinalCTA() {
  const scrollToGuide = () => {
    const element = document.querySelector("#guia");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para automatizar o teu negócio?
          </h2>
          <p className="text-lg text-background/80 mb-10 max-w-xl mx-auto">
            Marca uma chamada de 15–30 minutos, sem compromisso. Vamos identificar as melhores oportunidades para ti.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="hero"
              size="xl"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
              className="bg-primary hover:bg-primary/90"
            >
              Marcar Chamada Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-background/60 mt-6">
            Ou{" "}
            <button
              onClick={scrollToGuide}
              className="underline hover:text-background transition-colors"
            >
              recebe o guia gratuito
            </button>{" "}
            e explora por ti próprio.
          </p>
        </div>
      </div>
    </section>
  );
}