/**
 * Design Tokens Utils
 *
 * Utilitários para trabalhar com design tokens da biblioteca @rainersoft/design-tokens.
 * Fornece funções para converter cores HEX para HSL, RGB e outras transformações necessárias.
 * Usa diretamente as cores da biblioteca @rainersoft/design-tokens para evitar duplicação.
 *
 * @fileoverview Utilitários para design tokens
 * @author Rainer Teixeira
 * @version 4.0.0
 */

import { darkThemeColors, lightThemeColors } from '@rainersoft/design-tokens';

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
// Color Helpers - Extraindo cores diretamente da biblioteca
// ============================================================================

/**
 * Obtém cores semânticas do tema atual
 *
 * Usa diretamente as cores da biblioteca @rainersoft/design-tokens.
 * Prefira usar estas cores semânticas ao invés de cores primitivas.
 *
 * @param theme - 'light' | 'dark' (padrão: 'light')
 * @returns Cores do tema especificado
 */
export function getThemeColors(theme: 'light' | 'dark' = 'light') {
  return theme === 'light' ? lightThemeColors : darkThemeColors;
}

/**
 * Obtém cores primitivas como valores hex
 *
 * NOTA: Estas cores são extraídas diretamente dos tokens primitivos da biblioteca.
 * Todas as cores agora estão disponíveis nos tokens, eliminando valores hardcoded.
 * Prefira usar as cores semânticas da biblioteca através de getThemeColors() quando possível.
 *
 * @deprecated Use getThemeColors() e acesse cores semânticas diretamente
 */
