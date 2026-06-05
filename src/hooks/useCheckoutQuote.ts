import { useQuery } from '@tanstack/react-query';
import { getCheckoutQuote, type QuoteParams } from '@/services/checkoutService';

export const useCheckoutQuote = (params: QuoteParams) => {
  return useQuery({
    queryKey: ['checkout-quote', params.plan_id, params.billing_cycle],
    queryFn: () => getCheckoutQuote(params),
    retry: false,
    staleTime: 0,
  });
};
