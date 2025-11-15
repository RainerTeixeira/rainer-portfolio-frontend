# 📚 Guia de Estrutura da API - Frontend

## 📋 Visão Geral

Este documento descreve a estrutura padronizada da camada de API do frontend, incluindo serviços, tipos e organização de código.

## 🏗️ Estrutura Completa

```
lib/api/
├── services/           # Serviços de integração com backend
│   ├── auth.service.ts
│   ├── bookmarks.service.ts
│   ├── categories.service.ts
│   ├── cloudinary.service.ts
│   ├── comments.service.ts
│   ├── dashboard.service.ts
│   ├── health.service.ts
│   ├── likes.service.ts
│   ├── notifications.service.ts
│   ├── posts.service.ts
│   ├── user.service.ts
│   ├── users.service.ts
│   └── index.ts        # Barrel export
│
├── types/              # Tipos TypeScript
│   ├── common.ts       # Tipos comuns (ApiResponse, Pagination)
│   ├── auth.ts         # Tipos de autenticação
│   ├── bookmarks.ts    # Tipos de bookmarks
│   ├── categories.ts   # Tipos de categorias
│   ├── cloudinary.ts   # Tipos de upload de imagens
│   ├── comments.ts     # Tipos de comentários
│   ├── dashboard.ts    # Tipos de dashboard/analytics
│   ├── health.ts       # Tipos de health check
│   ├── likes.ts        # Tipos de likes
│   ├── notifications.ts# Tipos de notificações
│   ├── posts.ts        # Tipos de posts
│   ├── users.ts        # Tipos de usuários
│   └── index.ts        # Barrel export
│
├── helpers/            # Funções auxiliares
│   ├── post-helpers.ts
│   └── index.ts
│
├── client.ts           # Cliente HTTP (Axios)
├── config.ts           # Configurações da API
├── debug-utils.ts      # Utilitários de debug
├── index.ts            # Barrel export principal
└── README.md           # Documentação
```

## ✅ Padrão de Organização

### 1. Todo Módulo Tem:

- ✅ **Serviço** (`services/*.service.ts`)
- ✅ **Tipos** (`types/*.ts`)
- ✅ **Testes** (`tests/lib/api/services/*.test.ts`)

### 2. Nomenclatura Padronizada:

```typescript
// Serviço
export class ModuleService {
  private readonly basePath = '/module';

  async getAll(): Promise<Module[]> {}
  async getById(id: string): Promise<Module> {}
  async create(data: CreateModuleData): Promise<Module> {}
  async update(id: string, data: UpdateModuleData): Promise<Module> {}
  async delete(id: string): Promise<void> {}
}

export const moduleService = new ModuleService();
```

```typescript
// Tipos
export interface Module {
  readonly id: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateModuleData {
  readonly name: string;
}

export interface UpdateModuleData {
  readonly name?: string;
}
```

## 📦 Módulos Disponíveis

### 1. Auth (Autenticação)

**Serviço:** `auth.service.ts`  
**Tipos:** `auth.ts`

```typescript
import { authService } from '@/lib/api/services/auth.service';
import type { LoginData, RegisterData, AuthTokens } from '@/lib/api/types/auth';

// Login
const response = await authService.login({ email, password });

// Registro
await authService.register({ fullName, email, password, nickname });

// OAuth
authService.loginWithGoogle();
authService.loginWithGitHub();
```

### 2. Users (Usuários)

**Serviço:** `user.service.ts` + `users.service.ts`  
**Tipos:** `users.ts`

```typescript
import { userService } from '@/lib/api/services/user.service';
import type { User, UpdateProfileData } from '@/lib/api/types/users';

// Obter perfil
const user = await userService.getProfile(userId);

// Atualizar perfil
await userService.updateProfile(userId, { bio: 'Nova bio' });
```

### 3. Posts (Artigos)

**Serviço:** `posts.service.ts`  
**Tipos:** `posts.ts`

```typescript
import { postsService } from '@/lib/api/services/posts.service';
import type { Post, CreatePostData } from '@/lib/api/types/posts';

// Listar posts
const posts = await postsService.getAll({ page: 1, limit: 10 });

// Criar post
const newPost = await postsService.create({
  title: 'Meu Post',
  content: tiptapJSON,
  categoryId: '123',
});
```

