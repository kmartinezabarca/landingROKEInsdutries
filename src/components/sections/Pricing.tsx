import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { AlertCircle } from "lucide-react";
import TiltArticle from "../common/TiltArticle";
import { PlanGridSkeleton } from "../common/Skeletons";
import { ROUTES } from "../../utils/constants/config";
import { useServicePlans } from "../../hooks/useServicePlans";
import { useBillingCycles } from "../../hooks/useBillingCycles";
import { useCheckout } from "../../contexts/CheckoutContext";
import { useCategories } from "../../hooks/useCategories";
import {
  getAvailableCategories,
  getPlanPrice,
  getPlansForCategory,
  sortPlanFeatures,
} from "../../utils/serviceCatalog";

interface EnterprisePlan {
  name: string;
  price: string;
  period: string;
  description: string;
}

const Pricing: React.FC = () => {
  const { data: categories } = useCategories();
  const { data: servicePlans, isLoading, isError } = useServicePlans();
  const { data: billingCycles } = useBillingCycles();
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [activeBillingCycleSlug, setActiveBillingCycleSlug] = useState<string>("monthly");
  const { openCheckout } = useCheckout();

  const availableCategories = useMemo(
    () => getAvailableCategories(categories, servicePlans),
    [categories, servicePlans]
  );

  useEffect(() => {
    if (!availableCategories.length) return;
    const hasSelected = availableCategories.some((c) => c.slug === activeCategorySlug);
    if (!hasSelected) setActiveCategorySlug(availableCategories[0].slug || null);
  }, [availableCategories, activeCategorySlug]);

  const currentCategory = useMemo(
    () => availableCategories.find((c) => c.slug === activeCategorySlug),
    [availableCategories, activeCategorySlug]
  );

  const filteredPlans = useMemo(
    () => getPlansForCategory(servicePlans, activeCategorySlug),
    [servicePlans, activeCategorySlug]
  );

  const availableBillingCycles = useMemo(() => {
    if (!billingCycles?.length) return [];
    const slugs = new Set(
      filteredPlans.flatMap((p) =>
        (p.pricing || []).map((e: any) => e.billingCycle?.slug || e.billing_cycle?.slug)
      )
    );
    return billingCycles
      .filter((c: any) => c.is_active !== false && (slugs.size === 0 || slugs.has(c.slug)))
      .sort((a: any, b: any) => (Number(a.sort_order ?? 999)) - (Number(b.sort_order ?? 999)));
  }, [billingCycles, filteredPlans]);

  useEffect(() => {
    if (!availableBillingCycles.length) return;
    const hasSelected = availableBillingCycles.some((c: any) => c.slug === activeBillingCycleSlug);
    if (!hasSelected) {
      const preferred =
        availableBillingCycles.find((c: any) => c.slug === "monthly") ||
        availableBillingCycles[0];
      setActiveBillingCycleSlug(preferred.slug);
    }
  }, [availableBillingCycles, activeBillingCycleSlug]);

  const currentBillingCycle = useMemo(
    () => availableBillingCycles.find((c: any) => c.slug === activeBillingCycleSlug),
    [availableBillingCycles, activeBillingCycleSlug]
  );

  const enterprisePlans: EnterprisePlan[] = [
    { name: "Automatización Empresarial", price: "2,999", period: "MXN", description: "Implementación inicial desde este monto" },
    { name: "Landing Pages Profesionales", price: "4,999", period: "MXN", description: "Diseño y desarrollo listos para vender" },
    { name: "Soluciones IA Personalizadas", price: "Consultar", period: "según alcance", description: "Cotización a medida para tu operación" },
  ];

  if (isLoading) {
    return (
      <section className="roke-section-services">
        <div className="max-w-[1296px] mx-auto">
          <div className="roke-eyebrow mb-8">
            <span className="roke-eyebrow-line" />
            <span>Cargando planes…</span>
          </div>
          <PlanGridSkeleton count={3} />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="roke-section-services">
        <div className="max-w-[1296px] mx-auto flex justify-center">
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
    );
  }

  return (
    <section className="roke-section-services relative">
      <div className="max-w-[1296px] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end mb-16"
        >
          <div>
            <div className="roke-eyebrow">
              <span className="roke-eyebrow-line" />
              <span>05 / PLANES</span>
            </div>
            <h2
              className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-foreground m-0"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Precios{" "}
              <span className="text-muted-foreground font-medium">claros.</span>
            </h2>
          </div>
          <div>
            <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] pb-1.5">
              {currentCategory?.name
                ? `Planes de ${currentCategory.name}. Escala cuando lo necesites.`
                : "Planes disponibles. Escala cuando lo necesites."}
            </p>

            {/* Category tabs */}
            {availableCategories.length > 1 && (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {availableCategories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setActiveCategorySlug(category.slug || null)}
                    className={`px-4 py-2 font-sans text-[11px] border transition-colors rounded-[4px] ${
                      activeCategorySlug === category.slug
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}

            {/* Billing cycle tabs */}
            {availableBillingCycles.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {availableBillingCycles.map((cycle: any) => (
                  <button
                    key={cycle.id}
                    onClick={() => setActiveBillingCycleSlug(cycle.slug)}
                    className={`px-4 py-2 font-sans text-[11px] border transition-colors rounded-[4px] ${
                      activeBillingCycleSlug === cycle.slug
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                    }`}
                  >
                    {cycle.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Plans grid */}
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 border border-border mb-20">
            {filteredPlans.map((plan: any, index: number) => {
              const isFeatured = plan.isPopular;
              return (
                <motion.div
                  key={plan.id || plan.name}
                  initial={{ opacity: 0, y: 40, scale: isFeatured ? 0.97 : 0.99 }}
                  whileInView={{ opacity: 1, y: 0, scale: isFeatured ? 1.03 : 1 }}
                  whileHover={{
                    y: isFeatured ? -6 : -4,
                    scale: isFeatured ? 1.05 : 1.01,
                    boxShadow: isFeatured
                      ? "0 40px 80px -20px rgba(0,0,0,0.45)"
                      : "0 16px 40px -12px rgba(0,0,0,0.12)",
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  className={`mi-sheen relative p-9 border border-border -m-[1px] flex flex-col gap-[18px] cursor-pointer ${
                    isFeatured
                      ? "bg-foreground text-background z-10 md:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
                      : "bg-card hover:bg-muted/30"
                  }`}
                  style={{ transition: "background-color 0.2s ease" }}
                >
                  {/* Popular badge */}
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

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-sans text-[48px] font-bold tracking-[-0.035em] leading-none ${isFeatured ? "text-background" : "text-foreground"}`}>
                      ${getPlanPrice(plan, currentBillingCycle).toFixed(0)}
                    </span>
                    <span className={`font-sans text-[13px] ${isFeatured ? "text-background/60" : "text-muted-foreground"}`}>
                      /{currentBillingCycle?.name?.toLowerCase() || "mes"}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className={`list-none m-0 p-0 pt-4 border-t flex flex-col gap-2.5 flex-grow ${isFeatured ? "border-background/10" : "border-border"}`}>
                    {sortPlanFeatures(plan.features).map((feature: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13.5px]">
                        <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isFeatured ? "text-background" : "text-foreground"}`} />
                        <span className={isFeatured ? "text-background/70" : "text-muted-foreground"}>
                          {typeof feature === "string" ? feature : feature.feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    onClick={() => openCheckout(plan, currentBillingCycle as any)}
                    whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`mi-sheen mt-auto w-full py-3.5 font-semibold text-[13.5px] rounded-[4px] cursor-pointer border transition-opacity hover:opacity-90 ${
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
          <div className="border border-dashed border-border bg-muted/30 p-10 text-center mb-20 rounded-[4px]">
            <p className="text-[17px] text-foreground mb-2">No hay planes activos en este momento.</p>
            <p className="text-muted-foreground text-[14px]">
              Puedes solicitar una cotización personalizada para infraestructura, IA o desarrollo.
            </p>
          </div>
        )}

        {/* Enterprise plans */}
        <div>
          <div className="roke-eyebrow mb-8">
            <span className="roke-eyebrow-line" />
            <span>Servicios Empresariales</span>
          </div>

          <div className="roke-3col-grid">
            {enterprisePlans.map((plan, index) => (
              <TiltArticle
                key={plan.name}
                index={index}
                className="mi-sheen"
                style={{
                  padding: "36px 36px 32px",
                  border: "1px solid var(--roke-border-strong)",
                  margin: -1,
                  background: "var(--roke-surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  cursor: "default",
                  transition: "background 0.18s ease",
                }}
              >
                {/* Head: number top-right */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--roke-text-dimmer)",
                    letterSpacing: "0.14em",
                  }}>
                    / 0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h4 style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--roke-text)",
                  margin: 0,
                  lineHeight: 1.1,
                }}>
                  {plan.name}
                </h4>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                  <span style={{
                    fontFamily: '"Montserrat", system-ui, sans-serif',
                    fontSize: 40,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--roke-text)",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {plan.price}
                  </span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--roke-text-dimmer)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "var(--roke-text-dim)",
                  margin: 0,
                  paddingTop: 12,
                  borderTop: "1px solid var(--roke-border)",
                }}>
                  {plan.description}
                </p>
              </TiltArticle>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground text-[15px] mb-6">
              ¿Necesitas una solución personalizada? Hablemos de tu proyecto.
            </p>
            <Button size="lg" asChild className="mi-sheen rounded-[4px] font-semibold">
              <Link to={ROUTES.CONTACT} className="mi-arrow flex items-center gap-2">
                Solicitar Cotización
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
