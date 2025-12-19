# 📝 Blog Components & Hooks

Sistema completo de blog com componentes React e integração com API backend NestJS.

## 📚 Estrutura

```text
components/blog/
├── hooks/                      # 🎣 React Hooks
│   ├── use-posts.ts           # Gerenciamento de posts
│   ├── use-comments.ts        # Sistema de comentários
│   ├── use-categories.ts      # Categorias hierárquicas
│   ├── use-like.ts            # Sistema de curtidas
│   ├── use-bookmark.ts        # Sistema de favoritos
│   ├── use-search.ts          # Busca de posts
│   ├── use-newsletter.ts      # Newsletter
│   ├── use-table-of-contents.ts  # Índice de conteúdo
│   ├── index.ts               # Barrel exports
│   └── README.md              # 📖 Documentação completa
│
├── comments/                   # 💬 Componentes de comentários
├── search/                     # 🔍 Componentes de busca
├── social/                     # 📱 Compartilhamento social
├── lib/                        # 🛠️ Utilitários
│
├── author-card.tsx            # 👤 Card de autor
├── newsletter-box.tsx         # 📧 Box de newsletter
├── post-card.tsx              # 📄 Card de post
├── reading-progress.tsx       # 📊 Barra de progresso
├── related-posts.tsx          # 🔗 Posts relacionados
├── table-of-contents.tsx      # 📑 Índice
├── index.ts                   # Barrel exports
│
├── README.md                  # 📖 Este arquivo
├── INTEGRATION_SUMMARY.md     # ✅ Resumo da integração
└── QUICK_REFERENCE.md         # ⚡ Referência rápida
```

## 🚀 Quick Start

### 1. Configuração

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 2. Uso Básico

```typescript
import { usePosts, usePost, useComments } from '@/components/blog/hooks'

function BlogPage() {
  const { posts, loading } = usePosts({
    filters: { status: 'PUBLISHED', limit: 10 }
  })

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

## 📖 Documentação

### 📚 Guias Completos

- **[Hooks README](./hooks/README.md)** - Documentação completa dos hooks
- **[API Library README](../../lib/api/README.md)** - Documentação da biblioteca de API
- **[Integration Summary](./INTEGRATION_SUMMARY.md)** - Resumo da integração frontend-backend
- **[Quick Reference](./QUICK_REFERENCE.md)** - Referência rápida para consulta

### 🎯 Exemplos Práticos

- **[Blog Page Example](../../lib/api/examples/blog-page-example.tsx)** - Exemplo completo de página de blog

## 🎣 Hooks Disponíveis

### Posts

```typescript
usePosts(options)  // Lista com paginação e filtros
usePost(id, bySlug?)  // Post individual
```

### Comentários

```typescript
useComments(postId); // CRUD de comentários
```

### Categorias

```typescript
useCategories()  // Lista todas
useCategory(id, bySlug?)  // Individual
useSubcategories(categoryId)  // Subcategorias
```

### Interações

```typescript
useLike(postId, initialLikes, initialIsLiked?)  // Curtidas
useBookmark(postId, initialIsBookmarked?)  // Favoritos
```

### Outros

```typescript
useSearch(query); // Busca
useNewsletter(); // Newsletter
useTableOfContents(); // Índice
```

## 🔧 Services da API

Todos os services estão disponíveis em `@/lib/api/services`:

```typescript
import {
  postsService,
  categoriesService,
  commentsService,
  likesService,
  bookmarksService,
  usersService,
  authService,
} from '@/lib/api/services';
```

## 📦 Componentes

### Cards

- `PostCard` - Card de post com preview
- `AuthorCard` - Card de autor com bio

### Interações

- `LikeButton` - Botão de curtir
- `BookmarkButton` - Botão de favoritar
- `ShareButtons` - Botões de compartilhamento

### Conteúdo

- `TableOfContents` - Índice navegável
- `ReadingProgress` - Barra de progresso de leitura
- `RelatedPosts` - Posts relacionados

### Formulários

- `CommentForm` - Formulário de comentário
- `NewsletterBox` - Box de inscrição newsletter
- `SearchBar` - Barra de busca

## 🎨 Exemplos de Uso

### Lista de Posts com Filtros

```typescript
function BlogList() {
  const { categories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState()

  const { posts, loading, pagination, nextPage } = usePosts({
    filters: {
      status: 'PUBLISHED',
      subcategoryId: selectedCategory,
      limit: 12
    }
  })

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <PostGrid posts={posts} loading={loading} />

      <Pagination
        current={pagination.page}
        total={pagination.totalPages}
        onNext={nextPage}
      />
    </div>
  )
}
```

### Post Individual com Comentários

```typescript
function PostPage({ slug }) {
  const { post, loading } = usePost(slug, true)
  const { comments, addComment } = useComments(post?.id)
  const { isLiked, likes, handleLike } = useLike(
    post?.id,
    post?.likesCount
  )

  if (loading) return <PostSkeleton />

  return (
    <article>
      <PostHeader post={post} />

      <PostActions
        likes={likes}
        isLiked={isLiked}
        onLike={handleLike}
      />

      <PostContent content={post.content} />

      <CommentsSection
        comments={comments}
        onAdd={addComment}
      />
    </article>
  )
}
```

### Card de Post com Interações

```typescript
function PostCard({ post }) {
  const { isLiked, likes, handleLike } = useLike(
    post.id,
    post.likesCount
  )

  const { isBookmarked, handleBookmark } = useBookmark(post.id)

  return (
    <article className="post-card">
      <img src={post.coverImage} alt={post.title} />

      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>

      <div className="actions">
        <button onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'} {likes}
        </button>

        <button onClick={handleBookmark}>
          {isBookmarked ? '🔖' : '📑'}
        </button>
      </div>
    </article>
  )
}
```

## 🔒 Autenticação

Os hooks `useLike` e `useBookmark` precisam do ID do usuário autenticado.

**TODO:** Integrar com contexto de autenticação:

```typescript
// Atualmente (placeholder)
const userId = 'current-user-id';

