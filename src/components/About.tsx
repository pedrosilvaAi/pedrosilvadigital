import { AnimatedSection } from "@/components/AnimatedSection";
import { Code, Sparkles, ExternalLink } from "lucide-react";

export function About() {
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
                Trabalhamos em parceria com a{" "}
                <a 
                  href="https://typeble.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Typeble.com
                  <ExternalLink className="w-4 h-4" />
                </a>
                , uma startup de engenharia e software, para levar automação e IA às empresas de construção civil, eletricidade, HVAC, energia solar e águas.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-4">
                O nosso método: <strong className="text-primary">ouvir, planear, executar e otimizar</strong>. Sem promessas vazias, sem complexidade desnecessária.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Focamo-nos em empresas de <strong className="text-foreground">instalações elétricas</strong>, <strong className="text-foreground">construção civil</strong>, <strong className="text-foreground">HVAC e climatização</strong>, <strong className="text-foreground">energia solar</strong>, <strong className="text-foreground">águas e saneamento</strong> e <strong className="text-foreground">gabinetes de engenharia</strong>.
              </p>

              {/* Custom Solutions Highlight */}
              <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      Soluções 100% Personalizadas
                      <Sparkles className="w-4 h-4 text-primary" />
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Com a equipa de engenharia e software da Typeble, criamos soluções totalmente personalizadas — desde leitura de plantas AutoCAD a sistemas de orçamentação automática, adaptados 100% às necessidades específicas da sua empresa.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
