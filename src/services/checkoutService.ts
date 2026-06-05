import ApiService from '@/lib/apiClient';

export interface QuoteParams {
  plan_id: string;
  billing_cycle: string;
  add_ons?: string[];
}

// Cotización autoritativa calculada por el backend (no se calcula en el cliente).
export interface CheckoutQuote {
  quote_id: string;
  subtotal: number | string;
  tax: number | string;
  total: number | string;
}

/** Pide al backend la cotización autoritativa del pedido. */
export const getCheckoutQuote = async (
  params: QuoteParams
): Promise<CheckoutQuote | undefined> => {
  const response = await ApiService.post('/checkout/quote', {
    add_ons: [],
    ...params,
  });
  return (response.data as { data?: CheckoutQuote })?.data;
};
