/**
 * Recent Posts List Component
 *
 * Lista de posts recentes do dashboard com ações rápidas (editar, deletar,
 * visualizar). Exibe cards informativos com metadados, imagens e operações
 * CRUD integradas com blogStore.
 *
 * @module components/dashboard/recent-posts-list
 * @fileoverview Lista de posts recentes do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <RecentPostsList
 *   onEditPost={(post) => handleEdit(post)}
 *   onDeletePost={(id) => handleDelete(id)}
 *   maxPosts={5}
 * />
 * ```
 *
 * Características:
 * - Lista de posts com metadados
 * - Ações rápidas (editar, deletar, visualizar)
 * - Estado vazio com mensagem amigável
 * - Integração com blogStore
 * - Animações suaves
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { postsService } from '@/lib/api/services';
import type { Post } from '@/lib/api/types';
import { cn } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { Calendar, Edit2, Eye, Tag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RecentPostsListProps {
  onEditPost?: (post: Post) => void;
  onDeletePost?: (postId: string) => void;
  maxPosts?: number;
}

export function RecentPostsList({
  onEditPost,
  onDeletePost,
  maxPosts = 5,
}: RecentPostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const response = await postsService.listPosts({
          limit: maxPosts,
          page: 1,
        });
        if (response.success && response.posts) {
          setPosts(response.posts);
        }
      } catch (error) {
        console.error('Erro ao carregar posts recentes:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [maxPosts]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50 animate-pulse" />
            <p>Carregando posts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum post criado ainda</p>
            <p className="text-sm mt-2">Comece criando seu primeiro post!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: index * 0.1,
              }}
              className={cn(
                'p-4 rounded-lg border-2 transition-all duration-300',
                'hover:border-cyan-400/50 dark:hover:border-cyan-400/50',
                'hover:shadow-md dark:hover:shadow-cyan-400/10',
                'hover:scale-[1.02]',
                'group'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Imagem do Post */}
                {post.coverImage && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Informações do Post */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg line-clamp-1 dark:text-gray-100">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Status */}
                    {post.status === 'PUBLISHED' ? (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                    {post.subcategory?.name && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {post.subcategory.name}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
                        : new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditPost?.(post)}
                      className="gap-2 dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                    >
                      <Edit2 className="w-3 h-3" />
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDeletePost?.(post.id)}
                      className="gap-2 dark:border-red-400/30 dark:hover:bg-red-400/10 dark:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                      Deletar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


