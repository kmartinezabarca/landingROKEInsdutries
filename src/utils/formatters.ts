/**
 * Convierte un string de snake_case o kebab-case a camelCase.
 * Ejemplo: 'icon_name' → 'iconName'
 */
const toCamel = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, ($1: string) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

/**
 * Recorre recursivamente un objeto o array y convierte todas sus claves a camelCase.
 */
export const keysToCamel = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v)) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj as Record<string, unknown>).reduce(
      (acc: Record<string, unknown>, key: string) => {
        acc[toCamel(key)] = keysToCamel((obj as Record<string, unknown>)[key]);
        return acc;
      },
      {}
    ) as unknown as T;
  }
  return obj;
};
