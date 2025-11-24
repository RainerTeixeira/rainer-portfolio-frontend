/**
 * @fileoverview Projetos do portfólio
 * @module constants/home/portfolio
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Lista de projetos desenvolvidos para
 * demonstração de habilidades técnicas.
 */

import { GRADIENTS } from '@rainersoft/design-tokens';

/**
 * Projetos em destaque
 * @constant
 * @description Principais projetos do portfólio
 */
export const PROJETOS = [
  {
    titulo: 'Sistema de Design Tokens',
    subtitulo: 'NPM Package',
    descricao: 'Biblioteca TypeScript publicada no NPM. ' +
               'Sistema completo com temas e documentação Storybook.',
    tecnologias: ['TypeScript', 'Storybook', 'NPM'],
    destaque: true,
    link: 'https://npm.im/@rainersoft/design-tokens',
    github: 'https://github.com/rainerteixeira/design-tokens',
    gradiente: GRADIENTS.PRIMARY,
  },
  {
    titulo: 'Dashboard Criptomoedas',
    subtitulo: 'Análise em Tempo Real',
    descricao: 'Painel para monitoramento de criptomoedas. ' +
               'Atualizações via WebSocket e gráficos interativos.',
    tecnologias: ['Next.js', 'WebSocket', 'PostgreSQL'],
    destaque: true,
    link: '#',
    github: '#',
    gradiente: GRADIENTS.SECONDARY,
  },
  {
    titulo: 'Planejador Financeiro',
    subtitulo: 'Gestão Patrimonial',
    descricao: 'Sistema completo para planejamento financeiro. ' +
               'Dashboard com projeções e relatórios.',
    tecnologias: ['React', 'Node.js', 'Prisma'],
    destaque: true,
    link: '#',
    github: '#',
    gradiente: GRADIENTS.ACCENT,
  },
] as const;

/**
 * Métricas dos projetos
 * @constant
 * @description Estatísticas de performance
 */
export const METRICAS_PROJETOS = {
  total: 15,
  emProducao: 12,
  lighthouseMedia: 95,
  clientesSatisfeitos: '100%',
} as const;
