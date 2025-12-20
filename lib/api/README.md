# 🌐 API do Frontend - Versão 2.0 (Pública e Privada)

Biblioteca completa para integração com backend, organizada de forma profissional separando APIs públicas e privadas.

## 📂 Estrutura Nova

```
lib/api/
├── clients/                  # Clientes HTTP
│   ├── public-client.ts      # Cliente para APIs públicas (sem auth)
│   └── private-client.ts     # Cliente para APIs privadas (com JWT)
│
├── public/                   # APIs Públicas (sem autenticação)
│   ├── auth/                 # Login, registro, OAuth
│   │   └── auth.ts
│   └── blog/                 # Conteúdo público
│       ├── posts.ts          # Listar posts públicos
│       └── categories.ts     # Listar categorias
│
├── private/                  # APIs Privadas (com autenticação)
│   └── blog/                 # Gerenciamento de conteúdo
│       ├── posts.ts          # CRUD de posts
│       └── categories.ts     # CRUD de categorias
│
├── types/                    # Tipos TypeScript
│   ├── public/              # Tipos para APIs públicas
│   │   ├── auth.ts
│   │   └── blog.ts
│   └── private/             # Tipos para APIs privadas
│       └── blog.ts
│
├── config/                   # Configurações
│   └── endpoints.ts          # URLs da API centralizadas
│
├── utils/                    # Utilitários
│   └── error-handler.ts      # Tratamento de erros
│
├── index.ts                  # Exportações principais
└── README.md                 # Documentação
```

## 🚀 Uso

### APIs Públicas (sem autenticação)

```typescript
import { 
  publicBlogPosts, 
  publicBlogCategories, 
  publicAuth,
  handleApiError 
} from '@/lib/api';

// Listar posts públicos
const posts = await publicBlogPosts.getPublicPosts({
  page: 1,
  limit: 10,
  status: 'PUBLISHED'
});

// Buscar post por slug
const post = await publicBlogPosts.getPublicPostBySlug('meu-artigo');

// Login
const authData = await publicAuth.login({
  email: 'user@example.com',
  password: 'senha123'
});
```

### APIs Privadas (com autenticação)

```typescript
import { 
  privateBlogPosts, 
  privateBlogCategories,
  formatErrorMessage 
} from '@/lib/api';

// Criar post (requer auth)
const newPost = await privateBlogPosts.createPost({
  title: 'Novo Artigo',
  content: 'Conteúdo...',
  categoryId: '123',
  tags: ['tech']
});

// Publicar post
await privateBlogPosts.publishPost('123');
```

### Clientes Diretos

```typescript
import { publicClient, privateClient } from '@/lib/api';

// Cliente público (sem auth)
const posts = await publicClient.get('/posts');

// Cliente privado (com JWT automático)
const result = await privateClient.post('/posts', postData);
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
