import { Bot, Headphones, FileText, BarChart3, TrendingUp, DollarSign, Settings, Link2 } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "AI Agent de Vendas",
    description: "Responde de forma imediata a novos contactos, qualifica leads, esclarece dúvidas e agenda reuniões ou prepara pedidos de orçamento automaticamente.",
    impact: "Mais leads convertidos, menos oportunidades perdidas e ciclos de venda mais curtos.",
  },
  {
    icon: Headphones,
    title: "AI Agent de Atendimento ao Cliente",
    description: "Atendimento automatizado 24/7 com base em informação real do negócio, encaminhando apenas os casos necessários para a equipa humana.",
    impact: "Redução de tickets, aumento da satisfação do cliente e apoio direto à conversão.",
  },
  {
    icon: FileText,
    title: "Automação do Ciclo Comercial",
    description: "Automatização completa desde a entrada do lead até à faturação e onboarding.",
    impact: "Menos trabalho administrativo, menos erros e maior rapidez a fechar e entregar.",
  },
  {
    icon: BarChart3,
    title: "Reporting Automático com Insights",
    description: "Consolidação de dados de marketing, vendas e operações com relatórios claros e acionáveis.",
    impact: "Decisões mais rápidas, melhor controlo e alinhamento entre equipas.",
  },
  {
    icon: TrendingUp,
    title: "Previsão e Monitorização de Receita",
    description: "Sistemas de previsão e alertas que identificam desvios antes de se tornarem problemas.",
    impact: "Redução de risco, antecipação de quebras e proteção da receita.",
  },
  {
    icon: DollarSign,
    title: "Controlo de Margem e Rentabilidade",
    description: "Análise real de lucro por produto, canal ou cliente, cruzando vendas, custos e investimento.",
    impact: "Melhor pricing, decisões mais inteligentes e eliminação de desperdício.",
  },
  {
    icon: Settings,
    title: "Automação de Operações e Backoffice",
    description: "Otimização de processos internos e tarefas repetitivas que consomem tempo e geram erros.",
    impact: "Aumento da produtividade e operações mais consistentes.",
  },
  {
    icon: Link2,
    title: "Integração de Ferramentas",
    description: "Ligação entre todas as ferramentas do negócio para funcionar como um único sistema.",
    impact: "Dados centralizados, menos fricção entre equipas e base sólida para escalar.",
  },
];

export function HowWeHelp() {
  return (
    <section id="como-ajudamos" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluções de IA e Automação
          </h2>
          <p className="text-lg text-muted-foreground">
            Desenhamos e implementamos soluções de inteligência artificial e automação focadas em impacto real no negócio: mais receita, menos custos e maior controlo operacional. Estas são as 8 soluções mais valiosas para empresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mb-5 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <solution.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {solution.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {solution.description}
              </p>
              <p className="text-primary/80 text-xs font-medium">
                💡 {solution.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
