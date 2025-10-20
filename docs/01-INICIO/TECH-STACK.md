# 🛠️ Stack Tecnológico Completo - Rainer Portfolio Frontend

## 📚 Índice

1. [Framework & Core](#framework--core)
2. [UI & Styling](#ui--styling)
3. [Forms & Validation](#forms--validation)
4. [Data Management](#data-management)
5. [Rich Text Editor](#rich-text-editor)
6. [Cloud Services](#cloud-services)
7. [Developer Tools](#developer-tools)
8. [PWA & Offline](#pwa--offline)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Versões e Compatibilidade](#versões-e-compatibilidade)

---

## 🎯 Framework & Core

### Next.js 15.5.5

**Por que Next.js?**
- ✅ SSR (Server-Side Rendering) para SEO
- ✅ SSG (Static Site Generation) para performance
- ✅ App Router (nova arquitetura)
- ✅ Image Optimization automático
- ✅ Font Optimization
- ✅ API Routes integradas
- ✅ Middleware support

**Configuração**: `next.config.js`

```javascript
// Features habilitadas
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
},
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920]
}
```

**Documentação**: https://nextjs.org/docs

---

### React 19.0.0

**Novidades do React 19:**
- ✅ Server Components estáveis
- ✅ Server Actions
- ✅ Async Components
- ✅ useOptimistic hook
- ✅ useFormStatus hook
- ✅ Performance improvements

**Uso no projeto**:
- `'use client'` em componentes interativos
- Server Components para SEO
- Hooks modernos (useOptimistic, useTransition)

**Documentação**: https://react.dev/

---

### TypeScript 5.x

**Configuração Strict**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Padrões implementados:**
- ✅ Interfaces com `readonly`
- ✅ Type guards
- ✅ Utility types
- ✅ Generic types
- ✅ `as const` para literais
- ✅ 100% coverage

**Documentação**: https://www.typescriptlang.org/docs/

---

## 🎨 UI & Styling

### Tailwind CSS 4.1.14

**Por que Tailwind?**
- ✅ Utility-first approach
- ✅ Purge CSS automático
- ✅ Dark mode integrado
- ✅ Customização completa
- ✅ Intellisense no VS Code

**Configuração**: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))"
    },
    animation: {
      'gradient': 'gradient 15s ease infinite',
      'float': 'float 6s ease-in-out infinite'
    }
  }
}
```

**Plugins**:
- `@tailwindcss/typography` - Estilos para blog
- `tailwindcss-animate` - Animações predefinidas
- `tw-animate-css` - Mais animações

**Documentação**: https://tailwindcss.com/docs

---

### Framer Motion 12.23.22

**Animações implementadas:**
- ✅ Page transitions
- ✅ Scroll animations
- ✅ Hover effects
- ✅ Variants
- ✅ Exit animations
- ✅ Stagger children

**Exemplo de uso**:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

**Onde é usado**:
- Hero section animations
- Card hover effects
- Page transitions
- Scroll reveal
- Button interactions

**Documentação**: https://www.framer.com/motion/

---

### Radix UI (Múltiplos pacotes)

**Componentes instalados (20+):**

| Componente | Pacote | Versão |
|------------|--------|--------|
| Accordion | `@radix-ui/react-accordion` | 1.2.12 |
| Alert Dialog | `@radix-ui/react-alert-dialog` | 1.1.15 |
| Avatar | `@radix-ui/react-avatar` | 1.1.10 |
| Checkbox | `@radix-ui/react-checkbox` | 1.3.2 |
| Dialog | `@radix-ui/react-dialog` | 1.1.15 |
| Dropdown | `@radix-ui/react-dropdown-menu` | 2.1.15 |
| Label | `@radix-ui/react-label` | 2.1.7 |
| Popover | `@radix-ui/react-popover` | 1.1.15 |
| Progress | `@radix-ui/react-progress` | 1.1.7 |
| Scroll Area | `@radix-ui/react-scroll-area` | 1.2.10 |
| Select | `@radix-ui/react-select` | 2.2.5 |
| Separator | `@radix-ui/react-separator` | 1.1.7 |
| Slot | `@radix-ui/react-slot` | 1.2.3 |
| Switch | `@radix-ui/react-switch` | 1.2.6 |
| Tabs | `@radix-ui/react-tabs` | 1.1.12 |
| Toggle | `@radix-ui/react-toggle` | 1.1.9 |
| Tooltip | `@radix-ui/react-tooltip` | 1.2.8 |

**Por que Radix UI?**
- ✅ Acessibilidade built-in (ARIA)
- ✅ Headless (customização total)
- ✅ Unstyled (usa Tailwind)
- ✅ Keyboard navigation
- ✅ Focus management

**Documentação**: https://www.radix-ui.com/

---

### Lucide React 0.525.0

**Sistema de ícones moderno:**
- ✅ 1.400+ ícones
- ✅ Tree-shakeable
- ✅ Customizáveis
- ✅ Consistentes
- ✅ Leves (SVG)

**Exemplo**:

```typescript
import { Home, User, Settings } from 'lucide-react'

<Home className="h-5 w-5" />
```

**Documentação**: https://lucide.dev/

---

### next-themes 0.4.6

**Gerenciamento de temas:**
- ✅ Light/Dark/System
- ✅ Persistência localStorage
- ✅ Zero flash
- ✅ Hook useTheme()
- ✅ CSS variables

**Implementação**:

```typescript
// Provider
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>

// Hook
const { theme, setTheme } = useTheme()
```

**Documentação**: https://github.com/pacocoursey/next-themes

---

## 📝 Forms & Validation

### React Hook Form 7.65.0

**Gerenciamento de formulários:**
- ✅ Performance otimizada
- ✅ Validação integrada
- ✅ Error handling
- ✅ TypeScript support
- ✅ Uncontrolled components

**Exemplo**:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm()

<input {...register('email', { required: true })} />
```

**Onde é usado**:
- Formulário de contato
- Formulários de login/registro
- Editor de posts
- Newsletter

**Documentação**: https://react-hook-form.com/

---

### Zod 3.25.76

**Schema validation:**
- ✅ Type-safe schemas
- ✅ Runtime validation
- ✅ Error messages customizados
- ✅ Composition de schemas
- ✅ Transform e refine

**Exemplo**:

```typescript
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres')
})
```

**Integração**: React Hook Form + Zod via `@hookform/resolvers`

**Documentação**: https://zod.dev/

---

## 💾 Data Management

### TanStack Query 5.90.3

**React Query para data fetching:**
- ✅ Cache automático
- ✅ Background refetch
- ✅ Optimistic updates
- ✅ Pagination
- ✅ Infinite scroll
- ✅ DevTools

**Exemplo**:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts
})
```

**Onde é usado**:
- Listagem de posts
- Dashboard analytics
- Fetch de dados
- Mutations (CRUD)

**Documentação**: https://tanstack.com/query/

---

### TanStack Table 8.21.3

**Tabelas avançadas:**
- ✅ Sorting
- ✅ Filtering
- ✅ Pagination
- ✅ Row selection
- ✅ Virtualization
- ✅ Responsive

**Onde é usado**:
- Dashboard (lista de posts)
- Analytics tables

**Documentação**: https://tanstack.com/table/

---

## ✏️ Rich Text Editor

### TipTap 3.6.6

**Editor WYSIWYG modular:**

**Extensões instaladas:**

| Extensão | Propósito |
|----------|-----------|
| `starter-kit` | Funcionalidades básicas |
| `code-block-lowlight` | Syntax highlighting |
| `image` | Upload de imagens |
| `link` | Links editáveis |
| `table` | Tabelas |
| `table-row` | Linhas de tabela |
| `table-cell` | Células de tabela |
| `table-header` | Cabeçalhos |

**Features**:
- ✅ Markdown shortcuts
- ✅ Slash commands
- ✅ Bubble menu
- ✅ Floating menu
- ✅ Code highlighting
- ✅ Image upload
- ✅ Tables

**Exemplo**:

```typescript
const editor = useEditor({
  extensions: [StarterKit, Image, Link, Table],
  content: '<p>Hello World!</p>'
})
```

**Documentação**: https://tiptap.dev/

---

### Lowlight 3.3.0 + Highlight.js 11.11.1

**Syntax highlighting:**
- ✅ 190+ linguagens
- ✅ Themes customizáveis
- ✅ Auto-detection
- ✅ Line numbers

**Integração**: TipTap CodeBlock

**Documentação**: 
- https://highlightjs.org/
- https://github.com/wooorm/lowlight

---

## ☁️ Cloud Services

### Cloudinary 2.7.0

**Upload e otimização de imagens:**

**Features usadas:**
- ✅ Upload direto do browser
- ✅ Transformações on-the-fly
- ✅ Responsive images
- ✅ Format auto (WebP/AVIF)
- ✅ Quality optimization
- ✅ CDN global

**Implementação**: `lib/cloudinary.ts`

```typescript
await cloudinary.uploader.upload(file, {
  folder: 'blog-covers',
  transformation: [
    { width: 1200, height: 630, crop: 'fill' },
    { quality: 'auto', fetch_format: 'auto' }
  ]
})
```

**Documentação**: https://cloudinary.com/documentation

---

### Vercel Analytics 1.5.0

**Web analytics privacy-first:**
- ✅ Zero cookies
- ✅ GDPR compliant
- ✅ Real-time
- ✅ Core Web Vitals
- ✅ Page views
- ✅ Unique visitors

**Implementação**:

```typescript
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

**Documentação**: https://vercel.com/docs/analytics

---

### Vercel Speed Insights 1.2.0

**Performance monitoring:**
- ✅ Real User Monitoring
- ✅ Core Web Vitals
- ✅ Time to Interactive
- ✅ First Contentful Paint
- ✅ Geographic data

**Implementação**:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/react'

<SpeedInsights />
```

**Documentação**: https://vercel.com/docs/speed-insights

---

## 🧰 Developer Tools

### ESLint 9.x

**Configuração**: `.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ]
}
```

**Rules ativas:**
- ✅ `@typescript-eslint/no-unused-vars`
- ✅ `@typescript-eslint/no-explicit-any`
- ✅ `react-hooks/rules-of-hooks`
- ✅ `react-hooks/exhaustive-deps`
- ✅ `@next/next/no-img-element`

**Plugins**:
- `eslint-config-next` - Rules Next.js
- `eslint-config-prettier` - Integração Prettier
- `eslint-plugin-prettier` - Prettier como rule

---

### Prettier 3.6.2

**Configuração**: `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

