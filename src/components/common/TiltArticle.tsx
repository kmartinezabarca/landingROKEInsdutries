import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * TiltArticle — tarjeta con reveal de entrada (fade + blur + scale) y tilt 3D
 * que sigue al cursor. Pensada para reemplazar las <motion.article> de los grids
 * del HOME sin romper su layout (el tilt es solo transform; el margin:-1 de la
 * costura del grid se mantiene). Respeta prefers-reduced-motion.
 */
interface TiltArticleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Índice para escalonar el reveal. */
  index?: number;
  /** Inclinación máxima en grados. */
  max?: number;
  /** Color de fondo en hover (por defecto la superficie elevada). */
  hoverBg?: string;
  /** Color de fondo en reposo. */
  baseBg?: string;
}

export const TiltArticle: React.FC<TiltArticleProps> = ({
  children,
  className,
  style,
  index = 0,
  max = 6,
  hoverBg = "var(--roke-surface-2)",
  baseBg = "var(--roke-surface)",
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 22 });

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    el.style.background = hoverBg;
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    if (ref.current) ref.current.style.background = baseBg;
  };

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.96, filter: "blur(10px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        ...style,
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.article>
  );
};

export default TiltArticle;
