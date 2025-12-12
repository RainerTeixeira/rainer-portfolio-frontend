/**
 * Comment Form Component
 *
 * Formulário de comentário para criar/editar comentários em posts. Inclui
 * validação de conteúdo, estados de loading e erro, e integração com sistema
 * de autenticação.
 *
 * @module components/domain/blog/comments/comment-form
 * @fileoverview Formulário de comentário com validação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <CommentForm
 *   postId="post-123"
 *   parentId="comment-456"
 *   onCommentAdded={(comment) => handleAdd(comment)}
 * />
 * ```
 *
 * Características:
 * - Formulário com validação Zod
 * - Suporte a comentários principais e respostas
 * - Modo de edição de comentários existentes
 * - Estados de loading e erro
 * - Integração com react-hook-form
 * - Avatar do usuário autenticado
 * - Callbacks opcionais (onCommentAdded, onCancel)
 * - Acessibilidade completa
 */

'use client';

import { useAuthContext } from '../../../providers/auth-context-provider';
import { Alert, AlertDescription } from '@rainersoft/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Textarea } from '@rainersoft/ui';
import { commentsService } from '../../../../lib/api/services';
import type { Comment } from '../../../../lib/api/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2, Send, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comentário não pode estar vazio')
    .max(1000, 'Comentário deve ter no máximo 1000 caracteres'),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  editingComment?: Comment;
  onCommentAdded?: (comment: Comment) => void;
  onCancel?: () => void;
  placeholder?: string;
}

export function CommentForm({
  postId,
  parentId,
  editingComment,
  onCommentAdded,
  onCancel,
  placeholder = 'Escreva seu comentário...',
}: CommentFormProps) {
  const { user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CommentFormValues>({
    defaultValues: {
      content: editingComment?.content || '',
    },
  });

  const content = watch('content');
  const remainingChars = 1000 - (content?.length || 0);

  async function onSubmit(data: CommentFormValues) {
    if (!user?.cognitoSub) {
      setError('Você precisa estar autenticado para comentar');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (editingComment) {
        // Atualizar comentário existente
        const updatedComment = await commentsService.updateComment(
          editingComment.id,
          {
            content: data.content,
          }
        );
        toast.success('Comentário atualizado!');
        reset();
        if (onCommentAdded) {
          onCommentAdded(updatedComment);
        }
      } else {
        // Criar novo comentário
        const newComment = await commentsService.createComment({
          content: data.content,
          postId,
          parentId,
          authorId: user.cognitoSub, // ID único do Cognito como authorId
        });
        toast.success('Comentário enviado!');
        reset();
        if (onCommentAdded) {
          onCommentAdded(newComment);
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao enviar comentário. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function getInitials(name: string | undefined | null) {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
              {getInitials(user.fullName || user.nickname)}
            </AvatarFallback>
          </Avatar>
        )}

        {/* Campo de texto */}
        <div className="flex-1 space-y-2">
          <Textarea
            {...register('content')}
            placeholder={placeholder}
            rows={3}
            className="resize-none"
            disabled={isSubmitting}
          />

          {/* Contador de caracteres e validação */}
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              {errors.content ? (
                <span className="text-destructive">
                  {errors.content.message}
                </span>
              ) : (
                <span className={remainingChars < 100 ? 'text-orange-500' : ''}>
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
            className="gap-2"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          variant="default"
          size="sm"
          className="gap-2"
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
              {editingComment ? 'Salvar' : 'Comentar'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}


