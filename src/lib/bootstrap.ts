import axios from 'axios';

const ROOT_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Realiza la petición inicial a Sanctum para obtener la cookie CSRF.
 * Debe llamarse una sola vez al arrancar la aplicación.
 */
export const initializeCsrf = async (): Promise<void> => {
  await axios.get(`${ROOT_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};
