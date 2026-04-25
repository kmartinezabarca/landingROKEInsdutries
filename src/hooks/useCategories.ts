import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categoryService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => (data as { data: unknown }).data,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
