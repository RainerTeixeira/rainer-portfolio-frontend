/**
 * Barra de Progresso de Leitura
 * 
 * Indica o progresso de leitura do artigo
 * 
 * @fileoverview Reading progress bar component
 * @author Rainer Teixeira
 */

"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface ReadingProgressProps {
  target?: React.RefObject<HTMLElement>
  className?: string
  height?: number
}

export function ReadingProgress({ 
  target, 
  className,
  height = 3
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll(
    target ? { target } : undefined
  )

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  return (
    <>
      {/* Barra de progresso fixa no topo */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 origin-left",
          "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500",
          className
        )}
        style={{ 
          scaleX,
          height: `${height}px`,
        }}
      />

      {/* Indicador de porcentagem (opcional) */}
      {progress > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-4 z-40 bg-background/95 backdrop-blur-sm border-2 rounded-full px-3 py-1.5 shadow-lg"
        >
          <span className="text-xs font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {progress}%
          </span>
        </motion.div>
      )}
    </>
  )
}

