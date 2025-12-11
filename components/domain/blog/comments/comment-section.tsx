/**
 * Comment Section Component
 *
 * Seção de comentários para exibir e gerenciar comentários de posts. Suporta
 * comentários aninhados (replies), edição e exclusão de comentários, e
 * integração com sistema de autenticação.
 *
 * @module components/domain/blog/comments/comment-section
 * @fileoverview Seção completa de comentários com CRUD
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <CommentSection postId="post-123" />
 * ```
 *
 * Características:
 * - Lista de comentários com autor e metadados
 * - Formulário de novo comentário
 * - Suporte a comentários aninhados (replies)
 * - Edição e exclusão de comentários
 * - Estados de loading e erro
 * - Integração com sistema de autenticação
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

import { useAuthContext } from '@/components/providers/auth-context-provider';
import { Alert, AlertDescription } from '@rainersoft/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { commentsService } from '@/lib/api/services';
import type { Comment as ApiComment } from '@/lib/api/types';
import { AlertCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

// Tipo estendido de comentário com informações do autor e replies
export interface CommentWithAuthor extends ApiComment {
  author?: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  replies?: CommentWithAuthor[];
  // Mantém createdAt e updatedAt como string (do ApiComment)
}

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuthContext();
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = user?.cognitoSub || user?.id; // ID único do Cognito

  const loadComments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Buscar comentários aprovados do post
      const commentsList = await commentsService.getCommentsByPost(postId);

      // Organizar comentários em estrutura hierárquica (comentários e replies)
      const commentsMap = new Map<string, CommentWithAuthor>();
      const rootComments: CommentWithAuthor[] = [];

      // Primeiro, criar mapa de todos os comentários
      commentsList.forEach(comment => {
        commentsMap.set(comment.id, {
          ...comment,
          replies: [] as CommentWithAuthor[],
        });
      });

      // Organizar em estrutura hierárquica
      commentsMap.forEach(comment => {
        if (comment.parentId) {
          // É uma resposta
          const parent = commentsMap.get(comment.parentId);
          if (parent) {
            if (!parent.replies) {
              parent.replies = [];
            }
            parent.replies.push(comment);
          }
        } else {
          // É um comentário raiz
          rootComments.push(comment);
        }
      });

      // Ordenar comentários por data (mais recentes primeiro)
      rootComments.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      rootComments.forEach(comment => {
        if (comment.replies) {
          comment.replies.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      });

      setComments(rootComments);
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
      setError('Erro ao carregar comentários. Tente novamente mais tarde.');
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCommentAdded = async (_newComment: ApiComment) => {
    // Recarregar comentários para obter dados atualizados do backend
    await loadComments();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCommentDeleted = async (_commentId: string) => {
    // Recarregar comentários após deletar
    await loadComments();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCommentUpdated = async (_updatedComment: ApiComment) => {
    // Recarregar comentários após atualizar
    await loadComments();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReplyAdded = async (_reply: ApiComment) => {
    // Recarregar comentários após adicionar resposta
    await loadComments();
  };

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
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        ) : (
          <Alert>
            <AlertDescription>
              <a
                href="/dashboard/login"
                className="text-primary hover:underline font-medium"
              >
                Faça login
              </a>{' '}
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
            {[1, 2, 3].map(i => (
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
            {comments.map(comment => (
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
  );
}


