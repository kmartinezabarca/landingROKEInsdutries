type CategoryLike = {
  id?: number | string;
  slug?: string;
  name?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
  is_active?: boolean;
  sortOrder?: number;
  sort_order?: number;
};

type BillingCycleLike = {
  slug?: string;
  discountPercentage?: number | string;
  discount_percentage?: number | string;
};

type FeatureLike =
  | string
  | {
      feature?: string;
      included?: boolean;
      sortOrder?: number;
      sort_order?: number;
    };

type PricingLike = {
  price?: number | string;
  billingCycle?: { slug?: string };
  billing_cycle?: { slug?: string };
};

type PlanLike = {
  id?: number | string;
  name?: string;
  slug?: string;
  category?: CategoryLike | string;
  basePrice?: number | string;
  base_price?: number | string;
  price?: number | string;
  isActive?: boolean;
  is_active?: boolean;
  isPopular?: boolean;
  sortOrder?: number;
  sort_order?: number;
  pricing?: PricingLike[];
  features?: FeatureLike[];
};

const getNumber = (...values: Array<number | string | undefined | null>): number | null => {
  for (const value of values) {
    if (value === undefined || value === null || value === "") continue;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return null;
};

const getOrderValue = (value: { sortOrder?: number; sort_order?: number } | undefined | null) => {
  return getNumber(value?.sortOrder, value?.sort_order);
};

const getCategorySlug = (plan: PlanLike): string | undefined => {
  if (!plan.category) return undefined;
  if (typeof plan.category === "string") return plan.category;
  return plan.category.slug;
};

const getCategoryName = (plan: PlanLike): string | undefined => {
  if (!plan.category || typeof plan.category === "string") return undefined;
  return plan.category.name;
};

export const isEntityActive = (entity?: { isActive?: boolean; is_active?: boolean } | null) => {
  if (!entity) return false;
  if (typeof entity.isActive === "boolean") return entity.isActive;
  if (typeof entity.is_active === "boolean") return entity.is_active;
  return true;
};

export const getAvailableCategories = (
  categories: CategoryLike[] = [],
  plans: PlanLike[] = []
): CategoryLike[] => {
  const availablePlanCategories = new Map<string, CategoryLike>();

  plans
    .filter((plan) => isEntityActive(plan))
    .forEach((plan) => {
      const slug = getCategorySlug(plan);
      if (!slug) return;

      availablePlanCategories.set(slug, {
        slug,
        name: getCategoryName(plan) || slug,
      });
    });

  const normalizedCategories =
    categories.length > 0
      ? categories
          .filter((category) => isEntityActive(category) && category.slug && availablePlanCategories.has(category.slug))
          .map((category) => ({
            ...availablePlanCategories.get(category.slug!),
            ...category,
          }))
      : Array.from(availablePlanCategories.values());

  return normalizedCategories.sort((left, right) => {
    const leftOrder = getOrderValue(left);
    const rightOrder = getOrderValue(right);

    if (leftOrder !== null && rightOrder !== null && leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    if (leftOrder !== null && rightOrder === null) return -1;
    if (leftOrder === null && rightOrder !== null) return 1;

    return (left.name || "").localeCompare(right.name || "");
  });
};

export const getPlansForCategory = (plans: PlanLike[] = [], categorySlug?: string | null): PlanLike[] => {
  if (!categorySlug) return [];

  return [...plans]
    .filter((plan) => isEntityActive(plan) && getCategorySlug(plan) === categorySlug)
    .sort((left, right) => {
      const leftOrder = getOrderValue(left);
      const rightOrder = getOrderValue(right);

      if (leftOrder !== null && rightOrder !== null && leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      if (leftOrder !== null && rightOrder === null) return -1;
      if (leftOrder === null && rightOrder !== null) return 1;

      const leftPrice = getNumber(left.basePrice, left.base_price, left.price);
      const rightPrice = getNumber(right.basePrice, right.base_price, right.price);

      if (leftPrice !== null && rightPrice !== null && leftPrice !== rightPrice) {
        return leftPrice - rightPrice;
      }

      if (leftPrice !== null && rightPrice === null) return -1;
      if (leftPrice === null && rightPrice !== null) return 1;

      return (left.name || "").localeCompare(right.name || "");
    });
};

export const getPlanPrice = (plan: PlanLike, billingCycle?: BillingCycleLike | null): number => {
  const billingCycleSlug = billingCycle?.slug;
  const exactPrice = plan.pricing?.find((entry) => {
    const entrySlug = entry.billingCycle?.slug || entry.billing_cycle?.slug;
    return entrySlug === billingCycleSlug;
  });

  const exactValue = getNumber(exactPrice?.price);
  if (exactValue !== null) return exactValue;

  const basePrice = getNumber(plan.basePrice, plan.base_price, plan.price) ?? 0;
  const discount = getNumber(billingCycle?.discountPercentage, billingCycle?.discount_percentage) ?? 0;

  return basePrice * (1 - discount / 100);
};

export const sortPlanFeatures = (features: FeatureLike[] = []): FeatureLike[] => {
  return [...features].sort((left, right) => {
    if (typeof left === "string" || typeof right === "string") return 0;

    const leftOrder = getOrderValue(left);
    const rightOrder = getOrderValue(right);

    if (leftOrder !== null && rightOrder !== null && leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    if (leftOrder !== null && rightOrder === null) return -1;
    if (leftOrder === null && rightOrder !== null) return 1;

    return (left.feature || "").localeCompare(right.feature || "");
  });
};
