# Guia de Boas Práticas de Testes

Este documento descreve as boas práticas para escrever testes no projeto, seguindo o princípio:

> **Em testes unitários, mocks são quase sempre úteis. Em testes de integração, use dados reais. Em testes end-to-end, evite mocks para simular o mundo real.**

## 📋 Índice

1. [Testes Unitários](#testes-unitários)
2. [Testes de Integração](#testes-de-integração)
3. [Testes End-to-End](#testes-end-to-end)
4. [Organização de Logs e Resultados](#organização-de-logs-e-resultados)
5. [Exemplos Práticos](#exemplos-práticos)

---

## 🧪 Testes Unitários

**Localização**: `tests/app/`, `tests/components/`, `tests/hooks/`, `tests/lib/`

### Princípios

- ✅ **Use mocks** para isolar unidades de código
- ✅ Teste comportamento, não implementação
- ✅ Mantenha testes rápidos (< 100ms cada)
- ✅ Testes independentes (sem dependências entre testes)
- ✅ Use dados mockados controlados

### Quando Usar Mocks

```typescript
// ✅ BOM: Mock de API client
jest.mock('@/lib/api/client');
const mockApi = api as jest.Mocked<typeof api>;
mockApi.get.mockResolvedValue({ data: mockData });

// ✅ BOM: Mock de hooks
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ user: mockUser, isAuthenticated: true }),
}));

// ✅ BOM: Mock de módulos externos
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));
```

### Exemplo Completo

```typescript
// tests/lib/utils/string.test.ts
import { textToSlug } from '@/lib/utils/string';

describe('textToSlug', () => {
  it('deve converter texto para slug', () => {
    // ✅ Dados mockados controlados
    const input = 'Hello World';
    const expected = 'hello-world';

    const result = textToSlug(input);

    expect(result).toBe(expected);
  });
});
```

---

## 🔗 Testes de Integração

**Localização**: `tests/integration/`

### Princípios

- ✅ **Use dados reais** quando possível
- ✅ Teste interação entre módulos
- ✅ Use mocks apenas para serviços externos (APIs, DB, File System)
- ✅ Valide fluxos completos
- ✅ Testes podem ser mais lentos (até 5s cada)

### Quando Usar Dados Reais

```typescript
// ✅ BOM: Dados reais para integração
import { postsService } from '@/lib/api';
import { searchContent } from '@/lib/utils/search';

describe('searchContent integration', () => {
  it('deve buscar e processar posts reais', async () => {
    // ✅ Dados reais do serviço
    const results = await searchContent('React');

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });
});
```

### Quando Usar Mocks (Apenas Serviços Externos)

```typescript
// ✅ BOM: Mock apenas de serviços externos
jest.mock('@/lib/api/external-service'); // API externa
jest.mock('fs/promises'); // File System
jest.mock('@/lib/database'); // Database

// ✅ Dados reais para lógica interna
const result = await processData(realInput);
```

### Exemplo Completo

```typescript
// tests/integration/api/posts.integration.test.ts
import { postsService } from '@/lib/api';
import { formatDate } from '@/lib/utils/string';

describe('Posts Integration', () => {
  it('deve buscar e formatar posts reais', async () => {
    // ✅ Dados reais do serviço
    const posts = await postsService.getPosts({ limit: 5 });

    // ✅ Validação de integração
    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);

    // ✅ Teste de interação entre módulos
    if (posts.length > 0) {
      const formatted = formatDate(posts[0].createdAt);
      expect(typeof formatted).toBe('string');
    }
  });
});
```

---

## 🌐 Testes End-to-End

**Localização**: `tests/e2e/`

### Princípios

- ✅ **Evite mocks** para simular mundo real
- ✅ Use dados reais ou fixtures realistas
- ✅ Teste fluxos completos do usuário
- ✅ Valide comportamento real da aplicação
- ✅ Testes podem ser lentos (até 30s cada)

### Quando Evitar Mocks

```typescript
// ✅ BOM: Sem mocks, comportamento real
import { test, expect } from '@playwright/test';

test('deve fazer login completo', async ({ page }) => {
  await page.goto('/dashboard/login');

  // ✅ Dados reais (ou fixtures realistas)
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // ✅ Validação de comportamento real
  await expect(page).toHaveURL('/dashboard');
});
```

### Quando Usar Fixtures Realistas

```typescript
// ✅ BOM: Fixtures realistas (não mocks)
import { test } from '@playwright/test';
import { mockUser } from '../fixtures/users';

test('deve criar post com dados realistas', async ({ page }) => {
  // ✅ Fixture realista (estrutura real, dados de teste)
  const postData = {
    title: 'Test Post',
    content: 'Test content',
    author: mockUser.id,
  };

  await page.goto('/dashboard/posts/new');
  await page.fill('[name="title"]', postData.title);
  // ...
});
```

### Exemplo Completo

```typescript
// tests/e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test('deve carregar dashboard completo', async ({ page }) => {
    // ✅ Sem mocks - comportamento real
    await page.goto('/dashboard');

    // ✅ Validação de elementos reais
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('[data-testid="stats"]')).toBeVisible();

    // ✅ Interação real com a página
    await page.click('[data-testid="new-post-button"]');
    await expect(page).toHaveURL('/dashboard/posts/new');
  });
});
```

---

## 📁 Organização de Logs e Resultados

Todos os logs e resultados de testes são salvos em `tests/test-results/`:

```
tests/test-results/
├── coverage/              # Cobertura de código (Jest)
│   ├── index.html         # Relatório HTML
│   ├── coverage-final.json
│   └── lcov.info
├── e2e/                   # Resultados E2E (Playwright)
│   ├── playwright-report/ # Relatório HTML
│   ├── results.json       # Resultados JSON
│   ├── junit.xml          # Resultados JUnit
│   └── artifacts/         # Screenshots, vídeos, traces
│       ├── screenshots/
│       ├── videos/
│       └── traces/
└── logs/                  # Logs de execução
    ├── jest.log
    ├── playwright.log
    └── test-run-*.log
```

### Configuração

**Jest** (`jest.config.js`):

```javascript
coverageDirectory: 'tests/test-results/coverage',
```

**Playwright** (`playwright.config.ts`):

```typescript
reporter: [
  ['html', { outputFolder: 'tests/test-results/e2e/playwright-report' }],
  ['json', { outputFile: 'tests/test-results/e2e/results.json' }],
],
outputDir: 'tests/test-results/e2e/artifacts',
```

---

## 💡 Exemplos Práticos

### ❌ Erro Comum: Mock em E2E

```typescript
// ❌ ERRADO: Mock em teste E2E
jest.mock('@/lib/api');
test('deve fazer login', async ({ page }) => {
  // Isso não testa o comportamento real!
});
```

### ✅ Correto: Sem Mocks em E2E

```typescript
// ✅ CORRETO: Comportamento real
test('deve fazer login', async ({ page }) => {
  await page.goto('/dashboard/login');
  await page.fill('[name="email"]', 'test@example.com');
  // Testa o fluxo real do usuário
});
```

### ❌ Erro Comum: Dados Reais em Unitário

```typescript
// ❌ ERRADO: Dados reais em teste unitário
test('deve formatar data', async () => {
  const realPost = await postsService.getPost('123'); // Muito lento!
  const formatted = formatDate(realPost.createdAt);
});
```

### ✅ Correto: Mock em Unitário

```typescript
// ✅ CORRETO: Dados mockados
test('deve formatar data', () => {
  const mockDate = '2024-01-15T10:30:00Z'; // Dado controlado
  const formatted = formatDate(mockDate);
  expect(formatted).toBe('15/01/2024');
});
```

---

## 📊 Resumo

| Tipo de Teste  | Mocks                       | Dados Reais            | Localização                                                     |
| -------------- | --------------------------- | ---------------------- | --------------------------------------------------------------- |
| **Unitário**   | ✅ Sempre                   | ❌ Evitar              | `tests/app/`, `tests/components/`, `tests/hooks/`, `tests/lib/` |
| **Integração** | ⚠️ Apenas serviços externos | ✅ Sempre que possível | `tests/integration/`                                            |
| **E2E**        | ❌ Evitar                   | ✅ Sempre              | `tests/e2e/`                                                    |

---

## 🔍 Checklist

Antes de escrever um teste, pergunte:

- [ ] É um teste unitário? → Use mocks
- [ ] É um teste de integração? → Use dados reais, mock apenas serviços externos
- [ ] É um teste E2E? → Evite mocks, use comportamento real
- [ ] O teste está no diretório correto?
- [ ] Os resultados serão salvos em `tests/test-results/`?

---

**Última atualização**: 2024-11-13
