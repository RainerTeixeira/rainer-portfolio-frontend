/**
 * Constantes de Design Tokens
 *
 * Arquivo centralizado com tokens de design mais utilizados no frontend.
 * Fornece acesso tipado e documentado aos tokens da biblioteca @rainersoft/design-tokens.
 *
 * @module constants/design-tokens
 * @fileoverview Constantes de design tokens para o frontend
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 2.1.0
 */

import { tokens } from '@rainersoft/design-tokens';

/**
 * Acesso seguro aos tokens primitivos
 * Garante fallback para estruturas de tokens diferentes
 */
const primitiveColor = tokens?.primitives?.color ?? {};

/**
 * Cores primitivas do design system
 * Acesso direto às cores base sem transformação por tema
 *
 * @constant {Object}
 * @description Cores fundamentais usadas como base para todas as outras cores
 */
export const PRIMITIVE_COLORS = {
  /** Branco puro */
  white: primitiveColor?.white ?? '#ffffff',
  /** Preto puro */
  black: primitiveColor?.black ?? '#000000',
  /** Transparente */
  transparent: primitiveColor?.transparent ?? 'transparent',
} as const;

/**
 * Escala de cinzas do design system
 * Usada para textos, backgrounds e bordas
 *
 * @constant {Object}
 * @description Escala completa de cinzas neutros (50-900)
 */
const grayScale = primitiveColor?.gray ?? {};
export const GRAY_SCALE = {
  50: grayScale?.[50] ?? '#f9fafb',
  100: grayScale?.[100] ?? '#f3f4f6',
  200: grayScale?.[200] ?? '#e5e7eb',
  300: grayScale?.[300] ?? '#d1d5db',
  400: grayScale?.[400] ?? '#9ca3af',
  500: grayScale?.[500] ?? '#6b7280',
  600: grayScale?.[600] ?? '#4b5563',
  700: grayScale?.[700] ?? '#374151',
  800: grayScale?.[800] ?? '#1f2937',
  900: grayScale?.[900] ?? '#111827',
} as const;

/**
 * Cores de marca/primárias (azul)
 * Usadas para elementos interativos e ações principais
 *
 * @constant {Object}
 * @description Escala de azul para botões, links e destaque
 */
const blueScale = primitiveColor?.blue ?? {};
export const BRAND_COLORS = {
  50: blueScale?.[50] ?? '#f0f9ff',
  100: blueScale?.[100] ?? '#e0f2fe',
  200: blueScale?.[200] ?? '#bae6fd',
  300: blueScale?.[300] ?? '#7dd3fc',
  400: blueScale?.[400] ?? '#38bdf8',
  500: blueScale?.[500] ?? '#0ea5e9',
  600: blueScale?.[600] ?? '#0284c7',
  700: blueScale?.[700] ?? '#0369a1',
  800: blueScale?.[800] ?? '#075985',
  900: blueScale?.[900] ?? '#0c4a6e',
} as const;

/**
 * Cores de destaque (roxo)
 * Usadas para elementos premium e diferenciação visual
 *
 * @constant {Object}
 * @description Escala de roxo para elementos especiais
 */
const purpleScale = primitiveColor?.purple ?? {};
export const ACCENT_COLORS = {
  50: purpleScale?.[50] ?? '#faf5ff',
  100: purpleScale?.[100] ?? '#f3e8ff',
  200: purpleScale?.[200] ?? '#e9d5ff',
  300: purpleScale?.[300] ?? '#d8b4fe',
  400: purpleScale?.[400] ?? '#c084fc',
  500: purpleScale?.[500] ?? '#a855f7',
  600: purpleScale?.[600] ?? '#9333ea',
  700: purpleScale?.[700] ?? '#7c3aed',
  800: purpleScale?.[800] ?? '#6b21a8',
  900: purpleScale?.[900] ?? '#581c87',
} as const;

/**
 * Cores de status/feedback
 * Usadas para mensagens de sucesso, erro, aviso e informação
 *
 * @constant {Object}
 * @description Cores semânticas para feedback do usuário
 */
const greenScale = primitiveColor?.green ?? {};
const redScale = primitiveColor?.red ?? {};
export const STATUS_COLORS = {
  /** Sucesso - verde */
  success: {
    light: greenScale?.[50] ?? '#f0fdf4',
    default: greenScale?.[500] ?? '#22c55e',
    dark: greenScale?.[700] ?? '#15803d',
  },
  /** Erro - vermelho */
  error: {
    light: redScale?.[50] ?? '#fef2f2',
    default: redScale?.[500] ?? '#ef4444',
    dark: redScale?.[700] ?? '#b91c1c',
  },
  /** Aviso - amarelo/laranja */
  warning: {
    light: redScale?.[50] ?? '#fef2f2',
    default: redScale?.[400] ?? '#f87171',
    dark: redScale?.[600] ?? '#dc2626',
  },
  /** Informação - azul */
  info: {
    light: blueScale?.[50] ?? '#f0f9ff',
    default: blueScale?.[500] ?? '#0ea5e9',
    dark: blueScale?.[700] ?? '#0369a1',
  },
} as const;

/**
 * Cores para gráficos e visualizações
 * Paleta otimizada para distinção visual em charts
 *
 * @constant {string[]}
 * @description Array de cores para séries de dados em gráficos
 */
export const CHART_COLORS = [
  blueScale?.[500] ?? '#0ea5e9',
  greenScale?.[500] ?? '#22c55e',
  purpleScale?.[500] ?? '#a855f7',
  redScale?.[400] ?? '#f87171',
  blueScale?.[300] ?? '#7dd3fc',
  greenScale?.[400] ?? '#4ade80',
] as const;

/**
 * Tokens de espaçamento
 * Valores padrão para margin, padding e gap
 *
 * @constant {Object}
 * @description Escala de espaçamento baseada em grid de 8pt
 */
const primitiveSpacing = tokens?.primitives?.spacing ?? {};
export const SPACING = primitiveSpacing ?? {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
};

/**
 * Tokens de border-radius
 * Valores padrão para arredondamento de cantos
 *
 * @constant {Object}
 * @description Escala de arredondamento para componentes
 */
const primitiveRadius = tokens?.primitives?.radius ?? {};
export const RADIUS = primitiveRadius ?? {
  none: '0px',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

/**
 * Tokens de tipografia
 * Tamanhos de fonte e pesos padronizados
 *
 * @constant {Object}
 * @description Escala tipográfica do design system
 */
const primitiveTypography = tokens?.primitives?.typography ?? {};
export const TYPOGRAPHY = {
  fontSize: primitiveTypography?.fontSize ?? {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: primitiveTypography?.fontWeight ?? {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
