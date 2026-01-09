/**
 * @fileoverview Tipos para APIs Privadas de Dashboard
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de dashboard (analytics e estatísticas).
 * 
 * @module lib/api/types/private/dashboard
 */

/**
 * Interface para estatísticas gerais do dashboard
 */
export interface DashboardStats {
  /** Total de posts */
  totalPosts: number;
  /** Posts publicados */
  publishedPosts: number;
  /** Posts em rascunho */
  draftPosts: number;
  /** Total de usuários */
  totalUsers: number;
  /** Usuários ativos */
  activeUsers: number;
  /** Total de categorias */
  totalCategories: number;
  /** Total de comentários */
  totalComments: number;
  /** Total de likes */
  totalLikes: number;
  /** Total de bookmarks */
  totalBookmarks: number;
  /** Visualizações totais */
  totalViews: number;
}

/**
 * Interface para dados do gráfico de crescimento
 */
export interface GrowthData {
  /** Período (mês/ano) */
  period: string;
  /** Número de posts */
  posts: number;
  /** Número de usuários */
  users: number;
  /** Número de visualizações */
  views: number;
}

/**
 * Interface para posts populares
 */
export interface PopularPost {
  /** ID do post */
  id: string;
  /** Título do post */
  title: string;
  /** Slug do post */
  slug: string;
  /** Número de visualizações */
  views: number;
  /** Número de likes */
  likesCount: number;
  /** Número de comentários */
  commentsCount: number;
}

/**
 * Interface para usuários ativos recentemente
 */
export interface ActiveUser {
  /** ID do usuário */
  id: string;
  /** Nome completo */
  fullName: string;
  /** Apelido */
  nickname: string;
  /** Avatar */
  avatar?: string;
  /** Último login */
  lastLoginAt: string;
  /** Número de posts */
  postsCount: number;
}

/**
 * Interface para analytics detalhados do dashboard
 */
export interface DashboardAnalytics {
  /** Estatísticas gerais */
  stats: DashboardStats;
  /** Dados de crescimento (últimos 6 meses) */
  growth: GrowthData[];
  /** Posts mais populares (top 10) */
  popularPosts: PopularPost[];
  /** Usuários mais ativos (top 10) */
  activeUsers: ActiveUser[];
  /** Distribuição de posts por categoria */
  postsByCategory: {
    categoryId: string;
    categoryName: string;
    count: number;
  }[];
  /** Engajamento médio */
  engagement: {
    avgLikesPerPost: number;
    avgCommentsPerPost: number;
    avgViewsPerPost: number;
  };
}

/**
 * Interface para resposta do dashboard
 */
export interface DashboardResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Dados do dashboard */
  data: DashboardAnalytics;
}

/**
 * Interface para parâmetros de analytics
 */
export interface GetAnalyticsParams {
  /** Período em dias */
  period?: number;
  /** Data inicial */
  dateFrom?: string;
  /** Data final */
  dateTo?: string;
  /** Incluir dados detalhados */
  includeDetails?: boolean;
}
