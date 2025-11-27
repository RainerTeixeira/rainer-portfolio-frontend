/**
 * Exportações de Providers
 *
 * @fileoverview Providers exports - Apenas providers ativos
 * @author Rainer Teixeira
 */

export {
  AppInitializationProvider,
  useAppInitialization,
} from './app-initialization-provider';

// Auth Provider Real (Cognito + API)
export {
  AuthProvider,
  useAuthContext,
  AuthContext,
} from './auth-context-provider';

export {
  MatrixProvider,
  useMatrix,
  type MatrixColumn,
} from './matrix-context-provider';

export { QueryProvider } from './query-provider';
export { ThemeProvider } from './theme-provider';
export { IconsProvider, SiteIcon, Icon } from './icons-provider';


