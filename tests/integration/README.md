# Testes de Integração

Testes de integração seguem o princípio: **Use dados reais quando possível, mock apenas serviços externos**.

## 📋 Estrutura

```
tests/integration/
├── api/                    # Testes de integração de serviços API
│   ├── auth.service.test.ts
│   ├── posts.service.test.ts
│   ├── bookmarks.service.test.ts
│   ├── categories.service.test.ts
│   ├── comments.service.test.ts
│   ├── likes.service.test.ts
│   ├── user.service.test.ts
│   └── users.service.test.ts
└── cookies.integration.test.ts
```

## 🎯 Princípios

### ✅ O Que Fazer

- ✅ **Use dados reais** para lógica interna
- ✅ **Teste interação** entre módulos
- ✅ **Valide fluxos completos**
- ✅ **Mock apenas serviços externos** (APIs, DB, File System)

### ❌ O Que Evitar

- ❌ Mockar lógica interna
- ❌ Mockar utilitários do projeto
- ❌ Dados completamente artificiais

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente Necessárias

```bash
# API Backend (opcional - pode usar mocks)
NEXT_PUBLIC_API_URL=http://localhost:4000

# Para testes que precisam de serviços reais
NEXT_PUBLIC_CLOUDINARY_URL=...
NEXT_PUBLIC_GA_ID=...
```

### Mock de Serviços Externos

Os testes de integração usam `mockFetch` para mockar apenas chamadas HTTP externas:

```typescript
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('Service Integration', () => {
  afterEach(() => {
    resetFetchMock(); // Limpa mocks após cada teste
  });

  it('deve processar dados reais', async () => {
    // Mock apenas do fetch (serviço externo)
    mockFetchOnce({ data: mockData });

    // Testa lógica real do serviço
    const result = await service.processData(realInput);
    expect(result).toBeDefined();
  });
});
```

## 📝 Exemplos

### ✅ Exemplo Correto

```typescript
// tests/integration/api/posts.service.test.ts
import { postsService } from '@/lib/api';
import { mockFetchOnce } from '../../utils/mockFetch';

describe('Posts Integration', () => {
  it('deve buscar e processar posts reais', async () => {
    // Mock apenas do fetch (serviço externo)
    mockFetchOnce({ data: [{ id: '1', title: 'Post 1' }] });

    // Testa lógica real do serviço
    const posts = await postsService.listPosts({ limit: 10 });

    // Validação de integração
    expect(posts).toBeDefined();
    expect(Array.isArray(posts.posts)).toBe(true);
  });
});
```

### ❌ Exemplo Incorreto

```typescript
// ❌ ERRADO: Mockar serviço interno
jest.mock('@/lib/api/services/posts.service');
const mockService = postsService as jest.Mocked<typeof postsService>;

// ❌ ERRADO: Dados completamente artificiais
const fakeData = { id: 'fake', title: 'Fake' };
```

## 🚀 Executando Testes

```bash
# Todos os testes de integração
npm test tests/integration

# Teste específico
npm test tests/integration/api/posts.service.test.ts

# Com cobertura
npm test tests/integration --coverage
```

## ⚠️ Troubleshooting

### Erro: "NEXT_PUBLIC_API_URL não está configurada"

**Solução**: Configure variável de ambiente ou use mocks:

```typescript
// No teste
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';
```

### Erro: "Network error" ou "Timeout"

**Causa**: Teste tentando acessar serviço externo real  
**Solução**: Verifique se `mockFetchOnce` está sendo usado corretamente

### Teste muito lento

**Causa**: Tentando acessar serviços reais  
**Solução**: Use mocks para serviços externos, dados reais apenas para lógica interna

---

**Última atualização**: 2025-11-13
