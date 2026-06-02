import { useEffect, useMemo, useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useServicePlans } from '@/hooks/useServicePlans';
import { useBillingCycles } from '@/hooks/useBillingCycles';
import { getAvailableCategories, getPlansForCategory } from '@/utils/serviceCatalog';

/**
 * Catálogo de servicios: categorías + planes + ciclos de facturación, con la
 * categoría y el ciclo activos ya resueltos.
 *
 * Centraliza la lógica que ServicesPage, HostingPage y la sección Pricing
 * compartían de forma idéntica (selección por defecto, filtrado por categoría,
 * ciclos disponibles según los planes filtrados).
 */
export const useServiceCatalog = () => {
  const { data: categories } = useCategories();
  const { data: servicePlans, isLoading, isError } = useServicePlans();
  const { data: billingCycles } = useBillingCycles();

  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [activeBillingCycleSlug, setActiveBillingCycleSlug] = useState<string>('monthly');

  const availableCategories = useMemo(
    () => getAvailableCategories(categories, servicePlans),
    [categories, servicePlans]
  );

  // Selecciona la primera categoría disponible si la activa ya no es válida.
  useEffect(() => {
    if (!availableCategories.length) return;
    const has = availableCategories.some((c) => c.slug === activeCategorySlug);
    if (!has) setActiveCategorySlug(availableCategories[0].slug || null);
  }, [availableCategories, activeCategorySlug]);

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
      .sort((a: any, b: any) => Number(a.sort_order ?? 999) - Number(b.sort_order ?? 999));
  }, [billingCycles, filteredPlans]);

  // Selecciona el ciclo por defecto (preferentemente "monthly") si el activo no aplica.
  useEffect(() => {
    if (!availableBillingCycles.length) return;
    const has = availableBillingCycles.some((c: any) => c.slug === activeBillingCycleSlug);
    if (!has) {
      const preferred =
        availableBillingCycles.find((c: any) => c.slug === 'monthly') ||
        availableBillingCycles[0];
      setActiveBillingCycleSlug(preferred.slug ?? '');
    }
  }, [availableBillingCycles, activeBillingCycleSlug]);

  const currentBillingCycle = useMemo(
    () => availableBillingCycles.find((c: any) => c.slug === activeBillingCycleSlug),
    [availableBillingCycles, activeBillingCycleSlug]
  );

  const currentCategory = useMemo(
    () => availableCategories.find((c) => c.slug === activeCategorySlug),
    [availableCategories, activeCategorySlug]
  );

  return {
    categories,
    servicePlans,
    billingCycles,
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
  };
};
