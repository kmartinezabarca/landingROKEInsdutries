import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/scroll-motion";

const stats = [
  {
    num: "99.97",
    unit: "%",
    label: "UPTIME · 30D",
    desc: "Monitoreado 24/7 con redundancia geográfica.",
    arc: 99.97,
  },
  {
    num: "120",
    unit: "+",
    label: "PROYECTOS ENTREGADOS",
    desc: "Desde startups hasta gobierno y fortune 500.",
    arc: 80,
  },
  {
    num: "42",
    unit: "ms",
    label: "LATENCIA P95",
    desc: "Edge en MX, US y EU. Cerca del usuario final.",
    arc: 42,
  },
  {
    num: "24",
    unit: " / 7",
    label: "SOPORTE EN ESPAÑOL",
    desc: "Equipo humano. Sin bots, sin filas, sin tickets eternos.",
    arc: 100,
  },
];

const RADIUS = 44;
const CIRC = 2 * Math.PI * RADIUS;

const ArcRing: React.FC<{ percent: number; delay: number }> = ({ percent, delay }) => {
  const dash = (Math.min(percent, 100) / 100) * CIRC;
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, margin: "auto", pointerEvents: "none" }}
    >
      {/* Track */}
      <circle
        cx="55" cy="55" r={RADIUS}
        fill="none"
        stroke="var(--roke-border-strong)"
        strokeWidth="1.5"
      />
      {/* Arc */}
      <motion.circle
        cx="55" cy="55" r={RADIUS}
        fill="none"
        stroke="var(--roke-accent, #e8674c)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        initial={{ strokeDashoffset: CIRC, opacity: 0 }}
        whileInView={{ strokeDashoffset: CIRC - dash, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "55px 55px" }}
      />
    </svg>
  );
};

const Benefits: React.FC = () => {
  return (
    <section className="roke-section-stats">
      <div className="roke-stats-band">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="roke-stat-cell"
            style={{ position: "relative" }}
            initial={{ opacity: 0, y: 36, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Progress arc ring — decorative backdrop behind the number */}
            <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto 12px" }}>
              <ArcRing percent={stat.arc} delay={i * 0.1 + 0.3} />
              {/* Number centered over ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: stat.num.length >= 5 ? 24 : stat.num.length >= 3 ? 30 : 36,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: "var(--roke-text)",
                    lineHeight: 0.95,
                    fontVariantNumeric: "tabular-nums",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    maxWidth: 84,
                  }}
                >
                  <CountUp to={parseFloat(stat.num)} decimals={stat.num.includes(".") ? 2 : 0} />
                  <span
                    style={{
                      fontSize: stat.num.length >= 5 ? 13 : 16,
                      color: "var(--roke-text-dim)",
                      fontWeight: 500,
                      marginLeft: 1,
                    }}
                  >
                    {stat.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Label */}
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--roke-text-dimmer)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {stat.label}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: 13,
                color: "var(--roke-text-dim)",
                marginTop: 8,
                lineHeight: 1.4,
                textAlign: "center",
              }}
            >
              {stat.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
