import { useQuery } from '@tanstack/react-query';
import { getBillingCycles } from '../services/billingCycleService';

export const useBillingCycles = () => {
  return useQuery({
    queryKey: ['billingCycles'],
    queryFn: getBillingCycles,
  });
};

