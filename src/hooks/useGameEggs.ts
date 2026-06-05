import { useQuery } from '@tanstack/react-query';
import { getGameEggs, type GameNest } from '@/services/gameEggService';

export const useGameEggs = (planId: string | number, enabled = true) => {
  return useQuery<GameNest[]>({
    queryKey: ['gameEggs', planId],
    queryFn: () => getGameEggs(planId),
    enabled,
    retry: false,
  });
};