**Scripts**:
- `npm run format` - Formata todos arquivos
- `npm run format:check` - Verifica formatação

---

### JSDoc 4.0.5

**Documentação automática:**
- ✅ TypeScript support
- ✅ Markdown output
- ✅ Customizable templates
- ✅ Portuguese comments

**Configuração**: `jsdoc.config.json`

**Scripts**:
- `npm run docs` - Gera documentação
- `npm run docs:serve` - Serve docs local
- `npm run docs:watch` - Watch mode

---

### SonarQube

**Análise de qualidade:**
- ✅ Code smells
- ✅ Bugs
- ✅ Vulnerabilities
- ✅ Coverage
- ✅ Duplications
- ✅ Security hotspots

**Docker**: `sonarqube/docker-compose.sonarqube.yml`

**Scripts**:
- `npm run sonar` - Análise cloud
- `npm run sonar:local` - Análise local

**Documentação**: Ver `/sonarqube/docs/`

---

## 📲 PWA & Offline

### Service Worker

**Arquivo**: `public/sw.js`

**Estratégias de cache:**
- ✅ Cache-first para assets
- ✅ Network-first para APIs
- ✅ Stale-while-revalidate para páginas
- ✅ Offline fallback

**Features**:
- ✅ Precache de rotas críticas
- ✅ Runtime caching
- ✅ Background sync (futuro)
- ✅ Push notifications (futuro)

