# ⚡ Referência Rápida - Blog Hooks & API

Guia de consulta rápida para uso dos hooks e services.

## 🎣 Hooks

### Posts

```typescript
// Lista de posts
const { posts, loading, error, pagination, nextPage, prevPage } = usePosts({
  filters: { status: 'PUBLISHED', limit: 10 },
});

// Post individual
const { post, loading, error } = usePost(slug, true); // true = por slug
```

### Comentários

```typescript
const { comments, loading, addComment, updateComment, deleteComment } =
  useComments(postId);

// Adicionar
await addComment({ postId, authorId, content: 'Texto' });

// Atualizar
await updateComment(commentId, 'Novo texto');

// Deletar
await deleteComment(commentId);
```

### Categorias

```typescript
// Todas
const { categories, loading } = useCategories();

// Individual
const { category, loading } = useCategory(id);

// Subcategorias
const { subcategories, loading } = useSubcategories(categoryId);
```

### Curtidas

```typescript
const { isLiked, likes, isAnimating, handleLike } = useLike(
  postId,
  initialLikes,
  initialIsLiked
);
```

### Favoritos

```typescript
const { isBookmarked, isAnimating, handleBookmark } = useBookmark(
  postId,
  initialIsBookmarked
);
```

## 🔧 Services

### Posts

```typescript
import { postsService } from '@/lib/api/services';

// Listar
const response = await postsService.listPosts({ page: 1, limit: 10 });

// Por ID
const post = await postsService.getPostById(id);

// Por slug
const post = await postsService.getPostBySlug(slug);

// Criar
const post = await postsService.createPost(data);

// Atualizar
const post = await postsService.updatePost(id, data);

// Publicar
await postsService.publishPost(id);

// Deletar
await postsService.deletePost(id);
```

### Categorias

```typescript
import { categoriesService } from '@/lib/api/services';

// Listar
const categories = await categoriesService.listCategories();

// Principais
const main = await categoriesService.getMainCategories();

// Subcategorias
const subs = await categoriesService.getSubcategories(parentId);

// Hierarquia
const hierarchy = await categoriesService.getCategoryHierarchy();
```

### Comentários

```typescript
import { commentsService } from '@/lib/api/services';

// Por post
const comments = await commentsService.getCommentsByPost(postId);

// Criar
const comment = await commentsService.createComment(data);

// Atualizar
await commentsService.updateComment(id, { content });

// Deletar
await commentsService.deleteComment(id);

// Aprovar
await commentsService.approveComment(id);
```

### Curtidas

```typescript
import { likesService } from '@/lib/api/services';

// Curtir
await likesService.likePost({ userId, postId });

// Descurtir
await likesService.unlikePost(userId, postId);

// Toggle
const result = await likesService.toggleLike(userId, postId);

// Contar
const count = await likesService.getLikeCount(postId);

// Verificar
const hasLiked = await likesService.hasUserLikedPost(userId, postId);
```

### Favoritos

```typescript
import { bookmarksService } from '@/lib/api/services';

// Salvar
await bookmarksService.savePost({ userId, postId, collection, notes });

// Toggle
const result = await bookmarksService.toggleBookmark(userId, postId);

// Por usuário
const bookmarks = await bookmarksService.getBookmarksByUser(userId);

// Por coleção
const bookmarks = await bookmarksService.getBookmarksByCollection(
  userId,
  fullName
);

// Verificar
const hasSaved = await bookmarksService.hasUserBookmarkedPost(userId, postId);

// Remover
await bookmarksService.removeBookmark(id);
```

## 📦 Imports

```typescript
// Hooks
import {
  usePosts,
  usePost,
  useComments,
  useCategories,
  useCategory,
  useSubcategories,
  useLike,
  useBookmark,
} from '@/components/blog/hooks';

// Services
import {
  postsService,
  categoriesService,
  commentsService,
  likesService,
  bookmarksService,
  usersService,
  authService,
} from '@/lib/api/services';

// Types
import type {
  Post,
  Category,
  Comment,
  Like,
  Bookmark,
  User,
  CreatePostData,
  UpdatePostData,
  PostFilters,
} from '@/lib/api/types';

// Client
import { api, ApiError } from '@/lib/api/client';

// Config
import {
  API_CONFIG,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
} from '@/lib/api/api-config';
```

## 🎯 Filtros Disponíveis

### Posts

```typescript
interface PostFilters {
  page?: number;
  limit?: number;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  subcategoryId?: string;
  authorId?: string;
  featured?: boolean;
  search?: string;
}
```

### Categorias

```typescript
interface CategoryFilters {
  page?: number;
  limit?: number;
  parentId?: string | null;
  isActive?: boolean;
  search?: string;
}
```

### Comentários

```typescript
interface CommentFilters {
  page?: number;
  limit?: number;
  postId?: string;
  authorId?: string;
  isApproved?: boolean;
  parentId?: string | null;
}
```

## 🔒 Autenticação

```typescript
import { authService } from '@/lib/api/services';

// Login
const { accessToken, refreshToken, user } = await authService.login({
  email: 'user@example.com',
  password: 'senha123',
});

// Registrar
await authService.register({
  email: 'user@example.com',
  password: 'senha123',
  username: 'username',
  fullName: 'Nome',
});

// Refresh
const tokens = await authService.refreshToken(refreshToken);

// Logout
await authService.logout();
```

## ⚠️ Error Handling

```typescript
import { ApiError } from '@/lib/api/client';

try {
  const post = await postsService.getPostById(id);
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.status);
    console.log('Message:', error.message);

    switch (error.status) {
      case 401: // Não autenticado
      case 403: // Sem permissão
      case 404: // Não encontrado
      case 500: // Erro do servidor
    }
  }
}
```

## 🎨 Componentes de Exemplo

### Lista de Posts

```typescript
function BlogList() {
  const { posts, loading, pagination, nextPage } = usePosts()

  if (loading) return <Skeleton />

  return (
    <>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
      <button onClick={nextPage}>Próxima</button>
    </>
  )
}
```

### Post Individual

```typescript
function PostPage({ slug }) {
  const { post, loading } = usePost(slug, true)
  const { comments, addComment } = useComments(post?.id)

  if (loading) return <Skeleton />

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Comments comments={comments} onAdd={addComment} />
    </article>
  )
}
```

### Botão de Like

```typescript
function LikeButton({ postId, initialLikes }) {
  const { isLiked, likes, handleLike } = useLike(postId, initialLikes)

  return (
    <button onClick={handleLike}>
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  )
}
```

### Botão de Bookmark

```typescript
function BookmarkButton({ postId }) {
  const { isBookmarked, handleBookmark } = useBookmark(postId)

  return (
    <button onClick={handleBookmark}>
      {isBookmarked ? '🔖' : '📑'}
    </button>
  )
}
```

## 🔗 Links Úteis

- 📖 [Documentação Completa dos Hooks](./hooks/README.md)
- 📖 [Documentação da API Library](../../lib/api/README.md)
- 📖 [Exemplo Completo](../../lib/api/examples/blog-page-example.tsx)
- 📖 [Backend API Docs](http://localhost:4000/docs)
- 📖 [Resumo da Integração](./INTEGRATION_SUMMARY.md)

## ⚙️ Configuração

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 🚀 Comandos Backend

```bash
# Iniciar backend
cd rainer-portfolio-backend
npm run dev

# Popular banco
npm run seed

# Ver docs
http://localhost:4000/docs
```

---

**💡 Dica:** Use Ctrl+F para buscar rapidamente o que precisa!
