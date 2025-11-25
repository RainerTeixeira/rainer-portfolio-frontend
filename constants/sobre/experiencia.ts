/**
 * @fileoverview Experiência profissional
 * @module constants/sobre/experiencia
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Timeline de experiência e habilidades
 * técnicas do desenvolvedor.
 */

// Cores para experiência
const EXPERIENCE_COLORS = {
  primary: '#0891b2',    // cyan-600
  secondary: '#9333ea',  // purple-600
  accent: '#db2777',     // pink-600
} as const;

/**
 * Histórico profissional
 * @constant
 * @description Timeline de experiência
 */
export const EXPERIENCIA = [
  {
    periodo: '2023 - Presente',
    cargo: 'Desenvolvedor Full-Stack',
    descricao: 'Desenvolvimento de aplicações web profissionais com React e Next.js. ' +
               'Projetos em produção com Lighthouse Score 95+.',
    tecnologias: ['React 19', 'Next.js 15', 'TypeScript', 'Node.js'],
    cor: EXPERIENCE_COLORS.primary,
  },
  {
    periodo: '2022 - 2023',
    cargo: 'Especialização em Stack Moderna',
    descricao: 'Domínio completo da stack JavaScript/TypeScript. ' +
               'Frontend, backend e bancos de dados.',
    tecnologias: ['React', 'Node.js', 'PostgreSQL', 'MongoDB'],
    cor: EXPERIENCE_COLORS.secondary,
  },
  {
    periodo: '2021 - 2022',
    cargo: 'Fundação Técnica',
    descricao: 'Base sólida em desenvolvimento web. ' +
               'JavaScript ES6+, HTML5 e CSS3 moderno.',
    tecnologias: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
    cor: EXPERIENCE_COLORS.accent,
  },
] as const;

/**
 * Habilidades técnicas
 * @constant
 * @description Stack tecnológica dominada
 */
export const HABILIDADES = {
  frontend: [
    'React 19',
    'Next.js 15',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
  ],
  backend: [
    'Node.js',
    'NestJS',
    'Express',
    'Fastify',
    'Prisma ORM',
  ],
  database: [
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'MySQL',
  ],
  ferramentas: [
    'Git',
    'Docker',
    'AWS',
    'Vercel',
    'GitHub Actions',
  ],
} as const;

/**
 * Métricas profissionais exibidas na página Sobre
 * @constant
 * @description Números de impacto do portfólio
 */
export const PROFESSIONAL_METRICS = [
  {
    value: '15+',
    label: 'Projetos reais entregues',
    gradient: `from-${EXPERIENCE_COLORS.primary} to-${EXPERIENCE_COLORS.primary}`,
    iconColor: EXPERIENCE_COLORS.primary,
  },
  {
    value: '100K+',
    label: 'Linhas de código em produção',
    gradient: `from-${EXPERIENCE_COLORS.secondary} to-${EXPERIENCE_COLORS.secondary}`,
    iconColor: EXPERIENCE_COLORS.secondary,
  },
  {
    value: '95+',
    label: 'Score médio no Lighthouse',
    gradient: `from-${EXPERIENCE_COLORS.accent} to-${EXPERIENCE_COLORS.accent}`,
    iconColor: EXPERIENCE_COLORS.accent,
  },
  {
    value: '5+',
    label: 'Anos de experiência focada em web',
    gradient: `from-${EXPERIENCE_COLORS.primary} to-${EXPERIENCE_COLORS.primary}`,
    iconColor: EXPERIENCE_COLORS.primary,
  },
] as const;

/**
 * Certificações e cursos
 * @constant
 * @description Formação e aprimoramento
 */
export const FORMACAO = [
  {
    titulo: 'React Advanced Patterns',
    instituicao: 'Frontend Masters',
    ano: 2023,
  },
  {
    titulo: 'Node.js Microservices',
    instituicao: 'Udemy',
    ano: 2023,
  },
  {
    titulo: 'TypeScript Complete',
    instituicao: 'Rocketseat',
    ano: 2022,
  },
] as const;
