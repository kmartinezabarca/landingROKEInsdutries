import ApiService from '@/lib/apiClient';

export interface GameEgg {
  id: number;
  name: string;
  description?: string;
}

export interface GameNest {
  id: number;
  name: string;
  eggs: GameEgg[];
}

// Forma cruda que devuelve el backend (snake_case / claves alternativas).
interface RawNest {
  nest_id?: number;
  id?: number;
  nest?: string;
  name?: string;
  games?: GameEgg[];
  eggs?: GameEgg[];
}

/**
 * Devuelve los nests/juegos disponibles para un plan de game server.
 * La normalización de la forma del backend vive aquí (capa de servicio),
 * para que los componentes solo consuman el tipo `GameNest` ya limpio.
 */
export const getGameEggs = async (planId: string | number): Promise<GameNest[]> => {
  const response = await ApiService.get(`/game-eggs?id=${planId}`);
  const raw = (response.data as { data?: unknown })?.data ?? response.data ?? [];
  if (!Array.isArray(raw)) return [];
  return (raw as RawNest[]).map((n) => ({
    id: n.nest_id ?? n.id ?? 0,
    name: n.nest ?? n.name ?? '',
    eggs: n.games ?? n.eggs ?? [],
  }));
};
