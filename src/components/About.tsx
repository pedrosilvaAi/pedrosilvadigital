import { AnimatedSection } from "@/components/AnimatedSection";
import { Globe, Clock, Rocket, HandshakeIcon } from "lucide-react";

const credentials = [
  { icon: Globe, text: "100% em português, feito para Portugal" },
  { icon: Clock, text: "Agente activo 24h / 7 dias por semana" },
  
  { icon: HandshakeIcon, text: "Sem contratos longos" },
];

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
              Quem está <span className="text-gradient">por trás disto</span>
            </h2>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Photo with animated border */}
            <AnimatedSection animation="zoom-in" className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow" />
                
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-background">
                  <img 
                    alt="Pedro Silva - Especialista em Automação e IA" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src="/lovable-uploads/bc1236ba-60c5-477e-a745-f8dbb51d0440.png" 
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection animation="fade-left" delay={200} className="flex-1 text-center md:text-left">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Sou o Pedro Silva, especialista em automação e IA para negócios em Portugal. Não vendo software — entrego um serviço gerido, personalizado, e trato de tudo tecnicamente para que tu te focuses no teu negócio.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-8">
                Cada agente que instalo é construído à medida: com o teu tom, os teus serviços, e integrado no teu WhatsApp real. Não és mais um cliente numa plataforma — és o único dono daquele agente.
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{cred.text}</span>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
