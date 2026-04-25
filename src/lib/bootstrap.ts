import axios from 'axios';
const ROOT_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const initializeCsrf = async (): Promise<void> => {
  try {
    await axios.get(`${ROOT_URL}/sanctum/csrf-cookie`, { withCredentials: true });
    console.log('CSRF cookie initialized successfully.');
  } catch (error) {
    console.error('Fatal: Could not initialize CSRF cookie. App may not work correctly.', error);
  }
};
