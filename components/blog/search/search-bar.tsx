/**
 * Barra de Busca
 * 
 * Componente de busca com autocomplete e atalho de teclado
 * 
 * @fileoverview Search bar component
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Search, Loader2, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  slug: string
  type: "post" | "category" | "author"
  category?: string
  excerpt?: string
}

interface SearchBarProps {
  variant?: "default" | "compact"
  placeholder?: string
  className?: string
}

export function SearchBar({ 
  variant = "default",
  placeholder = "Buscar artigos...",
  className 
}: SearchBarProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined)

  // Carregar buscas recentes do localStorage
  useEffect(() => {
    const recent = localStorage.getItem("recent_searches")
    if (recent) {
      setRecentSearches(JSON.parse(recent))
    }
  }, [])

  // Atalho de teclado (Ctrl/Cmd + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Buscar com debounce
  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      
      if (!response.ok) {
        throw new Error("Erro na busca")
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("Erro ao buscar:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce da busca
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      search(query)
    }, 300)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query, search])

  function handleSelect(result: SearchResult) {
    // Salvar busca recente
    const newRecent = [result.title, ...recentSearches.filter(r => r !== result.title)].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem("recent_searches", JSON.stringify(newRecent))

    // Navegar
    if (result.type === "post") {
      router.push(`/blog/${result.slug}`)
    } else if (result.type === "category") {
      router.push(`/blog?category=${result.slug}`)
    } else if (result.type === "author") {
      router.push(`/blog?author=${result.slug}`)
    }

    setOpen(false)
    setQuery("")
  }

  function clearRecentSearches() {
    setRecentSearches([])
    localStorage.removeItem("recent_searches")
  }

  if (variant === "compact") {
    return (
      <>
        <Button
          variant="outline"
          className={cn(
            "relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
            className
          )}
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="inline-block">{placeholder}</span>
          <kbd className="pointer-events-none absolute right-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
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
    )
  }

  return (
    <>
      <div className={cn("relative w-full max-w-xl", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-10 pr-10"
          onClick={() => setOpen(true)}
          readOnly
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
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
  )
}

// Componente interno do dialog
interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  onQueryChange: (query: string) => void
  results: SearchResult[]
  recentSearches: string[]
  isLoading: boolean
  onSelect: (result: SearchResult) => void
  onClearRecent: () => void
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
                  <CommandItem key={index} onSelect={() => onQueryChange(search)}>
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
            {results.filter(r => r.type === "post").length > 0 && (
              <CommandGroup heading="Artigos">
                {results
                  .filter(r => r.type === "post")
                  .map((result) => (
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
            {results.filter(r => r.type === "category").length > 0 && (
              <CommandGroup heading="Categorias">
                {results
                  .filter(r => r.type === "category")
                  .map((result) => (
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
            {results.filter(r => r.type === "author").length > 0 && (
              <CommandGroup heading="Autores">
                {results
                  .filter(r => r.type === "author")
                  .map((result) => (
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
  )
}

