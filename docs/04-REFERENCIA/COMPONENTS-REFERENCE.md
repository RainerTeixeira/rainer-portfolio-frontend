# 🧩 Referência Completa de Componentes

## 📋 Índice

1. [Layout Components](#layout-components)
2. [Home Components](#home-components)
3. [Blog Components](#blog-components)
4. [Dashboard Components](#dashboard-components)
5. [UI Components](#ui-components)
6. [Providers](#providers)
7. [Accessibility Components](#accessibility-components)
8. [Theme Components](#theme-components)

---

## 🏗️ Layout Components

### Navbar

**Arquivo**: `components/layout/navbar.tsx` (654 linhas)

**Descrição**: Header principal com navegação responsiva

**Props**: Nenhuma (self-contained)

**Features**:
- ✅ Menu desktop/mobile
- ✅ Glassmorphism on scroll
- ✅ User menu (quando autenticado)
- ✅ Tema toggle
- ✅ Active link highlight
- ✅ Smooth scroll to sections
- ✅ Mobile drawer

**State**:
- `hasScrolled` - Detecta scroll > 10px
- `isMobileMenuOpen` - Estado do menu mobile

**Utilities**:
- `getUserInitials(name)` - Extrai iniciais para avatar
- `getUserRoleLabel(role)` - Label em português do role

**Uso**:
```tsx
// Incluído automaticamente em app/layout.tsx
<Navbar />
```

---

### Footer

**Arquivo**: `components/layout/footer.tsx` (606 linhas)

**Descrição**: Rodapé com links, contato e redes sociais

**Props**: Nenhuma (self-contained)

**Features**:
- ✅ Seções organizadas (Navegação, Contato, Legal)
- ✅ Icons dinâmicos (Mail, Phone, MapPin, etc)
- ✅ Links externos (ARIA labels)
- ✅ Copyright dinâmico
- ✅ Gradientes animados

**Types**:
- `IconName` - Nome do ícone
- `ContactItemType` - Tipo de contato

**Interfaces**:
- `ContactItemProps` - Props de item de contato
- `ExternalLinkItemProps` - Props de link externo

**Utilities**:
- `getAriaLabel(type, label)` - ARIA label dinâmico

---

## 🏠 Home Components

### HeroSection

**Arquivo**: `components/home/hero-section.tsx` (300 linhas)

**Descrição**: Seção hero com carrossel e efeitos visuais

**Props**: Nenhuma

**Features**:
- ✅ Carrossel automático (6s por slide)
- ✅ 4 slides com títulos/subtítulos
- ✅ Partículas animadas (dark mode)
- ✅ Gradientes dinâmicos
- ✅ Loading state
- ✅ Responsivo

**Constants**:
- `HERO_TITLES` - 4 títulos principais
- `HERO_SUBTITLES` - 4 subtítulos
- `SLIDE_DURATION_MS` - 6000ms

**Components internos**:
- `HeroLoadingState` - Skeleton loader
- `HeroContentOverlay` - Conteúdo sobreposto

---

### AboutSection

**Arquivo**: `components/home/about-section.tsx` (314 linhas)

**Descrição**: Seção sobre mim com estatísticas profissionais

**Props**: Nenhuma

**Features**:
- ✅ Estatísticas (projetos, clientes, anos)
- ✅ Cards interativos
- ✅ Animações staggered
- ✅ Gradientes coloridos
- ✅ Link para CV

**Constants**:
- `PROFESSIONAL_STATS` - Métricas profissionais

**Types**:
- `ProfessionalMetric` - Interface de métrica

---

### PortfolioShowcase

**Arquivo**: `components/home/portfolio-showcase.tsx`

**Descrição**: Grid de projetos em destaque

**Props**: Nenhuma

**Features**:
- ✅ Grid responsivo
- ✅ Hover effects
- ✅ Tags de tecnologias
- ✅ Links para projetos

---

### Testimonials

**Arquivo**: `components/home/testimonials.tsx`

**Descrição**: Depoimentos de clientes

**Props**: Nenhuma

**Features**:
- ✅ Cards de depoimentos
- ✅ Avatars
- ✅ Rating stars
- ✅ Animações entrance

---

### TechStack

**Arquivo**: `components/home/tech-stack.tsx`

**Descrição**: Showcase de tecnologias dominadas

**Props**: Nenhuma

**Features**:
- ✅ Grid de tecnologias
- ✅ Icons coloridos
- ✅ Hover effects
- ✅ Tooltip com nome

---

### StatsShowcase

**Arquivo**: `components/home/stats-showcase.tsx`

**Descrição**: Estatísticas gerais

**Props**: Nenhuma

---

### CTASection

**Arquivo**: `components/home/cta-section.tsx`

**Descrição**: Call-to-action final

**Props**: Nenhuma

---

### NewsletterSection

**Arquivo**: `components/home/newsletter-section.tsx`

**Descrição**: Cadastro em newsletter

**Props**: Nenhuma

**Features**:
- ✅ Form validation
- ✅ Email input
- ✅ Success/error states

---

### ContactSection

**Arquivo**: `components/home/contact-section.tsx`

**Descrição**: Formulário de contato inline

**Props**: Nenhuma

---

## 📝 Blog Components

### PostCard

**Arquivo**: `components/blog/post-card.tsx`

**Props**:
```typescript
{
  readonly post: BlogPost
  readonly index?: number
}
```

**Features**:
- ✅ Cover image
- ✅ Title, description, date
- ✅ Category badge
- ✅ Views e likes
- ✅ Read time
- ✅ Hover effects

---

### ReadingProgress

**Arquivo**: `components/blog/reading-progress.tsx`

**Props**:
```typescript
{
  readonly targetRef: RefObject<HTMLElement>
}
```

**Features**:
- ✅ Barra de progresso fixa
- ✅ Calcula % de leitura
- ✅ Smooth animation

---

### TableOfContents

**Arquivo**: `components/blog/table-of-contents.tsx`

**Props**:
```typescript
{
  readonly headings: Heading[]
}
```

**Features**:
- ✅ Links para seções
- ✅ Active section highlight
- ✅ Smooth scroll
- ✅ Sticky sidebar

---

### RelatedPosts

**Arquivo**: `components/blog/related-posts.tsx`

**Props**:
```typescript
{
  readonly currentPostId: string
  readonly category: string
}
```

**Features**:
- ✅ Posts da mesma categoria
- ✅ Exclui post atual
- ✅ Máximo 3 posts

---

### AuthorCard

**Arquivo**: `components/blog/author-card.tsx`

**Props**:
```typescript
{
  readonly author: Author
}
```

---

### NewsletterBox

**Arquivo**: `components/blog/newsletter-box.tsx`

**Props**: Nenhuma

---

### Search Components

#### SearchBar

**Arquivo**: `components/blog/search/search-bar.tsx`

**Props**:
```typescript
{
  readonly onSearch: (query: string) => void
  readonly placeholder?: string
}
```

**Features**:
- ✅ Debounce (300ms)
- ✅ Clear button
- ✅ Keyboard shortcuts
- ✅ Search history

---

### Social Components

#### LikeButton

**Arquivo**: `components/blog/social/like-button.tsx`

**Props**:
```typescript
{
  readonly postId: string
  readonly initialLikes: number
}
```

**Features**:
- ✅ Optimistic update
- ✅ Animation on click
- ✅ Persiste no localStorage

#### ShareButton

**Arquivo**: `components/blog/social/share-button.tsx`

**Props**:
```typescript
{
  readonly url: string
  readonly title: string
  readonly description?: string
}
```

**Features**:
- ✅ Web Share API
- ✅ Fallback para clipboard
- ✅ QR Code modal
- ✅ Múltiplas plataformas

---

### Comment Components

#### CommentSection

**Arquivo**: `components/blog/comments/comment-section.tsx`

**Props**:
```typescript
{
  readonly postId: string
}
```

**Features**:
- ✅ Lista de comentários
- ✅ Form de novo comentário
- ✅ Reply system
- ✅ Markdown support

#### CommentItem

**Arquivo**: `components/blog/comments/comment-item.tsx`

**Props**:
```typescript
{
  readonly comment: Comment
  readonly onReply: (commentId: string) => void
}
```

---

## 📊 Dashboard Components

### Editor

**Arquivo**: `components/dashboard/Editor.tsx` (800+ linhas)

**Descrição**: Editor WYSIWYG TipTap

**Props**:
```typescript
{
  readonly content: string
  readonly onChange: (html: string) => void
  readonly onImageUpload?: (file: File) => Promise<string>
}
```

**Features**:
- ✅ Rich text editing
- ✅ Markdown shortcuts
- ✅ Code blocks com syntax highlighting
- ✅ Image upload
- ✅ Tables
- ✅ Links
- ✅ Bold, italic, lists, etc
- ✅ Bubble menu
- ✅ Slash commands

**Extensions**:
- StarterKit
- Image
- Link
- CodeBlockLowlight
- Table (row, cell, header)

---

### ImageUpload

**Arquivo**: `components/dashboard/ImageUpload.tsx`

**Props**:
```typescript
{
  readonly onUpload: (url: string) => void
  readonly currentImage?: string
  readonly type?: 'cover' | 'content'
}
```

**Features**:
- ✅ Drag and drop
- ✅ Click to select
- ✅ Preview
- ✅ Progress bar
- ✅ Upload to Cloudinary
- ✅ Image optimization

---

### AnalyticsOverview

**Arquivo**: `components/dashboard/analytics-overview.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Views chart
- ✅ Engagement chart
- ✅ Period selector
- ✅ Stats cards

---

### StatsCards

**Arquivo**: `components/dashboard/stats-cards.tsx`

**Props**:
```typescript
{
  readonly stats: DashboardStats
}
```

**Features**:
- ✅ 4 cards (Posts, Views, Likes, Comments)
- ✅ Icons coloridos
- ✅ Gradientes
- ✅ Animações

---

### RecentPostsList

**Arquivo**: `components/dashboard/recent-posts-list.tsx`

**Props**:
```typescript
{
  readonly posts: BlogPost[]
  readonly onEdit: (id: string) => void
  readonly onDelete: (id: string) => void
}
```

**Features**:
- ✅ Lista com imagens
- ✅ Status (published/draft)
- ✅ Views e likes
- ✅ Actions (edit, delete)
- ✅ Empty state

---

### QuickActions

**Arquivo**: `components/dashboard/quick-actions.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Botões de ação rápida
- ✅ Novo post
- ✅ Ver blog
- ✅ Configurações

---

### Charts Components

#### ViewsChart

**Arquivo**: `components/dashboard/charts/views-chart.tsx`

**Props**:
```typescript
{
  readonly data: ChartData[]
  readonly period: 'week' | 'month' | 'year'
}
```

**Features**:
- ✅ Line chart (Recharts)
- ✅ Responsive
- ✅ Tooltip
- ✅ Grid

---

### Login Components

#### LoginForm

**Arquivo**: `components/dashboard/login/forms/login-form.tsx`

**Props**:
```typescript
{
  readonly onSuccess: () => void
}
```

**Features**:
- ✅ Email/password fields
- ✅ Validation (React Hook Form + Zod)
- ✅ Error messages
- ✅ Loading state
- ✅ Remember me checkbox

#### RegisterForm

**Arquivo**: `components/dashboard/login/forms/register-form.tsx`

**Props**:
```typescript
{
  readonly onSuccess?: () => void
}
```

**Features**:
- ✅ Name, email, password fields
- ✅ Password strength indicator
- ✅ Confirm password
- ✅ Terms checkbox
- ✅ Validation

#### ForgotPasswordForm

**Arquivo**: `components/dashboard/login/forms/forgot-password-form.tsx`

---

#### ResetPasswordForm

**Arquivo**: `components/dashboard/login/forms/reset-password-form.tsx`

---

#### PasswordInput

**Arquivo**: `components/dashboard/login/password-input.tsx`

**Props**:
```typescript
{
  readonly value: string
  readonly onChange: (value: string) => void
  readonly showStrength?: boolean
}
```

**Features**:
- ✅ Toggle visibility
- ✅ Password strength bar
- ✅ Color-coded strength
- ✅ Requirements list

---

## 🎨 UI Components (shadcn/ui)

### Button

**Arquivo**: `components/ui/button.tsx`

**Props**:
```typescript
{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

**Uso**:
```tsx
<Button variant="default" size="lg">
  Click Me
</Button>
```

---

### Card

**Arquivo**: `components/ui/card.tsx`

**Components**:
- `Card` - Container principal
- `CardHeader` - Cabeçalho
- `CardTitle` - Título
- `CardDescription` - Descrição
- `CardContent` - Conteúdo

**Uso**:
```tsx
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

### Input

**Arquivo**: `components/ui/input.tsx`

**Props**: Standard HTMLInputElement props

**Uso**:
```tsx
<Input type="email" placeholder="seu@email.com" />
```

---

### Dialog

**Arquivo**: `components/ui/dialog.tsx`

**Components**:
- `Dialog` - Container
- `DialogTrigger` - Botão que abre
- `DialogContent` - Conteúdo do modal
- `DialogHeader` - Header
- `DialogTitle` - Título
- `DialogDescription` - Descrição
- `DialogFooter` - Footer
- `DialogClose` - Botão fechar

**Uso**:
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    Conteúdo
    <DialogFooter>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Loading States ✨ ENTERPRISE

**Arquivo**: `components/ui/loading-states.tsx`

#### FullPageLoader

**Props**:
```typescript
{
  readonly message?: string
}
```

**Uso**:
```tsx
<FullPageLoader message="Carregando dashboard..." />
```

#### InlineLoader

**Props**:
```typescript
{
  readonly message?: string
  readonly size?: 'sm' | 'md' | 'lg' | 'xl'
}
```

**Uso**:
```tsx
<InlineLoader message="Buscando posts..." size="lg" />
```

#### SkeletonGrid

**Props**:
```typescript
{
  readonly count?: number        // Default: 4
  readonly columns?: 1 | 2 | 3 | 4  // Default: 2
  readonly className?: string
}
```

**Uso**:
```tsx
<SkeletonGrid count={6} columns={3} />
```

#### EmptyState

**Props**:
```typescript
{
  readonly icon?: ComponentType
  readonly title?: string
  readonly description?: string
  readonly action?: ReactNode
}
```

**Uso**:
```tsx
<EmptyState 
  icon={FileText}
  title="Nenhum post encontrado"
  description="Crie seu primeiro post"
  action={<Button onClick={onCreate}>Criar Post</Button>}
/>
```

#### LoadingSpinner

**Props**:
```typescript
{
  readonly size?: 'sm' | 'md' | 'lg' | 'xl'
  readonly className?: string
  readonly label?: string
}
```

---

### BackToTop

**Arquivo**: `components/ui/back-to-top.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Aparece após 300px de scroll
- ✅ Smooth scroll to top
- ✅ Fixed position
- ✅ Animação fade in/out

**Export**: `BackToTopButton` (alias `BackToTop`)

---

### PageHeader

**Arquivo**: `components/ui/page-header.tsx`

**Props**:
```typescript
{
  readonly title: string
  readonly description?: string
  readonly breadcrumbs?: Breadcrumb[]
}
```

**Uso**:
```tsx
<PageHeader 
  title="Blog"
  description="Artigos sobre desenvolvimento"
/>
```

---

### ParticlesEffect

**Arquivo**: `components/ui/particles-effect.tsx`

**Props**:
```typescript
{
  readonly count?: number
  readonly variant?: 'default' | 'colorful'
  readonly positions?: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[]
}
```

**Uso**:
```tsx
<ParticlesEffect 
  count={30}
  variant="colorful"
  positions={['top-left', 'bottom-right']}
/>
```

---

### Skeleton

**Arquivo**: `components/ui/skeleton.tsx`

**Props**:
```typescript
{
  readonly className?: string
}
```

**Uso**:
```tsx
<Skeleton className="h-12 w-full" />
```

---

### Badge

**Arquivo**: `components/ui/badge.tsx`

**Props**:
```typescript
{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}
```

**Uso**:
```tsx
<Badge variant="secondary">React</Badge>
```

---

### Avatar

**Arquivo**: `components/ui/avatar.tsx`

**Components**:
- `Avatar` - Container
- `AvatarImage` - Imagem
- `AvatarFallback` - Fallback (iniciais)

**Uso**:
```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>RT</AvatarFallback>
</Avatar>
```

---

### Progress

**Arquivo**: `components/ui/progress.tsx`

**Props**:
```typescript
{
  readonly value: number // 0-100
}
```

**Uso**:
```tsx
<Progress value={75} />
```

---

### Tooltip

**Arquivo**: `components/ui/tooltip.tsx`

**Components**:
- `TooltipProvider` - Provider (wrap app)
- `Tooltip` - Container
- `TooltipTrigger` - Elemento que ativa
- `TooltipContent` - Conteúdo do tooltip

**Uso**:
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      Tooltip text
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Separator

**Arquivo**: `components/ui/separator.tsx`

**Props**:
```typescript
{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}
```

---

### Select

**Arquivo**: `components/ui/select.tsx`

**Components**: 
- `Select`
- `SelectTrigger`
- `SelectValue`
- `SelectContent`
- `SelectItem`
- `SelectGroup`
- `SelectLabel`

---

### Tabs

**Arquivo**: `components/ui/tabs.tsx`

**Components**:
- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

**Uso**:
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

### Switch

**Arquivo**: `components/ui/switch.tsx`

**Props**: Standard switch props

**Uso**:
```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

---

### Checkbox

**Arquivo**: `components/ui/checkbox.tsx`

**Props**: Standard checkbox props

---

### Textarea

**Arquivo**: `components/ui/textarea.tsx`

**Props**: Standard HTMLTextAreaElement props

---

### Label

**Arquivo**: `components/ui/label.tsx`

**Props**: Standard label props

---

### Alert

**Arquivo**: `components/ui/alert.tsx`

**Components**:
- `Alert` - Container
- `AlertTitle` - Título
- `AlertDescription` - Descrição

**Variants**: `default`, `destructive`

---

### AlertDialog

**Arquivo**: `components/ui/alert-dialog.tsx`

**Components**:
- `AlertDialog`
- `AlertDialogTrigger`
- `AlertDialogContent`
- `AlertDialogHeader`
- `AlertDialogTitle`
- `AlertDialogDescription`
- `AlertDialogFooter`
- `AlertDialogAction`
- `AlertDialogCancel`

**Uso**: Confirmações destrutivas

---

### DropdownMenu

**Arquivo**: `components/ui/dropdown-menu.tsx`

**Components**: 15+ components
- `DropdownMenu`
- `DropdownMenuTrigger`
- `DropdownMenuContent`
- `DropdownMenuItem`
- `DropdownMenuLabel`
- `DropdownMenuSeparator`
- etc

---

### Sheet

**Arquivo**: `components/ui/sheet.tsx`

**Components**:
- `Sheet` - Drawer lateral
- `SheetTrigger`
- `SheetContent`
- `SheetHeader`
- `SheetTitle`
- `SheetDescription`
- `SheetFooter`

---

### Popover

**Arquivo**: `components/ui/popover.tsx`

**Components**:
- `Popover`
- `PopoverTrigger`
- `PopoverContent`

---

### Command

**Arquivo**: `components/ui/command.tsx`

**Components**:
- `Command` - Command palette
- `CommandInput`
- `CommandList`
- `CommandEmpty`
- `CommandGroup`
- `CommandItem`
- `CommandSeparator`

**Uso**: Command menu (Cmd+K style)

---

### ScrollArea

**Arquivo**: `components/ui/scroll-area.tsx`

**Components**:
- `ScrollArea`
- `ScrollBar`

---

## 🔌 Providers

### ThemeProvider

**Arquivo**: `components/providers/theme-provider.tsx`

**Props**:
```typescript
{
  readonly children: ReactNode
  readonly attribute?: 'class' | 'data-theme'
  readonly defaultTheme?: 'light' | 'dark' | 'system'
}
```

**Uso**:
```tsx
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

**Hook**:
```typescript
import { useTheme } from 'next-themes'

const { theme, setTheme, resolvedTheme } = useTheme()
```

---

### AuthProvider

**Arquivo**: `components/providers/auth-provider.tsx`

**Props**:
```typescript
{
  readonly children: ReactNode
}
```

**Hook**:
```typescript
import { useAuth } from '@/components/providers/auth-provider'

const {
  currentUser,
  isLoadingAuth,
  isAuthenticated,
  handleLogin,
  handleLogout,
} = useAuth()
```

**Features**:
- ✅ Login/logout
- ✅ Persistência localStorage
- ✅ Loading state
- ✅ isAuthenticated helper

---

### QueryProvider

**Arquivo**: `components/providers/query-provider.tsx`

**Descrição**: TanStack Query provider

**Props**:
```typescript
{
  readonly children: ReactNode
}
```

---

### ToastProvider

**Arquivo**: `components/providers/toast-provider.tsx`

**Descrição**: Sonner toast provider

---

## ♿ Accessibility Components

### SkipToContent

**Arquivo**: `components/accessibility/skip-to-content.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Skip link (Tab para mostrar)
- ✅ Pula para #main-content
- ✅ Acessível

---

### KeyboardShortcuts

**Arquivo**: `components/accessibility/keyboard-shortcuts.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Dialog com atalhos
- ✅ Ctrl+/ para abrir
- ✅ Lista de shortcuts

---

### HighContrastToggle

**Arquivo**: `components/accessibility/high-contrast-toggle.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Toggle alto contraste
- ✅ Persiste preferência

---

### FocusTrap

**Arquivo**: `components/accessibility/focus-trap.tsx`

**Props**:
```typescript
{
  readonly children: ReactNode
  readonly enabled?: boolean
}
```

**Features**:
- ✅ Mantém foco em modal
- ✅ Tab cycling
- ✅ Escape to close

---

## 🎨 Theme Components

### ThemeToggle

**Arquivo**: `components/theme/theme-toggle.tsx`

**Props**: Nenhuma

**Features**:
- ✅ Toggle light/dark/system
- ✅ Icons dinâmicos (Sun/Moon)
- ✅ Dropdown menu
- ✅ Persiste escolha

**Uso**:
```tsx
<ThemeToggle />
```

---

## 🧩 Error Boundary ✨ ENTERPRISE

**Arquivo**: `components/error-boundary.tsx`

**Props**:
```typescript
{
  readonly children: ReactNode
  readonly fallback?: ReactNode
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void
}
```

**Features**:
- ✅ Captura erros de React
- ✅ UI de fallback profissional
- ✅ Botão retry
- ✅ Botão voltar home
- ✅ Stack trace (dev)
- ✅ Error logging

**Uso**:
```tsx
<ErrorBoundary onError={(error, info) => logger.error('Error', error, { info })}>
  <CriticalComponent />
</ErrorBoundary>
```

---

## 📦 Barrel Exports

### `@/components/ui`

**Arquivo**: `components/ui/index.ts`

**Exports**: 50+ componentes

```typescript
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Input,
  Dialog,
  FullPageLoader,
  EmptyState,
  Skeleton,
  Badge,
  Avatar,
  Progress,
  Tooltip,
  // ... todos UI components
} from '@/components/ui'
```

---

## 🎯 Padrões de Uso

### Composition Pattern

```tsx
// ✅ Componentes composable
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
</Card>
```

### Polymorphic Pattern

```tsx
// ✅ asChild para render customizado
<Button asChild>
  <Link href="/blog">
    Blog
  </Link>
</Button>
```

### Render Props

```tsx
// ✅ Children como função
<Component>
  {(state) => <div>{state.value}</div>}
</Component>
```

---

## 💡 Best Practices

### ✅ SEMPRE

1. Importar de `@/components/ui` (barrel export)
2. Usar design tokens para valores
3. Adicionar `aria-hidden` em ícones decorativos
4. Memoizar componentes pesados
5. Loading states em operações async
6. Error boundaries em componentes críticos

### ❌ NUNCA

1. Import direto de arquivos (usar barrel)
2. Hardcode valores (usar tokens)
3. Esquecer acessibilidade
4. Deixar sem loading state
5. Ignorar erros

---

## 📚 Documentação Inline

**Todos os componentes** têm JSDoc completo:

```typescript
/**
 * My Component
 * 
 * Descrição completa
 * 
 * @param {Props} props - Props do componente
 * @returns {JSX.Element} Componente renderizado
 * 
 * @example
 * ```tsx
 * <MyComponent prop="value" />
 * ```
 */
```

---

## 🔍 Como Encontrar Componente

### Por Categoria

- **Layout global**: `components/layout/`
- **Home sections**: `components/home/`
- **Blog features**: `components/blog/`
- **Dashboard admin**: `components/dashboard/`
- **UI base**: `components/ui/`
- **Providers**: `components/providers/`
- **Accessibility**: `components/accessibility/`

### Por Funcionalidade

| Funcionalidade | Componente | Localização |
|----------------|------------|-------------|
| Navegação | Navbar | `layout/navbar.tsx` |
| Footer | Footer | `layout/footer.tsx` |
| Hero | HeroSection | `home/hero-section.tsx` |
| Posts list | PostCard | `blog/post-card.tsx` |
| Editor | Editor | `dashboard/Editor.tsx` |
| Forms | Contact form | `contato/contact-form.tsx` |
| Tema | ThemeToggle | `theme/theme-toggle.tsx` |
| Loading | Loading states | `ui/loading-states.tsx` |
| Erros | ErrorBoundary | `error-boundary.tsx` |

---

## 📞 Suporte

Dúvidas sobre componentes?

- 📧 **Email**: suporte@rainersoft.com.br
- 📖 **Docs**: Ver [API Reference](./API-REFERENCE.md)
- 💬 **Code**: Inline JSDoc em cada arquivo

---

**Última atualização**: Outubro 2025
**Total de componentes**: 60+
**Documentados**: 100%

