# Estrutura de Testes - Frontend

Este diretório contém todos os testes do projeto frontend, organizados para espelhar a estrutura de `app/`.

## 📁 Organização

```
tests/
├── app/                    # Testes que espelham a estrutura de app/
│   ├── page.test.tsx       # Teste da página inicial
│   ├── blog/
│   │   ├── page.test.tsx   # Teste da página de blog (a criar)
│   │   └── [slug]/
│   │       └── page.test.tsx  # Teste da página de post individual
│   ├── contato/
│   │   └── page.test.tsx   # Teste da página de contato (a criar)
│   ├── sobre/
│   │   └── page.test.tsx   # Teste da página sobre (a criar)
│   ├── dashboard/
│   │   ├── page.test.tsx   # Teste da página do dashboard (a criar)
│   │   ├── settings/
│   │   │   └── page.test.tsx  # Teste da página de configurações (a criar)
│   │   └── login/
│   │       ├── page.test.tsx  # Teste da página de login (a criar)
│   │       ├── register/
│   │       │   └── page.test.tsx  # Teste da página de registro (a criar)
│   │       ├── confirm-email/
│   │       │   └── page.test.tsx  # Teste da página de confirmação de email (a criar)
│   │       ├── forgot-password/
│   │       │   └── page.test.tsx  # Teste da página de recuperação de senha (a criar)
│   │       ├── reset-password/
│   │       │   ├── page.test.tsx  # Teste da página de reset de senha (a criar)
│   │       │   └── [token]/
│   │       │       └── page.test.tsx  # Teste da página de reset com token (a criar)
│   │       └── verify-email-admin/
│   │           └── page.test.tsx  # Teste da página de verificação admin (a criar)
│   └── api/                 # Testes de rotas API (espelha app/api/)
│       └── dashboard/
│           ├── analytics/
│           │   └── route.test.ts  # Teste da rota de analytics (a criar)
│           └── stats/
│               └── route.test.ts  # Teste da rota de stats (a criar)
├── integration/             # Testes de integração de serviços
│   └── api/
│       ├── auth.service.test.ts
│       ├── bookmarks.service.test.ts
│       ├── categories.service.test.ts
│       ├── comments.service.test.ts
│       ├── likes.service.test.ts
│       ├── posts.service.test.ts
│       ├── user.service.test.ts
│       └── users.service.test.ts
├── e2e/                     # Testes end-to-end (Playwright)
│   ├── accessibility.spec.ts
│   ├── api-structure.spec.ts
│   ├── chrome-visual.spec.ts
│   ├── create-post-with-image.spec.ts
│   ├── dashboard.spec.ts
│   └── preview-imagem-ui.spec.ts
├── live/                    # Testes live (requerem servidor em execução)
│   └── api/
│       └── smoke.live.test.ts
├── scripts/                 # Scripts auxiliares de teste
│   ├── run-all-tests.js
│   ├── test-performance.js
│   ├── testar-ui-chrome.js
│   └── ... (ver README.md em scripts/)
├── fixtures/                # Dados de teste (JSON, etc)
│   └── test-post.json
└── utils/                   # Utilitários e mocks para testes
    └── mockFetch.ts
```

## 🎯 Princípios de Organização

### 1. Estrutura Espelhada (`tests/app/`)

- A estrutura de `tests/app/` **espelha exatamente** a estrutura de `app/`
- Cada arquivo `page.tsx` em `app/` deve ter um correspondente `page.test.tsx` em `tests/app/`
- Cada rota API em `app/api/` deve ter um correspondente `route.test.ts` em `tests/app/api/`

### 2. Testes de Integração (`tests/integration/`)

- Testes que verificam a integração entre serviços e APIs
- Testam o comportamento completo de serviços, não apenas unidades isoladas

### 3. Testes E2E (`tests/e2e/`)

- Testes end-to-end usando Playwright
- Testam fluxos completos do usuário
- Nomenclatura: `*.spec.ts`

### 4. Testes Live (`tests/live/`)

- Testes que requerem servidor real em execução
- Excluídos da execução padrão do Jest

## 📝 Convenções de Nomenclatura

- **Testes de páginas**: `page.test.tsx` (espelha `page.tsx`)
- **Testes de rotas API**: `route.test.ts` (espelha `route.ts`)
- **Testes E2E**: `*.spec.ts`
- **Testes de serviços**: `*.service.test.ts`
- **Testes live**: `*.live.test.ts`

## 🔍 Redundâncias Removidas

- ❌ **Removido**: `tests/lib/api/posts.service.test.ts` (redundante com `tests/integration/api/posts.service.test.ts`)
- ✅ **Consolidado**: Testes de `postsService` agora estão apenas em `tests/integration/api/posts.service.test.ts`
- ✅ **Movidos**: `tests/lib/api/services/auth.service.test.ts` → `tests/integration/api/auth.service.test.ts`
- ✅ **Movidos**: `tests/lib/api/services/user.service.test.ts` → `tests/integration/api/user.service.test.ts`

## 🚀 Executando Testes

```bash
# Todos os testes unitários e de integração
npm test

# Testes de uma pasta específica
npm test tests/app
npm test tests/integration

# Testes E2E
npm run test:e2e

# Testes com cobertura
npm run test:coverage
```

## 📊 Status Atual

### Testes Implementados ✅

- `tests/app/page.test.tsx` - Página inicial
- `tests/app/blog/[slug]/page.test.tsx` - Página de post individual
- `tests/integration/api/*` - Todos os serviços de API
- `tests/e2e/*` - Testes end-to-end

### Testes Pendentes 📝

- Testes de páginas em `tests/app/` que ainda não foram criados
- Testes de rotas API em `tests/app/api/`

## 🔧 Próximos Passos

1. Criar testes para páginas que ainda não têm (`blog/page.test.tsx`, `contato/page.test.tsx`, etc.)
2. Criar testes para serviços API (`tests/lib/api/services/*.test.ts`)
3. Aumentar cobertura de código para 80%
