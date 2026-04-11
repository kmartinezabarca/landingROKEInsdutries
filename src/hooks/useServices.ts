import { useQuery } from '@tanstack/react-query';
import { getServices } from '../services/servicesService';
import { keysToCamel } from '../utils/formatters';
import type { MarketingService } from '../types/api';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    select: (data): MarketingService[] => keysToCamel(data.data),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
