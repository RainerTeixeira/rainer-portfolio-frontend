/**
 * Search Hook
 *
 * Hook que gerencia busca de posts com autocomplete, debounce, histórico
 * de buscas, atalho de teclado e persistência em localStorage.
 *
 * @module components/domain/blog/hooks/use-search
 * @fileoverview Hook para gerenciamento de busca de posts
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { postsService } from '@/lib/api/services';
import { PostStatus } from '@/lib/api/types/posts';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Interface de resultado de busca
 *
 * @interface SearchResult
 * @property {string} id - ID único do resultado
 * @property {string} title - Título do resultado
 * @property {string} slug - Slug/URL do resultado
 * @property {'post' | 'category' | 'author'} type - Tipo de resultado
 * @property {string} [category] - Categoria (opcional)
 * @property {string} [excerpt] - Trecho do conteúdo (opcional)
 */
export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: 'post' | 'category' | 'author';
  category?: string;
  excerpt?: string;
}

/**
 * Hook useSearch
 *
 * Gerencia todo o fluxo de busca: query, debounce, resultados,
 * histórico e atalhos de teclado.
 *
 * @returns {Object} Estado e funções de busca
 * @returns {boolean} open - Se o modal de busca está aberto
 * @returns {Function} setOpen - Função para abrir/fechar modal
 * @returns {string} query - Query de busca atual
 * @returns {Function} setQuery - Função para atualizar query
 * @returns {SearchResult[]} results - Array de resultados
 * @returns {string[]} recentSearches - Array de buscas recentes
 * @returns {boolean} isLoading - Se está carregando resultados
 * @returns {Function} handleSelect - Função ao selecionar resultado
 * @returns {Function} clearRecentSearches - Função para limpar histórico
 *
 * @example
 * import { useSearch } from '@/components/domain/blog/hooks'
 *
 * function SearchBar() {
 *   const {
 *     open,
 *     setOpen,
 *     query,
 *     setQuery,
 *     results,
 *     recentSearches,
 *     isLoading,
 *     handleSelect,
 *     clearRecentSearches
 *   } = useSearch()
 *
 *   return (
 *     <CommandDialog open={open} onOpenChange={setOpen}>
 *       <CommandInput value={query} onValueChange={setQuery} />
 *       <CommandList>
 *         {results.map(result => (
 *           <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
 *             {result.title}
 *           </CommandItem>
 *         ))}
 *       </CommandList>
 *     </CommandDialog>
 *   )
 * }
 */
export function useSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  // Carregar buscas recentes do localStorage
  useEffect(() => {
    const recent = localStorage.getItem('recent_searches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  }, []);

  // Atalho de teclado (Ctrl/Cmd + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Buscar com debounce usando API real
  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      // Buscar posts usando postsService com filtro de busca
      const response = await postsService.listPosts({
        search: searchQuery,
        status: PostStatus.PUBLISHED,
        limit: 20,
      });

      if (response.posts) {
        // Converter posts da API para SearchResult
        const searchResults: SearchResult[] = response.posts.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          type: 'post' as const,
          category: post.subcategory?.name,
          excerpt: post.excerpt,
        }));

        setResults(searchResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Erro ao buscar:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce da busca
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      search(query);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, search]);

  /**
   * Handler ao selecionar um resultado
   * Salva no histórico e retorna o resultado
   */
  function handleSelect(result: SearchResult) {
    // Salvar busca recente
    const newRecent = [
      result.title,
      ...recentSearches.filter(r => r !== result.title),
    ].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recent_searches', JSON.stringify(newRecent));

    setOpen(false);
    setQuery('');

    return result;
  }

  /**
   * Limpar histórico de buscas
   */
  function clearRecentSearches() {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  }

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    recentSearches,
    isLoading,
    handleSelect,
    clearRecentSearches,
  };
}


