/**
 * Componente de Alternância de Tema
 * 
 * Botão que permite ao usuário alternar entre tema claro e escuro.
 * Utiliza animações suaves de rotação e escala para transição visual
 * entre os ícones de sol e lua.
 * 
 * Características:
 * - Animação de rotação e escala nos ícones
 * - Prevenção de flash durante hidratação (mounted state)
 * - Acessível (sr-only label para leitores de tela)
 * - Estilos consistentes com design system
 * 
 * @fileoverview Botão de alternância de tema claro/escuro
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * Componente ThemeToggle
 * 
 * Renderiza um botão que alterna entre tema claro e escuro.
 * Exibe ícone de sol no tema claro e lua no tema escuro com
 * transição animada.
 * 
 * Funcionamento:
 * 1. Aguarda hidratação (mounted) para evitar mismatch SSR/cliente
 * 2. Detecta tema atual via resolvedTheme (resolvido, não preferência)
 * 3. Alterna entre "light" e "dark" ao clicar
 * 4. Anima rotação e escala dos ícones na transição
 * 
 * @returns {JSX.Element} Botão de alternância de tema com ícones animados
 * 
 * @example
 * import { ThemeToggle } from '@/components/theme/theme-toggle'
 * 
 * function Header() {
 *   return (
 *     <header>
 *       <ThemeToggle />
 *     </header>
 *   )
 * }
 */
export function ThemeToggle() {
  /** Hook do next-themes para acessar e modificar tema */
  const { setTheme, resolvedTheme } = useTheme()
  
  /**
   * Estado para controlar se o componente foi montado no cliente
   * Previne hydration mismatch entre servidor e cliente
   */
  const [mounted, setMounted] = React.useState(false)

  /**
   * Effect que marca o componente como montado
   * Executa apenas uma vez após renderização inicial
   */
  React.useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Renderização durante SSR ou antes da hidratação
   * Mostra apenas o ícone de sol sem funcionalidade
   * para evitar problemas de mismatch de hidratação
   */
  if (!mounted) {
    return (
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 relative">
        {/* Ícone de sol como placeholder */}
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        {/* Label acessível para leitores de tela */}
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  /**
   * Função de alternância de tema
   * Inverte entre "dark" e "light" baseado no tema atual resolvido
   */
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  /**
   * Renderização após hidratação
   * Botão totalmente funcional com ambos os ícones e animações
   */
  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 relative"
    >
      {/**
       * Ícone de Sol (tema claro)
       * - Visível no tema claro (rotate-0 scale-100)
       * - Oculto no tema escuro (rotate-90 scale-0)
       * - Transição suave via CSS transition-all
       */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      
      {/**
       * Ícone de Lua (tema escuro)
       * - Posicionamento absoluto para sobrepor ao sol
       * - Oculto no tema claro (rotate-90 scale-0)
       * - Visível no tema escuro (rotate-0 scale-100)
       * - Transição suave via CSS transition-all
       */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      
      {/**
       * Label para leitores de tela
       * sr-only: visível apenas para screen readers
       */}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
