import { AlertTriangle, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROIEvents } from "@/lib/analytics";
import type { Results, AssumptionSettings } from "./types";
import { CALENDLY_URL } from "./types";

interface ROIResultsProps {
  results: Results;
  assumptions: AssumptionSettings;
}

export function ROIResults({ results, assumptions }: ROIResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCTAClick = () => {
    ROIEvents.clickAgendarDiagnostico();
    window.open(CALENDLY_URL, "_blank");
  };

  return (
    <div className="mt-12 space-y-10 animate-fade-in">
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* MAIN RESULT - Total Annual Lost */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h4 className="text-xl font-semibold text-foreground">Resultado Principal</h4>
        </div>

        {/* Hero Result Card */}
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-destructive/15 via-destructive/10 to-destructive/5 border-2 border-destructive/40 shadow-lg">
          <p className="text-sm md:text-base text-muted-foreground mb-3 uppercase tracking-wide font-medium">
            Total anual perdido (tempo + erros)
          </p>
          <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-destructive leading-none">
            {formatCurrency(results.totalPerdidoAnual)}
          </p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Com base nas horas indicadas e no custo/hora + custo estimado de erros.
          </p>
        </div>
      </div>

      {/* Secondary Breakdown Cards */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Detalhes do custo atual</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="p-4 md:p-5 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Por semana</p>
            <p className="text-lg md:text-xl font-bold text-destructive">
              {formatCurrency(results.custoSemanalManual)}
            </p>
          </div>
          <div className="p-4 md:p-5 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Por mês</p>
            <p className="text-lg md:text-xl font-bold text-destructive">
              {formatCurrency(results.custoMensalManual)}
            </p>
          </div>
          <div className="p-4 md:p-5 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Trabalho manual (anual)</p>
            <p className="text-lg md:text-xl font-bold text-destructive">
              {formatCurrency(results.custoAnualManual)}
            </p>
          </div>
          <div className="p-4 md:p-5 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Custo anual de erros</p>
            <p className="text-lg md:text-xl font-bold text-destructive">
              {formatCurrency(results.custoErrosAnual)}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Comparison Bar */}
      <div className="space-y-3 pt-2">
        <p className="text-sm text-muted-foreground font-medium">Comparação visual</p>
        <div className="space-y-3">
          <div className="h-10 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-destructive to-destructive/70 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
              style={{ width: "100%" }}
            >
              <span className="text-xs font-medium text-destructive-foreground">
                Custo atual
              </span>
            </div>
          </div>
          <div className="h-10 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out delay-300 flex items-center justify-end pr-4"
              style={{ width: `${Math.max(20, Math.min(80, (1 - results.poupancaTotalAnual / results.totalPerdidoAnual) * 100))}%` }}
            >
              <span className="text-xs font-medium text-green-950">
                Com automação
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h4 className="text-xl font-semibold text-foreground">
            Com automação, poderia poupar:
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Redução de {assumptions.reducaoTempo}% em horas manuais
              </p>
            </div>
            <p className="text-2xl font-bold text-green-500">
              {formatCurrency(results.poupancaTrabalho)}/ano
            </p>
          </div>
          <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Redução de {assumptions.reducaoErros}% em erros
              </p>
            </div>
            <p className="text-2xl font-bold text-green-500">
              {formatCurrency(results.poupancaErros)}/ano
            </p>
          </div>
        </div>

        {/* Total Savings Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide font-medium">Poupança anual estimada</p>
              <p className="text-4xl md:text-5xl font-bold text-green-500">
                {formatCurrency(results.poupancaTotalAnual)}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="text-sm text-muted-foreground mb-1">Retorno do investimento</p>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {results.roiMinMeses.toFixed(1)} - {results.roiMaxMeses.toFixed(1)} meses
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Após retorno: poupança líquida de{" "}
                <span className="text-green-500 font-semibold">
                  {formatCurrency(results.poupancaTotalAnual)}
                </span>
                /ano
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="p-6 md:p-10 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-5">
        <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
          Quer identificar exatamente onde automatizar e poupar?
        </h4>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          No diagnóstico, recebe 3 oportunidades prioritárias de automação com estimativa de ROI.
        </p>
        <Button
          size="lg"
          className="h-auto py-4 px-8 text-base md:text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleCTAClick}
        >
          <span className="flex flex-col items-center leading-tight gap-1">
            <span className="flex items-center gap-2">
              Agendar diagnóstico gratuito (15 min)
              <ArrowRight className="w-5 h-5" />
            </span>
            <span className="text-xs opacity-80 font-normal">Sem compromisso</span>
          </span>
        </Button>
      </div>
    </div>
  );
}
