/**
 * Componente Principal do PostCard
 *
 * Card de preview de post para exibição em grids do blog.
 * Design premium com animações suaves, efeitos visuais e suporte a ações sociais.
 * 
 * @module components/domain/blog/post-card/post-card
 * @fileoverview Componente principal do PostCard com estilo premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * <PostCard
 *   title="Como usar Next.js 14"
 *   description="Aprenda os fundamentos do App Router..."
 *   date="15 de março, 2025"
 *   category="Tutorial"
 *   image="/posts/nextjs.jpg"
 *   link="/blog/nextjs-14"
 *   postId="post-123"
 *   showSocialActions={true}
 * />
 * ```
 * 
 * Características:
 * - Imagem de destaque responsiva com Next.js Image
 * - Badge de categoria com cores vibrantes e animação hover
 * - Data de publicação formatada de forma relativa
 * - Hover com elevação, escala e efeitos neon
 * - Link "Ler mais" com animação de seta
 * - Ações sociais opcionais (like, bookmark, share)
 * - Visual premium: gradientes, sombras neon, bordas luminosas
 * - Animações suaves com Framer Motion
 * - Acessibilidade completa (ARIA labels, keyboard navigation)
 * - Suporte a dark/light mode
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

import { Badge } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { CARD_CLASSES } from '@/lib/utils';
import { formatRelativeDate } from '@/lib/utils';
import { getDarkColors, getLightColors } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// COMPONENTES INTERNOS
// ============================================================================

import type { TiptapJSON } from '@/lib/api/types/common';
import { PostImage } from './post-image';
import { PostHeader } from './post-header';
import { PostContent } from './post-content';
import { PostSocialActions } from './post-social-actions';
import { ReadMoreLink } from './read-more-link';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Propriedades do componente PostCard
 * 
 * @interface PostCardProps
 * @property {string} title - Título do post (obrigatório)
 * @property {string} [description] - Descrição/resumo do post
 * @property {string} [date] - Data de publicação (formato livre)
 * @property {string} [category] - Categoria do post (ex: "Tutorial", "Notícia")
 * @property {string} [link] - URL completa do post para navegação
 * @property {string} [image] - URL da imagem de destaque
 * @property {string} [postId] - ID do post para interações sociais
 * @property {number} [likes] - Número inicial de curtidas
 * @property {boolean} [isLiked] - Se o post está curtido pelo usuário atual
 * @property {boolean} [isBookmarked] - Se o Post está salvo pelo usuário atual
 * @property {string | TiptapJSON} [content] - Conteúdo do post para calcular tempo de leitura
 * @property {number} [readTime] - Tempo estimado de leitura em minutos
 * @property {boolean} [showSocialActions] - Se deve mostrar ações sociais (curtir, compartilhar, etc)
 */
export interface PostCardProps {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  link?: string;
  image?: string;
  postId?: string;
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  content?: string | TiptapJSON;
  readTime?: number;
  showSocialActions?: boolean;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente PostCard
 * 
 * Renderiza card de preview de post com imagem, metadados e descrição.
 * Otimizado para grids responsivos de posts com visual premium.
 * 
 * @function PostCard
 * @param {PostCardProps} props - Propriedades do card
 * @returns {JSX.Element} Card de post renderizado
 * 
 * @remarks
 * Este componente utiliza:
 * - Next.js Image para otimização de imagens
 * - Framer Motion para animações suaves
 * - Componentes sociais (LikeButton, BookmarkButton, ShareButton)
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 * 
 * @see {@link PostImage} Componente de imagem com efeitos
 * @see {@link PostHeader} Componente de cabeçalho
 * @see {@link PostContent} Componente de conteúdo
 * @see {@link PostSocialActions} Componente de ações sociais
 * @see {@link ReadMoreLink} Componente de link "Ler mais"
 */
export function PostCard({
  title,
  description,
  date,
  category,
  link,
  image,
  postId,
  likes = 0,
  isLiked = false,
  isBookmarked = false,
  content,
  readTime,
  showSocialActions = false,
}: PostCardProps) {
  // ==========================================================================
  // DESIGN TOKENS
  // ==========================================================================

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? getDarkColors() : getLightColors();

  // Cores do tema atual (usando apenas propriedades válidas do objeto colors)
  const accentCyan = colors.primary.base;
  const accentPurple = colors.secondary.base;
  const accentPink = colors.accent.base;

  // Data relativa (se for fornecida)
  const relativeDate = date ? formatRelativeDate(date) : null;

  // ==========================================================================
  // RENDERIZAÇÃO
  // ==========================================================================

  /**
   * Componente wrapper (Link ou div)
   * Se link for fornecido, usa Link do Next.js, senão usa div
   */
  const CardWrapper = link ? Link : 'div';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="group"
      role="article"
      aria-labelledby={`post-title-${postId || title}`}
    >
      <CardWrapper
        href={link || '#'}
        className="block"
        aria-label={`Ler post: ${title}`}
      >
        <Card
          className={cn(
            CARD_CLASSES.full,
            'overflow-hidden relative',
            'border-border dark:border-cyan-400/20',
            'hover:border-cyan-400/50 dark:hover:border-cyan-400/60',
            'hover:shadow-2xl hover:shadow-cyan-500/20',
            'transition-all duration-300',
            'bg-linear-to-br from-background via-background to-background/95',
            'dark:from-black dark:via-gray-900 dark:to-black'
          )}
        >
          {/* Efeitos de background glow */}
          <PostImage 
            image={image}
            title={title}
            accentCyan={accentCyan}
            accentPurple={accentPurple}
            accentPink={accentPink}
          />

          {/* Cabeçalho com metadados */}
          <PostHeader
            title={title}
            category={category}
            date={relativeDate || undefined}
            accentCyan={accentCyan}
            accentPurple={accentPurple}
            accentPink={accentPink}
          />

          {/* Conteúdo principal */}
          <PostContent 
            description={description}
            readTime={readTime}
          />

          {/* Ações sociais */}
          {showSocialActions && postId && (
            <PostSocialActions
              postId={postId}
              likes={likes}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              link={link}
              title={title}
              description={description}
            />
          )}

          {/* Link "Ler mais" */}
          {link && (
            <ReadMoreLink 
              link={link}
              accentCyan={accentCyan}
              accentPurple={accentPurple}
              accentPink={accentPink}
            />
          )}
        </Card>
      </CardWrapper>
    </motion.article>
  );
}
