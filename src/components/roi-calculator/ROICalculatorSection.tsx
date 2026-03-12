import { useState, useMemo } from "react";
import { Calculator, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ROIEvents } from "@/lib/analytics";

import { InputWithTooltip } from "./InputWithTooltip";
import { SalaryToggle } from "./SalaryToggle";
import { AssumptionsBlock } from "./AssumptionsBlock";
import { CalculationExplanation } from "./CalculationExplanation";
import { ROIResults } from "./ROIResults";
import type { FormData, Results, AssumptionSettings } from "./types";
import { errorFrequencyMultipliers } from "./types";

export function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState<FormData>({
    colaboradores: "",
    horasDia: "",
    salaryMode: "monthly",
    custoHora: "",
    salarioMensal: "",
    horasMensais: "160",
    frequenciaErros: "",
    custoErro: "",
  });
  
  const [assumptions, setAssumptions] = useState<AssumptionSettings>({
    reducaoTempo: 75,
    reducaoErros: 90,
  });
  
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Calculate effective hourly cost
  const effectiveHourlyCost = useMemo(() => {
    if (formData.salaryMode === 'hourly') {
      return parseFloat(formData.custoHora) || 0;
    }
    const salary = parseFloat(formData.salarioMensal) || 0;
    const hours = parseFloat(formData.horasMensais) || 160;
    return hours > 0 ? salary / hours : 0;
  }, [formData.salaryMode, formData.custoHora, formData.salarioMensal, formData.horasMensais]);

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    const colaboradores = parseFloat(formData.colaboradores);
    if (!formData.colaboradores || colaboradores < 1) {
      errors.colaboradores = "Mínimo 1 colaborador";
    }
    
    const horasDia = parseFloat(formData.horasDia);
    if (!formData.horasDia || horasDia <= 0) {
      errors.horasDia = "Introduza as horas por dia";
    } else if (horasDia > 12) {
      errors.horasDia = "Valor máximo: 12 horas";
    }
    
    if (formData.salaryMode === 'hourly') {
      if (!formData.custoHora || parseFloat(formData.custoHora) <= 0) {
        errors.custoHora = "Introduza o custo/hora";
      }
    } else {
      if (!formData.salarioMensal || parseFloat(formData.salarioMensal) <= 0) {
        errors.salarioMensal = "Introduza o salário mensal";
      }
    }
    
    if (!formData.frequenciaErros) {
      errors.frequenciaErros = "Selecione a frequência";
    }
    
    const custoErro = parseFloat(formData.custoErro);
    if (!formData.custoErro || custoErro < 0) {
      errors.custoErro = "Introduza o custo por erro";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Calculate results based on current assumptions
  const results: Results | null = useMemo(() => {
    if (!showResults) return null;
    
    const colaboradores = parseFloat(formData.colaboradores) || 0;
    const horasDia = parseFloat(formData.horasDia) || 0;
    const custoHora = effectiveHourlyCost;
    const custoErro = parseFloat(formData.custoErro) || 0;
    const frequenciaErros = formData.frequenciaErros;

    // Custo diário = Horas manuais × Custo hora × Nº colaboradores
    const custoDiario = horasDia * custoHora * colaboradores;

    // Custo semanal = Custo diário × 5
    const custoSemanalManual = custoDiario * 5;

    // Custo mensal = Custo semanal × 4.33
    const custoMensalManual = custoSemanalManual * 4.33;

    // Custo anual trabalho manual = Custo mensal × 12
    const custoAnualManual = custoMensalManual * 12;

    // Custo erros anuais
    const errosPorMes = errorFrequencyMultipliers[frequenciaErros] || 0;
    const custoErrosAnual = errosPorMes * custoErro * 12;

    // Total perdido anual
    const totalPerdidoAnual = custoAnualManual + custoErrosAnual;

    // Poupança com automação (using dynamic assumptions)
    const poupancaTrabalho = custoAnualManual * (assumptions.reducaoTempo / 100);
    const poupancaErros = custoErrosAnual * (assumptions.reducaoErros / 100);
    const poupancaTotalAnual = poupancaTrabalho + poupancaErros;
    const poupancaMensal = poupancaTotalAnual / 12;

    // Estimativa investimento automação
    let investimentoMin: number;
    let investimentoMax: number;

    if (colaboradores <= 3 && horasDia < 4) {
      investimentoMin = 3000;
      investimentoMax = 5000;
    } else if (colaboradores <= 10 || horasDia >= 4) {
      investimentoMin = 5000;
      investimentoMax = 8000;
    } else {
      investimentoMin = 7000;
      investimentoMax = 12000;
    }

    // ROI em meses
    const roiMinMeses = poupancaMensal > 0 ? investimentoMin / poupancaMensal : 0;
    const roiMaxMeses = poupancaMensal > 0 ? investimentoMax / poupancaMensal : 0;

    return {
      custoSemanalManual,
      custoMensalManual,
      custoAnualManual,
      custoErrosAnual,
      totalPerdidoAnual,
      poupancaTrabalho,
      poupancaErros,
      poupancaTotalAnual,
      poupancaMensal,
      roiMinMeses,
      roiMaxMeses,
      investimentoMin,
      investimentoMax,
    };
  }, [showResults, formData, effectiveHourlyCost, assumptions]);

  const handleCalculate = () => {
    if (!validateForm()) return;
    
    ROIEvents.clickCalcularRoi();
    setShowResults(true);
  };

  return (
    <section id="calculadora" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Descubra o custo escondido</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Quanto está a sua empresa a{" "}
              <span className="text-destructive">PERDER</span> em processos manuais?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Descubra em 2 minutos o custo real da ineficiência
            </p>
          </AnimatedSection>

          {/* Calculator Card */}
          <div
            ref={ref}
            className={`bg-card rounded-2xl border border-border p-6 md:p-10 lg:p-12 shadow-2xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Calculadora de ROI</h3>
                <p className="text-sm text-muted-foreground">Preencha os campos abaixo</p>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <InputWithTooltip
                id="colaboradores"
                label="Quantos colaboradores gastam tempo em tarefas manuais?"
                tooltip="Colaboradores que gastam tempo significativo em tarefas administrativas, entrada de dados, follow-ups manuais, etc."
                placeholder="Ex: 5"
                value={formData.colaboradores}
                onChange={(v) => handleInputChange("colaboradores", v)}
                min={1}
                error={validationErrors.colaboradores}
              />

              <InputWithTooltip
                id="horasDia"
                label="Horas por dia em tarefas manuais (média por pessoa)"
                tooltip="Tempo gasto em tarefas como copiar dados entre sistemas, follow-ups manuais, criar relatórios, etc."
                placeholder="Ex: 4"
                value={formData.horasDia}
                onChange={(v) => handleInputChange("horasDia", v)}
                suffix="horas"
                min={0}
                max={12}
                error={validationErrors.horasDia}
              />

              <SalaryToggle
                mode={formData.salaryMode}
                onModeChange={(mode) => handleInputChange("salaryMode", mode)}
                custoHora={formData.custoHora}
                salarioMensal={formData.salarioMensal}
                horasMensais={formData.horasMensais}
                onCustoHoraChange={(v) => handleInputChange("custoHora", v)}
                onSalarioMensalChange={(v) => handleInputChange("salarioMensal", v)}
                onHorasMensaisChange={(v) => handleInputChange("horasMensais", v)}
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground font-medium text-sm md:text-base">
                    Frequência de erros em processos manuais
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-primary transition-colors flex-shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Erros como dados incorretos, faturação errada, duplicados, informação desatualizada</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formData.frequenciaErros}
                  onValueChange={(v) => handleInputChange("frequenciaErros", v)}
                >
                  <SelectTrigger className={`bg-background border-border h-12 text-lg ${validationErrors.frequenciaErros ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="raramente">Raramente (1-2 por mês)</SelectItem>
                    <SelectItem value="ocasionalmente">Ocasionalmente (1 por semana)</SelectItem>
                    <SelectItem value="frequentemente">Frequentemente (várias por semana)</SelectItem>
                    <SelectItem value="muito-frequentemente">Muito frequentemente (quase diariamente)</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.frequenciaErros && (
                  <p className="text-xs text-destructive">{validationErrors.frequenciaErros}</p>
                )}
              </div>

              <InputWithTooltip
                id="custoErro"
                label="Custo médio de cada erro"
                tooltip="Considere tempo de correção + impacto no cliente + reprocessamento"
                placeholder="Ex: 100"
                value={formData.custoErro}
                onChange={(v) => handleInputChange("custoErro", v)}
                suffix="€"
                min={0}
                error={validationErrors.custoErro}
              />
            </div>

            {/* Calculate Button */}
            <div className="mt-10 space-y-3">
              <Button
                onClick={handleCalculate}
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calculator className="w-5 h-5 mr-2" />
                CALCULAR O MEU ROI
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Sem compromisso. Sem partilha de dados.
              </p>
            </div>

            {/* Calculation Explanation */}
            <CalculationExplanation />

            {/* Results */}
            {showResults && results && (
              <>
                {/* Assumptions Block */}
                <AssumptionsBlock
                  settings={assumptions}
                  onSettingsChange={setAssumptions}
                />
                
                <ROIResults results={results} assumptions={assumptions} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
