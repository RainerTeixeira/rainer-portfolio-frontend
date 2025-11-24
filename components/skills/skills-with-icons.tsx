/**
 * Skills with Icons
 *
 * Combina dados de SKILLS_DATA com ícones React.
 * Este arquivo é usado para criar SKILLS completo com ícones.
 *
 * @module components/skills/skills-with-icons
 * @version 1.0.0
 */

import React from 'react';
import type { SkillItemData } from '@/constants';
import { SKILLS_DATA } from '@/constants';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import { SiteIcon } from '@/components/providers/icons-provider';

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
    const icon = (
      <SiteIcon
        name={skill.iconName}
        className="w-full h-full"
      />
    );

    return {
      fullName: skill.fullName,
      category: skill.category,
      color: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${skill.color}`,
      icon,
    };
  }
) as ReadonlyArray<SkillItem>;
