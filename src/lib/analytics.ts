// Google Analytics 4 (gtag). El script SOLO se carga tras el consentimiento del
// usuario (ver ConsentContext / CookieConsent). En una SPA, los `page_view` se
// disparan manualmente en cada cambio de ruta (ver <Analytics />).

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

/** Hay un Measurement ID configurado. */
export const isAnalyticsConfigured = !!GA_ID;

/** Inyecta gtag.js e inicializa GA4. Idempotente. */
export function loadAnalytics(): void {
  if (loaded || !GA_ID || typeof document === 'undefined') return;
  loaded = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  // Controlamos nosotros los page_view (SPA).
  window.gtag('config', GA_ID, { send_page_view: false });
}

/** Registra una vista de página (llamar en cada cambio de ruta). */
export function trackPageView(path: string): void {
  if (!loaded || !GA_ID || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
