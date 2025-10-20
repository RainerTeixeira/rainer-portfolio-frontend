/**
 * Formulário de Comentário
 * 
 * Formulário para criar/editar comentários
 * 
 * @fileoverview Comment form component
 * @author Rainer Teixeira
 */

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/providers/auth-provider"
import type { Comment } from "@/types/database"

const commentSchema = z.object({
  content: z.string()
    .min(1, "Comentário não pode estar vazio")
    .max(1000, "Comentário deve ter no máximo 1000 caracteres"),
})

type CommentFormValues = z.infer<typeof commentSchema>

interface CommentFormProps {
  postId: string
  parentId?: string
  editingComment?: Comment
  onCommentAdded?: (comment: Comment) => void
  onCancel?: () => void
  placeholder?: string
}

export function CommentForm({ 
  postId, 
  parentId,
  editingComment,
  onCommentAdded,
  onCancel,
  placeholder = "Escreva seu comentário..."
}: CommentFormProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: editingComment?.content || "",
    },
  })

  const content = watch("content")
  const remainingChars = 1000 - (content?.length || 0)

  async function onSubmit(data: CommentFormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = editingComment 
        ? `/api/comments/${editingComment.id}`
        : `/api/posts/${postId}/comments`

      const method = editingComment ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          parentId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao enviar comentário")
      }

      const newComment = await response.json()

      toast.success(editingComment ? "Comentário atualizado!" : "Comentário enviado!")
      
      reset()
      
      if (onCommentAdded) {
        onCommentAdded(newComment)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao enviar comentário. Tente novamente."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        {/* Avatar do usuário */}
        {user && (
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {getInitials(user.name || user.username)}
            </AvatarFallback>
          </Avatar>
        )}

        {/* Campo de texto */}
        <div className="flex-1 space-y-2">
          <Textarea
            {...register("content")}
            placeholder={placeholder}
            rows={3}
            className="resize-none"
            disabled={isSubmitting}
          />

          {/* Contador de caracteres e validação */}
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              {errors.content ? (
                <span className="text-destructive">{errors.content.message}</span>
              ) : (
                <span className={remainingChars < 100 ? "text-orange-500" : ""}>
                  {remainingChars} caracteres restantes
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || !content?.trim()}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {editingComment ? "Salvar" : "Comentar"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

