/**
 * Global Search Hook
 *
 * Hook universal para busca de conteúdo com cache, histórico e sugestões.
 * Usa @rainersoft/utils para lógica de busca e pode ser reutilizado em projetos.
 *
 * @module hooks/use-global-search
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * const search = useGlobalSearch(posts, {
 *   searchType: 'scored',
 *   fields: ['title', 'description']
 * });
 * 
 * // Executar busca
 * search.search('react');
 * 
 * // Limpar histórico
 * search.clearRecentSearches();
 * ```
 *
 * Características:
 * - Cache de resultados com expiração
 * - Histórico de buscas persistentes
 * - Sugestões inteligentes
 * - Múltiplos algoritmos de busca (simple, scored, fuzzy)
 * - Tipagem completa TypeScript
 * - Performance otimizada
 */

'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  searchContent, 
  searchWithScore, 
  fuzzySearch, 
  type SearchOptions 
} from '@rainersoft/utils';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Opções de busca global
 * 
 * @interface GlobalSearchOptions
 * @extends SearchOptions
 * @property {'simple' | 'scored' | 'fuzzy'} [searchType] - Tipo de algoritmo de busca
 * @property {boolean} [useCache] - Usar cache para resultados
 * @property {number} [cacheTime] - Tempo de expiração do cache em milissegundos
 * @property {number} [limit] - Limite máximo de resultados
 */
export interface GlobalSearchOptions extends SearchOptions {
  searchType?: 'simple' | 'scored' | 'fuzzy';
  useCache?: boolean;
  cacheTime?: number;
  limit?: number;
}

/**
 * Resultado de busca com metadados
 * 
 * @interface SearchResult
 * @template T - Tipo do item original
 * @property {T} item - Item encontrado
 * @property {number} [score] - Pontuação de relevância (apenas para busca scored)
 * @property {string} type - Categoria/tipo do resultado
 * @property {string} id - Identificador único
 * @property {string} title - Título para exibição
 * @property {string} [description] - Descrição breve
 * @property {string} [url] - URL para navegação
 * @property {Record<string, any>} [metadata] - Metadados adicionais
 */
export interface SearchResult<T = any> {
  item: T;
  score?: number;
  type: string;
  id: string;
  title: string;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
}

/**
 * Sugestão de busca
 * 
 * @interface SearchSuggestion
 * @property {string} id - Identificador único da sugestão
 * @property {string} text - Texto da sugestão
 * @property {'history' | 'content'} type - Tipo de sugestão
 * @property {string} [description] - Descrição adicional
 * @property {() => void} action - Ação ao selecionar a sugestão
 */
interface SearchSuggestion {
  id: string;
  text: string;
  type: 'history' | 'content';
  description?: string;
  action: () => void;
}

/**
 * Item de cache
 * 
 * @interface CacheItem
 * @template T - Tipo do item
 * @property {SearchResult<T>[]} results - Resultados em cache
 * @property {number} timestamp - Timestamp de criação do cache
 */
