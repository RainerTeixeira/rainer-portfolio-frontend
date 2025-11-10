/**
 * Featured Posts Section Component
 *
 * Componente para seção de posts em destaque do blog.
 * Usado na página de blog para exibir posts marcados como featured.
 *
 * @module components/blog/featured-posts-section
 * @fileoverview Seção de posts em destaque
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Separator } from '@/components/ui/separator';
import type { Post } from '@/lib/api/types';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { PostCard } from './post-card';

interface FeaturedPostsSectionProps {
  posts: readonly Post[];
  maxPosts?: number;
  className?: string;
}

export function FeaturedPostsSection({
  posts,
  maxPosts = 3,
  className,
}: FeaturedPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  const displayPosts = posts.slice(0, maxPosts);

  return (
    <div className={cn('mt-6', className)}>
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-yellow-500" aria-hidden="true" />
        <h3
          id="featured-posts-heading"
          className="font-bold text-lg dark:text-yellow-200"
        >
          Posts em Destaque
        </h3>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-labelledby="featured-posts-heading"
      >
        {displayPosts.map(post => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.excerpt || ''}
            date={
              post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : new Date(post.createdAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
            }
            category={post.subcategory?.name}
            link={`/blog/${post.slug}`}
            image={post.coverImage}
          />
        ))}
      </div>
      <Separator className="my-8 dark:bg-cyan-400/20" />
    </div>
  );
}
