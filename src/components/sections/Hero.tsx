import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants/config";
import WhatsAppService from "@/services/whatsapp/whatsappService";
import TiltCard from "@/components/common/TiltCard";
import { CountUp } from "@/components/ui/scroll-motion";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const statItems = [
  { label: "UPTIME · 30D", to: 99.97, decimals: 2, unit: "%", trend: "↑ +0.04 vs prev." },
  { label: "LATENCIA · P95", to: 42, decimals: 0, unit: "ms", trend: "↓ -8ms vs prev." },
];

const serviceItems = [
  { name: "web-hosting / mx-01", status: "healthy · 28ms" },
  { name: "game-server / minecraft", status: "healthy · 41ms" },
  { name: "iot-gateway / fleet-04", status: "healthy · 12ms" },
  { name: "api / inference-ai", status: "healthy · 89ms" },
];

const BenefitZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M13 2L4.5 14h7L11 22l8.5-12h-7L13 2z" />
  </svg>
);

const BenefitShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const BenefitChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const quickBenefits = [
  { icon: BenefitZapIcon,   title: "Lanzamiento en 24h",   description: "Servidores listos en un día." },
  { icon: BenefitShieldIcon, title: "Uptime 99.9%",         description: "Infraestructura confiable y monitoreada." },
  { icon: BenefitChatIcon,  title: "Soporte Real 24 / 7",  description: "Equipo en español, sin bots." },
];

const RokeMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
    <rect x="-4" y="26" width="80" height="11" transform="rotate(-30 32 32)" fill="currentColor" opacity="0.35" />
    <g stroke="currentColor" strokeWidth="5.5" strokeLinejoin="miter" strokeLinecap="butt">
      <path d="M 12 56 L 12 8 L 46 8 L 46 22 L 28 32 L 12 32 M 28 32 L 52 56 L 12 56" />
    </g>
    <circle cx="38" cy="18" r="4.5" fill="none" stroke="currentColor" strokeWidth="3.2" />
  </svg>
);

