import { useState, useEffect } from 'react';
import { getBlogPosts, getBlogCategories } from '@/services/blogService';
import type { BlogListPost } from '@/pages/blog/types';

/**
 * Carga los posts del blog y la lista de categorías para el listado.
 * El filtrado/búsqueda (estado de UI) se queda en BlogPage.
 */
export const useBlogList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogListPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [catRes, postsRes] = await Promise.all([
          getBlogCategories<{ name: string }[]>(),
          getBlogPosts<BlogListPost[]>(),
        ]);
        setCategories(['Todos', ...(catRes.data || []).map((c) => c.name)]);
        setBlogPosts(postsRes.data || []);
      } catch {
        setError('No se pudieron cargar los artículos. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { blogPosts, categories, loading, error };
};
