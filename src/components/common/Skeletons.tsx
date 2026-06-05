import React from "react";

/**
 * Skeleton loaders alineados con el sistema de diseño ROKE.
 * Usan la clase `.roke-skeleton` (shimmer con tokens var(--roke-*)) y replican
 * el layout real de las tarjetas para evitar saltos de layout al cargar.
 */

/** Una barra de skeleton individual. */
export const SkeletonBar: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = "",
  style,
}) => <div className={`roke-skeleton ${className}`} style={style} />;

/** Tarjeta de plan (Servicios / Hosting). */
export const PlanCardSkeleton: React.FC = () => (
  <div className="relative p-8 border border-[var(--roke-border-strong)] -m-[1px] flex flex-col gap-5 bg-[var(--roke-surface)]">
    <div className="flex flex-col gap-2.5">
      <SkeletonBar className="h-5 w-1/2" />
      <SkeletonBar className="h-3 w-3/4" />
    </div>
    <SkeletonBar className="h-11 w-2/5" />
    <div className="pt-4 border-t border-[var(--roke-border-strong)] flex flex-col gap-3 flex-grow">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonBar key={i} className="h-3" style={{ width: `${92 - i * 9}%` }} />
      ))}
    </div>
    <SkeletonBar className="h-11 w-full mt-2" />
  </div>
);

/** Grid de planes en skeleton. */
export const PlanGridSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--roke-border-strong)]">
    {Array.from({ length: count }).map((_, i) => (
      <PlanCardSkeleton key={i} />
    ))}
  </div>
);

/** Tarjeta de artículo (Blog). */
export const PostCardSkeleton: React.FC = () => (
  <div className="-m-px flex flex-col border border-[var(--roke-border-strong)] bg-[var(--roke-surface)]">
    {/* Media */}
    <SkeletonBar style={{ aspectRatio: "16/10", borderRadius: 0 }} />
    {/* Body */}
    <div className="flex flex-col gap-3.5 flex-1" style={{ padding: "22px 24px 24px" }}>
      <div className="flex items-center gap-3">
        <SkeletonBar className="h-5 w-20" />
        <SkeletonBar className="h-3 w-12" />
      </div>
      <SkeletonBar className="h-5 w-11/12" />
      <div className="flex flex-col gap-2 flex-1">
        <SkeletonBar className="h-3 w-full" />
        <SkeletonBar className="h-3 w-4/5" />
      </div>
      <div
        className="flex items-center justify-between pt-3.5 mt-auto"
        style={{ borderTop: "1px solid var(--roke-border)" }}
      >
        <SkeletonBar className="h-3 w-24" />
        <SkeletonBar className="h-3 w-4" />
      </div>
    </div>
  </div>
);

/** Grid de artículos en skeleton. */
export const PostGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[var(--roke-border-strong)]">
    {Array.from({ length: count }).map((_, i) => (
      <PostCardSkeleton key={i} />
    ))}
  </div>
);
