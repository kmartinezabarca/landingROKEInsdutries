import { useQuery } from '@tanstack/react-query';
import { getServicePlans } from '../services/servicePlanService';
import { keysToCamel } from '../utils/formatters';
import type { ServicePlan } from '../types/api';

export const useServicePlans = () => {
  return useQuery({
    queryKey: ['servicePlans'],
    queryFn: getServicePlans,
    select: (data): ServicePlan[] => keysToCamel(data.data),
    staleTime: 5 * 60 * 1000,
  });
};
