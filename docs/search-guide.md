# 📚 Documentação: Sistema de Busca Global

## 🎯 **Visão Geral**

O sistema de busca global foi projetado para ser **universal e reutilizável** em qualquer projeto React/Next.js. Ele combina a potência do `@rainersoft/utils` com hooks React para fornecer uma experiência de busca consistente e otimizada.

## 📦 **Arquitetura**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    🌍 SISTEMA DE BUSCA GLOBAL 🌍                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📦 @rainersoft/utils (Core)                                         │
│  ├── searchContent()      - Busca simples                           │
│  ├── searchWithScore()    - Busca com relevância                 │
│  └── fuzzySearch()       - Busca tolerante a erros            │
│                                                                     │
│  🎣 useGlobalSearch Hook (Frontend)                                  │
│  ├── Cache inteligente                                               │
│  ├── Histórico persistido                                            │
│  ├── Transformação de resultados                                      │
│  └── 3 tipos de busca (simple, scored, fuzzy)                        │
│                                                                     │
│  🎨 Componentes UI (Frontend)                                          │
│  ├── UnifiedSearch      - Componente unificado               │
│  ├── SearchBar         - Busca rápida (compact/default)       │
│  └── AdvancedSearch    - Busca detalhada                 │
└─────────────────────────────────────────────────────────────────────┘
```

## 🚀 **Guia de Implementação**

### 1. **Instalação das Dependências**

```bash
# Instalar bibliotecas necessárias
npm install @rainersoft/utils @rainersoft/ui

# Ou com yarn
yarn add @rainersoft/utils @rainersoft/ui
```

### 2. **Hook useGlobalSearch**

```typescript
import { useGlobalSearch, type GlobalSearchOptions } from '@/hooks/use-global-search';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: string;
  url?: string;
  metadata?: Record<string, any>;
}

