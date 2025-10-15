/**
 * Hook para Tabela de Conteúdos (TOC)
 * 
 * Extrai headings (h2, h3) de um container e detecta qual seção está ativa
 * usando Intersection Observer para navegação suave.
 * 
 * Funcionalidades:
 * - Extração automática de headings do DOM
 * - Geração de IDs para headings sem ID
 * - Detecção de seção ativa via Intersection Observer
 * - Função de scroll suave para seções
 * 
 * @fileoverview Hook para gerenciamento de tabela de conteúdos
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useEffect, useState } from "react"

/**
 * Interface de um heading extraído
 * 
 * @interface Heading
 * @property {string} id - ID único do elemento
 * @property {string} text - Texto do heading
 * @property {number} level - Nível do heading (2 ou 3)
 */
export interface Heading {
  id: string
  text: string
  level: number
}

/**
 * Hook useTableOfContents
 * 
 * Gerencia a extração e navegação de headings em um artigo.
 * Detecta automaticamente qual seção está visível usando Intersection Observer.
 * 
 * @param {React.RefObject<HTMLElement>} [containerRef] - Ref do container (default: document)
 * 
 * @returns {Object} Objeto com headings e controles
 * @returns {Heading[]} headings - Array de headings extraídos
 * @returns {string} activeId - ID do heading ativo no momento
 * @returns {Function} scrollToHeading - Função para scrollar até um heading
 * 
 * @example
 * import { useTableOfContents } from '@/components/blog/hooks'
 * 
 * function TableOfContents() {
 *   const { headings, activeId, scrollToHeading } = useTableOfContents()
 *   
 *   return (
 *     <nav>
 *       {headings.map((heading) => (
 *         <button
 *           key={heading.id}
 *           onClick={() => scrollToHeading(heading.id)}
 *           className={activeId === heading.id ? 'active' : ''}
 *         >
 *           {heading.text}
 *         </button>
 *       ))}
 *     </nav>
 *   )
 * }
 */
export function useTableOfContents(containerRef?: React.RefObject<HTMLElement>) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extrair headings do DOM
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
        level: parseInt(element.tagName[1] || "2"),
      })
    })

    setHeadings(headingList)
  }, [containerRef])

  // Intersection Observer para detectar seção ativa
  useEffect(() => {
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

  /**
   * Scroll suave até um heading específico
   * 
   * @param {string} id - ID do heading
   */
  function scrollToHeading(id: string) {
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return {
    headings,
    activeId,
    scrollToHeading,
  }
}

