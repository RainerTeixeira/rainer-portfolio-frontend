/**
 * @fileoverview Depoimentos de clientes
 * @module constants/home/testimonials
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Depoimentos reais de clientes satisfeitos
 * com os serviços da Rainer Soft.
 */

import { GRADIENTS } from '@rainersoft/design-tokens';

/**
 * Interface para depoimento
 * @interface
 */
export interface Testimonial {
  readonly id: string;
  readonly nome: string;
  readonly cargo: string;
  readonly empresa: string;
  readonly foto?: string;
  readonly depoimento: string;
  readonly nota: number;
  readonly destaque?: boolean;
  readonly projeto?: string;
  readonly resultado?: string;
}

/**
 * Validação técnica dos projetos
 * @constant
 * @description Feedback baseado em métricas reais dos projetos
 */
export const VALIDACAO_TECNICA = [
  {
    id: 'validacao-1',
    projeto: '@rainersoft/design-tokens',
    tipo: 'Biblioteca NPM',
    validacao: 'Código com 100% de cobertura de testes. Implementação seguindo especificação W3C Design Tokens. ' +
               'Suporte a múltiplos formatos de saída e temas dinâmicos.',
    metricas: {
      testes: '320+ testes automatizados',
      qualidade: 'Zero bugs conhecidos',
      standard: 'W3C Compliant',
    },
    destaque: true,
  },
  {
    id: 'validacao-2',
    projeto: '@rainersoft/ui',
    tipo: 'Componentes React',
    validacao: 'Componentes 100% acessíveis seguindo WCAG 2.1. Bundle otimizado com menos de 50KB. ' +
               'Integração perfeita com design tokens.',
    metricas: {
      acessibilidade: 'WCAG 2.1 AA',
      performance: 'Bundle < 50KB',
      componentes: '25+ componentes',
    },
    destaque: true,
  },
  {
    id: 'validacao-3',
    projeto: 'Portfolio Platform',
    tipo: 'Aplicação Full-Stack',
    validacao: 'Lighthouse Score 98+ em todas as páginas. Core Web Vitals otimizados. ' +
               'Arquitetura escalável com Next.js 15 App Router.',
    metricas: {
      lighthouse: '98+ Score',
      lcp: '< 2.5s',
      fcp: '< 1.8s',
    },
    destaque: true,
  },
] as const;

export const TESTIMONIALS = VALIDACAO_TECNICA;

/**
 * Métricas de qualidade do código
 * @constant
 */
export const QUALITY_METRICS = {
  coberturaTestes: '100%',
  lighthouseScore: '98+',
  acessibilidade: 'WCAG 2.1',
  tempoCarregamento: '< 2s',
  bundleSize: '< 100KB',
  zeroDowntime: true,
} as const;

export const SATISFACTION_METRICS = QUALITY_METRICS;

/**
 * Tecnologias e ferramentas utilizadas
 * @constant
 */
export const TECH_STACK = [
  { nome: 'React', categoria: 'Frontend' },
  { nome: 'Next.js', categoria: 'Framework' },
  { nome: 'TypeScript', categoria: 'Language' },
  { nome: 'Node.js', categoria: 'Backend' },
  { nome: 'PostgreSQL', categoria: 'Database' },
  { nome: 'TailwindCSS', categoria: 'Styling' },
  { nome: 'Jest', categoria: 'Testing' },
  { nome: 'Docker', categoria: 'DevOps' },
  { nome: 'Vercel', categoria: 'Deploy' },
  { nome: 'GitHub', categoria: 'Version Control' },
] as const;

export const CLIENT_LOGOS = TECH_STACK;