### 4. Categories (Categorias)

**Serviço:** `categories.service.ts`  
**Tipos:** `categories.ts`

```typescript
import { categoriesService } from '@/lib/api/services/categories.service';
import type { Category } from '@/lib/api/types/categories';

// Listar categorias
const categories = await categoriesService.getAll();

// Criar categoria
await categoriesService.create({ name: 'Tech', slug: 'tech' });
```

### 5. Comments (Comentários)

**Serviço:** `comments.service.ts`  
**Tipos:** `comments.ts`

```typescript
import { commentsService } from '@/lib/api/services/comments.service';
import type { Comment, CreateCommentData } from '@/lib/api/types/comments';

// Listar comentários de um post
const comments = await commentsService.getByPostId(postId);

// Criar comentário
await commentsService.create({ postId, content: 'Ótimo post!' });
```

### 6. Likes (Curtidas)

**Serviço:** `likes.service.ts`  
**Tipos:** `likes.ts`

```typescript
import { likesService } from '@/lib/api/services/likes.service';

// Curtir post
await likesService.likePost(postId);

// Descurtir post
await likesService.unlikePost(postId);

// Verificar se curtiu
const hasLiked = await likesService.hasLikedPost(postId);
```

### 7. Bookmarks (Favoritos)

**Serviço:** `bookmarks.service.ts`  
**Tipos:** `bookmarks.ts`

```typescript
import { bookmarksService } from '@/lib/api/services/bookmarks.service';
import type { Bookmark } from '@/lib/api/types/bookmarks';

// Listar bookmarks
const bookmarks = await bookmarksService.getAll();

// Adicionar bookmark
await bookmarksService.create({ postId });

// Remover bookmark
await bookmarksService.delete(bookmarkId);
```

### 8. Notifications (Notificações)

**Serviço:** `notifications.service.ts`  
**Tipos:** `notifications.ts`

```typescript
import { notificationsService } from '@/lib/api/services/notifications.service';
import type { Notification } from '@/lib/api/types/notifications';

// Listar notificações
const notifications = await notificationsService.getAll();

// Marcar como lida
await notificationsService.markAsRead(notificationId);

// Marcar todas como lidas
await notificationsService.markAllAsRead();
```

### 9. Cloudinary (Upload de Imagens)

**Serviço:** `cloudinary.service.ts`  
**Tipos:** `cloudinary.ts`

```typescript
import { cloudinaryService } from '@/lib/api/services/cloudinary.service';
import type { UploadImageResponse } from '@/lib/api/types/cloudinary';

// Upload de imagem do blog
const url = await cloudinaryService.uploadBlogImage(file, 'foto1.jpg');

// Upload de avatar
const avatarUrl = await cloudinaryService.uploadAvatar(file);
```

### 10. Dashboard (Analytics)

**Serviço:** `dashboard.service.ts`  
**Tipos:** `dashboard.ts`

```typescript
import { dashboardService } from '@/lib/api/services/dashboard.service';
import type { DashboardStats, AnalyticsData } from '@/lib/api/types/dashboard';

// Obter estatísticas
const stats = await dashboardService.getStats();

// Obter analytics
const analytics = await dashboardService.getAnalytics('30d');
```

### 11. Health (Monitoramento)

**Serviço:** `health.service.ts`  
**Tipos:** `health.ts`

```typescript
import { healthService } from '@/lib/api/services/health.service';
import type { HealthCheckResponse } from '@/lib/api/types/health';

// Verificar status da API
const health = await healthService.getHealthStatus();

// Verificar status detalhado
const detailed = await healthService.getDetailedHealthStatus();

// Verificar se API está online
const isOnline = await healthService.isApiOnline();
```

## 🎯 Importações Simplificadas

Use o barrel export para importar múltiplos tipos:

```typescript
// ✅ Recomendado - Usar barrel export
import { authService, postsService, userService } from '@/lib/api';

import type { Post, User, Category, DashboardStats } from '@/lib/api/types';

// ❌ Evitar - Importações individuais
import { authService } from '@/lib/api/services/auth.service';
import { postsService } from '@/lib/api/services/posts.service';
```

## 📝 Tipos Comuns

### ApiResponse