interface CacheItem<T> {
  results: SearchResult<T>[];
  timestamp: number;
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

/**
 * Hook de busca global
 * 
 * @template T - Tipo dos itens a serem buscados
 * @param {T[]} content - Array de conteúdo disponível para busca
 * @param {GlobalSearchOptions} [options] - Opções de configuração da busca
 * @returns {Object} Estado e ações da busca
 * 
 * @remarks
 * Retorna um objeto com:
 * - query: Consulta atual
 * - results: Resultados da busca
 * - isLoading: Estado de carregamento
 * - recentSearches: Histórico de buscas
 * - suggestions: Sugestões inteligentes
 * - search: Função para executar busca
 * - setQuery: Função para definir query
 * - clearRecentSearches: Limpar histórico
 * - clearCache: Limpar cache
 * - hasResults: Booleano indicando se há resultados
 * - hasQuery: Booleano indicando se há query
 * - resultCount: Número de resultados
 */
export function useGlobalSearch<T extends Record<string, any>>(
  content: T[],
  options: GlobalSearchOptions = {}
) {
  // ========================================================================
  // CONFIGURAÇÃO INICIAL
  // ========================================================================

  const {
    searchType = 'simple',
    useCache = true,
    cacheTime = 5 * 60 * 1000, // 5 minutos
    limit = 20,
    fields = ['title', 'description', 'content', 'tags'],
    caseSensitive = false,
    exactMatch = false,
  } = options;

  // ========================================================================
  // ESTADOS
  // ========================================================================

  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult<T>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [cache, setCache] = useState<Map<string, CacheItem<T>>>(new Map());

  // ========================================================================
  // EFEITOS
  // ========================================================================

  /**
   * Carrega histórico de buscas do localStorage
   * @effect
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('global-search-recent');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
          setRecentSearches(parsed.slice(0, 10));
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar histórico de busca:', error);
    }
  }, []);

  /**
   * Limpa cache antigo periodicamente
   * @effect
   */
  useEffect(() => {
    if (!useCache) return;

    const interval = setInterval(() => {
      setCache(prev => {
        const now = Date.now();
        const cleaned = new Map<string, CacheItem<T>>();
        
        prev.forEach((value, key) => {
          if (now - value.timestamp < cacheTime) {
            cleaned.set(key, value);
          }
        });
        
        return cleaned;
      });
    }, cacheTime);

    return () => clearInterval(interval);
  }, [useCache, cacheTime]);

  // ========================================================================
  // FUNÇÕES AUXILIARES
  // ========================================================================

  /**
   * Salva consulta no histórico de buscas
   * @param {string} searchQuery - Consulta a ser salva
   */
  const saveRecentSearch = useCallback((searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q !== trimmedQuery);
      const updated = [trimmedQuery, ...filtered].slice(0, 10);
      
      try {
        localStorage.setItem('global-search-recent', JSON.stringify(updated));
      } catch (error) {
        console.warn('Erro ao salvar histórico de busca:', error);
      }
      
      return updated;
    });
  }, []);

  /**
   * Transforma item original em formato de resultado de busca
   * @param {T} item - Item original
   * @param {number} index - Índice do item no array
   * @returns {SearchResult<T>} Resultado formatado
   */
  const transformToSearchResult = useCallback((item: T, index: number): SearchResult<T> => {
    const id = String(item.id || item._id || index);
    const title = String(item.title || item.name || item.label || id);
    const description = item.description || item.excerpt || item.summary;
    
    return {
      item,
      id,
      title,
      description,
      type: String(item.type || item.category || 'default'),
      url: item.url || item.slug || item.link,
      metadata: {
        category: item.category,
        tags: item.tags,
        author: item.author,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        ...(item.metadata || {})
      }
    };
  }, []);

  // ========================================================================
  // FUNÇÃO PRINCIPAL DE BUSCA
  // ========================================================================

  /**
   * Executa busca com base na consulta
   * @param {string} searchQuery - Consulta de busca
   * @returns {Promise<void>}
   */
  const search = useCallback(async (searchQuery: string): Promise<void> => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setQuery(trimmedQuery);

    try {
      // Verificar cache
      if (useCache) {
        const cached = cache.get(trimmedQuery);
        if (cached && Date.now() - cached.timestamp < cacheTime) {
          setResults(cached.results);
          setIsLoading(false);
          return;
        }
      }

      let searchResults: T[] = [];
      
      // Selecionar algoritmo de busca
      switch (searchType) {
        case 'scored':
          searchResults = searchWithScore(trimmedQuery, content, {
            fields,
            caseSensitive,
            exactMatch
          });
          break;
        case 'fuzzy':
          searchResults = fuzzySearch(trimmedQuery, content, {
            fields,
            caseSensitive,
            exactMatch,
            threshold: 0.6
          });
          break;
        case 'simple':
        default:
          searchResults = searchContent(trimmedQuery, content, {
            fields,
            caseSensitive,
            exactMatch
          });
          break;
      }

      // Transformar e limitar resultados
      const transformedResults = searchResults
        .slice(0, limit)
        .map(transformToSearchResult);

      // Atualizar cache
      if (useCache) {
        const newCache = new Map(cache);
        newCache.set(trimmedQuery, {
          results: transformedResults,
          timestamp: Date.now()
        });
        setCache(newCache);
      }

      setResults(transformedResults);
      saveRecentSearch(trimmedQuery);

    } catch (error) {
      console.error('Erro na busca:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    content, 
    searchType, 
    useCache, 
    cacheTime, 
    limit, 
    fields, 
    caseSensitive, 
    exactMatch, 
    transformToSearchResult, 
    cache, 
    saveRecentSearch
  ]);

  // ========================================================================
  // AÇÕES
  // ========================================================================

  /**
   * Limpa histórico de buscas
   */
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('global-search-recent');
    } catch (error) {
      console.warn('Erro ao limpar histórico de busca:', error);
    }
  }, []);

  /**
   * Limpa cache de resultados
   */
  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  /**
   * Gera sugestões inteligentes baseadas na query e histórico
   * @type {SearchSuggestion[]}
   */
  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const trimmedQuery = query.trim();
    
    // Sem query: mostrar histórico
    if (!trimmedQuery) {
      return recentSearches.map(searchTerm => ({
        id: `recent-${searchTerm}`,
        text: searchTerm,
        type: 'history' as const,
        action: () => {
          setQuery(searchTerm);
          search(searchTerm);
        }
      }));
    }

    // Com query: sugerir conteúdo relevante
    const contentSuggestions = content
      .filter(item => {
        const itemText = String(item.title || item.name || item.label || '').toLowerCase();
        return itemText.includes(trimmedQuery.toLowerCase());
      })
      .slice(0, 5)
      .map((item, index) => ({
        id: `suggestion-${item.id || index}`,
        text: String(item.title || item.name || item.label || `Item ${index}`),
        type: 'content' as const,
        description: item.description || item.excerpt,
        action: () => {
          const searchText = String(item.title || item.name || item.label || `Item ${index}`);
          setQuery(searchText);
          search(searchText);
        }
      }));

    return contentSuggestions;
  }, [query, recentSearches, content, search]);

  /**
   * Booleano indicando se há resultados
   * @type {boolean}
   */
  const hasResults = useMemo(() => results.length > 0, [results]);

  /**
   * Booleano indicando se há query ativa
   * @type {boolean}
   */
  const hasQuery = useMemo(() => query.trim().length > 0, [query]);

  /**
   * Contador de resultados
   * @type {number}
   */
  const resultCount = useMemo(() => results.length, [results]);

  // ========================================================================
  // RETORNO DO HOOK
  // ========================================================================

  return {
    // Estado
    query,
    results,
    isLoading,
    recentSearches,
    suggestions,
    
    // Ações
    search,
    setQuery,
    clearRecentSearches,
    clearCache,
    
    // Utilitários
    hasResults,
    hasQuery,
    resultCount
  };
}

