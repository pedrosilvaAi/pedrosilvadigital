import pedroSilva from "@/assets/pedro-silva.jpg";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const tools = ["n8n", "Make", "Zapier", "Google Analytics 4", "Google Ads", "Meta Ads", "Shopify", "Notion", "Google Sheets"];

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="py-20 md:py-28 bg-secondary/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDuration: "8s" }} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Quem <span className="text-gradient">Somos</span>
            </h2>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Photo with animated border */}
            <AnimatedSection animation="zoom-in" className="flex-shrink-0">
              <div className="relative group">
                {/* Animated glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow" />
                
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-background">
                  <img 
                    alt="Pedro Silva - Consultor de Automação e IA" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src="/lovable-uploads/bc1236ba-60c5-477e-a745-f8dbb51d0440.png" 
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection animation="fade-left" delay={200} className="flex-1 text-center md:text-left">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Ajudamos empresas a implementar automações e IA de forma prática e sustentável. Com experiência em marketing digital, IA e automações, focamo-nos em construir sistemas que funcionam e podem escalar.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                O nosso método: <strong className="text-primary">ouvir, planear, executar e otimizar</strong>. Sem promessas vazias, sem complexidade desnecessária.
              </p>

              {/* Tools */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Exemplos de ferramentas que usamos:
                </p>
                <div ref={ref} className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {tools.map((tool, index) => (
                    <span 
                      key={tool} 
                      className={`px-3 py-1.5 text-xs font-medium bg-background text-muted-foreground rounded-full border border-border hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
