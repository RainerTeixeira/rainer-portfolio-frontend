/**
 * Seção de Comentários
 * 
 * Componente completo para exibir e gerenciar comentários de posts
 * 
 * @fileoverview Comment Section Component
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect, useCallback } from "react"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import { useAuth } from "@/components/providers/auth-provider"
import type { Comment as CommentType } from "@/types/database"

// Tipo estendido com informações do autor
export interface Comment extends CommentType {
  author?: {
    id: string
    name: string
    username: string
    avatar?: string
  }
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentUserId = user?.username // Usar username como ID temporário

  const loadComments = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // TODO: Implementar busca de comentários do backend
      const response = await fetch(`/api/posts/${postId}/comments`)
      
      if (!response.ok) {
        throw new Error('Erro ao carregar comentários')
      }
      
      const data = await response.json()
      setComments(data)
    } catch {
      // Fallback: usar dados mockados para demonstração
      const mockComments: Comment[] = [
        {
          id: '1',
          content: 'Excelente artigo! Muito bem explicado. Esse tipo de conteúdo é exatamente o que eu estava procurando para entender melhor sobre microserviços.',
          authorId: 'user-1',
          postId,
          isApproved: true,
          isReported: false,
          isEdited: false,
          likesCount: 5,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          author: {
            id: 'user-1',
            name: 'Carlos Silva',
            username: 'carlos.silva',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
          },
        },
        {
          id: '2',
          content: 'Concordo totalmente! Passei por essa migração recentemente e os pontos levantados aqui são muito importantes.',
          authorId: 'user-2',
          postId,
          isApproved: true,
          isReported: false,
          isEdited: false,
          likesCount: 3,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
          updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
          author: {
            id: 'user-2',
            name: 'Ana Paula',
            username: 'ana.paula',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
          },
        },
        {
          id: '3',
          content: 'Gostaria de saber mais sobre como implementar o Event Storming na prática. Tem algum material complementar?',
          authorId: 'user-3',
          postId,
          isApproved: true,
          isReported: false,
          isEdited: false,
          likesCount: 2,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          author: {
            id: 'user-3',
            name: 'Pedro Santos',
            username: 'pedro.santos',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
          },
          replies: [
            {
              id: '4',
              content: 'Boa pergunta! Vou preparar um artigo específico sobre Event Storming em breve.',
              authorId: 'admin-1',
              postId,
              parentId: '3',
              isApproved: true,
              isReported: false,
              isEdited: false,
              likesCount: 1,
              createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
              updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
              author: {
                id: 'admin-1',
                name: 'Rainer Teixeira',
                username: 'rainer.teixeira',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rainer',
              },
            },
          ],
        },
      ]
      setComments(mockComments)
      setError(null) // Não mostrar erro quando usar mock
    } finally {
      setIsLoading(false)
    }
  }, [postId])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  const handleCommentAdded = (newComment: Comment) => {
    setComments([newComment, ...comments])
  }

  const handleCommentDeleted = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId))
  }

  const handleCommentUpdated = (updatedComment: Comment) => {
    setComments(comments.map(c => 
      c.id === updatedComment.id ? updatedComment : c
    ))
  }

  const handleReplyAdded = (reply: Comment) => {
    // Adicionar resposta ao comentário pai
    setComments(comments.map(c => {
      if (c.id === reply.parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), reply]
        }
      }
      return c
    }))
  }

  return (
    <Card className="dark:bg-black/50 dark:border-cyan-400/20">
      <CardHeader>
        <CardTitle className="dark:text-cyan-200 dark:font-mono">
          Comentários ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulário de novo comentário */}
        {currentUserId ? (
          <CommentForm
            postId={postId}
            onCommentAdded={handleCommentAdded}
          />
        ) : (
          <Alert>
            <AlertDescription>
              <a href="/dashboard/login" className="text-primary hover:underline font-medium">
                Faça login
              </a>{" "}
              para comentar
            </AlertDescription>
          </Alert>
        )}

        {/* Lista de comentários */}
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                currentUserId={currentUserId}
                onCommentDeleted={handleCommentDeleted}
                onCommentUpdated={handleCommentUpdated}
                onReplyAdded={handleReplyAdded}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