export const COLOR_HEX = {
  // Cores extraídas dos tokens primitivos
  cyan: {
    50: lightThemeColors.primitive.cyan[50],
    100: lightThemeColors.primitive.cyan[100],
    200: lightThemeColors.primitive.cyan[200],
    300: lightThemeColors.primitive.cyan[300],
    400: lightThemeColors.primitive.cyan[400],
    500: lightThemeColors.primitive.cyan[500],
    600: lightThemeColors.primitive.cyan[600],
    700: lightThemeColors.primitive.cyan[700],
    800: lightThemeColors.primitive.cyan[800],
    900: lightThemeColors.primitive.cyan[900],
  },
  purple: {
    50: lightThemeColors.primitive.purple[50],
    100: lightThemeColors.primitive.purple[100],
    200: lightThemeColors.primitive.purple[200],
    300: lightThemeColors.primitive.purple[300],
    400: lightThemeColors.primitive.purple[400],
    500: lightThemeColors.primitive.purple[500],
    600: lightThemeColors.primitive.purple[600],
    700: lightThemeColors.primitive.purple[700],
    800: lightThemeColors.primitive.purple[800],
    900: lightThemeColors.primitive.purple[900],
  },
  pink: {
    50: lightThemeColors.primitive.pink[50],
    100: lightThemeColors.primitive.pink[100],
    200: lightThemeColors.primitive.pink[200],
    300: lightThemeColors.primitive.pink[300],
    400: lightThemeColors.primitive.pink[400],
    500: lightThemeColors.primitive.pink[500],
    600: lightThemeColors.primitive.pink[600],
    700: lightThemeColors.primitive.pink[700],
    800: lightThemeColors.primitive.pink[800],
    900: lightThemeColors.primitive.pink[900],
  },
  blue: {
    50: lightThemeColors.primitive.blue[50],
    100: lightThemeColors.primitive.blue[100],
    200: lightThemeColors.primitive.blue[200],
    300: lightThemeColors.primitive.blue[300],
    400: lightThemeColors.primitive.blue[400],
    500: lightThemeColors.primitive.blue[500],
    600: lightThemeColors.primitive.blue[600],
    700: lightThemeColors.primitive.blue[700],
    800: lightThemeColors.primitive.blue[800],
    900: lightThemeColors.primitive.blue[900],
  },
  green: {
    50: lightThemeColors.primitive.green[50],
    100: lightThemeColors.primitive.green[100],
    200: lightThemeColors.primitive.green[200],
    300: lightThemeColors.primitive.green[300],
    400: lightThemeColors.primitive.green[400],
    500: lightThemeColors.primitive.green[500],
    600: lightThemeColors.primitive.green[600],
    700: lightThemeColors.primitive.green[700],
    800: lightThemeColors.primitive.green[800],
    900: lightThemeColors.primitive.green[900],
  },
  orange: {
    50: lightThemeColors.primitive.orange[50],
    100: lightThemeColors.primitive.orange[100],
    200: lightThemeColors.primitive.orange[200],
    300: lightThemeColors.primitive.orange[300],
    400: lightThemeColors.primitive.orange[400],
    500: lightThemeColors.primitive.orange[500],
    600: lightThemeColors.primitive.orange[600],
    700: lightThemeColors.primitive.orange[700],
    800: lightThemeColors.primitive.orange[800],
    900: lightThemeColors.primitive.orange[900],
  },
  red: {
    50: lightThemeColors.primitive.red[50],
    100: lightThemeColors.primitive.red[100],
    200: lightThemeColors.primitive.red[200],
    300: lightThemeColors.primitive.red[300],
    400: lightThemeColors.primitive.red[400],
    500: lightThemeColors.primitive.red[500],
    600: lightThemeColors.primitive.red[600],
    700: lightThemeColors.primitive.red[700],
    800: lightThemeColors.primitive.red[800],
    900: lightThemeColors.primitive.red[900],
  },
  amber: {
    50: lightThemeColors.primitive.amber[50],
    100: lightThemeColors.primitive.amber[100],
    200: lightThemeColors.primitive.amber[200],
    300: lightThemeColors.primitive.amber[300],
    400: lightThemeColors.primitive.amber[400],
    500: lightThemeColors.primitive.amber[500],
    600: lightThemeColors.primitive.amber[600],
    700: lightThemeColors.primitive.amber[700],
    800: lightThemeColors.primitive.amber[800],
    900: lightThemeColors.primitive.amber[900],
  },
  emerald: {
    50: lightThemeColors.primitive.emerald[50],
    100: lightThemeColors.primitive.emerald[100],
    200: lightThemeColors.primitive.emerald[200],
    300: lightThemeColors.primitive.emerald[300],
    400: lightThemeColors.primitive.emerald[400],
    500: lightThemeColors.primitive.emerald[500],
    600: lightThemeColors.primitive.emerald[600],
    700: lightThemeColors.primitive.emerald[700],
    800: lightThemeColors.primitive.emerald[800],
    900: lightThemeColors.primitive.emerald[900],
  },
  neutral: {
    50: lightThemeColors.primitive.neutral[50],
    100: lightThemeColors.primitive.neutral[100],
    200: lightThemeColors.primitive.neutral[200],
    300: lightThemeColors.primitive.neutral[300],
    400: lightThemeColors.primitive.neutral[400],
    500: lightThemeColors.primitive.neutral[500],
    600: lightThemeColors.primitive.neutral[600],
    700: lightThemeColors.primitive.neutral[700],
    800: lightThemeColors.primitive.neutral[800],
    900: lightThemeColors.primitive.neutral[900],
    950: lightThemeColors.primitive.neutral[950],
  },
} as const;

/**
 * Obtém cores primitivas como valores RGB
 *
 * Utilitário para acessar cores primitivas como valores RGB,
 * útil para uso em estilos inline com alpha.
 *
 * @deprecated Use getThemeColors() e hexToRGB() diretamente nas cores semânticas
 */
export const COLOR_RGB = {
  cyan: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.cyan).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.cyan, string>,
  purple: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.purple).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.purple, string>,
  pink: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.pink).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.pink, string>,
  blue: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.blue).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.blue, string>,
  green: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.green).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.green, string>,
  orange: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.orange).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.orange, string>,
  red: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.red).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.red, string>,
  amber: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.amber).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.amber, string>,
  emerald: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.emerald).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.emerald, string>,
  neutral: Object.fromEntries(
    Object.entries(lightThemeColors.primitive.neutral).map(([key, value]) => [
      key,
      hexToRGB(value as string),
    ])
  ) as Record<keyof typeof lightThemeColors.primitive.neutral, string>,
} as const;
