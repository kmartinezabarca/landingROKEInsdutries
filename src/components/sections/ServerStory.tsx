import React, { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ServerScene = lazy(() => import("../three/ServerScene"));

/* ─── callout data ────────────────────────────────────────────────────────────
   top / left are percentages of the sticky viewport height/width.
   side: which edge the connector line exits from.
────────────────────────────────────────────────────────────────────────────── */
interface CalloutItem {
  id: string;
  progress: number;         // scroll 0-1 at which this card appears
  side: "left" | "right";
  top: string;              // CSS top within sticky viewport
  tag: string;
  title: string;
  desc: string;
  accentColor: string;
}

const CALLOUTS: CalloutItem[] = [
  {
    id: "vps",
    progress: 0.20,
    side: "left",
    top: "28%",
    tag: "CPU · Intel Xeon E5",
    title: "VPS & Dedicados",
    desc: "Procesamiento bare-metal asignado exclusivamente a tu carga de trabajo.",
    accentColor: "#6688ff",
  },
  {
    id: "hosting",
    progress: 0.38,
    side: "right",
    top: "36%",
    tag: "RAM · 32 GB ECC",
    title: "Cloud Hosting",
    desc: "Memoria de alta fiabilidad para aplicaciones web sin interrupciones.",
    accentColor: "#44bbff",
  },
  {
    id: "storage",
    progress: 0.55,
    side: "left",
    top: "50%",
    tag: "NVMe SSD · RAID",
    title: "Alta Disponibilidad",
    desc: "Almacenamiento en espejo — failover automático en menos de 30 s.",
    accentColor: "#aaddff",
  },
  {
    id: "game",
    progress: 0.67,
    side: "right",
    top: "58%",
    tag: "NIC · 10 GbE",
    title: "Game Servers",
    desc: "Baja latencia y ancho de banda dedicado para todos tus jugadores.",
    accentColor: "#66ffbb",
  },
  {
    id: "db",
    progress: 0.77,
    side: "left",
    top: "70%",
    tag: "PSU · redundante",
    title: "Bases de Datos",
    desc: "Energía redundante N+1 para uptime continuo sin cortes.",
    accentColor: "#ffaa44",
  },
];

/* ─── single annotation card ─────────────────────────────────────────────── */
const Callout: React.FC<{ item: CalloutItem; scrollProgress: number }> = ({
  item,
  scrollProgress,
}) => {
  const t = Math.max(0, Math.min(1, (scrollProgress - item.progress) / 0.08));
  const isLeft = item.side === "left";

  return (
    <div
      style={{
        position: "absolute",
        top: item.top,
        left: isLeft ? "max(24px, 2.5vw)" : "auto",
        right: isLeft ? "auto" : "max(24px, 2.5vw)",
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        alignItems: "center",
        gap: 0,
        opacity: t,
        transform: `translateX(${isLeft ? (1 - t) * -28 : (1 - t) * 28}px)`,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: t > 0.5 ? "auto" : "none",
        zIndex: 6,
        maxWidth: "min(300px, 28vw)",
      }}
    >
      {/* card */}
      <div
        style={{
          padding: "14px 18px",
          background: "rgba(20, 24, 33, 0.88)",
          border: `1px solid ${item.accentColor}44`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 4,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* accent bar on the connector side */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [isLeft ? "right" : "left"]: -1,
            width: 2,
            background: item.accentColor,
            borderRadius: 1,
            opacity: 0.8,
          }}
        />

        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: item.accentColor,
            marginBottom: 6,
          }}
        >
          {item.tag}
        </div>
        <div
          style={{
            fontFamily: '"Montserrat", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "-0.02em",
            color: "#f0f2f6",
            marginBottom: 5,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.5,
            color: "#8898b0",
          }}
        >
          {item.desc}
        </div>
      </div>

      {/* connector line (draws in after card) */}
      <div
        style={{
          height: 1,
          width: `${t * 48}px`,
          background: `linear-gradient(${isLeft ? "to right" : "to left"}, ${item.accentColor}60, transparent)`,
          transition: "width 0.5s ease 0.1s",
          flexShrink: 0,
        }}
      />

      {/* endpoint dot */}
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: item.accentColor,
          boxShadow: `0 0 8px 2px ${item.accentColor}66`,
          flexShrink: 0,
          opacity: t,
        }}
      />
    </div>
  );
};

