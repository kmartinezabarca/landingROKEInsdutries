/**
 * Módulo de Analytics para ROKE Industries.
 *
 * Soporta Google Analytics 4 (GA4).
 * Solo se activa en producción cuando VITE_GA_MEASUREMENT_ID está configurado.
 *
 * Uso:
 *   import { trackEvent, trackPageView } from '@/lib/analytics';
 *   trackEvent('contact_form_submit', { service: 'Hosting Web' });
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

/** Inicializa Google Analytics 4. Llamar una vez al arrancar la app. */
export const initAnalytics = (): void => {
  if (!GA_ID || !import.meta.env.PROD) return;

  // Inyectar script de GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false, // Lo manejamos manualmente por ruta
  });
};

/** Registra una vista de página. Llamar en cada cambio de ruta. */
export const trackPageView = (path: string, title?: string): void => {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
  });
};

/** Registra un evento personalizado. */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', eventName, params);
};

// ---------------------------------------------------------------------------
// Eventos predefinidos del negocio (consistencia en toda la app)
// ---------------------------------------------------------------------------

export const Analytics = {
  /** Usuario envió el formulario de contacto */
  contactFormSubmit: (service: string) =>
    trackEvent('contact_form_submit', { service }),

  /** Usuario hizo click en WhatsApp */
  whatsappClick: (source: string) =>
    trackEvent('whatsapp_click', { source }),

  /** Usuario se suscribió al blog */
  blogSubscribe: () =>
    trackEvent('blog_subscribe'),

  /** Usuario hizo click en un plan de hosting */
  planSelected: (planName: string, planType: string) =>
    trackEvent('plan_selected', { plan_name: planName, plan_type: planType }),

  /** Usuario solicitó documentación */
  documentationRequest: (topic: string) =>
    trackEvent('documentation_request', { topic }),

  /** Usuario cambió de idioma */
  languageChange: (lang: string) =>
    trackEvent('language_change', { language: lang }),
};
