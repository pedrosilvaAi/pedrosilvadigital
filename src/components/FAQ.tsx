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
    question: "O que acontece na chamada?",
    answer:
      "Vamos conhecer o seu negócio, perceber os objetivos e identificar 2–3 oportunidades práticas de automação. Sem compromisso.",
  },
  {
    question: "Isto serve para qualquer negócio?",
    answer:
      "Trabalhamos principalmente com negócios que têm capacidade de investir em sistemas e processos (serviços, e-commerce, saúde, imobiliário, indústria).",
  },
  {
    question: "Quanto tempo demora implementar algo?",
    answer:
      "Depende da complexidade. Alguns projetos ficam prontos em 1–2 semanas; outros podem levar 1–2 meses. Definimos tudo no plano inicial.",
  },
  {
    question: "Preciso de trocar as ferramentas que já uso?",
    answer:
      "Não. Integramos com o que já tem (CRM, Sheets, Shopify, etc.). Se for necessário, sugerimos alternativas mais eficientes.",
  },
  {
    question: "Como funciona o guia e quando o recebo?",
    answer:
      "O guia é enviado automaticamente por email após preencher o formulário. Se quiser ir mais longe, marque uma chamada.",
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
