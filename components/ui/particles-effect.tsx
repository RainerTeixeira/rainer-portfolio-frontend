/**
 * Particles Effect Component
 * 
 * Efeito decorativo de partículas animadas para dark mode.
 * Três pontos coloridos pulsantes em posições configuráveis.
 * 
 * Características:
 * - Visível apenas no dark mode
 * - Não interfere com interações (pointer-events-none)
 * - Posição fixa durante scroll
 * - Variantes de posicionamento
 * - Cores: cyan, purple, pink
 * - Animação de pulse dessincronizada
 * 
 * @fileoverview Partículas decorativas para dark mode
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Utils
// ============================================================================

import { ANIMATION_DELAYS } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

/**
 * Variantes de posicionamento disponíveis
 */
type ParticleVariant = "default" | "alt1" | "alt2"

/**
 * Props do ParticlesEffect
 */
interface ParticlesEffectProps {
  /** Variante de posicionamento das partículas */
  readonly variant?: ParticleVariant
}

/**
 * Posicionamento de uma partícula individual
 */
interface ParticlePosition {
  readonly particle1: string
  readonly particle2: string
  readonly particle3: string
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Mapa de posicionamentos por variante
 */
const PARTICLE_POSITIONS: Record<ParticleVariant, ParticlePosition> = {
  default: {
    particle1: "top-20 left-1/4",
    particle2: "top-40 right-1/3",
    particle3: "bottom-40 left-1/2"
  },
  alt1: {
    particle1: "top-24 left-1/5",
    particle2: "top-80 right-1/5",
    particle3: "bottom-80 left-1/3"
  },
  alt2: {
    particle1: "top-32 left-1/3",
    particle2: "top-60 right-1/4",
    particle3: "bottom-60 left-1/5"
  }
} as const

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do Particles Effect
 * 
 * Renderiza três partículas decorativas animadas.
 * Posicionamento configurável via variante.
 * 
 * Variantes:
 * - `default`: Padrão (top-20, top-40, bottom-40)
 * - `alt1`: Alternativo 1 (top-24, top-80, bottom-80)
 * - `alt2`: Alternativo 2 (top-32, top-60, bottom-60)
 * 
 * @param variant - Variante de posicionamento
 * @returns Container com partículas animadas
 * 
 * @example
 * ```tsx
 * // Variante padrão
 * <ParticlesEffect />
 * 
 * // Variante alternativa
 * <ParticlesEffect variant="alt1" />
 * ```
 */
export function ParticlesEffect({ variant = "default" }: ParticlesEffectProps = {}) {
  // ============================================================================
  // Computed Values
  // ============================================================================
  
  const selectedPositions = PARTICLE_POSITIONS[variant]

  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 z-0" 
      aria-hidden="true"
    >
      {/* Partícula 1 - Cyan (maior, opacidade alta) */}
      <div 
        className={`absolute ${selectedPositions.particle1} w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40`}
      />
      
      {/* Partícula 2 - Purple (menor, delay médio) */}
      <div 
        className={`absolute ${selectedPositions.particle2} w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-30`}
        style={{ animationDelay: ANIMATION_DELAYS.particle2 }}
      />
      
      {/* Partícula 3 - Pink (menor, delay longo) */}
      <div 
        className={`absolute ${selectedPositions.particle3} w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-35`}
        style={{ animationDelay: ANIMATION_DELAYS.long }}
      />
    </div>
  )
}

