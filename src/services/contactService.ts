import ApiService from '@/lib/apiClient';

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

/**
 * Envía una solicitud de contacto al backend junto con el token de Turnstile.
 * El backend debe verificar `cf-turnstile-response` contra Cloudflare antes
 * de procesar la solicitud.
 */
export const submitContactRequest = (payload: ContactRequest, turnstileToken: string) =>
  ApiService.post('/contact', { ...payload, 'cf-turnstile-response': turnstileToken });
