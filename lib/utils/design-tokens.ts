/**
 * Design Tokens Utils
 *
 * Utilitários para trabalhar com design tokens da biblioteca @rainer/design-tokens.
 * Fornece funções para converter cores HEX para HSL, RGB e outras transformações necessárias.
 *
 * @fileoverview Utilitários para design tokens
 * @author Rainer Teixeira
 * @version 4.0.0
 */

// ============================================================================
// Color Conversion
// ============================================================================

/**
 * Converte uma cor HEX para HSL no formato esperado pelo Tailwind CSS
 *
 * @param hex - Cor em formato hexadecimal (#RRGGBB)
 * @returns String no formato "H S% L%" (sem hsl() wrapper)
 *
 * @example
 * ```ts
 * hexToHSL('#0891b2') // "188 85.7% 53.3%"
 * ```
 */
export function hexToHSL(hex: string): string {
  // Remove o # se presente
  const cleanHex = hex.replace('#', '');

  // Converte para RGB
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  // Encontra o máximo e mínimo
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calcula luminosidade
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Converte para graus e porcentagem
  const hDeg = Math.round(h * 360);
  const sPercent = Math.round(s * 100 * 10) / 10;
  const lPercent = Math.round(l * 100 * 10) / 10;

  return `${hDeg} ${sPercent}% ${lPercent}%`;
}

/**
 * Converte múltiplas cores HEX para HSL
 *
 * @param colors - Objeto com cores em formato hexadecimal
 * @returns Objeto com cores em formato HSL
 *
 * @example
 * ```ts
 * const colors = {
 *   primary: '#0891b2',
 *   secondary: '#9333ea'
 * };
 *
 * hexColorsToHSL(colors)
 * // { primary: "188 85.7% 53.3%", secondary: "271 91.0% 55.3%" }
 * ```
 */
export function hexColorsToHSL<T extends Record<string, string>>(
  colors: T
): Record<keyof T, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(colors)) {
    result[key] = hexToHSL(value);
  }

  return result as Record<keyof T, string>;
}

/**
 * Converte uma cor HEX para RGB
 *
 * @param hex - Cor em formato hexadecimal (#RRGGBB)
 * @returns String no formato "r, g, b" (sem rgb() wrapper)
 *
 * @example
 * ```ts
 * hexToRGB('#0891b2') // "8, 145, 178"
 * ```
 */
export function hexToRGB(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Converte uma cor HEX para RGBA
 *
 * @param hex - Cor em formato hexadecimal (#RRGGBB)
 * @param alpha - Valor de alpha (0-1)
 * @returns String no formato "rgba(r, g, b, a)"
 *
 * @example
 * ```ts
 * hexToRGBA('#0891b2', 0.7) // "rgba(8, 145, 178, 0.7)"
 * ```
 */
export function hexToRGBA(hex: string, alpha: number): string {
  const rgb = hexToRGB(hex);
  return `rgba(${rgb}, ${alpha})`;
}

// ============================================================================
// Color Constants
// ============================================================================

/**
 * Obtém cores primitivas como valores hex
 *
 * Utilitário para acessar cores primitivas usando valores hex padrão do Tailwind CSS.
 * Essas cores são mapeadas pelos tokens da biblioteca @rainer/design-tokens via Tailwind config.
 * Útil para uso em estilos inline, canvas, etc.
 *
 * NOTA: A biblioteca v4.0.0 não exporta mais COLOR_* diretamente.
 * Use as classes Tailwind ou CSS variables para acessar as cores.
 */
export const COLOR_HEX = {
  // Cores primárias (baseadas na paleta Tailwind padrão)
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9f1239',
    900: '#831843',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

/**
 * Obtém cores primitivas como valores RGB
 *
 * Utilitário para acessar cores primitivas como valores RGB,
 * útil para uso em estilos inline com alpha.
 */
export const COLOR_RGB = {
  cyan: Object.fromEntries(
    Object.entries(COLOR_HEX.cyan).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_HEX.cyan, string>,
  purple: Object.fromEntries(
    Object.entries(COLOR_HEX.purple).map(([key, value]) => [
      key,
      hexToRGB(value),
    ])
  ) as Record<keyof typeof COLOR_HEX.purple, string>,
  pink: Object.fromEntries(
    Object.entries(COLOR_HEX.pink).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_HEX.pink, string>,
  blue: Object.fromEntries(
    Object.entries(COLOR_HEX.blue).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_HEX.blue, string>,
  green: Object.fromEntries(
    Object.entries(COLOR_HEX.green).map(([key, value]) => [
      key,
      hexToRGB(value),
    ])
  ) as Record<keyof typeof COLOR_HEX.green, string>,
  orange: Object.fromEntries(
    Object.entries(COLOR_HEX.orange).map(([key, value]) => [
      key,
      hexToRGB(value),
    ])
  ) as Record<keyof typeof COLOR_HEX.orange, string>,
  red: Object.fromEntries(
    Object.entries(COLOR_HEX.red).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_HEX.red, string>,
  amber: Object.fromEntries(
    Object.entries(COLOR_HEX.amber).map(([key, value]) => [
      key,
      hexToRGB(value),
    ])
  ) as Record<keyof typeof COLOR_HEX.amber, string>,
  emerald: Object.fromEntries(
    Object.entries(COLOR_HEX.emerald).map(([key, value]) => [
      key,
      hexToRGB(value),
    ])
  ) as Record<keyof typeof COLOR_HEX.emerald, string>,
  neutral: Object.fromEntries(
    Object.entries(COLOR_HEX.neutral).map(([key, value]) => [
      key,
      hexToRGB(value),
    ])
  ) as Record<keyof typeof COLOR_HEX.neutral, string>,
} as const;
