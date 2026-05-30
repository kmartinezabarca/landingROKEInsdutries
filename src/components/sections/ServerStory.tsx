import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ServerScene = lazy(() => import("../three/ServerScene"));

/* ─── callout definitions ────────────────────────────────────────────────────── */
interface CalloutItem {
  id: string;
  threshold: number;   // progress value at which this card appears
  side: "left" | "right";
  top: string;
  tag: string;
  title: string;
  desc: string;
  accent: string;
}

const CALLOUTS: CalloutItem[] = [
  {
    id: "vps",
    threshold: 0.20,
    side: "left",
    top: "26%",
    tag: "CPU · Intel Xeon E5",
    title: "VPS & Dedicados",
    desc: "Procesamiento bare-metal asignado exclusivamente a tu carga de trabajo.",
    accent: "#6688ff",
  },
  {
    id: "hosting",
    threshold: 0.38,
    side: "right",
    top: "36%",
    tag: "RAM · 32 GB ECC",
    title: "Cloud Hosting",
    desc: "Memoria de alta fiabilidad para aplicaciones web sin interrupciones.",
    accent: "#44bbff",
  },
  {
    id: "storage",
    threshold: 0.55,
    side: "left",
    top: "50%",
    tag: "NVMe SSD · RAID",
    title: "Alta Disponibilidad",
    desc: "Almacenamiento en espejo — failover automático en < 30 s.",
    accent: "#aaddff",
  },
  {
    id: "game",
    threshold: 0.67,
    side: "right",
    top: "60%",
    tag: "NIC · 10 GbE",
    title: "Game Servers",
    desc: "Baja latencia y ancho de banda dedicado para tus jugadores.",
    accent: "#66ffbb",
  },
  {
    id: "db",
    threshold: 0.77,
    side: "left",
    top: "72%",
    tag: "PSU · redundante N+1",
    title: "Bases de Datos",
    desc: "Energía redundante para uptime continuo sin cortes de luz.",
    accent: "#ffaa44",
  },
];

const STEPS = [
  { label: "Chasis",  at: 0.10 },
  { label: "Mobo",    at: 0.20 },
  { label: "CPU",     at: 0.30 },
  { label: "RAM",     at: 0.54 },
  { label: "NVMe",    at: 0.66 },
  { label: "NIC",     at: 0.75 },
  { label: "PSU",     at: 0.85 },
  { label: "Online",  at: 1.00 },
];

/* ─── annotation card ───────────────────────────────────────────────────────── */
const Callout: React.FC<{ item: CalloutItem; progress: number }> = ({ item, progress }) => {
  const rawT = Math.max(0, Math.min(1, (progress - item.threshold) / 0.09));
  const isLeft = item.side === "left";

  return (
    <div
      style={{
        position: "absolute",
        top: item.top,
        left:  isLeft ? "max(20px, 2vw)" : "auto",
        right: isLeft ? "auto" : "max(20px, 2vw)",
        zIndex: 8,
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        alignItems: "center",
        gap: 0,
        opacity: rawT,
        transform: `translateX(${isLeft ? (1 - rawT) * -24 : (1 - rawT) * 24}px)`,
        transition: "opacity 0.35s ease, transform 0.35s ease",
        pointerEvents: rawT > 0.5 ? "auto" : "none",
        maxWidth: "min(290px, 26vw)",
      }}
    >
      {/* card */}
      <div
        style={{
          padding: "13px 16px",
          background: "rgba(12, 15, 22, 0.90)",
          border: `1px solid ${item.accent}38`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: 3,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* accent side bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [isLeft ? "right" : "left"]: -1,
            width: 2,
            background: item.accent,
            borderRadius: 1,
            opacity: 0.75,
          }}
        />
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: item.accent,
            marginBottom: 5,
          }}
        >
          {item.tag}
        </div>
        <div
          style={{
            fontFamily: '"Montserrat", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "-0.02em",
            color: "#e8edf4",
            marginBottom: 5,
          }}
        >
          {item.title}
        </div>
        <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#7888a0" }}>
          {item.desc}
        </div>
      </div>

      {/* connector line */}
      <div
        style={{
          height: 1,
          width: `${rawT * 44}px`,
          background: `linear-gradient(${isLeft ? "to right" : "to left"}, ${item.accent}55, transparent)`,
          flexShrink: 0,
          transition: "width 0.45s ease 0.08s",
        }}
      />
      {/* endpoint dot */}
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: item.accent,
          boxShadow: `0 0 8px 2px ${item.accent}55`,
          opacity: rawT,
          flexShrink: 0,
        }}
      />
    </div>
  );
};

