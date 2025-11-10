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
  color: string; // Classe Tailwind usando tokens GRADIENTS
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
    color: GRADIENTS.CYAN_BLUE,
    iconName: 'React',
  },
  {
    fullName: 'Next.js',
    category: 'Framework',
    color: GRADIENTS.GRAY,
    iconName: 'NextJS',
  },
  {
    fullName: 'TypeScript',
    category: 'Language',
    color: GRADIENTS.BLUE,
    iconName: 'TypeScript',
  },
  {
    fullName: 'Tailwind CSS',
    category: 'Styling',
    color: GRADIENTS.CYAN_BLUE,
    iconName: 'Tailwind',
  },
  {
    fullName: 'Node.js',
    category: 'Backend',
    color: GRADIENTS.GREEN_EMERALD,
    iconName: 'NodeJS',
  },
  {
    fullName: 'PostgreSQL',
    category: 'Database',
    color: GRADIENTS.BLUE_DARK,
    iconName: 'PostgreSQL',
  },
  {
    fullName: 'MongoDB',
    category: 'Database',
    color: GRADIENTS.GREEN_EMERALD,
    iconName: 'MongoDB',
  },
  {
    fullName: 'Docker',
    category: 'DevOps',
    color: GRADIENTS.BLUE,
    iconName: 'Docker',
  },
  {
    fullName: 'AWS',
    category: 'Cloud',
    color: GRADIENTS.ORANGE_AMBER,
    iconName: 'AWS',
  },
  {
    fullName: 'Git',
    category: 'Tools',
    color: GRADIENTS.RED,
    iconName: 'Git',
  },
  {
    fullName: 'GraphQL',
    category: 'Backend',
    color: GRADIENTS.PURPLE_PINK,
    iconName: 'GraphQL',
  },
  {
    fullName: 'Prisma',
    category: 'ORM',
    color: GRADIENTS.PURPLE_PINK,
    iconName: 'Prisma',
  },
] as const;
