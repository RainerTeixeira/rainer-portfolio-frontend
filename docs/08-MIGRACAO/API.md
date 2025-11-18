# 🔧 API - Estrutura e Padronização

## 📋 Visão Geral

Este documento descreve como foi realizada a padronização e organização da estrutura da API no frontend.

## ✅ Status Atual

**Status**: ✅ 100% Padronizado  
**Estrutura**: `lib/api/` organizada por responsabilidade

## 🏗️ Estrutura Atual

```
lib/api/
├── client.ts              # Cliente HTTP base
├── config.ts              # Configurações
├── index.ts               # Barrel exports
├── services/               # Serviços por domínio
│   ├── auth.service.ts
│   ├── posts.service.ts
│   ├── comments.service.ts
│   ├── categories.service.ts
│   ├── likes.service.ts
│   ├── bookmarks.service.ts
│   ├── users.service.ts
│   ├── dashboard.service.ts
│   ├── cloudinary.service.ts
│   ├── health.service.ts
│   └── index.ts
├── types/                  # Tipos separados por domínio
│   ├── auth.ts
│   ├── posts.ts
│   ├── comments.ts
│   ├── categories.ts
│   ├── likes.ts
│   ├── bookmarks.ts
│   ├── users.ts
│   ├── dashboard.ts
│   ├── cloudinary.ts
│   ├── health.ts
│   ├── common.ts
│   └── index.ts
└── helpers/                # Helpers reutilizáveis
    ├── post-helpers.ts
    └── index.ts
```

## 🎯 Como Foi Feita a Padronização

### 1. Barrel Exports

**Antes:**
```typescript
import { authService } from '@/lib/api/services/auth.service';
import { postsService } from '@/lib/api/services/posts.service';
```

**Depois:**
```typescript
import { authService, postsService } from '@/lib/api';
import type { Post, User } from '@/lib/api/types';
```

**Implementação:**
```typescript
// lib/api/index.ts
export * from './services';
export * from './types';
export * from './client';
export * from './config';
```

### 2. Tipos Separados por Domínio

**Antes:**
```typescript
// Tipos inline nos serviços
export class DashboardService {
  interface DashboardStats { ... } // inline
}
```

**Depois:**
```typescript
// types/dashboard.ts
export interface DashboardStats { ... }

// services/dashboard.service.ts
import type { DashboardStats } from '../types/dashboard';
```

### 3. Migração Dashboard API

**Antes:**
- Routes em `app/api/dashboard/`
- Tipos inline nos serviços

**Depois:**
- Serviço em `lib/api/services/dashboard.service.ts`
- Tipos em `lib/api/types/dashboard.ts`
- Hooks atualizados para usar barrel exports

### 4. Migração API Helpers

**Antes:**
- `lib/api-helpers.ts` (arquivo único)
- Helpers espalhados
- Código duplicado

**Depois:**
- Helpers em `lib/api/helpers/`
- Reutilização entre serviços
- Organização por responsabilidade

## 📊 Serviços Disponíveis

1. **authService** - Autenticação Cognito
2. **postsService** - CRUD de posts
3. **commentsService** - Comentários
4. **categoriesService** - Categorias
5. **likesService** - Curtidas
6. **bookmarksService** - Favoritos
7. **usersService** - Usuários
8. **dashboardService** - Dashboard stats
9. **cloudinaryService** - Upload de imagens
10. **healthService** - Health checks
11. **notificationsService** - Notificações

## 🔗 Integração com Backend

### Endpoints Mapeados

| Frontend Service | Backend Endpoint | Método |
|------------------|------------------|--------|
| `authService.register()` | `/auth/register` | POST |
| `authService.login()` | `/auth/login` | POST |
| `postsService.listPosts()` | `/posts` | GET |
| `dashboardService.getStats()` | `/dashboard/stats` | GET |
| `dashboardService.getAnalytics()` | `/dashboard/analytics` | GET |

### Configuração

```typescript
// lib/api/config.ts
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeout: 30000,
  maxRetries: 3,
};
```

## 🎯 Padrões Estabelecidos

### Serviços Padronizados

Todos os serviços seguem o mesmo padrão:
```typescript
export const postsService = {
  listPosts: async (params) => { ... },
  getPostBySlug: async (slug) => { ... },
  createPost: async (data) => { ... },
  // ...
};
```

### Tipos Readonly

```typescript
export interface Post {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: string;
}
```

## ✅ Validação

- ✅ Todos os serviços padronizados
- ✅ Tipos separados por domínio
- ✅ Barrel exports funcionando
- ✅ Imports atualizados
- ✅ Build sem erros
- ✅ Testes passando

---

**Última atualização**: 2025-01-28  
**Status**: ✅ Production Ready

