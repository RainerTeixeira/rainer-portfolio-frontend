/**
 * Componente ParticlesEffect
 * 
 * Efeito decorativo de partículas animadas para modo escuro.
 * Exibe pequenos pontos coloridos em posições aleatórias que
 * pulsam continuamente, criando atmosfera cyberpunk.
 * 
 * Características:
 * - Visível apenas no dark mode (opacity-0 dark:opacity-100)
 * - Não interfere com interações (pointer-events-none)
 * - Fixed position para ficar fixo durante scroll
 * - Delays de animação customizáveis
 * - Três partículas com cores cyan, purple e pink
 * 
 * @fileoverview Componente de partículas decorativas para dark mode
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { ANIMATION_DELAYS } from "@/lib/utils"

/**
 * Props do componente ParticlesEffect
 * 
 * @interface ParticlesEffectProps
 * @property {string} [variant="default"] - Variação de posicionamento das partículas
 */
interface ParticlesEffectProps {
  /** Variante de posicionamento: "default", "alt1", "alt2" */
  variant?: "default" | "alt1" | "alt2"
}

/**
 * Componente ParticlesEffect
 * 
 * Renderiza três partículas coloridas animadas em posições
 * específicas baseadas na variante escolhida.
 * 
 * Variantes disponíveis:
 * - "default": posicionamento padrão (top-20, top-40, bottom-40)
 * - "alt1": posicionamento alternativo 1 (top-24, top-80, bottom-80)
 * - "alt2": posicionamento alternativo 2 (top-32, top-60, bottom-60)
 * 
 * @param {ParticlesEffectProps} props - Propriedades do componente
 * @returns {JSX.Element} Container com partículas animadas
 * 
 * @example
 * // Variante padrão
 * <ParticlesEffect />
 * 
 * @example
 * // Variante alternativa
 * <ParticlesEffect variant="alt1" />
 */
export function ParticlesEffect({ variant = "default" }: ParticlesEffectProps = {}) {
  /**
   * Define posicionamento das partículas baseado na variante
   */
  const particlePositions = {
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
  }

  /** Seleciona conjunto de posições baseado na variante */
  const positions = particlePositions[variant]

  return (
    /**
     * Container principal das partículas
     * 
     * - fixed inset-0: posição fixa cobrindo toda a tela
     * - pointer-events-none: não bloqueia cliques/interações
     * - opacity-0 dark:opacity-100: visível apenas no dark mode
     * - z-0: fica atrás de todo conteúdo
     */
    <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 z-0" aria-hidden="true">
      {/**
       * Partícula 1 - Cyan
       * Maior (1x1), opacidade média-alta
       */}
      <div 
        className={`absolute ${positions.particle1} w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40`}
      />
      
      {/**
       * Partícula 2 - Purple
       * Menor (0.5x0.5), opacidade média
       * Delay de animação para dessincronizar do pulse
       */}
      <div 
        className={`absolute ${positions.particle2} w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-30`}
        style={{ animationDelay: ANIMATION_DELAYS.particle2 }}
      />
      
      {/**
       * Partícula 3 - Pink
       * Menor (0.5x0.5), opacidade média-baixa
       * Delay maior para criar ritmo visual
       */}
      <div 
        className={`absolute ${positions.particle3} w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-35`}
        style={{ animationDelay: ANIMATION_DELAYS.long }}
      />
    </div>
  )
}

