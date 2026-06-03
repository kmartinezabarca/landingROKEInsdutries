import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle, Mail, AlertCircle } from "lucide-react";
import { useServiceCatalog } from "@/hooks/useServiceCatalog";
import { serviceLines, consultingServices, labsServices } from "@/pages/services/serviceData";
import { useCheckout } from "@/contexts/CheckoutContext";
import {
  getPlanPrice,
  sortPlanFeatures,
} from "@/utils/serviceCatalog";
import { CONFIG, ROUTES } from "@/utils/constants/config";
import WhatsAppService from "@/services/whatsapp/whatsappService";
import { PlanGridSkeleton } from "@/components/common/Skeletons";
import { useSeo } from "@/components/common/Seo";

/* ══════════════════════════════════════════════════════
   ServicesPage
══════════════════════════════════════════════════════ */
const ServicesPage: React.FC = () => {
  useSeo({
    title: "Servicios",
    description: "Infraestructura y hosting, game servers, desarrollo & consultoría y ROKE Labs (hardware/IoT). Soluciones tecnológicas para empresas.",
    path: "/services",
  });
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

  /* Scroll to plans + select matching category */
  const handleServiceCTA = (keyword: string | null) => {
    if (keyword) {
      const matched = availableCategories.find(
        (c) =>
          c.slug?.toLowerCase().includes(keyword) ||
          c.name?.toLowerCase().includes(keyword)
      );
      if (matched) setActiveCategorySlug(matched.slug || null);
    }
    setTimeout(() => {
      document.getElementById("planes")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* Dynamic grid cols based on plan count */
  const planGridCols = (count: number) => {
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-3";
    if (count === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

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
          className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center"
        >
          <div>
            <div className="roke-eyebrow mb-6">
              <span className="roke-eyebrow-line" />
              <span>SERVICIOS</span>
            </div>
            <h1
              className="font-sans font-bold leading-[0.95] tracking-[-0.04em] m-0 mb-5"
              style={{ fontSize: "clamp(48px, 6.5vw, 76px)", color: "var(--roke-text)" }}
            >
              Cuatro líneas.<br />
              <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>Un equipo.</span>
            </h1>
            <p
              className="text-[17px] leading-[1.5] m-0 max-w-[460px]"
              style={{ color: "var(--roke-text-dim)" }}
            >
              Infraestructura, gaming, desarrollo y hardware. Todo bajo el mismo SLA,
              el mismo equipo y el mismo canal de soporte.
            </p>
          </div>

          {/* Index de las 4 líneas */}
          <div className="grid grid-cols-2 gap-px border border-border overflow-hidden" style={{ background: "var(--roke-border-strong)" }}>
            {serviceLines.map((s, i) => (
              <motion.button
                key={s.num}
                type="button"
                onClick={() => handleServiceCTA(s.scrollToPlans ? s.categoryKeyword : null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="flex flex-col justify-between p-5 text-left transition-colors cursor-pointer"
                style={{ background: "var(--roke-surface)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-surface-2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-surface)")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div style={{ color: "var(--roke-text)" }}><s.Icon /></div>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)", letterSpacing: "0.14em" }}>
                    / {s.num}
                  </span>
                </div>
                <span className="font-sans font-semibold leading-tight text-left" style={{ fontSize: 14, color: "var(--roke-text)" }}>
                  {s.title}
                </span>
              </motion.button>
            ))}
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
              <span>Cargando servicios…</span>
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
                No pudimos cargar los servicios
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

      {/* ════ HERO ════ */}
      {hero}

      {/* ════ LÍNEAS DE SERVICIO ════ */}
      <section className="border-b border-border" style={{ background: "var(--roke-surface)" }}>
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          {serviceLines.map((s) => (
            <motion.div
              key={s.num}
              id={`linea-${s.num}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-8 items-start py-14 border-b border-border last:border-b-0"
            >
              {/* Number + icon */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-5 md:pt-1">
                <span
                  className="font-sans font-bold leading-none tracking-[-0.04em]"
                  style={{ fontSize: 52, color: "var(--roke-text)", fontVariantNumeric: "tabular-nums" }}
                >
                  {s.num}
                </span>
                <div style={{ width: 44, height: 44, border: "1px solid var(--roke-border-strong)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--roke-text)" }}>
                  <s.Icon />
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="font-sans font-bold leading-tight tracking-[-0.025em] m-0 mb-1" style={{ fontSize: 26, color: "var(--roke-text)" }}>
                  {s.title}
                </h2>
                <p className="mb-4" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)", letterSpacing: "0.1em" }}>
                  {s.subtitle}
                </p>
                <p className="text-[15px] leading-[1.6] mb-6 max-w-[560px]" style={{ color: "var(--roke-text-dim)" }}>
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--roke-text-dimmer)", border: "1px solid var(--roke-border-strong)", background: "var(--roke-bg)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="md:pt-1">
                {s.scrollToPlans ? (
                  <motion.button
                    type="button"
                    onClick={() => handleServiceCTA(s.categoryKeyword)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-[13px] rounded-[4px] border transition-all whitespace-nowrap cursor-pointer"
                    style={{ borderColor: "var(--roke-border-strong)", color: "var(--roke-text)", background: "transparent" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-bg)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                ) : (
                  <motion.a
                    href={s.href ?? ROUTES.CONTACT}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-[13px] rounded-[4px] border transition-all whitespace-nowrap"
                    style={{ borderColor: "var(--roke-border-strong)", color: "var(--roke-text)", background: "transparent" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-bg)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ PLANES ════ */}
      <section id="planes" className="roke-section-services" style={{ background: "var(--roke-bg)" }}>
        <div className="max-w-[1296px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <div className="roke-eyebrow">
                <span className="roke-eyebrow-line" />
                <span>PLANES ACTIVOS</span>
              </div>
              <h2
                className="font-sans font-bold leading-[0.97] tracking-[-0.035em] m-0"
                style={{ fontSize: "clamp(36px, 4.5vw, 52px)", color: "var(--roke-text)" }}
              >
                {currentCategory?.name ?? "Elige tu plan"}
              </h2>
            </div>

            <div className="flex flex-col gap-2.5 sm:items-end">
              {availableBillingCycles.length > 0 && (
                <div className="flex gap-px border border-border overflow-hidden" style={{ background: "var(--roke-border-strong)" }}>
                  {availableBillingCycles.map((cycle: any) => (
                    <button
                      key={cycle.id}
                      onClick={() => setActiveBillingCycleSlug(cycle.slug)}
                      className="px-5 py-2.5 font-sans text-[12px] font-medium transition-colors cursor-pointer"
                      style={{
                        background: activeBillingCycleSlug === cycle.slug ? "var(--roke-primary-bg)" : "var(--roke-surface)",
                        color: activeBillingCycleSlug === cycle.slug ? "var(--roke-primary-fg)" : "var(--roke-text-dimmer)",
                      }}
                    >
                      {cycle.name}
                    </button>
                  ))}
                </div>
              )}

              {availableCategories.length > 1 && (
                <div className="flex flex-wrap gap-1.5 justify-end">
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
          </div>

          {filteredPlans.length > 0 ? (
            <div className={`grid border border-border ${planGridCols(filteredPlans.length)}`}>
              {filteredPlans.map((plan: any, index: number) => {
                const isFeatured = plan.isPopular;
                /* For 4-col layouts, scale effect only on featured */
                const featuredScale = filteredPlans.length <= 3 && isFeatured;
                return (
                  <motion.div
                    key={plan.id || plan.name}
                    initial={{ opacity: 0, y: 32, scale: featuredScale ? 0.97 : 0.99 }}
                    whileInView={{ opacity: 1, y: 0, scale: featuredScale ? 1.03 : 1 }}
                    whileHover={{
                      y: isFeatured ? -6 : -4,
                      scale: featuredScale ? 1.05 : 1.01,
                      boxShadow: isFeatured
                        ? "0 40px 80px -20px rgba(0,0,0,0.45)"
                        : "0 16px 40px -12px rgba(0,0,0,0.12)",
                      transition: { duration: 0.22, ease: "easeOut" },
                    }}
                    transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.1 }}
                    className={`relative p-8 border border-border -m-[1px] flex flex-col gap-4 cursor-pointer ${
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
                      <h3 className={`font-sans font-bold tracking-[-0.01em] m-0 ${filteredPlans.length >= 4 ? "text-[18px]" : "text-[22px]"} ${isFeatured ? "text-background" : "text-foreground"}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-[13px] mt-1.5 leading-[1.4] ${isFeatured ? "text-background/60" : "text-muted-foreground"}`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-sans font-bold tracking-[-0.035em] leading-none ${filteredPlans.length >= 4 ? "text-[38px]" : "text-[48px]"} ${isFeatured ? "text-background" : "text-foreground"}`}>
                        ${getPlanPrice(plan, currentBillingCycle).toFixed(0)}
                      </span>
                      <span className={`font-sans text-[13px] ${isFeatured ? "text-background/60" : "text-muted-foreground"}`}>
                        /{currentBillingCycle?.name?.toLowerCase() || "mes"}
                      </span>
                    </div>

                    <ul className={`list-none m-0 p-0 pt-3 border-t flex flex-col gap-2 flex-grow ${isFeatured ? "border-background/10" : "border-border"}`}>
                      {sortPlanFeatures(plan.features).map((feature: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px]">
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
                      className={`mt-auto w-full py-3 font-semibold text-[13px] rounded-[4px] cursor-pointer border hover:opacity-90 ${
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
              <p className="text-muted-foreground text-[14px]">Selecciona otra categoría o solicita una cotización personalizada.</p>
            </div>
          )}

          <p className="text-[11px] text-center mt-5" style={{ color: "var(--roke-text-dimmer)", fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.06em" }}>
            Precios en MXN · IVA no incluido
          </p>
        </div>
      </section>

      {/* ════ CONSULTORÍA — lista horizontal ════ */}
      <section className="roke-section-services border-t border-border" style={{ background: "var(--roke-surface)" }}>
        <div className="max-w-[1296px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end mb-14"
          >
            <div>
              <div className="roke-eyebrow">
                <span className="roke-eyebrow-line" />
                <span>CONSULTORÍA</span>
              </div>
              <h2
                className="font-sans font-bold leading-[0.97] tracking-[-0.035em] m-0"
                style={{ fontSize: "clamp(36px, 4.5vw, 52px)", color: "var(--roke-text)" }}
              >
                A la medida.<br />
                <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>Sin plantillas.</span>
              </h2>
            </div>
            <p className="text-[16px] leading-[1.6] max-w-[520px] self-end m-0" style={{ color: "var(--roke-text-dim)" }}>
              Proyectos que necesitan más que un plan estándar. Arquitectura, desarrollo,
              seguridad y soporte continuo diseñados para tu operación específica.
            </p>
          </motion.div>

          {/* Lista horizontal — sin grid con huecos */}
          <div className="border border-border divide-y divide-border">
            {consultingServices.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.06 * i }}
                className="grid grid-cols-1 md:grid-cols-[56px_1fr_2fr] gap-6 px-8 py-7 transition-colors"
                style={{ background: "var(--roke-surface)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-surface-2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-surface)")}
              >
                {/* Icon */}
                <div className="flex items-center md:justify-center" style={{ color: "var(--roke-text)" }}>
                  <s.Icon />
                </div>

                {/* Title + num */}
                <div className="flex flex-col justify-center gap-1">
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)", letterSpacing: "0.14em" }}>
                    {s.num}
                  </span>
                  <h3 className="font-sans font-bold m-0" style={{ fontSize: 16, color: "var(--roke-text)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                    {s.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="m-0 self-center" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--roke-text-dim)" }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, necesito una consultoría personalizada.")}
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[14px] rounded-[4px] cursor-pointer transition-all"
              style={{ background: "var(--roke-primary-bg)", color: "var(--roke-primary-fg)" }}
            >
              <MessageCircle className="w-4 h-4" />
              Solicitar propuesta
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ════ ROKE LABS ════ */}
      <section className="roke-section-services border-t border-border" style={{ background: "var(--roke-bg)" }}>
        <div className="max-w-[1296px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end mb-14"
          >
            <div>
              <div className="roke-eyebrow">
                <span className="roke-eyebrow-line" />
                <span>ROKE LABS</span>
              </div>
              <h2
                className="font-sans font-bold leading-[0.97] tracking-[-0.035em] m-0"
                style={{ fontSize: "clamp(36px, 4.5vw, 52px)", color: "var(--roke-text)" }}
              >
                Hardware.<br />
                <span style={{ color: "var(--roke-text-dim)", fontWeight: 500 }}>Del diseño al objeto.</span>
              </h2>
            </div>
            <p className="text-[16px] leading-[1.6] max-w-[520px] self-end m-0" style={{ color: "var(--roke-text-dim)" }}>
              Prototipado rápido de PCBs, impresión 3D y consultoría en mecatrónica e IoT
              para equipos que construyen productos físicos.
            </p>
          </motion.div>

          <div className="roke-3col-grid">
            {labsServices.map((s, i) => (
              <motion.article
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: "0 20px 48px -12px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                style={{ padding: "32px", border: "1px solid var(--roke-border-strong)", margin: -1, background: "var(--roke-surface)", display: "flex", flexDirection: "column", gap: 14, transition: "background 0.18s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-surface-2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--roke-surface)")}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ width: 40, height: 40, border: "1px solid var(--roke-border-strong)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--roke-text)" }}>
                    <s.Icon />
                  </div>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)", letterSpacing: "0.14em" }}>
                    {s.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: '"Montserrat", system-ui, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--roke-text)", margin: 0, lineHeight: 1.2 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--roke-text-dim)", margin: 0, paddingTop: 12, borderTop: "1px solid var(--roke-border)" }}>
                  {s.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA FINAL ════ */}
      <section className="border-t border-border" style={{ background: "var(--roke-surface)", padding: "64px 0" }}>
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-border bg-card p-8 md:p-12"
          >
            <div className="max-w-[540px]">
              <p className="mb-2" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--roke-text-dimmer)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                ¿No sabes por dónde empezar?
              </p>
              <h3 className="font-sans font-bold leading-[1.05] tracking-[-0.025em] m-0" style={{ fontSize: 28, color: "var(--roke-text)" }}>
                Cuéntanos qué necesitas. Te ayudamos a elegir la línea correcta.
              </h3>
            </div>
            <div className="flex flex-col gap-2.5 flex-shrink-0">
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => WhatsAppService.openWhatsApp("Hola ROKE Industries, quiero hablar con un experto sobre sus servicios.")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-[14px] rounded-[4px] cursor-pointer transition-all"
                style={{ background: "var(--roke-primary-bg)", color: "var(--roke-primary-fg)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Hablar con un experto
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

export default ServicesPage;
