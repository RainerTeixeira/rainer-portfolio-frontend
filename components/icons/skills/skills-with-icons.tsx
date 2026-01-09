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
import { SKILL_ICONS } from './registry';

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
      <div className="w-full h-full flex items-center justify-center text-xs">?</div>
    );

    return {
      fullName: skill.fullName,
      category: skill.category,
      color: `to right, ${skill.color}`,
      icon,
    };
  }
) as ReadonlyArray<SkillItem>;


