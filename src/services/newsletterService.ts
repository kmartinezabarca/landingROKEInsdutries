import ApiService from '@/lib/apiClient';

/**
 * Suscribe un email al newsletter junto con el token de Turnstile.
 * El backend debe verificar `cf-turnstile-response` antes de dar de alta.
 */
export const subscribeNewsletter = (email: string, turnstileToken: string) =>
  ApiService.post('/newsletter/subscribe', { email, 'cf-turnstile-response': turnstileToken });
