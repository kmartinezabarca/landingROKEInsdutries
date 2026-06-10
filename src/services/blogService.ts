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
 * Comentario del blog tal como lo devuelve el backend (solo aprobados).
 */
export interface BlogComment {
  uuid: string;
  authorName: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export interface NewCommentPayload {
  author_name: string;
  author_email: string;
  content: string;
}

/**
 * Obtiene los comentarios aprobados de un post.
 */
export const getBlogComments = async (
  slug: string
): Promise<ApiResponse<BlogComment[]>> => {
  try {
    const response = await ApiService.get(`/blog/posts/${slug}/comments`);
    return response.data as ApiResponse<BlogComment[]>;
  } catch (error) {
    console.error(`Error fetching comments for ${slug}:`, error);
    throw error;
  }
};

/**
 * Publica un comentario (queda pendiente de aprobación). Requiere el token de
 * Turnstile, que el backend verifica como `cf-turnstile-response`.
 */
export const postBlogComment = async (
  slug: string,
  payload: NewCommentPayload,
  turnstileToken: string
): Promise<ApiResponse<BlogComment>> => {
  const response = await ApiService.post(`/blog/posts/${slug}/comments`, {
    ...payload,
    'cf-turnstile-response': turnstileToken,
  });
  return response.data as ApiResponse<BlogComment>;
};

/**
 * Da / quita "me gusta" a un post. Devuelve el nuevo conteo total.
 */
export const likeBlogPost = async (slug: string): Promise<number> => {
  const response = await ApiService.post<ApiResponse<{ likes: number }>>(`/blog/posts/${slug}/like`);
  return (response.data as ApiResponse<{ likes: number }>).data.likes;
};

export const unlikeBlogPost = async (slug: string): Promise<number> => {
  const response = await ApiService.post<ApiResponse<{ likes: number }>>(`/blog/posts/${slug}/unlike`);
  return (response.data as ApiResponse<{ likes: number }>).data.likes;
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
