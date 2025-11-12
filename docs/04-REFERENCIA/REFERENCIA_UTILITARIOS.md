# 📚 Referência de Utilitários

Referência completa de todos os utilitários disponíveis na biblioteca `lib/`.

## 📦 Módulos Disponíveis

### String Utils (`@/lib/utils/string`)

Utilitários para manipulação de strings, formatação de datas e tradução de status.

#### Funções

##### `textToSlug(text: string): string`

Converte string para slug URL-friendly.

```typescript
import { textToSlug } from '@/lib/utils/string';

textToSlug('Meu Primeiro Post!'); // "meu-primeiro-post"
textToSlug('Café & Pão'); // "cafe-pao"
```

##### `formatDate(date: Date | string): string`

Formata data para exibição em português.

```typescript
import { formatDate } from '@/lib/utils/string';

formatDate(new Date()); // "15 de janeiro de 2024"
formatDate('2024-01-15T00:00:00Z'); // "15 de janeiro de 2024"
```

##### `formatDateTime(date: Date | string): string`

Formata data e hora para exibição em português.

```typescript
import { formatDateTime } from '@/lib/utils/string';

formatDateTime(new Date()); // "15 de janeiro de 2024, 14:30"
```

##### `translatePostStatus(status: PostStatus | string): string`

Traduz status do post para português.

```typescript
import { translatePostStatus } from '@/lib/utils/string';

translatePostStatus('DRAFT'); // "Rascunho"
translatePostStatus('PUBLISHED'); // "Publicado"
```

---

### Content Utils (`@/lib/content`)

Utilitários para trabalhar com conteúdo Tiptap (JSON) e calcular tempo de leitura.

#### Funções

##### `extractTextFromTiptap(content: TiptapJSON): string`

Extrai texto puro do JSON do Tiptap.

```typescript
import { extractTextFromTiptap } from '@/lib/content';

const content = {
  type: 'doc',
  content: [
    { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] },
  ],
};

extractTextFromTiptap(content); // "Olá mundo"
```

##### `generateExcerpt(content: TiptapJSON, maxLength?: number): string`

Gera excerpt (resumo) do conteúdo Tiptap.

```typescript
import { generateExcerpt } from '@/lib/content';

const excerpt = generateExcerpt(content, 50); // "Primeiros 50 caracteres..."
```

##### `createEmptyTiptapContent(): TiptapJSON`

Cria conteúdo JSON vazio do Tiptap.

```typescript
import { createEmptyTiptapContent } from '@/lib/content';

const empty = createEmptyTiptapContent();
// { type: 'doc', content: [] }
```

##### `isContentEmpty(content: TiptapJSON): boolean`

Verifica se conteúdo Tiptap está vazio.

```typescript
import { isContentEmpty } from '@/lib/content';

isContentEmpty({ type: 'doc', content: [] }); // true
```

##### `calculateReadingTime(content: string | TiptapJSON, wordsPerMinute?: number): number`

Calcula tempo de leitura baseado no conteúdo.

```typescript
import { calculateReadingTime } from '@/lib/content';

// Tiptap JSON
const tiptapContent = { type: 'doc', content: [...] };
calculateReadingTime(tiptapContent); // 5

// HTML
calculateReadingTime('<p>Texto longo...</p>'); // 3

// Texto simples
calculateReadingTime('Texto simples'); // 1
```

---

### Post Helpers (`@/lib/api/helpers`)

Helpers para preparar dados de posts para a API.

#### Funções

##### `preparePostForCreate(formData, authorId): CreatePostData`

Prepara dados do formulário para criar post no backend.

```typescript
import { preparePostForCreate } from '@/lib/api/helpers';

const postData = preparePostForCreate(
  {
    title: 'Meu Post',
    content: tiptapJSON,
    subcategoryId: 'cat-123',
    status: 'DRAFT',
  },
  user.id
);
```

##### `preparePostForUpdate(formData): UpdatePostData`

Prepara dados do formulário para atualizar post no backend.

```typescript
import { preparePostForUpdate } from '@/lib/api/helpers';

const updateData = preparePostForUpdate({
  title: 'Novo Título',
  status: 'PUBLISHED',
});
```

##### `validatePostData(data): string[]`

Valida dados de post antes de enviar para API.

