/**
 * Subcategories Hook
 *
 * Hook que busca e gerencia subcategorias ativas do banco de dados.
 * Filtra apenas subcategorias (parentId != null) e ativas.
 *
 * @module components/domain/dashboard/hooks/use-subcategories
 * @fileoverview Hook para gerenciamento de subcategorias
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { publicBlogCategories } from '@/lib/api';
import type { PostCategory } from '@/lib/api/types/public/blog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useSubcategories() {
  const [subcategories, setSubcategories] = useState<PostCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategories = async () => {
    setLoading(true);
    setError(null);

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[useSubcategories] Buscando subcategorias...');
      }

      // Buscar todas as categorias e filtrar apenas subcategorias (parentId definido)
      const categories = await publicBlogCategories.getPublicCategories();
      const subcategoriesList = categories.filter(c => !!c.parentId);

      if (process.env.NODE_ENV === 'development') {
        console.log(
          '[useSubcategories] Subcategorias encontradas:',
          subcategoriesList.length
        );
      }

      setSubcategories(subcategoriesList);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao buscar subcategorias';
      console.error('[useSubcategories] Erro:', errorMessage);
      setError(errorMessage);
      toast.error('Erro ao carregar subcategorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  return {
    subcategories,
    loading,
    error,
    refetch: fetchSubcategories,
  };
}


