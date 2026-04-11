import * as Sentry from '@sentry/react';

/**
 * Inicializa Sentry para monitoreo de errores en producción.
 * Solo se activa si VITE_SENTRY_DSN está configurado.
 * En desarrollo, Sentry queda silencioso para no contaminar los reportes.
 */
export const initSentry = (): void => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    if (import.meta.env.DEV) {
      console.info('[Sentry] VITE_SENTRY_DSN no configurado — monitoreo desactivado.');
    }
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE, // 'development' | 'production'
    release: import.meta.env.VITE_APP_VERSION || '0.0.0',

    // Capturar solo el 10% de tráfico en trazas de performance
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 0,

    // Capturar el 100% de replays de sesión solo cuando hay un error
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,

    // Ignorar errores que no son accionables
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      /^Loading chunk \d+ failed/,
      /^Failed to fetch dynamically imported module/,
      'NetworkError',
    ],

    beforeSend(event) {
      // No enviar errores de localhost a producción
      if (import.meta.env.DEV) return null;
      return event;
    },
  });
};

/**
 * Captura manualmente una excepción (para usar en catch blocks).
 * No falla si Sentry no está inicializado.
 */
export const captureError = (error: unknown, context?: Record<string, unknown>): void => {
  if (import.meta.env.DEV) {
    console.error('[Error capturado]', error, context);
    return;
  }
  Sentry.captureException(error, { extra: context });
};

/**
 * Registra un mensaje de diagnóstico en Sentry.
 */
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info'): void => {
  Sentry.captureMessage(message, level);
};

export { Sentry };