/* ─── progress spine (center vertical line) ──────────────────────────────── */
const ProgressSpine: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "18%",
      bottom: "18%",
      width: 1,
      background: "rgba(255,255,255,0.06)",
      transform: "translateX(-50%)",
      pointerEvents: "none",
      zIndex: 4,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: `${scrollProgress * 100}%`,
        background: "linear-gradient(to bottom, rgba(100,160,255,0.5), rgba(100,160,255,0.08))",
        transition: "height 0.06s linear",
      }}
    />
  </div>
);

/* ─── assembly status bar (bottom) ──────────────────────────────────────── */
const StatusBar: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const steps = [
    { label: "Chasis", done: 0.10 },
    { label: "Mobo", done: 0.20 },
    { label: "CPU", done: 0.32 },
    { label: "RAM", done: 0.54 },
    { label: "NVMe", done: 0.66 },
    { label: "NIC", done: 0.75 },
    { label: "PSU", done: 0.85 },
    { label: "Lid", done: 1.00 },
  ];
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(14,16,22,0.75)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        padding: "8px 16px",
        borderRadius: 3,
      }}
    >
      {steps.map((s, i) => {
        const done = scrollProgress >= s.done;
        return (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <div style={{ width: 12, height: 1, background: done ? "rgba(100,180,255,0.4)" : "rgba(255,255,255,0.1)" }} />
            )}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: done ? "#44bbff" : "rgba(255,255,255,0.15)",
                  boxShadow: done ? "0 0 6px 1px #44bbff66" : "none",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 8,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: done ? "#8ab4cc" : "rgba(255,255,255,0.2)",
                  transition: "color 0.3s",
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
};

/* ─── main section ───────────────────────────────────────────────────────── */
const ServerStory: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 18 });
  const canvasY = useTransform(rawProgress, [0, 1], [0, -50]);

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
      {/* sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--roke-bg)",
        }}
      >
        {/* top header */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div className="roke-eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>
              <span className="roke-eyebrow-line" />
              <span>02 / INFRAESTRUCTURA</span>
            </div>
            <h2
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: "clamp(28px, 3.8vw, 50px)",
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

        {/* 3D canvas */}
        <motion.div style={{ position: "absolute", inset: 0, y: canvasY }}>
          <Suspense fallback={null}>
            <ServerScene progress={progress} />
          </Suspense>
        </motion.div>

        {/* annotation callouts */}
        {CALLOUTS.map((item) => (
          <Callout key={item.id} item={item} scrollProgress={progress} />
        ))}

        {/* center progress spine */}
        <ProgressSpine scrollProgress={progress} />

        {/* bottom assembly status tracker */}
        <StatusBar scrollProgress={progress} />

        {/* scroll hint — fades out on first scroll */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            x: "-50%",
            opacity: useTransform(rawProgress, [0, 0.07], [1, 0]),
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--roke-text-dimmer)",
            }}
          >
            scroll para ensamblar
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 26,
              background: "linear-gradient(to bottom, var(--roke-text-dimmer), transparent)",
            }}
          />
        </motion.div>

        {/* system-online badge — appears when fully assembled */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            marginTop: "15vh",
            opacity: useTransform(rawProgress, [0.92, 1.0], [0, 1]),
            scale: useTransform(rawProgress, [0.92, 1.0], [0.88, 1]),
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              border: "1px solid rgba(34,221,85,0.3)",
              background: "rgba(14,16,22,0.82)",
              backdropFilter: "blur(12px)",
              borderRadius: 3,
              whiteSpace: "nowrap",
            }}
          >
            <span className="roke-live-dot" style={{ width: 7, height: 7, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8ab4cc",
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
