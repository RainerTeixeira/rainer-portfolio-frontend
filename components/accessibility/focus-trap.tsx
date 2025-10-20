/**
 * Focus Trap
 * 
 * Componente para manter o foco dentro de um container (útil para modals)
 * 
 * @fileoverview Focus trap component
 * @author Rainer Teixeira
 */

"use client"

import { ReactNode } from "react"
import { useFocusTrap } from "./hooks"

interface FocusTrapProps {
  children: ReactNode
  active?: boolean
}

export function FocusTrap({ children, active = true }: FocusTrapProps) {
  const containerRef = useFocusTrap(active)

  return <div ref={containerRef}>{children}</div>
}


