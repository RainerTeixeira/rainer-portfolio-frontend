# 🏗️ Arquitetura da Aplicação

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Padrões de Código](#padrões-de-código)
4. [Design Tokens](#design-tokens)
5. [Componentes](#componentes)
6. [Providers](#providers)
7. [Hooks Customizados](#hooks-customizados)
8. [Utilitários](#utilitários)
9. [Performance](#performance)
10. [Acessibilidade](#acessibilidade)

---

## 🎯 Visão Geral

Aplicação Next.js 15 com React 19 e TypeScript, seguindo padrões enterprise de código limpo, semântico e altamente manutenível.

### **Tech Stack Principal**
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Linguagem**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Animações**: Framer Motion
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React

### **Características Enterprise**
- ✅ TypeScript estrito com types robustos
- ✅ Design tokens centralizados
- ✅ Error boundaries globais
- ✅ Loading states padronizados
- ✅ Analytics estruturado
- ✅ Performance monitoring
- ✅ Logging system
- ✅ Validation schemas
- ✅ Environment variables tipadas
- ✅ 100% acessível (WCAG 2.1 AA)

---

## 📁 Estrutura de Pastas

```
rainer-portfolio-frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── blog/                    # Blog routes
│   ├── contato/                 # Contact routes
│   ├── sobre/                   # About routes
│   └── dashboard/               # Admin dashboard
│
├── components/                   # Componentes React
│   ├── layout/                  # Navbar, Footer
│   ├── home/                    # Seções da home
│   ├── providers/               # Context providers
│   ├── ui/                      # Componentes UI base
│   ├── blog/                    # Componentes do blog
│   ├── dashboard/               # Componentes do dashboard
│   ├── theme/                   # Sistema de tema
│   └── error-boundary.tsx       # Error handling
│
├── hooks/                        # Custom hooks
│   ├── use-analytics.ts         # Analytics tracking
│   ├── use-mobile.ts            # Mobile detection
│   ├── use-smooth-scroll.ts     # Smooth scrolling
│   └── use-pwa.ts               # PWA features
│
├── lib/                          # Bibliotecas e utilitários
│   ├── utils.ts                 # Helpers gerais
│   ├── env.ts                   # Environment config
│   ├── logger.ts                # Logging system
│   ├── analytics.ts             # Analytics system
│   ├── performance-monitor.ts   # Performance tracking
│   ├── validation-schemas.ts    # Form validation
│   └── blog-store.ts            # Blog data store
│
├── constants/                    # Constantes globais
│   ├── index.tsx                # Config geral
│   └── design-tokens.ts         # Design tokens
│
├── types/                        # TypeScript types
│   └── database.ts              # Database types
│
└── public/                       # Assets estáticos
    ├── images/                  # Imagens
    ├── manifest.json            # PWA manifest
    └── sw.js                    # Service Worker
```

---

## 🎨 Padrões de Código

### **Estrutura Padrão de Componente**

```typescript
/**
 * Component Name
 * 
 * Descrição do componente
 * Lista de características
 * 
 * @fileoverview Descrição curta
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client" // Se necessário

// ============================================================================
// React & Next.js
// ============================================================================

import { useState } from 'react'
import Link from 'next/link'

// ============================================================================
// Third-party Libraries
// ============================================================================

import { motion } from 'framer-motion'

// ============================================================================
// Internal Components
// ============================================================================

import { Button } from '@/components/ui/button'

// ============================================================================
// Hooks & Utils
// ============================================================================

import { cn } from '@/lib/utils'

// ============================================================================
// Constants
// ============================================================================

const SOME_CONSTANT = 10 as const

// ============================================================================
// Types
// ============================================================================

interface ComponentProps {
  readonly prop1: string
  readonly prop2?: number
}

// ============================================================================
// Main Component
// ============================================================================

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  // ============================================================================
  // State
  // ============================================================================
  
  // ============================================================================
  // Effects
  // ============================================================================
  
  // ============================================================================
  // Handler Functions
  // ============================================================================
  
  // ============================================================================
  // Computed Values
  // ============================================================================
  
  // ============================================================================
  // Render Guards
  // ============================================================================
  
  // ============================================================================
  // Render
  // ============================================================================
  
  return <div>...</div>
}
```

### **Nomenclatura Semântica**

#### **Variáveis de Estado**
- ✅ `isLoading`, `hasError`, `shouldShow` (boolean)
- ✅ `currentUser`, `selectedItem`, `activeTab` (objetos/valores)
- ✅ `allPosts`, `filteredData`, `sortedItems` (arrays)

#### **Funções**
- ✅ `handleClick`, `handleSubmit` (event handlers)
- ✅ `loadData`, `fetchPosts` (async operations)
- ✅ `calculateTotal`, `formatDate` (pure functions)
- ✅ `startEditing`, `stopLoading` (state changers)

#### **Constantes**
- ✅ `UPPERCASE_SNAKE_CASE` para config values
- ✅ `PascalCase` para components/types
- ✅ `camelCase` para functions/variables

---

## 🎨 Design Tokens

Todos os valores de design estão centralizados em `constants/design-tokens.ts`:

### **Exemplo de Uso**

```typescript
import { 
  ANIMATION_DURATION_MS,
  SCROLL_THRESHOLDS,
  Z_INDEX,
  TYPOGRAPHY,
  GRADIENTS 
} from '@/constants/design-tokens'

// Usar tokens ao invés de valores hardcoded
const scrollThreshold = SCROLL_THRESHOLDS.BACK_TO_TOP // 300
const zIndex = Z_INDEX.NAVBAR // 50
const heading = TYPOGRAPHY.HEADING_1 // 'text-4xl sm:text-5xl...'
```

### **Benefícios**
- ✅ Single source of truth
- ✅ Fácil manutenção
- ✅ Consistência garantida
- ✅ Type-safe
- ✅ Autocomplete no IDE

---

## 🧩 Componentes

### **Hierarquia de Componentes**

```
Layout (app/layout.tsx)
├── Providers
│   ├── ThemeProvider
│   └── AuthProvider
├── Navbar (layout)
├── Main Content (pages)
│   ├── HeroSection
│   ├── AboutSection
│   ├── PortfolioShowcase
│   └── ContactSection
└── Footer (layout)
```

### **Categorias de Componentes**

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| **Layout** | Estrutura global | Navbar, Footer |
| **Pages** | Páginas de rota | HomePage, BlogPage |
| **Sections** | Seções de página | HeroSection, AboutSection |
| **UI** | Componentes base | Button, Card, Input |
| **Providers** | Context providers | ThemeProvider, AuthProvider |

---

## 🔌 Providers

### **ThemeProvider**
Gerencia tema claro/escuro global.

```typescript
import { ThemeProvider } from '@/components/providers/theme-provider'

<ThemeProvider attribute="class" defaultTheme="system">
  <App />
</ThemeProvider>
```

### **AuthProvider**
Gerencia autenticação e sessão.

```typescript
import { useAuth } from '@/components/providers/auth-provider'

function Component() {
  const { user, login, logout, isAuthenticated } = useAuth()
  // ...
}
```

---

## 🪝 Hooks Customizados

| Hook | Descrição | Uso |
|------|-----------|-----|
| `useAnalytics` | Tracking de eventos | Analytics e métricas |
| `useSmoothScroll` | Scroll acessível | Navegação suave |
| `useMobile` | Detecção mobile | Responsividade |
| `usePWA` | Features PWA | Install prompt |

---

## 🛠️ Utilitários

### **Logger**
```typescript
import { logger } from '@/lib/logger'

logger.debug('Debug info', { data })
logger.info('Info message')
logger.warn('Warning', { context })
logger.error('Error occurred', error, { context })
```

### **Analytics**
```typescript
import { analytics, ANALYTICS_EVENTS } from '@/lib/analytics'

analytics.track(ANALYTICS_EVENTS.PAGE_VIEW('/blog'))
analytics.track(ANALYTICS_EVENTS.BLOG_POST_LIKE('post-123'))
```

### **Performance Monitor**
```typescript
import { performanceMonitor } from '@/lib/performance-monitor'

performanceMonitor.start('load_data')
await loadData()
performanceMonitor.end('load_data')

// Ou
await performanceMonitor.measure('load_data', async () => {
  return await loadData()
})
```

### **Validation**
```typescript
import { validateEmail, validatePassword } from '@/lib/validation-schemas'

const emailResult = validateEmail('test@example.com')
if (!emailResult.isValid) {
  console.error(emailResult.errors)
}
```

---

## ⚡ Performance

### **Otimizações Implementadas**

1. **Code Splitting**
   - Dynamic imports para componentes pesados
   - Lazy loading de rotas
   - Suspense boundaries

2. **Image Optimization**
   - next/image para todas as imagens
   - Sizes responsivos
   - Priority em imagens above-the-fold

3. **Font Optimization**
   - next/font para fontes Google
   - Self-hosting automático
   - Display swap para evitar FOIT

4. **Component Memoization**
   - React.memo em componentes puros
   - useCallback para funções
   - useMemo para valores computados

5. **Bundle Optimization**
   - Tree shaking automático
   - CSS purging com Tailwind
   - Compressão gzip/brotli

### **Core Web Vitals Target**
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

---

## ♿ Acessibilidade

### **Padrões WCAG 2.1 AA**

1. **Semântica HTML**
   - Tags corretas (`<header>`, `<nav>`, `<main>`, `<footer>`)
   - Hierarquia de headings correta
   - Landmarks ARIA

2. **Keyboard Navigation**
   - Tab order lógico
   - Focus visible
   - Skip links

3. **Screen Readers**
   - ARIA labels descritivos
   - aria-hidden em elementos decorativos
   - Live regions para conteúdo dinâmico

4. **Contraste de Cores**
   - Mínimo 4.5:1 para texto normal
   - Mínimo 3:1 para texto grande
   - Testado em ambos os temas

5. **Motion & Animation**
   - Respeita prefers-reduced-motion
   - Animações opcionais
   - Sem seizure triggers

---

## 📊 Monitoramento

### **Analytics Events**
Todos os eventos estão em `lib/analytics.ts`:
- Page views
- User actions
- Form submissions
- Errors
- Performance metrics

### **Error Tracking**
- Error Boundary global captura erros de React
- Logger envia erros críticos para serviço
- Stack traces em desenvolvimento

### **Performance Metrics**
- Core Web Vitals automáticos
- Custom metrics via performanceMonitor
- Navigation timing

---

## 🔐 Segurança

### **Best Practices Implementadas**

1. **XSS Protection**
   - Sanitização de inputs
   - dangerouslySetInnerHTML apenas quando necessário

2. **CSRF Protection**
   - Tokens em formulários (preparado)

3. **Content Security Policy**
   - Headers configurados

4. **Environment Variables**
   - Variáveis sensíveis em .env.local
   - Nunca commitar .env

---

## 🚀 Deploy

### **Ambientes**

- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Production Start**: `npm start`

### **Variáveis de Ambiente**

```env
# App
NEXT_PUBLIC_APP_URL=https://rainersoft.com.br
NEXT_PUBLIC_APP_NAME=Rainer Soft

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
```

---

## 📚 Guias de Desenvolvimento

### **Adicionando Nova Página**

1. Criar arquivo em `app/nome-pagina/page.tsx`
2. Usar estrutura padrão de componente
3. Importar design tokens
4. Adicionar analytics tracking
5. Implementar loading states
6. Adicionar a rota em NAVIGATION

### **Criando Novo Componente**

1. Escolher categoria correta (`components/categoria/`)
2. Seguir estrutura padrão
3. Usar design tokens
4. Adicionar types com `readonly`
5. Documentar com JSDoc
6. Adicionar `aria-hidden` em elementos decorativos

### **Adicionando Feature**

1. Adicionar feature flag em `design-tokens.ts`
2. Criar tipos necessários
3. Implementar componentes
4. Adicionar analytics events
5. Adicionar validation se houver form
6. Documentar

---

## 🧪 Qualidade de Código

### **Linting**
- ESLint com regras estritas
- TypeScript em modo strict
- Prettier para formatação

### **Padrões**
- Zero erros de lint
- 100% TypeScript
- JSDoc completo
- Comentários em português

### **Performance**
- Lighthouse Score > 95
- Bundles otimizados
- Lazy loading estratégico

---

## 📞 Contato e Suporte

- **Desenvolvedor**: Rainer Teixeira
- **Email**: suporte@rainersoft.com.br
- **Website**: https://rainersoft.com.br

---

## 📄 Licença

Propriedade de Rainer Soft - Todos os direitos reservados.

---

**Última atualização**: Outubro 2025
**Versão**: 2.0.0

