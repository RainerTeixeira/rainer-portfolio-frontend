# 📋 04-CONSTANTS - Constantes Centralizadas

## 📋 Índice da Seção

- [Visão Geral das Constants](#-visão-geral-das-constants)
- [Estrutura de Organização](#-estrutura-de-organização)
- [Constants de Metadados](#-constants-de-metadados)
- [Constants de Conteúdo](#-constants-de-conteúdo)
- [Padrões e Convenções](#-padrões-e-convenções)
- [Uso Prático](#-uso-prático)

---

## 🎯 Visão Geral das Constants

### Filosofia de Design

O projeto utiliza uma arquitetura **constants-first** para eliminar valores hardcoded e garantir consistência em toda a aplicação.

```
📋 CONSTANTS ARCHITECTURE
├─ 📁 metadata/          # ✅ Configurações e SEO
│   └── 📁 comum/        # Dados compartilhados
└─ 📁 content/          # ✅ Conteúdo das páginas
    ├── 📁 home/         # Página inicial
    ├── 📁 sobre/        # Sobre mim
    ├── 📁 contato/      # Contato
    └── 📁 blog/         # Blog
```

### Benefícios

- **Zero Hardcode**: Todos os valores centralizados
- **Manutenibilidade**: Mudanças em um único lugar
- **TypeScript**: Tipagem completa para todas as constants
- **JSDoc**: Documentação em português
- **Performance**: Tree-shaking efetivo
- **Consistência**: Valores padronizados

---

## 📂 Estrutura de Organização

### Metadados (Configurações Globais)

```typescript
constants/metadata/
├── 📁 comum/                    # Dados compartilhados entre páginas
│   ├── 📄 desenvolvedor.ts      # Perfil do desenvolvedor
│   ├── 📄 seo.ts                # SEO e metadados
│   ├── 📄 social.ts             # Redes sociais e contato
│   ├── 📄 navegacao.ts          # Navegação e breadcrumbs
│   └── 📄 site.ts               # Configuração geral do site
```

### Conteúdo (Específico por Página)

```typescript
constants/content/
├── 📁 home/                     # Conteúdo da página inicial
│   ├── 📄 hero.ts               # Hero section
│   ├── 📄 servicos.ts           # Lista de serviços
│   └── 📄 portfolio.ts          # Projetos em destaque
├── 📁 sobre/                    # Conteúdo da página sobre
│   └── 📄 experiencia.ts        # Experiência e habilidades
├── 📁 contato/                  # Conteúdo da página contato
│   ├── 📄 formulario.ts         # Campos do formulário
│   └── 📄 faq.ts                # FAQ e perguntas
└── 📁 blog/                     # Conteúdo do blog
    └── 📄 categorias.ts         # Categorias e tags
```

---

## 🏷️ Constants de Metadados

### Desenvolvedor

```typescript
// constants/metadata/comum/desenvolvedor.ts

/**
 * Perfil e informações do desenvolvedor
 */
export const DESENVOLVEDOR = {
  /** Nome completo do desenvolvedor */
  nome: 'Rainer Teixeira',
  
  /** Título profissional */
  titulo: 'Desenvolvedor Full-Stack',
  
  /** Localização */
  localizacao: 'Brasil',
  
  /** Email principal */
  email: 'contato@rainersoft.com.br',
  
  /** Telefone (formato internacional) */
  telefone: '+55 11 99999-9999',
  
  /** Anos de experiência */
  experiencia: 5,
  
  /** Stack principal */
  stack: [
    'React', 'Next.js', 'TypeScript', 
    'Node.js', 'Tailwind CSS', 'AWS'
  ] as const,
} as const;

/**
 * Biografia do desenvolvedor
 */
export const BIO = {
  /** Primeiro parágrafo da bio */
  paragrafo1: 'Desenvolvedor Full-Stack especializado em aplicações web modernas com React e Node.js. Focado em criar soluções escaláveis e performáticas.',
  
  /** Segundo parágrafo da bio */
  paragrafo2: 'Apaixonado por código aberto, mantenho 3 bibliotecas NPM ativas e contribuo para o ecossistema JavaScript/TypeScript.',
  
  /** Terceiro parágrafo da bio */
  paragrafo3: 'Experiência em desenvolvimento enterprise, desde startups até grandes corporações, sempre buscando as melhores práticas e padrões de código.',
} as const;

/**
 * Métricas profissionais
 */
export const METRICAS = {
  /** Número de projetos completos */
  projetos: {
    label: 'Projetos',
    valor: '50+',
    descricao: 'Aplicações entregues'
  },
  
  /** Bibliotecas publicadas */
  bibliotecas: {
    label: 'Bibliotecas',
    valor: '3',
    descricao: 'Pacotes NPM publicados'
  },
  
  /** Linhas de código */
  codigo: {
    label: 'Código',
    valor: '100K+',
    descricao: 'Linhas escritas'
  },
  
  /** Score Lighthouse */
  performance: {
    label: 'Performance',
    valor: '95+',
    descricao: 'Score Lighthouse'
  },
} as const;
```

### SEO

```typescript
// constants/metadata/comum/seo.ts

/**
 * Palavras-chave para SEO organizadas por categoria
 */
export const PALAVRAS_CHAVE = {
  /** Palavras-chave principais (mais importantes) */
  principais: [
    'desenvolvedor full-stack',
    'react developer',
    'next.js specialist',
    'typescript expert',
    'node.js developer'
  ] as const,
  
  /** Palavras-chave secundárias */
  secundarias: [
    'desenvolvimento web',
    'aplicações modernas',
    'frontend developer',
    'backend developer',
    'fullstack development'
  ] as const,
  
  /** Long-tail keywords */
  longas: [
    'desenvolvedor react next.js brasil',
    'especialista em typescript',
    'desenvolvimento de apis rest',
    'aplicações pwa progressivas',
    'design system implementation'
  ] as const,
} as const;

/**
 * Metadados padrão para páginas
 */
export const META_PADRAO = {
  /** Charset */
  charset: 'utf-8',
  
  /** Viewport */
  viewport: 'width=device-width, initial-scale=1',
  
  /** Robots */
  robots: 'index, follow',
  
  /** Author */
  author: DESENVOLVEDOR.nome,
  
  /** Publisher */
  publisher: 'Rainer Soft',
  
  /** Tema de cor */
  themeColor: '#0891b2',
  
  /** Tipo de site */
  type: 'website',
  
  /** Localidade */
  locale: 'pt_BR',
} as const;

/**
 * Open Graph defaults
 */
export const OPEN_GRAPH = {
  /** Título padrão */
  title: `${DESENVOLVEDOR.nome} - ${DESENVOLVEDOR.titulo}`,
  
  /** Descrição padrão */
  description: BIO.paragrafo1,
  
  /** URL do site */
  url: 'https://rainersoft.com.br',
  
  /** Tipo */
  type: 'website',
  
  /** Imagem padrão */
  image: '/images/og-default.jpg',
  
  /** Nome do site */
  siteName: `${DESENVOLVEDOR.nome} Portfolio`,
} as const;
```

### Social

```typescript
// constants/metadata/comum/social.ts

/**
 * Redes sociais do desenvolvedor
 */
export const REDES_SOCIAIS = {
  /** GitHub */
  github: {
    nome: 'GitHub',
    url: 'https://github.com/rainersoft',
    username: 'rainersoft',
    icon: 'github'
  },
  
  /** LinkedIn */
  linkedin: {
    nome: 'LinkedIn',
    url: 'https://linkedin.com/in/rainer-teixeira',
    username: 'rainer-teixeira',
    icon: 'linkedin'
  },
  
  /** Twitter/X */
  twitter: {
    nome: 'Twitter',
    url: 'https://twitter.com/rainersoft',
    username: 'rainersoft',
    icon: 'twitter'
  },
  
  /** Email */
  email: {
    nome: 'Email',
    url: `mailto:${DESENVOLVEDOR.email}`,
    username: DESENVOLVEDOR.email,
    icon: 'email'
  },
} as const;

/**
 * Informações de contato
 */
export const CONTATO = {
  /** Email principal */
  email: DESENVOLVEDOR.email,
  
  /** Telefone */
  telefone: DESENVOLVEDOR.telefone,
  
  /** WhatsApp (link direto) */
  whatsapp: `https://wa.me/5511999999999`,
  
  /** Endereço (opcional) */
  endereco: {
    rua: '',
    cidade: '',
    estado: '',
    pais: 'Brasil',
    cep: ''
  },
  
  /** Horário de atendimento */
  horario: {
    dias: 'Segunda a Sexta',
    horas: '09:00 - 18:00 (BRT)'
  }
} as const;
```

### Navegação

```typescript
// constants/metadata/comum/navegacao.ts

/**
 * IDs das seções para navegação
 */
export const SECTION_IDS = {
  /** Hero section */
  hero: 'hero',
  
  /** Sobre section */
  sobre: 'sobre',
  
  /** Serviços section */
  servicos: 'servicos',
  
  /** Portfolio section */
  portfolio: 'portfolio',
  
  /** Contato section */
  contato: 'contato',
} as const;

/**
 * Configuração de navegação principal
 */
export const NAVEGACAO = {
  /** Links do menu principal */
  principal: [
    {
      id: 'home',
      label: 'Início',
      href: '/',
      section: SECTION_IDS.hero
    },
    {
      id: 'sobre',
      label: 'Sobre',
      href: '/sobre',
      section: SECTION_IDS.sobre
    },
    {
      id: 'servicos',
      label: 'Serviços',
      href: '/#servicos',
      section: SECTION_IDS.servicos
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      href: '/#portfolio',
      section: SECTION_IDS.portfolio
    },
    {
      id: 'contato',
      label: 'Contato',
      href: '/contato',
      section: SECTION_IDS.contato
    }
  ] as const,
  
  /** Links do menu do dashboard */
  dashboard: [
    {
      id: 'dashboard-home',
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'home'
    },
    {
      id: 'dashboard-profile',
      label: 'Perfil',
      href: '/dashboard/settings',
      icon: 'user'
    },
    {
      id: 'dashboard-analytics',
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'chart'
    }
  ] as const,
} as const;

/**
 * Configuração de breadcrumbs
 */
export const BREADCRUMBS = {
  /** Página inicial */
  home: {
    label: 'Início',
    href: '/'
  },
  
  /** Sobre */
  sobre: {
    label: 'Sobre',
    href: '/sobre'
  },
  
  /** Contato */
  contato: {
    label: 'Contato',
    href: '/contato'
  },
  
  /** Blog */
  blog: {
    label: 'Blog',
    href: '/blog'
  },
  
  /** Dashboard */
  dashboard: {
    label: 'Dashboard',
    href: '/dashboard'
  },
} as const;
```

### Site

```typescript
// constants/metadata/comum/site.ts

/**
 * Configuração geral do site
 */
export const SITE_CONFIG = {
  /** Nome do site */
  name: 'Rainer Portfolio',
  
  /** Domínio principal */
  domain: 'rainersoft.com.br',
  
  /** URL base */
  url: 'https://rainersoft.com.br',
  
  /** URL da API */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  /** Ambiente */
  environment: process.env.NODE_ENV || 'development',
  
  /** Versão da aplicação */
  version: '2.3.0',
  
  /** Descrição curta */
  description: 'Portfolio profissional de Rainer Teixeira - Desenvolvedor Full-Stack especializado em React, Next.js e Node.js.',
  
  /** Favicon */
  favicon: '/favicon.ico',
  
  /** Manifest PWA */
  manifest: '/manifest.json',
} as const;

/**
 * Informações de copyright
 */
export const COPYRIGHT = {
  /** Titular do copyright */
  titular: DESENVOLVEDOR.nome,
  
  /** Ano inicial */
  anoInicial: 2020,
  
  /** Todos os direitos reservados */
  todosDireitos: true,
  
  /** Texto completo */
  texto: `© ${new Date().getFullYear()} ${DESENVOLVEDOR.nome}. Todos os direitos reservados.`,
} as const;

/**
 * Datas de atualização das políticas
 */
export const POLICIES_LAST_UPDATED = {
  /** Política de privacidade */
  privacidade: '2024-12-01',
  
  /** Política de cookies */
  cookies: '2024-12-01',
  
  /** Termos de uso */
  termos: '2024-12-01',
} as const;
```

---

## 📝 Constants de Conteúdo

### Home - Hero

```typescript
// constants/content/home/hero.ts

/**
 * Conteúdo da hero section
 */
export const CONTEUDO_HERO = {
  /** Títulos principais */
  titulos: [
    'Desenvolvedor Full-Stack',
    'React & Next.js Specialist',
    'Código de Qualidade Enterprise'
  ] as const,
  
  /** Subtítulos */
  subtitulos: [
    'Criando aplicações web modernas com React, Next.js e Node.js',
    '3 bibliotecas NPM publicadas e código open source',
    'Focado em performance, acessibilidade e melhores práticas'
  ] as const,
  
  /** Call-to-action principal */
  cta: {
    texto: 'Ver Projetos',
    href: '/#portfolio',
    variante: 'primary' as const
  },
  
  /** Call-to-action secundário */
  ctaSecundario: {
    texto: 'Iniciar Conversa',
    href: '/contato',
    variante: 'outline' as const
  },
  
  /** Background gradient */
  background: {
    from: 'from-slate-900',
    via: 'via-slate-800',
    to: 'to-slate-900'
  }
} as const;

/**
 * Estilos da hero section
 */
export const ESTILOS_HERO = {
  /** Container principal */
  container: 'min-h-screen flex items-center justify-center relative overflow-hidden',
  
  /** Content wrapper */
  content: 'max-w-4xl mx-auto text-center z-10',
  
  /** Título */
  titulo: 'text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6',
  
  /** Subtítulo */
  subtitulo: 'text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto',
  
  /** Container dos CTAs */
  ctas: 'flex flex-col sm:flex-row gap-4 justify-center items-center',
  
  /** Animações */
  animacao: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
} as const;
```

### Home - Serviços

```typescript
// constants/content/home/servicos.ts

/**
 * Lista de serviços oferecidos
 */
export const SERVICOS = {
  /** Título da seção */
  titulo: 'Serviços Profissionais',
  
  /** Descrição da seção */
  descricao: 'Soluções completas para desenvolvimento web moderno',
  
  /** Lista de serviços */
  lista: [
    {
      id: 'web-apps',
      titulo: 'Aplicações Web Modernas',
      descricao: 'Desenvolvimento de aplicações web com React, Next.js e TypeScript',
      icon: 'web',
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
      destaque: true
    },
    {
      id: 'design-system',
      titulo: 'Design System & Componentes',
      descricao: 'Criação de sistemas de design reutilizáveis e component libraries',
      icon: 'design',
      tags: ['Design Tokens', 'Component Library', 'Storybook'],
      destaque: true
    },
    {
      id: 'apis-backend',
      titulo: 'APIs & Backend',
      descricao: 'Desenvolvimento de APIs RESTful e microsserviços com Node.js',
      icon: 'api',
      tags: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      destaque: true
    },
    {
      id: 'performance',
      titulo: 'Performance & Otimização',
      descricao: 'Otimização de performance e SEO para aplicações web',
      icon: 'performance',
      tags: ['Lighthouse', 'Core Web Vitals', 'SEO'],
      destaque: false
    },
    {
      id: 'pwa',
      titulo: 'Progressive Web Apps',
      descricao: 'Aplicações PWA com experiência nativa em web',
      icon: 'pwa',
      tags: ['PWA', 'Service Workers', 'Offline'],
      destaque: false
    },
    {
      id: 'consultoria',
      titulo: 'Consultoria Técnica',
      descricao: 'Consultoria em arquitetura de software e melhores práticas',
      icon: 'consulting',
      tags: ['Architecture', 'Best Practices', 'Code Review'],
      destaque: false
    }
  ] as const,
  
  /** Diferenciais */
  diferenciais: [
    {
      titulo: 'Código de Qualidade',
      descricao: 'TypeScript strict, testes automatizados e padrões enterprise',
      icon: 'quality'
    },
    {
      titulo: 'Performance First',
      descricao: 'Foco em performance com Lighthouse 95+ e Core Web Vitals',
      icon: 'speed'
    },
    {
      titulo: 'Acessibilidade',
      descricao: 'WCAG 2.1 AA compliance e inclusão para todos',
      icon: 'accessibility'
    }
  ] as const
} as const;

/**
 * Cores dos serviços (locais, não usa @rainersoft/design-tokens)
 */
export const SERVICE_COLORS = {
  primary: '#0891b2',    // cyan-600
  secondary: '#9333ea',  // purple-600
  accent: '#db2777',     // pink-600
  success: '#059669',    // emerald-600
  info: '#2563eb',       // blue-600
  warning: '#f97316',    // orange-500
} as const;
```

### Home - Portfolio

```typescript
// constants/content/home/portfolio.ts

/**
 * Projetos em destaque
 */
export const PROJETOS = {
  /** Título da seção */
  titulo: 'Projetos em Destaque',
  
  /** Descrição da seção */
  descricao: 'Conheça alguns dos meus projetos open source e trabalhos recentes',
  
  /** Lista de projetos */
  lista: [
    {
      id: 'design-tokens',
      titulo: '@rainersoft/design-tokens',
      descricao: 'Sistema de design tokens W3C DTCG compliant com editor visual',
      imagem: '/images/projects/design-tokens.jpg',
      tags: ['Design Tokens', 'W3C', 'TypeScript', 'Editor'],
      tecnologias: ['TypeScript', 'JSON Schema', 'React'],
      links: {
        github: 'https://github.com/rainersoft/rainer-design-tokens',
        npm: 'https://npmjs.com/package/@rainersoft/design-tokens',
        demo: 'https://tokens.rainersoft.com.br'
      },
      status: 'ativo',
      destaque: true,
      categoria: 'design-system'
    },
    {
      id: 'ui-library',
      titulo: '@rainersoft/ui',
      descricao: 'Biblioteca de componentes React acessíveis e reutilizáveis',
      imagem: '/images/projects/ui-library.jpg',
      tags: ['Component Library', 'React', 'WCAG', 'Storybook'],
      tecnologias: ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
      links: {
        github: 'https://github.com/rainersoft/rainer-ui',
        npm: 'https://npmjs.com/package/@rainersoft/ui',
        demo: 'https://ui.rainersoft.com.br'
      },
      status: 'ativo',
      destaque: true,
      categoria: 'ui-library'
    },
    {
      id: 'utils',
      titulo: '@rainersoft/utils',
      descricao: 'Biblioteca de utilitários JavaScript/TypeScript com i18n',
      imagem: '/images/projects/utils.jpg',
      tags: ['Utils', 'TypeScript', 'i18n', 'Validation'],
      tecnologias: ['TypeScript', 'Pure Functions', 'i18n'],
      links: {
        github: 'https://github.com/rainersoft/rainer-utils',
        npm: 'https://npmjs.com/package/@rainersoft/utils',
        demo: null
      },
      status: 'ativo',
      destaque: true,
      categoria: 'utils'
    },
    {
      id: 'portfolio-platform',
      titulo: 'Portfolio Platform',
      descricao: 'Plataforma completa de portfolio com dashboard administrativo',
      imagem: '/images/projects/portfolio-platform.jpg',
      tags: ['Portfolio', 'Next.js', 'Dashboard', 'PWA'],
      tecnologias: ['Next.js', 'React', 'Node.js', 'MongoDB'],
      links: {
        github: 'https://github.com/rainersoft/rainer-portfolio',
        npm: null,
        demo: 'https://rainersoft.com.br'
      },
      status: 'ativo',
      destaque: true,
      categoria: 'portfolio'
    }
  ] as const,
  
  /** Categorias de projetos */
  categorias: [
    { id: 'design-system', label: 'Design System' },
    { id: 'ui-library', label: 'UI Library' },
    { id: 'utils', label: 'Utils' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'api', label: 'API' },
    { id: 'mobile', label: 'Mobile' }
  ] as const,
  
  /** Filtros disponíveis */
  filtros: [
    { id: 'todos', label: 'Todos' },
    { id: 'destaque', label: 'Em Destaque' },
    { id: 'ativo', label: 'Ativos' },
    { id: 'open-source', label: 'Open Source' }
  ] as const
} as const;

/**
 * Métricas dos projetos
 */
export const METRICAS_PROJETOS = {
  /** Total de projetos */
  total: '50+',
  
  /** Projetos open source */
  openSource: '12',
  
  ** Bibliotecas NPM */
  bibliotecas: '3',
  
  ** Stars no GitHub */
  stars: '500+',
  
  ** Downloads NPM */
  downloads: '10K+',
  
  ** Projetos ativos */
  ativos: '8'
} as const;
```

---

## 🎯 Padrões e Convenções

### 1. Nomenclatura

```typescript
// ✅ Constantes em UPPER_SNAKE_CASE
export const DESENVOLVEDOR = { ... };
export const SERVICOS = { ... };
export const REDES_SOCIAIS = { ... };

// ✅ Interfaces em PascalCase
interface DesenvolvedorConfig { ... }
interface ServicoConfig { ... }

// ✅ Types em PascalCase
type ServicoStatus = 'ativo' | 'inativo' | 'manutencao';
type CategoriaProjeto = 'design-system' | 'ui-library' | 'utils';
```

### 2. JSDoc em Português

```typescript
/**
 * Configuração do desenvolvedor
 * Contém informações pessoais e profissionais
 */
export const DESENVOLVEDOR = {
  /**
   * Nome completo do desenvolvedor
   * @example 'Rainer Teixeira'
   */
  nome: 'Rainer Teixeira',
  
  /**
   * Título profissional
   * @example 'Desenvolvedor Full-Stack'
   */
  titulo: 'Desenvolvedor Full-Stack',
} as const;

/**
 * Tipagem de um serviço
 */
interface ServicoConfig {
  /** ID único do serviço */
  id: string;
  
  /** Título do serviço */
  titulo: string;
  
  /** Descrição detalhada */
  descricao: string;
  
  /** Ícone representativo */
  icon: string;
  
  /** Tags relacionadas */
  tags: readonly string[];
  
  /** Se está em destaque */
  destaque: boolean;
}
```

### 3. Tipagem Estrita

```typescript
// ✅ As const para imutabilidade
export const SERVICOS = {
  lista: [
    {
      id: 'web-apps',
      titulo: 'Aplicações Web Modernas',
      tags: ['React', 'Next.js'] as const
    }
  ] as const
} as const;

// ✅ Tipos derivados
type ServicoId = typeof SERVICOS.lista[number]['id'];
type ServicoTag = typeof SERVICOS.lista[number]['tags'][number];

// ✅ Enums para status fixos
export const SERVICO_STATUS = {
  ATIVO: 'ativo',
  INATIVO: 'inativo',
  MANUTENCAO: 'manutencao'
} as const;

type ServicoStatus = typeof SERVICO_STATUS[keyof typeof SERVICO_STATUS];
```

---

## 💡 Uso Prático

### Import Organizado

```typescript
// ✅ Import por namespace
import { 
  Desenvolvedor, 
  SEO, 
  Social, 
  Navegacao 
} from '@/constants/metadata';

import { 
  Home, 
  Sobre, 
  Contato 
} from '@/constants/content';

// ✅ Import específico
import { DESENVOLVEDOR, SERVICOS } from '@/constants';
import { CONTEUDO_HERO } from '@/constants/content/home';
```

### Uso em Componentes

```typescript
// ✅ Componente com constants
export const HeroSection: React.FC = () => {
  return (
    <section className={ESTILOS_HERO.container}>
      <motion.div {...ESTILOS_HERO.animacao}>
        <h1 className={ESTILOS_HERO.titulo}>
          {CONTEUDO_HERO.titulos[0]}
        </h1>
        <p className={ESTILOS_HERO.subtitulo}>
          {CONTEUDO_HERO.subtitulos[0]}
        </p>
        <Button href={CONTEUDO_HERO.cta.href}>
          {CONTEUDO_HERO.cta.texto}
        </Button>
      </motion.div>
    </section>
  );
};

// ✅ Lista com mapeamento
export const ServicesList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICOS.lista.map((servico) => (
        <ServiceCard key={servico.id} servico={servico} />
      ))}
    </div>
  );
};
```

### Uso em Metadata

```typescript
// ✅ SEO com constants
export const metadata: Metadata = {
  title: `${DESENVOLVEDOR.nome} - ${DESENVOLVEDOR.titulo}`,
  description: BIO.paragrafo1,
  keywords: [
    ...PALAVRAS_CHAVE.principais,
    ...PALAVRAS_CHAVE.secundarias
  ],
  authors: [{ name: DESENVOLVEDOR.nome }],
  openGraph: {
    ...OPEN_GRAPH,
    title: `${DESENVOLVEDOR.nome} - Portfolio`,
    description: BIO.paragrafo1
  }
};
```

---

## 🎯 Próximos Passos

1. **Bibliotecas**: Explore [05-LIBRARIES](../05-LIBRARIES/)
2. **Features**: Configure [06-FEATURES](../06-FEATURES/)
3. **Componentes**: Veja [03-COMPONENTES](../03-COMPONENTES/)

---

## 📚 Referências

- [TypeScript Constants](https://www.typescriptlang.org/docs/handbook/enums.html#constants-vs-enums)
- [JSDoc Documentation](https://jsdoc.app/)
- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
