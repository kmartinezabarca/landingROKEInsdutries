import React from "react";
import { motion } from "framer-motion";
import TiltArticle from "../common/TiltArticle";

const testimonials = [
  {
    name: "Carlos Mendoza",
    company: "TechStart MX",
    role: "CTO",
    text: "ROKE Industries transformó nuestra infraestructura. El soporte es excepcional y los precios son muy competitivos.",
    rating: 5,
  },
  {
    name: "María García",
    company: "Gaming Studio LA",
    role: "Fundadora",
    text: "Los servidores gaming son increíblemente rápidos. Nuestros jugadores notaron la diferencia inmediatamente.",
    rating: 5,
  },
  {
    name: "Roberto López",
    company: "E-commerce Solutions",
    role: "Director de Tecnología",
    text: "Escalamos nuestro negocio sin preocupaciones. La infraestructura de ROKE crece con nosotros.",
    rating: 5,
  },
];

/* Inline star SVG — no dependency on Lucide */
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const starVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.3, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const SocialProof: React.FC = () => {
  return (
    <section className="roke-section-services">
      <div style={{ maxWidth: 1296, margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="roke-section-header"
        >
          <div>
            {/* Eyebrow */}
            <div className="roke-eyebrow">
              <span className="roke-eyebrow-line" />
              <span>03 / CLIENTES</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: '"Montserrat", system-ui, sans-serif',
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "var(--roke-text)",
                margin: 0,
              }}
            >
              Clientes{" "}
              <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>
                reales.
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--roke-text-dim)",
              margin: 0,
              paddingBottom: 6,
              maxWidth: 520,
            }}
          >
            Empresas reales que confían en ROKE Industries para su
            infraestructura crítica.
          </p>
        </motion.header>

        {/* ── Testimonials grid ── */}
        <div className="roke-3col-grid">
          {testimonials.map((t, i) => (
            <TiltArticle
              key={t.name}
              index={i}
              className="mi-sheen mi-glow"
              style={{
                padding: "36px 36px 32px",
                border: "1px solid var(--roke-border-strong)",
                margin: -1,
                background: "var(--roke-surface)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                transition: "background 0.18s ease",
              }}
            >
              {/* Stars — stagger bounce in */}
              <div style={{ display: "flex", gap: 4 }}>
                {[...Array(t.rating)].map((_, si) => (
                  <motion.span
                    key={si}
                    custom={si}
                    variants={starVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ display: "inline-flex" }}
                  >
                    <StarIcon />
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--roke-text)",
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {t.text}
              </p>

              {/* Author */}
              <div
                style={{
                  paddingTop: 20,
                  borderTop: "1px solid var(--roke-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "-0.01em",
                    color: "var(--roke-text)",
                  }}
                >
                  {t.name}
                </span>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--roke-text-dimmer)",
                    textTransform: "uppercase",
                  }}
                >
                  {t.role} · {t.company}
                </span>
              </div>
            </TiltArticle>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
