import React from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '@/contexts/ConsentContext';
import { isAnalyticsConfigured } from '@/lib/analytics';

/**
 * Banner de consentimiento de cookies. Solo aparece si hay analítica
 * configurada y el usuario aún no ha elegido. Hasta que acepte, GA4 no carga.
 */
const CookieConsent: React.FC = () => {
  const { consent, accept, reject } = useConsent();

  if (!isAnalyticsConfigured || consent !== 'unknown') return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '16px',
        transform: 'translateX(-50%)',
        zIndex: 60,
        width: 'min(680px, calc(100% - 24px))',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 18px',
        borderRadius: '10px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--background)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
        fontFamily: '"Montserrat", system-ui, sans-serif',
      }}
    >
      <p style={{ flex: '1 1 280px', margin: 0, fontSize: '13px', lineHeight: 1.55, color: 'var(--muted-foreground)' }}>
        Usamos cookies para analizar el tráfico y mejorar tu experiencia. Puedes aceptarlas o
        rechazarlas. Más info en nuestra{' '}
        <Link to="/privacy" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>
          Política de Privacidad
        </Link>
        .
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          type="button"
          onClick={reject}
          style={{
            padding: '9px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            borderRadius: '7px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--foreground)',
            fontFamily: 'inherit',
          }}
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={accept}
          style={{
            padding: '9px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            borderRadius: '7px', border: '1px solid var(--foreground)',
            background: 'var(--foreground)', color: 'var(--background)',
            fontFamily: 'inherit',
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
