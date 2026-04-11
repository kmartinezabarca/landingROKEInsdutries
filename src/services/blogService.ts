import apiClient from '../lib/apiClient';
import type { ApiResponse, BlogPost, BlogCategory, BlogPostsParams } from '../types/api';

/** Obtiene todos los posts del blog con filtros opcionales */
export const getBlogPosts = async (
  params: BlogPostsParams = {}
): Promise<ApiResponse<BlogPost[]>> => {
  const response = await apiClient.get<ApiResponse<BlogPost[]>>('/blog/posts', { params });
  return response.data;
};

/** Obtiene un post específico por slug */
export const getBlogPostBySlug = async (slug: string): Promise<ApiResponse<BlogPost>> => {
  const response = await apiClient.get<ApiResponse<BlogPost>>(`/blog/posts/${slug}`);
  return response.data;
};

/** Obtiene todas las categorías del blog */
export const getBlogCategories = async (): Promise<ApiResponse<BlogCategory[]>> => {
  const response = await apiClient.get<ApiResponse<BlogCategory[]>>('/blog/categories');
  return response.data;
};

/** Obtiene posts filtrados por categoría */
export const getBlogPostsByCategory = async (
  categorySlug: string,
  params: BlogPostsParams = {}
): Promise<ApiResponse<BlogPost[]>> => {
  const response = await apiClient.get<ApiResponse<BlogPost[]>>(
    `/blog/categories/${categorySlug}/posts`,
    { params }
  );
  return response.data;
};
