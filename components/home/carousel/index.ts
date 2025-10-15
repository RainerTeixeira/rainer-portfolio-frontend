/**
 * Carousel Module - Exports
 * 
 * Arquivo de barril (barrel file) para exportações do módulo carousel
 * Facilita importações e mantém a estrutura organizada
 * 
 * @fileoverview Barrel exports for carousel module
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// Componente principal
export { default as Carousel } from './Carousel'
export { default } from './Carousel'

// Componentes auxiliares
export { HeroContent } from './HeroContent'
export { HolographicBackground } from './HolographicBackground'
export { MatrixRain } from './MatrixRain'
export { ParticlesSystem } from './ParticlesSystem'
export { ScrollIndicator } from './ScrollIndicator'

// Constantes
export { 
  AUTOPLAY_INTERVAL_MS, 
  PRIMARY_TEXTS, 
  SUBTEXTS, 
  BINARY_PATTERNS, 
  MATRIX_CHARS 
} from './constants'

// Tipos
export type { 
  MatrixColumn, 
  Particle, 
  CarouselProps, 
  BackgroundProps,
  ParticlesSystemProps,
  MatrixRainProps
} from './types'

