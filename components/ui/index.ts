/**
 * UI Components
 * 
 * Re-exporta todos os componentes de @rainersoft/ui
 * para manter compatibilidade com imports existentes.
 * 
 * @example
 * import { Button, Card } from '@/components/ui'
 */

// Re-exporta tudo da biblioteca @rainersoft/ui
export * from '@rainersoft/ui';

// Reexport explícito para evitar problemas de análise estática
export {
  ParticlesEffect,
  PageHeader,
  StarsBackground,
  Toaster,
  LoadingScreen,
} from '@rainersoft/ui';

// Componentes específicos reexportados da biblioteca @rainersoft/ui
export { BackToTop } from '@rainersoft/ui';
export { CookieBanner } from '@rainersoft/ui';
export { InstallPrompt } from '@rainersoft/ui';
export { UpdateNotification } from '@rainersoft/ui';
