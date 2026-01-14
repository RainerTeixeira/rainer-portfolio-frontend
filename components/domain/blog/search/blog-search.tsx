/**
 * Blog Search Components
 *
 * Componentes de busca otimizados para o blog usando hook global.
 * Estrutura consolidada com nomes descritivos e sem redundância.
 *
 * @module components/domain/blog/search
 * @author Rainer Teixeira
 * @version 3.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <BlogSearch 
 *   content={posts}
 *   onSelect={(item) => console.log(item)}
 * />
 * ```
 *
 * Características:
 * - Busca em tempo real com pontuação
 * - Filtros avançados (categorias, autores, tags)
 * - Ordenação por relevância, data, popularidade
 * - Histórico de buscas persistentes
 * - Interface responsiva com animações
 * - Acessibilidade completa
 * - Performance otimizada com useMemo/useCallback
 */

'use client';

export const dynamic = 'force-dynamic';

import { useState, useCallback, useEffect, useMemo, KeyboardEvent, ChangeEvent } from 'react';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rainersoft/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  ChevronDown,
  Loader2,
  User,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGlobalSearch, type GlobalSearchOptions } from '@/hooks/use-global-search';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Item de busca do blog
 */
export interface BlogSearchItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  author?: string;
  tags?: string[];
  url?: string;
  publishedAt?: string;
  readTime?: number;
  views?: number;
  likesCount?: number;
}

/**
 * Propriedades do componente BlogSearch
 */
