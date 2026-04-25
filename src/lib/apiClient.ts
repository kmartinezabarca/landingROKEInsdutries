import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const ROOT_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let isAuthRedirecting = false;

const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const err = error as { response?: { status: number }; config?: { _handle401?: boolean } };
      const status = err.response?.status;
      if (err.config?._handle401 === false) return Promise.reject(error);
      if (!err.response) return Promise.reject(error);
      if ((status === 401 || status === 403) && !isAuthRedirecting) {
        isAuthRedirecting = true;
        if (window.location.pathname !== '/login') {
          // window.location.replace('/login');
        }
      }
      if (status === 419 && !isAuthRedirecting) {
        // window.location.replace('/login');
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
  get: <T>(url: string, config?: object) => apiClient.get<T>(url, config),
  post: <T>(url: string, data?: unknown, config?: object) => apiClient.post<T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: object) => apiClient.put<T>(url, data, config),
  delete: <T>(url: string, config?: object) => apiClient.delete<T>(url, config),
  getRoot: <T>(url: string, config?: object) => rootApiClient.get<T>(url, config),
  postRoot: <T>(url: string, data?: unknown, config?: object) => rootApiClient.post<T>(url, data, config),
};
export default ApiService;
