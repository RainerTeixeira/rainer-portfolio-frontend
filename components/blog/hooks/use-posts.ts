/**
 * Posts Hook
 *
 * Hook que gerencia busca e listagem de posts públicos do blog.
 * Filtra apenas posts com status PUBLISHED e suporta filtros avançados.
 *
 * @module components/blog/hooks/use-posts
 * @fileoverview Hook para gerenciamento de posts do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { postsService, type Post, type PostFilters } from '@/lib/api';
import { PostStatus } from '@/lib/api/types/posts';
import { useEffect, useState } from 'react';

export function usePosts(filters: PostFilters = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const response = await postsService.listPosts({
          ...filters,
          status: PostStatus.PUBLISHED,
        });
        setPosts(response.posts || []);
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [JSON.stringify(filters)]);

  return { posts, loading, error };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [previousPost, setPreviousPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const post = await postsService.getPostBySlug(slug);
        setPost(post);

        // Buscar posts relacionados da mesma categoria
        if (post.subcategoryId) {
          const related = await postsService.listPosts({
            subcategoryId: post.subcategoryId,
            status: PostStatus.PUBLISHED,
            limit: 4,
          });
          setRelatedPosts(
            related.posts?.filter(p => p.id !== post.id).slice(0, 3) || []
          );
        }

        // Buscar posts adjacentes (anterior/próximo)
        const allPosts = await postsService.listPosts({
          status: PostStatus.PUBLISHED,
          limit: 100,
        });
        const currentIndex =
          allPosts.posts?.findIndex(p => p.id === post.id) ?? -1;

        if (currentIndex > 0) {
          setNextPost(allPosts.posts?.[currentIndex - 1] || null);
        }
        if (currentIndex < (allPosts.posts?.length || 0) - 1) {
          setPreviousPost(allPosts.posts?.[currentIndex + 1] || null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error, relatedPosts, previousPost, nextPost };
}
