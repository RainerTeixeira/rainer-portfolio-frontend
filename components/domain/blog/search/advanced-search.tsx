'use client';

import { useState, useEffect, useMemo } from 'react';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { Command, CommandGroup, CommandItem, CommandList } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { Skeleton } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { 
  Search, 
  Filter, 
  X, 
  Calendar, 
  TrendingUp, 
  Eye, 
  Heart, 
  Clock,
  User,
  Tag,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicBlogCategories, publicBlogPosts } from '@/lib/api';
import type { PostListItem, PostCategory, PostAuthor } from '@/lib/api/types/public/blog';
import { PostStatus } from '@/lib/api/types/public/blog';

interface AdvancedSearchProps {
  onResultsChange?: (results: PostListItem[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  className?: string;
}

interface SearchFilters {
  query: string;
  categories: string[];
  authors: string[];
  dateRange: 'all' | 'week' | 'month' | 'quarter' | 'year';
  sortBy: 'recent' | 'popular' | 'trending' | 'mostViewed';
  tags: string[];
  minReadTime?: number;
  maxReadTime?: number;
}

export function AdvancedSearch({ 
  onResultsChange, 
  onLoadingChange, 
  className 
}: AdvancedSearchProps) {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [authors, setAuthors] = useState<PostAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    authors: [],
    dateRange: 'all',
    sortBy: 'recent',
    tags: [],
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  // Aplicar filtros e buscar
  useEffect(() => {
    applyFilters();
  }, [filters]);

  async function loadData() {
    try {
      setLoading(true);
      onLoadingChange?.(true);

      // Carregar posts, categorias e autores em paralelo
      const [postsResponse, categoriesResponse] = await Promise.all([
        publicBlogPosts.getPublicPosts({
          status: PostStatus.PUBLISHED,
          limit: 100,
        }),
        publicBlogCategories.getPublicCategories(),
      ]);

      const postsPayload = (postsResponse as any)?.data ?? postsResponse;
      const postsData: PostListItem[] = Array.isArray(postsPayload)
        ? postsPayload
        : [];

      const categoriesPayload = (categoriesResponse as any)?.data ?? categoriesResponse;
      const categoriesData: PostCategory[] = Array.isArray(categoriesPayload)
        ? categoriesPayload
        : [];
      
      setPosts(postsData);
      setCategories(categoriesData);
      
      // Extrair autores únicos dos posts
      const uniqueAuthors = postsData.reduce((acc: PostAuthor[], post) => {
        if (post.author && !acc.find(a => a.id === post.author.id)) {
          acc.push(post.author);
        }
        return acc;
      }, []);
      setAuthors(uniqueAuthors);

      onResultsChange?.(postsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  }

  function applyFilters() {
    let filteredPosts = [...posts];

    // Filtro de texto
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category?.name.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.name.toLowerCase().includes(query))
      );
    }

    // Filtro de categorias
    if (filters.categories.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        post.category && filters.categories.includes(post.category.name)
      );
    }

    // Filtro de autores
    if (filters.authors.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        post.author && filters.authors.includes(post.author.fullName || post.author.nickname)
      );
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

      filteredPosts = filteredPosts.filter(post => {
        const postDate = new Date(post.publishedAt || post.createdAt || 0);
        return postDate >= cutoffDate;
      });
    }

    // Filtro de tags
    if (filters.tags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags?.some(tag => filters.tags.includes(tag.name))
      );
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'popular':
        filteredPosts.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
        break;
      case 'trending':
        filteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'mostViewed':
        filteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'recent':
      default:
        filteredPosts.sort((a, b) => 
          new Date(b.publishedAt || b.createdAt || 0).getTime() - 
          new Date(a.publishedAt || a.createdAt || 0).getTime()
        );
        break;
    }

    onResultsChange?.(filteredPosts);
  }

  function updateFilter<K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function addCategory(category: string) {
    if (!filters.categories.includes(category)) {
      updateFilter('categories', [...filters.categories, category]);
    }
  }

  function removeCategory(category: string) {
    updateFilter('categories', filters.categories.filter(c => c !== category));
  }

  function addAuthor(author: string) {
    if (!filters.authors.includes(author)) {
      updateFilter('authors', [...filters.authors, author]);
    }
  }

  function removeAuthor(author: string) {
    updateFilter('authors', filters.authors.filter(a => a !== author));
  }

  function clearAllFilters() {
    setFilters({
      query: '',
      categories: [],
      authors: [],
      dateRange: 'all',
      sortBy: 'recent',
      tags: [],
    });
  }

  const activeFiltersCount = 
    filters.categories.length + 
    filters.authors.length + 
    filters.tags.length + 
    (filters.dateRange !== 'all' ? 1 : 0);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag.name));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  if (loading && posts.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        {/* Busca Principal */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar artigos, categorias, autores..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              className="pl-10 pr-4"
            />
            {filters.query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => updateFilter('query', '')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")} />
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Limpar tudo
            </Button>
          )}
        </div>

        {/* Filtros Avançados */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 border-t pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Filtro de Categorias */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categorias</label>
                  <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Selecionar categorias
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0" align="start">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                onSelect={() => {
                                  addCategory(category.name);
                                  setSearchOpen(false);
                                }}
                              >
                                <Tag className="mr-2 h-4 w-4" />
                                {category.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  
                  {/* Categorias selecionadas */}
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
                            onClick={() => removeCategory(category)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtro de Autores */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Autores</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Selecionar autores
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0" align="start">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {authors.map((author) => (
                              <CommandItem
                                key={author.id}
                                onSelect={() => addAuthor(author.fullName || author.nickname)}
                              >
                                <User className="mr-2 h-4 w-4" />
                                {author.fullName || author.nickname}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  
                  {/* Autores selecionados */}
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
                            onClick={() => removeAuthor(author)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtro de Data */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Período</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => updateFilter('dateRange', e.target.value as SearchFilters['dateRange'])}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="all">Todos os períodos</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mês</option>
                    <option value="quarter">Últimos 3 meses</option>
                    <option value="year">Último ano</option>
                  </select>
                </div>

                {/* Ordenação */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value as SearchFilters['sortBy'])}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="recent">Mais recentes</option>
                    <option value="popular">Mais curtidos</option>
                    <option value="trending">Mais vistos</option>
                    <option value="mostViewed">Mais populares</option>
                  </select>
                </div>
              </div>

              {/* Estatísticas da busca */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Search className="h-4 w-4" />
                  <span>Busca avançada</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>{activeFiltersCount} filtros ativos</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
