/**
 * Exportações de Providers
 *
 * @fileoverview Providers exports
 * @author Rainer Teixeira
 */

export {
  AppInitializationProvider,
  useAppInitialization,
} from './app-initialization-provider';
export { AuthProvider, useAuth } from './auth-provider';
export { MatrixProvider, useMatrix, type MatrixColumn } from './matrix-context-provider';
export { QueryProvider } from './query-provider';
export { ThemeProvider } from './theme-provider';
// ToastProvider removido - usando Toaster do shadcn/ui em app/layout.tsx
export { IconsProvider, SiteIcon, Icon } from './icons-provider';
