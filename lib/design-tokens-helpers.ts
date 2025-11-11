/**
 * Design Tokens Helpers
 *
 * Utilitários para trabalhar com design tokens da biblioteca @rainer/design-tokens.
 * Fornece funções para converter cores HEX para HSL e outras transformações necessárias.
 *
 * @module lib/design-tokens-helpers
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import {
  COLOR_AMBER,
  COLOR_BLUE,
  COLOR_CYAN,
  COLOR_EMERALD,
  COLOR_GREEN,
  COLOR_NEUTRAL,
  COLOR_ORANGE,
  COLOR_PINK,
  COLOR_PURPLE,
  COLOR_RED,
} from '@rainer/design-tokens';

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

/**
 * Obtém cores primitivas como valores hex
 *
 * Utilitário para acessar cores primitivas da biblioteca @rainer/design-tokens
 * como valores hex, útil para uso em estilos inline, canvas, etc.
 */
export const COLOR_HEX = {
  // Cores neutras
  neutral: COLOR_NEUTRAL,

  // Cores primárias
  cyan: COLOR_CYAN,
  purple: COLOR_PURPLE,
  pink: COLOR_PINK,

  // Cores secundárias
  blue: COLOR_BLUE,
  green: COLOR_GREEN,
  orange: COLOR_ORANGE,
  red: COLOR_RED,
  amber: COLOR_AMBER,
  emerald: COLOR_EMERALD,
} as const;

/**
 * Obtém cores primitivas como valores RGB
 *
 * Utilitário para acessar cores primitivas como valores RGB,
 * útil para uso em estilos inline com alpha.
 */
export const COLOR_RGB = {
  neutral: Object.fromEntries(
    Object.entries(COLOR_NEUTRAL).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_NEUTRAL, string>,
  cyan: Object.fromEntries(
    Object.entries(COLOR_CYAN).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_CYAN, string>,
  purple: Object.fromEntries(
    Object.entries(COLOR_PURPLE).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_PURPLE, string>,
  pink: Object.fromEntries(
    Object.entries(COLOR_PINK).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_PINK, string>,
  blue: Object.fromEntries(
    Object.entries(COLOR_BLUE).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_BLUE, string>,
  green: Object.fromEntries(
    Object.entries(COLOR_GREEN).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_GREEN, string>,
  orange: Object.fromEntries(
    Object.entries(COLOR_ORANGE).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_ORANGE, string>,
  red: Object.fromEntries(
    Object.entries(COLOR_RED).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_RED, string>,
  amber: Object.fromEntries(
    Object.entries(COLOR_AMBER).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_AMBER, string>,
  emerald: Object.fromEntries(
    Object.entries(COLOR_EMERALD).map(([key, value]) => [key, hexToRGB(value)])
  ) as Record<keyof typeof COLOR_EMERALD, string>,
} as const;
