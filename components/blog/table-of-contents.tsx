/**
 * Tabela de Conteúdos (TOC)
 * 
 * Navegação por seções do artigo
 * 
 * @fileoverview Table of contents component
 * @author Rainer Teixeira
 */

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  containerRef?: React.RefObject<HTMLElement>
  className?: string
}

export function TableOfContents({ 
  containerRef,
  className 
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const container = containerRef?.current || document

    // Extrair headings (h2, h3)
    const elements = container.querySelectorAll("h2, h3")
    const headingList: Heading[] = []

    elements.forEach((element, index) => {
      let id = element.id
      
      // Criar ID se não existir
      if (!id) {
        id = `heading-${index}`
        element.id = id
      }

      headingList.push({
        id,
        text: element.textContent || "",
        level: parseInt(element.tagName[1]),
      })
    })

    setHeadings(headingList)
  }, [containerRef])

  useEffect(() => {
    // Intersection Observer para detectar seção ativa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  function scrollToHeading(id: string) {
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

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

