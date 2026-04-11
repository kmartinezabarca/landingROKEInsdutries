import apiClient from '../lib/apiClient';
import type { ApiResponse, ServicePlan } from '../types/api';

/** Obtiene todos los planes de servicio disponibles */
export const getServicePlans = async (): Promise<ApiResponse<ServicePlan[]>> => {
  const response = await apiClient.get<ApiResponse<ServicePlan[]>>('/service-plans');
  return response.data;
};
