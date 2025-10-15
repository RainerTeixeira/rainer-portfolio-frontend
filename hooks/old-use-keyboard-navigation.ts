/**
 * Hook para Navegação por Teclado
 * 
 * Facilita implementação de navegação por teclado em listas
 * 
 * @fileoverview Keyboard navigation hook
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect, useCallback } from "react"

interface UseKeyboardNavigationProps {
  itemCount: number
  onSelect?: (index: number) => void
  loop?: boolean
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  loop = true,
}: UseKeyboardNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setActiveIndex((prev) => {
            const next = prev + 1
            return next >= itemCount ? (loop ? 0 : prev) : next
          })
          break

        case "ArrowUp":
          event.preventDefault()
          setActiveIndex((prev) => {
            const next = prev - 1
            return next < 0 ? (loop ? itemCount - 1 : 0) : next
          })
          break

        case "Home":
          event.preventDefault()
          setActiveIndex(0)
          break

        case "End":
          event.preventDefault()
          setActiveIndex(itemCount - 1)
          break

        case "Enter":
        case " ":
          event.preventDefault()
          if (onSelect) {
            onSelect(activeIndex)
          }
          break
      }
    },
    [activeIndex, itemCount, loop, onSelect]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    activeIndex,
    setActiveIndex,
  }
}


