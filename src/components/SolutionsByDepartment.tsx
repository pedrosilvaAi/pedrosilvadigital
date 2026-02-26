import { 
  FileSearch,
  ListChecks,
  AlertTriangle,
  Mail,
  Clock,
  HardHat,
  Users,
  Wrench,
  Receipt,
  BarChart3,
  Rocket
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const coreFeatures: Feature[] = [
  {
    icon: FileSearch,
    title: "Leitura de Plantas AutoCAD",
    description: "Extração automática de dados de plantas 2D e 3D — identificação de elementos, materiais e medições com IA."
  },
  {
    icon: ListChecks,
    title: "Mapa de Quantidades Automático",
    description: "Geração automática do mapa de quantidades a partir das plantas, com categorização por especialidade e artigo."
  },
  {
    icon: AlertTriangle,
    title: "Verificação de Erros e Omissões",
    description: "Deteção automática de inconsistências, sobreposições e omissões nas plantas e medições antes de orçamentar."
  },
  {
    icon: Mail,
    title: "Pedidos de Cotação Automáticos",
    description: "Envio automático de emails a fornecedores com especificações técnicas extraídas das plantas para obter cotações."
  },
  {
    icon: Clock,
    title: "Pré-Orçamentação em <24h",
    description: "Geração de pré-orçamentos completos combinando quantidades extraídas e preços de mercado — em menos de 24 horas."
  },
];

const comingSoonFeatures: Feature[] = [
  {
    icon: HardHat,
    title: "Gestão de Obras e Projetos",
    description: "Tracking de progresso, alocação de equipas no terreno, controlo de prazos e milestones por obra."
  },
  {
    icon: Users,
    title: "Gestão de Equipas Técnicas",
    description: "Agendamento de intervenções, roteiros otimizados e relatórios de serviço digitais."
  },
  {
    icon: Wrench,
    title: "Manutenção Preventiva",
    description: "Alertas automáticos de manutenção, histórico de equipamentos e agendamento de revisões."
  },
  {
    icon: Receipt,
    title: "Faturação e Controlo de Custos",
    description: "Faturação automática por obra/projeto, controlo de margens em tempo real."
  },
  {
    icon: BarChart3,
    title: "Reporting e Dashboards",
    description: "Visibilidade em tempo real de KPIs por obra, equipa e projeto."
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
            O Nosso <span className="text-gradient">Sistema</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Um sistema de IA desenhado para empresas de construção, eletricidade, HVAC e energia solar. De plantas a orçamentos, automatizamos o processo completo.
          </p>
        </AnimatedSection>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20">
          <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Funcionalidades em Desenvolvimento</span>
            </div>
            <p className="text-muted-foreground">
              Estamos a desenvolver funcionalidades adicionais para cobrir todo o ciclo de vida dos vossos projetos.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {comingSoonFeatures.map((feature, index) => (
              <ComingSoonCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "group p-6 md:p-8 bg-card rounded-xl border border-border transition-all duration-500",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-500">
        <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function ComingSoonCard({ feature, index }: { feature: Feature; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "group p-6 md:p-8 bg-card/50 rounded-xl border border-dashed border-border transition-all duration-500 relative",
        "hover:border-primary/30 hover:bg-card",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
        Em breve
      </Badge>
      <div className="w-14 h-14 mb-5 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-all duration-500">
        <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-foreground/80 mb-2 group-hover:text-foreground transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-foreground/80 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
