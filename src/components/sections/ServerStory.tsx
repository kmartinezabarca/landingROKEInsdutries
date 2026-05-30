import React, { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ServerScene = lazy(() => import("../three/ServerScene"));

/* ─── service callout data ────────────────────────────────────────────
   Each card appears when the matching scroll progress is reached.
   progress: the point (0-1) at which the card fades in.
   side: "left" | "right" — which side the line connector appears on.
──────────────────────────────────────────────────────────────────────── */
const CALLOUTS = [
  {
    id: "vps",
    progress: 0.18,
    side: "left" as const,
    tag: "CPU · Intel Xeon E5",
    title: "VPS & Dedicados",
    desc: "Procesamiento bare-metal asignado exclusivamente a tu carga.",
  },
  {
    id: "hosting",
    progress: 0.36,
    side: "right" as const,
    tag: "RAM · 32 GB ECC",
    title: "Cloud Hosting",
    desc: "Memoria de alta fiabilidad para aplicaciones web sin caídas.",
  },
  {
    id: "storage",
    progress: 0.54,
    side: "left" as const,
    tag: "NVMe SSD · RAID",
    title: "Alta Disponibilidad",
    desc: "Almacenamiento en espejo con failover automático en < 30 s.",
  },
  {
    id: "game",
    progress: 0.66,
    side: "right" as const,
    tag: "NIC · 10 GbE",
    title: "Game Servers",
    desc: "Baja latencia y ancho de banda dedicado para tus jugadores.",
  },
  {
    id: "db",
    progress: 0.76,
    side: "left" as const,
    tag: "PSU · redundante",
    title: "Bases de Datos",
    desc: "Energía redundante para uptime 99.97 % sin cortes de luz.",
  },
];

/* ─── single callout card ─────────────────────────────────────────────── */
const Callout: React.FC<{
  item: (typeof CALLOUTS)[number];
  scrollProgress: number;
}> = ({ item, scrollProgress }) => {
  const visible = scrollProgress >= item.progress;
  const t = Math.max(0, Math.min(1, (scrollProgress - item.progress) / 0.07));

  return (
    <motion.div
      style={{
        opacity: t,
        x: item.side === "left" ? (1 - t) * -32 : (1 - t) * 32,
        pointerEvents: visible ? "auto" : "none",
      }}
      className={`flex items-start gap-3 ${item.side === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      {/* connector dot */}
      <div
        className="mt-1.5 flex-shrink-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: visible ? "var(--roke-text)" : "var(--roke-border-strong)",
          boxShadow: visible ? "0 0 8px 2px rgba(100,140,255,0.45)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      />

      <div>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--roke-text-dimmer)",
            marginBottom: 4,
          }}
        >
          {item.tag}
        </div>
        <div
          style={{
            fontFamily: '"Montserrat", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "-0.02em",
            color: "var(--roke-text)",
            marginBottom: 3,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.45,
            color: "var(--roke-text-dim)",
            maxWidth: 200,
          }}
        >
          {item.desc}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── progress spine ──────────────────────────────────────────────────── */
const ProgressSpine: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: 0,
      bottom: 0,
      width: 1,
      background: "var(--roke-border-strong)",
      transform: "translateX(-50%)",
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: `${scrollProgress * 100}%`,
        background: "linear-gradient(to bottom, rgba(100,140,255,0.6), rgba(100,140,255,0.15))",
        transition: "height 0.05s linear",
      }}
    />
  </div>
);

/* ─── main section ────────────────────────────────────────────────────── */
const ServerStory: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  /* canvas vertical nudge for parallax feel */
  const canvasY = useTransform(rawProgress, [0, 1], [0, -40]);

  /* We also need a plain number for the callout logic */
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const unsub = rawProgress.on("change", (v) => setProgress(v));
    return unsub;
  }, [rawProgress]);

  return (
    <section
      ref={stickyRef}
      style={{
        position: "relative",
        minHeight: "520vh",
        background: "var(--roke-bg)",
      }}
    >
      {/* ── sticky viewport ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── top eyebrow ── */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div className="roke-eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}>
              <span className="roke-eyebrow-line" />
              <span>05 / INFRAESTRUCTURA</span>
            </div>
            <h2
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "var(--roke-text)",
                margin: 0,
              }}
            >
              Cada pieza,{" "}
              <span style={{ fontWeight: 500, color: "var(--roke-text-dim)" }}>
                un servicio.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ── 3D canvas ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            y: canvasY,
          }}
        >
          <Suspense fallback={null}>
            <ServerScene progress={progress} />
          </Suspense>
        </motion.div>

        {/* ── callout columns (left / right of canvas) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          {/* LEFT column */}
          <div
            style={{
              flex: 1,
              paddingLeft: "max(32px, 4vw)",
              paddingRight: 24,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            {CALLOUTS.filter((c) => c.side === "left").map((item) => (
              <Callout key={item.id} item={item} scrollProgress={progress} />
            ))}
          </div>

          {/* progress spine */}
          <ProgressSpine scrollProgress={progress} />

          {/* RIGHT column */}
          <div
            style={{
              flex: 1,
              paddingRight: "max(32px, 4vw)",
              paddingLeft: 24,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "flex-end",
            }}
          >
            {CALLOUTS.filter((c) => c.side === "right").map((item) => (
              <Callout key={item.id} item={item} scrollProgress={progress} />
            ))}
          </div>
        </div>

        {/* ── bottom scroll hint ── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            x: "-50%",
            opacity: useTransform(rawProgress, [0, 0.08], [1, 0]),
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--roke-text-dimmer)",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 28,
              background: "linear-gradient(to bottom, var(--roke-text-dimmer), transparent)",
            }}
          />
        </motion.div>

        {/* ── completion overlay when fully assembled ── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            x: "-50%",
            opacity: useTransform(rawProgress, [0.9, 1], [0, 1]),
            zIndex: 10,
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              border: "1px solid var(--roke-border-strong)",
              background: "var(--roke-surface)",
              borderRadius: 3,
            }}
          >
            <span
              className="roke-live-dot"
              style={{ width: 7, height: 7, flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--roke-text-dim)",
              }}
            >
              Sistema operativo — 99.97 % uptime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServerStory;