// ============================================================================
// HOOK ESPECÍFICO PARA BLOG
// ============================================================================

/**
 * Interface para posts de blog
 * @interface BlogPost
 */
interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  slug: string;
  category?: { name: string };
  author?: { fullName?: string; nickname?: string };
  tags?: string[];
  readTime?: number;
  views?: number;
  likesCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Hook para busca de blog específico
 * 
 * @param {BlogPost[]} posts - Array de posts do blog
 * @param {GlobalSearchOptions} [options] - Opções de configuração da busca
 * @returns {Object} Estado e ações da busca para blog
 */
export function useBlogSearch(
  posts: BlogPost[], 
  options?: GlobalSearchOptions
) {
  const blogOptions: GlobalSearchOptions = {
    fields: ['title', 'excerpt', 'content', 'tags'],
    searchType: 'scored',
    limit: 10,
    ...options
  };

  const searchState = useGlobalSearch<BlogPost>(posts, blogOptions);

  /**
   * Transforma resultados para formato específico de blog
   * @type {SearchResult<BlogPost>[]}
   */
  const blogResults = useMemo(() => {
    return searchState.results.map(result => ({
      ...result,
      type: 'post' as const,
      url: `/blog/${result.item.slug}`,
      metadata: {
        ...result.metadata,
        category: result.item.category?.name,
        author: result.item.author?.fullName || result.item.author?.nickname,
        readTime: result.item.readTime,
        views: result.item.views,
        likesCount: result.item.likesCount,
        createdAt: result.item.createdAt,
        updatedAt: result.item.updatedAt
      }
    }));
  }, [searchState.results]);

  return {
    ...searchState,
    results: blogResults
  };
}

// ============================================================================
// TIPOS DE RETORNO PARA USO EXTERNO
// ============================================================================

/**
 * Tipo de retorno do hook useGlobalSearch
 * @typedef {ReturnType<typeof useGlobalSearch>} UseGlobalSearchReturn
 */
export type UseGlobalSearchReturn<T extends Record<string, any>> = ReturnType<typeof useGlobalSearch<T>>;

/**
 * Tipo de retorno do hook useBlogSearch
 * @typedef {ReturnType<typeof useBlogSearch>} UseBlogSearchReturn
 */
export type UseBlogSearchReturn = ReturnType<typeof useBlogSearch>;