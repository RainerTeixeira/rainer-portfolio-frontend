# 📚 API Reference - Utilitários e Helpers

## 📋 Índice

1. [Design Tokens](#design-tokens)
2. [Logger](#logger)
3. [Analytics](#analytics)
4. [Performance Monitor](#performance-monitor)
5. [Validation Schemas](#validation-schemas)
6. [Environment](#environment)
7. [Utilities](#utilities)
8. [String Utils](#string-utils)
9. [Content Utils](#content-utils)
10. [API Helpers](#api-helpers)
11. [SEO Utils](#seo-utils)
12. [Hooks](#hooks)

---

## 🎨 Design Tokens

**Arquivo**: `constants/design-tokens.ts`

### Importação

```typescript
import {
  ANIMATION_DURATION_MS,
  SCROLL_THRESHOLDS,
  Z_INDEX,
  TYPOGRAPHY,
  GRADIENTS,
  TIMING,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  FEATURE_FLAGS,
  REGEX_PATTERNS,
} from '@/constants/design-tokens';
```

### Animation Duration

```typescript
ANIMATION_DURATION_MS = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

// Uso
const duration = ANIMATION_DURATION_MS.FAST; // 150
```

### Scroll Thresholds

```typescript
SCROLL_THRESHOLDS = {
  BACK_TO_TOP: 300,
  NAVBAR_GLASSMORPHISM: 10,
  SECTION_REVEAL: 100,
};

// Uso
if (scrollY > SCROLL_THRESHOLDS.BACK_TO_TOP) {
  showButton();
}
```

### Z-Index

```typescript
Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  DROPDOWN: 30,
  NAVBAR: 50,
  MODAL: 60,
  TOOLTIP: 80,
  TOAST: 90,
}

// Uso
style={{ zIndex: Z_INDEX.NAVBAR }}
```

### Typography

```typescript
TYPOGRAPHY = {
  HEADING_1: 'text-4xl sm:text-5xl md:text-6xl font-black',
  HEADING_2: 'text-3xl sm:text-4xl md:text-5xl font-bold',
  HEADING_3: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  BODY: 'text-base',
}

// Uso
<h1 className={TYPOGRAPHY.HEADING_1}>Título</h1>
```

### Timing

```typescript
TIMING = {
  DEBOUNCE_SEARCH: 300,
  TOAST_DURATION: 3000,
  SAVE_DELAY: 500,
  SLIDE_DURATION: 6000,
};

// Uso
setTimeout(save, TIMING.SAVE_DELAY);
```

### Storage Keys

```typescript
STORAGE_KEYS = {
  AUTH_USER: 'auth_user',
  THEME: 'theme',
  BLOG_POSTS: 'blog_posts',
};

// Uso
localStorage.setItem(STORAGE_KEYS.AUTH_USER, data);
```

### Error Messages

```typescript
ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  LOGIN_FAILED: 'Credenciais inválidas',
};

// Uso
showError(ERROR_MESSAGES.INVALID_EMAIL);
```

### Feature Flags

```typescript
FEATURE_FLAGS = {
  ENABLE_BLOG_COMMENTS: false,
  ENABLE_DARK_MODE: true,
  ENABLE_PWA: true,
  ENABLE_ANALYTICS: true,
}

// Uso
if (FEATURE_FLAGS.ENABLE_BLOG_COMMENTS) {
  return <CommentsSection />
}
```

### Regex Patterns

```typescript
REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_BR: /^\+?55\s?\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/,
  URL: /^https?:\/\/.+/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

// Uso
if (REGEX_PATTERNS.EMAIL.test(email)) {
  // Email válido
}
```

---

## 📝 Logger

**Arquivo**: `lib/monitoring/logger.ts`  
**⚠️ DEPRECATED**: `lib/logger.ts` (use `lib/monitoring/logger.ts`)

### API

#### `logger.debug(message, context?)`

```typescript
logger.debug('User data loaded', { userId: '123', count: 10 });
```

**Características**:

- Apenas em desenvolvimento
- Cor: Cinza
- Emoji: 🔍

#### `logger.info(message, context?)`

```typescript
logger.info('User logged in', { userId: user.id });
```

**Características**:

- Produção e desenvolvimento
- Cor: Azul
- Emoji: ℹ️

#### `logger.warn(message, context?)`

```typescript
logger.warn('Cache expired', { cacheKey: 'posts' });
```

**Características**:

- Envia para external service
- Cor: Amarelo
- Emoji: ⚠️

#### `logger.error(message, error?, context?)`

```typescript
logger.error('Failed to save post', error, { postId: '123' });
```

**Características**:

- Envia para external service
- Inclui stack trace
- Cor: Vermelho
- Emoji: ❌

#### `logger.withContext(defaultContext)`

```typescript
const componentLogger = logger.withContext({
  component: 'BlogPage',
  route: '/blog',
});

componentLogger.info('Mounted');
// Output: { component: 'BlogPage', route: '/blog' }
```

**Retorna**: Nova instância de Logger com contexto padrão

---

## 📊 Analytics

**Arquivo**: `lib/monitoring/analytics.ts`  
**⚠️ DEPRECATED**: `lib/analytics.ts` (use `lib/monitoring/analytics.ts`)

### API

#### `analytics.track(event)`

```typescript
import { analytics, ANALYTICS_EVENTS } from '@/lib/monitoring/analytics';
// ou via barrel export:
import { analytics, ANALYTICS_EVENTS } from '@/lib/monitoring';

analytics.track(ANALYTICS_EVENTS.PAGE_VIEW('/blog'));
analytics.track(ANALYTICS_EVENTS.BLOG_POST_LIKE('post-123'));
```

**Eventos Predefinidos**:

```typescript
ANALYTICS_EVENTS = {
  PAGE_VIEW: (page: string) => ({ ... }),
  BLOG_POST_VIEW: (postId: string, title: string) => ({ ... }),
  BLOG_POST_LIKE: (postId: string) => ({ ... }),
  DOWNLOAD_CV: () => ({ ... }),
  THEME_TOGGLE: (theme: string) => ({ ... }),
  CONTACT_FORM_SUBMIT: (success: boolean) => ({ ... }),
  NEWSLETTER_SUBSCRIBE: (email: string) => ({ ... }),
  EXTERNAL_LINK_CLICK: (url: string) => ({ ... }),
  ERROR_OCCURRED: (message: string, component?: string) => ({ ... }),
  PAGE_LOAD_TIME: (page: string, timeMs: number) => ({ ... }),
}
```

#### `analytics.pageView(page)`

```typescript
analytics.pageView('/blog');
```

#### `analytics.identify(userId, properties?)`

```typescript
analytics.identify('user-123', {
  fullName: 'João',
  plan: 'premium',
});
```

#### `analytics.enable()` / `analytics.disable()`

```typescript
// GDPR compliance
analytics.disable();
analytics.enable();
```

---

## ⚡ Performance Monitor

**Arquivo**: `lib/monitoring/performance.ts`  
**⚠️ DEPRECATED**: `lib/performance-monitor.ts` (use `lib/monitoring/performance.ts`)

### API

#### `performanceMonitor.start(fullName)`

```typescript
performanceMonitor.start('fetch_posts');
```

**Marca início de medição**

#### `performanceMonitor.end(fullName)` → `number | null`

```typescript
const duration = performanceMonitor.end('fetch_posts');
console.log(duration); // 245 (ms)
```

**Retorna duração em milissegundos**

#### `performanceMonitor.measure(fullName, fn)` → `Promise<T>`

```typescript
const data = await performanceMonitor.measure('load_data', async () => {
  return await fetchData();
});

// Automatically starts, executes fn, ends, returns result
```

**Método recomendado para measuring**

#### `performanceMonitor.getMetric(fullName)` → `PerformanceMetric | undefined`

```typescript
const metric = performanceMonitor.getMetric('fetch_posts');
console.log(metric?.value); // 245
console.log(metric?.rating); // 'good'
```

**Returns**:

```typescript
interface PerformanceMetric {
  readonly fullName: string;
  readonly value: number;
  readonly rating: 'good' | 'needs-improvement' | 'poor';
  readonly timestamp: number;
}
```

#### `performanceMonitor.getAllMetrics()` → `PerformanceMetric[]`

```typescript
const allMetrics = performanceMonitor.getAllMetrics();
allMetrics.forEach(m => console.log(m.fullName, m.value, m.rating));
```

#### `performanceMonitor.clearMetrics()`

```typescript
performanceMonitor.clearMetrics();
```

**Limpa todas as métricas armazenadas**

#### `performanceMonitor.reportNavigationTiming()`

```typescript
performanceMonitor.reportNavigationTiming();
```

**Reporta métricas de navegação (DNS, TCP, TTFB, etc)**

---

## ✅ Validation Schemas

**Arquivo**: `lib/utils/validation.ts`  
**⚠️ DEPRECATED**: `lib/validation-schemas.ts` (use `lib/utils/validation.ts`)

### Validators

#### `validateEmail(email)` → `ValidationResult`

```typescript
const result = validateEmail('test@example.com');
if (!result.isValid) {
  console.error(result.errors); // ['Email inválido']
}
```

#### `validatePassword(password)` → `ValidationResult`

```typescript
const result = validatePassword('12345678');
// Checks: required, min length (8)
```

#### `validateUsername(username)` → `ValidationResult`

```typescript
const result = validateUsername('johndoe');
// Checks: required, min (3), max (30)
```

#### `validatePhone(phone)` → `ValidationResult`

```typescript
const result = validatePhone('(24) 99999-9999');
// Validates Brazilian phone format
```

#### `validateMessage(message)` → `ValidationResult`

```typescript
const result = validateMessage('Hello world');
// Checks: required, min (10), max (1000)
```

#### `validateUrl(url)` → `ValidationResult`

```typescript
const result = validateUrl('https://example.com');
// Checks: required, valid URL format
```

#### `validateSlug(slug)` → `ValidationResult`

```typescript
const result = validateSlug('my-blog-post');
// Checks: required, lowercase, hyphens only
```

### Validation Result

```typescript
interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}
```

### Form Schemas

#### `loginFormSchema`

```typescript
import { loginFormSchema, validateWithSchema } from '@/lib/utils/validation';
// ou via barrel export:
import { loginFormSchema, validateWithSchema } from '@/lib/utils';

const data = { username: 'john', password: '12345678' };
const result = validateWithSchema(data, loginFormSchema);
```

**Fields**:

- `username` - Validates username
- `password` - Validates password

#### `contactFormSchema`

**Fields**:

- `fullName` - Validates fullName (username rules)
- `email` - Validates email
- `phone` - Validates phone (BR format)
- `message` - Validates message

#### `postFormSchema`

**Fields**:

- `title` - Max 100 chars
- `description` - Max 300 chars
- `slug` - Lowercase + hyphens
- `category` - Max 50 chars

#### `newsletterFormSchema`

**Fields**:

- `email` - Validates email

### `validateWithSchema(data, schema)` → `ValidationResult`

```typescript
const formData = {
  email: 'test@example.com',
  password: '12345678',
};

const result = validateWithSchema(formData, loginFormSchema);

if (!result.isValid) {
  result.errors.forEach(error => showError(error));
}
```

---

## 🌍 Environment

**Arquivo**: `lib/env.ts`

### API

#### `env` object

```typescript
import { env } from '@/lib/env';

env.NODE_ENV; // 'development' | 'production' | 'test'
env.NEXT_PUBLIC_APP_URL; // string
env.NEXT_PUBLIC_APP_NAME; // string
env.NEXT_PUBLIC_ENABLE_ANALYTICS; // boolean
env.NEXT_PUBLIC_ENABLE_PWA; // boolean
```

**Todos os acessos são type-safe**

#### Helper functions

```typescript
import { isDevelopment, isProduction, isTest } from '@/lib/env';

if (isDevelopment) {
  console.log('Dev mode');
}

if (isProduction) {
  initAnalytics();
}
```

---

## 🛠️ Utilities

**Arquivo**: `lib/utils.ts`

### `cn(...inputs)` → `string`

**Combina classes Tailwind**:

```typescript
import { cn } from '@/lib/utils';

cn('px-2 py-1', 'px-3'); // 'py-1 px-3'
cn('text-red-500', condition && 'text-blue-500');
cn({ 'bg-red-500': isError });
```

**Usa**: clsx + tailwind-merge

---

**Arquivo**: `lib/utils/scroll.ts`  
**⚠️ DEPRECATED**: `lib/scroll-utils.ts` (use `lib/utils/scroll.ts`)

### `scrollToElement(elementId, options?)`

```typescript
import { scrollToElement } from '@/lib/utils/scroll';
// ou via barrel export:
import { scrollToElement } from '@/lib/utils';

scrollToElement('section-id', {
  behavior: 'smooth',
  block: 'start',
  offset: 80, // Header height
});
```

### `getScrollProgress()` → `number`

```typescript
const progress = getScrollProgress(); // 0-100
```

**Retorna**: Percentual de scroll (0 a 100)

---

## 🪝 Hooks

### useAnalytics()

**Arquivo**: `hooks/use-analytics.ts`

```typescript
import { useAnalytics } from '@/hooks/use-analytics'

function Component() {
  const {
    trackPageView,
    trackBlogPostView,
    trackBlogPostLike,
    trackDownloadCV,
    trackThemeToggle,
    trackContactForm,
    trackNewsletterSubscribe,
    trackExternalLink,
  } = useAnalytics()

  // Auto-tracks page views on route change

  return <button onClick={() => trackBlogPostLike('123')}>Like</button>
}
```

**Features**:

- Auto-track page views
- Type-safe tracking functions
- useCallback optimized

---

### useMobile()

**Arquivo**: `hooks/use-mobile.ts`

```typescript
import { useMobile } from '@/hooks/use-mobile'

function Component() {
  const isMobile = useMobile()

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  )
}
```

**Retorna**: `boolean`
**Breakpoint**: `md` (768px)

---

### useSmoothScroll()

**Arquivo**: `hooks/use-smooth-scroll.ts`

```typescript
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

function Component() {
  const { scrollToSection, scrollToTop } = useSmoothScroll()

  return (
    <button onClick={() => scrollToSection('about')}>
      Sobre
    </button>
  )
}
```

**Returns**:

```typescript
{
  scrollToSection: (id: string) => void
  scrollToTop: () => void
  scrollToElement: (element: HTMLElement) => void
}
```

**Features**:

- Respects `prefers-reduced-motion`
- Smooth behavior
- Header offset
- Accessible

---

### usePWA()

**Arquivo**: `hooks/use-pwa.ts`

```typescript
import { usePWA } from '@/hooks/use-pwa'

function Component() {
  const {
    isInstallable,
    isInstalled,
    handleInstall,
    handleDismiss,
  } = usePWA()

  if (!isInstallable) return null

  return (
    <button onClick={handleInstall}>
      Instalar App
    </button>
  )
}
```

**Returns**:

```typescript
{
  isInstallable: boolean
  isInstalled: boolean
  handleInstall: () => Promise<void>
  handleDismiss: () => void
}
```

---

### usePasswordStrength()

**Arquivo**: `hooks/use-password-strength.ts`

```typescript
import { usePasswordStrength } from '@/hooks/use-password-strength'

function Component() {
  const [password, setPassword] = useState('')
  const { strength, label, color } = usePasswordStrength(password)

  return (
    <div>
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <div style={{ color }}>Força: {label} ({strength}/4)</div>
    </div>
  )
}
```

**Returns**:

```typescript
{
  strength: number; // 0-4
  label: 'Muito Fraca' | 'Fraca' | 'Média' | 'Forte' | 'Muito Forte';
  color: string; // Tailwind color class
}
```

---

## 🎨 Component Utils

### Button Variants

**Arquivo**: `components/ui/button.tsx`

```typescript
import { Button, buttonVariants } from '@/components/ui/button'

// Como componente
<Button variant="default" size="lg">Click</Button>

// Como class
<div className={buttonVariants({ variant: 'outline' })}>
  Custom
</div>
```

**Variants**:

- `default` - Botão primário
- `destructive` - Ações destrutivas
- `outline` - Outline button
- `secondary` - Botão secundário
- `ghost` - Sem background
- `link` - Como link

**Sizes**:

- `default` - Tamanho normal
- `sm` - Pequeno
- `lg` - Grande
- `icon` - Apenas ícone

---

### Card Components

**Arquivo**: `components/ui/card.tsx`

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
</Card>
```

---

### Loading States

**Arquivo**: `components/ui/loading-states.tsx`

```typescript
import {
  FullPageLoader,
  InlineLoader,
  SkeletonGrid,
  EmptyState,
  LoadingSpinner,
} from '@/components/ui/loading-states'

// Full page
<FullPageLoader message="Carregando..." />

// Inline
<InlineLoader message="Buscando..." size="lg" />

// Skeleton grid
<SkeletonGrid count={6} columns={3} />

// Empty state
<EmptyState
  icon={FileText}
  title="Nenhum item"
  description="Descrição"
  action={<Button>Ação</Button>}
/>

// Spinner
<LoadingSpinner size="md" label="Carregando..." />
```

**SkeletonGrid Props**:

```typescript
{
  count?: number        // Default: 4
  columns?: 1 | 2 | 3 | 4  // Default: 2
  className?: string
}
```

**LoadingSpinner Sizes**: `'sm' | 'md' | 'lg' | 'xl'`

---

## 🔤 String Utils

**Arquivo**: `lib/utils/string.ts`

### Importação

```typescript
import {
  textToSlug,
  formatDate,
  formatDateTime,
  translatePostStatus,
  translateStatus,
} from '@/lib/utils/string';
```

### Funções

#### `textToSlug(text: string): string`

Converte string para slug URL-friendly.

```typescript
textToSlug('Meu Primeiro Post!'); // "meu-primeiro-post"
textToSlug('Café & Pão'); // "cafe-pao"
```

#### `formatDate(date: Date | string): string`

Formata data para exibição em português.

```typescript
formatDate(new Date()); // "15 de janeiro de 2025"
formatDate('2025-01-15T00:00:00Z'); // "15 de janeiro de 2025"
```

#### `formatDateTime(date: Date | string): string`

Formata data e hora para exibição em português.

```typescript
formatDateTime(new Date()); // "15 de janeiro de 2025, 14:30"
```

#### `translatePostStatus(status: PostStatus | string): string`

Traduz status do post para português.

```typescript
translatePostStatus('DRAFT'); // "Rascunho"
translatePostStatus('PUBLISHED'); // "Publicado"
```

---

## 📝 Content Utils

**Arquivo**: `lib/content/`

### Importação

```typescript
import {
  extractTextFromTiptap,
  generateExcerpt,
  createEmptyTiptapContent,
  isContentEmpty,
  calculateReadingTime,
} from '@/lib/content';
```

### Funções

#### `extractTextFromTiptap(content: TiptapJSON): string`

Extrai texto puro do JSON do Tiptap.

```typescript
const content = {
  type: 'doc',
  content: [
    { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] },
  ],
};

extractTextFromTiptap(content); // "Olá mundo"
```

#### `generateExcerpt(content: TiptapJSON, maxLength?: number): string`

Gera excerpt (resumo) do conteúdo Tiptap.

```typescript
const excerpt = generateExcerpt(content, 50); // "Primeiros 50 caracteres..."
```

#### `calculateReadingTime(content: string | TiptapJSON, wordsPerMinute?: number): number`

Calcula tempo de leitura baseado no conteúdo.

```typescript
calculateReadingTime(tiptapContent); // 5
calculateReadingTime('<p>Texto longo...</p>'); // 3
```

---

## 🔧 API Helpers

**Arquivo**: `lib/api/helpers/`

### Importação

```typescript
import {
  preparePostForCreate,
  preparePostForUpdate,
  validatePostData,
} from '@/lib/api/helpers';
```

### Funções

#### `preparePostForCreate(formData, authorId): CreatePostData`

Prepara dados do formulário para criar post no backend.

```typescript
const postData = preparePostForCreate(
  {
    title: 'Meu Post',
    content: tiptapJSON,
    subcategoryId: 'cat-123',
  },
  user.id
);
```

#### `validatePostData(data): string[]`

Valida dados de post antes de enviar para API.

```typescript
const errors = validatePostData(postData);
if (errors.length > 0) {
  console.error('Erros:', errors);
}
```

---

## 🔍 SEO Utils

**Arquivo**: `lib/seo/`

### Importação

```typescript
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

### Funções

#### `generateMetadata(props): Metadata`

Gera metadados completos para SEO.

```typescript
const metadata = generateMetadata({
  title: 'Meu Post',
  description: 'Descrição do post',
  type: 'article',
  publishedTime: '2025-01-15T00:00:00Z',
});
```

#### `generatePostMetadata(post): Metadata`

Gera metadados para post do blog.

```typescript
const post = await getPostBySlug('meu-post');
const metadata = generatePostMetadata(post);
```

---

## 📦 Barrel Exports

### `@/lib`

```typescript
// Single import
import {
  logger,
  analytics,
  performanceMonitor,
  env,
  validateEmail,
  blogPublicApi,
  // String Utils
  textToSlug,
  formatDate,
  translatePostStatus,
  // Content Utils
  extractTextFromTiptap,
  calculateReadingTime,
  // API Helpers
  preparePostForCreate,
  validatePostData,
  // SEO Utils
  generateMetadata,
  generatePostMetadata,
} from '@/lib';
```

### `@/hooks`

```typescript
import {
  useAnalytics,
  useMobile,
  usePWA,
  useSmoothScroll,
  usePasswordStrength,
} from '@/hooks';
```

### `@/components/ui`

```typescript
import {
  Button,
  Card,
  Input,
  Dialog,
  FullPageLoader,
  EmptyState,
  Skeleton,
  // ... 40+ components
} from '@/components/ui';
```

---

## 🎯 Type Definitions

### Common Types

```typescript
// User
interface User {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: 'admin' | 'editor' | 'viewer';
}

// Blog Post
interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly category: string;
  readonly published: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Validation Result
interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

// Performance Metric
interface PerformanceMetric {
  readonly fullName: string;
  readonly value: number;
  readonly rating: 'good' | 'needs-improvement' | 'poor';
  readonly timestamp: number;
}
```

---

## 📚 Best Practices

### Using Design Tokens

```typescript
// ✅ SEMPRE
import { Z_INDEX, TIMING } from '@/constants/design-tokens';
const zIndex = Z_INDEX.NAVBAR;
const delay = TIMING.SAVE_DELAY;

// ❌ NUNCA
const zIndex = 50;
const delay = 500;
```

### Using Logger

```typescript
// ✅ SEMPRE
import { logger } from '@/lib';
logger.info('User logged in', { userId });

// ❌ NUNCA
console.log('User logged in', userId);
```

### Using Validators

```typescript
// ✅ SEMPRE
import { validateEmail } from '@/lib/utils/validation';
// ou via barrel export:
import { validateEmail } from '@/lib/utils';
const result = validateEmail(email);

// ❌ NUNCA
const isValid = email.includes('@');
```

### Using Analytics

```typescript
// ✅ SEMPRE
import { useAnalytics } from '@/hooks';
const { trackPageView } = useAnalytics();
trackPageView('/blog');

// ❌ NUNCA
// Tracking manual sem structure
```

---

## 🔍 Debugging

### Logger Debug Mode

```typescript
// Em desenvolvimento
logger.debug('Detailed info', { data });

// Forçar log em produção (emergency)
console.error('CRITICAL:', error);
```

### Performance Debugging

```typescript
// Ver todas métricas
console.table(performanceMonitor.getAllMetrics());

// Ver métrica específica
const metric = performanceMonitor.getMetric('load_posts');
console.log(metric);
```

### Analytics Debugging

```typescript
// Desabilitar analytics temporariamente
analytics.disable();

// Ver eventos no console
logger.debug('Analytics event', { event });
```

---

## 📞 Suporte

Dúvidas sobre a API? Entre em contato:

- 📧 **Email**: <suporte@rainersoft.com.br>
- 📖 **Docs**: Ver outros documentos em `/docs/`
- 💬 **Issues**: GitHub Issues

---

**Última atualização**: Outubro 2025
**Versão**: 2.0.0
