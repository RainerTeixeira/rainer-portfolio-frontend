/**
 * Categories Hook
 *
 * Hook que gerencia busca e listagem de categorias públicas do blog.
 * Filtra apenas categorias ativas.
 *
 * @module components/domain/blog/hooks/use-categories
 * @fileoverview Hook para gerenciamento de categorias do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { publicBlogCategories as categoriesService } from '@/lib/api';
import type { PostCategory as Category } from '@/lib/api/types/public/blog';
import { useEffect, useState } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);

      try {
        const response = await categoriesService.getPublicCategories();
        const data = (response as any)?.data ?? response ?? [];
        const items: Category[] = Array.isArray(data) ? data : data?.data || [];
        setCategories(items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar categorias'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}


