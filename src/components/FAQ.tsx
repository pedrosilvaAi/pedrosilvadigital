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
    question: "Preciso de saber programar ou perceber de tecnologia?",
    answer: "Não. Trato de tudo. Tu só precisas de ter um WhatsApp Business activo e 15 minutos para a chamada inicial.",
  },
  {
    question: "Funciona com o meu número de WhatsApp actual?",
    answer: "Sim, na maioria dos casos. Na chamada inicial percebo qual a melhor configuração para o teu caso específico.",
  },
  {
    question: "O agente substitui-me completamente?",
    answer: "Não. O agente filtra e qualifica — tu só entras quando o lead está pronto ou quando há uma situação que realmente precisa de ti.",
  },
  {
    question: "E se o cliente fizer uma pergunta que o agente não sabe responder?",
    answer: "O agente escalona automaticamente para ti e avisa-te de imediato. Nunca deixa um cliente sem resposta.",
  },
  {
    question: "Quanto tempo demora a implementar?",
    answer: "Depende do que for necessário configurar no teu negócio. Alguns processos — como acessos, integrações ou validações — não dependem de mim. Mas na maioria dos casos, o agente fica activo em poucos dias após termos tudo alinhado.",
  },
  {
    question: "Posso cancelar?",
    answer: "Sim, sem compromissos longos. A manutenção mensal é mês a mês.",
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
