import apiClient from '../lib/apiClient';
import type { ApiResponse, Category } from '../types/api';

/** Obtiene todas las categorías de productos/servicios */
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
  return response.data;
};
