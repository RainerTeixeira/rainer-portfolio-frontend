/**
 * @fileoverview Serviços oferecidos
 * @module constants/home/servicos
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Lista de serviços profissionais oferecidos,
 * incluindo descrições e características.
 */

// Cores para os serviços
const SERVICE_COLORS = {
  primary: '#0891b2',    // cyan-600
  secondary: '#9333ea',  // purple-600 
  accent: '#db2777',     // pink-600
  success: '#059669',    // emerald-600
} as const;

/**
 * Lista de serviços
 * @constant
 * @description Serviços principais oferecidos
 */
export const SERVICOS = [
  {
    titulo: 'Aplicações Web Full-Stack',
    descricao: 'Desenvolvimento completo com React, Next.js e Node.js. ' +
               'Inclui autenticação, PWA e dashboard administrativo.',
    badge: 'Mais Procurado',
    caracteristicas: [
      'React 19 + Next.js 15',
      'TypeScript + Node.js',
      'PostgreSQL + Prisma',
      'Deploy Profissional',
    ],
    icone: 'Globe',
    cor: SERVICE_COLORS.primary,
  },
  {
    titulo: 'Dashboards Interativos',
    descricao: 'Painéis administrativos que transformam dados em insights. ' +
               'Gráficos dinâmicos e relatórios exportáveis.',
    badge: 'Alta Demanda',
    caracteristicas: [
      'Gráficos Interativos',
      'Filtros Inteligentes',
      'Tempo Real',
      'Export Excel/PDF',
    ],
    icone: 'BarChart',
    cor: SERVICE_COLORS.secondary,
  },
  {
    titulo: 'PWAs e Performance',
    descricao: 'Progressive Web Apps rápidas como apps nativos. ' +
               'Funcionam offline e são instaláveis.',
    badge: 'Performance',
    caracteristicas: [
      'Carregamento < 2s',
      'Funciona Offline',
      'SEO Otimizado',
      'Mobile First',
    ],
    icone: 'Zap',
    cor: SERVICE_COLORS.accent,
  },
  {
    titulo: 'APIs REST Escaláveis',
    descricao: 'APIs profissionais com Node.js. ' +
               'Autenticação JWT e documentação Swagger.',
    badge: 'Backend',
    caracteristicas: [
      'Node.js + NestJS',
      'Documentação Swagger',
      'Integrações',
      'Escalável',
    ],
    icone: 'Server',
    cor: SERVICE_COLORS.success,
  },
] as const;

/**
 * Diferenciais técnicos
 * @constant
 * @description Vantagens competitivas
 */
export const DIFERENCIAIS = [
  {
    titulo: 'Código Limpo',
    descricao: 'TypeScript com arquitetura modular e documentação completa.',
    icone: 'Code',
  },
  {
    titulo: 'Performance',
    descricao: 'Sites rápidos com Lighthouse Score 95+ garantido.',
    icone: 'Zap',
  },
  {
    titulo: 'Segurança',
    descricao: 'Autenticação JWT e proteção contra ataques XSS/CSRF.',
    icone: 'Shield',
  },
  {
    titulo: 'Escalabilidade',
    descricao: 'Arquitetura preparada para crescer com seu negócio.',
    icone: 'TrendingUp',
  },
] as const;
