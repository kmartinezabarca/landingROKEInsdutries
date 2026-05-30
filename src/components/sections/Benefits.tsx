import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "../ui/scroll-motion";

const stats = [
  {
    num: "99.97",
    unit: "%",
    label: "UPTIME · 30D",
    desc: "Monitoreado 24/7 con redundancia geográfica.",
  },
  {
    num: "120",
    unit: "+",
    label: "PROYECTOS ENTREGADOS",
    desc: "Desde startups hasta gobierno y fortune 500.",
  },
  {
    num: "42",
    unit: "ms",
    label: "LATENCIA P95",
    desc: "Edge en MX, US y EU. Cerca del usuario final.",
  },
  {
    num: "24",
    unit: " / 7",
    label: "SOPORTE EN ESPAÑOL",
    desc: "Equipo humano. Sin bots, sin filas, sin tickets eternos.",
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="roke-section-stats">
      <div className="roke-stats-band">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="roke-stat-cell"
            initial={{ opacity: 0, y: 36, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Number */}
            <div
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--roke-text)",
                lineHeight: 0.95,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <CountUp to={parseFloat(stat.num)} decimals={stat.num.includes(".") ? 2 : 0} />
              <span
                style={{
                  fontSize: 32,
                  color: "var(--roke-text-dim)",
                  fontWeight: 500,
                  marginLeft: 2,
                }}
              >
                {stat.unit}
              </span>
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
