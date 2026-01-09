'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { Skeleton } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { Loader2, RefreshCw, ArrowUp } from 'lucide-react';
import { PostCard } from './post-card';
import type { PostListItem } from '@/lib/api/types/public/blog';

interface InfiniteScrollProps {
  initialPosts: PostListItem[];
  onLoadMore?: (page: number, limit: number) => Promise<PostListItem[]>;
  hasMore?: boolean;
  loadingMore?: boolean;
  className?: string;
  postsPerPage?: number;
  showLoadMoreButton?: boolean;
  emptyMessage?: string;
}

export function InfiniteScroll({
  initialPosts,
  onLoadMore,
  hasMore: externalHasMore,
  loadingMore: externalLoadingMore,
  className,
  postsPerPage = 6,
  showLoadMoreButton = false,
  emptyMessage = "Nenhum post encontrado.",
}: InfiniteScrollProps) {
  const [posts, setPosts] = useState<PostListItem[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(externalHasMore ?? true);
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronizar posts externos
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // Sincronizar estados externos
  useEffect(() => {
    if (externalHasMore !== undefined) {
      setHasMore(externalHasMore);
    }
  }, [externalHasMore]);

  useEffect(() => {
    if (externalLoadingMore !== undefined) {
      setLoading(externalLoadingMore);
    }
  }, [externalLoadingMore]);

  // Detectar scroll para mostrar botão "voltar ao topo"
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop } = containerRef.current;
        setShowBackToTop(scrollTop > 500);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (loading || externalLoadingMore || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      
      const nextPage = page + 1;
      const newPosts = onLoadMore ? await onLoadMore(nextPage, postsPerPage) : [];
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
        
        // Se retornou menos posts que o limite, não há mais posts
        if (newPosts.length < postsPerPage) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar mais posts:', err);
      setError('Não foi possível carregar mais posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, externalLoadingMore, onLoadMore, postsPerPage]);

  // Configurar Intersection Observer para scroll infinito
  useEffect(() => {
    if (showLoadMoreButton) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && hasMore && !loading && !externalLoadingMore) {
          loadMorePosts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, externalLoadingMore, showLoadMoreButton, loadMorePosts]);

  const retryLoad = () => {
    setError(null);
    loadMorePosts();
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Skeleton loaders
  const renderSkeletons = () => (
    Array.from({ length: postsPerPage }).map((_, index) => (
      <div key={`skeleton-${index}`} className="space-y-4">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    ))
  );

  return (
    <div className={cn("relative", className)}>
      {/* Container principal com scroll */}
      <div
        ref={containerRef}
        className="space-y-8 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
      >
        {/* Posts existentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard
                  title={post.title}
                  description={post.excerpt}
                  date={post.publishedAt || post.createdAt || undefined}
                  category={post.category?.name}
                  link={`/blog/${post.slug}`}
                  image={post.coverImage || undefined}
                  postId={post.id}
                  likes={post.likesCount}
                  showSocialActions={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Estado vazio */}
        {posts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground">
              {emptyMessage}
            </div>
          </motion.div>
        )}

        {/* Loading indicator */}
        {(loading || externalLoadingMore) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderSkeletons()}
          </div>
        )}

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-6 text-center">
                <div className="text-red-600 dark:text-red-400 mb-4">
                  {error}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={retryLoad}
                  className="flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  Tentar novamente
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Trigger para scroll infinito */}
        {!showLoadMoreButton && hasMore && !loading && !externalLoadingMore && (
          <div ref={loadMoreRef} className="h-10" />
        )}

        {/* Botão "Carregar mais" */}
        {showLoadMoreButton && hasMore && !loading && !externalLoadingMore && (
          <div className="text-center py-8">
            <Button
              variant="outline"
              onClick={loadMorePosts}
              className="flex items-center gap-2 mx-auto"
            >
              Carregar mais posts
              <Loader2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Fim dos resultados */}
        {!hasMore && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground text-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-muted-foreground" />
              <span>Fim dos resultados</span>
              <div className="w-8 h-px bg-muted-foreground" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Botão voltar ao topo */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
