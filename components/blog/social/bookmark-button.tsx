/**
 * Botão de Bookmark/Salvar
 * 
 * Botão para salvar posts para ler depois
 * 
 * @fileoverview Bookmark button component
 * @author Rainer Teixeira
 */

"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface BookmarkButtonProps {
  postId: string
  initialIsBookmarked?: boolean
  variant?: "default" | "ghost" | "outline"
  size?: "sm" | "default" | "lg"
  showLabel?: boolean
  onBookmark?: () => void
  onUnbookmark?: () => void
}

export function BookmarkButton({ 
  postId, 
  initialIsBookmarked = false,
  variant = "ghost",
  size = "sm",
  showLabel = true,
  onBookmark,
  onUnbookmark,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [isAnimating, setIsAnimating] = useState(false)

  async function handleBookmark() {
    const wasBookmarked = isBookmarked
    
    // Optimistic update
    setIsBookmarked(!wasBookmarked)
    setIsAnimating(!wasBookmarked)

    try {
      const endpoint = wasBookmarked 
        ? `/api/posts/${postId}/bookmark`
        : `/api/posts/${postId}/bookmark`

      const response = await fetch(endpoint, {
        method: wasBookmarked ? "DELETE" : "POST",
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar bookmark")
      }

      // Feedback
      if (!wasBookmarked) {
        toast.success("Post salvo com sucesso!")
        if (onBookmark) onBookmark()
      } else {
        toast.success("Post removido dos salvos")
        if (onUnbookmark) onUnbookmark()
      }
    } catch (error) {
      // Reverter em caso de erro
      setIsBookmarked(wasBookmarked)
      toast.error("Erro ao salvar post")
      console.error("Erro ao bookmark:", error)
    } finally {
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBookmark}
      className={cn(
        "gap-2",
        isBookmarked && variant === "ghost" && "text-yellow-600 dark:text-yellow-500"
      )}
    >
      <motion.div
        animate={isAnimating ? {
          scale: [1, 1.3, 1],
          rotate: [0, -15, 15, 0],
        } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Bookmark 
          className={cn(
            "h-4 w-4 transition-all",
            isBookmarked && "fill-current"
          )}
        />
      </motion.div>
      {showLabel && (
        <span>{isBookmarked ? "Salvo" : "Salvar"}</span>
      )}
    </Button>
  )
}

