import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SalaryToggleProps {
  mode: 'hourly' | 'monthly';
  onModeChange: (mode: 'hourly' | 'monthly') => void;
  custoHora: string;
  salarioMensal: string;
  horasMensais: string;
  onCustoHoraChange: (value: string) => void;
  onSalarioMensalChange: (value: string) => void;
  onHorasMensaisChange: (value: string) => void;
}

export function SalaryToggle({
  mode,
  onModeChange,
  custoHora,
  salarioMensal,
  horasMensais,
  onCustoHoraChange,
  onSalarioMensalChange,
  onHorasMensaisChange,
}: SalaryToggleProps) {
  // Calculate hourly cost from monthly values
  const calculatedHourlyCost = mode === 'monthly' && salarioMensal && horasMensais
    ? (parseFloat(salarioMensal) / parseFloat(horasMensais)).toFixed(2)
    : null;

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-medium text-sm md:text-base">
            Custo do colaborador
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-primary transition-colors flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Escolha introduzir diretamente o custo/hora ou calcular a partir do salário mensal.</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Tabs value={mode} onValueChange={(v) => onModeChange(v as 'hourly' | 'monthly')} className="w-full sm:w-auto">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 h-9">
            <TabsTrigger value="hourly" className="text-xs px-3">Custo/hora</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs px-3">Salário mensal</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {mode === 'hourly' ? (
        <div className="relative">
          <Input
            id="custoHora"
            type="number"
            min={0}
            step="any"
            placeholder="Ex: 12.50"
            value={custoHora}
            onChange={(e) => onCustoHoraChange(e.target.value)}
            className="bg-background border-border focus:border-primary h-12 text-lg pr-12"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            €/hora
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salarioMensal" className="text-sm text-muted-foreground">
              Salário mensal bruto
            </Label>
            <div className="relative">
              <Input
                id="salarioMensal"
                type="number"
                min={0}
                step="any"
                placeholder="Ex: 1500"
                value={salarioMensal}
                onChange={(e) => onSalarioMensalChange(e.target.value)}
                className="bg-background border-border focus:border-primary h-12 text-lg pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                €
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="horasMensais" className="text-sm text-muted-foreground">
              Horas mensais
            </Label>
            <div className="relative">
              <Input
                id="horasMensais"
                type="number"
                min={1}
                step="1"
                placeholder="160"
                value={horasMensais}
                onChange={(e) => onHorasMensaisChange(e.target.value)}
                className="bg-background border-border focus:border-primary h-12 text-lg pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                horas
              </span>
            </div>
          </div>
          {calculatedHourlyCost && parseFloat(calculatedHourlyCost) > 0 && (
            <div className="sm:col-span-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                Custo/hora calculado: <span className="text-foreground font-semibold">{calculatedHourlyCost} €/hora</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
