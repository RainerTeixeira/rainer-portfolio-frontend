/**
 * Services Data
 *
 * Dados dos serviços oferecidos.
 *
 * @module constants/data/services
 * @author Rainer Teixeira
 * @version 2.0.0
 */

/**
 * Item de serviço oferecido
 */
export interface ServiceItem {
  fullName: string;
  icon: string;
  description: string;
}

/**
 * Configuração de ícone
 */
export interface IconConfig {
  icon: string;
  description?: string;
}

/**
 * Serviços oferecidos (usado no footer e outras seções)
 */
export const SERVICES_DATA: ReadonlyArray<ServiceItem> = [
  {
    fullName: 'Aplicações Web Full-Stack Completas',
    icon: 'Globe',
    description:
      'Sistemas web profissionais com React, Next.js, TypeScript, autenticação, ' +
      'dashboards administrativos e integrações com APIs. Código enterprise-grade.',
  },
  {
    fullName: 'Dashboards & Painéis Administrativos',
    icon: 'Zap',
    description:
      'Sistemas de gestão com gráficos em tempo real, CRUD completo, autenticação JWT, ' +
      'editor WYSIWYG e interface moderna e responsiva.',
  },
  {
    fullName: 'PWAs & Aplicações Offline-First',
    icon: 'Users',
    description:
      'Progressive Web Apps instaláveis que funcionam sem internet, com service workers, ' +
      'cache inteligente e experiência nativa.',
  },
  {
    fullName: 'APIs REST & Backend Node.js',
    icon: 'Cloud',
    description:
      'APIs robustas com Node.js, NestJS, Express, PostgreSQL/MongoDB, Prisma ORM, ' +
      'validações Zod e deploy com Docker.',
  },
  {
    fullName: 'Desenvolvimento Sob Medida',
    icon: 'Layers',
    description:
      'Projetos personalizados full-stack do zero. Arquitetura escalável, código limpo, ' +
      'documentação completa e suporte técnico.',
  },
] as const;

/**
 * Configuração do Footer
 */
export const FOOTER_CONFIG = {
  contact: {
    title: 'Contato',
    email: { icon: 'Mail' },
    phone: { icon: 'Phone' },
    location: { icon: 'MapPin' },
  },

  services: {
    title: 'Soluções Desenvolvidas',
    items: SERVICES_DATA,
  },

  links: {
    title: 'Links',
    github: {
      icon: 'Github',
      description: 'Projetos open source',
    },
    linkedin: {
      icon: 'Linkedin',
      description: 'Perfil profissional',
    },
    portfolio: {
      icon: 'ExternalLink',
      description: 'Website oficial',
    },
  },
} as const;