---

### Manifest.json

**Arquivo**: `public/manifest.json`

**Configuração completa:**

```json
{
  "name": "Rainer Soft - Empresa de Desenvolvimento",
  "short_name": "RainerSoft",
  "description": "Empresa de Desenvolvimento Full-Stack",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#000000",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-192-maskable.png", "sizes": "192x192", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "Blog", "url": "/blog?source=shortcut" },
    { "name": "Contato", "url": "/contato?source=shortcut" },
    { "name": "Dashboard", "url": "/dashboard?source=shortcut" }
  ],
  "share_target": {
    "action": "/contato",
    "params": { "title": "title", "text": "text", "url": "url" }
  }
}
```

---

## 📊 Monitoring & Analytics

### Sistema de Analytics Customizado

**Arquivo**: `lib/analytics.ts`

**Features**:
- ✅ Type-safe events
- ✅ 15+ eventos predefinidos
- ✅ Custom event tracking
- ✅ Integration ready (GA4, Plausible)
- ✅ Privacy-first

**Eventos rastreados**:
- Page views
- Blog interactions (likes, views)
- Form submissions
- Download CV
- Theme toggle
- External links

---

### Performance Monitor

**Arquivo**: `lib/performance-monitor.ts`

**Core Web Vitals:**
- ✅ LCP tracking
- ✅ FID tracking
- ✅ CLS tracking
- ✅ FCP tracking
- ✅ TTFB tracking

