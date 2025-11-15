# 📚 Referência da Biblioteca `lib/`

Documentação completa da biblioteca principal do projeto, incluindo todos os módulos, utilitários e funcionalidades disponíveis.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura](#estrutura)
- [Módulos Principais](#módulos-principais)
  - [API](#api)
  - [Content](#content)
  - [Cookies](#cookies)
  - [Monitoring](#monitoring)
  - [SEO](#seo)
  - [Utils](#utils)
- [Guia de Uso](#guia-de-uso)
- [Exemplos Práticos](#exemplos-práticos)

---

## 🎯 Visão Geral

A biblioteca `lib/` é o coração do projeto, fornecendo todas as funcionalidades reutilizáveis, utilitários e integrações necessárias para a aplicação. É organizada em módulos especializados, cada um com responsabilidades bem definidas.

### Características

- ✅ **Type-Safe**: Totalmente tipado com TypeScript
- ✅ **Modular**: Organizado em módulos independentes
- ✅ **Documentado**: JSDoc profissional em todos os arquivos
- ✅ **Testado**: Cobertura de testes abrangente
- ✅ **Production-Ready**: Pronto para uso em produção

---

## 📂 Estrutura

```
lib/
├── api/              # Cliente HTTP e serviços de API
│   ├── client.ts     # Cliente HTTP singleton
│   ├── config.ts     # Configurações e endpoints
│   ├── services/     # Serviços por recurso
│   ├── types/        # Tipos TypeScript
│   └── helpers/      # Helpers específicos
├── content/          # Utilitários de conteúdo
│   ├── reading-time.ts
│   └── tiptap-utils.ts
├── cookies/          # Gerenciamento de cookies
│   ├── cookie-manager.ts
│   └── analytics.ts
├── monitoring/       # Analytics, logging e performance
│   ├── analytics.ts
│   ├── logger.ts
│   └── performance.ts
├── seo/              # Utilitários de SEO
│   ├── metadata.ts
│   ├── sitemap.ts
│   └── structured-data.ts
├── utils/            # Utilitários especializados
│   ├── validation.ts
│   ├── string.ts
│   ├── scroll.ts
│   ├── search.ts
│   ├── design-tokens.ts
│   ├── image-optimizer.ts
│   └── post-compressor.ts
├── env.ts            # Variáveis de ambiente
├── utils.ts          # Utilitários gerais
└── index.ts          # Barrel export principal
```

---

## 🔧 Módulos Principais

### API

Módulo completo para integração com o backend.

#### Cliente HTTP

```typescript
import { api, ApiError } from '@/lib/api';

// GET
const data = await api.get<Post[]>('/posts');

// POST
const post = await api.post<Post>('/posts', { title: 'Título' });

// Com autenticação
api.setAuthToken('token');
const user = await api.get<User>('/users/me');
api.clearAuthToken();

// Error handling
try {
  const data = await api.get('/posts');
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status, error.message);
  }
}
```

#### Serviços

```typescript
import { postsService, usersService, authService } from '@/lib/api';

// Posts
const posts = await postsService.listPosts({ status: 'PUBLISHED' });
const post = await postsService.getPostBySlug('meu-post');

// Users
const user = await usersService.getUserById('123');

// Auth
const response = await authService.login({ email, password });
```

#### Helpers

```typescript
import { preparePostForCreate, validatePostData } from '@/lib/api/helpers';

// Preparar dados para criar post
const postData = preparePostForCreate(
  { title: 'Título', content: tiptapJSON },
  userId
);

// Validar antes de enviar
const errors = validatePostData(postData);
if (errors.length > 0) {
  console.error('Erros:', errors);
}
```

**Documentação completa**: Ver `lib/api/README.md`

---

### Content

Utilitários para processamento de conteúdo Tiptap e cálculos relacionados.

#### Reading Time

```typescript
import { calculateReadingTime } from '@/lib/content';

// Calcular tempo de leitura
const time = calculateReadingTime(tiptapContent); // 5 minutos
const customTime = calculateReadingTime(htmlContent, 250); // palavras/min customizado
```

#### Tiptap Utils

```typescript
import {
  extractTextFromTiptap,
  generateExcerpt,
  isContentEmpty,
} from '@/lib/content';

// Extrair texto puro
const text = extractTextFromTiptap(tiptapContent);

// Gerar excerpt
const excerpt = generateExcerpt(tiptapContent, 160);

// Verificar se vazio
if (isContentEmpty(tiptapContent)) {
  console.log('Conteúdo vazio');
}
```

---

### Cookies

Sistema profissional de gerenciamento de cookies e consentimento (GDPR-compliant).

#### Cookie Manager

```typescript
import {
  getCookieManager,
  isCookieAllowed,
  saveCookieConsent,
} from '@/lib/cookies';

// Verificar permissão
if (isCookieAllowed('analytics')) {
  // Carregar Google Analytics
}

// Salvar consentimento
saveCookieConsent({
  essential: true,
  analytics: true,
  performance: false,
  functionality: false,
});

// Gerenciar manualmente
const manager = getCookieManager();
manager.updatePreferences({ analytics: false });
manager.revokeConsent();
```

#### Analytics Integration

```typescript
import { initGoogleAnalytics, trackPageView, trackEvent } from '@/lib/cookies';

// Inicializar (se consentido)
initGoogleAnalytics();

// Rastrear página
trackPageView('/blog');

// Rastrear evento
trackEvent('click', 'button', 'subscribe');
```

---

### Monitoring

Sistema completo de monitoramento: analytics, logging e performance.

#### Analytics

```typescript
import { analytics, ANALYTICS_EVENTS } from '@/lib/monitoring';

// Rastrear evento
analytics.track(ANALYTICS_EVENTS.PAGE_VIEW('/blog'));
analytics.track(ANALYTICS_EVENTS.BLOG_POST_VIEW('123', 'Título'));

// Page view
analytics.pageView('/blog');

// Identificar usuário
analytics.identify('user-123', { plan: 'premium' });
```

#### Logger

```typescript
import { logger } from '@/lib/monitoring';

// Diferentes níveis
logger.debug('Debug info', { data: 'value' });
logger.info('Informação', { userId: '123' });
logger.warn('Aviso', { warning: 'message' });
logger.error('Erro', error, { context: 'value' });

// Logger com contexto
const contextualLogger = logger.withContext({ component: 'BlogPage' });
contextualLogger.info('Posts carregados', { count: 10 });
```

#### Performance

```typescript
import { performanceMonitor } from '@/lib/monitoring';

// Medir operação
performanceMonitor.start('load-posts');
await loadPosts();
const duration = performanceMonitor.end('load-posts');

// Medir função
const result = await performanceMonitor.measure('process-data', async () => {
  return await processData();
});

// Obter métricas
const metrics = performanceMonitor.getAllMetrics();
const webVitals = performanceMonitor.getMetric('LCP');
```

---

### SEO

Utilitários para otimização de SEO: metadata, sitemap e structured data.

#### Metadata

```typescript
import { generateMetadata, generatePostMetadata } from '@/lib/seo';

// Metadata genérica
export const metadata = generateMetadata({
  title: 'Meu Post',
  description: 'Descrição do post',
  type: 'article',
  image: '/og-image.jpg',
  canonicalUrl: 'https://example.com/post',
});

// Metadata para post
export const metadata = generatePostMetadata(post);
```

#### Sitemap

```typescript
import { generateSitemap, generateRobotsTxt } from '@/lib/seo';

// Gerar sitemap
const sitemap = generateSitemap(posts, categories);

// Gerar robots.txt
const robots = generateRobotsTxt();
```

#### Structured Data

```typescript
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/seo';

// Schema.org Article
const schema = generateArticleStructuredData(post);

// Breadcrumbs
const breadcrumbs = generateBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Post', url: '/blog/post' },
]);
```

---

### Utils

Utilitários especializados para diferentes necessidades.

#### Validation

```typescript
import {
  validateEmail,
  validatePassword,
  validateUrl,
  validateWithSchema,
} from '@/lib/utils/validation';

// Validações individuais
const emailResult = validateEmail('user@example.com');
if (!emailResult.isValid) {
  console.error(emailResult.errors);
}

// Validação com schema
const schema = {
  email: validateEmail,
  password: validatePassword,
};
const result = validateWithSchema({ email, password }, schema);
```

#### String

```typescript
import {
  textToSlug,
  formatDate,
  formatDateTime,
  translatePostStatus,
} from '@/lib/utils/string';

// Slug
const slug = textToSlug('Meu Post Incrível'); // "meu-post-incrivel"

// Datas
const date = formatDate(new Date()); // "15 de janeiro de 2025"
const datetime = formatDateTime(new Date()); // "15/01/2025 às 14:30"

// Tradução
const status = translatePostStatus('PUBLISHED'); // "Publicado"
```

#### Scroll

```typescript
import {
  smoothScrollTo,
  scrollToTop,
  prefersReducedMotion,
  disableScroll,
  enableScroll,
} from '@/lib/utils/scroll';

// Scroll suave
smoothScrollTo('#section-id');
scrollToTop();

// Preferência de movimento
if (prefersReducedMotion()) {
  // Usar animações reduzidas
}

// Controlar scroll
disableScroll(); // Desabilitar scroll da página
enableScroll(); // Reabilitar scroll
```

#### Search

```typescript
import { searchContent } from '@/lib/utils/search';

// Buscar conteúdo
const results = await searchContent('query');
// Retorna: SearchResult[] com posts, categorias e autores
```

#### Design Tokens

```typescript
import { hexToHSL, hexToRGB, hexToRGBA } from '@/lib/utils/design-tokens';

// Conversões de cor
const hsl = hexToHSL('#3b82f6'); // "hsl(217, 91%, 60%)"
const rgb = hexToRGB('#3b82f6'); // "rgb(59, 130, 246)"
const rgba = hexToRGBA('#3b82f6', 0.5); // "rgba(59, 130, 246, 0.5)"
```

#### Image Optimizer

```typescript
import {
  analyzeImageCompact,
  getOptimizationTips,
} from '@/lib/utils/image-optimizer';

// Analisar imagem
const analysis = analyzeImageCompact(imageUrl, { width: 800, height: 600 });

// Obter dicas de otimização
const tips = getOptimizationTips(analysis);
```

#### Post Compressor

```typescript
import {
  compressPost,
  decompressPost,
  generateTOC,
  estimateCompression,
} from '@/lib/utils/post-compressor';

// Comprimir conteúdo
const compressed = compressPost(tiptapContent);

// Descomprimir
const decompressed = decompressPost(compressed);

// Gerar TOC
const toc = generateTOC(compressed);

// Estimar compressão
const estimate = estimateCompression(original, compressed);
```

---

## 📖 Guia de Uso

### Importação

```typescript
// Importar do barrel principal (recomendado)
import { api, logger, validateEmail } from '@/lib';

// Importar de módulos específicos
import { postsService } from '@/lib/api';
import { calculateReadingTime } from '@/lib/content';
import { analytics } from '@/lib/monitoring';
```

### Padrões Recomendados

1. **Sempre use services ao invés do client direto** (quando disponível)
2. **Trate erros com ApiError** para requisições HTTP
3. **Use logger ao invés de console.log** em produção
4. **Verifique consentimento** antes de carregar analytics
5. **Valide dados** antes de enviar para API

---

## 💡 Exemplos Práticos

### Exemplo 1: Criar Post com Validação

```typescript
import {
  postsService,
  preparePostForCreate,
  validatePostData,
} from '@/lib/api';
import { logger } from '@/lib/monitoring';

async function createPost(formData: PostFormData, userId: string) {
  try {
    // Preparar dados
    const postData = preparePostForCreate(formData, userId);

    // Validar
    const errors = validatePostData(postData);
    if (errors.length > 0) {
      logger.warn('Erros de validação', { errors });
      return { success: false, errors };
    }

    // Criar post
    const post = await postsService.createPost(postData);
    logger.info('Post criado', { postId: post.id });

    return { success: true, post };
  } catch (error) {
    logger.error('Erro ao criar post', error, { userId });
    throw error;
  }
}
```

### Exemplo 2: Analytics com Consentimento

```typescript
import {
  isCookieAllowed,
  initGoogleAnalytics,
  trackPageView,
} from '@/lib/cookies';
import { analytics, ANALYTICS_EVENTS } from '@/lib/monitoring';

// Inicializar analytics se consentido
if (isCookieAllowed('analytics')) {
  initGoogleAnalytics();
  analytics.enable();
} else {
  analytics.disable();
}

// Rastrear página
function onRouteChange(url: string) {
  if (isCookieAllowed('analytics')) {
    trackPageView(url);
    analytics.pageView(url);
  }
}
```

### Exemplo 3: Performance Monitoring

```typescript
import { performanceMonitor } from '@/lib/monitoring';
import { logger } from '@/lib/monitoring';

async function loadPosts() {
  const duration = await performanceMonitor.measure('load-posts', async () => {
    return await postsService.listPosts();
  });

  if (duration > 1000) {
    logger.warn('Posts carregados lentamente', { duration });
  }

  // Reportar Web Vitals
  performanceMonitor.reportNavigationTiming();
}
```

---

## 🔗 Referências Adicionais

- [API Reference](./API-REFERENCE.md) - Documentação completa da API
- [Components Reference](./COMPONENTS-REFERENCE.md) - Documentação de componentes
- [Utilitários](./REFERENCIA_UTILITARIOS.md) - Referência detalhada de utilitários

---

**Última atualização**: 2025-01-15  
**Versão**: 2.0.0  
**Autor**: Rainer Teixeira
