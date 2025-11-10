# 🌐 API Global - Padrão Profissional

Biblioteca completa para integração com backend.

## 📂 Estrutura

```
lib/api/
├── types/              # Types organizados por serviço
│   ├── common.ts      # ApiResponse, Pagination
│   ├── auth.ts        # Auth types
│   ├── users.ts       # User types
│   ├── posts.ts       # Post types
│   ├── categories.ts  # Category types
│   ├── comments.ts    # Comment types
│   ├── likes.ts       # Like types
│   ├── bookmarks.ts   # Bookmark types
│   └── notifications.ts
│
├── services/          # Services por recurso
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── posts.service.ts
│   └── ...
│
├── client.ts          # HTTP Client global
├── config.ts          # Configuração e endpoints
├── types.ts           # Re-export de types/
└── index.ts           # Barrel export geral
```

## 🚀 Uso

### Client HTTP

```typescript
import { api } from '@/lib/api';

// GET
const data = await api.get('/posts');

// POST
const post = await api.post('/posts', { title: 'Título' });

// Auth
api.setAuthToken('token');
api.clearAuthToken();
```

### Services

```typescript
import { postsService, usersService } from '@/lib/api';

// Listar posts
const posts = await postsService.listPosts({ status: 'PUBLISHED' });

// Buscar usuário
const user = await usersService.getUserById('123');
```

### Types

```typescript
import type { Post, User, ApiResponse } from '@/lib/api'

const post: Post = { ... }
const response: ApiResponse<Post> = { ... }
```

### Config

```typescript
import { API_ENDPOINTS, HTTP_STATUS } from '@/lib/api'

const url = API_ENDPOINTS.POSTS.GET('123')
if (status === HTTP_STATUS.OK) { ... }
```

## 🎯 Padrão Profissional

✅ **Client global** - Um único cliente HTTP  
✅ **Types organizados** - Por serviço  
✅ **Services tipados** - Type-safe  
✅ **Config centralizada** - Endpoints e constantes  
✅ **Error handling** - ApiError customizado  
✅ **Barrel exports** - Imports limpos

## 📝 Exemplo Completo

```typescript
import { api, postsService, type Post } from '@/lib/api';

// Usando service (recomendado)
const posts = await postsService.listPosts();

// Usando client direto
const post = await api.get<Post>('/posts/123');

// Com error handling
try {
  const post = await postsService.getPostById('123');
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status, error.message);
  }
}
```

## 🔗 Uso em Componentes

### Blog (Público)

```typescript
import { postsService } from '@/lib/api'

function BlogPage() {
  const { posts } = usePosts() // Hook usa postsService
  return <PostList posts={posts} />
}
```

### Dashboard (Admin)

```typescript
import { postsService } from '@/lib/api'

function DashboardPage() {
  const { posts } = useDashboardPosts() // Hook usa postsService
  return <AdminPostList posts={posts} />
}
```

**Mesma API, diferentes hooks!** ✅
