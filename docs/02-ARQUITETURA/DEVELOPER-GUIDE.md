# 👨‍💻 Guia do Desenvolvedor - Nível Enterprise

## 🚀 Quick Start para Novos Desenvolvedores

Este guia mostra como usar todos os recursos enterprise implementados na aplicação.

---

## 📦 1. Design Tokens

**Onde**: `constants/design-tokens.ts`

### ✅ O QUE FAZER

```typescript
// ✅ BOM - Usar design tokens
import { SCROLL_THRESHOLDS, Z_INDEX, TYPOGRAPHY } from '@/constants/design-tokens'

const threshold = SCROLL_THRESHOLDS.BACK_TO_TOP // 300
className={TYPOGRAPHY.HEADING_1}
style={{ zIndex: Z_INDEX.NAVBAR }}
```

### ❌ O QUE NÃO FAZER

```typescript
// ❌ RUIM - Valores hardcoded
const threshold = 300
className="text-4xl sm:text-5xl md:text-6xl font-black"
style={{ zIndex: 50 }}
```

### 📋 Tokens Disponíveis

- `ANIMATION_DURATION_MS` - Durações de animação
- `SCROLL_THRESHOLDS` - Limites de scroll
- `Z_INDEX` - Hierarquia de camadas
- `TYPOGRAPHY` - Classes de tipografia
- `GRADIENTS` - Gradientes reutilizáveis
- `SPACING` - Espaçamentos padronizados
- `TIMING` - Delays e timings
- `STORAGE_KEYS` - Chaves do localStorage
- `ERROR_MESSAGES` - Mensagens de erro
- `SUCCESS_MESSAGES` - Mensagens de sucesso
- `FEATURE_FLAGS` - Controle de features

---

## 🐛 2. Logging System

**Onde**: `lib/logger.ts`

### ✅ Uso Correto

```typescript
import { logger } from '@/lib/logger'

// Debug (apenas desenvolvimento)
logger.debug('Dados carregados', { count: posts.length })

// Info
logger.info('Usuário logado', { userId: user.id })

// Warning
logger.warn('Cache expirado', { cacheKey: 'posts' })

// Error (com stack trace)
logger.error('Falha ao salvar', error, { postId: '123' })

// Logger com contexto
const componentLogger = logger.withContext({ component: 'BlogPage' })
componentLogger.info('Posts renderizados', { count: 10 })
```

### 📊 Output no Console

```
🔍 [DEBUG] 2025-10-15T10:30:00.000Z - Dados carregados
Contexto: { "count": 10 }

ℹ️ [INFO] 2025-10-15T10:30:01.000Z - Usuário logado
Contexto: { "userId": "123" }

⚠️ [WARN] 2025-10-15T10:30:02.000Z - Cache expirado
Contexto: { "cacheKey": "posts" }

❌ [ERROR] 2025-10-15T10:30:03.000Z - Falha ao salvar
Contexto: { "postId": "123", "error": {...} }
```

---

## 📈 3. Analytics System

**Onde**: `lib/analytics.ts` e `hooks/use-analytics.ts`

### ✅ Uso em Componentes

```typescript
import { useAnalytics } from '@/hooks/use-analytics'

function BlogPost() {
  const { trackBlogPostView, trackBlogPostLike } = useAnalytics()
  
  useEffect(() => {
    // Auto-track page view ao carregar
    trackBlogPostView(post.id, post.title)
  }, [post.id, post.title])
  
  const handleLike = () => {
    trackBlogPostLike(post.id)
    // ... lógica de like
  }
  
  return <button onClick={handleLike}>Curtir</button>
}
```

### 📋 Eventos Disponíveis

```typescript
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
```

### 🎯 Eventos Customizados

```typescript
import { analytics } from '@/lib/analytics'

analytics.track({
  category: 'user_action',
  action: 'custom_event',
  label: 'Descrição',
  value: 42,
  properties: { custom: 'data' }
})
```

---

## ⚡ 4. Performance Monitor

**Onde**: `lib/performance-monitor.ts`

### ✅ Medindo Performance

