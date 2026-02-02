import { useState } from "react";
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface InputWithTooltipProps {
  id: string;
  label: string;
  tooltip: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}

function InputWithTooltip({
  id,
  label,
  tooltip,
  placeholder,
  value,
  onChange,
  suffix,
}: InputWithTooltipProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-foreground font-medium">
          {label}
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <Input
          id={id}
          type="number"
          min="0"
          step="any"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-background border-border focus:border-primary h-12 text-lg"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

interface FormData {
  colaboradores: string;
  horasDia: string;
  salarioMedio: string;
  frequenciaErros: string;
  custoErro: string;
}

interface Results {
  custoSemanalManual: number;
  custoMensalManual: number;
  custoAnualManual: number;
  custoErrosAnual: number;
  totalPerdidoAnual: number;
  poupancaTrabalho: number;
  poupancaErros: number;
  poupancaTotalAnual: number;
  poupancaMensal: number;
  roiMinMeses: number;
  roiMaxMeses: number;
  investimentoMin: number;
  investimentoMax: number;
}

const errorFrequencyMultipliers: Record<string, number> = {
  "raramente": 1.5,
  "ocasionalmente": 4,
  "frequentemente": 12,
  "muito-frequentemente": 25,
};

export function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({
    colaboradores: "",
    horasDia: "",
    salarioMedio: "",
    frequenciaErros: "",
    custoErro: "",
  });
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    const colaboradores = parseFloat(formData.colaboradores) || 0;
    const horasDia = parseFloat(formData.horasDia) || 0;
    const salarioMedio = parseFloat(formData.salarioMedio) || 0;
    const custoErro = parseFloat(formData.custoErro) || 0;
    const frequenciaErros = formData.frequenciaErros;

    // Custo por hora = Salário mensal / 160 horas
    const custoHora = salarioMedio / 160;

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

    // Poupança com automação
    const poupancaTrabalho = custoAnualManual * 0.75; // 75% redução
    const poupancaErros = custoErrosAnual * 0.90; // 90% redução
    const poupancaTotalAnual = poupancaTrabalho + poupancaErros;
    const poupancaMensal = poupancaTotalAnual / 12;

    // Estimativa investimento automação
    let investimentoMin: number;
    let investimentoMax: number;

    if (colaboradores <= 3 && horasDia < 4) {
      // Pequeno
      investimentoMin = 3000;
      investimentoMax = 5000;
    } else if (colaboradores <= 10 || horasDia >= 4) {
      // Médio
      investimentoMin = 5000;
      investimentoMax = 8000;
    } else {
      // Grande
      investimentoMin = 7000;
      investimentoMax = 12000;
    }

    // ROI em meses
    const investimentoMedio = (investimentoMin + investimentoMax) / 2;
    const roiMinMeses = poupancaMensal > 0 ? investimentoMin / poupancaMensal : 0;
    const roiMaxMeses = poupancaMensal > 0 ? investimentoMax / poupancaMensal : 0;

    setResults({
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
    });
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculadora" className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Descubra o custo escondido</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Quanto está a sua empresa a{" "}
              <span className="text-destructive">PERDER</span> em processos manuais?
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubra em 2 minutos o custo real da ineficiência
            </p>
          </AnimatedSection>

          {/* Calculator Card */}
          <div
            ref={ref}
            className={`bg-card rounded-2xl border border-border p-6 md:p-10 shadow-2xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Calculadora de ROI</h3>
                <p className="text-sm text-muted-foreground">Preencha os campos abaixo</p>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InputWithTooltip
                id="colaboradores"
                label="Quantos colaboradores gastam tempo em tarefas manuais?"
                tooltip="Colaboradores que gastam tempo significativo em tarefas administrativas, entrada de dados, follow-ups manuais, etc."
                placeholder="Ex: 5"
                value={formData.colaboradores}
                onChange={(v) => handleInputChange("colaboradores", v)}
              />

              <InputWithTooltip
                id="horasDia"
                label="Horas por dia em tarefas manuais (média por pessoa)"
                tooltip="Tempo gasto em tarefas como copiar dados entre sistemas, follow-ups manuais, criar relatórios, etc."
                placeholder="Ex: 4"
                value={formData.horasDia}
                onChange={(v) => handleInputChange("horasDia", v)}
                suffix="horas"
              />

              <InputWithTooltip
                id="salarioMedio"
                label="Salário médio mensal (bruto)"
                tooltip="Salário bruto médio mensal dos colaboradores afetados"
                placeholder="Ex: 1500"
                value={formData.salarioMedio}
                onChange={(v) => handleInputChange("salarioMedio", v)}
                suffix="€"
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground font-medium">
                    Frequência de erros em processos manuais
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
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
                  <SelectTrigger className="bg-background border-border h-12 text-lg">
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="raramente">Raramente (1-2 por mês)</SelectItem>
                    <SelectItem value="ocasionalmente">Ocasionalmente (1 por semana)</SelectItem>
                    <SelectItem value="frequentemente">Frequentemente (várias por semana)</SelectItem>
                    <SelectItem value="muito-frequentemente">Muito frequentemente (quase diariamente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <InputWithTooltip
                id="custoErro"
                label="Custo médio de cada erro"
                tooltip="Considere tempo de correção + impacto no cliente + reprocessamento"
                placeholder="Ex: 100"
                value={formData.custoErro}
                onChange={(v) => handleInputChange("custoErro", v)}
                suffix="€"
              />
            </div>

            {/* Calculate Button */}
            <Button
              onClick={calculateROI}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calculator className="w-5 h-5 mr-2" />
              CALCULAR O MEU ROI
            </Button>

            {/* Results */}
            {showResults && results && (
              <div className="mt-10 space-y-8 animate-fade-in">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Current Cost Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">Custo Atual</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-muted-foreground mb-1">Por semana</p>
                      <p className="text-xl font-bold text-destructive">
                        {formatCurrency(results.custoSemanalManual)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-muted-foreground mb-1">Por mês</p>
                      <p className="text-xl font-bold text-destructive">
                        {formatCurrency(results.custoMensalManual)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-muted-foreground mb-1">Por ano (trabalho manual)</p>
                      <p className="text-xl font-bold text-destructive">
                        {formatCurrency(results.custoAnualManual)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-muted-foreground mb-1">Custo de erros (anual)</p>
                      <p className="text-xl font-bold text-destructive">
                        {formatCurrency(results.custoErrosAnual)}
                      </p>
                    </div>
                  </div>

                  {/* Total Lost */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/30">
                    <p className="text-sm text-muted-foreground mb-2">TOTAL ANUAL PERDIDO</p>
                    <p className="text-4xl md:text-5xl font-bold text-destructive">
                      {formatCurrency(results.totalPerdidoAnual)}
                    </p>
                  </div>

                  {/* Visual Bar */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Comparação visual</p>
                    <div className="h-8 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-destructive to-destructive/70 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                        style={{ width: "100%" }}
                      >
                        <span className="text-xs font-medium text-destructive-foreground">
                          Custo atual
                        </span>
                      </div>
                    </div>
                    <div className="h-8 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out delay-300 flex items-center justify-end pr-3"
                        style={{ width: `${Math.max(25, Math.min(75, (1 - results.poupancaTotalAnual / results.totalPerdidoAnual) * 100))}%` }}
                      >
                        <span className="text-xs font-medium text-white">
                          Com automação
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">
                      Com automação, poderia poupar:
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-muted-foreground">Redução de 75% em horas manuais</p>
                      </div>
                      <p className="text-xl font-bold text-green-500">
                        {formatCurrency(results.poupancaTrabalho)}/ano
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-muted-foreground">Redução de 90% em erros</p>
                      </div>
                      <p className="text-xl font-bold text-green-500">
                        {formatCurrency(results.poupancaErros)}/ano
                      </p>
                    </div>
                  </div>

                  {/* Total Savings */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">POUPANÇA ANUAL ESTIMADA</p>
                        <p className="text-4xl md:text-5xl font-bold text-green-500">
                          {formatCurrency(results.poupancaTotalAnual)}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-sm text-muted-foreground mb-1">Retorno do investimento</p>
                        <p className="text-2xl font-bold text-primary">
                          {results.roiMinMeses.toFixed(1)} - {results.roiMaxMeses.toFixed(1)} meses
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Após retorno: poupança líquida de{" "}
                          <span className="text-green-500 font-medium">
                            {formatCurrency(results.poupancaTotalAnual)}
                          </span>
                          /ano
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                  <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                    Quer ver exatamente onde pode automatizar e poupar?
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Oferecemos diagnóstico gratuito de 30 minutos para mapear as suas oportunidades.
                  </p>
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open(CALENDLY_URL, "_blank")}
                  >
                    AGENDAR DIAGNÓSTICO GRATUITO
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
