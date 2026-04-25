import ApiService from '../lib/apiClient';

export const getBillingCycles = async (): Promise<unknown> => {
  const response = await ApiService.get('/billing-cycles');
  return response.data;
};
