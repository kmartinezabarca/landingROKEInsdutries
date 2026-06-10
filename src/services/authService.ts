import ApiService from '@/lib/apiClient';

/** Usuario tal como lo devuelve el backend (userPayload de AuthController). */
export interface AuthUser {
  uuid: string;
  first_name: string;
  last_name: string;
  username: string | null;
  email: string;
  phone?: string | null;
  role: string;
  status?: string;
  avatar_url?: string | null;
  is_google_account?: boolean;
  needs_username?: boolean;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface AuthApiResponse {
  access_token: string;
  token_type?: string;
  user: AuthUser;
  needs_username?: boolean;
  message?: string;
  redirect_to?: string;
}

export interface GoogleUserData {
  sub: string;
  email: string;
  given_name: string;
  family_name?: string;
  picture?: string;
}

/** Cuando Google es un usuario nuevo, el backend pide elegir username antes de crear la cuenta. */
export interface GoogleSetupRequired {
  username_required: true;
  setup_token: string;
  user_preview: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string | null;
  };
  message?: string;
  expires_in_minutes?: number;
}

/** Respuesta del callback de Google: o autentica directo, o pide username. */
export type GoogleAuthResponse = AuthApiResponse | GoogleSetupRequired;

export const isGoogleSetupRequired = (
  body: GoogleAuthResponse
): body is GoogleSetupRequired =>
  (body as GoogleSetupRequired).username_required === true;

const authService = {
  login: (data: LoginParams) =>
    ApiService.post<AuthApiResponse>('/auth/login', data),

  register: (data: RegisterParams) =>
    ApiService.post<AuthApiResponse>('/auth/register', data),

  /**
   * Inicia/registra con Google. `intent: 'register'` permite que un usuario
   * nuevo continúe (el backend responde `username_required` + `setup_token`);
   * los usuarios existentes inician sesión normalmente sin importar el intent.
   */
  loginWithGoogle: (googleUser: GoogleUserData, intent: 'login' | 'register' = 'register') =>
    ApiService.post<GoogleAuthResponse>('/auth/google/callback', {
      first_name: googleUser.given_name,
      last_name:  googleUser.family_name ?? '',
      email:      googleUser.email,
      google_id:  googleUser.sub,
      avatar_url: googleUser.picture ?? null,
      intent,
    }),

  /** Crea la cuenta de un usuario de Google una vez que eligió su username. */
  completeGoogleProfile: (setup_token: string, username: string) =>
    ApiService.post<AuthApiResponse>('/auth/complete-profile', { setup_token, username }),

  /** Asigna username a un usuario ya autenticado que aún no tiene uno. */
  setupUsername: (username: string) =>
    ApiService.post<{ message: string; user: AuthUser }>('/auth/setup-username', { username }),

  /** Verifica en vivo si un username está disponible. */
  checkUsername: (username: string) =>
    ApiService.get<{ username: string; available: boolean }>('/auth/username/check', {
      params: { username },
    }),

  logout: () =>
    ApiService.post('/auth/logout'),

  me: () =>
    ApiService.get<{ success: boolean; data: AuthUser }>('/auth/me'),
};

export default authService;
