# 🔍 Análise de Discrepâncias nos Testes E2E

Este documento lista todas as discrepâncias encontradas nos testes E2E e recomendações de padronização.

## 📊 Resumo Executivo

- **Total de arquivos E2E analisados**: 19 arquivos `.spec.ts`
- **Discrepâncias encontradas**: 5 categorias principais
- **Prioridade**: Alta - Padronização necessária para manutenibilidade

---

## 🔴 Discrepâncias Críticas

### 1. Importações Inconsistentes

**Problema**: A maioria dos testes não está usando o sistema de monitoramento de console.

**Status Atual**:
- ✅ **1 arquivo** usa fixtures com monitoramento: `main-routes-console-check.spec.ts`
- ❌ **18 arquivos** usam importação direta do Playwright sem monitoramento

**Arquivos afetados**:
```
tests/e2e/auth-passwordless.spec.ts
tests/e2e/social-login.spec.ts
tests/e2e/preview-imagem-ui.spec.ts
tests/e2e/oauth-callback.spec.ts
tests/e2e/google-signup-manual-real-chrome.spec.ts
tests/e2e/google-signup-flow.spec.ts
tests/e2e/google-real-signup.spec.ts
tests/e2e/google-real-manual.spec.ts
tests/e2e/github-signup-flow.spec.ts
tests/e2e/dashboard.spec.ts
tests/e2e/create-post-with-image.spec.ts
tests/e2e/cookies.spec.ts
tests/e2e/cookies-production.spec.ts
tests/e2e/cookies-localstorage.spec.ts
tests/e2e/chrome-visual.spec.ts
tests/e2e/accessibility.spec.ts
tests/e2e/api-structure.spec.ts
tests/e2e/examples/example-with-console-monitoring.spec.ts
```

**Recomendação**:
```typescript
// ❌ ATUAL (sem monitoramento)
import { expect, test } from '@playwright/test';

// ✅ RECOMENDADO (com monitoramento automático)
import { expect, test } from './fixtures';
```

**Benefícios**:
- Captura automática de erros do console (F12)
- Detecção de erros JavaScript não tratados
- Relatórios detalhados de erros
- Validação automática de erros críticos

---

### 2. Configuração de BASE_URL Inconsistente

**Problema**: Diferentes padrões de definição de BASE_URL.

**Padrões encontrados**:

1. **Com assertion obrigatória** (pode quebrar):
   ```typescript
   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
   ```
   - Usado em: `dashboard.spec.ts`

2. **Com fallback** (mais seguro):
   ```typescript
   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
   ```
   - Usado em: `cookies.spec.ts`, `cookies-production.spec.ts`

3. **Sem definição explícita** (usa baseURL do config):
   - Usado em: `main-routes-console-check.spec.ts`, `accessibility.spec.ts`

**Recomendação**:
```typescript
// ✅ PADRÃO RECOMENDADO
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
```

**Ou melhor ainda**, usar apenas `page.goto('/')` sem BASE_URL, já que o `playwright.config.ts` define `baseURL`.

---

### 3. Estrutura de Testes Inconsistente

**Problema**: Diferentes padrões de organização de testes.

**Padrões encontrados**:

1. **Com beforeEach e BASE_URL explícito**:
   ```typescript
   test.describe('Dashboard - Teste de UI', () => {
     test.beforeEach(async ({ page }) => {
       await page.goto(`${BASE_URL}/dashboard`);
     });
   });
   ```

2. **Sem beforeEach, navegação no teste**:
   ```typescript
   test('deve carregar página', async ({ page }) => {
     await page.goto('/');
   });
   ```

3. **Com configuração de storageState**:
   ```typescript
   test.use({
     storageState: { cookies: [], origins: [] },
   });
   ```

**Recomendação**: Padronizar estrutura básica:
```typescript
test.describe('Nome do Módulo', () => {
  test.beforeEach(async ({ page }) => {
    // Configuração comum se necessário
  });

  test('descrição do teste', async ({ page, consoleHelper }) => {
    // Teste
  });
});
```

