/**
 * @fileoverview Informações do desenvolvedor
 * @module constants/comum/desenvolvedor
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
 * Informações principais do desenvolvedor
 * @constant
 * @description Dados essenciais utilizados em múltiplas seções
 */
export const DESENVOLVEDOR = {
  nome: 'Rainer Teixeira',
  titulo: 'Desenvolvedor Full-Stack',
  role: 'CEO & Fundador',
  empresa: 'Rainer Soft',
  especialidade: 'React • Next.js • Node.js • TypeScript',
  email: 'suporte@rainersoft.com.br',
  localizacao: 'Brasil',
  disponibilidade: 'Disponível para novos projetos',
  tempoResposta: '24 horas',
} as const;

/**
 * Biografias em diferentes tamanhos
 * @constant
 * @description Variações de bio para diferentes contextos
 */
export const BIO = {
  curta: 'Especialista em aplicações web profissionais com performance excepcional',
  
  media: 'Desenvolvedor full-stack especializado em React, Next.js e Node.js. ' +
         'Crio aplicações web profissionais com código limpo e performance excepcional.',
  
  longa: 'Desenvolvedor full-stack com expertise em React, Next.js, Node.js e TypeScript. ' +
         'Especializado em criar aplicações web profissionais, dashboards interativos e APIs robustas. ' +
         'Foco em performance excepcional (Lighthouse 95+), código limpo e arquitetura escalável.',
} as const;

/**
 * Conquistas e métricas profissionais
 * @constant
 * @description Números que demonstram experiência e resultados
 */
export const METRICAS = {
  projetosConcluidos: '15+',
  linhasDeCodigo: '100K+',
  tecnologiasDominadas: '25+',
  lighthouseScore: '95+',
  anosExperiencia: '3+',
} as const;
