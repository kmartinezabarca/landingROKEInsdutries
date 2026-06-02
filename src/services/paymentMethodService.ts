import ApiService from '@/lib/apiClient';

export interface SavedPaymentMethod {
  stripe_payment_method_id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

/** Métodos de pago guardados del usuario autenticado. */
export const getPaymentMethods = async (): Promise<SavedPaymentMethod[]> => {
  const response = await ApiService.get('/payments/methods');
  return (response.data as { data?: SavedPaymentMethod[] })?.data ?? [];
};
