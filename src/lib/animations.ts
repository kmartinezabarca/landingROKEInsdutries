/**
 * Variants de Framer Motion reutilizables en toda la aplicación.
 * Importar desde aquí en lugar de definir inline en cada componente.
 *
 * Uso:
 *   import { fadeInUp, staggerContainer } from '@/lib/animations';
 *   <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 */

import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Fade
// ---------------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ---------------------------------------------------------------------------
// Escala
// ---------------------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

// ---------------------------------------------------------------------------
// Contenedores con stagger (hijos se animan en secuencia)
// ---------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// ---------------------------------------------------------------------------
// Modal / overlay
// ---------------------------------------------------------------------------

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

// ---------------------------------------------------------------------------
// Menú móvil / accordion
// ---------------------------------------------------------------------------

export const slideDown: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};

// ---------------------------------------------------------------------------
// Lista de items
// ---------------------------------------------------------------------------

export const listItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ---------------------------------------------------------------------------
// Hover helpers (para usar en whileHover directamente)
// ---------------------------------------------------------------------------

export const hoverScale = { scale: 1.03 };
export const hoverScaleSm = { scale: 1.01 };
export const tapScale = { scale: 0.97 };

// ---------------------------------------------------------------------------
// Transiciones reutilizables
// ---------------------------------------------------------------------------

export const springTransition = { type: 'spring', stiffness: 500, damping: 30 } as const;
export const smoothTransition = { duration: 0.3, ease: 'easeInOut' } as const;
