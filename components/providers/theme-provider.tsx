/**
 * Theme Provider Component
 *
 * Provider global de tema (claro/escuro/sistema) para toda a aplicação.
 * Wrapper do next-themes que gerencia alternância de tema e persistência.
 *
 * @module components/providers/theme-provider
 * @fileoverview Provider de tema usando next-themes
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout.tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 *
 * // Consumindo em componentes filhos
 * import { useTheme } from 'next-themes'
 *
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme()
 *   return <button onClick={() => setTheme('dark')}>Dark Mode</button>
 * }
 * ```
 */

'use client';

// ============================================================================
// React
// ============================================================================

import * as React from 'react';

// ============================================================================
// Next Themes
// ============================================================================

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente ThemeProvider
 *
 * Wrapper simplificado do NextThemesProvider que mantém a mesma
 * interface mas permite customizações futuras se necessário.
 *
 * Funcionalidades fornecidas:
 * - Alternância entre tema claro e escuro
 * - Detecção automática de preferência do sistema
 * - Persistência de escolha do usuário (localStorage)
 * - Sincronização entre abas
 * - Prevenção de flash durante carregamento
 *
 * @param {ThemeProviderProps} props - Propriedades do provider
 * @param {React.ReactNode} props.children - Componentes filhos que terão acesso ao tema
 * @param {string} [props.attribute="class"] - Atributo usado para aplicar tema (class, data-theme, etc)
 * @param {string} [props.defaultTheme="system"] - Tema padrão (light, dark, system)
 * @param {boolean} [props.enableSystem=true] - Se deve detectar preferência do SO
 * @param {string[]} [props.themes] - Lista de temas disponíveis
 * @returns {JSX.Element} Provider configurado com children
 *
 * @example
 * // No layout.tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 *
 * @example
 * // Consumindo em componentes filhos
 * import { useTheme } from 'next-themes'
 *
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme()
 *   return <button onClick={() => setTheme('dark')}>Dark Mode</button>
 * }
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  /**
   * Renderiza NextThemesProvider com todas as props recebidas.
   * O next-themes já lida com hidratação SSR/CSR internamente.
   */
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}



