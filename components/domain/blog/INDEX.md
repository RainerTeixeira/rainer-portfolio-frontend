# 📑 Índice - Blog Components & API Integration

Guia de navegação completo da integração frontend-backend.

## 🚀 Comece Aqui

### Para Iniciantes

1. **[INTEGRATION_COMPLETE.md](../../INTEGRATION_COMPLETE.md)** 🎉
   - Resumo executivo
   - O que foi feito
   - Como usar rapidamente

2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** ⚡
   - Referência rápida
   - Copiar e colar código
   - Consulta rápida

3. **[Blog Page Example](../../lib/api/examples/blog-page-example.tsx)** 📝
   - Exemplo completo funcional
   - Código pronto para usar

### Para Desenvolvedores

1. **[Hooks README](./hooks/README.md)** 📚
   - Documentação completa dos hooks
   - API reference
   - Exemplos detalhados

2. **[API Library README](../../lib/api/README.md)** 🔧
   - Documentação dos services
   - Cliente HTTP
   - Configuração avançada

3. **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** ✅
   - Resumo técnico da integração
   - Estrutura de arquivos
   - Recursos implementados

## 📚 Documentação por Categoria

### 🎣 Hooks

**Localização:** `components/blog/hooks/`

| Hook               | Descrição                    | Documentação                                 |
| ------------------ | ---------------------------- | -------------------------------------------- |
| `usePosts`         | Lista de posts com paginação | [README](./hooks/README.md#useposts)         |
| `usePost`          | Post individual              | [README](./hooks/README.md#usepost)          |
| `useComments`      | Sistema de comentários       | [README](./hooks/README.md#usecomments)      |
| `useCategories`    | Lista de categorias          | [README](./hooks/README.md#usecategories)    |
| `useCategory`      | Categoria individual         | [README](./hooks/README.md#usecategory)      |
| `useSubcategories` | Subcategorias                | [README](./hooks/README.md#usesubcategories) |
| `useLike`          | Sistema de curtidas          | [README](./hooks/README.md#uselike)          |
| `useBookmark`      | Sistema de favoritos         | [README](./hooks/README.md#usebookmark)      |

**Documentação Completa:** [hooks/README.md](./hooks/README.md)

### 🔧 Services

**Localização:** `lib/api/services/`

| Service                | Descrição                 | Documentação                                            |
| ---------------------- | ------------------------- | ------------------------------------------------------- |
| `postsService`         | CRUD de posts             | [README](../../lib/api/README.md#posts-service)         |
| `categoriesService`    | Categorias hierárquicas   | [README](../../lib/api/README.md#categories-service)    |
| `commentsService`      | Comentários com moderação | [README](../../lib/api/README.md#comments-service)      |
| `likesService`         | Curtidas                  | [README](../../lib/api/README.md#likes-service)         |
| `bookmarksService`     | Favoritos com coleções    | [README](../../lib/api/README.md#bookmarks-service)     |
| `usersService`         | Gerenciamento de usuários | [README](../../lib/api/README.md#users-service)         |
| `authService`          | Autenticação Cognito      | [README](../../lib/api/README.md#auth-service)          |
| `notificationsService` | Notificações              | [README](../../lib/api/README.md#notifications-service) |
| `healthService`        | Health checks             | [README](../../lib/api/README.md#health-service)        |

**Documentação Completa:** [lib/api/README.md](../../lib/api/README.md)

### 📝 Exemplos

| Exemplo            | Descrição                          | Arquivo                                                                         |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------------------- |
| Blog Page Complete | Exemplo completo de página de blog | [blog-page-example.tsx](../../lib/api/examples/blog-page-example.tsx)           |
| Lista de Posts     | Lista com filtros e paginação      | [blog-page-example.tsx#L20](../../lib/api/examples/blog-page-example.tsx#L20)   |
| Post Individual    | Post com comentários e likes       | [blog-page-example.tsx#L150](../../lib/api/examples/blog-page-example.tsx#L150) |
| Card de Post       | Card com interações                | [blog-page-example.tsx#L80](../../lib/api/examples/blog-page-example.tsx#L80)   |

### 📖 Guias

| Guia                 | Descrição            | Arquivo                                                        |
| -------------------- | -------------------- | -------------------------------------------------------------- |
| Quick Reference      | Referência rápida    | [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)                     |
| Integration Summary  | Resumo da integração | [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)             |
| Integration Complete | Resumo executivo     | [../../INTEGRATION_COMPLETE.md](../../INTEGRATION_COMPLETE.md) |
| Checklist            | Status da integração | [CHECKLIST.md](./CHECKLIST.md)                                 |

## 🎯 Por Funcionalidade

### Posts

**Hooks:**

- [usePosts](./hooks/README.md#useposts) - Lista com paginação
- [usePost](./hooks/README.md#usepost) - Individual

**Service:**

- [postsService](../../lib/api/README.md#posts-service)

**Exemplo:**

- [Lista de Posts](../../lib/api/examples/blog-page-example.tsx#L20)
- [Post Individual](../../lib/api/examples/blog-page-example.tsx#L150)

### Categorias

**Hooks:**

- [useCategories](./hooks/README.md#usecategories) - Lista
- [useCategory](./hooks/README.md#usecategory) - Individual
- [useSubcategories](./hooks/README.md#usesubcategories) - Subcategorias

**Service:**

- [categoriesService](../../lib/api/README.md#categories-service)

### Comentários

**Hook:**

- [useComments](./hooks/README.md#usecomments) - CRUD completo

**Service:**

- [commentsService](../../lib/api/README.md#comments-service)

**Exemplo:**

- [Seção de Comentários](../../lib/api/examples/blog-page-example.tsx#L200)

### Curtidas

**Hook:**

- [useLike](./hooks/README.md#uselike) - Like/Unlike

**Service:**

- [likesService](../../lib/api/README.md#likes-service)

**Exemplo:**

- [Botão de Like](../../lib/api/examples/blog-page-example.tsx#L100)

### Favoritos

**Hook:**

- [useBookmark](./hooks/README.md#usebookmark) - Save/Unsave

**Service:**

- [bookmarksService](../../lib/api/README.md#bookmarks-service)

**Exemplo:**

- [Botão de Bookmark](../../lib/api/examples/blog-page-example.tsx#L110)

## 🔍 Por Tipo de Conteúdo

### Tutoriais

1. [Como usar os hooks](./hooks/README.md#uso-básico)
2. [Como usar os services](../../lib/api/README.md#uso-básico)
3. [Como implementar paginação](./hooks/README.md#paginação)
4. [Como tratar erros](../../lib/api/README.md#error-handling)

### Referências

1. [API Reference dos Hooks](./hooks/README.md#api-reference)
2. [API Reference dos Services](../../lib/api/README.md#services-disponíveis)
3. [TypeScript Types](../../lib/api/README.md#typescript-types)
4. [Configuração](../../lib/api/README.md#configuração-avançada)

### Exemplos de Código

1. [Exemplo Completo](../../lib/api/examples/blog-page-example.tsx)
2. [Quick Reference](./QUICK_REFERENCE.md)
3. [Hooks README](./hooks/README.md#exemplos-práticos)
4. [API README](../../lib/api/README.md#exemplos-de-uso)

## 📂 Estrutura de Arquivos

```text
frontend/
├── components/blog/
│   ├── hooks/                      # 🎣 React Hooks
│   │   ├── use-posts.ts
│   │   ├── use-comments.ts
│   │   ├── use-categories.ts
│   │   ├── use-like.ts
│   │   ├── use-bookmark.ts
│   │   ├── index.ts
│   │   └── README.md              # 📚 Documentação dos hooks
│   │
│   ├── README.md                   # 📖 README principal
│   ├── INTEGRATION_SUMMARY.md      # ✅ Resumo da integração
│   ├── QUICK_REFERENCE.md          # ⚡ Referência rápida
│   ├── CHECKLIST.md                # ✓ Checklist
│   └── INDEX.md                    # 📑 Este arquivo
│
├── lib/api/
│   ├── services/                   # 🔧 API Services
│   │   ├── posts.service.ts
│   │   ├── categories.service.ts
│   │   ├── comments.service.ts
│   │   ├── likes.service.ts
│   │   ├── bookmarks.service.ts
│   │   └── index.ts
│   │
│   ├── examples/                   # 📝 Exemplos
│   │   └── blog-page-example.tsx
│   │
│   ├── client.ts                   # Cliente HTTP
│   ├── config.ts                   # Configuração
│   ├── types.ts                    # TypeScript types
│   └── README.md                   # 📚 Documentação da API
│
└── INTEGRATION_COMPLETE.md         # 🎉 Resumo executivo
```

## 🔗 Links Externos

### Backend

- 🌐 [API Docs](http://localhost:4000/docs) - Swagger UI
- 📖 [Backend README](../../../rainer-portfolio-backend/README.md)
- 🗄️ [Database Schema](../../../rainer-portfolio-backend/src/prisma/schema.prisma)

### Ferramentas

- 🎨 [Prisma Studio](http://localhost:5555) - GUI do MongoDB
- 📊 [DynamoDB Admin](http://localhost:8001) - GUI do DynamoDB

## 🎯 Fluxo de Trabalho Recomendado

### 1. Primeira Vez

1. Leia [INTEGRATION_COMPLETE.md](../../INTEGRATION_COMPLETE.md)
2. Configure `.env.local`
3. Veja o [Exemplo Completo](../../lib/api/examples/blog-page-example.tsx)
4. Consulte [Quick Reference](./QUICK_REFERENCE.md)

### 2. Desenvolvimento

1. Consulte [Quick Reference](./QUICK_REFERENCE.md) para código rápido
2. Use [Hooks README](./hooks/README.md) para detalhes
3. Veja [API README](../../lib/api/README.md) para services
4. Consulte [Backend Docs](http://localhost:4000/docs) quando necessário

### 3. Troubleshooting

1. Verifique [CHECKLIST.md](./CHECKLIST.md) - Status
2. Consulte [Error Handling](../../lib/api/README.md#error-handling)
3. Veja [Backend Logs](../../../rainer-portfolio-backend/logs/)

## 📊 Mapa Mental

```text
Blog Integration
├── 🎣 Hooks (Frontend)
│   ├── usePosts → postsService
│   ├── useComments → commentsService
│   ├── useCategories → categoriesService
│   ├── useLike → likesService
│   └── useBookmark → bookmarksService
│
├── 🔧 Services (API Layer)
│   ├── postsService → Backend API
│   ├── categoriesService → Backend API
│   ├── commentsService → Backend API
│   ├── likesService → Backend API
│   └── bookmarksService → Backend API
│
├── 🌐 Backend API (NestJS)
│   ├── /posts → MongoDB/DynamoDB
│   ├── /categories → MongoDB/DynamoDB
│   ├── /comments → MongoDB/DynamoDB
│   ├── /likes → MongoDB/DynamoDB
│   └── /bookmarks → MongoDB/DynamoDB
│
└── 🗄️ Database
    ├── MongoDB (Dev)
    └── DynamoDB (Prod)
```

## 🎓 Recursos de Aprendizado

### Iniciante

1. [INTEGRATION_COMPLETE.md](../../INTEGRATION_COMPLETE.md) - Visão geral
2. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Código rápido
3. [Blog Page Example](../../lib/api/examples/blog-page-example.tsx) - Exemplo prático

### Intermediário

1. [Hooks README](./hooks/README.md) - Documentação completa
2. [API README](../../lib/api/README.md) - Services e configuração
3. [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md) - Detalhes técnicos

### Avançado

1. [Backend README](../../../rainer-portfolio-backend/README.md) - Arquitetura backend
2. [Backend API Docs](http://localhost:4000/docs) - Swagger completo
3. [Database Schema](../../../rainer-portfolio-backend/src/prisma/schema.prisma) - Schema do banco

## 🔍 Busca Rápida

**Precisa de:**

- Código rápido? → [Quick Reference](./QUICK_REFERENCE.md)
- Exemplo completo? → [Blog Page Example](../../lib/api/examples/blog-page-example.tsx)
- Documentação de hook? → [Hooks README](./hooks/README.md)
- Documentação de service? → [API README](../../lib/api/README.md)
- Status da integração? → [Checklist](./CHECKLIST.md)
- Visão geral? → [Integration Complete](../../INTEGRATION_COMPLETE.md)

---

**💡 Dica:** Adicione este arquivo aos favoritos para navegação rápida!

**Autor:** Rainer Teixeira  
**Versão:** 1.0.0  
**Última Atualização:** 2025
