/**
 * Subcategories Hook
 *
 * Hook que busca e gerencia subcategorias ativas do banco de dados.
 * Filtra apenas subcategorias (parentId != null) e ativas.
 *
 * @module components/dashboard/hooks/use-subcategories
 * @fileoverview Hook para gerenciamento de subcategorias
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { categoriesService, type Category } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useSubcategories() {
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategories = async () => {
    setLoading(true);
    setError(null);

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[useSubcategories] Buscando subcategorias...');
      }

      // Buscar apenas subcategorias (parentId != null) e ativas
      const subcategoriesList = await categoriesService.getSubcategoriesOnly();

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
