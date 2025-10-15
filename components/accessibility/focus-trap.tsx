/**
 * Focus Trap
 * 
 * Componente para manter o foco dentro de um container (útil para modals)
 * 
 * @fileoverview Focus trap component
 * @author Rainer Teixeira
 */

"use client"

import { useEffect, useRef, ReactNode } from "react"

interface FocusTrapProps {
  children: ReactNode
  active?: boolean
}

export function FocusTrap({ children, active = true }: FocusTrapProps) {
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

  return <div ref={containerRef}>{children}</div>
}


