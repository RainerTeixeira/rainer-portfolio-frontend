/**
 * @fileoverview Categorias do blog
 * @module constants/blog/categorias
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Categorias e tags para organização
 * dos artigos do blog.
 */

// Cores para as categorias
const CATEGORY_COLORS = {
  primary: '#0891b2',    // cyan-600
  secondary: '#9333ea',  // purple-600
  accent: '#db2777',     // pink-600
  info: '#2563eb',       // blue-600
  success: '#059669',    // emerald-600
  warning: '#f97316',    // orange-500
} as const;

/**
 * Categorias principais
 * @constant
 * @description Categorias de artigos
 */
export const CATEGORIAS = [
  {
    nome: 'React',
    slug: 'react',
    descricao: 'Artigos sobre React e ecossistema',
    cor: CATEGORY_COLORS.primary,
    icone: 'Code',
  },
  {
    nome: 'Next.js',
    slug: 'nextjs',
    descricao: 'Tutoriais e dicas de Next.js',
    cor: CATEGORY_COLORS.secondary,
    icone: 'Globe',
  },
  {
    nome: 'Node.js',
    slug: 'nodejs',
    descricao: 'Backend e APIs com Node.js',
    cor: CATEGORY_COLORS.accent,
    icone: 'Server',
  },
  {
    nome: 'TypeScript',
    slug: 'typescript',
    descricao: 'TypeScript e tipagem',
    cor: CATEGORY_COLORS.info,
    icone: 'FileCode',
  },
  {
    nome: 'Performance',
    slug: 'performance',
    descricao: 'Otimização e performance web',
    cor: CATEGORY_COLORS.success,
    icone: 'Zap',
  },
  {
    nome: 'DevOps',
    slug: 'devops',
    descricao: 'Deploy, CI/CD e infraestrutura',
    cor: CATEGORY_COLORS.warning,
    icone: 'Package',
  },
] as const;

/**
 * Tags populares
 * @constant
 * @description Tags mais utilizadas
 */
export const TAGS_POPULARES = [
  'tutorial',
  'iniciante',
  'avançado',
  'hooks',
  'api',
  'database',
  'deploy',
  'testing',
  'tips',
  'news',
] as const;

/**
 * Configuração do blog
 * @constant
 * @description Parâmetros gerais
 */
export const CONFIG_BLOG = {
  artigosPorPagina: 9,
  resumoMaxCaracteres: 150,
  tempoLeituraVelocidade: 200, // palavras por minuto
} as const;