**Custom metrics:**
- API response time
- Component render time
- Data fetch time

**Dependência**: `web-vitals` (dynamic import)

---

### Logger System

**Arquivo**: `lib/logger.ts`

**4 níveis**:
- `logger.debug()` - Desenvolvimento
- `logger.info()` - Informações
- `logger.warn()` - Avisos
- `logger.error()` - Erros

**Features**:
- ✅ Timestamps
- ✅ Contexto estruturado
- ✅ Colorização
- ✅ Logger contextual

---

## 🔧 Utilities & Helpers

### Class Variance Authority 0.7.1

**Variants para componentes:**

```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive"
    },
    size: {
      sm: "h-9 px-3",
      lg: "h-11 px-8"
    }
  }
})
```

**Usado em**: Button, Badge, Alert

---

### clsx 2.1.1 + tailwind-merge 3.3.1

**Merge de classes Tailwind:**

```typescript
import { cn } from '@/lib/utils'

cn("px-2 py-1", "px-3") // Resultado: "py-1 px-3"
```

**Função `cn()`**: Combina clsx + twMerge

---

### date-fns 4.1.0

**Manipulação de datas:**
- ✅ Format
- ✅ Parse
- ✅ Diff
- ✅ Locale pt-BR
- ✅ Tree-shakeable

**Exemplo**:

```typescript
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
// "15 de outubro de 2025"
```

---

## 🎮 Additional Libraries

### Charts - Recharts 3.0.2

**Gráficos interativos:**
- ✅ Line charts
- ✅ Bar charts
- ✅ Area charts
- ✅ Pie charts
- ✅ Responsive
- ✅ Animated

**Onde é usado**:
- Dashboard analytics
- Views chart
- Engagement chart

**Documentação**: https://recharts.org/

---

### Notifications - Sonner 2.0.5

**Toast notifications:**
- ✅ Promise toasts
- ✅ Loading states
- ✅ Success/Error
- ✅ Customizable
- ✅ Accessible

**Exemplo**:

```typescript
import { toast } from 'sonner'

toast.success('Post criado!')
toast.error('Falha ao salvar')
toast.promise(savePost(), {
  loading: 'Salvando...',
  success: 'Salvo!',
  error: 'Erro!'
})
```

**Documentação**: https://sonner.emilkowal.ski/

---

### Drag & Drop - DnD Kit 6.3.1

**Sistema de drag and drop:**
- ✅ Acessível
- ✅ Touch support
- ✅ Sortable lists
- ✅ Multiple containers
- ✅ Custom sensors

**Pacotes**:
- `@dnd-kit/core` - Core functionality
- `@dnd-kit/sortable` - Sortable lists
- `@dnd-kit/modifiers` - Snap to grid, etc
- `@dnd-kit/utilities` - Helpers

**Documentação**: https://dndkit.com/

---

### Command Palette - cmdk 1.1.1

**Command menu (Cmd+K):**
- ✅ Fuzzy search
- ✅ Keyboard shortcuts
- ✅ Nested commands
- ✅ Customizable

