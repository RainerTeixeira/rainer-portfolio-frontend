/**
 * Metrics Data
 *
 * Dados das métricas profissionais.
 *
 * @module constants/data/metrics
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { GRADIENTS } from '@rainersoft/design-tokens';
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
 * Usando recursos da biblioteca @rainersoft/design-tokens
 */
export const PROFESSIONAL_METRICS: ReadonlyArray<ProfessionalMetric> = [
  {
    icon: Monitor,
    value: SITE_CONFIG.projects,
    label: 'Projetos Completos',
    gradient: `bg-gradient-to-r from-cyan-500 to-blue-500`,
    iconColor: `bg-gradient-to-r from-cyan-500 to-blue-500`,
  },
  {
    icon: Code2,
    value: '50K+',
    label: 'Linhas de Código',
    gradient: `bg-gradient-to-r ${GRADIENTS.DECORATIVE_GREEN_EMERALD}`,
    iconColor: `bg-gradient-to-r ${GRADIENTS.DECORATIVE_GREEN_EMERALD}`,
  },
  {
    icon: Zap,
    value: '20+',
    label: 'Tecnologias',
    gradient: `bg-gradient-to-r from-orange-500 to-amber-500`,
    iconColor: `bg-gradient-to-r from-orange-500 to-amber-500`,
  },
  {
    icon: Zap,
    value: '95+',
    label: 'Lighthouse Score',
    gradient: `bg-gradient-to-r ${GRADIENTS.BUTTON_PURPLE_PINK}`,
    iconColor: `bg-gradient-to-r ${GRADIENTS.BUTTON_PURPLE_PINK}`,
  },
] as const;
