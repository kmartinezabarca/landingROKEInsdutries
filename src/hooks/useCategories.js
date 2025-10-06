import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categoryService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 20 * 60 * 1000, // 20 minutos
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onError: (error) => {
      console.log(error);
    }
  });
};

