import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categoryService';
import type { Category } from '../types/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data): Category[] => data.data,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
