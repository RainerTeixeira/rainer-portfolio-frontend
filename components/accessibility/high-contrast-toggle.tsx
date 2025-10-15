/**
 * Toggle de Alto Contraste
 * 
 * Botão para alternar modo de alto contraste
 * 
 * @fileoverview High contrast toggle component
 * @author Rainer Teixeira
 */

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Contrast } from "lucide-react"
import { cn } from "@/lib/utils"

export function HighContrastToggle() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Carregar preferência salva
    const saved = localStorage.getItem("high-contrast")
    if (saved === "true") {
      setIsHighContrast(true)
      document.documentElement.classList.add("high-contrast")
    }
  }, [])

  function toggleHighContrast() {
    const newValue = !isHighContrast
    setIsHighContrast(newValue)
    
    if (newValue) {
      document.documentElement.classList.add("high-contrast")
      localStorage.setItem("high-contrast", "true")
    } else {
      document.documentElement.classList.remove("high-contrast")
      localStorage.setItem("high-contrast", "false")
    }
  }

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