const Hero: React.FC = () => {
  const gridStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(to right, var(--roke-border) 1px, transparent 1px), linear-gradient(to bottom, var(--roke-border) 1px, transparent 1px)",
    backgroundSize: "64px 64px",
    maskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.12) 92%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.12) 92%)",
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--roke-border-strong)] bg-[var(--roke-bg)] text-[var(--roke-text)]">
      <div className="roke-slash-bg" />
      <div className="pointer-events-none absolute inset-0" style={gridStyle} />

      {/* Escenario WebGL (red de infraestructura 3D, parallax con el cursor) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.6] dark:opacity-[0.55]">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <RokeMark className="pointer-events-none absolute bottom-[-160px] right-[-180px] hidden h-[720px] w-[720px] text-[var(--roke-text)] opacity-[0.035] dark:opacity-[0.045] lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[842px] max-w-[1440px] flex-col px-6 pt-12 lg:block lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:absolute lg:left-[68px] lg:top-[47px] lg:w-[620px]"
        >
          <div className="mb-7 flex flex-wrap items-center gap-x-3.5 gap-y-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-[var(--roke-text-dimmer)] sm:text-[10px] sm:tracking-[0.32em]">
            <div className="h-px w-8 bg-[var(--roke-text-dimmer)]" />
            <span>RKE / 01 · Soluciones empresariales</span>
            <span className="h-1.5 w-1.5 bg-[var(--roke-text)]" />
          </div>

          <h1 className="mb-7 text-[40px] font-bold leading-[0.96] tracking-[-0.035em] text-[var(--roke-text)] sm:text-[56px] md:text-[76px]">
            Infraestructura
            <br />
            digital que
            <br />
            <span className="relative inline-block">
              <span className="absolute bottom-[6px] left-[-4px] right-[-4px] h-[10px] skew-x-[-12deg] bg-[var(--roke-slash)] opacity-50 sm:bottom-[8px] sm:h-[14px]" />
              <span className="relative">impulsa</span>
            </span>
            <br />
            <span className="font-medium text-[var(--roke-text-dim)]">tu negocio.</span>
          </h1>

          <p className="mb-9 max-w-[520px] text-[17px] leading-[1.55] tracking-[-0.01em] text-[var(--roke-text-dim)]">
            Desde hosting de alta disponibilidad y servidores de videojuegos
            hasta automatización con IoT y soluciones empresariales con IA.
            Soporte real, en español, 24 / 7.
          </p>

          <div className="mb-9 flex flex-col gap-2.5 sm:flex-row">
            <Link
              to={ROUTES.HOSTING}
              className="mi-sheen mi-arrow inline-flex h-[50px] items-center justify-center gap-3 rounded-[4px] border border-[var(--roke-primary-bg)] bg-[var(--roke-primary-bg)] px-[27px] text-[14px] font-semibold text-[var(--roke-primary-fg)] transition-all hover:-translate-y-px hover:shadow-lg"
            >
              Ver Planes y Precios
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => WhatsAppService.openWhatsApp()}
              className="mi-sheen mi-icon-pop inline-flex h-[50px] items-center justify-center gap-3 rounded-[4px] border border-[var(--roke-whatsapp)] bg-[var(--roke-whatsapp)] px-[27px] text-[14px] font-semibold text-[var(--roke-whatsapp-fg)] transition-all hover:-translate-y-px hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              WhatsApp
            </button>
          </div>

          <div className="flex items-start gap-6">
            {[
              { num: "99.97%", label: "UPTIME" },
              { num: "+120", label: "PROYECTOS" },
              { num: "24 / 7", label: "SOPORTE MX" },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <div className="h-7 w-px bg-[var(--roke-border-strong)]" />}
                <div className="flex flex-col gap-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--roke-text-dimmer)]">
                  <span className="font-sans text-[16px] font-medium leading-none tracking-[-0.02em] text-[var(--roke-text)]">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 hidden lg:absolute lg:left-[767px] lg:top-[140px] lg:mt-0 lg:block lg:w-[592px]"
        >
          <TiltCard className="roke-hero-panel-wrap" max={6}>
            <div className="roke-hero-panel-slash" />
            <div className="roke-hero-panel">
              <div className="roke-hero-panel-head">
                <div className="roke-hero-panel-head-left">
                  <RokeMark className="h-4 w-4 text-[var(--roke-text)]" />
                  <span>roke.dash / overview</span>
                </div>
                <div className="roke-hero-panel-head-right">
                  <span className="roke-live-dot h-1.5 w-1.5 rounded-full bg-[var(--roke-ok)]" />
                  <span>LIVE</span>
                </div>
              </div>

              <div className="roke-hero-panel-body">
                <div className="roke-hero-panel-title">
                  <span>Infraestructura · Tiempo real</span>
                  <span>UTC -06:00</span>
                </div>

                <div className="roke-hero-stat-grid">
                  {statItems.map((stat) => (
                    <div key={stat.label} className="roke-hero-stat">
                      <div className="roke-hero-stat-label">
                        {stat.label}
                      </div>
                      <div className="roke-hero-stat-value">
                        <CountUp to={stat.to} decimals={stat.decimals} />
                        <span className="roke-hero-stat-unit">{stat.unit}</span>
                      </div>
                      <div className="roke-hero-stat-trend is-ok">
                        {stat.trend}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="roke-hero-sparkline">
                  <div className="roke-hero-sparkline-head">
                    <span className="roke-hero-sparkline-label">Requests / 24h</span>
                    <span className="roke-hero-sparkline-value">2.41M</span>
                  </div>
                  <svg viewBox="0 0 480 38" preserveAspectRatio="none" className="text-[var(--roke-text)]">
                    <motion.path
                      d="M0 28 L20 24 L40 30 L60 22 L80 26 L100 18 L120 22 L140 14 L160 18 L180 10 L200 14 L220 8 L240 12 L260 18 L280 10 L300 6 L320 14 L340 8 L360 4 L380 10 L400 14 L420 8 L440 12 L460 6 L480 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0.3 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
                    />
                  </svg>
                </div>

                <div className="roke-hero-services">
                  {serviceItems.map((svc) => (
                    <div key={svc.name} className="roke-hero-service-row">
                      <div className="roke-hero-service-left">
                        <span className="roke-hero-service-dot" />
                        {svc.name}
                      </div>
                      <span className="roke-hero-service-right">{svc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="roke-hero-benefits mt-14 grid grid-cols-1 border-t border-[var(--roke-border-strong)] md:grid-cols-3 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0"
        >
          {quickBenefits.map((benefit, index) => {
            const Icon = benefit.icon as React.FC<{ className?: string }>;
            return (
              <div
                key={benefit.title}
                className="roke-hero-benefit"
              >
                <span className="roke-hero-benefit-num">0{index + 1}</span>
                <div className="roke-hero-benefit-icon roke-icon-box">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="roke-hero-benefit-title">
                    {benefit.title}
                  </div>
                  <div className="roke-hero-benefit-desc">
                    {benefit.description}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
