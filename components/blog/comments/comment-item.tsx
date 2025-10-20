/**
 * Item de Comentário
 * 
 * Componente individual de comentário com suporte a respostas aninhadas
 * 
 * @fileoverview Comment item component
 * @author Rainer Teixeira
 */

"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CommentForm } from "./comment-form"
import { Heart, Reply, MoreVertical, Trash2, Edit, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Comment } from "@/types/database"
import { toast } from "sonner"

// Tipo estendido com dados do autor
type CommentWithAuthor = Comment & {
  author?: {
    name: string
    avatar?: string
  }
  replies?: CommentWithAuthor[]
}

interface CommentItemProps {
  comment: CommentWithAuthor
  postId: string
  currentUserId?: string
  depth?: number
  onCommentDeleted?: (commentId: string) => void
  onCommentUpdated?: (comment: Comment) => void
  onReplyAdded?: (comment: Comment) => void
}

export function CommentItem({ 
  comment, 
  postId,
  currentUserId,
  depth = 0,
  onCommentDeleted,
  onCommentUpdated,
  onReplyAdded,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0)

  const isAuthor = currentUserId === comment.authorId
  const maxDepth = 3 // Máximo 3 níveis de resposta
  const canReply = depth < maxDepth

  function getInitials(name: string) {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  async function handleLike() {
    const wasLiked = isLiked
    setIsLiked(!wasLiked)
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1)

    try {
      const response = await fetch(`/api/comments/${comment.id}/like`, {
        method: wasLiked ? "DELETE" : "POST",
      })

      if (!response.ok) throw new Error("Erro ao curtir")
    } catch {
      setIsLiked(wasLiked)
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1)
      toast.error("Erro ao curtir comentário")
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erro ao deletar")

      toast.success("Comentário deletado com sucesso")
      if (onCommentDeleted) {
        onCommentDeleted(comment.id)
      }
    } catch {
      toast.error("Erro ao deletar comentário")
    }
  }

  async function handleReport() {
    try {
      const response = await fetch(`/api/comments/${comment.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Conteúdo inapropriado" }),
      })

      if (!response.ok) throw new Error("Erro ao reportar")

      toast.success("Comentário reportado. Obrigado!")
    } catch (error) {
      console.error("Erro ao reportar:", error)
      toast.error("Erro ao reportar comentário")
    }
  }

  function handleReplySuccess(newComment: Comment) {
    setShowReplyForm(false)
    if (onReplyAdded) {
      onReplyAdded(newComment)
    }
  }

  return (
    <div className={cn("space-y-3", depth > 0 && "ml-8 md:ml-12")}>
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={comment.author?.avatar} />
          <AvatarFallback>
            {getInitials(comment.author?.name || "User")}
          </AvatarFallback>
        </Avatar>

        {/* Conteúdo */}
        <div className="flex-1 space-y-2 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium truncate">
                  {comment.author?.name || "Usuário"}
                </span>
                {comment.isEdited && (
                  <span className="text-xs text-muted-foreground">(editado)</span>
                )}
              </div>
              <time className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </time>
            </div>

            {/* Menu de ações */}
            {currentUserId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAuthor ? (
                    <>
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={handleReport}>
                      <Flag className="mr-2 h-4 w-4" />
                      Reportar
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Conteúdo do comentário */}
          {isEditing ? (
            <CommentForm
              postId={postId}
              parentId={comment.parentId ?? undefined}
              editingComment={comment}
              onCommentAdded={(updated) => {
                setIsEditing(false)
                if (onCommentUpdated) {
                  onCommentUpdated(updated)
                }
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          )}

          {/* Ações */}
          <div className="flex items-center gap-4">
            {/* Curtir */}
            <button
              onClick={handleLike}
              disabled={!currentUserId}
              className={cn(
                "flex items-center gap-1.5 text-sm transition-colors",
                isLiked 
                  ? "text-red-500 dark:text-red-400" 
                  : "text-muted-foreground hover:text-foreground",
                !currentUserId && "cursor-not-allowed opacity-50"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              {likesCount > 0 && <span>{likesCount}</span>}
            </button>

            {/* Responder */}
            {canReply && currentUserId && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Reply className="h-4 w-4" />
                Responder
              </button>
            )}
          </div>

          {/* Formulário de resposta */}
          {showReplyForm && (
            <div className="pt-3">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onCommentAdded={handleReplySuccess}
                onCancel={() => setShowReplyForm(false)}
                placeholder={`Respondendo ${comment.author?.name}...`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Respostas aninhadas */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {/* Toggle de respostas */}
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-12 md:ml-16"
          >
            {showReplies ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {showReplies ? "Ocultar" : "Mostrar"} {comment.replies.length} {comment.replies.length === 1 ? "resposta" : "respostas"}
          </button>

          {/* Respostas */}
          {showReplies && (
            <div className="space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  currentUserId={currentUserId}
                  depth={depth + 1}
                  onCommentDeleted={onCommentDeleted}
                  onCommentUpdated={onCommentUpdated}
                  onReplyAdded={onReplyAdded}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dialog de confirmação de deleção */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar comentário?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O comentário será permanentemente deletado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

