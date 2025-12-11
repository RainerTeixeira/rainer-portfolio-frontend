/**
 * Exportações de Hooks do Home
 *
 * Barrel file para centralizar exportações dos
 * Hooks do Home (Portfolio-specific)
 * 
 * Apenas hooks específicos do domínio do portfolio.
 * Hooks genéricos foram migrados para @rainersoft/utils.
 */

<<<<<<< HEAD
// Hooks genéricos migrados - importar dos hooks locais
export { useCarouselKeyboard } from '@/hooks';
=======
// Hooks genéricos migrados - re-exportar da biblioteca
export { useCarouselKeyboard } from '@rainersoft/utils';
>>>>>>> 37a9ca0b91e93f600ba06236ec3f69f5d3d432d6

// Hooks específicos do portfolio (se houver)
// export { usePortfolioSpecificHook } from './use-portfolio-specific-hook';
