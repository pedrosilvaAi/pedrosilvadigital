import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  Settings, 
  DollarSign, 
  Headphones,
  Bot,
  FileText,
  BarChart3,
  Link2,
  Layout,
  PieChart,
  UserPlus,
  Mail,
  Target,
  ShoppingCart,
  Package,
  Clock,
  Receipt,
  Calculator,
  Briefcase,
  GraduationCap,
  Heart,
  MessageSquare,
  Phone,
  Zap
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface Solution {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Department {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  solutions: Solution[];
}

const departments: Department[] = [
  {
    id: "vendas-marketing",
    name: "Vendas & Marketing",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    solutions: [
      {
        icon: Bot,
        title: "AI Agent de Vendas",
        description: "Responde imediatamente a novos contactos, qualifica leads e agenda reuniões automaticamente."
      },
      {
        icon: Mail,
        title: "Automação de Follow-up",
        description: "Sequências automáticas de follow-up personalizadas por email, SMS ou WhatsApp."
      },
      {
        icon: Target,
        title: "Lead Scoring Automático",
        description: "Classificação automática de leads com base em comportamento e dados demográficos."
      },
      {
        icon: Layout,
        title: "Landing Pages de Alta Conversão",
        description: "Criação de landing pages otimizadas para campanhas com foco em conversão."
      },
      {
        icon: Users,
        title: "CRM Personalizado",
        description: "Implementação de CRM adaptado ao seu processo comercial e de relacionamento."
      },
      {
        icon: BarChart3,
        title: "Reporting de Marketing",
        description: "Consolidação automática de dados de campanhas com insights acionáveis."
      }
    ]
  },
  {
    id: "operacoes",
    name: "Operações",
    icon: Settings,
    color: "from-orange-500 to-amber-500",
    solutions: [
      {
        icon: ShoppingCart,
        title: "Processamento de Encomendas",
        description: "Automação completa desde o pedido até à expedição, sem intervenção manual."
      },
      {
        icon: Package,
        title: "Gestão de Stock em Tempo Real",
        description: "Monitorização automática de inventário com alertas de reposição."
      },
      {
        icon: Link2,
        title: "Integração de Sistemas",
        description: "Ligação entre CRM, ERP, e-commerce e outras ferramentas para funcionar como um só."
      },
      {
        icon: Clock,
        title: "Automação de Backoffice",
        description: "Eliminação de tarefas repetitivas que consomem tempo e geram erros."
      },
      {
        icon: PieChart,
        title: "Dashboards Operacionais",
        description: "Visibilidade em tempo real de KPIs e métricas operacionais críticas."
      },
      {
        icon: Zap,
        title: "Workflows Automatizados",
        description: "Criação de fluxos de trabalho automáticos entre departamentos."
      }
    ]
  },
  {
    id: "financeiro",
    name: "Financeiro",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    solutions: [
      {
        icon: Receipt,
        title: "Faturação Automática",
        description: "Geração e envio automático de faturas após conclusão de serviços ou vendas."
      },
      {
        icon: Calculator,
        title: "Controlo de Margem",
        description: "Análise real de lucro por produto, canal ou cliente em tempo real."
      },
      {
        icon: TrendingUp,
        title: "Previsão de Receita",
        description: "Sistemas de previsão que identificam desvios antes de se tornarem problemas."
      },
      {
        icon: BarChart3,
        title: "Reporting Financeiro",
        description: "Relatórios automáticos de performance financeira com alertas configuráveis."
      },
      {
        icon: FileText,
        title: "Reconciliação Automática",
        description: "Cruzamento automático de pagamentos com faturas e contas bancárias."
      },
      {
        icon: DollarSign,
        title: "Gestão de Cobranças",
        description: "Automação de lembretes de pagamento e escalação de cobranças."
      }
    ]
  },
  {
    id: "rh",
    name: "Recursos Humanos",
    icon: Briefcase,
    color: "from-purple-500 to-violet-500",
    solutions: [
      {
        icon: UserPlus,
        title: "Onboarding de Colaboradores",
        description: "Processo automatizado de integração com documentos, acessos e formações."
      },
      {
        icon: GraduationCap,
        title: "Gestão de Formação",
        description: "Tracking automático de formações obrigatórias e desenvolvimento de competências."
      },
      {
        icon: Clock,
        title: "Gestão de Férias e Ausências",
        description: "Sistema automático de pedidos, aprovações e atualização de calendários."
      },
      {
        icon: FileText,
        title: "Processamento Documental",
        description: "Automação de contratos, declarações e documentos de RH."
      },
      {
        icon: Heart,
        title: "Inquéritos de Satisfação",
        description: "Envio automático de inquéritos com análise de resultados."
      },
      {
        icon: BarChart3,
        title: "Analytics de RH",
        description: "Dashboards com métricas de rotatividade, absentismo e performance."
      }
    ]
  },
  {
    id: "atendimento",
    name: "Atendimento ao Cliente",
    icon: Headphones,
    color: "from-pink-500 to-rose-500",
    solutions: [
      {
        icon: Bot,
        title: "AI Agent de Atendimento",
        description: "Atendimento automatizado 24/7 com base em informação real do negócio."
      },
      {
        icon: MessageSquare,
        title: "Chatbot Inteligente",
        description: "Respostas automáticas a perguntas frequentes em website, WhatsApp e redes sociais."
      },
      {
        icon: Phone,
        title: "Gestão de Tickets",
        description: "Sistema automático de triagem, atribuição e escalação de tickets."
      },
      {
        icon: Mail,
        title: "Respostas Automáticas",
        description: "Templates inteligentes e respostas sugeridas por IA para maior eficiência."
      },
      {
        icon: BarChart3,
        title: "Analytics de Suporte",
        description: "Métricas de tempo de resposta, satisfação e volume de tickets."
      },
      {
        icon: FileText,
        title: "Base de Conhecimento",
        description: "Criação e manutenção automática de FAQ e documentação de suporte."
      }
    ]
  }
];

export function SolutionsByDepartment() {
  const [activeDepartment, setActiveDepartment] = useState(departments[0].id);
  const { ref, isVisible } = useScrollAnimation();

  const currentDepartment = departments.find(d => d.id === activeDepartment)!;

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluções de <span className="text-gradient">IA e Automação</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Desenhamos e implementamos soluções focadas em impacto real: mais receita, menos custos e maior controlo operacional. Explore por departamento.
          </p>
        </AnimatedSection>

        {/* Department Tabs */}
        <div ref={ref} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              const isActive = activeDepartment === dept.id;
              
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDepartment(dept.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                      : "bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{dept.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Department Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-8">
          <div className={cn(
            "inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r text-white font-semibold",
            currentDepartment.color
          )}>
            <currentDepartment.icon className="w-6 h-6" />
            <span className="text-lg">{currentDepartment.name}</span>
          </div>
        </AnimatedSection>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentDepartment.solutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <AnimatedSection animation="fade-up" delay={400} className="mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-card border border-border">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Não encontra o que procura?
            </h3>
            <p className="text-muted-foreground max-w-md">
              Com programador na equipa, criamos soluções 100% personalizadas para necessidades específicas que ferramentas standard não resolvem.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

function SolutionCard({ solution, index }: SolutionCardProps) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = solution.icon;

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
      {/* Icon */}
      <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-500">
        <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {solution.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {solution.description}
      </p>
    </div>
  );
}
