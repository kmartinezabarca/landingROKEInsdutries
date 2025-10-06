import { useQuery } from '@tanstack/react-query';
import { getServicePlans } from '../services/servicePlanService';

export const useServicePlans = () => {
  return useQuery({
    queryKey: ['servicePlans'],
    queryFn: getServicePlans,
  });
};

