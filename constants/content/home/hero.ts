/**
 * @fileoverview Conteúdo da seção hero
 * @module constants/content/home/hero
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Títulos e subtítulos rotativos para a seção
 * hero da página inicial.
 */

import { GRADIENTS, SHADOWS } from '@rainersoft/design-tokens';

/**
 * Conteúdo profissional para Hero Section
 * @constant
 * @description Copy direto e impactante baseado em expertise real
 */
export const CONTEUDO_HERO = {
  titulos: [
    'Desenvolvimento Full-Stack com Excelência Técnica',
    'React + Next.js + TypeScript: Stack Moderna em Produção',
    'Arquitetura Escalável, Performance Otimizada',
    'Do Design System ao Deploy: Domínio Completo',
    'Código Limpo, Testes Automatizados, CI/CD',
  ],
  subtitulos: [
    'Desenvolvedor com projetos open source publicados no NPM. Especialista em React 19, Next.js 15 e Node.js.',
    'Criador de bibliotecas em produção: design-tokens, componentes UI e utilitários. 100% de cobertura de testes.',
    'Lighthouse Score 98+. Core Web Vitals otimizados. Aplicações que carregam em menos de 2 segundos.',
    'Experiência completa: Design Tokens W3C, componentes acessíveis WCAG 2.1, APIs REST, bancos de dados.',
    'Metodologia sólida: TDD, documentação clara, versionamento semântico, integração contínua.',
  ],
} as const;

/**
 * Configuração visual do hero
 * @constant
 * @description Estilos usando tokens do design system
 */
export const ESTILOS_HERO = {
  gradiente: GRADIENTS.TEXT_PRIMARY,
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
    texto: 'Ver Projetos Open Source',
    link: '#portfolio',
  },
  secundario: {
    texto: 'Iniciar Conversa',
    link: '#contato',
  },
} as const;

