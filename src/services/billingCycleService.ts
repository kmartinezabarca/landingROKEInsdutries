import apiClient from '../lib/apiClient';
import type { ApiResponse, BillingCycle } from '../types/api';

/** Obtiene todos los ciclos de facturación disponibles */
export const getBillingCycles = async (): Promise<ApiResponse<BillingCycle[]>> => {
  const response = await apiClient.get<ApiResponse<BillingCycle[]>>('/billing-cycles');
  return response.data;
};
