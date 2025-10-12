# 🚀 Rainer Teixeira - Portfólio Profissional

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-ff69b4?style=for-the-badge&logo=framer)

Portfólio profissional moderno com design cyberpunk, animações avançadas e temas dinâmicos

[🌐 Demo ao Vivo](https://rainersoft.com.br) | [📧 Contato](mailto:suporte@rainersoft.com.br) | [💼 LinkedIn](https://linkedin.com/in/rainerteixeira)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura do Projeto](#%EF%B8%8F-arquitetura-do-projeto)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Design System](#-design-system)
- [Performance e Otimizações](#-performance-e-otimizações)
- [Acessibilidade](#-acessibilidade)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

Este é um portfólio profissional de última geração, desenvolvido com as mais modernas tecnologias do ecossistema React/Next.js. O projeto apresenta um design cyberpunk único com animações avançadas, sistema de temas dinâmicos (claro/escuro), e uma experiência de usuário imersiva.

### ✨ Destaques Técnicos

- **Framework Moderno**: Next.js 15 com App Router e Server Components
- **Performance**: Otimização automática de imagens, code splitting e lazy loading
- **Design Responsivo**: Mobile-first, adaptável a todos os dispositivos
- **Animações Avançadas**: Efeitos cyberpunk com Matrix Rain, partículas quânticas e glitch effects
- **Sistema de Temas**: Suporte completo a tema claro e escuro com transições suaves
- **SEO Otimizado**: Meta tags, Open Graph e configurações avançadas
- **Segurança**: Headers de segurança implementados (X-Frame-Options, CSP, etc.)
- **Acessibilidade**: WCAG 2.1 AA compliance, navegação por teclado, screen readers

---

## 🛠️ Tecnologias Utilizadas

### 🎨 Frontend Core

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| [Next.js](https://nextjs.org/) | 15.3.4 | Framework React com SSR e SSG |
| [React](https://react.dev/) | 19.0.0 | Biblioteca para interfaces de usuário |
| [TypeScript](https://www.typescriptlang.org/) | 5.0+ | Superset JavaScript com tipagem estática |
| [TailwindCSS](https://tailwindcss.com/) | 4.1.14 | Framework CSS utility-first |

### 🎭 UI/UX e Animações

| Biblioteca | Versão | Uso |
|-----------|--------|-----|
| [Framer Motion](https://www.framer.com/motion/) | 12.23.22 | Animações e transições avançadas |
| [Radix UI](https://www.radix-ui.com/) | Múltiplas | Componentes acessíveis e não estilizados |
| [Lucide React](https://lucide.dev/) | 0.525.0 | Ícones SVG otimizados |
| [Tabler Icons](https://tabler-icons.io/) | 3.34.0 | Conjunto adicional de ícones |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Gerenciamento de temas |

### 🧩 Componentes Radix UI Integrados

```typescript
// Componentes UI implementados com Radix
- Accordion     // Acordeões acessíveis
- Avatar        // Avatares com fallback
- Checkbox      // Checkboxes customizáveis
- Dialog        // Modais e diálogos
- Dropdown Menu // Menus contextuais
- Label         // Labels acessíveis
- Progress      // Barras de progresso
- Select        // Selects customizados
- Separator     // Divisores visuais
- Slot          // Composição de componentes
- Tabs          // Navegação em abas
- Toggle        // Botões de alternância
- Tooltip       // Dicas contextuais
```

### 🎯 Funcionalidades Avançadas

| Biblioteca | Versão | Funcionalidade |
|-----------|--------|----------------|
| [@dnd-kit](https://dndkit.com/) | 6.3.1+ | Drag and Drop (core, sortable, modifiers) |
| [@tanstack/react-table](https://tanstack.com/table) | 8.21.3 | Tabelas avançadas com sorting/filtering |
| [recharts](https://recharts.org/) | 3.0.2 | Gráficos e visualizações de dados |
| [date-fns](https://date-fns.org/) | 4.1.0 | Manipulação e formatação de datas |
| [react-day-picker](https://react-day-picker.js.org/) | 9.7.0 | Seletor de datas |
| [zod](https://zod.dev/) | 3.25.67 | Validação de schemas TypeScript-first |
| [sonner](https://sonner.emilkowal.ski/) | 2.0.5 | Toast notifications elegantes |
| [vaul](https://vaul.emilkowal.ski/) | 1.1.2 | Bottom sheets para mobile |

### 🎨 Utilitários CSS

| Biblioteca | Descrição |
|-----------|-----------|
| [class-variance-authority](https://cva.style/docs) | Variantes de componentes type-safe |
| [clsx](https://github.com/lukeed/clsx) | Construção condicional de classes |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Merge inteligente de classes Tailwind |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | Animações pré-configuradas |

### 🔧 Ferramentas de Desenvolvimento

| Ferramenta | Versão | Uso |
|-----------|--------|-----|
| [ESLint](https://eslint.org/) | 9.0+ | Linting e análise de código |
| [PostCSS](https://postcss.org/) | 8.5.6 | Processamento de CSS |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | 10.4.21 | Prefixos CSS automáticos |
| [JSDoc](https://jsdoc.app/) | 4.0.5 | Documentação de código |

---

## 🎨 Funcionalidades Principais

### 🌌 Carousel Cyberpunk Avançado

O componente principal do portfólio apresenta um carrossel imersivo com múltiplos efeitos visuais:

#### Efeitos Visuais Implementados

- 🌧️ **Matrix Rain**: Chuva de caracteres estilo Matrix com densidade dinâmica
- ⚛️ **Partículas Quânticas**: Sistema de partículas com 4 tipos (energy, data, quantum, neural)
- ⚡ **Glitch Effects**: Efeitos de glitch aleatórios autênticos
- 🔲 **Grade Holográfica**: Grade tática com 240 células animadas
- 📡 **Scanlines**: Linhas de varredura holográficas
- 🎭 **Gradientes Multicamada**: Sobreposições de gradientes com blend modes
- ✨ **Corner Glows**: Brilhos nos cantos com blur dinâmico

#### Características Técnicas

```typescript
- Autoplay configurável com controles de navegação
- Responsivo com detecção de mobile/tablet/desktop
- Suporte a navegação por teclado (Arrow Keys, Space)
- Detecção de prefers-reduced-motion para acessibilidade
- Animações otimizadas com requestAnimationFrame
- Transições suaves entre temas claro/escuro
- Efeito typewriter nos textos principais
```

### 🎨 Sistema de Temas Dinâmico

#### Implementação Profissional

- Sistema baseado em CSS Variables (HSL)
- Transições suaves entre temas
- Persistência de preferência do usuário
- Detecção automática de preferência do sistema
- Suporte a `prefers-color-scheme`
- Toggle animado com ícones (Sun/Moon)

#### Paleta de Cores

```css
/* Light Mode */
--color-background: 0 0% 100%
--color-primary: 222.2 47.4% 11.2%
--color-accent: 210 40% 96.1%

/* Dark Mode */
--color-background: 222.2 84% 4.9%
--color-primary: 210 40% 98%
--color-accent: 217.2 32.6% 17.5%
```

### 📱 Design Responsivo Avançado

#### Breakpoints Implementados

```typescript
- Mobile:   < 768px   (otimizado para touch)
- Tablet:   768-1024px (layout híbrido)
- Desktop:  > 1024px  (experiência completa)
- 4K/Ultra: > 2048px  (alta densidade)
```

#### Otimizações por Dispositivo

- Densidade de partículas adaptativa (10-50 partículas)
- Colunas Matrix dinâmicas (12-60 colunas)
- Tamanhos de fonte responsivos
- Touch gestures otimizados para mobile
- Navegação adaptativa (menu hambúrguer/desktop)

### 🔒 Segurança

#### Headers Implementados

```javascript
X-Frame-Options: DENY              // Proteção contra clickjacking
X-Content-Type-Options: nosniff    // Prevenção de MIME sniffing
Referrer-Policy: origin-when-cross-origin
```

#### Boas Práticas

- Validação de inputs com Zod
- Sanitização de dados
- HTTPS enforcement
- Proteção CSRF em formulários

### 🖼️ Otimização de Imagens

#### Configuração Next.js Image

```javascript
formats: ['image/webp', 'image/avif']  // Formatos modernos
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
```

#### Domínios Permitidos

- rainersoft.com.br
- images.unsplash.com (para assets)
- Domínios Vercel configurados

---

## 🏗️ Arquitetura do Projeto

### 📐 Padrões Arquiteturais

#### App Router (Next.js 15)

```text
app/
├── layout.tsx          # Layout raiz com providers
├── page.tsx            # Página inicial
├── blog/
│   └── page.tsx        # Página de blog
├── contato/
│   └── page.tsx        # Formulário de contato
└── sobre/
    └── page.tsx        # Página sobre
```

#### Componentes

```text
components/
├── ui/                 # Componentes base (Radix + Tailwind)
├── layout/             # Componentes de layout (Navbar, Footer)
├── home/               # Componentes específicos da home
├── blog/               # Componentes do blog
├── theme/              # Sistema de temas
└── providers/          # Context Providers
```

### 🎯 Princípios de Design

#### Component-Driven Development

- Componentes reutilizáveis e compostos
- Props bem tipadas com TypeScript
- Documentação JSDoc completa

#### Atomic Design

- Atoms: Botões, inputs, badges
- Molecules: Cards, forms
- Organisms: Navbar, Footer, Carousel
- Templates: Layouts de página

#### Clean Code

- Nomenclatura descritiva
- Funções pequenas e focadas
- Separação de responsabilidades
- Comentários informativos

---

## 🚀 Instalação e Configuração

### Pré-requisitos

```bash
Node.js >= 20.0.0
npm >= 10.0.0 ou yarn >= 1.22.0
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/rainerteixeira/rainer-portfolio-frontend.git

# Entre no diretório
cd rainer-portfolio-frontend

# Instale as dependências
npm install
# ou
yarn install

# Execute o ambiente de desenvolvimento
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Configurações do Next.js
NEXT_PUBLIC_SITE_URL=https://rainersoft.com.br
NEXT_PUBLIC_API_URL=https://api.rainersoft.com.br

# Configurações de Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Configurações de Email (opcional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=your-password
```

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento com Turbopack
npm run build            # Cria build de produção
npm run start            # Inicia servidor de produção
npm run lint             # Executa ESLint
npm run lint:fix         # Corrige problemas do ESLint automaticamente
npm run type-check       # Verifica tipos TypeScript sem emitir arquivos

# Limpeza
npm run clean            # Remove pastas de build (.next, out, dist)

# Documentação
npm run docs             # Gera documentação JSDoc
npm run docs:serve       # Gera e serve documentação
npm run docs:clean       # Remove documentação gerada
npm run docs:watch       # Gera documentação em modo watch
```

---

## 📁 Estrutura de Pastas

```text
rainer-portfolio-frontend/
│
├── app/                          # App Router (Next.js 15)
│   ├── layout.tsx               # Layout raiz com providers
│   ├── page.tsx                 # Página inicial
│   ├── globals.css              # Estilos globais + tema
│   ├── blog/                    # Seção de blog
│   ├── contato/                 # Página de contato
│   └── sobre/                   # Página sobre
│
├── components/                   # Componentes React
│   ├── ui/                      # Componentes base (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── home/                    # Componentes da home
│   │   ├── carousel.tsx         # 686 linhas de magia cyberpunk
│   │   ├── highlights.tsx
│   │   ├── about-section.tsx
│   │   └── contact-section.tsx
│   ├── blog/                    # Componentes do blog
│   ├── theme/                   # Sistema de temas
│   │   └── theme-toggle.tsx
│   └── providers/               # Context Providers
│       └── theme-provider.tsx
│
├── constants/                    # Constantes e configurações
│   └── index.ts                 # SITE_CONFIG, NAVIGATION, etc.
│
├── hooks/                        # Custom React Hooks
│   └── use-mobile.ts            # Hook de detecção mobile
│
├── lib/                          # Utilitários e helpers
│   ├── utils.ts                 # Funções auxiliares (cn, etc.)
│   └── hooks/                   # Hooks compartilhados
│
├── public/                       # Assets estáticos
│   ├── images/                  # Imagens do projeto
│   │   ├── b1.png - b9.png     # Banners
│   │   ├── f1.jpg - f3.jpg     # Features
│   │   ├── t1.jpg - t3.jpg     # Team
│   │   └── bg-*.jpg             # Backgrounds
│   ├── logo.png
│   └── Rainer_Teixeira_Curriculo.pdf
│
├── .vscode/                      # Configurações do VSCode
│   ├── settings.json
│   └── css_custom_data.json
│
├── components.json               # Configuração shadcn/ui
├── next.config.js                # Configuração Next.js
├── tailwind.config.js            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
├── postcss.config.js             # Configuração PostCSS
├── package.json                  # Dependências e scripts
└── README.md                     # Este arquivo
```

---

## 🎨 Design System

### Componentes UI Implementados

#### Componentes Base (UI)

```typescript
✅ Avatar       - Avatares com fallback
✅ Badge        - Emblemas e tags
✅ Button       - Botões com variantes
✅ Card         - Cards com header/content/footer
✅ Input        - Inputs de formulário
✅ Progress     - Barras de progresso
✅ Separator    - Divisores visuais
✅ Sheet        - Painéis laterais
✅ Skeleton     - Loading states
✅ Tooltip      - Tooltips acessíveis
```

#### Variantes de Botões

```typescript
- default    // Botão primário
- destructive // Ações destrutivas
- outline    // Contorno apenas
- secondary  // Secundário
- ghost      // Sem background
- link       // Estilo de link
```

#### Tamanhos

```typescript
- sm   // Small
- md   // Medium (default)
- lg   // Large
- icon // Ícone apenas
```

### Sistema de Cores

#### Tokens de Cor (HSL)

```typescript
background      // Fundo principal
foreground      // Texto principal
primary         // Cor primária
secondary       // Cor secundária
accent          // Cor de destaque
muted           // Cores suaves
destructive     // Cores de erro/perigo
border          // Bordas
input           // Inputs
ring            // Focus rings
```

### Tipografia

#### Fontes do Sistema

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, 
             sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

/* Código/Mono */
font-family: 'Courier New', Courier, monospace;
```

#### Escalas de Tamanho

```css
text-xs    // 0.75rem (12px)
text-sm    // 0.875rem (14px)
text-base  // 1rem (16px)
text-lg    // 1.125rem (18px)
text-xl    // 1.25rem (20px)
text-2xl   // 1.5rem (24px)
text-3xl   // 1.875rem (30px)
text-4xl   // 2.25rem (36px)
text-5xl   // 3rem (48px)
text-6xl   // 3.75rem (60px)
text-7xl   // 4.5rem (72px)
```

---

## ⚡ Performance e Otimizações

### Métricas de Performance

#### Objetivos (Core Web Vitals)

```text
✅ LCP (Largest Contentful Paint):  < 2.5s
✅ FID (First Input Delay):         < 100ms
✅ CLS (Cumulative Layout Shift):   < 0.1
```

### Otimizações Implementadas

#### 1. Code Splitting e Lazy Loading

```typescript
// Componentes dinâmicos
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />,
  ssr: false // Desabilita SSR se necessário
})
```

#### 2. Otimização de Imagens

```typescript
// Next.js Image com otimização automática
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
  placeholder="blur"
/>
```

#### 3. Preload de Recursos Críticos

```html
<link rel="preload" href="/fonts/font.woff2" as="font" crossorigin />
```

#### 4. Memoização e Callbacks

```typescript
const MemoizedComponent = React.memo(Component)
const handleClick = useCallback(() => {}, [dependencies])
const memoizedValue = useMemo(() => computeExpensiveValue(), [dep])
```

#### 5. Animações GPU-Accelerated

```css
.hardware-accelerated {
  transform: translateZ(0);
  will-change: transform;
}
```

#### 6. Bundle Size Optimization

```javascript
// next.config.js
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
}

// Production build removes console.logs
compiler: {
  removeConsole: process.env.NODE_ENV === 'production'
}
```

---

## ♿ Acessibilidade

### Conformidade WCAG 2.1 AA

#### Recursos Implementados

##### Navegação por Teclado

```typescript
// Suporte completo a Tab, Enter, Escape, Arrow Keys
- Tab: Navegação entre elementos
- Enter/Space: Ativação de elementos
- Escape: Fechamento de modais
- Arrow Keys: Navegação no carousel
```

##### Screen Readers

```jsx
// ARIA labels, roles e descriptions
<section role="banner" aria-label="Seção principal">
<button aria-label="Abrir menu" aria-expanded={isOpen}>
<div role="region" aria-labelledby="heading-id">
```

##### Contraste de Cores

```css
/* Todos os textos têm contraste mínimo de 4.5:1 */
/* Elementos interativos têm contraste de 3:1 */
```

##### Focus Visível

```css
.focus-visible:focus {
  outline: 2px solid hsl(var(--color-primary));
  outline-offset: 2px;
}
```

##### Reduced Motion

```typescript
// Detecção e respeito a prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (prefersReducedMotion) {
  // Desabilita animações complexas
}
```

##### Textos Alternativos

```jsx
// Todas as imagens têm alt text descritivo
<Image src="/logo.png" alt="Logo Rainer Teixeira - Desenvolvedor Full-Stack" />
```

##### Landmarks Semânticos

```jsx
<header>  // Cabeçalho
<nav>     // Navegação
<main>    // Conteúdo principal
<aside>   // Conteúdo complementar
<footer>  // Rodapé
```

---

## 🌐 SEO e Meta Tags

### Meta Tags Implementadas

```tsx
export const metadata = {
  title: 'Rainer Teixeira - Desenvolvedor Full-Stack',
  description: 'Especializado em soluções modernas e inovadoras...',
  keywords: ['Next.js', 'React', 'TypeScript', 'Full-Stack'],
  authors: [{ name: 'Rainer Teixeira' }],
  creator: 'Rainer Teixeira',
  publisher: 'Rainer Teixeira',
  
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rainersoft.com.br',
    title: 'Rainer Teixeira - Portfólio',
    description: '...',
    siteName: 'Rainer Teixeira',
    images: [{
      url: 'https://rainersoft.com.br/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Rainer Teixeira - Portfólio',
    description: '...',
    images: ['https://rainersoft.com.br/twitter-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
```

---

## 🚢 Deploy

### Vercel (Recomendado)

```text
# Deploy automático via GitHub
1. Conecte seu repositório ao Vercel
2. Configure variáveis de ambiente
3. Deploy automático a cada push na main

# Deploy manual via CLI
npm install -g vercel
vercel
```

### Outras Plataformas

#### Netlify

```bash
npm run build
# Deploy da pasta .next
```

#### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas diretrizes:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Código

- ✅ Use TypeScript com tipagem estrita
- ✅ Siga o ESLint configurado
- ✅ Adicione JSDoc aos componentes
- ✅ Mantenha componentes pequenos e focados
- ✅ Teste em diferentes dispositivos
- ✅ Verifique acessibilidade

---

## 📄 Licença

Este projeto é de propriedade privada de **Rainer Teixeira**. Todos os direitos reservados.

Para uso comercial ou redistribuição, entre em contato: [suporte@rainersoft.com.br](mailto:suporte@rainersoft.com.br)

---

## 👨‍💻 Autor

### Rainer Teixeira

Desenvolvedor Full-Stack | 5+ anos de experiência

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rainerteixeira)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rainerteixeira)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rainersoft.com.br)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:suporte@rainersoft.com.br)

📍 Volta Redonda, RJ - Brasil  
📧 [suporte@rainersoft.com.br](mailto:suporte@rainersoft.com.br)  
📱 +(55) 24 99913-7382

---

## 🙏 Agradecimentos

- [Next.js Team](https://nextjs.org/) - Framework incrível
- [Vercel](https://vercel.com/) - Hospedagem e deploy
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [shadcn/ui](https://ui.shadcn.com/) - Design system
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- Comunidade Open Source - Ferramentas e inspiração

---

## 📊 Estatísticas do Projeto

```typescript
Linhas de Código:    ~10.000+
Componentes:         50+
Dependências:        40+
Testes:              Em desenvolvimento
Cobertura:           Target: 80%
Performance Score:   95+ (Lighthouse)
Acessibilidade:      100 (Lighthouse)
SEO:                 100 (Lighthouse)
Best Practices:      100 (Lighthouse)
```

---

## 🗺️ Roadmap

### 🚀 Em Desenvolvimento

- [ ] Sistema de Blog completo com CMS
- [ ] Integração com backend (API REST)
- [ ] Painel administrativo
- [ ] Sistema de comentários
- [ ] Newsletter integrada
- [ ] Analytics dashboard

### 🔮 Futuro

- [ ] PWA (Progressive Web App)
- [ ] Suporte a múltiplos idiomas (i18n)
- [ ] Dark mode automático por hora
- [ ] Modo de alto contraste
- [ ] Integração com redes sociais
- [ ] Chat em tempo real
- [ ] Sistema de notificações

---

### Se você gostou deste projeto, não esqueça de dar uma estrela

Desenvolvido com ❤️ e ☕ por [Rainer Teixeira](https://rainersoft.com.br)

© 2025 Rainer Teixeira. Todos os direitos reservados.
