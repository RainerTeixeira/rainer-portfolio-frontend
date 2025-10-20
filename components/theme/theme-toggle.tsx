/**
 * Theme Toggle Component
 * 
 * Botão para alternar entre tema claro e escuro.
 * Ícones animados de sol/lua com transição suave.
 * 
 * Características:
 * - Animação de rotação e escala
 * - Prevenção de hydration mismatch (mounted state)
 * - Acessibilidade completa (ARIA + keyboard)
 * - Estilos do design system
 * - Ícones: Sol (light) e Lua (dark)
 * 
 * @fileoverview Toggle de tema claro/escuro
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

// ============================================================================
// React
// ============================================================================

import * as React from "react"

// ============================================================================
// Icons
// ============================================================================

import { Moon, Sun } from "lucide-react"

// ============================================================================
// Hooks & Utils
// ============================================================================

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do Theme Toggle
 * 
 * Botão que alterna entre tema claro e escuro.
 * Ícones de sol/lua com animação suave.
 * 
 * Funcionamento:
 * 1. Aguarda hidratação para evitar mismatch
 * 2. Detecta tema atual via resolvedTheme
 * 3. Alterna light ↔ dark ao clicar
 * 4. Anima rotação e escala dos ícones
 * 
 * @returns Botão de alternância de tema
 * 
 * @example
 * ```tsx
 * // No header/navbar
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const { setTheme, resolvedTheme } = useTheme()
  
  // ============================================================================
  // State
  // ============================================================================
  
  const [isComponentMounted, setIsComponentMounted] = React.useState(false)

  // ============================================================================
  // Effects
  // ============================================================================
  
  /**
   * Marca componente como montado após hidratação
   */
  React.useEffect(() => {
    setIsComponentMounted(true)
  }, [])

  // ============================================================================
  // Render Guard (SSR Fallback)
  // ============================================================================
  
  /**
   * Renderiza placeholder durante SSR
   * Evita mismatch de hidratação
   */
  if (!isComponentMounted) {
    return (
      <button 
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50 border border-input bg-background",
          "shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 relative"
        )}
        aria-label="Alternar tema"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        <span className="sr-only">Alternar tema</span>
      </button>
    )
  }

  // ============================================================================
  // Handler Functions
  // ============================================================================
  
  /**
   * Alterna entre tema claro e escuro
   */
  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <button
      onClick={handleToggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50 border border-input bg-background",
        "shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 relative"
      )}
      aria-label="Alternar tema"
    >
      {/* Ícone Sol (tema claro) - visível quando light */}
      <Sun 
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        aria-hidden="true"
      />
      
      {/* Ícone Lua (tema escuro) - visível quando dark */}
      <Moon 
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
        aria-hidden="true"
      />
      
      {/* Label para screen readers */}
      <span className="sr-only">Alternar tema</span>
    </button>
  )
}
