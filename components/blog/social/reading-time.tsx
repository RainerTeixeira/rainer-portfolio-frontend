/**
 * Componente de Tempo de Leitura
 * 
 * Calcula e exibe o tempo estimado de leitura
 * 
 * @fileoverview Reading time component
 * @author Rainer Teixeira
 */

import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Tipo recursivo para nodes do Tiptap
interface TiptapNode {
  text?: string
  content?: TiptapNode[]
  [key: string]: unknown
}

interface TiptapContent {
  content?: TiptapNode[]
}

interface ReadingTimeProps {
  content: string | object // Aceita texto ou JSON do Tiptap
  wordsPerMinute?: number
  className?: string
  showIcon?: boolean
}

export function ReadingTime({ 
  content, 
  wordsPerMinute = 250,
  className,
  showIcon = true
}: ReadingTimeProps) {
  function calculateReadingTime(): number {
    let text = ""

    // Se for JSON do Tiptap
    if (typeof content === "object") {
      text = extractTextFromTiptap(content as TiptapContent)
    } else {
      // Se for HTML ou texto simples
      text = content.replace(/<[^>]*>/g, "")
    }

    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    
    return minutes
  }

  function extractTextFromTiptap(json: TiptapContent): string {
    if (!json || !json.content) return ""

    let text = ""

    for (const node of json.content) {
      if (node.text) {
        text += node.text + " "
      }
      if (node.content) {
        text += extractTextFromTiptap({ content: node.content })
      }
    }

    return text
  }

  const minutes = calculateReadingTime()

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 text-sm text-muted-foreground",
      className
    )}>
      {showIcon && <Clock className="h-4 w-4" />}
      <span>
        {minutes} min de leitura
      </span>
    </div>
  )
}

