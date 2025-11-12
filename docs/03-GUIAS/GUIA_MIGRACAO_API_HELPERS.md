# 🔄 Guia de Migração - API Helpers

Este guia documenta a migração de `@/lib/api-helpers` para módulos específicos organizados.

## 📋 Visão Geral

O arquivo `lib/api-helpers.ts` foi **removido** e suas funções foram migradas para módulos específicos e organizados por responsabilidade.

## 🎯 Nova Estrutura

### Antes (Deprecated)

```typescript
// ❌ DEPRECATED
import {
  textToSlug,
  formatDate,
  extractTextFromTiptap,
  calculateReadingTime,
  preparePostForCreate,
} from '@/lib/api-helpers';
```

### Depois (Novo)

```typescript
// ✅ String Utils
import {
  textToSlug,
  formatDate,
  formatDateTime,
  translatePostStatus,
  translateStatus,
} from '@/lib/utils/string';

// ✅ Content Utils
import {
  extractTextFromTiptap,
  generateExcerpt,
  createEmptyTiptapContent,
  isContentEmpty,
  calculateReadingTime,
} from '@/lib/content';

// ✅ Post Helpers
import {
  preparePostForCreate,
  preparePostForUpdate,
  validatePostData,
} from '@/lib/api/helpers';

// ✅ SEO Utils
import {
  generateMetadata,
  generatePostMetadata,
  generateCategoryMetadata,
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
  generateSitemap,
  generateRobotsTxt,
} from '@/lib/seo';
```

## 📦 Mapeamento de Funções

### String Utils (`@/lib/utils/string`)

| Função Antiga | Nova Localização | Descrição |
|--------------|------------------|-----------|
| `textToSlug` | `@/lib/utils/string` | Converte string para slug URL-friendly |
| `formatDate` | `@/lib/utils/string` | Formata data para exibição em português |
| `formatDateTime` | `@/lib/utils/string` | Formata data e hora para exibição |
| `translateStatus` | `@/lib/utils/string` | Traduz status do post para português |
| `translatePostStatus` | `@/lib/utils/string` | Alias para translateStatus |

### Content Utils (`@/lib/content`)

| Função Antiga | Nova Localização | Descrição |
|--------------|------------------|-----------|
| `extractTextFromTiptap` | `@/lib/content` | Extrai texto puro do JSON do Tiptap |
| `generateExcerpt` | `@/lib/content` | Gera excerpt (resumo) do conteúdo |
| `createEmptyTiptapContent` | `@/lib/content` | Cria conteúdo JSON vazio do Tiptap |
| `isContentEmpty` | `@/lib/content` | Verifica se conteúdo está vazio |
| `calculateReadingTime` | `@/lib/content` | Calcula tempo de leitura |

### Post Helpers (`@/lib/api/helpers`)

| Função Antiga | Nova Localização | Descrição |
|--------------|------------------|-----------|
| `preparePostForCreate` | `@/lib/api/helpers` | Prepara dados para criar post |
| `preparePostForUpdate` | `@/lib/api/helpers` | Prepara dados para atualizar post |
| `validatePostData` | `@/lib/api/helpers` | Valida dados de post |

### SEO Utils (`@/lib/seo`)

| Função Antiga | Nova Localização | Descrição |
|--------------|------------------|-----------|
| `generateMetadata` | `@/lib/seo` | Gera metadados completos para SEO |
| `generatePostMetadata` | `@/lib/seo` | Gera metadados para post |
| `generateCategoryMetadata` | `@/lib/seo` | Gera metadados para categoria |
| `generateArticleStructuredData` | `@/lib/seo` | Gera dados estruturados para artigo |
| `generateBreadcrumbStructuredData` | `@/lib/seo` | Gera dados estruturados para breadcrumbs |
| `generateSitemap` | `@/lib/seo` | Gera sitemap XML |
| `generateRobotsTxt` | `@/lib/seo` | Gera robots.txt |

## 🔄 Exemplos de Migração

