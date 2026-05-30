import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/config";
import { useServices } from "../../hooks/useServices";

interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
  bgColor: string;
  features?: string[];
  type: string;
  slug?: string;
  linkLabel?: string;
}

/* ── Custom SVGs matching Landing.html exactly (26×26, stroke-width 1.5) ── */
const SvgServer = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="4" width="18" height="6" rx="1" />
    <rect x="3" y="14" width="18" height="6" rx="1" />
    <circle cx="7" cy="7" r="0.8" fill="currentColor" />
    <circle cx="7" cy="17" r="0.8" fill="currentColor" />
  </svg>
);

const SvgGamepad = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="7" width="18" height="11" rx="3" />
    <line x1="7" y1="12" x2="9" y2="12" />
    <line x1="8" y1="11" x2="8" y2="13" />
    <circle cx="16" cy="11.5" r="1" fill="currentColor" />
    <circle cx="17.5" cy="13.5" r="1" fill="currentColor" />
  </svg>
);

const SvgCpu = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="1" />
    <line x1="9" y1="2" x2="9" y2="5" />
    <line x1="15" y1="2" x2="15" y2="5" />
    <line x1="9" y1="19" x2="9" y2="22" />
    <line x1="15" y1="19" x2="15" y2="22" />
    <line x1="2" y1="9" x2="5" y2="9" />
    <line x1="2" y1="15" x2="5" y2="15" />
    <line x1="19" y1="9" x2="22" y2="9" />
    <line x1="19" y1="15" x2="22" y2="15" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

const SvgCloud = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <path d="M8 14l3 3 5-5" />
  </svg>
);

const SvgDefault = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  Server:    SvgServer,
  LifeBuoy:  SvgServer,
  Gamepad2:  SvgGamepad,
  Cpu:       SvgCpu,
  ScanEye:   SvgCpu,
  Cloud:     SvgCloud,
  Shield:    SvgCloud,
  Code:      SvgDefault,
  Database:  SvgDefault,
  Zap:       SvgDefault,
};

const linkLabels: Record<string, string> = {
  Server:   "Ver planes",
  LifeBuoy: "Ver planes",
  Gamepad2: "Ver opciones",
  Cpu:      "Explorar casos",
  ScanEye:  "Explorar casos",
  Cloud:    "Cómo trabajamos",
  Shield:   "Cómo trabajamos",
};

const Services: React.FC = () => {
  const { data, isLoading, isError, error } = useServices();

  if (isLoading) {
    return (
      <section className="roke-section-services">
        <div style={{ maxWidth: 1296, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--roke-text-dimmer)",
              marginBottom: 48,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{ width: 32, height: 1, background: "var(--roke-text-dimmer)", display: "inline-block" }}
            />
            Cargando servicios…
          </div>
          <div className="roke-services-grid">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  padding: "36px 36px 32px",
                  border: "1px solid var(--roke-border-strong)",
                  margin: -1,
                  background: "var(--roke-surface)",
                  minHeight: 200,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="roke-section-services">
        <div style={{ maxWidth: 1296, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--roke-text-dim)", fontSize: 14 }}>
            Error al cargar los servicios: {error.message}
          </p>
        </div>
      </section>
    );
  }

  const mainServices: ServiceItem[] =
    data?.filter((s: ServiceItem) => s.type === "main") || [];

  return (
    <section className="roke-section-services">
      <div style={{ maxWidth: 1296, margin: "0 auto" }}>

        {/* ── Section header ── */}
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
              <span>02 / SERVICIOS</span>
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
              Lo que{" "}
              <span
                style={{
                  color: "var(--roke-text-dim)",
                  fontWeight: 500,
                }}
              >
                hacemos.
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
            Cuatro líneas de servicio, una sola obsesión: que tu infraestructura
            corra como debe. Diseñamos, desplegamos y monitoreamos. Tú decides
            hasta dónde llegamos.
          </p>
        </motion.header>

        {/* ── Services grid ── */}
        <div className="roke-services-grid">
          {mainServices.map((service, index) => {
            const Icon = iconMap[service.iconName] || SvgDefault;
            const linkLabel = linkLabels[service.iconName] || "Saber más";
            return (
              <motion.article
                key={service.id || service.title}
                className="mi-sheen mi-glow"
                initial={{ opacity: 0, y: 44, scale: 0.96, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.25 }}
                style={{
                  padding: "36px 36px 32px",
                  border: "1px solid var(--roke-border-strong)",
                  margin: -1,
                  background: "var(--roke-surface)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  transition: "background 0.18s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--roke-surface-2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--roke-surface)")
                }
              >
                {/* Head row: icon LEFT, num RIGHT */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="roke-icon-box"
                    style={{
                      width: 56,
                      height: 56,
                      display: "grid",
                      placeItems: "center",
                      color: "var(--roke-text)",
                      border: "1px solid var(--roke-border-strong)",
                      borderRadius: 6,
                      background: "var(--roke-bg)",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Icon />
                  </div>

                  {/* Number */}
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--roke-text-dimmer)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    / 0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--roke-text)",
                    margin: 0,
                    lineHeight: 1.05,
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "var(--roke-text-dim)",
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>

                {/* Tags */}
                {service.features && service.features.length > 0 && (
                  <ul
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      listStyle: "none",
                      margin: "8px 0 0",
                      padding: 0,
                    }}
                  >
                    {service.features.slice(0, 5).map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: 11,
                          padding: "4px 10px",
                          border: "1px solid var(--roke-border-strong)",
                          color: "var(--roke-text-dim)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Link */}
                <Link
                  to={`${ROUTES.SERVICES}${service.slug ? `#${service.slug}` : ""}`}
                  className="mi-arrow"
                  style={{
                    marginTop: "auto",
                    paddingTop: 16,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--roke-text)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    borderTop: "1px solid var(--roke-border)",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--roke-text-dim)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--roke-text)")
                  }
                >
                  {linkLabel}
                  <ArrowRight
                    style={{ width: 14, height: 14, transition: "transform 0.18s ease" }}
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
