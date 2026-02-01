import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "Quanto custa uma solução de automação?",
    answer:
      "O investimento varia conforme a complexidade e necessidades específicas de cada empresa. Cada projeto é único. Oferecemos diagnóstico gratuito onde avaliamos o vosso caso e apresentamos proposta personalizada com investimento estimado.",
  },
  {
    question: "Quanto tempo demora a implementação?",
    answer:
      "Depende do âmbito do projeto. Projetos mais simples podem estar prontos em 2-4 semanas, enquanto soluções mais complexas podem demorar 1-3 meses. Durante o diagnóstico gratuito, damos timeline precisa para o vosso caso específico.",
  },
  {
    question: "Preciso de ter equipa de IT?",
    answer:
      "Não. Criamos soluções user-friendly e fazemos formação da equipa. Também oferecemos suporte contínuo para garantir que tudo funciona perfeitamente.",
  },
  {
    question: "Como sei o que devo automatizar primeiro?",
    answer:
      "No diagnóstico gratuito, mapeamos os vossos processos e identificamos onde há maior retorno. Recomendamos começar pelo processo que mais tempo consome ou que tem mais erros, garantindo impacto rápido.",
  },
  {
    question: "Trabalham com que tipo de empresas?",
    answer:
      "Trabalhamos com PMEs de diversos setores. Se têm processos manuais repetitivos que consomem tempo da equipa, podemos ajudar a automatizar e ganhar eficiência.",
  },
  {
    question: "Qual a diferença entre ferramenta standard e solução custom?",
    answer:
      "Ferramentas standard funcionam para processos comuns e têm implementação mais rápida. Soluções custom são desenvolvidas à medida para necessidades específicas que ferramentas prontas não resolvem. Como temos programador na equipa, podemos criar o que for necessário. Ajudamos a decidir qual é melhor para cada caso.",
  },
  {
    question: "Oferecem suporte após implementação?",
    answer:
      "Sim. Todas as soluções incluem período de garantia e opção de suporte contínuo, que cobre manutenção, ajustes e melhorias conforme o negócio evolui.",
  },
  {
    question: "E se a automação não funcionar como esperado?",
    answer:
      "Trabalhamos em fases com validação contínua. Só avançamos quando cada etapa está aprovada. Além disso, há período de ajustes incluído para garantir que tudo funciona perfeitamente.",
  },
];

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Perguntas <span className="text-gradient">Frequentes</span>
            </h2>
          </AnimatedSection>

          <div ref={ref}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className={`bg-card rounded-xl border border-border px-6 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-lg ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:text-primary py-5 hover:no-underline group">
                    <span className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm text-primary font-bold group-hover:bg-primary/20 transition-colors">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5 pl-11">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