function MyComponent() {
  const content = [
    { id: '1', title: 'Post 1', description: 'Descrição do post 1', category: 'Tecnologia' },
    { id: '2', title: 'Post 2', description: 'Descrição do post 2', category: 'Design' },
    // ... mais itens
  ];

  const searchState = useGlobalSearch(content, {
    searchType: 'scored', // 'simple' | 'scored' | 'fuzzy'
    limit: 20,
    fields: ['title', 'description', 'content', 'tags'],
    useCache: true,
    cacheTime: 5 * 60 * 1000, // 5 minutos
  });

  return (
    <div>
      <input
        value={searchState.query}
        onChange={(e) => searchState.setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      
      {searchState.isLoading && <div>Buscando...</div>}
      
      <div>
        {searchState.results.map(result => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. **Componente UnifiedSearch**

```typescript
import { UnifiedSearch } from '@/components/domain/blog/search';

function BlogPage() {
  const posts = await getBlogPosts(); // Sua função de busca
  
  return (
    <UnifiedSearch
      content={posts}
      onSelect={(result) => {
        // Navegar para o post
        router.push(`/blog/${result.item.slug}`);
      }}
      onResultsChange={(results) => {
        // Atualizar UI com resultados
        setFilteredPosts(results);
      }}
      variant="default"
      showFilters={true}
      placeholder="Buscar no blog..."
    />
  );
}
```

## 🔧 **Configuração Avançada**

### Opções de Busca

```typescript
const searchOptions: GlobalSearchOptions = {
  searchType: 'scored',     // Tipo de busca
  fields: ['title', 'description', 'content', 'tags'], // Campos para buscar
  caseSensitive: false,     // Case sensitive
  exactMatch: false,        // Busca exata
  useCache: true,           // Usar cache
  cacheTime: 5 * 60 * 1000, // Tempo do cache (ms)
  limit: 20               // Limite de resultados
};

const searchState = useGlobalSearch(content, searchOptions);
```

### Transformação de Resultados

```typescript
// O hook já transforma os resultados para o formato padrão
interface SearchResult {
  item: T;
  score?: number;
  type: string;
  id: string;
  title: string;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
}

// Você pode customizar a transformação no hook
const searchState = useGlobalSearch(content, {
  transformResult: (item, index) => ({
    item,
    id: item.id || String(index),
    title: item.title || item.name,
    description: item.description || item.excerpt,
    type: item.type || 'default',
    url: item.url || item.slug,
    metadata: {
      category: item.category,
      tags: item.tags,
      author: item.author,
      createdAt: item.createdAt,
      // ... outros metadados
    }
  })
});
```

## 📊 **Performance e Otimização**

### Cache Inteligente

O cache armazena resultados por query por um tempo configurável:

```typescript
// Cache automático por 5 minutos
const searchState = useGlobalSearch(content, {
  useCache: true,
  cacheTime: 5 * 60 * 1000, // 5 minutos
});

// Cache personalizado
const searchState = useGlobalSearch(content, {
  useCache: true,
  cacheTime: 10 * 60 * 1000, // 10 minutos
});
```

### Tipos de Busca

#### **Simple** - Busca Rápida
```typescript
// Ideal para buscas simples e rápidas
const searchState = useGlobalSearch(content, {
  searchType: 'simple',
  limit: 50,
});
```

#### **Scored** - Busca com Relevância
```typescript
// Ordena por relevância (título > descrição > conteúdo)
const searchState = useGlobalSearch(content, {
  searchType: 'scored',
  fields: ['title', 'description', 'content'],
  limit: 20,
});
```

#### **Fuzzy** - Busca Tolerante a Erros
```typescript
// Útil para busca com erros de digitação
const searchState = usesearchState(content, {
  searchType: 'fuzzy',
  fields: ['title', 'description'],
  threshold: 0.6,
});
```

## 🎯 **Casos de Uso**

### 1. **Blog com Busca de Posts**

```typescript
function BlogSearch() {
  const [posts, setPosts] = useState([]);
  
  // Carregar posts da API
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <UnifiedSearch
      content={posts}
      onSelect={(result) => router.push(`/blog/${result.item.slug}`)}
      variant="default"
      placeholder="Buscar artigos..."
      searchOptions={{
        searchType: 'scored',
        fields: ['title', 'excerpt', 'content']
      }}
    />
  );
}
```

### 2. **E-commerce com Busca de Produtos**

```typescript
function ProductSearch() {
  const [products, setProducts] = useState([]);
  
  return (
    <UnifiedSearch
      content={products}
      onSelect={(result) => router.push(`/product/${result.item.id}`)}
      variant="advanced"
      showFilters={true}
      searchOptions={{
        searchType: 'scored',
        fields: ['title', 'description', 'tags', 'category']
      }}
    />
  );
}
```

### 3. **Documentação com Busca de Conteúdo**

```typescript
function DocumentationSearch() {
  const [docs, setDocs] = useState([]);
  
  return (
    <UnifiedSearch
      content={docs}
      onSelect={(result) => router.push(`/docs/${result.item.slug}`)}
      variant="compact"
      placeholder="Buscar documentação..."
      searchOptions={{
        searchType: 'fuzzy',
        fields: ['title', 'content', 'headings']
      }}
    />
  );
}
```

## 🔌 **Integração com Frameworks**

### Next.js (App Router)

```typescript
// pages/search.tsx
import { UnifiedSearch } from '@/components/domain/blog/search';

export default function SearchPage() {
  const [allContent, setAllContent] = useState([]);
  
  return (
    <div className="container mx-auto py-8">
      <h1>Busca</h1>
      <UnifiedSearch
        content={allContent}
        variant="advanced"
        showFilters={true}
      />
    </div>
  );
}
```

### React Router

```typescript
import { UnifiedSearch } from '@/components/domain/blog/search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}
```

### Vite (React)

```typescript
// src/components/Search.tsx
import { UnifiedSearch } from '@/components/domain/blog/search';

export function Search() {
  const [content, setContent] = useState([]);
  
  return <UnifiedSearch content={content} />;
}
```

## 📝 **API Reference**

### useGlobalSearch Hook

```typescript
function useGlobalSearch<T extends Record<string, any>>(
  content: T[],
  options?: GlobalSearchOptions
): {
  // Estado
  query: string;
  results: SearchResult<T>[];
  isLoading: boolean;
  recentSearches: string[];
  suggestions: SearchSuggestion[];
  
  // Ações
  search: (query: string) => Promise<void>;
  setQuery: (query: string) => void;
  clearRecentSearches: () => void;
  clearCache: () => void;
  
  // Utilitários
  hasResults: boolean;
  hasQuery: boolean;
  resultCount: number;
}
```

### GlobalSearchOptions

```typescript
interface GlobalSearchOptions {
  searchType?: 'simple' | 'scored' | 'fuzzy';
  fields?: string[];
  caseSensitive?: boolean;
  exactMatch?: boolean;
  useCache?: boolean;
  cacheTime?: number;
  limit?: number;
  transformResult?: (item: T, index: number) => SearchResult<T>;
}
```

### SearchResult

```typescript
interface SearchResult<T = any> {
  item: T;
  score?: number;
  type: string;
  id: string;
  title: string;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
}
```

## 🚀 **Performance com Grandes Volumes**

### Teste com 10.000 itens

```typescript
// Gerar dados de teste
const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  id: `item-${i}`,
  title: `Item ${i}`,
  description: `Descrição do item ${i}`,
  content: `Conteúdo do item ${i} com muitas palavras`,
  tags: [`tag-${i % 10}`, `category-${i % 5}`]
}));

// Teste de performance
const searchState = useGlobalSearch(largeDataset, {
  searchType: 'scored',
  useCache: true,
  cacheTime: 5 * 60 * 1000
});

// Monitorar performance
console.time('Search 10k items');
searchState.search('test query');
console.timeEnd('Search 10k items');
```

### Recomendações para Performance

1. **Cache**: Sempre habilitado para volumes > 1.000 itens
2. **Limites**: Use `limit` para controlar resultados
3. **Fields**: Especifique apenas campos necessários
4. **SearchType**: `simple` para buscas simples, `scored` para relevância

## 🔧 **Personalização Avançada**

### Cache Customizado

```typescript
const customCache = new Map<string, { results: SearchResult[]; timestamp: number }>();

const searchState = useGlobalSearch(content, {
  useCache: true,
  cacheTime: 15 * 60 * 1000, // 15 minutos
  transformResult: (item, index) => ({
    item,
    id: item.id || String(index),
    title: item.title.toUpperCase(),
    description: item.description?.substring(0, 100),
    type: item.type || 'default',
    url: `/item/${item.id}`,
    metadata: {
      ...item.metadata,
      searchScore: Math.random() // Score personalizado
    }
  })
});
```

### Filtros Personalizados

```typescript
function useFilteredSearch(content: any[], filters: SearchFilters) {
  const searchState = useGlobalSearch(content);
  
  const filteredResults = useMemo(() => {
    return searchState.results.filter(result => {
      // Aplicar filtros personalizados
      return filters.categories.includes(result.metadata?.category) &&
             filters.authors.includes(result.metadata?.author);
    });
  }, [searchState.results, filters]);
  
  return { ...searchState, results: filteredResults };
}
```

## 🎯 **Melhores Práticas**

### ✅ **Performance**
- Use cache para buscas frequentes
- Limite o número de campos de busca
- Escolha o tipo de busca adequado
- Implemente debouncing para inputs

### ✅ **UX**
- Forneça feedback visual de loading
- Mantenha histórico de buscas
- Use sugestões quando apropriado
- Implemente navegação por teclado

### ✅ **Acessibilidade**
- Use aria-labels descritivos
- Forneça atalhos de teclado
- Implemente navegação por voz
- Use semântica HTML5

### ✅ **SEO**
- Estruture URLs amigáveis
- Meta dados estruturados
- Links canônicos
- Conteúdo indexável

## 🐛 **Troubleshooting**

### Problemas Comuns

#### **Resultados Não Aparecem**
```typescript
// Verifique se o conteúdo está sendo passado
console.log('Content length:', content.length);

// Verifique os campos de busca
console.log('Search fields:', searchOptions.fields);

// Teste diferentes tipos de busca
searchState.searchType = 'simple';
```

#### **Performance Lenta**
```typescript
// Reduza campos de busca
const searchState = useGlobalSearch(content, {
  fields: ['title'], // Apenas título
  limit: 10
});
```

#### **Cache Não Funciona**
```typescript
// Verifique se o cache está habilitado
const searchState = useGlobalSearch(content, {
  useCache: true,
  cacheTime: 1000 // 1 segundo para testes
});
```

## 📚 **Exemplos Completos**

### Blog com Busca Avançada

```typescript
// hooks/use-blog-search.ts
import { useGlobalSearch } from '@/hooks/use-global-search';

export function useBlogSearch(posts: any[], options?: GlobalSearchOptions) {
  const searchState = useGlobalSearch(posts, {
    searchType: 'scored',
    fields: ['title', 'excerpt', 'content', 'tags'],
    limit: 10,
    transformResult: (item, index) => ({
      item,
      id: item.id || String(index),
      title: item.title,
      description: item.excerpt,
      type: 'post',
      url: `/blog/${item.slug}`,
      metadata: {
        category: item.category?.name,
        author: item.author?.fullName || item.author?.nickname,
        readTime: item.readTime,
        views: item.views,
        likesCount: item.likesCount,
        publishedAt: item.publishedAt,
        tags: item.tags?.map(tag => tag.name)
      }
    })
  });

  return searchState;
}

// components/BlogSearch.tsx
import { useBlogSearch } from '@/hooks/use-blog-search';

export function BlogSearch({ posts }: { posts: any[] }) {
  const searchState = useBlogSearch(posts);
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar no blog..."
          value={searchState.query}
          onChange={(e) => searchState.setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="space-y-2">
        {searchState.results.map((result) => (
          <div
            key={result.id}
            className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => router.push(result.url)}
          >
            <h3 className="font-medium">{result.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {result.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {result.metadata?.category && (
                <Badge variant="secondary" className="text-xs">
                  {result.metadata.category}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {result.metadata?.readTime} min de leitura
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### E-commerce com Filtros

```typescript
// hooks/use-product-search.ts
import { useGlobalSearch } from '@/hooks/use-global-search';

export function useProductSearch(products: any[], filters: ProductFilters) {
  const searchState = useGlobalSearch(products, {
    searchType: 'scored',
    fields: ['title', 'description', 'tags', 'category'],
    limit: 20
  });

  const filteredResults = useMemo(() => {
    let results = [...searchState.results];
    
    // Aplicar filtros
    if (filters.categories.length > 0) {
      results = results.filter(result =>
        filters.categories.includes(result.metadata?.category)
      );
    }
    
    if (filters.priceRange) {
      results = results.filter(result => 
        result.metadata?.price >= filters.priceRange.min &&
        result.metadata?.price <= filters.priceRange.max
      );
    }
    
    return results;
  }, [searchState.results, filters]);

  return { ...searchState, results: filteredResults };
}

// components/ProductSearch.tsx
export function ProductSearch({ products }: { products: any[] }) {
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    tags: []
  });
  
  const searchState = useProductSearch(products, filters);
  
  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-2">
        <Select
          value={filters.categories[0]}
          onValueChange={(value) => 
            setFilters(prev => ({ ...prev, categories: value ? [value] : [] }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eletrônicos">Eletrônicos</SelectItem>
            <SelectItem value="roupamentos">Grupos</SelectItem>
            <SelectItem value="acessórios">Acessórios</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.sortBy}
          onValueChange={(value) => 
            setFilters(prev => ({ ...prev, sortBy: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mais recentes</SelectItem>
            <SelectItem value="popular">Mais populares</SelectItem>
            <SelectItem value="price-low">Menor preço</SelectItem>
            <SelectItem value="price-high">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos..."
          value={searchState.query}
          onChange={(e) => searchState.setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchState.results.map((result) => (
          <div
            key={result.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/product/${result.item.id}`)}
          >
            <div className="space-y-2">
              <h3 className="font-medium">{result.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {result.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  R$ {result.metadata?.price}
                </span>
                <Badge variant="secondary">
                  {result.metadata?.category}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🎯 **Conclusão**

O sistema de busca global oferece uma base sólida para implementações de busca em qualquer projeto React. Com cache inteligente, múltiplos algoritmos de busca e transformação flexível, ele pode ser adaptado para qualquer caso de uso específico.

**Principípios-chave:**
- ✅ **Performance** com cache e limites
- ✅ **Flexibilidade** com múltiplos tipos de busca
- ✅ **Consistência** em todos os projetos
- ✅ **Extensibilidade** com transformação de resultados
- ✅ **Acessibilidade** e SEO amigáveis

Comece com o **useGlobalSearch** e expanda conforme necessário para atender às necessidades específicas do seu projeto! 🚀
