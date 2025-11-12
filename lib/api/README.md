# 🌐 API Global - Padrão Profissional

Biblioteca completa para integração com backend.

## 📂 Estrutura

```
lib/api/
├── types/              # Types organizados por serviço
│   ├── common.ts      # ApiResponse, Pagination, TiptapJSON
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
├── helpers/           # 🆕 Helpers específicos da API
│   ├── post-helpers.ts  # preparePostForCreate, preparePostForUpdate, validatePostData
│   └── index.ts
│
├── client.ts          # HTTP Client global
├── config.ts          # Configuração e endpoints
├── debug-utils.ts     # Utilitários de debug
├── index.ts           # Barrel export geral
└── README.md          # Documentação
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

### Helpers

```typescript
import {
  preparePostForCreate,
  preparePostForUpdate,
  validatePostData,
} from '@/lib/api/helpers';

// Preparar dados para criar post
const postData = preparePostForCreate(
  {
    title: 'Meu Post',
    content: tiptapJSON,
    subcategoryId: 'cat-123',
  },
  user.id
);

// Validar dados antes de enviar
const errors = validatePostData(postData);
if (errors.length > 0) {
  console.error('Erros:', errors);
}
```

## 🎯 Padrão Profissional

✅ **Client global** - Um único cliente HTTP  
✅ **Types organizados** - Por serviço  
✅ **Services tipados** - Type-safe  
✅ **Config centralizada** - Endpoints e constantes  
✅ **Error handling** - ApiError customizado  
✅ **Helpers específicos** - Funções auxiliares organizadas  
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
