/**
 * @fileoverview Informações do desenvolvedor
 * @module constants/metadata/comum/desenvolvedor
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Informações centralizadas do desenvolvedor utilizadas
 * em todo o site. Define dados pessoais, profissionais
 * e de contato.
 */

import { tokens } from '@rainersoft/design-tokens';

/**
 * Informações principais da empresa
 * @constant
 * @description Dados essenciais da Rainer Soft
 */
export const EMPRESA = {
  nome: 'Rainer Soft',
  tagline: 'Engenharia de Software com Excelência Técnica',
  tipo: 'Desenvolvimento Full-Stack Especializado',
  fundacao: '2024',
  especialidades: 'React • Next.js • TypeScript • Node.js • Cloud Architecture',
  email: 'contato@rainersoft.com.br',
  suporte: 'suporte@rainersoft.com.br',
  localizacao: 'Volta Redonda, RJ - Brasil',
  disponibilidade: 'Segunda a Sexta, 9h às 18h',
  tempoResposta: 'Resposta em até 24 horas',
  diferenciais: ['Código Open Source', 'Arquitetura Escalável', 'Performance Otimizada'],
} as const;

/**
 * Informações do fundador
 * @constant
 */
export const FUNDADOR = {
  nome: 'Rainer Teixeira',
  cargo: 'Desenvolvedor Full-Stack',
  especialidade: 'Arquitetura de Software & Performance',
  foco: 'Criação de soluções técnicas robustas e escaláveis',
} as const;

export const CEO = FUNDADOR;

// Alias para compatibilidade
export const DESENVOLVEDOR = EMPRESA;

/**
 * Apresentação profissional baseada em expertise técnica real
 * @constant
 * @description Apresentação focada em competências comprovadas
 */
export const APRESENTACAO = {
  curta: 'Desenvolvimento Full-Stack com foco em arquitetura escalável e performance otimizada',
  
  media: 'Especialista em React, Next.js e Node.js com projetos open source publicados no NPM. ' +
         'Desenvolvo aplicações web modernas com arquitetura sólida, código limpo e performance excepcional.',
  
  longa: 'Desenvolvedor Full-Stack com expertise comprovada através de bibliotecas open source em produção. ' +
         'Criador do ecossistema @rainersoft (design-tokens, UI components, utilities) usado em aplicações reais. ' +
         'Especializado em React 19, Next.js 15, TypeScript e Node.js, com foco em performance (Lighthouse 98+) ' +
         'e arquitetura escalável. Domínio completo do ciclo de desenvolvimento: design system, frontend, backend, DevOps.',
  
  tecnica: 'Minha expertise técnica é demonstrada através de projetos concretos:\n' +
           '• @rainersoft/design-tokens: Sistema W3C Design Tokens com 100% de cobertura de testes\n' +
           '• @rainersoft/ui: Biblioteca de componentes React com acessibilidade WCAG 2.1\n' +
           '• @rainersoft/utils: Utilitários TypeScript com suporte i18n (pt-BR, en-US, es-ES)\n' +
           '• Backend NestJS: APIs REST com autenticação JWT, PostgreSQL e MongoDB\n\n' +
           'Cada projeto reflete meu compromisso com código de qualidade, documentação clara e ' +
           'soluções que resolvem problemas reais de desenvolvimento.',
} as const;

export const BIO = APRESENTACAO;

/**
 * Métricas reais e comprováveis
 * @constant
 * @description Números baseados em projetos e código real
 */
export const METRICAS = {
  anosExperiencia: '2+',
  bibliotecasNPM: '3',
  componentesUI: '25+',
  testesEscritos: '320+',
  coberturaTestes: '100%',
  lighthouseScore: '98+',
  projetosOpenSource: '5',
  linhasDeCodigo: '50K+',
  commitsGitHub: '500+',
  tecnologiasDominadas: '15+',
  tempoEstudo: '2000+ horas',
} as const;

/**
 * Projetos e contribuições reais
 * @constant
 */
export const PROJETOS_COMPROVADOS = {
  bibliotecas: [
    '@rainersoft/design-tokens - Sistema de Design Tokens W3C',
    '@rainersoft/ui - Componentes React Acessíveis',
    '@rainersoft/utils - Utilitários TypeScript com i18n',
  ],
  tecnologias: [
    'React 19 & Next.js 15',
    'TypeScript & JavaScript ES2024',
    'Node.js & NestJS',
    'PostgreSQL & MongoDB',
    'TailwindCSS & Styled Components',
    'Jest & Testing Library',
  ],
  competencias: [
    'Arquitetura de Software Escalável',
    'Performance Web (Core Web Vitals)',
    'Desenvolvimento Test-Driven (TDD)',
    'CI/CD & DevOps',
    'Documentação Técnica',
    'Code Review & Best Practices',
  ],
} as const;

export const RECONHECIMENTOS = PROJETOS_COMPROVADOS;

