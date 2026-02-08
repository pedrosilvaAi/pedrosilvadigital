// Analytics tracking utilities for ROI Calculator events

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
  
  // Console log for debugging in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, params);
  }
}

// Specific ROI Calculator events
export const ROIEvents = {
  clickCalcularRoi: () => trackEvent('click_calcular_roi'),
  openComoCalculado: () => trackEvent('open_como_calculado'),
  changeSliderTempo: (value: number) => trackEvent('change_slider_tempo', { value }),
  changeSliderErros: (value: number) => trackEvent('change_slider_erros', { value }),
  clickAgendarDiagnostico: () => trackEvent('click_agendar_diagnostico'),
} as const;
