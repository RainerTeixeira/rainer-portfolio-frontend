/**
 * Skills with Icons
 *
 * Combina dados de SKILLS_DATA com ícones React.
 * Este arquivo é usado para criar SKILLS completo com ícones.
 *
 * @module components/icons/skills/skills-with-icons
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import type { SkillItemData } from '@/constants/data/skills';
import { SKILLS_DATA } from '@/constants/data/skills';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import React from 'react';
import { SKILL_ICONS } from './index';

/**
 * Item de tecnologia com ícone React
 */
export interface SkillItem {
  fullName: string;
  category: string;
  color: string;
  icon: React.ReactElement;
}

/**
 * Skills/Tecnologias com ícones React
 *
 * Combina os dados de SKILLS_DATA com os ícones SVG React.
 * As cores vêm do SKILLS_DATA que usa tokens GRADIENTS da biblioteca.
 */
export const SKILLS: ReadonlyArray<SkillItem> = SKILLS_DATA.map(
  (skill: SkillItemData) => {
    const IconComponent = SKILL_ICONS[skill.iconName];
    const icon = IconComponent ? (
      <IconComponent className="w-full h-full" />
    ) : (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );

    return {
      fullName: skill.fullName,
      category: skill.category,
      color: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${skill.color}`,
      icon,
    };
  }
) as ReadonlyArray<SkillItem>;
