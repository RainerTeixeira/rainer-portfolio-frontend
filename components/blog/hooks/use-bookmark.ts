/**
 * Bookmark Hook
 *
 * Hook que gerencia marcação/desmarcação de posts salvos com optimistic
 * updates, animações, notificações e persistência via API. Inclui rollback
 * em caso de erro.
 *
 * @module components/blog/hooks/use-bookmark
 * @fileoverview Hook para gerenciamento de bookmarks de posts
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook useBookmark
 *
 * Gerencia o estado e lógica de bookmarks de um post.
 * Atualiza a UI otimisticamente e sincroniza com o backend.
 *
 * @param {string} postId - ID do post
 * @param {boolean} [initialIsBookmarked=false] - Se o post já está salvo
 * @param {Function} [onBookmark] - Callback ao salvar
 * @param {Function} [onUnbookmark] - Callback ao remover dos salvos
 *
 * @returns {Object} Estado e funções de bookmark
 * @returns {boolean} isBookmarked - Se o post está salvo
 * @returns {boolean} isAnimating - Se está animando
 * @returns {Function} handleBookmark - Função para salvar/remover
 *
 * @example
 * import { useBookmark } from '@/components/blog/hooks'
 *
 * function BookmarkButton({ postId }) {
 *   const { isBookmarked, isAnimating, handleBookmark } = useBookmark(
 *     postId,
 *     false,
 *     () => console.log('Salvo!'),
 *     () => console.log('Removido!')
 *   )
 *
 *   return (
 *     <button onClick={handleBookmark}>
 *       {isBookmarked ? '🔖' : '📑'} {isBookmarked ? 'Salvo' : 'Salvar'}
 *     </button>
 *   )
 * }
 */
export function useBookmark(
  postId: string,
  initialIsBookmarked = false,
  onBookmark?: () => void,
  onUnbookmark?: () => void
) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isAnimating, setIsAnimating] = useState(false);

  async function handleBookmark() {
    const wasBookmarked = isBookmarked;

    // Optimistic update
    setIsBookmarked(!wasBookmarked);
    setIsAnimating(!wasBookmarked);

    try {
      const endpoint = wasBookmarked
        ? `/api/posts/${postId}/bookmark`
        : `/api/posts/${postId}/bookmark`;

      const response = await fetch(endpoint, {
        method: wasBookmarked ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar bookmark');
      }

      // Feedback
      if (!wasBookmarked) {
        toast.success('Post salvo com sucesso!');
        if (onBookmark) onBookmark();
      } else {
        toast.success('Post removido dos salvos');
        if (onUnbookmark) onUnbookmark();
      }
    } catch (error) {
      // Reverter em caso de erro
      setIsBookmarked(wasBookmarked);
      toast.error('Erro ao salvar post');
      console.error('Erro ao bookmark:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 600);
    }
  }

  return {
    isBookmarked,
    isAnimating,
    handleBookmark,
  };
}
