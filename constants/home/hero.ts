/**
 * @fileoverview Conteúdo da seção hero
 * @module constants/home/hero
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Títulos e subtítulos rotativos para a seção
 * hero da página inicial.
 */

import { GRADIENTS, SHADOWS } from '@rainersoft/design-tokens';

/**
 * Conteúdo rotativo do hero
 * @constant
 * @description Títulos e subtítulos para o carousel
 */
export const CONTEUDO_HERO = {
  titulos: [
    'DESENVOLVEDOR FULL-STACK REACT E NEXT.JS',
    'APLICAÇÕES WEB PROFISSIONAIS QUE CONVERTEM',
    'DASHBOARDS INTERATIVOS COM PERFORMANCE',
    'PWAS MODERNAS COM SEO AVANÇADO',
    'APIS REST ROBUSTAS COM NODE.JS',
    'CÓDIGO LIMPO E ARQUITETURA ESCALÁVEL',
    'DESENVOLVIMENTO ÁGIL COM ENTREGAS SEMANAIS',
    'INTERFACES RESPONSIVAS QUE ENCANTAM',
    'PERFORMANCE LIGHTHOUSE 95+ GARANTIDA',
    'DO DESIGN AO DEPLOY COMPLETO',
  ],
  subtitulos: [
    'Especialista em React, Next.js e TypeScript. Transformo ideias em aplicações profissionais.',
    'Desenvolvimento completo: frontend, backend e banco de dados. Código limpo e documentado.',
    'Dashboards que simplificam gestão. Gráficos em tempo real e relatórios inteligentes.',
    'Apps instaláveis com performance excepcional. SEO que coloca seu site no topo.',
    'APIs profissionais com Node.js. Autenticação segura e documentação completa.',
    'Metodologia que economiza tempo. Código modular e testado para fácil manutenção.',
    'Entregas incrementais com feedback constante. Desenvolvimento transparente.',
    'Design mobile-first que funciona em qualquer dispositivo. Experiência fluida.',
    'Sites rápidos que o Google adora. Core Web Vitals otimizados.',
    'Desenvolvimento completo incluindo design, código, testes e infraestrutura.',
  ],
} as const;

/**
 * Configuração visual do hero
 * @constant
 * @description Estilos usando tokens do design system
 */
export const ESTILOS_HERO = {
  gradiente: GRADIENTS.PRIMARY,
  sombra: SHADOWS.LARGE,
  animacao: {
    duracao: 6000,
    transicao: 'ease-in-out',
  },
} as const;

/**
 * Call-to-actions do hero
 * @constant
 * @description Botões de ação principais
 */
export const CTA_HERO = {
  principal: {
    texto: 'Ver Projetos',
    link: '#portfolio',
  },
  secundario: {
    texto: 'Entre em Contato',
    link: '#contato',
  },
} as const;