/* ─── assembly step tracker ─────────────────────────────────────────────────── */
const StepTracker: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      position: "absolute",
      bottom: 26,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "7px 14px",
      background: "rgba(10, 12, 20, 0.82)",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(12px)",
      borderRadius: 3,
      whiteSpace: "nowrap",
    }}
  >
    {STEPS.map((s, i) => {
      const done = progress >= s.at;
      return (
        <React.Fragment key={s.label}>
          {i > 0 && (
            <div style={{ width: 10, height: 1, background: done ? "rgba(100,180,255,0.35)" : "rgba(255,255,255,0.08)" }} />
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: done ? "#44bbff" : "rgba(255,255,255,0.12)",
                boxShadow: done ? "0 0 6px 1px #44bbff66" : "none",
                transition: "background 0.4s, box-shadow 0.4s",
              }}
            />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 7.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: done ? "#7aa8c4" : "rgba(255,255,255,0.18)",
                transition: "color 0.4s",
              }}
            >
              {s.label}
            </span>
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

/* ─── main section ───────────────────────────────────────────────────────────── */
const ServerStory: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });

  /**
   * progressRef — updated every frame from Framer Motion spring.
   * Passed to the Three.js canvas so the R3F loop can read it without
   * causing React re-renders inside the Canvas.
   */
  const progressRef = useRef(0);

  /**
   * calloutProgress — React state, used only for the DOM overlay cards.
   * Throttled to ~20fps to minimise React re-renders for the overlay.
   */
  const [calloutProgress, setCalloutProgress] = useState(0);

  useEffect(() => {
    let lastUpdate = 0;
    const unsub = rawProgress.on("change", (v) => {
      progressRef.current = v;
      // throttle DOM re-renders to ~20fps (every 50ms)
      const now = performance.now();
      if (now - lastUpdate > 50) {
        lastUpdate = now;
        setCalloutProgress(v);
      }
    });
    return unsub;
  }, [rawProgress]);

  const canvasY = useTransform(rawProgress, [0, 1], [0, -55]);
  const scrollHintOpacity = useTransform(rawProgress, [0, 0.07], [1, 0]);
  const completionScale   = useTransform(rawProgress, [0.92, 1.0], [0.88, 1]);
  const completionOpacity = useTransform(rawProgress, [0.92, 1.0], [0, 1]);

  return (
    <section
      ref={stickyRef}
      style={{ position: "relative", minHeight: "520vh", background: "var(--roke-bg)" }}
    >
      {/* ── sticky viewport ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--roke-bg)",
        }}
      >
        {/* header */}
        <div
          style={{
            position: "absolute", top: 44, left: 0, right: 0,
            zIndex: 10, display: "flex", justifyContent: "center", pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{ textAlign: "center" }}
          >
            <div className="roke-eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>
              <span className="roke-eyebrow-line" />
              <span>02 / INFRAESTRUCTURA</span>
            </div>
            <h2
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: "clamp(26px, 3.6vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
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

        {/* 3D canvas — receives progressRef, never re-renders for animation */}
        <motion.div style={{ position: "absolute", inset: 0, y: canvasY }}>
          <Suspense fallback={null}>
            <ServerScene progressRef={progressRef} />
          </Suspense>
        </motion.div>

        {/* annotation callouts — DOM overlay, throttled re-renders */}
        {CALLOUTS.map((item) => (
          <Callout key={item.id} item={item} progress={calloutProgress} />
        ))}

        {/* step tracker */}
        <StepTracker progress={calloutProgress} />

        {/* scroll hint */}
        <motion.div
          style={{
            position: "absolute", bottom: 74, left: "50%", x: "-50%",
            opacity: scrollHintOpacity, zIndex: 10, pointerEvents: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--roke-text-dimmer)",
            }}
          >
            scroll para ensamblar
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ width: 1, height: 26, background: "linear-gradient(to bottom, var(--roke-text-dimmer), transparent)" }}
          />
        </motion.div>

        {/* system-online completion badge */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "22vh", left: "50%", x: "-50%",
            opacity: completionOpacity, scale: completionScale,
            zIndex: 10, pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "10px 20px",
              border: "1px solid rgba(34,221,85,0.28)",
              background: "rgba(10, 14, 20, 0.85)",
              backdropFilter: "blur(14px)",
              borderRadius: 3, whiteSpace: "nowrap",
            }}
          >
            <span className="roke-live-dot" style={{ width: 7, height: 7, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "#7aaccc",
              }}
            >
              Sistema operativo · 99.97 % uptime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServerStory;
