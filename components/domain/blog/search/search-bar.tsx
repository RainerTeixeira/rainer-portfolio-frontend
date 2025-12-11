/**
 * Search Bar Component
 *
 * Barra de busca com autocomplete e atalho de teclado. Busca em tempo real
 * com resultados instantâneos, histórico de buscas recentes e integração
 * com hook useSearch.
 *
 * @module components/domain/blog/search/search-bar
 * @fileoverview Barra de busca com autocomplete e atalhos
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Variante padrão
 * <SearchBar />
 *
 * // Variante compacta
 * <SearchBar variant="compact" placeholder="Buscar..." />
 * ```
 *
 * Características:
 * - Busca em tempo real
 * - Autocomplete com resultados instantâneos
 * - Atalho de teclado (Ctrl+K / Cmd+K)
 * - Histórico de buscas recentes
 * - Trending searches
 * - Integração com hook useSearch
 * - Design responsivo
 * - Acessibilidade completa
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { Loader2, Search, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearch, type SearchResult } from '../hooks';

interface SearchBarProps {
  variant?: 'default' | 'compact';
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  variant = 'default',
  placeholder = 'Buscar artigos...',
  className,
}: SearchBarProps) {
  const router = useRouter();
  const {
    open,
    setOpen,
    query,
    setQuery,
    results,
    recentSearches,
    isLoading,
    handleSelect: handleSearchSelect,
    clearRecentSearches,
  } = useSearch();

  function handleSelect(result: SearchResult) {
    // Usar o hook para salvar no histórico
    handleSearchSelect(result);

    // Navegar para o resultado
    if (result.type === 'post') {
      router.push(`/blog/${result.slug}`);
    } else if (result.type === 'category') {
      router.push(`/blog?category=${result.slug}`);
    } else if (result.type === 'author') {
      router.push(`/blog?author=${result.slug}`);
    }
  }

  if (variant === 'compact') {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64',
            className
          )}
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="inline-block">{placeholder}</span>
          <kbd className="pointer-events-none absolute right-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
            <span>⌘</span>K
          </kbd>
        </Button>

        <SearchDialog
          open={open}
          onOpenChange={setOpen}
          query={query}
          onQueryChange={setQuery}
          results={results}
          recentSearches={recentSearches}
          isLoading={isLoading}
          onSelect={handleSelect}
          onClearRecent={clearRecentSearches}
        />
      </>
    );
  }

  return (
    <>
      <div className={cn('relative w-full max-w-xl', className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10"
          onClick={() => setOpen(true)}
          readOnly
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
          <span>⌘</span>K
        </kbd>
      </div>

      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        results={results}
        recentSearches={recentSearches}
        isLoading={isLoading}
        onSelect={handleSelect}
        onClearRecent={clearRecentSearches}
      />
    </>
  );
}

// Componente interno do dialog
interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  results: SearchResult[];
  recentSearches: string[];
  isLoading: boolean;
  onSelect: (result: SearchResult) => void;
  onClearRecent: () => void;
}

function SearchDialog({
  open,
  onOpenChange,
  query,
  onQueryChange,
  results,
  recentSearches,
  isLoading,
  onSelect,
  onClearRecent,
}: SearchDialogProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Digite para buscar..."
        value={query}
        onValueChange={onQueryChange}
      />
      <CommandList>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : query.length < 2 ? (
          // Mostrar buscas recentes se não há query
          recentSearches.length > 0 && (
            <>
              <CommandGroup heading="Buscas Recentes">
                {recentSearches.map((search, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => onQueryChange(search)}
                  >
                    <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                    {search}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={onClearRecent}
                >
                  Limpar histórico
                </Button>
              </div>
            </>
          )
        ) : results.length === 0 ? (
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        ) : (
          <>
            {/* Posts */}
            {results.filter(r => r.type === 'post').length > 0 && (
              <CommandGroup heading="Artigos">
                {results
                  .filter(r => r.type === 'post')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => onSelect(result)}
                      className="flex items-start gap-3 py-3"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">{result.title}</div>
                        {result.excerpt && (
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {result.excerpt}
                          </div>
                        )}
                        {result.category && (
                          <Badge variant="secondary" className="text-xs">
                            {result.category}
                          </Badge>
                        )}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}

            {/* Categorias */}
            {results.filter(r => r.type === 'category').length > 0 && (
              <CommandGroup heading="Categorias">
                {results
                  .filter(r => r.type === 'category')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => onSelect(result)}
                    >
                      <Badge variant="outline" className="mr-2">
                        Categoria
                      </Badge>
                      {result.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}

            {/* Autores */}
            {results.filter(r => r.type === 'author').length > 0 && (
              <CommandGroup heading="Autores">
                {results
                  .filter(r => r.type === 'author')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => onSelect(result)}
                    >
                      <Badge variant="outline" className="mr-2">
                        Autor
                      </Badge>
                      {result.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}


