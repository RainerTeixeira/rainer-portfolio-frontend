/**
 * Componente de Ações Sociais do PostCard
 *
 * Componente com botões de interação social: like, bookmark, share.
 * Layout responsivo com design minimalista e animações suaves.
 * 
 * @module components/domain/blog/post-card/post-social-actions
 * @fileoverview Componente de ações sociais para posts do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * <PostSocialActions
 *   postId="post-123"
 *   likes={42}
 *   isLiked={true}
 *   isBookmarked={false}
 *   link="/blog/post-url"
 *   title="Título do Post"
 *   description="Descrição do post"
 * />
 * ```
 */

'use client';

import { cn } from '@rainersoft/ui';

// ============================================================================
// COMPONENTES DE AÇÕES SOCIAIS
// ============================================================================

import { LikeButton, BookmarkButton, ShareButton } from '../social';

/**
 * Propriedades do componente PostSocialActions
 * 
 * @interface PostSocialActionsProps
 * @property {string} postId - ID do post para interações
 * @property {number} [likes] - Número inicial de curtidas
 * @property {boolean} [isLiked] - Se o post está curtido pelo usuário atual
 * @property {boolean} [isBookmarked] - Se o Post está salvo pelo usuário atual
 * @property {string} [link] - URL completa do post para compartilhamento
 * @property {string} [title] - Título do post para compartilhamento
 * @property {string} [description] - Descrição do post para compartilhamento
 */
export interface PostSocialActionsProps {
  postId: string;
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  link?: string;
  title?: string;
  description?: string;
}

/**
 * Componente PostSocialActions
 * 
 * Renderiza ações sociais com layout responsivo:
 * - Botões de like, bookmark e share
 * - Design minimalista e acessível
 * - Prevenção de navegação ao clicar nos botões
 * - Animações suaves de hover
 * 
 * @function PostSocialActions
 * @param {PostSocialActionsProps} props - Propriedades das ações sociais
 * @returns {JSX.Element} Ações sociais renderizadas
 */
export function PostSocialActions({
  postId,
  likes = 0,
  isLiked = false,
  isBookmarked = false,
  link,
  title,
  description,
}: PostSocialActionsProps) {
  return (
    <div
      className="flex items-center justify-between gap-2 pt-2 border-t border-border/50"
      onClick={e => e.preventDefault()} // Impede navegação ao clicar nos botões
      role="group"
      aria-label="Ações sociais do post"
    >
      <div className="flex items-center gap-1">
        <LikeButton
          postId={postId}
          initialLikes={likes}
          initialIsLiked={isLiked}
          variant="compact"
        />
      </div>
      <div className="flex items-center gap-1">
        <BookmarkButton
          postId={postId}
          initialIsBookmarked={isBookmarked}
          variant="ghost"
          size="sm"
          showLabel={false}
        />
        {link && (
          <ShareButton
            url={link}
            title={title || 'Post do Blog'}
            description={description}
            variant="ghost"
            size="sm"
            showLabel={false}
          />
        )}
      </div>
    </div>
  );
}
