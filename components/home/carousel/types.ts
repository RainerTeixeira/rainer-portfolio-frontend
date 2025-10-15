/**
 * Tipos e Interfaces do Sistema Carousel Cyberpunk
 * 
 * Define todas as interfaces e tipos utilizados no carousel
 * para garantir type safety e consistência
 * 
 * @fileoverview Type definitions for cyberpunk carousel system
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Interface de coluna da chuva de matriz
 * 
 * @interface MatrixColumn
 * @property {string} id - ID único da coluna
 * @property {number} leftPct - Posição horizontal em porcentagem (0-100)
 * @property {number} fontSize - Tamanho da fonte em pixels
 * @property {number} animationDuration - Duração da animação em segundos
 * @property {number} animationDelay - Delay inicial em segundos
 * @property {string[]} characters - Array de caracteres a exibir
 * @property {number} intensity - Intensidade/opacidade (0-1)
 * @property {'binary'} type - Tipo de coluna (sempre 'binary')
 * @property {number} speed - Velocidade de queda
 */
export interface MatrixColumn {
  id: string
  leftPct: number
  fontSize: number
  animationDuration: number
  animationDelay: number
  characters: string[]
  intensity: number
  type: 'binary'
  speed: number
}

/**
 * Interface de partícula animada
 * 
 * @interface Particle
 * @property {string} id - ID único da partícula
 * @property {number} x - Posição horizontal em porcentagem (0-100)
 * @property {number} y - Posição vertical em porcentagem (0-100)
 * @property {number} size - Tamanho em pixels
 * @property {number} duration - Duração da animação em segundos
 * @property {number} delay - Delay inicial em segundos
 * @property {"energy" | "data" | "quantum" | "neural"} type - Tipo de partícula
 * @property {number} opacity - Opacidade da partícula (0-1)
 */
export interface Particle {
  id: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "energy" | "data" | "quantum" | "neural"
  opacity: number
}

/**
 * Props do componente Carousel
 * 
 * @interface CarouselProps
 * @property {number} [autoPlayInterval] - Intervalo de auto-play em ms (padrão: 5000)
 * @property {boolean} [enableAutoPlay] - Se auto-play está habilitado (padrão: true)
 */
export interface CarouselProps {
  autoPlayInterval?: number
  enableAutoPlay?: boolean
}

/**
 * Props dos componentes de background
 */
export interface BackgroundProps {
  isDarkTheme: boolean
}

/**
 * Props do sistema de partículas
 */
export interface ParticlesSystemProps {
  particles: Particle[]
  isDarkTheme: boolean
}

/**
 * Props do Matrix Rain
 */
export interface MatrixRainProps {
  columns: MatrixColumn[]
  isDarkTheme: boolean
}