```typescript
import { validatePostData } from '@/lib/api/helpers';

const errors = validatePostData(postData);
if (errors.length > 0) {
  console.error('Erros de validação:', errors);
}
```

---

### SEO Utils (`@/lib/seo`)

Funções para gerar metadados de SEO e dados estruturados.

#### Funções

##### `generateMetadata(props): Metadata`

Gera metadados completos para SEO.

```typescript
import { generateMetadata } from '@/lib/seo';

const metadata = generateMetadata({
  title: 'Meu Post',
  description: 'Descrição do post',
  type: 'article',
  publishedTime: '2024-01-15T00:00:00Z',
});
```

##### `generatePostMetadata(post): Metadata`

Gera metadados para post do blog.

```typescript
import { generatePostMetadata } from '@/lib/seo';

const post = await getPostBySlug('meu-post');
const metadata = generatePostMetadata(post);
```

##### `generateCategoryMetadata(category): Metadata`

Gera metadados para categoria.

```typescript
import { generateCategoryMetadata } from '@/lib/seo';

const category = await getCategoryBySlug('tecnologia');
const metadata = generateCategoryMetadata(category);
```

##### `generateArticleStructuredData(post)`

Gera structured data (JSON-LD) para artigo.

```typescript
import { generateArticleStructuredData } from '@/lib/seo';

const structuredData = generateArticleStructuredData(post);
// Use em <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
```

##### `generateBreadcrumbStructuredData(items)`

Gera structured data (JSON-LD) para breadcrumbs.

```typescript
import { generateBreadcrumbStructuredData } from '@/lib/seo';

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Meu Post', url: '/blog/meu-post' },
];

const structuredData = generateBreadcrumbStructuredData(breadcrumbs);
```

##### `generateSitemap(posts, categories): string`

Gera sitemap XML.

```typescript
import { generateSitemap } from '@/lib/seo';

const posts = await getAllPosts();
const categories = await getAllCategories();
const sitemap = generateSitemap(posts, categories);
// Salve em /public/sitemap.xml
```

##### `generateRobotsTxt(): string`

Gera robots.txt.

```typescript
import { generateRobotsTxt } from '@/lib/seo';

const robotsTxt = generateRobotsTxt();
// Salve em /public/robots.txt
```

---

## 📝 Imports Recomendados

### Import Direto (Recomendado)

```typescript
// String Utils
import { textToSlug, formatDate } from '@/lib/utils/string';

// Content Utils
import { extractTextFromTiptap, calculateReadingTime } from '@/lib/content';

// Post Helpers
import { preparePostForCreate, validatePostData } from '@/lib/api/helpers';

// SEO Utils
import { generateMetadata, generatePostMetadata } from '@/lib/seo';
```

### Import via Barrel Export

```typescript
// Via lib/index.ts (todos os módulos)
import {
  textToSlug,
  extractTextFromTiptap,
  preparePostForCreate,
  generateMetadata,
} from '@/lib';
```

---

## 🔄 Migração de `@/lib/api-helpers`

Se você está migrando de `@/lib/api-helpers`, consulte o [Guia de Migração](../../docs/03-GUIAS/GUIA_MIGRACAO_API_HELPERS.md).

### Mapeamento Rápido

| Função Antiga | Nova Localização |
|--------------|------------------|
| `textToSlug` | `@/lib/utils/string` |
| `formatDate` | `@/lib/utils/string` |
| `formatDateTime` | `@/lib/utils/string` |
| `translateStatus` | `@/lib/utils/string` |
| `extractTextFromTiptap` | `@/lib/content` |
| `generateExcerpt` | `@/lib/content` |
| `calculateReadingTime` | `@/lib/content` |
| `preparePostForCreate` | `@/lib/api/helpers` |
| `preparePostForUpdate` | `@/lib/api/helpers` |
| `validatePostData` | `@/lib/api/helpers` |

---

## 📚 Documentação Adicional

- [Guia de Migração](../../docs/03-GUIAS/GUIA_MIGRACAO_API_HELPERS.md)
- [Guia de API](../../lib/api/README.md)
- [Guia de Content Utils](../../docs/03-GUIAS/GUIA_CONTENT_UTILS.md)
- [Guia de SEO Utils](../../docs/03-GUIAS/GUIA_SEO_UTILS.md)

