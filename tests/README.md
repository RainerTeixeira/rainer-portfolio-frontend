# Estrutura de Testes

Este diretório contém todos os testes do projeto, organizados por tipo e seguindo boas práticas.

## 📁 Estrutura

```
tests/
├── app/              # Testes de páginas Next.js
├── components/       # Testes de componentes React
├── hooks/            # Testes de custom hooks
├── lib/              # Testes de utilitários e serviços
├── integration/      # Testes de integração (dados reais)
├── e2e/              # Testes end-to-end (sem mocks)
├── live/             # Testes com APIs reais
├── scripts/          # Scripts auxiliares de teste
├── utils/            # Utilitários para testes
├── test-results/     # Resultados e relatórios de testes
│   ├── coverage/     # Relatórios de cobertura
│   ├── e2e/          # Resultados de testes E2E
│   └── logs/         # Logs de execução
└── tsconfig.json     # Configuração TypeScript para testes
```

## 🎯 Boas Práticas

### Testes Unitários (`app/`, `components/`, `hooks/`, `lib/`)

- ✅ **Use mocks** para isolar unidades de código
- ✅ Teste comportamento, não implementação
- ✅ Mantenha testes rápidos e independentes
- ✅ Use dados mockados controlados

**Exemplo:**

```typescript
// ✅ BOM: Mock de dependências
jest.mock('@/lib/api/client');
const mockApi = api as jest.Mocked<typeof api>;

// ❌ EVITE: Dados reais em testes unitários
const realData = await fetchRealData();
```

### Testes de Integração (`integration/`)

- ✅ **Use dados reais** quando possível
- ✅ Teste interação entre módulos
- ✅ Use mocks apenas para serviços externos (APIs, DB)
- ✅ Valide fluxos completos

**Exemplo:**

```typescript
// ✅ BOM: Dados reais para integração
const result = await service.processData(realInput);

// ✅ BOM: Mock apenas de serviços externos
jest.mock('@/lib/api/external-service');
```

### Testes End-to-End (`e2e/`)

- ✅ **Evite mocks** para simular mundo real
- ✅ Use dados reais ou fixtures realistas
- ✅ Teste fluxos completos do usuário
- ✅ Valide comportamento real da aplicação

**Exemplo:**

```typescript
// ✅ BOM: Sem mocks, comportamento real
await page.goto('/dashboard');
await page.fill('[name="email"]', 'test@example.com');

// ❌ EVITE: Mocks em testes E2E
jest.mock('@/lib/api');
```

## 📊 Resultados e Logs

Todos os resultados de testes são salvos em `tests/test-results/`:

- **`coverage/`**: Relatórios de cobertura de código (HTML, JSON, LCOV)
- **`e2e/`**: Screenshots, vídeos e relatórios de testes E2E
- **`logs/`**: Logs de execução de testes
- **`*.json`**: Resultados em formato JSON
- **`*.md`**: Relatórios em Markdown

## 🚀 Executando Testes

```bash
# Todos os testes
npm test

# Apenas testes unitários
npm test -- tests/app tests/components tests/hooks tests/lib

# Apenas testes de integração
npm test -- tests/integration

# Apenas testes E2E
npm run test:e2e

# Com cobertura
npm test -- --coverage

# Testes específicos
npm test -- tests/lib/utils/string.test.ts
```

## 📝 Convenções

1. **Nomes de arquivos**: `*.test.ts` ou `*.test.tsx`
2. **Estrutura**: Um arquivo de teste por arquivo de código
3. **Organização**: Espelhar estrutura de `app/`, `components/`, `lib/`
4. **Mocks**: Centralizados em `tests/utils/` quando reutilizáveis
5. **Fixtures**: Em `tests/e2e/fixtures/` para dados de teste

## 🔧 Configuração

- **Jest**: `jest.config.js` (raiz do projeto)
- **TypeScript**: `tests/tsconfig.json`
- **Setup**: `jest.setup.js` (raiz do projeto)
- **Playwright**: `playwright.config.ts` (raiz do projeto)

## 📈 Cobertura

A cobertura mínima esperada é:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

Verifique relatórios em `tests/test-results/coverage/index.html`
