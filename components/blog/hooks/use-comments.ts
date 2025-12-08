/**
 * Comments Hook
 *
 * Hook que gerencia busca e criação de comentários públicos do blog.
 * Filtra apenas comentários aprovados e suporta criação de novos comentários.
 *
 * @module components/blog/hooks/use-comments
 * @fileoverview Hook para gerenciamento de comentários do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import {
  commentsService,
  type Comment,
  type CreateCommentData,
} from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      if (!postId) return;

      setLoading(true);
      setError(null);

      try {
        const comments = await commentsService.getCommentsByPost(postId);
        // Apenas aprovados
        setComments(comments.filter(c => c.isApproved));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar comentários'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  const addComment = async (data: CreateCommentData) => {
    try {
      const comment = await commentsService.createComment(data);
      toast.success('Comentário enviado para moderação');
      return comment;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao adicionar comentário';
      toast.error(message);
      throw err;
    }
  };

  return { comments, loading, error, addComment };
}


