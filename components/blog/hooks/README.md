# 🎣 Blog Hooks - Integração com API

Hooks React para consumir a API do backend do blog com gerenciamento de estado, cache e error handling.

## 📚 Índice

- [Hooks Disponíveis](#hooks-disponíveis)
- [Instalação](#instalação)
- [Uso Básico](#uso-básico)
- [Exemplos Práticos](#exemplos-práticos)
- [API Reference](#api-reference)

## 🎯 Hooks Disponíveis

### Posts

- `usePosts` - Lista posts com paginação e filtros
- `usePost` - Busca post individual por ID ou slug

### Comentários

- `useComments` - Gerencia comentários de um post

### Categorias

- `useCategories` - Lista todas as categorias
- `useCategory` - Busca categoria individual
- `useSubcategories` - Lista subcategorias de uma categoria

### Interações

- `useLike` - Sistema de curtidas
- `useBookmark` - Sistema de favoritos

### Outros

- `useSearch` - Busca de posts
- `useNewsletter` - Inscrição newsletter
- `useTableOfContents` - Índice de conteúdo

## 📦 Instalação

Os hooks já estão disponíveis no projeto. Importe do barrel file:

```typescript
import {
  usePosts,
  usePost,
  useComments,
  useCategories,
  useLike,
  useBookmark,
} from '@/components/blog/hooks';
```

## 🚀 Uso Básico

### Listar Posts

```typescript
import { usePosts } from '@/components/blog/hooks'

function BlogList() {
  const { posts, loading, error, pagination, nextPage, prevPage } = usePosts({
    filters: {
      status: 'PUBLISHED',
      featured: true,
      limit: 10
    }
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onNext={nextPage}
        onPrev={prevPage}
      />
    </div>
  )
}
```

### Buscar Post Individual

```typescript
import { usePost } from '@/components/blog/hooks'

function PostPage({ slug }: { slug: string }) {
  const { post, loading, error } = usePost(slug, true) // true = buscar por slug

  if (loading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  if (!post) return <NotFound />

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

### Comentários

```typescript
import { useComments } from '@/components/blog/hooks'

function CommentsSection({ postId }: { postId: string }) {
  const {
    comments,
    loading,
    addComment,
    deleteComment
  } = useComments(postId)

  const handleSubmit = async (content: string) => {
    await addComment({
      postId,
      authorId: currentUser.id,
      content
    })
  }

  return (
    <div>
      <CommentForm onSubmit={handleSubmit} />

      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={() => deleteComment(comment.id)}
        />
      ))}
    </div>
  )
}
```

### Curtidas

```typescript
import { useLike } from '@/components/blog/hooks'

function LikeButton({ postId, initialLikes, initialIsLiked }) {
  const { isLiked, likes, isAnimating, handleLike } = useLike(
    postId,
    initialLikes,
    initialIsLiked,
    () => console.log('Curtido!'),
    () => console.log('Descurtido!')
  )

  return (
    <button
      onClick={handleLike}
      className={isAnimating ? 'animate-bounce' : ''}
    >
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  )
}
```

### Bookmarks

```typescript
import { useBookmark } from '@/components/blog/hooks'

function BookmarkButton({ postId, initialIsBookmarked }) {
  const { isBookmarked, isAnimating, handleBookmark } = useBookmark(
    postId,
    initialIsBookmarked
  )

  return (
    <button onClick={handleBookmark}>
      {isBookmarked ? '🔖' : '📑'}
      {isBookmarked ? 'Salvo' : 'Salvar'}
    </button>
  )
}
```

### Categorias

```typescript
import { useCategories, useSubcategories } from '@/components/blog/hooks'

function CategoryNav() {
  const { categories, loading } = useCategories()

  return (
    <nav>
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </nav>
  )
}

function SubcategoryList({ categoryId }) {
  const { subcategories, loading } = useSubcategories(categoryId)

  return (
    <ul>
      {subcategories.map(sub => (
        <li key={sub.id}>{sub.fullName}</li>
      ))}
    </ul>
  )
}
```

## 📖 API Reference

### usePosts(options)

**Parâmetros:**

```typescript
interface UsePostsOptions {
  filters?: {
    page?: number;
    limit?: number;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    subcategoryId?: string;
    authorId?: string;
    featured?: boolean;
    search?: string;
  };
  autoFetch?: boolean; // default: true
}
```

**Retorno:**

```typescript
{
  posts: Post[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  refetch: () => Promise<void>
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
}
```

### usePost(idOrSlug, bySlug?)

**Parâmetros:**

- `idOrSlug: string` - ID ou slug do post
- `bySlug?: boolean` - Se true, busca por slug (default: false)

**Retorno:**

```typescript
{
  post: Post | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
```

### useComments(postId)

**Parâmetros:**

- `postId: string` - ID do post

**Retorno:**

```typescript
{
  comments: Comment[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  addComment: (data: CreateCommentData) => Promise<Comment>
  updateComment: (id: string, content: string) => Promise<Comment>
  deleteComment: (id: string) => Promise<void>
}
```

### useCategories()

**Retorno:**

```typescript
{
  categories: Category[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
```

### useLike(postId, initialLikes, initialIsLiked?, onLike?, onUnlike?)

**Parâmetros:**

- `postId: string` - ID do post
- `initialLikes: number` - Número inicial de curtidas
- `initialIsLiked?: boolean` - Se já está curtido (default: false)
- `onLike?: () => void` - Callback ao curtir
- `onUnlike?: () => void` - Callback ao descurtir

**Retorno:**

```typescript
{
  isLiked: boolean;
  likes: number;
  isAnimating: boolean;
  handleLike: () => Promise<void>;
}
```

### useBookmark(postId, initialIsBookmarked?, onBookmark?, onUnbookmark?)

**Parâmetros:**

- `postId: string` - ID do post
- `initialIsBookmarked?: boolean` - Se já está salvo (default: false)
- `onBookmark?: () => void` - Callback ao salvar
- `onUnbookmark?: () => void` - Callback ao remover

**Retorno:**

```typescript
{
  isBookmarked: boolean;
  isAnimating: boolean;
  handleBookmark: () => Promise<void>;
}
```

## 🔧 Configuração

### Variáveis de Ambiente

Configure a URL da API no `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Autenticação

Os hooks `useLike` e `useBookmark` precisam do ID do usuário autenticado.

**TODO:** Integrar com contexto de autenticação:

```typescript
// Substituir em use-like.ts e use-bookmark.ts
const userId = 'current-user-id';

// Por:
const { user } = useAuth();
const userId = user?.id;
```

## 🎨 Boas Práticas

### 1. Optimistic Updates

Os hooks `useLike` e `useBookmark` já implementam optimistic updates:

```typescript
// UI atualiza imediatamente
setIsLiked(!wasLiked)

// Depois sincroniza com backend
await likesService.likePost(...)

// Reverte em caso de erro
catch (error) {
  setIsLiked(wasLiked)
}
```

### 2. Error Handling

Sempre trate erros:

```typescript
const { posts, error } = usePosts()

if (error) {
  return <div>Erro ao carregar posts: {error.message}</div>
}
```

### 3. Loading States

Mostre feedback visual durante carregamento:

```typescript
const { loading } = usePosts()

if (loading) {
  return <Skeleton count={5} />
}
```

### 4. Paginação

Use os métodos de paginação fornecidos:

```typescript
const { pagination, nextPage, prevPage, goToPage } = usePosts()

<Pagination
  current={pagination.page}
  total={pagination.totalPages}
  onNext={nextPage}
  onPrev={prevPage}
  onChange={goToPage}
/>
```

## 🔗 Links Relacionados

- [API Services](../../../lib/api/services/README.md)
- [API Client](../../../lib/api/client.ts)
- [API Types](../../../lib/api/types.ts)
- [Backend API Docs](http://localhost:4000/docs)

## 📝 Licença

MIT © Rainer Teixeira
