/**
 * @file safe-design-tokens.ts
 * @description
 * Utilitário para importação segura de design tokens em componentes
 * dinamicamente carregados. Evita erros de webpack durante SSR e
 * carregamento dinâmico de componentes.
 *
 * @module lib/utils/safe-design-tokens
 * @version 1.0.0
 * @author Rainer Teixeira
 */

/**
 * Importação defensiva de design tokens
 * 
 * Tenta carregar os design tokens de forma segura, retornando null
 * caso o módulo não esteja disponível. Útil para componentes que
 * são carregados dinamicamente.
 */
let cachedTokens: any = null;
let cachedGradientDirections: any = null;
let tokensLoaded = false;

/**
 * Carrega os design tokens de forma segura
 * 
 * @returns {Object} Objeto contendo tokens e GRADIENT_DIRECTIONS
 */
export function loadDesignTokensSafely() {
  if (tokensLoaded) {
    return {
      tokens: cachedTokens,
      GRADIENT_DIRECTIONS: cachedGradientDirections,
    };
  }

  try {
    const tokensModule = require('@rainersoft/design-tokens');
    cachedTokens = tokensModule?.tokens || tokensModule?.default || null;
    cachedGradientDirections = tokensModule?.GRADIENT_DIRECTIONS || {
      TO_TOP: 'bg-gradient-to-t',
      TO_RIGHT: 'bg-gradient-to-r',
      TO_BOTTOM: 'bg-gradient-to-b',
      TO_LEFT: 'bg-gradient-to-l',
      TO_TOP_RIGHT: 'bg-gradient-to-tr',
      TO_TOP_LEFT: 'bg-gradient-to-tl',
      TO_BOTTOM_RIGHT: 'bg-gradient-to-br',
      TO_BOTTOM_LEFT: 'bg-gradient-to-bl',
    };
    tokensLoaded = true;
  } catch (error) {
    console.warn('Design tokens não disponíveis:', error);
    cachedTokens = null;
    cachedGradientDirections = {
      TO_TOP: 'bg-gradient-to-t',
      TO_RIGHT: 'bg-gradient-to-r',
      TO_BOTTOM: 'bg-gradient-to-b',
      TO_LEFT: 'bg-gradient-to-l',
      TO_TOP_RIGHT: 'bg-gradient-to-tr',
      TO_TOP_LEFT: 'bg-gradient-to-tl',
      TO_BOTTOM_RIGHT: 'bg-gradient-to-br',
      TO_BOTTOM_LEFT: 'bg-gradient-to-bl',
    };
  }

  return {
    tokens: cachedTokens,
    GRADIENT_DIRECTIONS: cachedGradientDirections,
  };
}

/**
 * Hook para acessar design tokens de forma segura em componentes
 * 
 * @returns {Object} Objeto contendo tokens e GRADIENT_DIRECTIONS
 * 
 * @example
 * ```tsx
 * const { tokens, GRADIENT_DIRECTIONS } = useDesignTokens();
 * if (tokens) {
 *   const color = tokens.colors.dark.primary.base;
 * }
 * ```
 */
export function useDesignTokens() {
  return loadDesignTokensSafely();
}

/**
 * Obtém uma cor de token de forma segura com fallback
 * 
 * @param theme - Tema ('dark' ou 'light')
 * @param color - Nome da cor primitiva
 * @param shade - Tom da cor (50-900)
 * @param fallback - Cor de fallback
 * @returns Cor hexadecimal
 */
export function getTokenColor(
  theme: 'dark' | 'light',
  color: string,
  shade: number,
  fallback: string
): string {
  const { tokens } = loadDesignTokensSafely();
  
  try {
    if (!tokens?.colors?.[theme]?.primitive) {
      return fallback;
    }
    const colorObj = (tokens.colors[theme].primitive as Record<string, Record<number, string>>)[color];
    if (!colorObj || typeof colorObj !== 'object') {
      return fallback;
    }
    const colorValue = colorObj[shade];
    return typeof colorValue === 'string' ? colorValue : fallback;
  } catch {
    return fallback;
  }
}
