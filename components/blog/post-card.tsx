/**
 * Post Card Component
 *
 * Componente de card de post para exibição de previews de artigos do blog.
 * Design com animações suaves, efeitos visuais e suporte a ações sociais
 * (like, bookmark, share).
 *
 * @module components/blog/post-card
 * @fileoverview Card de preview de post de blog com estilo premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <PostCard
 *   title="Como usar Next.js 14"
 *   description="Aprenda os fundamentos do App Router..."
 *   date="15 de março, 2024"
 *   category="Tutorial"
 *   image="/posts/nextjs.jpg"
 *   link="/blog/nextjs-14"
 *   postId="post-123"
 *   showSocialActions={true}
 * />
 * ```
 *
 * Características:
 * - Imagem de destaque responsiva (Next.js Image otimizado)
 * - Badge de categoria com cores vibrantes
 * - Data de publicação formatada
 * - Hover com elevação, escala e efeitos neon
 * - Link "Ler mais" com animação de seta
 * - Ações sociais opcionais (like, bookmark, share)
 * - Visual premium: gradientes, sombras neon, bordas luminosas
 * - Animações suaves com Framer Motion
 * - Acessibilidade completa (ARIA labels, keyboard navigation)
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CARD_CLASSES, cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// BLOG COMPONENTS
// ============================================================================

import { BookmarkButton, LikeButton, ReadingTime, ShareButton } from './social';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Props do componente PostCard
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
 * @property {boolean} [isBookmarked] - Se o post está salvo pelo usuário atual
 * @property {string | object} [content] - Conteúdo do post para calcular tempo de leitura
 * @property {boolean} [showSocialActions] - Se deve mostrar ações sociais (curtir, compartilhar, etc)
 */
interface PostCardProps {
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
  content?: string | object;
  showSocialActions?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * PostCard Component
 *
 * Renderiza card de preview de post com imagem, metadados
 * e descrição. Otimizado para grids responsivos de posts com visual premium.
 *
 * Efeitos visuais:
 * - Hover: elevação (-8px), escala (1.02x) e brilho neon
 * - Transição suave com spring animation
 * - Imagem com overlay gradient no hover
 * - Bordas luminosas no dark mode
 * - Badges com cores vibrantes e gradientes
 * - Animação de seta no link "Ler mais"
 *
 * @component
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
 * @see {@link LikeButton} Componente de curtir post
 * @see {@link BookmarkButton} Componente de salvar post
 * @see {@link ShareButton} Componente de compartilhar post
 * @see {@link ReadingTime} Componente de tempo de leitura
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
  showSocialActions = false,
}: PostCardProps) {
  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  /**
   * Componente wrapper (Link ou div)
   * Se link for fornecido, usa Link do Next.js, senão usa div
   */
  const CardWrapper = link ? Link : 'div';

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

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
          {/* ================================================================
              GLOW EFFECT BACKGROUND
              ================================================================ */}

          <div
            className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />

          {/* ================================================================
              FEATURED IMAGE
              ================================================================ */}

          {image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              {/* Overlay gradient escuro */}
              <div
                className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Borda neon superior */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </div>
          )}

          {/* ================================================================
              CARD HEADER
              ================================================================ */}

          <CardHeader className="space-y-4 relative z-10">
            {/* Metadados */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {category && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-cyan-400" aria-hidden="true" />
                  <Badge
                    variant="secondary"
                    className={cn(
                      'text-xs font-mono',
                      'bg-linear-to-r from-cyan-500/10 to-purple-500/10',
                      'border border-cyan-400/30',
                      'text-cyan-600 dark:text-cyan-300',
                      'hover:from-cyan-500/20 hover:to-purple-500/20',
                      'transition-all duration-200'
                    )}
                    aria-label={`Categoria: ${category}`}
                  >
                    {category}
                  </Badge>
                </motion.div>
              )}
              {date && (
                <div
                  className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400"
                  aria-label={`Data de publicação: ${date}`}
                >
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  <time dateTime={date} className="font-mono">
                    {date}
                  </time>
                </div>
              )}
            </div>

            {/* Título com gradient no hover */}
            <CardTitle
              id={`post-title-${postId || title}`}
              className={cn(
                'text-xl leading-tight transition-all duration-300',
                'group-hover:text-transparent group-hover:bg-clip-text',
                'group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400',
                'dark:text-gray-100'
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          {/* ================================================================
              CARD CONTENT
              ================================================================ */}

          <CardContent className="space-y-4 relative z-10">
            {/* Descrição */}
            {description && (
              <CardDescription
                className={cn(
                  'text-sm leading-relaxed line-clamp-3',
                  'dark:text-gray-400'
                )}
              >
                {description}
              </CardDescription>
            )}

            {/* Tempo de leitura */}
            {content && <ReadingTime content={content} className="text-xs" />}

            {/* Ações sociais */}
            {showSocialActions && postId && (
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
                      title={title}
                      description={description}
                      variant="ghost"
                      size="sm"
                      showLabel={false}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Link "Ler mais" com animação de seta */}
            {link && (
              <motion.div
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-medium font-mono',
                  'text-cyan-600 dark:text-cyan-400',
                  'group-hover:text-cyan-500 dark:group-hover:text-cyan-300',
                  'transition-colors duration-200'
                )}
                aria-label={`Ler mais sobre: ${title}`}
              >
                <span>Ler mais</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
          </CardContent>

          {/* ================================================================
              BOTTOM NEON BORDER
              ================================================================ */}

          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </Card>
      </CardWrapper>
    </motion.article>
  );
}