```typescript
import { performanceMonitor } from '@/lib/performance-monitor'

// Método 1: Start/End manual
performanceMonitor.start('fetch_posts')
const posts = await fetchPosts()
performanceMonitor.end('fetch_posts')

// Método 2: Helper measure (recomendado)
const posts = await performanceMonitor.measure('fetch_posts', async () => {
  return await fetchPosts()
})

// Obter métricas
const metric = performanceMonitor.getMetric('fetch_posts')
console.log(metric?.value, metric?.rating) // 245ms, 'good'
```

### 📊 Core Web Vitals

Rastreados automaticamente:

- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

---

## ✅ 5. Validation Schemas

**Onde**: `lib/validation-schemas.ts`

### ✅ Validando Formulários

```typescript
import { validateEmail, validatePassword, contactFormSchema } from '@/lib/validation-schemas'

// Validação individual
const emailResult = validateEmail('test@example.com')
if (!emailResult.isValid) {
  showError(emailResult.errors[0])
}

// Validação de form completo
const formData = { fullName: 'João', email: 'joao@example.com', ... }
const result = validateWithSchema(formData, contactFormSchema)

if (!result.isValid) {
  result.errors.forEach(error => showError(error))
}
```

### 📋 Validators Disponíveis

- `validateEmail()`
- `validatePassword()`
- `validateUsername()`
- `validatePhone()`
- `validateMessage()`
- `validateUrl()`
- `validateSlug()`

### 📋 Schemas Disponíveis

- `loginFormSchema`
- `contactFormSchema`
- `postFormSchema`
- `newsletterFormSchema`

---

## ⏳ 6. Loading States

**Onde**: `components/ui/loading-states.tsx`

### ✅ Componentes Disponíveis

```typescript
import { 
  FullPageLoader, 
  InlineLoader, 
  SkeletonGrid,
  EmptyState 
} from '@/components/ui/loading-states'

// Loading full-page
<FullPageLoader message="Carregando dashboard..." />

// Loading inline
<InlineLoader message="Buscando posts..." size="lg" />

// Skeleton grid
<SkeletonGrid count={6} columns={3} />

// Empty state
<EmptyState 
  icon={FileText}
  title="Nenhum post encontrado"
  description="Crie seu primeiro post"
  action={<Button onClick={handleCreate}>Criar Post</Button>}
/>
```

---

## 🌍 8. Environment Variables

**Onde**: `lib/env.ts`

### ✅ Uso Type-Safe

```typescript
import { env, isDevelopment, isProduction } from '@/lib/env'

// Acessar variáveis tipadas
const appUrl = env.NEXT_PUBLIC_APP_URL
const appName = env.NEXT_PUBLIC_APP_NAME

// Checks de ambiente
if (isDevelopment) {
  console.log('Dev mode')
}

if (env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
  initAnalytics()
}
```

### 🔧 Adicionando Nova Variável

1. Adicionar em `.env.local`:

```env
NEXT_PUBLIC_MY_NEW_VAR=value
```

2. Adicionar tipo em `lib/env.ts`:

```typescript
interface EnvironmentConfig {
  // ... existing
  readonly NEXT_PUBLIC_MY_NEW_VAR: string
}
```

3. Adicionar leitura:

```typescript
export const env: EnvironmentConfig = {
  // ... existing
  NEXT_PUBLIC_MY_NEW_VAR: getEnvVar('NEXT_PUBLIC_MY_NEW_VAR'),
}
```

---

## 🎯 9. Feature Flags

**Onde**: `constants/design-tokens.ts`

### ✅ Uso

```typescript
import { FEATURE_FLAGS } from '@/constants/design-tokens'

// Condicional por feature
if (FEATURE_FLAGS.ENABLE_BLOG_COMMENTS) {
  return <CommentsSection />
}

// Em componente
{FEATURE_FLAGS.ENABLE_NEWSLETTER && <NewsletterSection />}
```

---

## 🎨 10. Padrões de Código

### ✅ Nomenclatura

