import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBlogPosts, getBlogPostBySlug, getBlogCategories, getBlogPostsByCategory } from '@/services/blogService';

// Mock del apiClient completo
vi.mock('@/lib/apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import apiClient from '@/lib/apiClient';

const mockPosts = [
  {
    uuid: 'abc-123',
    title: 'Cómo elegir tu plan de hosting',
    slug: 'como-elegir-plan-hosting',
    excerpt: 'Guía completa para elegir el mejor plan.',
    content: 'Contenido completo...',
    image: null,
    is_featured: true,
    isFeatured: true,
    published_at: '2026-01-01T00:00:00Z',
    publishedAt: '2026-01-01T00:00:00Z',
    read_time: 5,
    readTime: 5,
    category: { id: 1, name: 'Hosting', slug: 'hosting' },
    author_name: 'ROKE Team',
    authorName: 'ROKE Team',
  },
];

const mockCategories = [
  { id: 1, name: 'Hosting', slug: 'hosting' },
  { id: 2, name: 'Gaming', slug: 'gaming' },
];

describe('blogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBlogPosts', () => {
    it('obtiene la lista de posts correctamente', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockPosts, meta: { current_page: 1, total: 1 } },
      });

      const result = await getBlogPosts();
      expect(apiClient.get).toHaveBeenCalledWith('/blog/posts', { params: {} });
      expect(result.data).toEqual(mockPosts);
    });

    it('pasa los parámetros de filtrado al API', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { data: [] } });

      await getBlogPosts({ search: 'hosting', page: 2 });
      expect(apiClient.get).toHaveBeenCalledWith('/blog/posts', {
        params: { search: 'hosting', page: 2 },
      });
    });

    it('propaga el error cuando el API falla', async () => {
      const error = new Error('Network Error');
      vi.mocked(apiClient.get).mockRejectedValueOnce(error);

      await expect(getBlogPosts()).rejects.toThrow('Network Error');
    });
  });

  describe('getBlogPostBySlug', () => {
    it('obtiene un post por su slug', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockPosts[0] },
      });

      const result = await getBlogPostBySlug('como-elegir-plan-hosting');
      expect(apiClient.get).toHaveBeenCalledWith('/blog/posts/como-elegir-plan-hosting');
      expect(result.data).toEqual(mockPosts[0]);
    });
  });

  describe('getBlogCategories', () => {
    it('obtiene las categorías del blog', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockCategories },
      });

      const result = await getBlogCategories();
      expect(apiClient.get).toHaveBeenCalledWith('/blog/categories');
      expect(result.data).toEqual(mockCategories);
    });
  });

  describe('getBlogPostsByCategory', () => {
    it('obtiene posts filtrados por categoría', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockPosts },
      });

      await getBlogPostsByCategory('hosting');
      expect(apiClient.get).toHaveBeenCalledWith('/blog/categories/hosting/posts', {
        params: {},
      });
    });
  });
});
