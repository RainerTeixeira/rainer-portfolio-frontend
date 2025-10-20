/**
 * Tabela de Conteúdos (TOC)
 * 
 * Navegação por seções do artigo
 * 
 * @fileoverview Table of contents component
 * @author Rainer Teixeira
 */

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useTableOfContents } from "./hooks"

interface TableOfContentsProps {
  containerRef?: React.RefObject<HTMLElement>
  className?: string
}

export function TableOfContents({ 
  containerRef,
  className 
}: TableOfContentsProps) {
  const { headings, activeId, scrollToHeading } = useTableOfContents(containerRef)

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn("space-y-1", className)}>
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <ChevronRight className="h-4 w-4" />
        Neste artigo
      </h3>

      <ul className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id

          return (
            <li
              key={heading.id}
              style={{ 
                paddingLeft: `${(heading.level - 2) * 12}px` 
              }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  "w-full text-left text-sm py-1.5 px-2 rounded transition-colors relative",
                  isActive
                    ? "text-foreground font-medium bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {/* Indicador de seção ativa */}
                {isActive && (
                  <motion.div
                    layoutId="active-heading"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-r"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <span className="line-clamp-2">{heading.text}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

