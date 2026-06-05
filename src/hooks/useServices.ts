import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/services/servicesService';
import { keysToCamel } from '@/utils/formatters';
import type { SystemService } from '@/types/api';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<SystemService[]> => {
      const result = await getServices() as { data: unknown };
      return keysToCamel(result.data) as SystemService[];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
