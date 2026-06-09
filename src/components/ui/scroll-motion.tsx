import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

/**
 * Toolkit de animaciones ligadas al scroll para el landing.
 *
 * - Reveal:            aparición suave (fade + desplazamiento + blur) al entrar en viewport.
 * - Stagger/StaggerItem: revelado en cascada de listas/grids.
 * - Parallax:          desplazamiento ligado al scroll (profundidad).
 * - ScrollScrub:       "scrubbing" — la animación avanza CON el scroll (ensamblar/armar).
 * - ScrollProgressBar: barra de progreso de lectura arriba.
 *
 * Todo respeta `prefers-reduced-motion`: si el usuario lo pide, se degrada a
 * opacidad simple o sin movimiento.
 */

/**
 * Curvas compartidas con los tokens CSS (--ease-out / --ease-in-out de
 * micro-animations.css). Mantener sincronizadas: una sola "voz" de movimiento.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
const EASE = EASE_OUT;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

function dirOffset(dir: Direction, distance: number) {
  switch (dir) {
    case 'up': return { y: distance };
    case 'down': return { y: -distance };
    case 'left': return { x: distance };
    case 'right': return { x: -distance };
    default: return {};
  }
}

// ── Reveal ─────────────────────────────────────────────────────────────────────
export function Reveal({
  children,
  className,
  direction = 'up',
  distance = 30,
  delay = 0,
  duration = 0.65,
  blur = true,
  amount = 0.3,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  blur?: boolean;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, ...dirOffset(direction, distance), filter: blur ? 'blur(8px)' : 'blur(0px)' };
  const shown = reduce
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger ──────────────────────────────────────────────────────────────────
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  amount = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 26,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...dirOffset(direction, distance), filter: 'blur(6px)' },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduce ? 0.3 : 0.55, ease: EASE },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

// ── Parallax ─────────────────────────────────────────────────────────────────
export function Parallax({
  children,
  className,
  speed = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  /** 0 = sin movimiento, 0.3 ≈ notorio. Positivo = se mueve más lento que el scroll. */
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const shift = Math.round(speed * 120);
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

// ── ScrollScrub: la animación avanza CON el scroll (ensamblar/armar) ────────────
export function ScrollScrub({
  children,
  className,
  fromY = 60,
  fromScale = 0.92,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  fromY?: number;
  fromScale?: number;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // La animación se "scrubbea" mientras el elemento entra (start) hasta centrarse.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.45'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const y = useTransform(p, [0, 1], [fromY, 0]);
  const scale = useTransform(p, [0, 1], [fromScale, 1]);
  const opacity = useTransform(p, [0, 1], [0, 1]);
  const rotateZ = useTransform(p, [0, 1], [rotate, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, scale, opacity, rotate: rotateZ }}
    >
      {children}
    </motion.div>
  );
}

// ── CountUp: el número "cuenta" hacia su valor al entrar en viewport ────────────
export function CountUp({
  to,
  decimals = 0,
  duration = 1.5,
  className,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

// ── Barra de progreso de scroll (lectura) ───────────────────────────────────────
export function ScrollProgressBar({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 100,
        background: 'linear-gradient(90deg, var(--roke-accent, #e8674c), #f4a23c)',
      }}
    />
  );
}
