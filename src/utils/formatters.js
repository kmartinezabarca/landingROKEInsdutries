/**
 * Convierte un string de snake_case o kebab-case a camelCase.
 * Ejemplo: 'icon_name' se convierte en 'iconName'.
 * @param {string} str El string a convertir.
 * @returns {string} El string en formato camelCase.
 */
const toCamel = (str) => {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

/**
 * Recorre recursivamente un objeto o un array de objetos y convierte
 * todas sus claves a camelCase.
 * @param {any} obj El objeto o array a transformar.
 * @returns {any} El nuevo objeto o array con claves en camelCase.
 */
export const keysToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToCamel(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toCamel(key)] = keysToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
