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
    question: "Que tipos de plantas AutoCAD suportam?",
    answer:
      "O nosso sistema suporta plantas em formato DWG e DXF, tanto em 2D como em 3D. Trabalhamos com plantas de arquitetura, estruturas, instalações elétricas, HVAC, águas e esgotos, entre outras especialidades.",
  },
  {
    question: "Como funciona a extração de quantidades?",
    answer:
      "O sistema analisa as plantas com IA, identifica elementos (tubagens, cabos, equipamentos, materiais) e gera automaticamente o mapa de quantidades categorizado por especialidade e artigo. É feita uma verificação cruzada para detetar omissões.",
  },
  {
    question: "Quanto tempo demora a gerar um pré-orçamento?",
    answer:
      "Dependendo da complexidade do projeto, o pré-orçamento é gerado em menos de 24 horas. Para projetos mais simples, pode estar pronto em poucas horas. O sistema envia automaticamente pedidos de cotação aos fornecedores para completar os preços.",
  },
  {
    question: "Quanto custa o sistema?",
    answer:
      "O investimento varia conforme a complexidade e volume de projetos da empresa. Oferecemos uma demonstração gratuita onde avaliamos o vosso caso e apresentamos proposta personalizada com investimento estimado.",
  },
  {
    question: "Trabalham com que tipo de empresas?",
    answer:
      "Focamo-nos em empresas de construção civil, instalações elétricas, HVAC e climatização, energia solar, águas e saneamento, e gabinetes de engenharia e projeto. Se a sua empresa trabalha com plantas técnicas e orçamentação, podemos ajudar.",
  },
  {
    question: "Como são enviados os pedidos de cotação?",
    answer:
      "O sistema extrai as especificações técnicas das plantas e envia emails automaticamente para os fornecedores da vossa base de dados, com as quantidades e especificações necessárias. As respostas são compiladas automaticamente para o orçamento.",
  },
  {
    question: "Preciso de ter equipa de IT?",
    answer:
      "Não. O sistema é configurado pela nossa equipa em parceria com a Typeble, e fazemos formação completa. Também oferecemos suporte contínuo para garantir que tudo funciona perfeitamente.",
  },
  {
    question: "Oferecem suporte após implementação?",
    answer:
      "Sim. Todas as soluções incluem período de garantia e opção de suporte contínuo, que cobre manutenção, ajustes e melhorias conforme o negócio evolui.",
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
