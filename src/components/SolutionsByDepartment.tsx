import { MessageSquare, Bot, Target, Calendar, Bell, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface FlowStep {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const flowSteps: FlowStep[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Cliente envia mensagem",
    description: "Qualquer mensagem que chega ao teu WhatsApp Business é recebida instantaneamente pelo agente.",
  },
  {
    number: "02",
    icon: Bot,
    title: "O agente responde em segundos",
    description: "Responde em português natural, com o tom do teu negócio, como se fosses tu a escrever.",
  },
  {
    number: "03",
    icon: Target,
    title: "Qualifica o interesse",
    description: "Faz as perguntas certas para perceber se é um lead sério, o que precisa e quando quer ser atendido.",
  },
  {
    number: "04",
    icon: Calendar,
    title: "Agenda a marcação",
    description: "Marca automaticamente na tua agenda disponível, sem trocas de mensagens intermináveis.",
  },
  {
    number: "05",
    icon: Bell,
    title: "Notifica-te quando importa",
    description: "Só és interrompido quando o lead está qualificado e pronto — ou em situações que realmente precisam de ti.",
  },
];

export function SolutionsByDepartment() {
  return (
    <section id="solucoes" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona o teu assistente no{" "}
            <span className="text-gradient">WhatsApp</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Em segundos, o teu negócio responde, qualifica e agenda — mesmo quando estás ocupado, a dormir, ou fora de horas.
          </p>
        </AnimatedSection>

        {/* Flow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 max-w-6xl mx-auto mb-16">
          {flowSteps.map((step, index) => (
            <FlowCard key={step.number} step={step} index={index} totalSteps={flowSteps.length} />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-card border border-border">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nunca explicas tecnologia ao cliente.
            </h3>
            <p className="text-muted-foreground max-w-md">
              O cliente só vê uma conversa natural no WhatsApp. Tu só vês leads qualificados e marcações feitas.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

interface FlowCardProps {
  step: FlowStep;
  index: number;
  totalSteps: number;
}

function FlowCard({ step, index, totalSteps }: FlowCardProps) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* Connector line for desktop */}
      {index < totalSteps - 1 && (
        <div
          className={cn(
            "hidden md:block absolute top-8 left-[60%] w-full h-[2px] transition-all duration-1000 ease-out",
            isVisible ? "bg-gradient-to-r from-primary/50 to-primary/20" : "bg-transparent"
          )}
          style={{ transitionDelay: `${(index + 1) * 200}ms` }}
        />
      )}

      <div
        className={cn(
          "group p-6 md:p-5 bg-card rounded-xl border border-border transition-all duration-500 w-full text-center",
          "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Number badge */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4">
          {step.number}
        </div>

        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-500">
          <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
