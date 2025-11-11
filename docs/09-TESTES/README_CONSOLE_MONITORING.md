# Monitoramento Automático de Console (F12)

Este sistema captura automaticamente todos os logs do console do navegador (F12) durante os testes E2E, permitindo que a IA detecte e corrija erros automaticamente.

## 🎯 Recursos

- ✅ Captura automática de todos os logs do console (log, error, warning, info, debug)
- ✅ Detecção de erros JavaScript não tratados
- ✅ Monitoramento de requisições HTTP que falham
- ✅ Detecção de respostas HTTP com status de erro (4xx, 5xx)
- ✅ Relatórios detalhados com localização dos erros
- ✅ Validação automática de erros críticos
- ✅ Integração transparente com Playwright

## 📦 Estrutura

```
tests/e2e/
├── fixtures/
│   ├── index.ts              # Fixtures globais (importar nos testes)
│   └── console-monitor.ts     # Fixture customizado (alternativa)
├── helpers/
│   ├── console-helper.ts     # Classe principal de monitoramento
│   └── setup-console-monitoring.ts  # Setup helpers
└── examples/
    └── example-with-console-monitoring.spec.ts  # Exemplos de uso
```

## 🚀 Como Usar

### Opção 1: Usando Fixtures (Recomendado)

Importe os fixtures customizados que já incluem monitoramento automático:

```typescript
import { test, expect } from './fixtures';

test('meu teste com monitoramento automático', async ({
  page,
  consoleHelper,
}) => {
  // O consoleHelper já está configurado automaticamente!
  // Todos os logs do console são capturados automaticamente

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Verificar se há erros
  if (consoleHelper.hasErrors()) {
    console.log(consoleHelper.generateReport());
    // O teste falhará automaticamente se houver erros críticos
  }
});
```

### Opção 2: Usando Helper Manualmente

Se preferir controle manual:

```typescript
import { test, expect } from '@playwright/test';
import {
  createConsoleHelper,
  checkConsoleErrors,
} from './helpers/console-helper';

test('meu teste com controle manual', async ({ page }) => {
  const consoleHelper = createConsoleHelper(page);

  await page.goto('/');
  await page.click('button');

  // Verificar erros manualmente
  await checkConsoleErrors(consoleHelper, true); // true = falhar se houver erros
});
```

## 📊 API do ConsoleHelper

### Métodos Principais

```typescript
// Verificar se há erros
consoleHelper.hasErrors(): boolean

// Verificar se há warnings
consoleHelper.hasWarnings(): boolean

// Obter todos os erros
consoleHelper.getErrors(): CapturedLog[]

// Obter mensagens de erro
consoleHelper.getErrorMessages(): string[]

// Obter mensagens de warning
consoleHelper.getWarningMessages(): string[]

// Gerar relatório completo
consoleHelper.generateReport(): string

// Limpar logs capturados
consoleHelper.clear(): void

// Validar se não há erros críticos (lança exceção se houver)
consoleHelper.validateNoCriticalErrors(): void
```

## 🔍 O Que É Capturado

### 1. Logs do Console

- `console.log()`
- `console.error()`
- `console.warn()`
- `console.info()`
- `console.debug()`

### 2. Erros de Página

- Erros JavaScript não tratados
- Uncaught exceptions
- Unhandled promise rejections

### 3. Erros de Rede

- Requisições HTTP que falham
- Respostas HTTP com status 4xx ou 5xx
- Timeouts de rede

## 📝 Exemplos

### Exemplo 1: Teste Básico

```typescript
import { test, expect } from './fixtures';

test('página não deve ter erros no console', async ({
  page,
  consoleHelper,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // O fixture já valida erros críticos automaticamente
  // Mas você pode verificar manualmente também:
  expect(consoleHelper.hasErrors()).toBe(false);
});
```

### Exemplo 2: Verificar Erros Após Ação

