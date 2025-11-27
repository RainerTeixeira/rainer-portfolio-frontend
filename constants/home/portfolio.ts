/**
 * @fileoverview Projetos do portfólio
 * @module constants/home/portfolio
 * @version 1.0.1
 * @author Rainer Teixeira
 * 
 * @description
 * Lista de projetos desenvolvidos para
 * demonstração de habilidades técnicas.
 */

import { GRADIENTS } from '@rainersoft/design-tokens';

/**
 * Projetos Open Source desenvolvidos
 * @constant
 * @description Projetos reais com código aberto e em produção
 */
export const PROJETOS = [
  {
    titulo: '@rainersoft/design-tokens',
    subtitulo: 'Sistema de Design Tokens W3C',
    descricao: 'Biblioteca NPM com Design Tokens seguindo especificação W3C. ' +
               'Suporte a múltiplos formatos, temas e 100% de cobertura de testes.',
    tecnologias: ['TypeScript', 'Jest', 'W3C DTCG', 'NPM'],
    destaque: true,
    metricas: {
      testes: '320+',
      cobertura: '100%',
      formato: 'W3C Standard',
    },
    links: {
      npm: 'https://npm.im/@rainersoft/design-tokens',
      github: 'https://github.com/rainerteixeira/design-tokens',
    },
    ano: '2024',
    gradiente: GRADIENTS.TEXT_PRIMARY,
  },
  {
    titulo: '@rainersoft/ui',
    subtitulo: 'Biblioteca de Componentes React',
    descricao: 'Componentes React acessíveis seguindo WCAG 2.1. ' +
               'Hooks customizados, utilitários e integração com design tokens.',
    tecnologias: ['React 19', 'TypeScript', 'WCAG 2.1', 'Radix UI'],
    destaque: true,
    metricas: {
      componentes: '25+',
      acessibilidade: 'WCAG 2.1',
      bundle: '< 50KB',
    },
    links: {
      npm: 'https://npm.im/@rainersoft/ui',
      github: 'https://github.com/rainerteixeira/ui',
    },
    ano: '2024',
    gradiente: GRADIENTS.TEXT_PRIMARY,
  },
  {
    titulo: '@rainersoft/utils',
    subtitulo: 'Utilitários TypeScript com i18n',
    descricao: 'Biblioteca de utilitários com suporte completo a internacionalização. ' +
               'Formatação de datas, números e strings para pt-BR, en-US e es-ES.',
    tecnologias: ['TypeScript', 'i18n', 'Jest', 'ESM/CJS'],
    destaque: true,
    metricas: {
      funções: '30+',
      idiomas: '3',
      tamanho: '< 10KB',
    },
    links: {
      npm: 'https://npm.im/@rainersoft/utils',
      github: 'https://github.com/rainerteixeira/utils',
    },
    ano: '2024',
    gradiente: GRADIENTS.TEXT_PRIMARY,
  },
  {
    titulo: 'Portfolio & Blog Platform',
    subtitulo: 'Sistema Completo com CMS',
    descricao: 'Plataforma full-stack com Next.js 15 App Router, NestJS backend, ' +
               'autenticação JWT e painel administrativo completo.',
    tecnologias: ['Next.js 15', 'NestJS', 'PostgreSQL', 'JWT'],
    destaque: false,
    metricas: {
      lighthouse: '98+',
      apis: '20+',
      features: 'Blog, Auth, Admin',
    },
    links: {
      demo: 'https://rainersoft.com.br',
      github: 'https://github.com/rainerteixeira/portfolio',
    },
    ano: '2024',
    gradiente: GRADIENTS.TEXT_PRIMARY,
  },
  {
    titulo: 'Token Editor Web',
    subtitulo: 'Editor Visual de Design Tokens',
    descricao: 'Ferramenta web para edição visual de design tokens. ' +
               '100% no browser, sem backend, com preview em tempo real.',
    tecnologias: ['React', 'TypeScript', 'Local Storage', 'Monaco Editor'],
    destaque: false,
    metricas: {
      features: 'Live Preview',
      storage: 'Browser Only',
      export: 'JSON, CSS, SCSS',
    },
    links: {
      demo: 'https://tokens.rainersoft.com.br',
    },
    ano: '2024',
    gradiente: GRADIENTS.TEXT_PRIMARY,
  },
] as const;

/**
 * Métricas reais dos projetos desenvolvidos
 * @constant
 * @description Estatísticas baseadas em código real
 */
export const METRICAS_PROJETOS = {
  bibliotecasNPM: 3,
  projetosOpenSource: 5,
  linhasDeCodigo: '50K+',
  testesEscritos: '320+',
  coberturaTestes: '100%',
  lighthouseScore: '98+',
  commitsGitHub: '500+',
  horasDesenvolvimento: '2000+',
} as const;

/**
 * Stack técnica com expertise comprovada
 * @constant
 */
export const TECNOLOGIAS = {
  'Frontend': ['React 19', 'Next.js 15', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
  'Backend': ['Node.js', 'NestJS', 'Express', 'PostgreSQL', 'MongoDB'],
  'Ferramentas': ['Git', 'Jest', 'Docker', 'GitHub Actions', 'Vercel'],
  'Padrões': ['Clean Code', 'SOLID', 'TDD', 'CI/CD', 'Semantic Versioning'],
} as const;

/**
 * Stack detalhada com nível de domínio
 * @constant
 */
export const EXPERTISE_NIVEL = {
  'Avançado': ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS'],
  'Intermediário': ['NestJS', 'PostgreSQL', 'MongoDB', 'Docker', 'Jest'],
  'Em Aprendizado': ['Kubernetes', 'GraphQL', 'WebAssembly', 'Rust'],
} as const;

