import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import Button from "../common/Button";
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

  const availableCategories = useMemo(() => {
    return getAvailableCategories(categories, servicePlans);
  }, [categories, servicePlans]);

  useEffect(() => {
    if (!availableCategories.length) return;

    const hasSelectedCategory = availableCategories.some(
      (category) => category.slug === activeCategorySlug
    );

    if (!hasSelectedCategory) {
      setActiveCategorySlug(availableCategories[0].slug || null);
    }
  }, [availableCategories, activeCategorySlug]);

  const currentCategory = useMemo(() => {
    return availableCategories.find((category) => category.slug === activeCategorySlug);
  }, [availableCategories, activeCategorySlug]);

  const filteredPlans = useMemo(() => {
    return getPlansForCategory(servicePlans, activeCategorySlug);
  }, [servicePlans, activeCategorySlug]);

  const availableBillingCycles = useMemo(() => {
    if (!billingCycles?.length) return [];

    const categoryCycleSlugs = new Set(
      filteredPlans.flatMap((plan) =>
        (plan.pricing || []).map(
          (entry: any) => entry.billingCycle?.slug || entry.billing_cycle?.slug
        )
      )
    );

    const filtered = billingCycles.filter((cycle: any) => {
      if (cycle.is_active === false) return false;
      if (categoryCycleSlugs.size === 0) return true;
      return categoryCycleSlugs.has(cycle.slug);
    });

    return filtered.sort((left: any, right: any) => {
      const leftOrder = Number(left.sort_order ?? 999);
      const rightOrder = Number(right.sort_order ?? 999);
      return leftOrder - rightOrder;
    });
  }, [billingCycles, filteredPlans]);

  useEffect(() => {
    if (!availableBillingCycles.length) return;

    const hasSelectedCycle = availableBillingCycles.some(
      (cycle: any) => cycle.slug === activeBillingCycleSlug
    );

    if (!hasSelectedCycle) {
      const preferredCycle =
        availableBillingCycles.find((cycle: any) => cycle.slug === "monthly") ||
        availableBillingCycles[0];
      setActiveBillingCycleSlug(preferredCycle.slug);
    }
  }, [availableBillingCycles, activeBillingCycleSlug]);

  const currentBillingCycle = useMemo(() => {
    return availableBillingCycles.find(
      (cycle: any) => cycle.slug === activeBillingCycleSlug
    );
  }, [availableBillingCycles, activeBillingCycleSlug]);

  const enterprisePlans: EnterprisePlan[] = [
    {
      name: "Automatización Empresarial",
      price: "2,999",
      period: "MXN",
      description: "Implementación inicial desde este monto",
    },
    {
      name: "Landing Pages Profesionales",
      price: "4,999",
      period: "MXN",
      description: "Diseño y desarrollo listos para vender",
    },
    {
      name: "Soluciones IA Personalizadas",
      price: "Consultar",
      period: "según alcance",
      description: "Cotización a medida para tu operación",
    },
  ];

  if (isLoading) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Cargando planes...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-lg text-red-500">Error al cargar los planes</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {currentCategory?.name ? `Planes de ${currentCategory.name}` : "Planes disponibles"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mostramos automáticamente la categoría con paquetes activos para que nunca se vea una sección vacía.
            </p>
          </div>

          {availableCategories.length > 1 && (
            <div className="flex justify-center mb-8">
              <div className="bg-muted p-1 rounded-lg flex flex-wrap gap-1">
                {availableCategories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setActiveCategorySlug(category.slug || null)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeCategorySlug === category.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted-foreground/10"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableBillingCycles.length > 0 && (
            <div className="flex justify-center mb-12">
              <div className="bg-muted p-1 rounded-lg flex flex-wrap gap-1">
                {availableBillingCycles.map((cycle: any) => (
                  <button
                    key={cycle.id}
                    onClick={() => setActiveBillingCycleSlug(cycle.slug)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeBillingCycleSlug === cycle.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted-foreground/10"
                    }`}
                  >
                    {cycle.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPlans.map((plan: any, index) => (
                <motion.div
                  key={plan.id || plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Más Popular
                      </span>
                    </div>
                  )}
                  <Card
                    className={`h-full flex flex-col transition-all duration-300 ${
                      plan.isPopular
                        ? "border-primary shadow-lg md:scale-105"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm mb-4">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-4xl font-bold text-primary">
                          ${getPlanPrice(plan, currentBillingCycle).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /{currentBillingCycle?.name?.toLowerCase() || "mes"}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <ul className="space-y-3 mb-8 flex-grow">
                        {sortPlanFeatures(plan.features).map((feature: any, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-foreground text-sm">
                              {typeof feature === "string" ? feature : feature.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={plan.isPopular ? "default" : "outline"}
                        onClick={() => openCheckout(plan, currentBillingCycle as any)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          Contratar {plan.name}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
              <p className="text-lg text-foreground mb-2">
                No hay planes activos en este momento.
              </p>
              <p className="text-muted-foreground">
                Mientras tanto, puedes solicitar una cotización personalizada para infraestructura, IA o desarrollo.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-2xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            Servicios Empresariales
          </h3>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Proyectos desde un alcance inicial claro para que puedas presupuestar más rápido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enterprisePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {plan.name}
                </h4>
                <p className="text-3xl font-bold text-primary mb-2">
                  {plan.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              ¿Necesitas una solución personalizada? Hablemos de tu proyecto.
            </p>
            <Button size="lg" asChild>
              <Link
                to={ROUTES.CONTACT}
                className="flex items-center justify-center gap-2"
              >
                Solicitar Cotización
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Pricing;
