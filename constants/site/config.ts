/**
 * Site Configuration
 *
 * Configurações globais do portfólio.
 *
 * @module constants/site/config
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { SOCIAL_LINKS } from './social';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/**
 * Configuração de horário de trabalho
 */
export interface WorkingHours {
  days: string;
  hours: string;
}

/**
 * Configuração de localização
 */
export interface Location {
  city: string;
  country: string;
}

/**
 * Configuração de telefone
 */
export interface Phone {
  number: string;
  whatsapp: boolean;
}

/**
 * Configuração de email
 */
export interface Email {
  address: string;
  responseTime: string;
}

/**
 * Configuração completa de contato
 */
export interface ContactConfig {
  workingHours: WorkingHours;
  location: Location;
  phone: Phone;
  email: Email;
}

/**
 * Configuração de contato
 */
export const CONTACT_CONFIG: ContactConfig = {
  workingHours: {
    days: 'Seg - Sex',
    hours: '9:00 - 18:00',
  },
  location: {
    city: 'Volta Redonda, RJ',
    country: 'Brasil',
  },
  phone: {
    number: '+55 24 99913-7382',
    whatsapp: true,
  },
  email: {
    address: 'suporte@rainersoft.com.br',
    responseTime: 'Resposta em 24h',
  },
} as const;

/**
 * Stack tecnológica principal (usado em múltiplos lugares)
 */
const TECHNOLOGIES = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
] as const;

/**
 * Configuração principal do site
 */
export const SITE_CONFIG = {
  /**
   * Nome completo da empresa/marca
   */
  fullName: 'RainerSoft',

  /**
   * Nome curto
   */
  name: 'RainerSoft',

  /**
   * Título SEO otimizado
   */
  title:
    'Desenvolvedor Full-Stack | Especialista em React, Next.js, TypeScript & Node.js',

  /**
   * Descrição para SEO e meta tags
   */
  description:
    'Desenvolvedor Full-Stack especializado em criar aplicações web modernas e profissionais. ' +
    'Domínio técnico em React 19, Next.js 15, TypeScript, Node.js, NestJS e bancos de dados. ' +
    'Desenvolvo dashboards interativos, sistemas de autenticação seguros, PWAs, APIs RESTful, ' +
    'integrações com serviços externos e arquiteturas escaláveis. Portfólio comprovado com projetos ' +
    'reais funcionais. Código limpo, documentação completa, testes automatizados e resultados que ' +
    'impressionam. Transformo ideias em soluções digitais que resolvem problemas reais e agregam ' +
    'valor ao seu negócio.',

  /**
   * URL principal do site
   */
  url: 'https://rainersoft.com.br',

  /**
   * Anos de experiência
   */
  experience: '5+',

  /**
   * Quantidade de projetos
   */
  projects: '10+',

  /**
   * Configuração de contato (importada de meta.ts)
   */
  contact: CONTACT_CONFIG,

  /**
   * Stack tecnológica
   */
  technologies: TECHNOLOGIES,

  /**
   * Links de redes sociais
   */
  ...SOCIAL_LINKS,
} as const;

/**
 * Autor do site
 */
export const AUTHOR = {
  name: 'Rainer Teixeira',
  role: 'Desenvolvedor Full-Stack',
  email: 'suporte@rainersoft.com.br',
} as const;

/**
 * Helper para criar configuração de SEO
 * Movido para meta.ts para evitar dependência circular
 */
