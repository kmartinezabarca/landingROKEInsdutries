import { useQuery } from '@tanstack/react-query';
import { getBillingCycles } from '../services/billingCycleService';

export const useBillingCycles = () => {
  return useQuery({
    queryKey: ['billingCycles'],
    queryFn: getBillingCycles,
    select: (data) => (data as { data: unknown }).data,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
