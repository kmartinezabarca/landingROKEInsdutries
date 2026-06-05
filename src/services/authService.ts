import ApiService from '@/lib/apiClient';

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
  avatar_url?: string;
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

const authService = {
  login: (data: LoginParams) =>
    ApiService.post<AuthApiResponse>('/auth/login', data),

  register: (data: RegisterParams) =>
    ApiService.post<AuthApiResponse>('/auth/register', data),

  loginWithGoogle: (googleUser: GoogleUserData) =>
    ApiService.post<AuthApiResponse>('/auth/google/callback', {
      first_name: googleUser.given_name,
      last_name:  googleUser.family_name ?? '',
      email:      googleUser.email,
      google_id:  googleUser.sub,
      avatar_url: googleUser.picture ?? null,
    }),

  logout: () =>
    ApiService.post('/auth/logout'),

  me: () =>
    ApiService.get<{ success: boolean; data: { user: AuthUser } }>('/auth/me'),
};

export default authService;
