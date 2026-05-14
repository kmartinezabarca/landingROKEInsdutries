import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categoryService';
import { keysToCamel } from '../utils/formatters';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => keysToCamel((data as { data: unknown }).data),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
