import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '../services/allServicesService';

export const useAllServices = () => {
  return useQuery({
    queryKey: ['allServices'],
    queryFn: getAllServices,
  });
};

