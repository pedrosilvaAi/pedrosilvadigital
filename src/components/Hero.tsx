import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const CALENDLY_URL = "https://calendly.com/pmgs5-ai/chamada-inicial?month=2026-01";

const benefits = [
  "Menos tarefas manuais",
  "Processos mais consistentes",
  "Mais visibilidade e controlo",
];

export function Hero() {
  const scrollToGuide = () => {
    const element = document.querySelector("#guia");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Automação e IA para negócios que querem operar com mais eficiência.
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Ajudamos empresas a identificar oportunidades e implementar automações práticas, com foco em clareza e execução.
          </p>

          {/* Benefits */}
          <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-10">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center justify-center gap-2 text-primary-foreground/90">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="hero"
              size="xl"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
            >
              Marcar Chamada (15–30 min)
            </Button>
            <Button
              variant="heroLight"
              size="xl"
              onClick={scrollToGuide}
            >
              Receber Guia Gratuito
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}