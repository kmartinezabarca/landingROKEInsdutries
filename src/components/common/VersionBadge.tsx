import React from 'react';
import { APP_VERSION_LABEL, BUILD_DATE_LABEL, BUILD_DATE_ISO } from '@/utils/constants/version';

/**
 * Always-visible app version badge.
 *
 * Rendered once at the app root (outside <Routes>) so it stays pinned on
 * every screen, e.g. "V1.0.0 · BUILD 02 JUN 2026". Sits bottom-left to avoid
 * the floating action buttons on the bottom-right.
 */
const VersionBadge: React.FC = () => {
  return (
    <div
      title={`Build ${BUILD_DATE_ISO}`}
      aria-label={`Versión ${APP_VERSION_LABEL}, build ${BUILD_DATE_LABEL}`}
      style={{
        position: 'fixed',
        left: '12px',
        bottom: '12px',
        zIndex: 40,
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '6px',
        border: '1px solid var(--border)',
        backgroundColor: 'color-mix(in srgb, var(--background) 80%, transparent)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        fontFamily: 'monospace',
        fontSize: '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--muted-foreground)',
        opacity: 0.7,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
        }}
      />
      <span>{APP_VERSION_LABEL}</span>
      <span style={{ opacity: 0.5 }}>·</span>
      <span>BUILD {BUILD_DATE_LABEL}</span>
    </div>
  );
};

export default VersionBadge;
