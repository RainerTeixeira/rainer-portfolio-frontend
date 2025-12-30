/**
 * Posts Hook
 *
 * Hook que gerencia busca e listagem de posts públicos do blog.
 * Filtra apenas posts com status PUBLISHED e suporta filtros avançados.
 *
 * @module components/domain/blog/hooks/use-posts
 * @fileoverview Hook para gerenciamento de posts do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { publicBlogPosts as postsService } from '@/lib/api';
import {
  PostStatus,
  type GetPostsParams as PostFilters,
  type Post,
} from '@/lib/api/types/public/blog';
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
        const response = await postsService.getPublicPosts({
          ...filters,
          status: PostStatus.PUBLISHED,
        });
        const data = (response as any)?.data ?? response?.data ?? response;
        setPosts(Array.isArray(data) ? data : data?.data || []);
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
        const post = await postsService.getPublicPostBySlug(slug);
        setPost(post);

        // Buscar posts relacionados da mesma categoria
        if (post.category?.id) {
          const related = await postsService.getPublicPosts({
            categoryId: post.category.id,
            status: PostStatus.PUBLISHED,
            limit: 4,
          });
          const relatedData = (related as any)?.data ?? related?.data ?? [];
          const relatedArray: Post[] = Array.isArray(relatedData)
            ? relatedData
            : relatedData?.data || [];
          setRelatedPosts(
            relatedArray.filter((p: Post) => p.id !== post.id).slice(0, 3) || []
          );
        }

        // Buscar posts adjacentes (anterior/próximo)
        const allPostsResponse = await postsService.getPublicPosts({
          status: PostStatus.PUBLISHED,
          limit: 100,
        });
        const allPostsData =
          (allPostsResponse as any)?.data ?? allPostsResponse?.data ?? [];
        const allPosts: Post[] = Array.isArray(allPostsData)
          ? allPostsData
          : allPostsData?.data || [];
        const currentIndex =
          allPosts.findIndex((p: Post) => p.id === post.id) ?? -1;

        if (currentIndex > 0) {
          setNextPost(allPosts[currentIndex - 1] || null);
        }
        if (currentIndex < (allPosts.length || 0) - 1) {
          setPreviousPost(allPosts[currentIndex + 1] || null);
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


