import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/**
 * Widget de Cloudflare Turnstile (anti-bot).
 *
 * Renderiza el challenge y entrega el token vía `onVerify`. Ese token debe
 * enviarse al backend, que lo verifica con la *secret key* contra
 * https://challenges.cloudflare.com/turnstile/v0/siteverify (campo
 * `cf-turnstile-response`). Sin verificación en el servidor, el captcha no
 * protege nada.
 *
 * La site key se toma de VITE_TURNSTILE_SITE_KEY. Si no está configurada, usa
 * la clave de prueba de Cloudflare (siempre aprueba) para no romper en dev.
 */
const SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || '1x00000000000000000000AA';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('No se pudo cargar Cloudflare Turnstile'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: 'auto' | 'light' | 'dark';
  className?: string;
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  ({ onVerify, onExpire, onError, theme = 'auto', className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);
    // Mantener callbacks frescos sin re-renderizar el widget.
    const cbs = useRef({ onVerify, onExpire, onError });
    cbs.current = { onVerify, onExpire, onError };

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      },
    }));

    useEffect(() => {
      let cancelled = false;
      loadTurnstileScript()
        .then(() => {
          if (cancelled || !containerRef.current || !window.turnstile) return;
          widgetId.current = window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            theme,
            callback: (token: string) => cbs.current.onVerify(token),
            'expired-callback': () => cbs.current.onExpire?.(),
            'error-callback': () => cbs.current.onError?.(),
          });
        })
        .catch(() => cbs.current.onError?.());

      return () => {
        cancelled = true;
        if (widgetId.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetId.current);
          } catch {
            /* noop */
          }
          widgetId.current = null;
        }
      };
    }, [theme]);

    return <div ref={containerRef} className={className} />;
  }
);
Turnstile.displayName = 'Turnstile';

export default Turnstile;
