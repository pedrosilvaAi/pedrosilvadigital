const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    subtitle: "(15–30 min)",
    description: "Entender o contexto, objetivos e prioridades do negócio",
  },
  {
    number: "02",
    title: "Plano",
    subtitle: "",
    description: "Mapear oportunidades, quick wins e próximos passos",
  },
  {
    number: "03",
    title: "Implementação",
    subtitle: "",
    description: "Construir, testar, documentar e otimizar",
  },
];

export function Process() {
  return (
    <section id="processo" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Trabalhamos
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-border" />
                )}
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {step.title}
                    {step.subtitle && (
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {step.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground italic mt-12 text-lg">
            "Primeiro percebemos o negócio; depois escolhemos a tecnologia."
          </p>
        </div>
      </div>
    </section>
  );
}