```typescript
import { test, expect } from './fixtures';

test('salvar não deve gerar erros', async ({ page, consoleHelper }) => {
  await page.goto('/dashboard');
  await page.click('button:has-text("Salvar")');
  await page.waitForLoadState('networkidle');

  // Verificar erros após ação
  const errors = consoleHelper.getErrorMessages();
  expect(errors).toHaveLength(0);
});
```

### Exemplo 3: Apenas Reportar Warnings

```typescript
import { test, expect } from './fixtures';

test('reportar warnings sem falhar', async ({ page, consoleHelper }) => {
  await page.goto('/');

  // Verificar warnings (não falha o teste)
  if (consoleHelper.hasWarnings()) {
    console.warn('Warnings encontrados:', consoleHelper.getWarningMessages());
  }

  // Mas ainda falhar se houver erros
  expect(consoleHelper.hasErrors()).toBe(false);
});
```

### Exemplo 4: Relatório Completo

```typescript
import { test, expect } from './fixtures';

test('gerar relatório completo', async ({ page, consoleHelper }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Gerar e exibir relatório completo
  const report = consoleHelper.generateReport();
  console.log(report);

  // Verificar se há erros críticos
  expect(consoleHelper.hasErrors()).toBe(false);
});
```

## ⚙️ Configuração

A configuração está em `playwright.config.ts`. Os principais recursos habilitados:

- ✅ `trace: 'on'` - Traces sempre ativos para debugging
- ✅ `video: 'retain-on-failure'` - Vídeos quando testes falham
- ✅ `screenshot: 'only-on-failure'` - Screenshots quando falham
- ✅ Timeouts configuráveis
- ✅ Monitoramento automático de console

## 🤖 Integração com IA

O sistema foi projetado para que a IA possa:

1. **Ler logs automaticamente**: Todos os logs são capturados e disponibilizados
2. **Detectar padrões de erro**: Erros são categorizados e reportados
3. **Corrigir automaticamente**: A IA pode usar os logs para identificar e corrigir problemas
4. **Validar correções**: Após correções, os testes validam se os erros foram resolvidos

## 🐛 Debugging

Se um teste falhar devido a erros do console:

1. Verifique o relatório completo: `consoleHelper.generateReport()`
2. Veja os logs no terminal (todos os erros são logados automaticamente)
3. Verifique o trace do Playwright: `npx playwright show-trace`
4. Veja o vídeo (se o teste falhou): `test-results/`

## 🧪 Teste de Verificação de Rotas Principais

Foi criado um teste E2E específico para verificar erros no console nas principais rotas do site:

**Arquivo**: `tests/e2e/main-routes-console-check.spec.ts`

### Rotas Testadas

- `/` - Home
- `/sobre` - Sobre
- `/blog` - Blog
- `/contato` - Contato
- `/termos` - Termos
- `/privacidade` - Privacidade
- `/cookies` - Cookies

### Como Executar

1. **Inicie o servidor** (em um terminal separado):
   ```bash
   npm run dev
   ```

2. **Execute o teste**:
   ```bash
   npx playwright test main-routes-console-check.spec.ts --project=chrome
   ```

### Recursos do Teste

- ✅ Verifica se o servidor está rodando antes de iniciar
- ✅ Navega por cada rota principal
- ✅ Captura todos os logs do console automaticamente
- ✅ Filtra erros críticos (ignora erros de rede esperados)
- ✅ Gera relatório detalhado com localização dos erros
- ✅ Reporta warnings sem falhar o teste
- ✅ Falha apenas se houver erros críticos no console

### Exemplo de Saída

```
🔍 Testando rota: Home (/)
✅ Home: Sem erros ou warnings

🔍 Testando rota: Sobre (/sobre)
⚠️  Sobre: 1 warning(s)

================================================================================
📊 RELATÓRIO FINAL - VERIFICAÇÃO DE CONSOLE
================================================================================

Total de rotas testadas: 7
Rotas com erros: 0
Rotas com warnings: 1
Total de erros: 0
Total de warnings: 1
```

## 📚 Referências

- [Playwright Console API](https://playwright.dev/docs/api/class-console)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Test Configuration](https://playwright.dev/docs/test-configuration)
