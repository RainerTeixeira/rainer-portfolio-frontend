/**
 * Hook para Focus Trap
 * 
 * Mantém o foco dentro de um container, útil para modals e dialogs
 * para garantir acessibilidade e navegação por teclado.
 * 
 * Funcionalidades:
 * - Detecta elementos focáveis
 * - Intercepta Tab/Shift+Tab
 * - Cicla o foco dentro do container
 * - Foca primeiro elemento ao ativar
 * 
 * @fileoverview Hook para gerenciamento de focus trap
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useEffect, useRef } from "react"

/**
 * Hook useFocusTrap
 * 
 * Configura focus trap em um container para navegação acessível.
 * 
 * @param {boolean} [active=true] - Se o focus trap está ativo
 * 
 * @returns {React.RefObject<HTMLDivElement>} Ref do container
 * 
 * @example
 * import { useFocusTrap } from '@/components/accessibility/hooks'
 * 
 * function Modal({ isOpen }) {
 *   const containerRef = useFocusTrap(isOpen)
 *   
 *   return (
 *     <div ref={containerRef}>
 *       <button>Fechar</button>
 *       <input placeholder="Nome" />
 *       <button>Salvar</button>
 *     </div>
 *   )
 * }
 */
export function useFocusTrap(active = true) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Focar primeiro elemento ao montar
    firstElement?.focus()

    const handleKeyDown = handleTabKey as EventListener
    container.addEventListener("keydown", handleKeyDown)

    return () => {
      container.removeEventListener("keydown", handleKeyDown)
    }
  }, [active])

  return containerRef
}