```typescript
// Variáveis boolean
const isLoading = true
const hasError = false
const shouldShow = true
const canEdit = true

// Variáveis de estado
const currentUser = user
const selectedItem = item
const activeTab = 'home'

// Arrays
const allPosts = []
const filteredData = []
const sortedItems = []

// Funções
const handleClick = () => {}
const loadData = async () => {}
const calculateTotal = () => {}
const startEditing = () => {}

// Constantes
const API_ENDPOINT = '/api/data'
const MAX_ITEMS = 10
const DEFAULT_THEME = 'dark'
```

### ✅ Organização de Imports

```typescript
// 1. React & Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. Third-party
import { motion } from 'framer-motion'

// 3. Components
import { Button } from '@/components/ui/button'

// 4. Hooks & Utils
import { useAnalytics } from '@/hooks/use-analytics'
import { cn } from '@/lib/utils'

// 5. Constants & Types
import { FEATURE_FLAGS } from '@/constants/design-tokens'
```

---

## 🔍 11. Debug Tips

### Development Console

```typescript
// Ver todas as métricas de performance
performanceMonitor.getAllMetrics()

// Ver contexto de analytics
analytics // inspecionar no console

// Forçar log em produção
logger.error('Debug em prod', null, { debug: true })
```

### React DevTools

- Usar Profiler para identificar re-renders
- Highlight updates para ver componentes renderizando
- Component tree para estrutura

---

## 📚 12. Recursos Adicionais

### Documentação Técnica

- `/docs/ARCHITECTURE.md` - Arquitetura completa
- `/docs/DEVELOPER-GUIDE.md` - Este guia
- Inline JSDoc em todos os arquivos

### Code Examples

Todos os componentes têm exemplos de uso no JSDoc:

```typescript
/**
 * @example
 * ```tsx
 * <Component prop="value" />
 * ```
 */
```

---

## 🎓 Best Practices

### ✅ SEMPRE FAÇA

1. ✅ Use design tokens ao invés de valores hardcoded
2. ✅ Adicione types com `readonly` em interfaces
3. ✅ Documente com JSDoc
4. ✅ Use logger ao invés de console.log
5. ✅ Track eventos importantes com analytics
6. ✅ Valide inputs com validation schemas
7. ✅ Adicione `aria-hidden="true"` em ícones decorativos
8. ✅ Use loading states padronizados
9. ✅ Extraia constantes duplicadas
10. ✅ Teste em ambos os temas (light/dark)

### ❌ NUNCA FAÇA

1. ❌ Hardcode valores que podem mudar (cores, tamanhos, limites)
2. ❌ Use `any` em TypeScript
3. ❌ Ignore erros silenciosamente
4. ❌ Commit código com erros de lint
5. ❌ Use console.log em produção
6. ❌ Crie componentes sem props tipadas
7. ❌ Esqueça acessibilidade (ARIA labels)
8. ❌ Deixe código sem documentação
9. ❌ Ignore performance
10. ❌ Duplique código (DRY principle)

---

## 🛠️ Ferramentas de Desenvolvimento

### VS Code Extensions Recomendadas

- **ESLint** - Linting em tempo real
- **Prettier** - Formatação automática
- **TypeScript** - Suporte TS
- **Tailwind CSS IntelliSense** - Autocomplete CSS
- **Error Lens** - Erros inline
- **GitLens** - Git enhanced
- **Auto Rename Tag** - Renomear tags HTML
- **Import Cost** - Tamanho de imports

### Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint

# Type check
npm run type-check
```

---

## 📖 Exemplos Práticos

### Criar Nova Página

```typescript
/**
 * My Page Component
 * 
 * Descrição da página
 * 
 * @fileoverview My page
 * @author Seu Nome
 * @version 1.0.0
 */

'use client'

// ============================================================================
// React & Next.js
// ============================================================================

import { useState } from 'react'

// ============================================================================
// UI Components
// ============================================================================

import { PageHeader, BackToTop } from '@/components/ui'

// ============================================================================
// Constants
// ============================================================================

import { FEATURE_FLAGS } from '@/constants/design-tokens'

