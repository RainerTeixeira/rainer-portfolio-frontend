/**
 * Dashboard Types
 *
 * Tipos relacionados ao dashboard e analytics.
 *
 * @module lib/api/types/dashboard
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Stats Types
// ============================================================================

/**
 * Estatísticas gerais do dashboard
 */
export interface DashboardStats {
  /** Total de posts */
  readonly totalPosts: number;
  /** Total de visualizações */
  readonly totalViews: number;
  /** Total de likes */
  readonly totalLikes: number;
  /** Total de comentários */
  readonly totalComments: number;
  /** Mudança percentual de posts */
  readonly postsChange: number;
  /** Mudança percentual de visualizações */
  readonly viewsChange: number;
  /** Mudança percentual de likes */
  readonly likesChange: number;
  /** Mudança percentual de comentários */
  readonly commentsChange: number;
}

/**
 * Estatísticas de posts
 */
export interface PostStats {
  /** Total de posts publicados */
  readonly published: number;
  /** Total de posts em rascunho */
  readonly draft: number;
  /** Total de posts programados */
  readonly scheduled: number;
  /** Total de posts arquivados */
  readonly archived: number;
  /** Total de posts */
  readonly total: number;
}

/**
 * Estatísticas de usuários
 */
export interface DashboardUserStats {
  /** Total de usuários ativos */
  readonly active: number;
  /** Total de usuários banidos */
  readonly banned: number;
  /** Total de usuários */
  readonly total: number;
  /** Novos usuários (última semana) */
  readonly newThisWeek: number;
  /** Novos usuários (último mês) */
  readonly newThisMonth: number;
}

// ============================================================================
// Analytics Types
// ============================================================================

/**
 * Dados de visualizações por data
 */
export interface ViewsData {
  /** Data no formato ISO */
  readonly date: string;
  /** Total de visualizações */
  readonly views: number;
  /** Visualizações únicas */
  readonly uniqueViews: number;
}

/**
 * Dados de engajamento por data
 */
export interface EngagementData {
  /** Data no formato ISO */
  readonly date: string;
  /** Total de likes */
  readonly likes: number;
  /** Total de comentários */
  readonly comments: number;
  /** Total de compartilhamentos */
  readonly shares?: number;
}

/**
 * Dados de analytics do dashboard
 */
export interface AnalyticsData {
  /** Dados de visualizações */
  readonly views: ViewsData[];
  /** Dados de engajamento */
  readonly engagement: EngagementData[];
  /** Período analisado */
  readonly period: AnalyticsPeriod;
  /** Data de início */
  readonly startDate: string;
  /** Data de fim */
  readonly endDate: string;
}

/**
 * Período de análise
 */
export type AnalyticsPeriod = '7d' | '30d' | '90d' | '365d' | 'all';

/**
 * Tipo de métrica
 */
export type MetricType = 'views' | 'likes' | 'comments' | 'shares' | 'bookmarks';

// ============================================================================
// Chart Types
// ============================================================================

/**
 * Dados para gráfico de linha
 */
export interface LineChartData {
  /** Label do ponto */
  readonly label: string;
  /** Valor do ponto */
  readonly value: number;
  /** Data do ponto */
  readonly date: string;
}

/**
 * Dados para gráfico de barra
 */
export interface BarChartData {
  /** Label da barra */
  readonly label: string;
  /** Valor da barra */
  readonly value: number;
  /** Cor da barra (opcional) */
  readonly color?: string;
}

/**
 * Dados para gráfico de pizza
 */
export interface PieChartData {
  /** Label da fatia */
  readonly label: string;
  /** Valor da fatia */
  readonly value: number;
  /** Porcentagem da fatia */
  readonly percentage: number;
  /** Cor da fatia (opcional) */
  readonly color?: string;
}

// ============================================================================
// Top Content Types
// ============================================================================

/**
 * Post mais visualizado
 */
export interface TopPost {
  /** ID do post */
  readonly id: string;
  /** Título do post */
  readonly title: string;
  /** Slug do post */
  readonly slug: string;
  /** Total de visualizações */
  readonly views: number;
  /** Total de likes */
  readonly likes: number;
  /** Total de comentários */
  readonly comments: number;
  /** Data de publicação */
  readonly publishedAt: string;
}

/**
 * Categoria mais popular
 */
export interface TopCategory {
  /** ID da categoria */
  readonly id: string;
  /** Nome da categoria */
  readonly name: string;
  /** Slug da categoria */
  readonly slug: string;
  /** Total de posts */
  readonly postsCount: number;
  /** Total de visualizações */
  readonly views: number;
}

/**
 * Autor mais ativo
 */
export interface TopAuthor {
  /** ID do autor */
  readonly id: string;
  /** Nome do autor */
  readonly fullName: string;
  /** Avatar do autor */
  readonly avatar?: string;
  /** Total de posts */
  readonly postsCount: number;
  /** Total de visualizações */
  readonly totalViews: number;
  /** Total de likes */
  readonly totalLikes: number;
}

// ============================================================================
// Activity Types
// ============================================================================

/**
 * Tipo de atividade
 */
export enum ActivityType {
  POST_CREATED = 'POST_CREATED',
  POST_PUBLISHED = 'POST_PUBLISHED',
  POST_UPDATED = 'POST_UPDATED',
  POST_DELETED = 'POST_DELETED',
  COMMENT_CREATED = 'COMMENT_CREATED',
  COMMENT_DELETED = 'COMMENT_DELETED',
  USER_REGISTERED = 'USER_REGISTERED',
  USER_BANNED = 'USER_BANNED',
}

/**
 * Atividade recente
 */
export interface RecentActivity {
  /** ID da atividade */
  readonly id: string;
  /** Tipo de atividade */
  readonly type: ActivityType;
  /** Descrição da atividade */
  readonly description: string;
  /** Usuário que realizou a atividade */
  readonly user: {
    readonly id: string;
    readonly fullName: string;
    readonly avatar?: string;
  };
  /** Data da atividade */
  readonly createdAt: string;
  /** Metadados adicionais */
  readonly metadata?: Record<string, unknown>;
}

// ============================================================================
// Filter Types
// ============================================================================

/**
 * Filtros de analytics
 */
export interface AnalyticsFilters {
  /** Período */
  readonly period?: AnalyticsPeriod;
  /** Data de início */
  readonly startDate?: string;
  /** Data de fim */
  readonly endDate?: string;
  /** Tipo de métrica */
  readonly metric?: MetricType;
  /** ID do autor */
  readonly authorId?: string;
  /** ID da categoria */
  readonly categoryId?: string;
}

/**
 * Opções de ordenação
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Campo para ordenação de stats
 */
export type StatsSortField =
  | 'views'
  | 'likes'
  | 'comments'
  | 'date'
  | 'title'
  | 'author';

