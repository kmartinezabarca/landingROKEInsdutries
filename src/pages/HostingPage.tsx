import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, MessageCircle, Mail, ChevronDown, AlertCircle } from "lucide-react";
import { useServiceCatalog } from "@/hooks/useServiceCatalog";
import { useCheckout } from "@/contexts/CheckoutContext";
import {
  getPlanPrice,
  sortPlanFeatures,
} from "@/utils/serviceCatalog";
import { CONFIG } from "@/utils/constants/config";
import WhatsAppService from "@/services/whatsapp/whatsappService";
import { PlanGridSkeleton } from "@/components/common/Skeletons";
import { useSeo } from "@/components/common/Seo";

/* ── FAQ data ────────────────────────────────────────── */
const faqs = [
  {
    q: "¿Cuánto tarda en estar listo mi servidor?",
    a: "La mayoría de los servidores están operativos en menos de 4 horas. El tiempo máximo garantizado es 24 horas desde la confirmación de pago. Recibirás credenciales de acceso por email y WhatsApp.",
  },
  {
    q: "¿Puedo migrar mi sitio o aplicación desde otro proveedor?",
    a: "Sí. Incluimos asistencia de migración sin costo en los planes Pro y Premium. Para el plan Starter, ofrecemos una guía paso a paso y soporte por WhatsApp durante el proceso.",
  },
  {
    q: "¿Qué pasa si necesito más recursos de los contratados?",
    a: "Puedes escalar tu plan en cualquier momento desde tu panel de control. El cambio se aplica en minutos sin downtime. Solo pagas la diferencia proporcional al mes en curso.",
  },
  {
    q: "¿Están incluidos los backups?",
    a: "Los planes Pro y Premium incluyen backups automáticos diarios con retención de 7 días. El plan Starter incluye la herramienta para hacer backups manuales en cualquier momento.",
  },
  {
    q: "¿Qué SLA ofrecen y cómo se aplica?",
    a: "Garantizamos 99.9% de uptime mensual. Si no cumplimos, recibes crédito automático proporcional al tiempo de inactividad directamente en tu próxima factura, sin tener que solicitarlo.",
  },
  {
    q: "¿El soporte 24/7 es real o es un bot?",
    a: "Es soporte humano real. Nuestro equipo técnico en español atiende por WhatsApp con un tiempo de respuesta promedio de 12 minutos. No usamos chatbots de primer nivel.",
  },
];

