import ApiService from '../lib/apiClient';

export const getServicePlans = async (): Promise<unknown> => {
  const response = await ApiService.get('/service-plans');
  return response.data;
};
