/**
 * Related Posts Component
 *
 * Componente que exibe posts relacionados baseados em categoria/tags. Filtra
 * automaticamente o post atual, exibe até 3 posts relacionados em cards
 * animados com metadados completos.
 *
 * @module components/domain/blog/related-posts
 * @fileoverview Componente de posts relacionados
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <RelatedPosts
 *   posts={allPosts}
 *   currentPostId="post-123"
 * />
 * ```
 *
 * Características:
 * - Filtragem automática do post atual
 * - Grid responsivo (1-3 colunas)
 * - Cards com metadados completos
 * - Animações suaves com Framer Motion
 * - Integração com ReadingTime
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

import { Badge } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import type { PostWithRelations } from '@/lib/api/types';
import { cn } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { ReadingTime } from './social/reading-time';

interface RelatedPostsProps {
  posts: PostWithRelations[];
  currentPostId: string;
  className?: string;
}

export function RelatedPosts({
  posts,
  currentPostId,
  className,
}: RelatedPostsProps) {
  // Filtrar post atual
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className={cn('space-y-6', className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Posts Relacionados
        </h2>
        <p className="text-muted-foreground">
          Continue explorando conteúdos similares
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.subcategory && (
                      <Badge variant="secondary" className="bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30">{post.subcategory.name}</Badge>
                    )}
                    {post.featured && (
                      <Badge variant="secondary" className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0">
                        ⭐ Destaque
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-3">
                    {/* Extrair preview do conteúdo */}
                    {post.content &&
                      typeof post.content === 'object' &&
                      extractPreview(post.content)}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likesCount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.commentsCount.toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <ReadingTime content={post.content} className="text-xs" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Types para o conteúdo Tiptap
interface TiptapTextNode {
  text?: string;
  type?: string;
}

interface TiptapNode {
  type?: string;
  content?: TiptapTextNode[];
}

interface TiptapContent {
  content?: TiptapNode[];
}

// Helper para extrair preview do JSON do Tiptap
function extractPreview(
  content: TiptapContent | Record<string, unknown>
): string {
  if (!content || !('content' in content) || !Array.isArray(content.content))
    return '';

  let text = '';
  for (const node of content.content) {
    if (node.type === 'paragraph' && node.content) {
      for (const textNode of node.content) {
        if (textNode.text) {
          text += textNode.text + ' ';
        }
      }
      if (text.length > 150) break;
    }
  }

  return text.slice(0, 150) + (text.length > 150 ? '...' : '');
}


