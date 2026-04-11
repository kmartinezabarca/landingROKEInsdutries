import { describe, it, expect } from 'vitest';
import { keysToCamel } from '@/utils/formatters';

describe('keysToCamel', () => {
  it('convierte claves snake_case a camelCase en un objeto simple', () => {
    const input = { first_name: 'John', last_name: 'Doe', is_active: true };
    const result = keysToCamel(input);
    expect(result).toEqual({ firstName: 'John', lastName: 'Doe', isActive: true });
  });

  it('convierte claves kebab-case a camelCase', () => {
    const input = { 'background-color': 'red', 'font-size': 16 };
    const result = keysToCamel(input);
    expect(result).toEqual({ backgroundColor: 'red', fontSize: 16 });
  });

  it('maneja arrays de objetos recursivamente', () => {
    const input = [
      { plan_name: 'Basic', is_popular: false },
      { plan_name: 'Pro', is_popular: true },
    ];
    const result = keysToCamel(input);
    expect(result).toEqual([
      { planName: 'Basic', isPopular: false },
      { planName: 'Pro', isPopular: true },
    ]);
  });

  it('maneja objetos anidados recursivamente', () => {
    const input = {
      user_data: {
        first_name: 'Ana',
        contact_info: { phone_number: '555-1234' },
      },
    };
    const result = keysToCamel(input);
    expect(result).toEqual({
      userData: {
        firstName: 'Ana',
        contactInfo: { phoneNumber: '555-1234' },
      },
    });
  });

  it('devuelve primitivos sin modificar', () => {
    expect(keysToCamel('string')).toBe('string');
    expect(keysToCamel(42)).toBe(42);
    expect(keysToCamel(true)).toBe(true);
    expect(keysToCamel(null)).toBe(null);
  });

  it('devuelve un array vacío sin modificar', () => {
    expect(keysToCamel([])).toEqual([]);
  });

  it('devuelve un objeto vacío sin modificar', () => {
    expect(keysToCamel({})).toEqual({});
  });

  it('no modifica claves que ya están en camelCase', () => {
    const input = { firstName: 'Juan', isActive: true };
    expect(keysToCamel(input)).toEqual({ firstName: 'Juan', isActive: true });
  });
});
