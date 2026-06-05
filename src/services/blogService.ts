import ApiService from '@/lib/apiClient';
import type { ApiResponse } from '@/types/api';

interface BlogParams {
  search?: string;
  category_id?: string;
  page?: number;
  [key: string]: unknown;
}

/**
 * Obtiene todos los posts del blog con filtros opcionales
 */
export const getBlogPosts = async <T = unknown>(
  params: BlogParams = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await ApiService.get('/blog/posts', { params });
    return response.data as ApiResponse<T>;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Obtiene un post específico por slug
 */
export const getBlogPostBySlug = async <T = unknown>(
  slug: string
): Promise<ApiResponse<T>> => {
  try {
    const response = await ApiService.get(`/blog/posts/${slug}`);
    return response.data as ApiResponse<T>;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene todas las categorías del blog
 */
export const getBlogCategories = async <T = unknown>(): Promise<ApiResponse<T>> => {
  try {
    const response = await ApiService.get('/blog/categories');
    return response.data as ApiResponse<T>;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};

/**
 * Obtiene posts por categoría
 */
export const getBlogPostsByCategory = async (
  categorySlug: string,
  params: BlogParams = {}
): Promise<unknown> => {
  try {
    const response = await ApiService.get(`/blog/categories/${categorySlug}/posts`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog posts for category ${categorySlug}:`, error);
    throw error;
  }
};
