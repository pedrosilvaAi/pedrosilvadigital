export interface FormData {
  colaboradores: string;
  horasDia: string;
  salaryMode: 'hourly' | 'monthly';
  custoHora: string;
  salarioMensal: string;
  horasMensais: string;
  frequenciaErros: string;
  custoErro: string;
}

export interface Results {
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

export interface AssumptionSettings {
  reducaoTempo: number; // 10-95%
  reducaoErros: number; // 10-95%
}

export const errorFrequencyMultipliers: Record<string, number> = {
  "raramente": 1.5,
  "ocasionalmente": 4,
  "frequentemente": 12,
  "muito-frequentemente": 25,
};

export const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";