export interface BlogSearchProps {
  content: BlogSearchItem[];
  onSelect?: (result: BlogSearchItem) => void;
  onResultsChange?: (results: BlogSearchItem[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  searchOptions?: GlobalSearchOptions;
  className?: string;
  placeholder?: string;
}

/**
 * Propriedades do componente BlogSearchWithFilters
 * Estende BlogSearchProps
 */
export interface BlogSearchFiltersProps extends BlogSearchProps {
  showFilters?: boolean;
  initialFilters?: BlogSearchFilterState;
}

/**
 * Estado dos filtros de busca
 */
export interface BlogSearchFilterState {
  categories: string[];
  authors: string[];
  dateRange: 'all' | 'week' | 'month' | 'quarter' | 'year';
  sortBy: 'recent' | 'popular' | 'trending' | 'mostViewed';
  tags: string[];
  minReadTime?: number;
  maxReadTime?: number;
}

// ============================================================================
// COMPONENTE PRINCIPAL - BlogSearch
// ============================================================================

/**
 * Componente principal de busca do blog
 *
 * Combina busca rápida, filtros avançados e resultados em um único componente.
 * Usa hook useGlobalSearch para performance otimizada.
 */
export function BlogSearch({
  content,
  onSelect,
  onResultsChange,
  onLoadingChange,
  searchOptions,
  className,
  placeholder = 'Buscar no blog...'
}: BlogSearchProps) {
  const router = useRouter();
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  
  // Transformar conteúdo para formato do hook de busca
  const transformedContent = useMemo(() => 
    content.map((item, index) => ({
      id: item.id || String(index),
      title: item.title,
      description: item.description || '',
      content: item.content || '',
      tags: item.tags || [],
      category: item.category || '',
      author: item.author || '',
      url: item.url || `/blog/${item.id}`,
      publishedAt: item.publishedAt || '',
      readTime: item.readTime || 0,
      views: item.views || 0,
      likesCount: item.likesCount || 0
    })), [content]);

  const searchState = useGlobalSearch(transformedContent, {
    searchType: 'scored',
    limit: 20,
    ...searchOptions
  });

  // Notifica mudanças nos resultados
  useEffect(() => {
    const blogResults = searchState.results
      .map(r => content.find(item => item.id === r.id) || r as any)
      .filter(Boolean);
    
    onResultsChange?.(blogResults);
  }, [searchState.results, content, onResultsChange]);

  // Notifica mudanças no estado de loading
  useEffect(() => {
    onLoadingChange?.(searchState.isLoading);
  }, [searchState.isLoading, onLoadingChange]);

  // Handler para seleção de resultado
  const handleSelect = useCallback((result: any) => {
    const originalItem = content.find(item => item.id === result.id);
    if (!originalItem) return;

    if (onSelect) {
      onSelect(originalItem);
    } else if (originalItem.url) {
      router.push(originalItem.url);
    }
    setSearchModalOpen(false);
  }, [router, onSelect, content]);

  // Handler para tecla de atalho (Cmd+K / Ctrl+K)
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      setSearchModalOpen(true);
    }
  }, []);

  // Configura listener para teclas de atalho
  useEffect(() => {
    const handleKeyDownGlobal = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, []);

  return (
    <div className={cn('relative w-full max-w-xl', className)}>
      {/* Campo de busca principal */}
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
        aria-hidden="true"
      />
      <Input
        placeholder={placeholder}
        value={searchState.query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => searchState.setQuery(e.target.value)}
        className="pl-10 pr-10"
        onClick={() => setSearchModalOpen(true)}
        aria-label="Buscar no blog"
      />
      <kbd 
        className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100"
        aria-label="Atalho de teclado: Command K"
      >
        <span>⌘</span>K
      </kbd>

      {/* Modal de busca */}
      {isSearchModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Modal de busca"
        >
          <div className="bg-background border rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Cabeçalho do modal */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  placeholder={placeholder}
                  value={searchState.query}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => searchState.setQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0"
                  autoFocus
                  aria-label="Campo de busca"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchModalOpen(false)}
                  aria-label="Fechar busca"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            
            {/* Conteúdo do modal */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {searchState.isLoading ? (
                // Estado de loading
                <div 
                  className="flex items-center justify-center py-6"
                  role="status"
                  aria-label="Carregando resultados"
                >
                  <Loader2 
                    className="h-6 w-6 animate-spin text-muted-foreground" 
                    aria-hidden="true"
                  />
                </div>
              ) : searchState.query.length < 2 ? (
                // Histórico de buscas recentes
                searchState.recentSearches.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Buscas Recentes
                    </h3>
                    {searchState.recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => searchState.setQuery(search)}
                        className="w-full text-left p-2 rounded hover:bg-muted flex items-center gap-2"
                        aria-label={`Buscar novamente: ${search}`}
                      >
                        <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        {search}
                      </button>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={searchState.clearRecentSearches}
                      aria-label="Limpar histórico de buscas"
                    >
                      Limpar histórico
                    </Button>
                  </div>
                )
              ) : searchState.results.length === 0 ? (
                // Estado vazio
                <div className="text-center py-6 text-muted-foreground">
                  Nenhum resultado encontrado.
                </div>
              ) : (
                // Lista de resultados
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Resultados ({searchState.results.length})
                  </h3>
                  {searchState.results.map((result) => {
                    const originalItem = content.find(item => item.id === result.id);
                    if (!originalItem) return null;

                    return (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className="w-full text-left p-3 rounded hover:bg-muted border transition-colors"
                        aria-label={`Ver ${originalItem.title}`}
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{originalItem.title}</div>
                          {originalItem.description && (
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {originalItem.description}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {originalItem.category && (
                              <Badge 
                                variant="secondary" 
                                className="text-xs"
                                aria-label={`Categoria: ${originalItem.category}`}
                              >
                                {originalItem.category}
                              </Badge>
                            )}
                            {originalItem.readTime && (
                              <span className="text-xs text-muted-foreground">
                                {originalItem.readTime} min
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE COM FILTROS - BlogSearchWithFilters
// ============================================================================

/**
 * Componente de busca com filtros avançados
 *
 * Estende BlogSearch com filtros por categoria, autor, data, tags e ordenação.
 * Oferece interface expansível para filtros avançados.
 */
export function BlogSearchWithFilters({
  content,
  onSelect,
  onResultsChange,
  onLoadingChange,
  searchOptions,
  showFilters = true,
  initialFilters,
  className,
  placeholder = 'Buscar no blog...'
}: BlogSearchFiltersProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<BlogSearchFilterState>({
    categories: [],
    authors: [],
    dateRange: 'all',
    sortBy: 'recent',
    tags: [],
    ...initialFilters
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Transformar conteúdo para formato do hook de busca
  const transformedContent = useMemo(() => 
    content.map((item, index) => ({
      id: item.id || String(index),
      title: item.title,
      description: item.description || '',
      content: item.content || '',
      tags: item.tags || [],
      category: item.category || '',
      author: item.author || '',
      url: item.url || `/blog/${item.id}`,
      publishedAt: item.publishedAt || '',
      readTime: item.readTime || 0,
      views: item.views || 0,
      likesCount: item.likesCount || 0
    })), [content]);

  const searchState = useGlobalSearch(transformedContent, {
    searchType: 'scored',
    limit: 50,
    ...searchOptions
  });

  // Aplica filtros aos resultados da busca
  const filteredResults = useMemo(() => {
    const results = searchState.results
      .map(r => content.find(item => item.id === r.id))
      .filter((item): item is BlogSearchItem => item !== undefined);

    let filtered = [...results];

    // Filtro de categorias
    if (filters.categories.length > 0) {
      filtered = filtered.filter(item =>
        item.category && filters.categories.includes(item.category)
      );
    }

    // Filtro de autores
    if (filters.authors.length > 0) {
      filtered = filtered.filter(item =>
        item.author && filters.authors.includes(item.author)
      );
    }

    // Filtro de tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(item =>
        item.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    // Filtro de tempo de leitura
    if (filters.minReadTime || filters.maxReadTime) {
      filtered = filtered.filter(item => {
        const readTime = item.readTime || 0;
        return (!filters.minReadTime || readTime >= filters.minReadTime) &&
               (!filters.maxReadTime || readTime <= filters.maxReadTime);
      });
    }

    // Filtro de data
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(item => {
        if (!item.publishedAt) return false;
        const itemDate = new Date(item.publishedAt);
        return itemDate >= cutoffDate;
      });
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
        break;
      case 'trending':
      case 'mostViewed':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }

    return filtered;
  }, [searchState.results, content, filters]);

  // Notifica mudanças nos resultados filtrados
  useEffect(() => {
    onResultsChange?.(filteredResults);
  }, [filteredResults, onResultsChange]);

  // Notifica mudanças no estado de loading
  useEffect(() => {
    onLoadingChange?.(searchState.isLoading);
  }, [searchState.isLoading, onLoadingChange]);

  // Handler para seleção de resultado
  const handleSelect = useCallback((item: BlogSearchItem) => {
    if (onSelect) {
      onSelect(item);
    } else if (item.url) {
      router.push(item.url);
    }
  }, [onSelect, router]);

  // Limpa todos os filtros
  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      authors: [],
      dateRange: 'all',
      sortBy: 'recent',
      tags: [],
    });
  }, []);

  // Conta filtros ativos
  const activeFiltersCount = 
    filters.categories.length + 
    filters.authors.length + 
    filters.tags.length + 
    (filters.dateRange !== 'all' ? 1 : 0) +
    (filters.minReadTime || filters.maxReadTime ? 1 : 0);

  // Extrai categorias únicas do conteúdo
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    content.forEach(item => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    return Array.from(categories);
  }, [content]);

  // Extrai autores únicos do conteúdo
  const uniqueAuthors = useMemo(() => {
    const authors = new Set<string>();
    content.forEach(item => {
      if (item.author) {
        authors.add(item.author);
      }
    });
    return Array.from(authors);
  }, [content]);

  // Extrai tags únicas do conteúdo
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    content.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [content]);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Barra de busca com controles */}
      <div className="flex gap-2">
        {/* Campo de busca */}
        <div className="relative flex-1">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
            aria-hidden="true" 
          />
          <Input
            placeholder={placeholder}
            value={searchState.query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => searchState.setQuery(e.target.value)}
            className="pl-10 pr-4"
            aria-label="Buscar no blog"
          />
          {searchState.query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => searchState.setQuery('')}
              aria-label="Limpar busca"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </Button>
          )}
        </div>
        
        {/* Botão de filtros */}
        {showFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
            aria-expanded={showAdvanced}
            aria-controls="advanced-filters"
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown 
              className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")}
              aria-hidden="true"
            />
          </Button>
        )}

        {/* Botão para limpar filtros */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
            aria-label={`Limpar ${activeFiltersCount} filtro(s)`}
          >
            Limpar tudo
          </Button>
        )}
      </div>

      {/* Seção de filtros avançados */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 border-t pt-4"
            id="advanced-filters"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtro de categorias */}
              <div>
                <label className="text-sm font-medium mb-2 block">Categorias</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      aria-label="Selecionar categorias"
                    >
                      Categorias
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <div className="max-h-48 overflow-y-auto p-2">
                      {uniqueCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            if (!filters.categories.includes(category)) {
                              setFilters(prev => ({ 
                                ...prev, 
                                categories: [...prev.categories, category] 
                              }));
                            }
                          }}
                          className="w-full text-left p-2 rounded hover:bg-muted flex items-center gap-2"
                          aria-label={`Adicionar categoria: ${category}`}
                        >
                          <Tag className="h-4 w-4" aria-hidden="true" />
                          {category}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {filters.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filters.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            categories: prev.categories.filter(c => c !== category) 
                          }))}
                          aria-label={`Remover categoria: ${category}`}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro de autores */}
              <div>
                <label className="text-sm font-medium mb-2 block">Autores</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      aria-label="Selecionar autores"
                    >
                      Autores
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <div className="max-h-48 overflow-y-auto p-2">
                      {uniqueAuthors.map((author) => (
                        <button
                          key={author}
                          onClick={() => {
                            if (!filters.authors.includes(author)) {
                              setFilters(prev => ({ 
                                ...prev, 
                                authors: [...prev.authors, author] 
                              }));
                            }
                          }}
                          className="w-full text-left p-2 rounded hover:bg-muted flex items-center gap-2"
                          aria-label={`Adicionar autor: ${author}`}
                        >
                          <User className="h-4 w-4" aria-hidden="true" />
                          {author}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {filters.authors.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filters.authors.map((author) => (
                      <Badge
                        key={author}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {author}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            authors: prev.authors.filter(a => a !== author) 
                          }))}
                          aria-label={`Remover autor: ${author}`}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro de período */}
              <div>
                <label className="text-sm font-medium mb-2 block">Período</label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value: 'all' | 'week' | 'month' | 'quarter' | 'year') => 
                    setFilters(prev => ({ ...prev, dateRange: value }))
                  }
                >
                  <SelectTrigger aria-label="Selecionar período">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os períodos</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                    <SelectItem value="month">Último mês</SelectItem>
                    <SelectItem value="quarter">Últimos 3 meses</SelectItem>
                    <SelectItem value="year">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ordenação */}
              <div>
                <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: 'recent' | 'popular' | 'trending' | 'mostViewed') => 
                    setFilters(prev => ({ ...prev, sortBy: value }))
                  }
                >
                  <SelectTrigger aria-label="Selecionar ordenação">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="popular">Mais curtidos</SelectItem>
                    <SelectItem value="trending">Mais vistos</SelectItem>
                    <SelectItem value="mostViewed">Mais populares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultados da busca */}
      {searchState.query && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''} encontrado{filteredResults.length !== 1 ? 's' : ''}
          </div>
          
          {filteredResults.length > 0 && (
            <div className="space-y-2">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && handleSelect(item)}
                  aria-label={`Ver artigo: ${item.title}`}
                >
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {item.description}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {item.category && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        aria-label={`Categoria: ${item.category}`}
                      >
                        {item.category}
                      </Badge>
                    )}
                    {item.author && (
                      <span className="text-xs text-muted-foreground">
                        {item.author}
                      </span>
                    )}
                    {item.readTime && (
                      <span className="text-xs text-muted-foreground">
                        {item.readTime} min
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
