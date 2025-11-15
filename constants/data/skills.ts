/**
 * Skills Data
 *
 * Dados das tecnologias/skills usando tokens GRADIENTS da biblioteca.
 *
 * @module constants/data/skills
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { GRADIENTS } from '@rainer/design-tokens';

/**
 * Item de tecnologia (dados puros, ícones devem ser renderizados no componente)
 */
export interface SkillItemData {
  fullName: string;
  category: string;
  color: string; // Classe Tailwind usando tokens GRADIENTS da biblioteca
  iconName: string; // Nome do ícone para renderização separada
}

/**
 * Skills/Tecnologias com dados puros
 *
 * Array contendo todas as tecnologias dominadas com seus respectivos
 * dados (nome, categoria, cor). As cores usam tokens GRADIENTS da biblioteca.
 * Os ícones SVG devem ser renderizados separadamente nos componentes.
 */
export const SKILLS_DATA: ReadonlyArray<SkillItemData> = [
  {
    fullName: 'React',
    category: 'Frontend',
    color: `bg-gradient-to-r ${GRADIENTS.BUTTON_CYAN_BLUE}`,
    iconName: 'React',
  },
  {
    fullName: 'Next.js',
    category: 'Framework',
    color: `bg-gradient-to-r from-gray-500 to-gray-700`,
    iconName: 'NextJS',
  },
  {
    fullName: 'TypeScript',
    category: 'Language',
    color: `bg-gradient-to-r from-blue-500 to-blue-700`,
    iconName: 'TypeScript',
  },
  {
    fullName: 'Tailwind CSS',
    category: 'Styling',
    color: `bg-gradient-to-r ${GRADIENTS.BUTTON_CYAN_BLUE}`,
    iconName: 'Tailwind',
  },
  {
    fullName: 'Node.js',
    category: 'Backend',
    color: `bg-gradient-to-r ${GRADIENTS.DECORATIVE_GREEN_EMERALD}`,
    iconName: 'NodeJS',
  },
  {
    fullName: 'PostgreSQL',
    category: 'Database',
    color: `bg-gradient-to-r from-blue-600 to-blue-800`,
    iconName: 'PostgreSQL',
  },
  {
    fullName: 'MongoDB',
    category: 'Database',
    color: `bg-gradient-to-r ${GRADIENTS.DECORATIVE_GREEN_EMERALD}`,
    iconName: 'MongoDB',
  },
  {
    fullName: 'Docker',
    category: 'DevOps',
    color: `bg-gradient-to-r from-blue-500 to-blue-700`,
    iconName: 'Docker',
  },
  {
    fullName: 'AWS',
    category: 'Cloud',
    color: `bg-gradient-to-r from-orange-500 to-amber-500`,
    iconName: 'AWS',
  },
  {
    fullName: 'Git',
    category: 'Tools',
    color: `bg-gradient-to-r from-red-500 to-red-700`,
    iconName: 'Git',
  },
  {
    fullName: 'GraphQL',
    category: 'Backend',
    color: `bg-gradient-to-r ${GRADIENTS.BUTTON_PURPLE_PINK}`,
    iconName: 'GraphQL',
  },
  {
    fullName: 'Prisma',
    category: 'ORM',
    color: `bg-gradient-to-r ${GRADIENTS.BUTTON_PURPLE_PINK}`,
    iconName: 'Prisma',
  },
] as const;
