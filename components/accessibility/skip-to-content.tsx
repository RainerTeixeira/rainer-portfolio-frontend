/**
 * Skip to Content
 * 
 * Link de acessibilidade para pular para o conteúdo principal
 * 
 * @fileoverview Skip to content component
 * @author Rainer Teixeira
 */

"use client"

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </a>
  )
}

