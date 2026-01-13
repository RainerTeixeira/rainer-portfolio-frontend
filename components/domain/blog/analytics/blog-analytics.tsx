/**
 * Componente de Analytics do Blog
 *
 * Exibe métricas e gráficos de desempenho dos posts do blog.
 * Utiliza tokens de design para cores de gráficos e visualizações.
 *
 * @module components/domain/blog/analytics/blog-analytics
 * @fileoverview Analytics e métricas do blog
 * @author Rainer Teixeira
 * @version 2.1.0
 * @since 1.0.0
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Skeleton } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Users,
  Clock,
  Calendar,
  Filter,
  Download,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { PostListItem } from '@/lib/api/types/public/blog';
import { tokens } from '@rainersoft/design-tokens';

interface BlogAnalyticsProps {
  posts: PostListItem[];
  timeRange?: '7d' | '30d' | '90d' | '1y';
  className?: string;
}

interface AnalyticsData {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalBookmarks: number;
  averageReadTime: number;
  engagementRate: number;
  topPosts: PostListItem[];
  categoriesData: Array<{ name: string; count: number; views: number }>;
  viewsOverTime: Array<{ date: string; views: number; likes: number }>;
  authorStats: Array<{ author: string; posts: number; views: number; engagement: number }>;
}

/**
 * Cores para gráficos usando tokens de design
 * Paleta otimizada para visualizações de dados categóricos
 *
 * @constant {string[]}
 * @description Utiliza cores da paleta primitiva do design system (sem fallbacks)
 */
const CHART_COLORS = [
  tokens.primitives.color.blue[500],
  tokens.primitives.color.green[500],
  tokens.primitives.color.purple[500],
  tokens.primitives.color.red[400],
  tokens.primitives.color.blue[300],
  tokens.primitives.color.green[400],
];

export function BlogAnalytics({ posts, timeRange = '30d', className }: BlogAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'likes' | 'engagement'>('views');

  useEffect(() => {
    calculateAnalytics();
  }, [posts, timeRange]);

  function calculateAnalytics() {
    setLoading(true);
    
    // Simular cálculo de analytics (em prod, viria da API)
    setTimeout(() => {
      const totalPosts = posts.length;
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalLikes = posts.reduce((sum, post) => sum + (post.likesCount || 0), 0);
      const totalComments = posts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);
      const totalShares = Math.floor(totalViews * 0.15); // Estimativa
      const totalBookmarks = Math.floor(totalViews * 0.08); // Estimativa
      
      const engagementRate = totalViews > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0;
      const averageReadTime = 5.2; // Média estimada em minutos

      // Top posts por views
      const topPosts = [...posts]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

      // Categories data
      const categoriesMap = new Map<string, { count: number; views: number }>();
      posts.forEach(post => {
        const category = post.category?.name || 'Sem categoria';
        const current = categoriesMap.get(category) || { count: 0, views: 0 };
        categoriesMap.set(category, {
          count: current.count + 1,
          views: current.views + (post.views || 0),
        });
      });

      const categoriesData = Array.from(categoriesMap.entries()).map(([name, data]) => ({
        name,
        count: data.count,
        views: data.views,
      }));

      // Views over time (simulado)
      const viewsOverTime = generateTimeSeriesData(timeRange);

      // Author stats
      const authorsMap = new Map<string, { posts: number; views: number; engagement: number }>();
      posts.forEach(post => {
        const author = post.author?.fullName || post.author?.nickname || 'Autor desconhecido';
        const current = authorsMap.get(author) || { posts: 0, views: 0, engagement: 0 };
        authorsMap.set(author, {
          posts: current.posts + 1,
          views: current.views + (post.views || 0),
          engagement: current.engagement + (post.likesCount || 0) + (post.commentsCount || 0),
        });
      });

      const authorStats = Array.from(authorsMap.entries()).map(([author, data]) => ({
        author,
        posts: data.posts,
        views: data.views,
        engagement: data.posts > 0 ? data.engagement / data.posts : 0,
      }));

      setAnalytics({
        totalPosts,
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        totalBookmarks,
        averageReadTime,
        engagementRate,
        topPosts,
        categoriesData,
        viewsOverTime,
        authorStats,
      });
      setLoading(false);
    }, 500);
  }

  function generateTimeSeriesData(range: string) {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const views = Math.floor(Math.random() * 1000) + 200;
      const likes = Math.floor(views * 0.1);
      
      data.push({
        date: date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
        views,
        likes,
      });
    }
    
    return data;
  }

  function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  function getChangeIcon(current: number, previous: number) {
    if (current > previous) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  }

  function getChangeColor(current: number, previous: number) {
    if (current > previous) return 'text-green-500';
    if (current < previous) return 'text-red-500';
    return 'text-gray-500';
  }

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analytics) return null;

  const metricCards = [
    {
      title: 'Total de Posts',
      value: analytics.totalPosts,
      icon: <Calendar className="h-5 w-5" />,
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Visualizações',
      value: formatNumber(analytics.totalViews),
      icon: <Eye className="h-5 w-5" />,
      change: '+23%',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Curtidas',
      value: formatNumber(analytics.totalLikes),
      icon: <Heart className="h-5 w-5" />,
      change: '+18%',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Taxa de Engajamento',
      value: `${analytics.engagementRate.toFixed(1)}%`,
      icon: <TrendingUp className="h-5 w-5" />,
      change: '+5%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Comentários',
      value: formatNumber(analytics.totalComments),
      icon: <MessageCircle className="h-5 w-5" />,
      change: '+31%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Compartilhamentos',
      value: formatNumber(analytics.totalShares),
      icon: <Share2 className="h-5 w-5" />,
      change: '+15%',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
    {
      title: 'Favoritos',
      value: formatNumber(analytics.totalBookmarks),
      icon: <Bookmark className="h-5 w-5" />,
      change: '+22%',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Tempo Médio de Leitura',
      value: `${analytics.averageReadTime.toFixed(1)} min`,
      icon: <Clock className="h-5 w-5" />,
      change: '-8%',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics do Blog</h2>
          <p className="text-muted-foreground">
            Métricas e insights sobre o desempenho do seu conteúdo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {timeRange}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-lg", card.bgColor)}>
                    <div className={cn(card.color)}>{card.icon}</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className={getChangeColor(100, 85)}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views ao longo do tempo */}
        <Card>
          <CardHeader>
            <CardTitle>Visualizações ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.viewsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke={CHART_COLORS[2]}
                  fill={CHART_COLORS[2]}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Posts por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill={CHART_COLORS[2]}
                  dataKey="count"
                >
                  {analytics.categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top posts e autores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top posts */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Mais Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium line-clamp-1">{post.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {post.category?.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(post.views || 0)}</div>
                    <div className="text-sm text-muted-foreground">views</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas por autor */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Autor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.authorStats.map((author, index) => (
                <div key={author.author} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{author.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {author.posts} posts
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(author.views)}</div>
                    <div className="text-sm text-muted-foreground">views</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
