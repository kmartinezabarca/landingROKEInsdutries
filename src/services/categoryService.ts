import ApiService from '../lib/apiClient';

export const getCategories = async (): Promise<unknown> => {
  const response = await ApiService.get('/categories');
  return response.data;
};
