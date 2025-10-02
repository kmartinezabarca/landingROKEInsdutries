import { useQuery } from '@tanstack/react-query';
import { getServices } from '../services/servicesService';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
};

