/**
 * @fileoverview Serviços oferecidos
 * @module constants/content/home/servicos
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Lista de serviços profissionais oferecidos,
 * incluindo descrições e características.
 */

import { lightThemeColors } from '@rainersoft/design-tokens';

/**
 * Cores para serviços (tokens do tema claro)
 */
const SERVICE_COLORS = {
  primary: lightThemeColors.primitive.cyan[600],
  secondary: lightThemeColors.primitive.purple[600],
  accent: lightThemeColors.primitive.pink[600],
  success: lightThemeColors.primitive.emerald[600],
} as const;

/**
 * Serviços especializados com expertise comprovada
 * @constant
 * @description Serviços que posso entregar com excelência
 */
export const SERVICOS = [
  {
    titulo: 'Aplicações Web Modernas',
    descricao: 'Desenvolvimento completo com React e Next.js. ' +
               'Performance otimizada, SEO avançado e experiência de usuário excepcional.',
    badge: 'Especialidade',
    caracteristicas: [
      'React 19 + Next.js 15',
      'TypeScript + TailwindCSS',
      'Performance 98+ Lighthouse',
      'SEO & Core Web Vitals',
    ],
    icone: 'Code2',
    cor: SERVICE_COLORS.primary,
    preco: 'Consultoria personalizada',
  },
  {
    titulo: 'Design System & Componentes',
    descricao: 'Criação de design systems completos e bibliotecas de componentes reutilizáveis. ' +
               'Documentação clara e testes automatizados.',
    badge: 'Projeto Próprio',
    caracteristicas: [
      'Design Tokens W3C',
      'Componentes Acessíveis',
      '100% Cobertura de Testes',
      'Storybook & Documentação',
    ],
    icone: 'Palette',
    cor: SERVICE_COLORS.secondary,
    preco: 'Projeto sob medida',
  },
  {
    titulo: 'APIs & Backend',
    descricao: 'Desenvolvimento de APIs REST robustas com Node.js e NestJS. ' +
               'Autenticação segura, documentação completa e integrações.',
    badge: 'Full-Stack',
    caracteristicas: [
      'Node.js + NestJS',
      'JWT + OAuth2',
      'PostgreSQL & MongoDB',
      'Swagger Documentation',
    ],
    icone: 'Server',
    cor: SERVICE_COLORS.accent,
    preco: 'Orçamento detalhado',
  },
  {
    titulo: 'Performance & Otimização',
    descricao: 'Melhoria de performance de aplicações existentes. ' +
               'Análise de gargalos, otimização de bundle e Core Web Vitals.',
    badge: 'Lighthouse 98+',
    caracteristicas: [
      'Análise de Performance',
      'Otimização de Bundle',
      'Lazy Loading & Code Splitting',
      'Cache Strategy',
    ],
    icone: 'Zap',
    cor: SERVICE_COLORS.success,
    preco: 'Análise gratuita',
  },
] as const;

/**
 * Diferenciais baseados em competências reais
 * @constant
 * @description O que me diferencia no mercado
 */
export const DIFERENCIAIS = [
  {
    titulo: 'Código Open Source',
    descricao: 'Projetos publicados no NPM com código aberto e documentção completa.',
    icone: 'Github',
    destaque: true,
  },
  {
    titulo: 'Testes Automatizados',
    descricao: '100% de cobertura em projetos críticos. TDD como padrão de desenvolvimento.',
    icone: 'CheckCircle',
  },
  {
    titulo: 'Performance Garantida',
    descricao: 'Lighthouse Score 98+. Aplicações que carregam em menos de 2 segundos.',
    icone: 'Zap',
    destaque: true,
  },
  {
    titulo: 'Stack Atualizada',
    descricao: 'React 19, Next.js 15, TypeScript 5. Sempre nas versões mais recentes e estáveis.',
    icone: 'Cpu',
  },
  {
    titulo: 'Documentação Detalhada',
    descricao: 'Código comentado, README completo e documentação técnica clara.',
    icone: 'BookOpen',
    destaque: true,
  },
  {
    titulo: 'Arquitetura Escalável',
    descricao: 'Design patterns, SOLID principles e clean architecture em todos os projetos.',
    icone: 'Layers',
  },
] as const;

/**
 * Processo transparente de desenvolvimento
 * @constant
 */
export const PROCESSO = [
  {
    fase: '01',
    titulo: 'Análise Técnica',
    descricao: 'Entendimento completo dos requisitos e definição da melhor arquitetura.',
    duracao: '2-3 dias',
  },
  {
    fase: '02',
    titulo: 'Prototipagem',
    descricao: 'MVP funcional para validação de conceito e ajustes iniciais.',
    duracao: '1 semana',
  },
  {
    fase: '03',
    titulo: 'Desenvolvimento',
    descricao: 'Implementação com entregas incrementais e testes contínuos.',
    duracao: '2-8 semanas',
  },
  {
    fase: '04',
    titulo: 'Entrega & Documentação',
    descricao: 'Deploy, documentação completa e transferência de conhecimento.',
    duracao: '3-5 dias',
  },
] as const;

