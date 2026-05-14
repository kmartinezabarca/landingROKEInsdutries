import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Globe,
  Gamepad2,
  Star,
  ArrowRight,
  Calculator,
  Server,
} from "lucide-react";
import Container from "../components/common/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/Card";
import Button from "../components/common/Button";
import { useServicePlans } from "../hooks/useServicePlans";
import { useBillingCycles } from "../hooks/useBillingCycles";
import { useCheckout } from "../contexts/CheckoutContext";
import { useCategories } from "../hooks/useCategories";
import {
  getAvailableCategories,
  getPlanPrice,
  getPlansForCategory,
  sortPlanFeatures,
} from "../utils/serviceCatalog";

const categoryIcons: Record<string, React.ElementType> = {
  Globe,
  Gamepad2,
  Server,
};

const HostingPage: React.FC = () => {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [activeBillingCycleSlug, setActiveBillingCycleSlug] =
    useState<string>("monthly");

  const { data: categories } = useCategories();
  const { data: servicePlans, isLoading, isError, error } = useServicePlans();
  const { data: billingCycles } = useBillingCycles();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Cargando planes de servicio...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-red-500">
          Error al cargar los planes de servicio: {error.message}
        </p>
      </div>
    );
  }

  const CurrentCategoryIcon =
    categoryIcons[currentCategory?.icon || ""] ||
    categoryIcons[currentCategory?.slug || ""] ||
    Server;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
          style={{
            backgroundImage: "url('/assets/images/banners/banner-hosting.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Planes activos y servidores listos para lanzar
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Mostramos primero la categoría disponible para que puedas cotizar o contratar sin encontrarte con secciones vacías.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        {availableCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-muted p-1 rounded-lg flex flex-wrap gap-1">
              {availableCategories.map((category) => {
                const Icon =
                  categoryIcons[category.icon || ""] ||
                  categoryIcons[category.slug || ""] ||
                  Server;

                return (
                  <button
                    key={category.slug}
                    onClick={() => setActiveCategorySlug(category.slug || null)}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                      activeCategorySlug === category.slug
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 inline mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {availableBillingCycles.length > 0 && (
          <div className="flex justify-center mb-10">
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

        {currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <CurrentCategoryIcon className="w-5 h-5" />
              <span className="font-semibold">{currentCategory.name}</span>
            </div>
            {currentCategory.description && (
              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                {currentCategory.description}
              </p>
            )}
          </motion.div>
        )}

        {filteredPlans.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {filteredPlans.map((plan: any, index) => (
              <motion.div
                key={plan.id || plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Más Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.isPopular ? "border-primary shadow-lg md:scale-105" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CurrentCategoryIcon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1 my-4">
                      <span className="text-4xl font-bold text-primary">
                        ${getPlanPrice(plan, currentBillingCycle).toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">
                        /{currentBillingCycle?.name?.toLowerCase() || "mes"}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>

                    {plan.specifications && (
                      <div className="grid grid-cols-2 gap-4 text-sm mt-6">
                        {plan.specifications.ram && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="font-medium text-foreground">
                              {plan.specifications.ram}
                            </div>
                            <div className="text-muted-foreground">Memoria</div>
                          </div>
                        )}
                        {plan.specifications.cpu && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="font-medium text-foreground">
                              {plan.specifications.cpu}
                            </div>
                            <div className="text-muted-foreground">Procesador</div>
                          </div>
                        )}
                        {plan.specifications.storage && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="font-medium text-foreground">
                              {plan.specifications.storage}
                            </div>
                            <div className="text-muted-foreground">
                              Almacenamiento
                            </div>
                          </div>
                        )}
                        {(plan.specifications.players || plan.specifications.slots) && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="font-medium text-foreground">
                              {plan.specifications.players || plan.specifications.slots}
                            </div>
                            <div className="text-muted-foreground">Capacidad</div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {sortPlanFeatures(plan.features).map((feature: any, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">
                            {typeof feature === "string" ? feature : feature.feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      variant={plan.isPopular ? "default" : "outline"}
                      onClick={() => openCheckout(plan, currentBillingCycle as any)}
                    >
                      Contratar {plan.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
            <p className="text-lg text-foreground mb-2">
              No hay paquetes activos en esta categoría.
            </p>
            <p className="text-muted-foreground">
              Selecciona otra categoría disponible o solicita una propuesta personalizada.
            </p>
          </div>
        )}
      </Container>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background dark:from-slate-950 dark:via-primary/15 dark:to-slate-950">
        <Container className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            ¿Necesitas una solución personalizada?
          </h3>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a encontrar la
            solución perfecta para tus necesidades específicas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium
               bg-black text-white hover:bg-neutral-800 active:bg-neutral-900
               shadow-sm hover:shadow-md transition"
            >
              <Calculator className="h-5 w-5" />
              <span>Solicitar Cotización</span>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HostingPage;
