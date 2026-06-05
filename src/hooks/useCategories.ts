import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/categoryService';
import { keysToCamel } from '@/utils/formatters';
import type { CategoryLike } from '@/utils/serviceCatalog';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data): CategoryLike[] =>
      keysToCamel((data as { data: unknown }).data) as CategoryLike[],
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
