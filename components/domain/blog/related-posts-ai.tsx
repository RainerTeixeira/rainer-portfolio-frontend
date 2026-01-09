'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Skeleton } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { PostCard } from './post-card';
import type { PostListItem } from '@/lib/api/types/public/blog';

interface RelatedPostsProps {
  currentPost: PostListItem;
  allPosts: PostListItem[];
  maxPosts?: number;
  algorithm?: 'content' | 'collaborative' | 'hybrid';
  className?: string;
}

interface RelatedPost extends PostListItem {
  score: number;
  reasons: string[];
}

export function RelatedPosts({
  currentPost,
  allPosts,
  maxPosts = 3,
  algorithm = 'hybrid',
  className,
}: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);

  useEffect(() => {
    calculateRelatedPosts();
  }, [currentPost, allPosts, selectedAlgorithm]);

  function calculateRelatedPosts() {
    setLoading(true);

    // Simular processamento de IA
    setTimeout(() => {
      const posts = allPosts.filter(post => post.id !== currentPost.id);
      const scored = posts.map(post => ({
        ...post,
        score: calculateRelevanceScore(currentPost, post, selectedAlgorithm),
        reasons: getRelevanceReasons(currentPost, post, selectedAlgorithm),
      }));

      const filtered = scored
        .filter(post => post.score > 0.3) // Apenas posts com relevância significativa
        .sort((a, b) => b.score - a.score)
        .slice(0, maxPosts);

      setRelatedPosts(filtered);
      setLoading(false);
    }, 800);
  }

  function calculateRelevanceScore(post1: PostListItem, post2: PostListItem, algo: string): number {
    let score = 0;

    switch (algo) {
      case 'content':
        // Baseado em conteúdo similar
        score += calculateContentSimilarity(post1, post2) * 0.6;
        score += calculateCategorySimilarity(post1, post2) * 0.3;
        score += calculateTagSimilarity(post1, post2) * 0.1;
        break;

      case 'collaborative':
        // Baseado em comportamento dos usuários
        score += calculateEngagementSimilarity(post1, post2) * 0.5;
        score += calculateViewSimilarity(post1, post2) * 0.3;
        score += calculateTimeSimilarity(post1, post2) * 0.2;
        break;

      case 'hybrid':
      default:
        // Combinação de todos os fatores
        score += calculateContentSimilarity(post1, post2) * 0.3;
        score += calculateCategorySimilarity(post1, post2) * 0.2;
        score += calculateTagSimilarity(post1, post2) * 0.1;
        score += calculateEngagementSimilarity(post1, post2) * 0.2;
        score += calculateViewSimilarity(post1, post2) * 0.15;
        score += calculateTimeSimilarity(post1, post2) * 0.05;
        break;
    }

    return Math.min(score, 1); // Normalizar para 0-1
  }

  function calculateContentSimilarity(post1: PostListItem, post2: PostListItem): number {
    // Simular análise de conteúdo usando NLP
    const title1 = post1.title.toLowerCase();
    const title2 = post2.title.toLowerCase();
    const excerpt1 = (post1.excerpt || '').toLowerCase();
    const excerpt2 = (post2.excerpt || '').toLowerCase();

    // Calcular similaridade de palavras
    const words1 = new Set([...title1.split(' '), ...excerpt1.split(' ')]);
    const words2 = new Set([...title2.split(' '), ...excerpt2.split(' ')]);
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  function calculateCategorySimilarity(post1: PostListItem, post2: PostListItem): number {
    if (post1.category?.id === post2.category?.id) return 1;
    if (post1.category?.name === post2.category?.name) return 0.9;
    return 0;
  }

  function calculateTagSimilarity(post1: PostListItem, post2: PostListItem): number {
    const tags1 = new Set(post1.tags?.map(tag => tag.name.toLowerCase()) || []);
    const tags2 = new Set(post2.tags?.map(tag => tag.name.toLowerCase()) || []);
    
    if (tags1.size === 0 && tags2.size === 0) return 0;
    
    const intersection = new Set([...tags1].filter(x => tags2.has(x)));
    const union = new Set([...tags1, ...tags2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  function calculateEngagementSimilarity(post1: PostListItem, post2: PostListItem): number {
    const engagement1 = (post1.likesCount || 0) + (post1.commentsCount || 0);
    const engagement2 = (post2.likesCount || 0) + (post2.commentsCount || 0);
    
    const maxEngagement = Math.max(engagement1, engagement2);
    if (maxEngagement === 0) return 0;
    
    const diff = Math.abs(engagement1 - engagement2);
    return 1 - (diff / maxEngagement);
  }

  function calculateViewSimilarity(post1: PostListItem, post2: PostListItem): number {
    const views1 = post1.views || 0;
    const views2 = post2.views || 0;
    
    const maxViews = Math.max(views1, views2);
    if (maxViews === 0) return 0;
    
    const diff = Math.abs(views1 - views2);
    return 1 - (diff / maxViews);
  }

  function calculateTimeSimilarity(post1: PostListItem, post2: PostListItem): number {
    const date1 = new Date(post1.publishedAt || post1.createdAt || 0);
    const date2 = new Date(post2.publishedAt || post2.createdAt || 0);
    
    const daysDiff = Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
    
    // Posts mais próximos no tempo têm similaridade maior
    return Math.max(0, 1 - (daysDiff / 365)); // Decai ao longo de um ano
  }

  function getRelevanceReasons(post1: PostListItem, post2: PostListItem, algo: string): string[] {
    const reasons: string[] = [];

    if (calculateCategorySimilarity(post1, post2) > 0.8) {
      reasons.push('Mesma categoria');
    }

    if (calculateTagSimilarity(post1, post2) > 0.3) {
      reasons.push('Tags similares');
    }

    if (calculateContentSimilarity(post1, post2) > 0.4) {
      reasons.push('Contúdo relacionado');
    }

    if (calculateEngagementSimilarity(post1, post2) > 0.7) {
      reasons.push('Engajamento similar');
    }

    if (calculateTimeSimilarity(post1, post2) > 0.8) {
      reasons.push('Publicado recentemente');
    }

    return reasons.length > 0 ? reasons : ['Recomendado pela IA'];
  }

  function getScoreColor(score: number): string {
    if (score > 0.8) return 'text-green-600';
    if (score > 0.6) return 'text-yellow-600';
    if (score > 0.4) return 'text-orange-600';
    return 'text-gray-600';
  }

  function getScoreLabel(score: number): string {
    if (score > 0.8) return 'Alta relevância';
    if (score > 0.6) return 'Boa relevância';
    if (score > 0.4) return 'Relevância moderada';
    return 'Baixa relevância';
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Posts Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: maxPosts }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Posts Relacionados
            <Badge variant="secondary" className="text-xs">
              IA
            </Badge>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value as any)}
              className="text-sm border rounded px-2 py-1 bg-background"
            >
              <option value="hybrid">Híbrido</option>
              <option value="content">Conteúdo</option>
              <option value="collaborative">Colaborativo</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Explicação do algoritmo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4" />
              <span className="font-medium">Análise por IA</span>
            </div>
            <p>
              Algoritmo <strong>{selectedAlgorithm === 'hybrid' ? 'híbrido' : selectedAlgorithm === 'content' ? 'de conteúdo' : 'colaborativo'}</strong> 
              analisando {allPosts.length} posts para encontrar os mais relevantes.
            </p>
          </motion.div>

          {/* Posts relacionados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="space-y-3">
                  {/* Score de relevância */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("text-xs font-medium", getScoreColor(post.score))}>
                        {getScoreLabel(post.score)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(post.score * 100)}% match
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {post.views || 0} views
                      </span>
                    </div>
                  </div>

                  {/* Post Card */}
                  <PostCard
                    title={post.title}
                    description={post.excerpt}
                    date={post.publishedAt || post.createdAt || undefined}
                    category={post.category?.name}
                    link={`/blog/${post.slug}`}
                    image={post.coverImage || undefined}
                    postId={post.id}
                    likes={post.likesCount}
                    showSocialActions={false}
                  />

                  {/* Razões da recomendação */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Por que recomendado:</div>
                    <div className="flex flex-wrap gap-1">
                      {post.reasons.map((reason, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs px-2 py-0"
                        >
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Link para ver todos */}
          <div className="text-center pt-4 border-t">
            <Button variant="outline" size="sm" className="group">
              Ver mais posts
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
