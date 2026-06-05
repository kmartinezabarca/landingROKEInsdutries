import { useQuery } from '@tanstack/react-query';
import { getPaymentMethods, type SavedPaymentMethod } from '@/services/paymentMethodService';

export const usePaymentMethods = () => {
  return useQuery<SavedPaymentMethod[]>({
    queryKey: ['paymentMethods'],
    queryFn: getPaymentMethods,
    retry: false,
  });
};