**Onde é usado**:
- Dashboard command menu
- Quick navigation

**Documentação**: https://cmdk.paco.me/

---

## 🔐 Segurança

### Headers de Segurança

**Configurado em**: `next.config.js`

```javascript
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY'  // Previne clickjacking
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'  // Previne MIME sniffing
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

---

## 📏 Versões e Compatibilidade

### Node.js

**Versão requerida**: 18.x ou superior
**Versão recomendada**: 20.x LTS

**Verificar versão**:
```bash
node --version  # v20.x.x
npm --version   # 10.x.x
```

### Browsers Suportados

| Browser | Versão Mínima | Status |
|---------|---------------|--------|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |
| iOS Safari | 14+ | ✅ PWA |
| Chrome Android | 90+ | ✅ PWA |

---

## 🎁 Dependências Completas

### Production (50+ pacotes)

**Categorias**:
- 17 pacotes Radix UI (componentes)
- 8 pacotes TipTap (editor)
- 6 pacotes DnD Kit (drag and drop)
- 4 pacotes TanStack (query, table)
- 15+ pacotes utilitários

**Total instalado**: ~500MB (node_modules)
**Bundle final**: ~200KB (gzipped)

### Development (15 pacotes)

**Dev-only**:
- Type definitions (@types/*)
- Linters (ESLint plugins)
- Formatters (Prettier)
- Documentation (JSDoc)

---

## 🔄 Update Strategy

### Dependências Críticas (Atualizar com cuidado)

- `next` - Ler migration guide
- `react` / `react-dom` - Verificar breaking changes
- `tailwindcss` - Revisar changelog
- `typescript` - Testar types

### Dependências Seguras (Atualizar livremente)

- `lucide-react` - Apenas ícones
- `date-fns` - Utility pure
- `clsx` - Utility simple

### Comando de Atualização

```bash
# Verificar updates disponíveis
npm outdated

# Atualizar patches e minors
npm update

# Atualizar majors (com cuidado)
npm install package@latest

# Verificar tudo funciona
npm run build
npm run type-check
npm run lint
```

---

## 📚 Recursos de Aprendizado

### Documentação Oficial

| Tecnologia | Link |
|------------|------|
| Next.js | https://nextjs.org/docs |
| React | https://react.dev/ |
| TypeScript | https://www.typescriptlang.org/docs/ |
| Tailwind | https://tailwindcss.com/docs |
| Framer Motion | https://www.framer.com/motion/ |
| TanStack Query | https://tanstack.com/query/ |
| Radix UI | https://www.radix-ui.com/ |
| TipTap | https://tiptap.dev/ |

### Tutoriais Recomendados

- **Next.js 15**: https://nextjs.org/learn
- **React 19**: https://react.dev/learn
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **Tailwind Play**: https://play.tailwindcss.com/
- **Framer Motion Examples**: https://www.framer.com/motion/examples/

---

## 💡 Por Que Este Stack?

### Decisões Técnicas

| Escolha | Alternativa | Razão da Escolha |
|---------|-------------|------------------|
| **Next.js** | Remix, Gatsby | Melhor DX, maior comunidade, Vercel integration |
| **Tailwind** | Styled Components, CSS Modules | Utility-first, menor bundle, melhor DX |
| **Radix UI** | Material-UI, Ant Design | Headless, acessível, customizável |
| **TanStack Query** | SWR, Apollo Client | Features completas, DevTools |
| **TipTap** | Quill, Slate | Modular, TypeScript, Markdown |
| **Zod** | Yup, Joi | Type inference, melhor DX |
| **Framer Motion** | React Spring, GSAP | Declarativo, fácil de usar |

---

## 🎯 Conclusão

Stack escolhido para:
- ✅ **Performance**: Server components, code splitting
- ✅ **Developer Experience**: TypeScript, hot reload, autocomplete
- ✅ **Maintainability**: Modular, documented, tested
- ✅ **Scalability**: Enterprise patterns
- ✅ **Accessibility**: Built-in support
- ✅ **SEO**: SSR, metadata
- ✅ **Modern**: Latest versions

---

**Última atualização**: Outubro 2025
**Versão do documento**: 1.0.0