// Implementar
const { user } = useAuth();
const userId = user?.id;
```

## 📊 Paginação

Todos os hooks de listagem suportam paginação:

```typescript
const {
  posts,
  pagination: { page, totalPages, total },
  nextPage,
  prevPage,
  goToPage
} = usePosts()

<Pagination
  current={page}
  total={totalPages}
  onNext={nextPage}
  onPrev={prevPage}
  onChange={goToPage}
/>
```

## 🎯 Filtros

### Posts

```typescript
usePosts({
  filters: {
    status: 'PUBLISHED',
    subcategoryId: 'cat-123',
    authorId: 'user-456',
    featured: true,
    search: 'react',
    page: 1,
    limit: 10,
  },
});
```

### Categorias

```typescript
useCategories({
  filters: {
    parentId: null, // Apenas principais
    isActive: true,
    search: 'tech',
  },
});
```

### Comentários

```typescript
useComments(postId, {
  filters: {
    isApproved: true,
    parentId: null, // Apenas raiz
  },
});
```

## ⚠️ Error Handling

Todos os hooks retornam `error`:

```typescript
const { posts, loading, error } = usePosts()

if (error) {
  return <ErrorMessage error={error} />
}
```

## 🎨 Loading States

Todos os hooks retornam `loading`:

```typescript
const { posts, loading } = usePosts()

if (loading) {
  return <Skeleton count={5} />
}
```

## 🔄 Refetch

Todos os hooks fornecem `refetch`:

```typescript
const { posts, refetch } = usePosts()

<button onClick={refetch}>
  Atualizar
</button>
```

## 🌐 Backend API

### Iniciar Backend

```bash
cd rainer-portfolio-backend
npm run dev
```

### Popular Banco

```bash
npm run seed
```

### Documentação

<http://localhost:4000/docs>

## 🔗 Links Relacionados

### Documentação

- 📖 [Hooks README](./hooks/README.md)
- 📖 [API Library README](../../lib/api/README.md)
- 📖 [Backend README](../../../rainer-portfolio-backend/README.md)

### Guias

- ✅ [Integration Summary](./INTEGRATION_SUMMARY.md)
- ⚡ [Quick Reference](./QUICK_REFERENCE.md)
- 📝 [Blog Page Example](../../lib/api/examples/blog-page-example.tsx)

### API

- 🌐 [Backend API Docs](http://localhost:4000/docs)
- 🌐 [Backend Swagger](http://localhost:4000/docs)

## 🎯 Próximos Passos

1. ✅ Hooks criados e documentados
2. ✅ Services integrados
3. ✅ Exemplos práticos
4. ⏳ Integrar autenticação
5. ⏳ Adicionar testes
6. ⏳ Implementar React Query (opcional)

## 📝 Licença

MIT © Rainer Teixeira

---

**💡 Dica:** Comece pelo [Quick Reference](./QUICK_REFERENCE.md) para consultas rápidas!
