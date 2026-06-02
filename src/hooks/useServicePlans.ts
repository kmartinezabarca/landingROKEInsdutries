import { useQuery } from '@tanstack/react-query';
import { getServicePlans } from '@/services/servicePlanService';
import { keysToCamel } from '@/utils/formatters';
import type { PlanLike } from '@/utils/serviceCatalog';

export const useServicePlans = () => {
  return useQuery({
    queryKey: ['servicePlans'],
    queryFn: getServicePlans,
    select: (data): PlanLike[] =>
      keysToCamel((data as { data: unknown }).data) as PlanLike[],
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
