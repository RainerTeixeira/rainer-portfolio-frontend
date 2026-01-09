/**
 * @file theme-manager.ts
 * @description
 * Utilitários para gerenciamento de temas
 *
 * @module lib/utils/theme-manager
 * @version 2.0.0
 * @author Rainer Teixeira
 */

import { tokens, lightTheme, darkTheme } from '@rainersoft/design-tokens';

/**
 * Obtém uma cor de token pelo caminho
 * @param path - Caminho da cor (ex: 'colors.light.brand.primary')
 * @returns Valor da cor ou undefined
 */
export function getTokenColor(path: string): string | undefined {
  const parts = path.split('.');
  let value: any = tokens;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return undefined;
    }
  }
  
  return typeof value === 'string' ? value : undefined;
}

/**
 * Carrega design tokens com segurança
 * @returns Tokens de design
 */
export function loadDesignTokensSafely() {
  try {
    return tokens;
  } catch (error) {
    console.warn('Erro ao carregar design tokens:', error);
    return {};
  }
}

/**
 * Hook para acessar design tokens (compatibilidade)
 * @returns Tokens de design
 */
export function useDesignTokens() {
  return tokens;
}
