/**
 * Metrics Data
 *
 * Dados das métricas profissionais.
 *
 * @module constants/data/metrics
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { GRADIENTS, GRADIENT_DIRECTIONS } from '@rainer/design-tokens';
import { Code2, Monitor, Zap } from 'lucide-react';
import React from 'react';
import { SITE_CONFIG } from '../site/config';

// SITE_CONFIG é usado apenas para valores dinâmicos (experience, projects)

/**
 * Item de métrica profissional
 */
export interface ProfessionalMetric {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  gradient: string;
  iconColor: string;
}

/**
 * Dados das métricas profissionais (usado na página sobre)
 */
export const PROFESSIONAL_METRICS: ReadonlyArray<ProfessionalMetric> = [
  {
    icon: Monitor,
    value: SITE_CONFIG.projects,
    label: 'Projetos Completos',
    gradient: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.CYAN_BLUE} dark:${GRADIENTS.CYAN_BLUE_DARK}`,
    iconColor: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.CYAN_BLUE} dark:${GRADIENTS.CYAN_BLUE_DARK}`,
  },
  {
    icon: Code2,
    value: '50K+',
    label: 'Linhas de Código',
    gradient: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.GREEN_EMERALD} dark:${GRADIENTS.GREEN_EMERALD_DARK}`,
    iconColor: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.GREEN_EMERALD} dark:${GRADIENTS.GREEN_EMERALD_DARK}`,
  },
  {
    icon: Zap,
    value: '20+',
    label: 'Tecnologias',
    gradient: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.ORANGE_AMBER} dark:${GRADIENTS.ORANGE_AMBER_DARK}`,
    iconColor: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.ORANGE_AMBER} dark:${GRADIENTS.ORANGE_AMBER_DARK}`,
  },
  {
    icon: Zap,
    value: '95+',
    label: 'Lighthouse Score',
    gradient: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.PURPLE_PINK} dark:${GRADIENTS.PURPLE_PINK_DARK}`,
    iconColor: `${GRADIENT_DIRECTIONS.TO_RIGHT} ${GRADIENTS.PURPLE_PINK} dark:${GRADIENTS.PURPLE_PINK_DARK}`,
  },
] as const;
