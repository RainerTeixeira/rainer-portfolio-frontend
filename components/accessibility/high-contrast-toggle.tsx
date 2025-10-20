/**
 * Toggle de Alto Contraste
 * 
 * Botão para alternar modo de alto contraste
 * 
 * @fileoverview High contrast toggle component
 * @author Rainer Teixeira
 */

"use client"

import { Button } from "@/components/ui/button"
import { Contrast } from "lucide-react"
import { cn } from "@/lib/utils"
import { useHighContrast } from "./hooks"

export function HighContrastToggle() {
  const { isHighContrast, toggleHighContrast } = useHighContrast()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleHighContrast}
      title={isHighContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
      className={cn(isHighContrast && "bg-accent")}
    >
      <Contrast className="h-5 w-5" />
      <span className="sr-only">
        {isHighContrast ? "Desativar" : "Ativar"} alto contraste
      </span>
    </Button>
  )
}

