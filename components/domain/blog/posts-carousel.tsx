/**
 * Posts Carousel Component
 *
 * Carrossel para exibir posts em destaque. Inspirado em blogs modernos, inclui
 * navegação por setas, cards com imagens e metadados, e animações suaves com
 * Framer Motion.
 *
 * @module components/domain/blog/posts-carousel
 * @fileoverview Componente de carrossel para posts em destaque
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <PostsCarousel posts={featuredPosts} />
 * ```
 *
 * Características:
 * - Carrossel com navegação por setas
 * - Cards de posts com imagens e metadados
 * - Animações suaves com Framer Motion
 * - Integração com design tokens
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@rainersoft/ui';
import { Card } from '@rainersoft/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';

// ============================================================================
// Types
// ============================================================================

interface FeaturedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  createdAt: string;
  views?: number | null;
  likesCount?: number | null;
  subcategory?: {
    name: string;
  } | null;
}

interface PostsCarouselProps {
  posts: FeaturedPost[];
  maxPosts?: number;
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function PostsCarousel({
  posts,
  maxPosts = 5,
  className,
}: PostsCarouselProps) {
  // Filtrar posts até o máximo especificado
  const displayPosts = posts.slice(0, maxPosts);

  // Se não houver posts, não renderizar
  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Posts em destaque"
      className={cn('relative max-w-7xl mx-auto px-6 mb-16', className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <h2 className={cn('text-2xl dark:text-cyan-200', 'font-bold')}>
              Posts em Destaque
            </h2>
          </div>
        </div>

        {/* Carrossel usando shadcn/ui */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {displayPosts.map((post, index) => (
              <CarouselItem key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <Card
                    className={cn(
                      'group overflow-hidden border-border/50 dark:border-gray-800/50 hover:border-primary/50 dark:hover:border-cyan-400/30',
                      'transition-all duration-200 ease-in-out',
                      'hover:shadow-xl'
                    )}
                  >
                    {post.coverImage ? (
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Imagem - Destaque Principal */}
                        <div className="relative h-64 md:h-[450px] overflow-hidden order-2 md:order-1">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className={cn(
                              'object-cover group-hover:scale-110',
                              'transition-transform duration-500 ease-in-out'
                            )}
                            priority={index === 0}
                          />
                          <div
                            className={cn(
                              'absolute inset-0',
                              GRADIENT_DIRECTIONS.TO_RIGHT,
                              'md:from-black/50 md:via-black/20 md:to-transparent',
                              'from-black/40 via-transparent to-transparent'
                            )}
                          />
                          {/* Badge sobre a imagem */}
                          {post.subcategory && (
                            <div
                              className={cn('absolute top-6 left-6', 'z-10')}
                            >
                              <Badge
                                variant="secondary"
                                className={cn(
                                  'bg-black/70 border-cyan-400/40 text-cyan-200',
                                  'backdrop-blur-sm',
                                  'shadow-2xl'
                                )}
                              >
                                {post.subcategory.name}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Conteúdo */}
                        <div
                          className={cn(
                            'p-8 md:p-10 flex flex-col justify-center order-1 md:order-2',
                            `${GRADIENT_DIRECTIONS.TO_BR} from-background to-muted/20`
                          )}
                        >
                          <h3
                            className={cn(
                              'text-3xl sm:text-4xl mb-4 group-hover:text-primary dark:group-hover:text-cyan-300 line-clamp-2',
                              'font-bold',
                              'transition-colors duration-200 ease-in-out'
                            )}
                          >
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground dark:text-gray-300 mb-6 line-clamp-4 text-lg">
                            {post.excerpt || ''}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground dark:text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.createdAt).toLocaleDateString(
                                'pt-BR',
                                {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                }
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              {post.views || 0}
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4" />
                              {post.likesCount || 0}
                            </div>
                          </div>
                          <div
                            className={cn(
                              'flex items-center gap-2 text-primary dark:text-cyan-400 text-lg group-hover:gap-3',
                              'font-semibold',
                              'transition-all duration-200 ease-in-out'
                            )}
                          >
                            Ler mais
                            <ArrowRight
                              className={cn(
                                'h-5 w-5 group-hover:translate-x-1',
                                'transition-transform duration-200 ease-in-out'
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Sem imagem - Layout completo */
                      <div className="p-8 md:p-12">
                        {post.subcategory && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              'w-fit mb-4',
                              `${GRADIENT_DIRECTIONS.TO_RIGHT} from-cyan-500/10 to-purple-500/10`,
                              'border-cyan-400/20 text-cyan-600 dark:text-cyan-400'
                            )}
                          >
                            {post.subcategory.name}
                          </Badge>
                        )}
                        <h3
                          className={cn(
                            'text-3xl sm:text-4xl mb-4 group-hover:text-primary dark:group-hover:text-cyan-300 line-clamp-2',
                            'font-bold',
                            'transition-colors duration-200 ease-in-out'
                          )}
                        >
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground dark:text-gray-300 mb-6 line-clamp-4 text-lg">
                          {post.excerpt || ''}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground dark:text-gray-400 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            {post.views || 0}
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            {post.likesCount || 0}
                          </div>
                        </div>
                        <div
                          className={cn(
                            'flex items-center gap-2 text-primary dark:text-cyan-400 text-lg group-hover:gap-3',
                            'font-semibold',
                            'transition-all duration-200 ease-in-out'
                          )}
                        >
                          Ler mais
                          <ArrowRight
                            className={cn(
                              'h-5 w-5 group-hover:translate-x-1',
                              'transition-transform duration-200 ease-in-out'
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {displayPosts.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </motion.div>
    </section>
  );
}



