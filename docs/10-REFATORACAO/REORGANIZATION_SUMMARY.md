# 📦 Reorganização de Utilitários - Blog & Dashboard

Reorganização seguindo o padrão: **público (sem autenticação) vs privado (com autenticação)**.

## ✅ Estrutura Reorganizada

### 📂 Antes

```
components/blog/lib/
├── blog-fake-api.ts          # ❌ Misturava público + privado
├── blog-local-store.ts       # ❌ Duplicado
└── mocks/

components/dashboard/lib/
├── auth-local.ts
├── cloudinary.ts
└── tiptap-utils.ts

lib/
├── api/                      # API real do backend
└── (outros utilitários)
```

### 📂 Depois

```
lib/
├── blog-store.ts             # ✅ Store compartilhado (global)
├── blog-public-api.ts        # ✅ API pública (somente leitura)
└── api/                      # API real do backend

components/blog/lib/
├── blog-fake-api.ts          # ⚠️ DEPRECATED (re-export)
├── blog-local-store.ts       # ⚠️ DEPRECATED (re-export)
└── mocks/                    # Mantido

components/dashboard/lib/
├── blog-admin-api.ts         # ✅ API admin (CRUD completo)
├── auth-local.ts             # Mantido
├── cloudinary.ts             # Mantido
└── tiptap-utils.ts           # Mantido
```

## 🎯 Separação de Responsabilidades

### 1. **Blog Público** (Sem Autenticação)

**Localização:** `lib/blog-public-api.ts`

**Operações:**

- ✅ `getPublishedPosts()` - Lista posts publicados
- ✅ `getPostBySlug()` - Busca post por slug

**Uso:**

```typescript
import { blogPublicApi } from '@/lib/blog-public-api';

// Páginas públicas do blog
const posts = await blogPublicApi.getPublishedPosts();
const post = await blogPublicApi.getPostBySlug('meu-post');
```

---

### 2. **Dashboard Admin** (Com Autenticação)

**Localização:** `components/dashboard/lib/blog-admin-api.ts`

**Operações:**

- ✅ `getPosts()` - Lista TODOS os posts (incluindo rascunhos)
- ✅ `createPost()` - Criar post
- ✅ `updatePost()` - Atualizar post
- ✅ `deletePost()` - Deletar post
- ✅ `reset()` - Resetar dados

**Uso:**

```typescript
import { blogAdminApi } from '@/components/dashboard/lib/blog-admin-api';

// Dashboard admin
const allPosts = await blogAdminApi.getPosts();
const newPost = await blogAdminApi.createPost(data);
await blogAdminApi.updatePost(id, updates);
await blogAdminApi.deletePost(id);
```

---

### 3. **Store Compartilhado** (Global)

**Localização:** `lib/blog-store.ts`

**Responsabilidade:**

- Gerencia localStorage
- Métodos CRUD internos
- Usado por ambas as APIs

**Uso:**

```typescript
import { blogStore, type BlogPost } from '@/lib/blog-store';

// Uso interno (não recomendado diretamente)
const posts = blogStore.getPosts();
```

## 📋 Migração

### ❌ Antes (Código Antigo)

```typescript
// Misturava público e privado
import {
  blogPublicApi,
  blogAdminApi,
} from '@/components/blog/lib/blog-fake-api';
import { blogStore } from '@/components/blog/lib/blog-local-store';
```

### ✅ Depois (Código Novo)

```typescript
// Blog público (páginas /blog)
import { blogPublicApi } from '@/lib/blog-public-api';

// Dashboard admin (páginas /dashboard)
import { blogAdminApi } from '@/components/dashboard/lib/blog-admin-api';

// Store (se necessário)
import { blogStore, type BlogPost } from '@/lib/blog-store';
```

## 🔄 Compatibilidade

Os arquivos antigos foram mantidos como **re-exports** para compatibilidade:

```typescript
// components/blog/lib/blog-fake-api.ts
export { blogPublicApi } from '@/lib/blog-public-api';
export { blogAdminApi } from '@/components/dashboard/lib/blog-admin-api';

// components/blog/lib/blog-local-store.ts
export { blogStore, type BlogPost } from '@/lib/blog-store';
```

**Status:** ⚠️ DEPRECATED - Serão removidos em versão futura

## 🎨 Padrão Aplicado

### Regra de Ouro

```
📂 lib/                          → Utilitários PÚBLICOS (global)
📂 components/[area]/lib/        → Utilitários PRIVADOS (específicos)
```

### Exemplos

| Funcionalidade          | Público? | Localização                                  |
| ----------------------- | -------- | -------------------------------------------- |
| Listar posts publicados | ✅ Sim   | `lib/blog-public-api.ts`                     |
| Criar/editar posts      | ❌ Não   | `components/dashboard/lib/blog-admin-api.ts` |
| Upload de imagens       | ❌ Não   | `components/dashboard/lib/cloudinary.ts`     |
| Editor de texto         | ❌ Não   | `components/dashboard/lib/tiptap-utils.ts`   |
| Autenticação mock       | ❌ Não   | `components/dashboard/lib/auth-local.ts`     |
| API real backend        | ✅ Sim   | `lib/api/`                                   |

## ✅ Benefícios

1. **Separação clara** - Público vs Privado
2. **Segurança** - Admin isolado no dashboard
3. **Manutenibilidade** - Código organizado por responsabilidade
4. **Escalabilidade** - Fácil adicionar novas funcionalidades
5. **Compatibilidade** - Re-exports mantêm código antigo funcionando

## 🚀 Próximos Passos

1. ✅ Reorganização aplicada
2. ⏳ Atualizar imports nos componentes
3. ⏳ Remover arquivos deprecated (futuro)
4. ⏳ Migrar para API real (`lib/api/services`)

---

**Autor:** Rainer Teixeira  
**Data:** 2025  
**Status:** ✅ COMPLETO
