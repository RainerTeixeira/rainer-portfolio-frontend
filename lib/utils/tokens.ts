/**
 * Design Tokens Utilities
 *
 * Utilitários para facilitar o uso dos design tokens do @rainersoft/design-tokens
 * no frontend. Fornece helpers para acessar cores, espaçamentos, tipografia, etc.
 *
 * @module lib/utils/tokens
 * @fileoverview Utilitários para design tokens
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import {
  darkTheme,
  lightTheme,
  tokens,
  type Tokens,
} from '@rainersoft/design-tokens';
import { useTheme } from 'next-themes';

/**
 * Obtém o tema atual baseado no contexto do next-themes
 *
 * @returns {typeof lightTheme | typeof darkTheme} Tema atual
 */
export function useCurrentTheme() {
  const { theme } = useTheme();
  return theme === 'dark' ? darkTheme : lightTheme;
}

/**
 * Obtém cores do tema atual
 *
 * @returns {Object} Cores do tema atual
 */
export function useThemeColors() {
  const currentTheme = useCurrentTheme();
  return currentTheme.colors;
}

/**
 * Obtém espaçamento do sistema de design
 *
 * @returns {Tokens['spacing']} Tokens de espaçamento
 */
export function getSpacing() {
  return tokens.spacing;
}

/**
 * Obtém tipografia do sistema de design
 *
 * @returns {Tokens['typography']} Tokens de tipografia
 */
export function getTypography() {
  return tokens.typography;
}

/**
 * Obtém raios de borda do sistema de design
 *
 * @returns {Tokens['radius']} Tokens de raio de borda
 */
export function getRadius() {
  return tokens.radius;
}

/**
 * Obtém sombras do sistema de design
 *
 * @param {'light' | 'dark'} theme - Tema para obter sombras
 * @returns {Tokens['shadows']} Tokens de sombras
 */
export function getShadows(theme: 'light' | 'dark' = 'light') {
  return tokens.shadows[theme];
}

/**
 * Obtém cores do tema claro
 *
 * @returns {typeof lightTheme.colors} Cores do tema claro
 */
export function getLightColors() {
  return lightTheme.colors;
}

/**
 * Obtém cores do tema escuro
 *
 * @returns {typeof darkTheme.colors} Cores do tema escuro
 */
export function getDarkColors() {
  return darkTheme.colors;
}

/**
 * Helper para obter valor de espaçamento
 *
 * @param {keyof Tokens['spacing']} size - Tamanho do espaçamento
 * @returns {string} Valor do espaçamento
 */
export function spacing(size: keyof Tokens['spacing']): string {
  return tokens.spacing[size];
}

/**
 * Helper para obter valor de raio de borda
 *
 * @param {keyof Tokens['radius']} size - Tamanho do raio
 * @returns {string} Valor do raio
 */
export function radius(size: keyof Tokens['radius']): string {
  return tokens.radius[size];
}

/**
 * Exporta todos os tokens para uso direto
 */
export { darkTheme, lightTheme, tokens };
