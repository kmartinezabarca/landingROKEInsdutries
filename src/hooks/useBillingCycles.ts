import { useQuery } from '@tanstack/react-query';
import { getBillingCycles } from '@/services/billingCycleService';
import type { BillingCycleLike } from '@/utils/serviceCatalog';

export const useBillingCycles = () => {
  return useQuery({
    queryKey: ['billingCycles'],
    queryFn: getBillingCycles,
    select: (data): BillingCycleLike[] =>
      (data as { data: unknown }).data as BillingCycleLike[],
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
