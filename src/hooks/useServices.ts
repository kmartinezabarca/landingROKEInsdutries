import { useQuery } from '@tanstack/react-query';
import { getServices } from '../services/servicesService';
import { keysToCamel } from '../utils/formatters';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const result = await getServices() as { data: unknown };
      return keysToCamel(result.data);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
