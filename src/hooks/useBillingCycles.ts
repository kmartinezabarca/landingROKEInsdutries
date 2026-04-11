import { useQuery } from '@tanstack/react-query';
import { getBillingCycles } from '../services/billingCycleService';
import type { BillingCycle } from '../types/api';

export const useBillingCycles = () => {
  return useQuery({
    queryKey: ['billingCycles'],
    queryFn: getBillingCycles,
    select: (data): BillingCycle[] => data.data,
    staleTime: 5 * 60 * 1000,
  });
};
