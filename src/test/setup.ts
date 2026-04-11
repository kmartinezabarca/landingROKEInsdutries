import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock de variables de entorno para tests
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_BASE_URL: 'http://localhost:8000/api',
    VITE_API_URL: 'http://localhost:8000',
    VITE_COMPANY_NAME: 'ROKE Industries Test',
    VITE_EMAIL: 'test@rokeindustries.com',
    VITE_PHONE: '+52 55 1234 5678',
    VITE_WHATSAPP: '+525512345678',
    VITE_ADDRESS: 'Test Address',
    MODE: 'test',
    DEV: false,
    PROD: false,
  },
  writable: true,
});

// Silenciar console.error en tests (los errores esperados no deben contaminar output)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') || args[0].includes('ReactDOM.render'))
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
});
