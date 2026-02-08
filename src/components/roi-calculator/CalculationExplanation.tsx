import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ROIEvents } from "@/lib/analytics";

export function CalculationExplanation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      ROIEvents.openComoCalculado();
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="mt-6">
      <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
        <HelpCircle className="w-4 h-4" />
        <span className="underline underline-offset-2">Como é calculado?</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-4">
        <div className="p-5 rounded-xl bg-muted/50 border border-border space-y-4">
          <h4 className="font-semibold text-foreground">Metodologia de cálculo</h4>
          
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-background/50">
              <p className="font-medium text-foreground mb-1">Custo do tempo manual</p>
              <code className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                (horas/dia × 5 dias × nº colaboradores) × custo/hora
              </code>
            </div>
            
            <div className="p-3 rounded-lg bg-background/50">
              <p className="font-medium text-foreground mb-1">Custo anual de erros</p>
              <code className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                frequência mensal × custo médio por erro × 12 meses
              </code>
            </div>
            
            <div className="p-3 rounded-lg bg-background/50">
              <p className="font-medium text-foreground mb-1">ROI (meses para retorno)</p>
              <code className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                investimento estimado ÷ poupança mensal
              </code>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
            Estimativas baseadas em dados de projetos anteriores. Os valores reais podem variar.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
