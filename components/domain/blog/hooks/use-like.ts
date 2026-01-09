/**
 * Like Hook
 *
 * Hook que gerencia curtidas/descurtidas de posts com optimistic updates,
 * animações e persistência via API. Inclui rollback em caso de erro.
 *
 * @module components/domain/blog/hooks/use-like
 * @fileoverview Hook para gerenciamento de curtidas de posts
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { useState } from 'react';

/**
 * Hook useLike
 *
 * Gerencia o estado e lógica de curtidas de um post.
 * Atualiza a UI otimisticamente e sincroniza com o backend.
 *
 * @param {string} postId - ID do post
 * @param {number} initialLikes - Número inicial de curtidas
 * @param {boolean} [initialIsLiked=false] - Se o usuário já curtiu
 * @param {Function} [onLike] - Callback ao curtir
 * @param {Function} [onUnlike] - Callback ao descurtir
 *
 * @returns {Object} Estado e funções de like
 * @returns {boolean} isLiked - Se o post está curtido
 * @returns {number} likes - Número atual de curtidas
 * @returns {boolean} isAnimating - Se está animando
 * @returns {Function} handleLike - Função para curtir/descurtir
 *
 * @example
 * import { useLike } from '@/components/domain/blog/hooks'
 *
 * function LikeButton({ postId }) {
 *   const { isLiked, likes, isAnimating, handleLike } = useLike(
 *     postId,
 *     10,
 *     false,
 *     () => console.log('Curtido!'),
 *     () => console.log('Descurtido!')
 *   )
 *
 *   return (
 *     <button onClick={handleLike}>
 *       {isLiked ? '❤️' : '🤍'} {likes}
 *     </button>
 *   )
 * }
 */
export function useLike(
  postId: string,
  initialLikes: number,
  initialIsLiked = false,
  onLike?: () => void,
  onUnlike?: () => void
) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  async function handleLike() {
    const wasLiked = isLiked;

    // Optimistic update
    setIsLiked(!wasLiked);
    setLikes(prev => (wasLiked ? prev - 1 : prev + 1));
    setIsAnimating(!wasLiked);

    try {
      const endpoint = wasLiked
        ? `/api/posts/${postId}/unlike`
        : `/api/posts/${postId}/like`;

      const response = await fetch(endpoint, {
        method: wasLiked ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar curtida');
      }

      // Chamar callbacks
      if (wasLiked && onUnlike) {
        onUnlike();
      } else if (!wasLiked && onLike) {
        onLike();
      }
    } catch (error) {
      // Reverter em caso de erro
      setIsLiked(wasLiked);
      setLikes(prev => (wasLiked ? prev + 1 : prev - 1));
      console.error('Erro ao curtir:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 600);
    }
  }

  return {
    isLiked,
    likes,
    isAnimating,
    handleLike,
  };
}


