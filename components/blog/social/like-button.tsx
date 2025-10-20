/**
 * Botão de Curtir
 * 
 * Botão animado para curtir posts e comentários
 * 
 * @fileoverview Like button component
 * @author Rainer Teixeira
 */

"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useLike } from "../hooks"

interface LikeButtonProps {
  postId: string
  initialLikes: number
  initialIsLiked?: boolean
  variant?: "default" | "compact"
  onLike?: () => void
  onUnlike?: () => void
}

export function LikeButton({ 
  postId, 
  initialLikes, 
  initialIsLiked = false,
  variant = "default",
  onLike,
  onUnlike,
}: LikeButtonProps) {
  const { isLiked, likes, isAnimating, handleLike } = useLike(
    postId,
    initialLikes,
    initialIsLiked,
    onLike,
    onUnlike
  )

  if (variant === "compact") {
    return (
      <button
        onClick={handleLike}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm transition-colors",
          isLiked 
            ? "text-red-500 dark:text-red-400" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <motion.div
          animate={isAnimating ? {
            scale: [1, 1.3, 1],
          } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-all",
              isLiked && "fill-current"
            )}
          />
        </motion.div>
        <span className="font-medium">{likes.toLocaleString()}</span>
      </button>
    )
  }

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      className={cn(
        "gap-2 transition-all",
        isLiked && "bg-red-500 hover:bg-red-600 text-white border-red-500"
      )}
    >
      <motion.div
        animate={isAnimating ? {
          scale: [1, 1.3, 1],
          rotate: [0, -10, 10, 0],
        } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Heart 
          className={cn(
            "h-4 w-4 transition-all",
            isLiked && "fill-current"
          )}
        />
      </motion.div>
      <span className="font-medium">
        {isLiked ? "Curtido" : "Curtir"}
      </span>
      {likes > 0 && (
        <span className={cn(
          "text-xs px-1.5 py-0.5 rounded-full",
          isLiked 
            ? "bg-red-600 text-white" 
            : "bg-muted text-muted-foreground"
        )}>
          {likes.toLocaleString()}
        </span>
      )}
    </Button>
  )
}

