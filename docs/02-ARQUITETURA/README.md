# 🏗️ 02-ARQUITETURA - Estrutura do Projeto

## 📋 Índice da Seção

- [Visão Arquitetural](#-visão-arquitetural)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Padrões de Código](#-padrões-de-código)
- [Separação de Responsabilidades](#-separação-de-responsabilidades)
- [Fluxo de Dados](#-fluxo-de-dados)
- [Performance](#-performance)

---

## 🎯 Visão Arquitetural

### Filosofia de Design

O projeto segue uma arquitetura **modular enterprise** com separação clara entre:

1. **Frontend (Portfolio)**: Lógica de domínio específica
2. **Bibliotecas (@rainersoft)**: Código genérico reutilizável
3. **Monorepo Local**: Dependências linkadas localmente

### Principais Decisões

```
✅ ARQUITETURA ENTERPRISE
├─ 🎨 Design System Centralizado    (@rainersoft/design-tokens)
├─ 🧩 Component Library            (@rainersoft/ui)
├─ 🔧 Utility Functions             (@rainersoft/utils)
├─ 📱 App Router (Next.js 15)       Server Components
├─ 🔐 Type-Safe Environment         Variáveis tipadas
├─ 📊 Performance First             Bundle otimizado
├─ 🧪 Test-Driven Development       Jest + Playwright
└─ 📝 Documentation-First          Docs integradas
```

---

## 📂 Estrutura de Pastas

### Raiz do Projeto

```
rainer-portfolio-frontend/
├── 📁 app/                    # Next.js App Router
├── 📁 components/             # Componentes React
├── 📁 constants/              # Constantes centralizadas
├── 📁 lib/                    # Utilitários e configurações
├── 📁 hooks/                  # Custom hooks React
├── 📁 public/                 # Assets estáticos
├── 📁 styles/                 # Estilos globais
├── 📁 tests/                  # Testes automatizados
├── 📁 scripts/                # Scripts de automação
├── 📁 docs/                   # Documentação
└── 📄 package.json            # Dependências e scripts
```

### App Router (Next.js 15)

```
app/
├── 📄 layout.tsx              # Layout raiz com providers
├── 📄 page.tsx                # Home page
├── 📄 globals.css             # Estilos globais
├── 📁 blog/                   # Blog posts
│   ├── 📄 page.tsx            # Listagem de posts
│   └── 📁 [slug]/             # Post individual
├── 📁 contato/                # Página de contato
├── 📁 dashboard/              # Área administrativa
│   ├── 📄 page.tsx            # Dashboard home
│   ├── 📁 login/              # Autenticação
│   └── 📁 settings/           # Configurações
├── 📁 sobre/                  # Sobre mim
├── 📁 cookies/                # Política de cookies
├── 📁 privacidade/            # Política de privacidade
└── 📁 termos/                 # Termos de uso
```

### Components (Separação de Domínio)

```
components/
├── 📁 domain/                 # ✅ Componentes específicos do portfolio
│   ├── 📁 home/               # Hero, serviços, portfolio
│   │   ├── 📄 hero-section.tsx
│   │   ├── 📄 services-section.tsx
│   │   └── 📄 portfolio-showcase.tsx
│   ├── 📁 sobre/              # Experiência, habilidades
│   │   ├── 📄 about-section.tsx
│   │   └── 📄 experience-timeline.tsx
│   ├── 📁 contato/            # Formulários, FAQ
│   │   ├── 📄 contact-form.tsx
│   │   └── 📄 faq-section.tsx
│   ├── 📁 blog/               # Post components
│   │   ├── 📄 post-card.tsx
│   │   └── 📄 post-content.tsx
│   └── 📁 dashboard/          # Admin components
│       ├── 📄 user-profile.tsx
│       └── 📄 analytics-card.tsx
├── 📁 layout/                 # ✅ Layout components
│   ├── 📄 navbar.tsx
│   ├── 📄 footer.tsx
│   └── 📄 app-wrapper.tsx
├── 📁 providers/              # ✅ React contexts
│   ├── 📄 auth-context-provider.tsx
│   ├── 📄 theme-provider.tsx
│   └── 📄 analytics-provider.tsx
├── 📁 icons/                  # ✅ Ícones específicos
├── 📁 cookies/                # ✅ Cookie management
└── 📁 skills/                 # ✅ Skills display
```

### Constants (Organização por Contexto)

```
constants/
├── 📁 metadata/                # ✅ Metadados e configurações
│   └── 📁 comum/               # SEO, site, navegação, social
│       ├── 📄 desenvolvedor.ts
│       ├── 📄 seo.ts
│       ├── 📄 social.ts
│       ├── 📄 navegacao.ts
│       └── 📄 site.ts
└── 📁 content/                # ✅ Conteúdo das páginas
    ├── 📁 home/
    │   ├── 📄 hero.ts
    │   ├── 📄 servicos.ts
    │   └── 📄 portfolio.ts
    ├── 📁 sobre/
    │   └── 📄 experiencia.ts
    ├── 📁 contato/
    │   ├── 📄 formulario.ts
    │   └── 📄 faq.ts
    └── 📁 blog/
        └── 📄 categorias.ts
```

### Lib (Utilitários Centralizados)

```
lib/
├── 📁 api/                    # Cliente HTTP e services
│   ├── 📁 services/           # 12 services especializados
│   ├── 📁 helpers/            # Preparação de dados
│   ├── 📁 types/              # Tipos TypeScript
│   ├── 📄 client.ts           # HTTP client
│   ├── 📄 config.ts           # Configuração
│   └── 📄 index.ts            # Barrel export
├── 📁 utils/                  # ✅ Portfolio-specific utils
├── 📁 config/                 # Configurações globais
├── 📁 metadata/               # SEO utilities
├── 📁 portfolio/              # Portfolio utilities
├── 📁 privacy/                # Cookie management
└── 📁 tracking/               # Analytics
```

---

## 🎨 Padrões de Código

### Imports Organizados

```typescript
// 1. React e Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Bibliotecas externas
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

// 3. Bibliotecas @rainersoft
import { Button, Card } from '@rainersoft/ui';
import { formatDate, validateEmail } from '@rainersoft/utils';
import { colors, tokens } from '@rainersoft/design-tokens';

// 4. Internos (relativos)
import { HeroSection } from '@/components/domain/home';
import { CONTEUDO_HERO } from '@/constants/content';
import { apiClient } from '@/lib/api';
```

### TypeScript Strict

```typescript
// ✅ Tipos explícitos
interface UserProfile {
  id: string;
  fullName: string;
  nickname: string;
  email: string;
  avatar?: string;
}

// ✅ Componentes tipados
interface HeroSectionProps {
  title: string;
  subtitle: string;
  onCTAClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  onCTAClick
}) => {
  // Component implementation
};
```

### Constantes Centralizadas

```typescript
// ✅ Sem valores hardcoded
const HeroSection = () => {
  return (
    <section>
      <h1>{CONTEUDO_HERO.titulo}</h1>
      <p>{CONTEUDO_HERO.subtitulo}</p>
      <Button onClick={handleCTA}>
        {CONTEUDO_HERO.cta.texto}
      </Button>
    </section>
  );
};
```

---

## 🔄 Separação de Responsabilidades

### Frontend (Portfolio Only)

Contém apenas lógica **específica do portfolio**:

```typescript
// ✅ Componentes de domínio
components/domain/
├── home/           # Hero, serviços específicos
├── sobre/          # Experiência pessoal
├── contato/        # Formulário de contato
├── blog/           # Posts do blog
└── dashboard/      # Admin do portfolio

// ✅ Constants de conteúdo
constants/content/
├── home/           # Textos da home
├── sobre/          # Bio e experiência
├── contato/        # FAQ e formulário
└── blog/           # Categorias e tags

// ✅ Utils específicas
lib/portfolio/      # Lógica do portfolio
lib/utils/          # Utils específicas
```

### Bibliotecas @rainersoft (Genéricas)

Contém código **reutilizável universalmente**:

```typescript
// @rainersoft/ui - Componentes genéricos
export { Button, Card, Modal, Form } from './components';
export { useIsMobile, usePWA } from './hooks';

// @rainersoft/utils - Funções puras
export { formatDate, textToSlug, validateEmail } from './exports';

// @rainersoft/design-tokens - Sistema visual
export { colors, typography, spacing } from './tokens';
```

---

## 📊 Fluxo de Dados

### Arquitetura de Dados

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Components │───▶│   React Hooks   │───▶│   API Services  │
│                 │    │                 │    │                 │
│ • domain/*      │    │ • useAuth()     │    │ • authService   │
│ • layout/*      │    │ • useTheme()    │    │ • userService   │
│ • providers/*   │    │ • useAnalytics()│    │ • blogService   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Constants     │    │   Context API   │    │   HTTP Client   │
│                 │    │                 │    │                 │
│ • content/*     │    │ • AuthContext   │    │ • Axios config  │
│ • metadata/*    │    │ • ThemeContext  │    │ • Error handling│
│ • index.ts      │    │ • AnalyticsCtx  │    │ • Response type │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### State Management

```typescript
// 1. Server State (React Query)
const { data: posts, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: blogService.getPosts
});

// 2. Client State (Context)
const { user, login, logout } = useAuth();

// 3. Form State (React Hook Form)
const { control, handleSubmit } = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema)
});

// 4. URL State (Next.js)
const router = useRouter();
const { slug } = router.query;
```

---

## ⚡ Performance

### Otimizações Implementadas

```typescript
// 1. Code Splitting (automático Next.js)
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(
  () => import('@/components/domain/dashboard'),
  { loading: () => <LoadingSpinner /> }
);

// 2. Lazy Loading de imagens
import Image from 'next/image';

<Image
  src={imageUrl}
  alt={imageAlt}
  loading="lazy"
  placeholder="blur"
/>

// 3. Bundle optimization
export const config = {
  experimental: {
    optimizePackageImports: ['@rainersoft/ui', 'framer-motion']
  }
};

// 4. Memoização de componentes
export const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* heavy rendering */}</div>;
});
```

### Métricas de Performance

```
📊 Lighthouse Score: 95+
├─ Performance:     95+
├─ Accessibility:   100
├─ Best Practices:  100
└─ SEO:             100

⚡ Core Web Vitals
├─ FCP (First Contentful Paint):  < 0.8s
├─ LCP (Largest Contentful Paint): < 2.5s
├─ FID (First Input Delay):       < 100ms
└─ CLS (Cumulative Layout Shift): < 0.1
```

---

## 🎯 Próximos Passos

1. **Componentes**: Explore [03-COMPONENTES](../03-COMPONENTES/)
2. **Constants**: Entenda [04-CONSTANTS](../04-CONSTANTS/)
3. **Bibliotecas**: Veja [05-LIBRARIES](../05-LIBRARIES/)
4. **Features**: Configure [06-FEATURES](../06-FEATURES/)

---

## 📚 Referências

- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
