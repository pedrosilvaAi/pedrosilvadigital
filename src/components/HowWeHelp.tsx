import { Users, RefreshCw, BarChart3, Link2 } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Leads & Follow-up",
    description: "Automatizar captura, qualificação e nutrição de leads",
  },
  {
    icon: RefreshCw,
    title: "Operações e Tarefas Repetitivas",
    description: "Eliminar trabalho manual com fluxos automáticos",
  },
  {
    icon: BarChart3,
    title: "Reporting e Visibilidade",
    description: "Dashboards automáticos (marketing, vendas, operações)",
  },
  {
    icon: Link2,
    title: "Integração de Ferramentas",
    description: "Conectar CRM, Sheets, Notion, Shopify, WhatsApp, etc.",
  },
];

export function HowWeHelp() {
  return (
    <section id="como-ajudamos" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Ajudamos
          </h2>
          <p className="text-lg text-muted-foreground">
            Trabalhamos com empresas que valorizam implementação e acompanhamento. Aqui estão exemplos do que é possível fazer:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mb-5 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}