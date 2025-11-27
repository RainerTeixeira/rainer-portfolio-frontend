/**
 * Post Navigation Component
 *
 * Componente para navegação entre posts (anterior/próximo).
 * Usado na página individual do post para navegar entre artigos.
 *
 * @module components/blog/post-navigation
 * @fileoverview Navegação entre posts
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Card, CardContent } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PostNavigationItem {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  previousPost: PostNavigationItem | null;
  nextPost: PostNavigationItem | null;
  className?: string;
}

export function PostNavigation({
  previousPost,
  nextPost,
  className,
}: PostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <div className={cn('space-y-8', className)}>
      <Separator className="dark:bg-cyan-400/20" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Post */}
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            aria-label={`Post anterior: ${previousPost.title}`}
          >
            <Card className="h-full dark:bg-black/50 dark:border-cyan-400/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400 mb-2">
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Post Anterior</span>
                </div>
                <h3 className="font-semibold dark:text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {previousPost.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Post */}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            aria-label={`Próximo post: ${nextPost.title}`}
          >
            <Card className="h-full dark:bg-black/50 dark:border-cyan-400/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/60 transition-all group">
              <CardContent className="p-6 text-right">
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground dark:text-gray-400 mb-2">
                  <span>Próximo Post</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-semibold dark:text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {nextPost.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}


