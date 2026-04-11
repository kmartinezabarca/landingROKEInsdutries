import apiClient from '../lib/apiClient';
import type { ApiResponse, MarketingService } from '../types/api';

/** Obtiene todos los servicios de marketing */
export const getServices = async (): Promise<ApiResponse<MarketingService[]>> => {
  const response = await apiClient.get<ApiResponse<MarketingService[]>>('/marketing-services');
  return response.data;
};
