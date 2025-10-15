/**
 * Botão de Bookmark/Salvar
 * 
 * Botão para salvar posts para ler depois
 * 
 * @fileoverview Bookmark button component
 * @author Rainer Teixeira
 */

"use client"

import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useBookmark } from "../hooks"

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
  const { isBookmarked, isAnimating, handleBookmark } = useBookmark(
    postId,
    initialIsBookmarked,
    onBookmark,
    onUnbookmark
  )

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

