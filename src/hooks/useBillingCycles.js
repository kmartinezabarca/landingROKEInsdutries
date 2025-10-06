import { useQuery } from '@tanstack/react-query';
import { getBillingCycles } from '../services/billingCycleService';

export const useBillingCycles = () => {
  return useQuery({
    queryKey: ['billingCycles'],
    queryFn: getBillingCycles,
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 20 * 60 * 1000, // 20 minutos
    onError: (error) => {
      console.log(error);
    }
  });
};

