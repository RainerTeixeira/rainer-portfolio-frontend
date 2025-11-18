/**
 * useTokenStyles Hook
 * 
 * Hook React para facilitar o uso de design tokens em componentes.
 * Retorna funções utilitárias e valores de tokens baseados no tema atual.
 * 
 * @fileoverview Hook para design tokens
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { tokenStyles, createTokenStyle } from '@/lib/utils/token-styles';

/**
 * Hook para usar design tokens em componentes React
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { styles, tokens } = useTokenStyles();
 *   
 *   return (
 *     <div style={styles.gradient('primary')}>
 *       <p style={styles.text('primary')}>Hello</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTokenStyles() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme || 'light';

  const styles = useMemo(
    () => ({
      /**
       * Cria estilo com gradiente do token
       */
      gradient: (gradient: 'primary' | 'secondary' | 'accent' | 'background' = 'primary') => ({
        background: tokenStyles.gradient[gradient],
      }),

      /**
       * Cria estilo com background do token
       */
      background: (color: keyof typeof tokenStyles.background) => ({
        backgroundColor: tokenStyles.background[color],
      }),

      /**
       * Cria estilo com cor de texto do token
       */
      text: (color: keyof typeof tokenStyles.text) => ({
        color: tokenStyles.text[color],
      }),

      /**
       * Cria estilo com cor de borda do token
       */
      border: (color: keyof typeof tokenStyles.border) => ({
        borderColor: tokenStyles.border[color],
      }),

      /**
       * Cria estilo com sombra do token
       */
      shadow: (shadow: keyof typeof tokenStyles.shadow) => ({
        boxShadow: tokenStyles.shadow[shadow],
      }),

      /**
       * Cria estilo com raio de borda do token
       */
      radius: (radius: keyof typeof tokenStyles.radius) => ({
        borderRadius: tokenStyles.radius[radius],
      }),

      /**
       * Cria estilo completo usando múltiplos tokens
       */
      create: createTokenStyle,
    }),
    []
  );

  const tokens = useMemo(() => tokenStyles, []);

  return {
    styles,
    tokens,
    theme: currentTheme,
  };
}

