import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const ROOT_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let isAuthRedirecting = false;

const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: unknown) => {
      const axiosError = error as {
        response?: { status: number };
        config?: { _handle401?: boolean };
      };
      const { response, config } = axiosError;
      const status = response?.status;

      // Permitir que el llamador maneje 401 manualmente
      if (config && config._handle401 === false) {
        return Promise.reject(error);
      }

      // Sin respuesta del servidor — error de red
      if (!response) {
        return Promise.reject(error);
      }

      if ((status === 401 || status === 403) && !isAuthRedirecting) {
        isAuthRedirecting = true;
        // Sitio público — no hay ruta de login activa.
        // Descomentar si se agrega autenticación:
        // if (window.location.pathname !== '/login') window.location.replace('/login');
      }

      if (status === 419 && !isAuthRedirecting) {
        isAuthRedirecting = true;
        // Token CSRF expirado — recargar para obtener uno nuevo
        window.location.reload();
      }

      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient(API_BASE_URL);
const rootApiClient = createApiClient(ROOT_URL);

const ApiService = {
  client: apiClient,
  rootClient: rootApiClient,

  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config),

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),

  getRoot: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    rootApiClient.get<T>(url, config),

  postRoot: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    rootApiClient.post<T>(url, data, config),
};

export default ApiService;