---

### 4. Falta de Monitoramento de Console

**Problema**: Apenas 1 de 19 testes usa o sistema de monitoramento de console.

**Impacto**:
- Erros JavaScript podem passar despercebidos
- Warnings não são reportados
- Erros de rede não são capturados
- Debugging mais difícil

**Recomendação**: Migrar todos os testes para usar fixtures:
```typescript
// Adicionar consoleHelper aos testes
test('meu teste', async ({ page, consoleHelper }) => {
  await page.goto('/');
  
  // Verificar erros se necessário
  if (consoleHelper.hasErrors()) {
    console.log(consoleHelper.generateReport());
  }
});
```

---

### 5. Timeouts Inconsistentes

**Problema**: Diferentes valores de timeout em diferentes testes.

**Padrões encontrados**:
- Sem timeout explícito (usa padrão do config: 30s)
- `timeout: 10000` em alguns expects
- `timeout: 30000` em alguns page.goto
- `timeout: 60000` no novo teste

**Recomendação**: Usar timeouts do config ou definir padrões consistentes:
```typescript
// No playwright.config.ts já está configurado:
timeout: 30 * 1000, // 30s por teste
expect: { timeout: 10 * 1000 }, // 10s para expects
```

---

## 📋 Plano de Ação Recomendado

### Fase 1: Padronização de Importações (Prioridade Alta)

1. ✅ Criar script de migração automática
2. Migrar todos os testes para usar `./fixtures`
3. Adicionar `consoleHelper` aos testes que precisam verificar erros

### Fase 2: Padronização de BASE_URL (Prioridade Média)

1. Remover definições explícitas de BASE_URL
2. Usar apenas `page.goto('/')` aproveitando `baseURL` do config
3. Manter fallback apenas onde necessário

### Fase 3: Estrutura de Testes (Prioridade Baixa)

1. Padronizar uso de `beforeEach`
2. Documentar quando usar `storageState`
3. Criar templates de teste

### Fase 4: Monitoramento (Prioridade Alta)

1. Adicionar verificação de console em testes críticos
2. Documentar quando verificar erros manualmente vs automático
3. Criar exemplos de uso

---

## 🔧 Exemplo de Migração

### Antes (sem monitoramento):
```typescript
import { expect, test } from '@playwright/test';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

test.describe('Dashboard', () => {
  test('deve carregar', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### Depois (com monitoramento):
```typescript
import { expect, test } from './fixtures';

test.describe('Dashboard', () => {
  test('deve carregar', async ({ page, consoleHelper }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar erros se necessário
    expect(consoleHelper.hasErrors()).toBe(false);
  });
});
```

---

## 📊 Estatísticas

| Categoria | Total | Com Padrão | Sem Padrão | % Padronizado |
|----------|-------|------------|------------|---------------|
| Importações | 19 | 1 | 18 | 5% |
| BASE_URL | 19 | 3 | 16 | 16% |
| Monitoramento | 19 | 1 | 18 | 5% |
| Estrutura | 19 | 8 | 11 | 42% |

---

## ✅ Checklist de Padronização

Para cada teste E2E, verificar:

- [ ] Usa `import { expect, test } from './fixtures'`
- [ ] Não define BASE_URL explícito (usa baseURL do config)
- [ ] Usa `consoleHelper` quando precisa verificar erros
- [ ] Tem estrutura consistente com `test.describe` e `test.beforeEach` quando necessário
- [ ] Timeouts seguem padrão do config ou são justificados
- [ ] Comentários explicam comportamento não óbvio

---

## 📚 Referências

- [README_CONSOLE_MONITORING.md](./README_CONSOLE_MONITORING.md) - Sistema de monitoramento
- [playwright.config.ts](../../playwright.config.ts) - Configuração do Playwright
- [fixtures/index.ts](../../tests/e2e/fixtures/index.ts) - Fixtures customizados

---

**Última atualização**: 2025-01-11
**Próxima revisão**: Após migração dos testes