// ============================================================================
// Hooks
// ============================================================================

import { useAnalytics } from '@/hooks/use-analytics'

// ============================================================================
// Types
// ============================================================================

interface MyPageProps {
  readonly params: { id: string }
}

// ============================================================================
// Main Component
// ============================================================================

export default function MyPage({ params }: MyPageProps) {
  const { trackPageView } = useAnalytics()
  
  useEffect(() => {
    trackPageView('/my-page')
  }, [])
  
  return (
    <div className="min-h-screen">
      <PageHeader title="Minha Página" description="Descrição" />
      {/* Conteúdo */}
      <BackToTop />
    </div>
  )
}
```

### Criar Novo Componente

```typescript
/**
 * My Component
 * 
 * @fileoverview Componente reutilizável
 */

'use client'

// Imports organizados...

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_COUNT = 10

// ============================================================================
// Types
// ============================================================================

interface MyComponentProps {
  readonly title: string
  readonly count?: number
  readonly onAction?: () => void
}

// ============================================================================
// Main Component
// ============================================================================

export function MyComponent({ 
  title, 
  count = DEFAULT_COUNT,
  onAction 
}: MyComponentProps) {
  // State e lógica...
  
  return (
    <div>
      <h2>{title}</h2>
      {/* ... */}
    </div>
  )
}
```

---

## 🎯 Checklist de Pull Request

Antes de criar PR, verifique:

- [ ] ✅ Zero erros de lint
- [ ] ✅ Zero erros de TypeScript
- [ ] ✅ JSDoc completo em componentes novos
- [ ] ✅ Design tokens usados (sem hardcode)
- [ ] ✅ Interfaces com `readonly`
- [ ] ✅ Analytics tracking adicionado
- [ ] ✅ Validation schemas para forms
- [ ] ✅ Loading states implementados
- [ ] ✅ Error handling adequado
- [ ] ✅ Acessibilidade verificada (ARIA)
- [ ] ✅ Testado em light e dark mode
- [ ] ✅ Mobile responsivo
- [ ] ✅ Performance OK (no lag)
- [ ] ✅ Comentários em português
- [ ] ✅ Código segue estrutura padrão

---

## 💡 Pro Tips

### 1. Autocomplete de Tokens

```typescript
import { ANIMATION_DURATION_MS } from '@/constants/design-tokens'

// TypeScript autocomplete mostra:
// - INSTANT
// - FAST
// - NORMAL
// - SLOW
// - VERY_SLOW

const duration = ANIMATION_DURATION_MS.FAST // 150ms
```

### 2. Type-Safe Events

```typescript
import { ANALYTICS_EVENTS } from '@/lib/analytics'

// Autocomplete mostra todos os eventos disponíveis
// com params corretos
analytics.track(ANALYTICS_EVENTS.BLOG_POST_VIEW(
  'post-123',  // TypeScript valida os parâmetros
  'Título'
))
```

### 3. Logger Contextual

```typescript
// Criar logger para componente específico
const logger = logger.withContext({ 
  component: 'BlogPage',
  route: '/blog' 
})

// Todos os logs vão incluir esse contexto
logger.info('Carregado') // { component: 'BlogPage', route: '/blog' }
```

---

## 🚀 Deployment Checklist

Antes de deploy para produção:

- [ ] ✅ `npm run build` sem erros
- [ ] ✅ Lighthouse score > 90
- [ ] ✅ Todas as env vars configuradas
- [ ] ✅ Analytics funcionando
- [ ] ✅ Error tracking configurado
- [ ] ✅ Service Worker atualizado (PWA)
- [ ] ✅ Manifest.json correto
- [ ] ✅ OG images gerados
- [ ] ✅ Sitemap atualizado
- [ ] ✅ Robots.txt configurado

---

## 📞 Suporte

Dúvidas? Entre em contato:

- **Email**: <suporte@rainersoft.com.br>
- **Documentação**: `/docs/ARCHITECTURE.md`
- **Código**: Veja exemplos inline nos componentes

---

**Happy Coding! 🚀**

_Última atualização: Outubro 2025_
