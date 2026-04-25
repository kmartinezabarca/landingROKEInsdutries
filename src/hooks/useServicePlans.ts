import { useQuery } from '@tanstack/react-query';
import { getServicePlans } from '../services/servicePlanService';
import { keysToCamel } from '../utils/formatters';

export const useServicePlans = () => {
  return useQuery({
    queryKey: ['servicePlans'],
    queryFn: getServicePlans,
    select: (data) => keysToCamel((data as { data: unknown }).data),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
