import apiClient from "../lib/apiClient";

/**
 * Obtiene todos los posts del blog con filtros opcionales
 * @param {Object} params - Parámetros de filtrado
 * @param {string} params.search - Búsqueda por título o extracto
 * @param {string} params.category_id - Filtrar por categoría
 * @param {number} params.page - Número de página (default: 1)
 * @returns {Promise<Object>} Respuesta con posts y metadata
 */
export const getBlogPosts = async (params = {}) => {
  try {
    const response = await apiClient.get("/blog/posts", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

/**
 * Obtiene un post específico por slug
 * @param {string} slug - Slug del post
 * @returns {Promise<Object>} Datos del post
 */
export const getBlogPostBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/blog/posts/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene todas las categorías del blog
 * @returns {Promise<Object>} Respuesta con categorías
 */
export const getBlogCategories = async () => {
  try {
    const response = await apiClient.get("/blog/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    throw error;
  }
};

/**
 * Obtiene posts por categoría
 * @param {string} categorySlug - Slug de la categoría
 * @param {Object} params - Parámetros adicionales (page, search, etc.)
 * @returns {Promise<Object>} Respuesta con posts de la categoría
 */
export const getBlogPostsByCategory = async (categorySlug, params = {}) => {
  try {
    const response = await apiClient.get(`/blog/categories/${categorySlug}/posts`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog posts for category ${categorySlug}:`, error);
    throw error;
  }
};
