import ApiService from '../lib/apiClient';

export const getServices = async (): Promise<unknown> => {
  const response = await ApiService.get('/marketing-services');
  return response.data;
};
