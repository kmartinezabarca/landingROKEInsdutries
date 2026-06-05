const toCamel = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const keysToCamel = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      (acc as Record<string, unknown>)[toCamel(key)] = keysToCamel(
        (obj as Record<string, unknown>)[key]
      );
      return acc;
    }, {} as T);
  }
  return obj;
};
