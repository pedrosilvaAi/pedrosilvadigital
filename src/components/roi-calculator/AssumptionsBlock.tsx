import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ROIEvents } from "@/lib/analytics";
import type { AssumptionSettings } from "./types";

interface AssumptionsBlockProps {
  settings: AssumptionSettings;
  onSettingsChange: (settings: AssumptionSettings) => void;
}

export function AssumptionsBlock({ settings, onSettingsChange }: AssumptionsBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTempoChange = (value: number[]) => {
    const newValue = value[0];
    onSettingsChange({ ...settings, reducaoTempo: newValue });
    ROIEvents.changeSliderTempo(newValue);
  };

  const handleErrosChange = (value: number[]) => {
    const newValue = value[0];
    onSettingsChange({ ...settings, reducaoErros: newValue });
    ROIEvents.changeSliderErros(newValue);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/70 transition-colors group">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Pressupostos de automação (ajustável)</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-4">
        <div className="p-6 rounded-xl bg-secondary/30 border border-border space-y-6">
          {/* Time Reduction Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-foreground font-medium">
                Redução de tempo manual
              </Label>
              <span className="text-lg font-semibold text-primary">
                {settings.reducaoTempo}%
              </span>
            </div>
            <Slider
              value={[settings.reducaoTempo]}
              onValueChange={handleTempoChange}
              min={10}
              max={95}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10%</span>
              <span>95%</span>
            </div>
          </div>

          {/* Error Reduction Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-foreground font-medium">
                Redução de erros
              </Label>
              <span className="text-lg font-semibold text-primary">
                {settings.reducaoErros}%
              </span>
            </div>
            <Slider
              value={[settings.reducaoErros]}
              onValueChange={handleErrosChange}
              min={10}
              max={95}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10%</span>
              <span>95%</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground italic pt-2 border-t border-border/50">
            As percentagens são estimativas. Ajuste para refletir a sua realidade.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
