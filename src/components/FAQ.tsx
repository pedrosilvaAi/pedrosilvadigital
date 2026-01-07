import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que acontece na chamada?",
    answer:
      "Vamos conhecer o teu negócio, perceber os objetivos e identificar 2–3 oportunidades práticas de automação. Sem compromisso.",
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
      "Não. Integramos com o que já tens (CRM, Sheets, Shopify, etc.). Se for necessário, sugerimos alternativas mais eficientes.",
  },
  {
    question: "Como funciona o guia e quando o recebo?",
    answer:
      "O guia é enviado automaticamente por email após preencheres o formulário. Se quiseres ir mais longe, marca uma chamada.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}