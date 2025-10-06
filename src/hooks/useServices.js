import { useQuery } from '@tanstack/react-query';
import { getServices } from '../services/servicesService';
import { keysToCamel } from "../utils/formatters";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    select: (data) => keysToCamel(data.data),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 20 * 60 * 1000, // 20 minutos
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error al obtener planes de servicio", error);
    },
  });
};