```typescript
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ApiSuccessResponse<T = unknown> {
  readonly success: true;
  readonly message?: string;
  readonly data: T;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly message: string;
  readonly error?: string;
  readonly statusCode?: number;
}
```

### Paginação

```typescript
export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
}

export interface PaginatedResponse<T> {
  readonly success: true;
  readonly data: T[];
  readonly pagination: PaginationMeta;
}
```

## 🧪 Testes

Cada serviço deve ter testes unitários:

```typescript
// tests/lib/api/services/module.service.test.ts
import { moduleService } from '@/lib/api/services/module.service';

describe('ModuleService', () => {
  describe('getAll', () => {
    it('deve retornar lista de modules', async () => {
      const modules = await moduleService.getAll();
      expect(modules).toBeInstanceOf(Array);
    });
  });
});
```

## ✨ Melhores Práticas

### 1. Use Tipos Readonly

```typescript
// ✅ Bom
export interface User {
  readonly id: string;
  readonly name: string;
}

// ❌ Evitar
export interface User {
  id: string;
  name: string;
}
```

### 2. Sempre Tipagem Explícita

```typescript
// ✅ Bom
async getUser(id: string): Promise<User> {
  return await api.get<User>(`/users/${id}`);
}

// ❌ Evitar
async getUser(id) {
  return await api.get(`/users/${id}`);
}
```

### 3. Tratamento de Erros

```typescript
// ✅ Bom
try {
  const user = await userService.getProfile(id);
  return user;
} catch (error) {
  console.error('Erro ao buscar usuário:', error);
  throw error;
}

// ❌ Evitar
const user = await userService.getProfile(id); // Pode quebrar sem aviso
```

### 4. Validação de Dados

```typescript
// ✅ Bom
async create(data: CreateUserData): Promise<User> {
  if (!data.email || !data.password) {
    throw new Error('Email e senha são obrigatórios');
  }
  return await api.post('/users', data);
}

// ❌ Evitar
async create(data: any): Promise<any> {
  return await api.post('/users', data);
}
```

### 5. Documentação JSDoc

````typescript
/**
 * Obtém um usuário por ID
 *
 * @param id - ID do usuário
 * @returns Dados do usuário
 * @throws Error se usuário não encontrado
 *
 * @example
 * ```typescript
 * const user = await userService.getById('123');
 * ```
 */
async getById(id: string): Promise<User> {
  // ...
}
````

## 🔧 Configuração do Cliente

O cliente HTTP está configurado em `client.ts`:

```typescript
import { api } from '@/lib/api/client';

// Configurar token de autenticação
api.setAuthToken(token);

// Fazer requisição GET
const response = await api.get<User>('/users/123');

// Fazer requisição POST
const newUser = await api.post<User>('/users', data);

// Fazer requisição PUT
const updated = await api.put<User>('/users/123', data);

// Fazer requisição DELETE
await api.delete('/users/123');
```

## 📊 Checklist de Padronização

Para adicionar um novo módulo:

- [ ] Criar serviço em `services/*.service.ts`
- [ ] Criar tipos em `types/*.ts`
- [ ] Exportar serviço em `services/index.ts`
- [ ] Exportar tipos em `types/index.ts`
- [ ] Criar testes em `tests/lib/api/services/*.test.ts`
- [ ] Documentar no README.md
- [ ] Seguir padrão de nomenclatura
- [ ] Usar tipos readonly
- [ ] Adicionar JSDoc
- [ ] Validar dados de entrada
- [ ] Tratar erros adequadamente

## 🎓 Recursos Adicionais

### Documentação

- **README principal:** `lib/api/README.md`
- **Guia OAuth:** `docs/08-MIGRACAO/OAUTH_AUTHENTICATION_GUIDE.md`
- **Este guia:** `docs/08-MIGRACAO/API_STRUCTURE_GUIDE.md`

### Exemplos Completos

Veja os serviços existentes para referência:

- `services/auth.service.ts` - Exemplo completo de autenticação
- `services/posts.service.ts` - CRUD completo
- `services/dashboard.service.ts` - Analytics e stats

### Links Úteis

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Jest Testing](https://jestjs.io/docs/getting-started)

---

**Versão:** 1.0.0  
**Data:** 2025-11-14  
**Autor:** Rainer Teixeira  
**Status:** ✅ PADRONIZAÇÃO COMPLETA