/* ══════════════════════════════════════════════════════
   HostingPage
══════════════════════════════════════════════════════ */
const HostingPage: React.FC = () => {
  useSeo({
    title: "Hosting y Servidores",
    description: "Web hosting, VPS administrados y game servers con uptime 99.9%, panel de control y soporte humano en español. Planes desde $99 MXN/mes.",
    path: "/hosting",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openCheckout } = useCheckout();
  const {
    isLoading,
    isError,
    activeCategorySlug,
    setActiveCategorySlug,
    activeBillingCycleSlug,
    setActiveBillingCycleSlug,
    availableCategories,
    filteredPlans,
    availableBillingCycles,
    currentBillingCycle,
    currentCategory,
  } = useServiceCatalog();

  /* Hero reutilizable (se muestra también en carga y error) */
  const hero = (
    <section
      className="relative overflow-hidden border-b border-border"
      style={{ background: "var(--roke-bg)", paddingTop: 72, paddingBottom: 72 }}
    >
      <div className="roke-grid-bg" />
      <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="roke-eyebrow mb-6">
            <span className="roke-eyebrow-line" />
            <span>PLANES Y PRECIOS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <h1
                className="font-sans font-bold leading-[0.95] tracking-[-0.04em] m-0 mb-5"
                style={{ fontSize: "clamp(48px, 6.5vw, 76px)", color: "var(--roke-text)" }}
              >
                Infraestructura<br />
                <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>lista en horas.</span>
              </h1>
              <p
                className="text-[17px] leading-[1.5] m-0 mb-7 max-w-[460px]"
                style={{ color: "var(--roke-text-dim)" }}
              >
                Elige el plan que se ajuste a tu proyecto. Sin contratos de permanencia,
                sin costos ocultos, con soporte humano en español 24/7.
              </p>

              <motion.button
                whileHover={{ y: -2, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[14px] rounded-[4px] cursor-pointer transition-all"
                style={{ background: "var(--roke-primary-bg)", color: "var(--roke-primary-fg)" }}
              >
                Ver todos los planes
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Mini stats — 4 en grid 2×2, compactos */}
            <div className="grid grid-cols-2 gap-px border border-border overflow-hidden">
              {[
                { value: "99.9%",  label: "Uptime SLA" },
                { value: "< 24h",  label: "Tiempo de despliegue" },
                { value: "42 ms",  label: "Latencia promedio" },
                { value: "24 / 7", label: "Soporte en español" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="flex flex-col justify-center px-6 py-7"
                  style={{ background: "var(--roke-surface)" }}
                >
                  <div
                    className="font-sans font-bold tracking-[-0.03em] leading-none mb-1.5"
                    style={{ fontSize: 28, color: "var(--roke-text)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "var(--roke-text-dimmer)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <div>
        {hero}
        <section className="roke-section-services" style={{ background: "var(--roke-bg)" }}>
          <div className="max-w-[1296px] mx-auto px-6 md:px-14">
            <div className="roke-eyebrow mb-8">
              <span className="roke-eyebrow-line" />
              <span>Cargando planes…</span>
            </div>
            <PlanGridSkeleton count={3} />
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        {hero}
        <section className="roke-section-services" style={{ background: "var(--roke-bg)" }}>
          <div className="max-w-[1296px] mx-auto px-6 md:px-14 flex justify-center">
            <div
              className="w-full max-w-[520px] p-10 flex flex-col items-center text-center gap-4 rounded-[4px]"
              style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="font-semibold text-[16px]" style={{ color: "var(--roke-text)" }}>
                No pudimos cargar los planes
              </p>
              <p className="text-[14px] leading-[1.5]" style={{ color: "var(--roke-text-dim)" }}>
                Ocurrió un error al obtener la información. Por favor, intenta de nuevo en unos momentos.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-5 py-2.5 font-semibold text-[13px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "var(--roke-primary-bg)", color: "var(--roke-primary-fg)" }}
              >
                Reintentar
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>

      {/* ════ HERO — compacto, específico ════ */}
      {hero}

      {/* ════ PLANES — protagonista ════ */}
      <section id="planes" className="roke-section-services" style={{ background: "var(--roke-bg)" }}>
        <div className="max-w-[1296px] mx-auto">

          {/* Header + controles */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-6">
              <div>
                <div className="roke-eyebrow">
                  <span className="roke-eyebrow-line" />
                  <span>PLANES DISPONIBLES</span>
                </div>
                <h2
                  className="font-sans font-bold leading-[0.97] tracking-[-0.035em] m-0"
                  style={{ fontSize: "clamp(36px, 4.5vw, 52px)", color: "var(--roke-text)" }}
                >
                  {currentCategory?.name
                    ? `${currentCategory.name}`
                    : "Elige tu plan"}
                </h2>
              </div>

              {/* Billing cycle toggle */}
              {availableBillingCycles.length > 0 && (
                <div
                  className="flex gap-px border border-border overflow-hidden self-start sm:self-end"
                  style={{ background: "var(--roke-border-strong)" }}
                >
                  {availableBillingCycles.map((cycle: any) => (
                    <button
                      key={cycle.id}
                      onClick={() => setActiveBillingCycleSlug(cycle.slug)}
                      className="px-5 py-2.5 font-sans text-[12px] font-medium transition-colors cursor-pointer"
                      style={{
                        background: activeBillingCycleSlug === cycle.slug
                          ? "var(--roke-primary-bg)"
                          : "var(--roke-surface)",
                        color: activeBillingCycleSlug === cycle.slug
                          ? "var(--roke-primary-fg)"
                          : "var(--roke-text-dimmer)",
                      }}
                    >
                      {cycle.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category tabs */}
            {availableCategories.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                {availableCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategorySlug(cat.slug || null)}
                    className="px-4 py-2 font-sans text-[11px] border transition-colors rounded-[4px] cursor-pointer"
                    style={{
                      background: activeCategorySlug === cat.slug ? "var(--roke-primary-bg)" : "transparent",
                      color: activeCategorySlug === cat.slug ? "var(--roke-primary-fg)" : "var(--roke-text-dimmer)",
                      borderColor: activeCategorySlug === cat.slug ? "var(--roke-primary-bg)" : "var(--roke-border-strong)",
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plan cards */}
          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
              {filteredPlans.map((plan: any, index: number) => {
                const isFeatured = plan.isPopular;
                return (
                  <motion.div
                    key={plan.id || plan.name}
                    initial={{ opacity: 0, y: 36, scale: isFeatured ? 0.97 : 0.99 }}
                    whileInView={{ opacity: 1, y: 0, scale: isFeatured ? 1.03 : 1 }}
                    whileHover={{
                      y: isFeatured ? -6 : -4,
                      scale: isFeatured ? 1.05 : 1.01,
                      boxShadow: isFeatured
                        ? "0 40px 80px -20px rgba(0,0,0,0.45)"
                        : "0 16px 40px -12px rgba(0,0,0,0.12)",
                      transition: { duration: 0.22, ease: "easeOut" },
                    }}
                    transition={{ duration: 0.55, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.15 }}
                    className={`relative p-9 border border-border -m-[1px] flex flex-col gap-[18px] cursor-pointer ${
                      isFeatured
                        ? "bg-foreground text-background z-10 md:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
                        : "bg-card hover:bg-muted/30"
                    }`}
                    style={{ transition: "background-color 0.2s ease" }}
                  >
                    {isFeatured && (
                      <div className="absolute top-4 right-4 font-sans text-[10px] tracking-[0.12em] px-2.5 py-1 bg-background text-foreground">
                        POPULAR
                      </div>
                    )}

                    <div>
                      <h3 className={`font-sans text-[22px] font-bold tracking-[-0.01em] m-0 ${isFeatured ? "text-background" : "text-foreground"}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-[13.5px] mt-1.5 leading-[1.4] ${isFeatured ? "text-background/60" : "text-muted-foreground"}`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-sans text-[48px] font-bold tracking-[-0.035em] leading-none ${isFeatured ? "text-background" : "text-foreground"}`}>
                        ${getPlanPrice(plan, currentBillingCycle).toFixed(0)}
                      </span>
                      <span className={`font-sans text-[13px] ${isFeatured ? "text-background/60" : "text-muted-foreground"}`}>
                        /{currentBillingCycle?.name?.toLowerCase() || "mes"}
                      </span>
                    </div>

                    {/* Specs chips if available */}
                    {plan.specifications && Object.keys(plan.specifications).length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 py-3 border-t border-b ${isFeatured ? "border-background/10" : "border-border"}`}>
                        {plan.specifications.ram && (
                          <span
                            className="px-2.5 py-1 text-[10px] tracking-[0.1em]"
                            style={{
                              fontFamily: '"JetBrains Mono", monospace',
                              background: isFeatured ? "rgba(255,255,255,0.12)" : "var(--roke-surface-2)",
                              color: isFeatured ? "rgba(255,255,255,0.75)" : "var(--roke-text-dim)",
                              border: `1px solid ${isFeatured ? "rgba(255,255,255,0.15)" : "var(--roke-border-strong)"}`,
                            }}
                          >
                            {plan.specifications.ram} RAM
                          </span>
                        )}
                        {plan.specifications.cpu && (
                          <span
                            className="px-2.5 py-1 text-[10px] tracking-[0.1em]"
                            style={{
                              fontFamily: '"JetBrains Mono", monospace',
                              background: isFeatured ? "rgba(255,255,255,0.12)" : "var(--roke-surface-2)",
                              color: isFeatured ? "rgba(255,255,255,0.75)" : "var(--roke-text-dim)",
                              border: `1px solid ${isFeatured ? "rgba(255,255,255,0.15)" : "var(--roke-border-strong)"}`,
                            }}
                          >
                            {plan.specifications.cpu} CPU
                          </span>
                        )}
                        {plan.specifications.storage && (
                          <span
                            className="px-2.5 py-1 text-[10px] tracking-[0.1em]"
                            style={{
                              fontFamily: '"JetBrains Mono", monospace',
                              background: isFeatured ? "rgba(255,255,255,0.12)" : "var(--roke-surface-2)",
                              color: isFeatured ? "rgba(255,255,255,0.75)" : "var(--roke-text-dim)",
                              border: `1px solid ${isFeatured ? "rgba(255,255,255,0.15)" : "var(--roke-border-strong)"}`,
                            }}
                          >
                            {plan.specifications.storage}
                          </span>
                        )}
                        {(plan.specifications.players || plan.specifications.slots) && (
                          <span
                            className="px-2.5 py-1 text-[10px] tracking-[0.1em]"
                            style={{
                              fontFamily: '"JetBrains Mono", monospace',
                              background: isFeatured ? "rgba(255,255,255,0.12)" : "var(--roke-surface-2)",
                              color: isFeatured ? "rgba(255,255,255,0.75)" : "var(--roke-text-dim)",
                              border: `1px solid ${isFeatured ? "rgba(255,255,255,0.15)" : "var(--roke-border-strong)"}`,
                            }}
                          >
                            {plan.specifications.players || plan.specifications.slots} slots
                          </span>
                        )}
                      </div>
                    )}

                    <ul className={`list-none m-0 p-0 pt-2 flex flex-col gap-2.5 flex-grow`}>
                      {sortPlanFeatures(plan.features).map((feature: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[13.5px]">
                          <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isFeatured ? "text-background" : "text-foreground"}`} />
                          <span className={isFeatured ? "text-background/70" : "text-muted-foreground"}>
                            {typeof feature === "string" ? feature : feature.feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      onClick={() => openCheckout(plan, currentBillingCycle as any)}
                      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-auto w-full py-3.5 font-semibold text-[13.5px] rounded-[4px] cursor-pointer border transition-opacity hover:opacity-90 ${
                        isFeatured
                          ? "bg-background text-foreground border-background"
                          : "bg-foreground text-background border-foreground"
                      }`}
                    >
                      Contratar {plan.name}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-border bg-muted/30 p-10 text-center rounded-[4px]">
              <p className="text-[17px] text-foreground mb-2">No hay planes activos en este momento.</p>
              <p className="text-muted-foreground text-[14px]">
                Selecciona otra categoría o solicita una cotización personalizada.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--roke-text-dimmer)",
                letterSpacing: "0.06em",
              }}
            >
              Precios en MXN · IVA no incluido
            </p>
            <button
              onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, necesito una solución personalizada de infraestructura.")}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium transition-colors"
              style={{ color: "var(--roke-text-dimmer)", fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.06em" }}
            >
              ¿Necesitas algo a la medida? <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="roke-section-services border-t border-border" style={{ background: "var(--roke-surface)" }}>
        <div className="max-w-[1296px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-1 md:grid-cols-[0.9fr_1.5fr] gap-16 items-start"
          >
            {/* Left col: heading */}
            <div className="md:sticky md:top-24">
              <div className="roke-eyebrow">
                <span className="roke-eyebrow-line" />
                <span>FAQ</span>
              </div>
              <h2
                className="font-sans font-bold leading-[0.97] tracking-[-0.035em] m-0 mb-5"
                style={{ fontSize: "clamp(36px, 4.5vw, 52px)", color: "var(--roke-text)" }}
              >
                Preguntas<br />
                <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>frecuentes.</span>
              </h2>
              <p className="text-[15px] leading-[1.55] m-0 mb-7" style={{ color: "var(--roke-text-dim)" }}>
                Si tienes una duda que no está aquí, escríbenos por WhatsApp.
                Respondemos en minutos.
              </p>
              <button
                onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, tengo una pregunta sobre sus planes de hosting.")}
                className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-[13px] rounded-[4px] border transition-all hover:bg-muted/30 cursor-pointer"
                style={{ borderColor: "var(--roke-border-strong)", color: "var(--roke-text)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Preguntar por WhatsApp
              </button>
            </div>

            {/* Right col: accordion */}
            <div className="border border-border divide-y divide-border">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-muted/30 cursor-pointer"
                    aria-expanded={openFaq === i}
                  >
                    <div className="flex gap-4">
                      <span
                        className="pt-0.5 flex-shrink-0"
                        style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)" }}
                      >
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-semibold leading-[1.35]" style={{ color: "var(--roke-text)" }}>
                        {faq.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <ChevronDown className="w-4 h-4" style={{ color: "var(--roke-text-dimmer)" }} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden border-t border-border"
                      >
                        <div className="grid grid-cols-[56px_1fr] px-6 py-5">
                          <span
                            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: "var(--roke-text-dimmer)" }}
                          >
                            ROKE
                          </span>
                          <p className="m-0 text-[14px] leading-[1.65]" style={{ color: "var(--roke-text-dim)" }}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ CTA FINAL ════ */}
      <section className="border-t border-border" style={{ background: "var(--roke-bg)", padding: "64px 0" }}>
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-border bg-card p-8 md:p-12"
          >
            <div className="max-w-[540px]">
              <p
                className="mb-2"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                ¿No encuentras lo que buscas?
              </p>
              <h3
                className="font-sans font-bold leading-[1.05] tracking-[-0.025em] m-0"
                style={{ fontSize: 28, color: "var(--roke-text)" }}
              >
                Diseñamos la infraestructura exacta que tu proyecto necesita.
              </h3>
            </div>

            <div className="flex flex-col gap-2.5 flex-shrink-0">
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, necesito una solución de infraestructura personalizada.")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-[14px] rounded-[4px] cursor-pointer transition-all"
                style={{ background: "var(--roke-primary-bg)", color: "var(--roke-primary-fg)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Hablar con un técnico
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <a
                href={`mailto:${CONFIG.CONTACT?.EMAIL || "contact@rokeindustries.com"}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-[14px] rounded-[4px] border transition-all hover:bg-muted/30"
                style={{ borderColor: "var(--roke-border-strong)", color: "var(--roke-text)" }}
              >
                <Mail className="w-4 h-4" />
                Enviar Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HostingPage;
