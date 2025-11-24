/**
 * @fileoverview Constantes de skills/tecnologias
 * @module constants/comum/skills
 * @version 1.0.0
 * @author Rainer Teixeira
 *
 * @description
 * Lista tipada de tecnologias utilizadas no portfólio, organizada
 * por categoria. Usada em conjunto com os ícones React em
 * `components/icons/skills`.
 */

/**
 * Estrutura de um item de skill
 */
export interface SkillItemData {
  /** Nome completo da tecnologia exibido para o usuário */
  readonly fullName: string;
  /** Categoria (Frontend, Backend, Database, DevOps, Ferramentas) */
  readonly category: string;
  /** Nome do ícone mapeado em SKILL_ICONS (React, NextJS, NodeJS, etc.) */
  readonly iconName: string;
  /** Classe(s) de gradiente/cor base (será combinada com GRADIENT_DIRECTIONS) */
  readonly color: string;
}

/**
 * Lista de tecnologias principais do portfólio
 *
 * Observação: o campo `color` deve usar classes compatíveis
 * com o design system, normalmente combinadas com
 * `GRADIENT_DIRECTIONS` no componente de ícones.
 */
export const SKILLS_DATA: ReadonlyArray<SkillItemData> = [
  {
    fullName: 'React',
    category: 'Frontend',
    iconName: 'React',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    fullName: 'Next.js',
    category: 'Frontend',
    iconName: 'NextJS',
    color: 'from-slate-300 to-slate-500 dark:from-slate-100 dark:to-slate-400',
  },
  {
    fullName: 'TypeScript',
    category: 'Linguagem',
    iconName: 'TypeScript',
    color: 'from-sky-500 to-sky-600',
  },
  {
    fullName: 'Tailwind CSS',
    category: 'Frontend',
    iconName: 'Tailwind',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    fullName: 'Node.js',
    category: 'Backend',
    iconName: 'NodeJS',
    color: 'from-emerald-500 to-green-600',
  },
  {
    fullName: 'PostgreSQL',
    category: 'Database',
    iconName: 'PostgreSQL',
    color: 'from-sky-600 to-blue-700',
  },
  {
    fullName: 'MongoDB',
    category: 'Database',
    iconName: 'MongoDB',
    color: 'from-emerald-500 to-lime-500',
  },
  {
    fullName: 'Prisma ORM',
    category: 'Backend',
    iconName: 'Prisma',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    fullName: 'Docker',
    category: 'DevOps',
    iconName: 'Docker',
    color: 'from-sky-500 to-blue-500',
  },
  {
    fullName: 'AWS',
    category: 'DevOps',
    iconName: 'AWS',
    color: 'from-orange-400 to-amber-500',
  },
  {
    fullName: 'Git & GitHub',
    category: 'Ferramentas',
    iconName: 'Git',
    color: 'from-rose-500 to-orange-500',
  },
  {
    fullName: 'GraphQL',
    category: 'APIs',
    iconName: 'GraphQL',
    color: 'from-pink-500 to-fuchsia-500',
  },
] as const;
