import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useParallax } from "@/hooks/useScrollAnimation";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

const benefits = [
  "Menos tarefas manuais",
  "Processos mais consistentes",
  "Mais visibilidade e controlo",
];

export function Hero() {
  const { ref: parallaxRef, offset } = useParallax(0.3);

  const scrollToGuide = () => {
    const element = document.querySelector("#guia");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${offset}px) scale(1.1)`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        
        {/* Animated Spotlight Effect */}
        <div className="absolute inset-0 bg-gradient-spotlight opacity-60" />
      </div>

      {/* Floating Particles/Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float"
          style={{ top: "20%", left: "10%", animationDelay: "0s" }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float"
          style={{ top: "60%", right: "5%", animationDelay: "2s" }}
        />
        <div 
          className="absolute w-48 h-48 rounded-full bg-primary/10 blur-2xl animate-float"
          style={{ bottom: "30%", left: "30%", animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-blur-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow mr-2" />
            <span className="text-sm text-primary-foreground/80">Automação & IA para Empresas</span>
          </div>

          {/* Title with stagger animation */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Automação e IA para negócios que querem operar com{" "}
            <span className="text-gradient">mais eficiência</span>.
          </h1>
          
          <p 
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Ajudamos empresas a identificar oportunidades e implementar automações práticas, com foco em clareza e execução.
          </p>

          {/* Benefits with stagger */}
          <ul 
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-10 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            {benefits.map((benefit, index) => (
              <li 
                key={benefit} 
                className="flex items-center justify-center gap-2 text-primary-foreground/90 animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTAs with glow effect */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 animate-scale-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              variant="hero"
              size="xl"
              className="group relative overflow-hidden hover-glow"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
            >
              <span className="relative z-10">Marcar Chamada (15–30 min)</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="heroLight"
              size="xl"
              className="hover-lift"
              onClick={scrollToGuide}
            >
              Receber Guia Gratuito
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.querySelector("#como-ajudamos")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-8 h-12 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2 hover:border-primary/50 transition-colors">
            <ChevronDown className="w-4 h-4 animate-bounce" style={{ animationDelay: "0.5s" }} />
          </div>
        </button>
      </div>
    </section>
  );
}
