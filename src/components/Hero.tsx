import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useParallax } from "@/hooks/useScrollAnimation";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

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
            Automação e IA para empresas que querem{" "}
            <span className="text-gradient">reduzir custos operacionais</span> e{" "}
            <span className="text-gradient">aumentar vendas</span> sem contratar mais pessoas.
          </h1>
          
          <p 
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Criamos sistemas inteligentes que automatizam processos, recuperam leads e aumentam a eficiência operacional em poucas semanas.
          </p>

          {/* CTAs with glow effect */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 animate-scale-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              variant="hero"
              size="xl"
              className="group relative overflow-hidden hover-glow whitespace-normal h-auto py-4"
              onClick={() => window.open(CALENDLY_URL, "_blank")}
            >
              <span className="relative z-10 flex flex-col items-center leading-tight">
                <span>Agendar diagnóstico gratuito</span>
                <span className="text-xs opacity-80 font-normal">15 minutos • Sem compromisso</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="heroLight"
              size="xl"
              className="hover-lift whitespace-normal h-auto py-4"
              onClick={scrollToGuide}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>Descarregar guia gratuito</span>
                <span className="text-xs opacity-80 font-normal">PDF com dicas práticas</span>
              </span>
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
