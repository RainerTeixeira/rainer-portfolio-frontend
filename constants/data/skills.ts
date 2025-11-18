/**
 * Skills Data
 *
 * Dados das tecnologias/skills usando tokens GRADIENTS da biblioteca.
 *
 * @module constants/data/skills
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import {
  GRADIENTS,
  GRADIENT_COMPOSITES,
  GRADIENT_COLORS,
} from '@rainersoft/design-tokens';

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
    color: GRADIENT_COMPOSITES.HORIZONTAL_PRIMARY,
    iconName: 'React',
  },
  {
    fullName: 'Next.js',
    category: 'Framework',
    color: GRADIENT_COLORS.GRAY_SCALE,
    iconName: 'NextJS',
  },
  {
    fullName: 'TypeScript',
    category: 'Language',
    color: GRADIENT_COLORS.BLUE_SCALE,
    iconName: 'TypeScript',
  },
  {
    fullName: 'Tailwind CSS',
    category: 'Styling',
    color: GRADIENT_COMPOSITES.HORIZONTAL_PRIMARY,
    iconName: 'Tailwind',
  },
  {
    fullName: 'Node.js',
    category: 'Backend',
    color: GRADIENT_COMPOSITES.DIAGONAL_GREEN_EMERALD,
    iconName: 'NodeJS',
  },
  {
    fullName: 'PostgreSQL',
    category: 'Database',
    color: GRADIENT_COLORS.BLUE_SCALE,
    iconName: 'PostgreSQL',
  },
  {
    fullName: 'MongoDB',
    category: 'Database',
    color: GRADIENT_COMPOSITES.DIAGONAL_GREEN_EMERALD,
    iconName: 'MongoDB',
  },
  {
    fullName: 'Docker',
    category: 'DevOps',
    color: GRADIENT_COLORS.BLUE_SCALE,
    iconName: 'Docker',
  },
  {
    fullName: 'AWS',
    category: 'Cloud',
    color: GRADIENT_COMPOSITES.HORIZONTAL_SECONDARY,
    iconName: 'AWS',
  },
  {
    fullName: 'Git',
    category: 'Tools',
    color: GRADIENT_COMPOSITES.HORIZONTAL_SECONDARY,
    iconName: 'Git',
  },
  {
    fullName: 'GraphQL',
    category: 'Backend',
    color: GRADIENT_COMPOSITES.HORIZONTAL_SECONDARY,
    iconName: 'GraphQL',
  },
  {
    fullName: 'Prisma',
    category: 'ORM',
    color: GRADIENT_COMPOSITES.HORIZONTAL_SECONDARY,
    iconName: 'Prisma',
  },
] as const;
