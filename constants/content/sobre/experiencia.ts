/**
 * @fileoverview Experiência profissional
 * @module constants/content/sobre/experiencia
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Timeline de experiência e habilidades
 * técnicas do desenvolvedor.
 */

/**
 * Cores para experiência (tokens do tema claro)
 */
const EXPERIENCE_COLORS = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  accent: '#ec4899',
} as const;

/**
 * Jornada de desenvolvimento e aprendizado
 * @constant
 * @description Timeline de evolução técnica real
 */
export const JORNADA_TECNICA = [
  {
    periodo: '2024 - Presente',
    titulo: 'Criação do Ecossistema @rainersoft',
    descricao: 'Desenvolvimento e publicação de bibliotecas NPM em produção. ' +
               'Design Tokens W3C, componentes React acessíveis e utilitários TypeScript.',
    conquistas: ['3 bibliotecas NPM', '100% cobertura de testes', 'Código open source'],
    cor: EXPERIENCE_COLORS.primary,
  },
  {
    periodo: '2023 - 2024',
    titulo: 'Especialização Full-Stack',
    descricao: 'Aprofundamento em React, Next.js e Node.js. ' +
               'Desenvolvimento de aplicações completas com arquitetura escalável.',
    conquistas: ['React 19', 'Next.js 15', 'TypeScript avançado'],
    cor: EXPERIENCE_COLORS.secondary,
  },
  {
    periodo: '2022 - 2023',
    titulo: 'Fundamentos Sólidos',
    descricao: 'Construção de base técnica sólida em desenvolvimento web. ' +
               'JavaScript moderno, HTML semântico e CSS avançado.',
    conquistas: ['JavaScript ES6+', 'Git workflow', 'Responsive design'],
    cor: EXPERIENCE_COLORS.accent,
  },
] as const;

export const HISTORIA_EMPRESA = JORNADA_TECNICA;

export const EXPERIENCIA = HISTORIA_EMPRESA;

/**
 * Capacidades técnicas da Rainer Soft
 * @constant
 * @description Stack tecnológica e serviços
 */
export const CAPACIDADES = {
  'Desenvolvimento Web': [
    'React 19',
    'Next.js 15',
    'Vue.js 3',
    'Angular 17',
    'TypeScript',
  ],
  'Mobile & Desktop': [
    'React Native',
    'Flutter',
    'Ionic',
    'Electron',
    'PWA',
  ],
  'Backend & APIs': [
    'Node.js',
    'Python',
    'Java Spring',
    'Go',
    '.NET Core',
  ],
  'Cloud & DevOps': [
    'AWS',
    'Google Cloud',
    'Azure',
    'Kubernetes',
    'Docker',
  ],
  'AI & Data Science': [
    'Machine Learning',
    'Computer Vision',
    'NLP',
    'Big Data',
    'Business Intelligence',
  ],
  'Segurança': [
    'ISO 27001',
    'LGPD',
    'OWASP',
    'Pen Testing',
    'SOC 2',
  ],
} as const;

export const HABILIDADES = CAPACIDADES;

/**
 * Métricas técnicas reais e comprováveis
 * @constant
 * @description Números baseados em projetos e código real
 */
export const METRICAS_TECNICAS = [
  {
    value: '3',
    label: 'Bibliotecas NPM publicadas',
    gradient: `from-${EXPERIENCE_COLORS.primary} to-${EXPERIENCE_COLORS.primary}`,
    iconColor: EXPERIENCE_COLORS.primary,
  },
  {
    value: '320+',
    label: 'Testes automatizados escritos',
    gradient: `from-${EXPERIENCE_COLORS.secondary} to-${EXPERIENCE_COLORS.secondary}`,
    iconColor: EXPERIENCE_COLORS.secondary,
  },
  {
    value: '100%',
    label: 'Cobertura de testes em projetos críticos',
    gradient: `from-${EXPERIENCE_COLORS.accent} to-${EXPERIENCE_COLORS.accent}`,
    iconColor: EXPERIENCE_COLORS.accent,
  },
  {
    value: '98+',
    label: 'Lighthouse Score médio',
    gradient: `from-${EXPERIENCE_COLORS.primary} to-${EXPERIENCE_COLORS.primary}`,
    iconColor: EXPERIENCE_COLORS.primary,
  },
] as const;

export const METRICAS_CORPORATIVAS = METRICAS_TECNICAS;

export const PROFESSIONAL_METRICS = METRICAS_CORPORATIVAS;

/**
 * Formação e aprendizado contínuo
 * @constant
 * @description Cursos e estudos realizados
 */
export const FORMACAO_CONTINUA = [
  {
    titulo: 'React - The Complete Guide',
    instituicao: 'Udemy',
    ano: 2023,
    tipo: 'Curso',
  },
  {
    titulo: 'Next.js & React',
    instituicao: 'Maximilian Schwarzmüller',
    ano: 2024,
    tipo: 'Curso',
  },
  {
    titulo: 'TypeScript Complete',
    instituicao: 'Frontend Masters',
    ano: 2023,
    tipo: 'Curso',
  },
  {
    titulo: 'Node.js Microservices',
    instituicao: 'Stephen Grider',
    ano: 2023,
    tipo: 'Curso',
  },
  {
    titulo: 'Clean Code & Architecture',
    instituicao: 'Robert C. Martin',
    ano: 2023,
    tipo: 'Livro',
  },
  {
    titulo: 'System Design',
    instituicao: 'Educative.io',
    ano: 2024,
    tipo: 'Curso',
  },
] as const;

export const CERTIFICACOES = FORMACAO_CONTINUA;

export const FORMACAO = CERTIFICACOES;

/**
 * Perfil profissional
 * @constant
 */
export const PERFIL_PROFISSIONAL = [
  {
    nome: 'Rainer Teixeira',
    cargo: 'Desenvolvedor Full-Stack',
    bio: 'Desenvolvedor focado em criar soluções técnicas robustas. Especialista em React, Next.js e Node.js com projetos open source publicados.',
    linkedin: 'https://linkedin.com/in/rainerteixeira',
    github: 'https://github.com/rainerteixeira',
    npm: 'https://www.npmjs.com/~rainerteixeira',
  },
] as const;

export const LIDERANCA = PERFIL_PROFISSIONAL;