### Exemplo 1: String Utils

```typescript
// ❌ Antes
import { textToSlug, formatDate } from '@/lib/api-helpers';

// ✅ Depois
import { textToSlug, formatDate } from '@/lib/utils/string';
```

### Exemplo 2: Content Utils

```typescript
// ❌ Antes
import { extractTextFromTiptap, calculateReadingTime } from '@/lib/api-helpers';

// ✅ Depois
import {
  extractTextFromTiptap,
  calculateReadingTime,
} from '@/lib/content';
```

### Exemplo 3: Post Helpers

```typescript
// ❌ Antes
import { preparePostForCreate, validatePostData } from '@/lib/api-helpers';

// ✅ Depois
import {
  preparePostForCreate,
  validatePostData,
} from '@/lib/api/helpers';
```

### Exemplo 4: SEO Utils

```typescript
// ❌ Antes (não existia em api-helpers)
import { generateMetadata } from '@/lib/OLD_seo';

// ✅ Depois
import { generateMetadata, generatePostMetadata } from '@/lib/seo';
```

## 📝 Passos para Migração

### 1. Identificar Imports

Busque por imports de `@/lib/api-helpers`:

```bash
grep -r "from '@/lib/api-helpers'" app/ components/ hooks/
```

### 2. Substituir Imports

Substitua os imports conforme o mapeamento acima:

- **String Utils** → `@/lib/utils/string`
- **Content Utils** → `@/lib/content`
- **Post Helpers** → `@/lib/api/helpers`
- **SEO Utils** → `@/lib/seo`

### 3. Verificar Tipos

Certifique-se de que os tipos estão corretos:

```typescript
// ✅ Tipos corretos
import type { TiptapJSON } from '@/lib/api/types/common';
import type { CreatePostData } from '@/lib/api/types/posts';
```

### 4. Testar

Execute os testes para garantir que tudo funciona:

```bash
npm test
```

## 🎯 Benefícios da Migração

### ✅ Organização

- **Separação de responsabilidades**: Cada módulo tem uma responsabilidade específica
- **Manutenibilidade**: Mais fácil de encontrar e modificar funções
- **Escalabilidade**: Fácil adicionar novas funções sem poluir um único arquivo

### ✅ Performance

- **Tree-shaking**: Imports mais específicos permitem melhor tree-shaking
- **Bundle size**: Apenas importa o que é necessário

### ✅ Type Safety

- **Tipos explícitos**: Cada módulo exporta seus tipos específicos
- **Melhor IntelliSense**: Autocompletar mais preciso

## 📚 Documentação Adicional

- [Guia de String Utils](../../docs/03-GUIAS/GUIA_STRING_UTILS.md)
- [Guia de Content Utils](../../docs/03-GUIAS/GUIA_CONTENT_UTILS.md)
- [Guia de API Helpers](../../docs/03-GUIAS/GUIA_API_HELPERS.md)
- [Guia de SEO Utils](../../docs/03-GUIAS/GUIA_SEO_UTILS.md)

## ⚠️ Breaking Changes

### Removido

- ❌ `lib/api-helpers.ts` - Arquivo removido completamente
- ❌ Import de `@/lib/api-helpers` - Não funciona mais

### Migrado

- ✅ Todas as funções foram migradas para módulos específicos
- ✅ Compatibilidade mantida via `lib/index.ts` (temporário)

## 🔍 Checklist de Migração

- [x] Migrar `app/dashboard/page.tsx`
- [x] Migrar `tests/lib/api-helpers.test.ts`
- [x] Remover `lib/api-helpers.ts`
- [x] Atualizar `lib/index.ts`
- [x] Criar documentação de migração
- [x] Atualizar README.md

## 📞 Suporte

Se encontrar problemas durante a migração:

1. Verifique a documentação acima
2. Consulte os exemplos de código
3. Verifique os testes em `tests/lib/api-helpers.test.ts`
4. Abra uma issue no repositório

