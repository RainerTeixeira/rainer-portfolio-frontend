// ============================================================================
// Tipos TypeScript baseados no Schema Prisma do Backend
// ============================================================================

/**
 * Tipos TypeScript gerados a partir do schema Prisma do backend
 * 
 * @fileoverview Tipos para integração com a API do backend
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Enums do Backend
// ============================================================================

/**
 * Papel/permissão do usuário no sistema
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR', 
  AUTHOR = 'AUTHOR',
  SUBSCRIBER = 'SUBSCRIBER'
}

/**
 * Status de publicação do post
 */
export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  SCHEDULED = 'SCHEDULED',
  TRASH = 'TRASH'
}

/**
 * Tipo de notificação enviada ao usuário
 */
export enum NotificationType {
  NEW_COMMENT = 'NEW_COMMENT',
  NEW_LIKE = 'NEW_LIKE',
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  POST_PUBLISHED = 'POST_PUBLISHED',
  MENTION = 'MENTION',
  SYSTEM = 'SYSTEM'
}

// ============================================================================
// Interfaces Base
// ============================================================================

/**
 * Usuário do sistema (autor, editor, admin, assinante)
 * Autenticação gerenciada por Amazon Cognito
 */
export interface User {
  readonly id: string;
  readonly cognitoSub: string;
  readonly email: string;
  readonly username: string;
  readonly name: string;
  readonly avatar?: string;
  readonly bio?: string;
  readonly website?: string;
  readonly socialLinks?: Record<string, string>;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly isBanned: boolean;
  readonly banReason?: string;
  readonly postsCount: number;
  readonly commentsCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * Post/Artigo do blog
 * Sempre pertence a uma SUBCATEGORIA (hierarquia de 2 níveis)
 */
export interface Post {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly content: any; // JSON (Tiptap, Editor.js, Lexical)
  readonly subcategoryId: string;
  readonly authorId: string;
  readonly status: PostStatus;
  readonly featured: boolean;
  readonly allowComments: boolean;
  readonly pinned: boolean;
  readonly priority: number;
  readonly publishedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly views: number;
  readonly likesCount: number;
  readonly commentsCount: number;
  readonly bookmarksCount: number;
  // Relacionamentos
  readonly author?: User;
  readonly subcategory?: Category;
  readonly comments?: Comment[];
  readonly likes?: Like[];
  readonly bookmarks?: Bookmark[];
}

/**
 * Categoria ou Subcategoria de posts (estrutura hierárquica de 2 níveis)
 */
export interface Category {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order: number;
  readonly metaDescription?: string;
  readonly isActive: boolean;
  readonly postsCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  // Relacionamentos hierárquicos
  readonly parent?: Category;
  readonly children?: Category[];
  readonly posts?: Post[];
}

/**
 * Comentário em post (suporta threads via parentId)
 */
export interface Comment {
  readonly id: string;
  readonly content: string;
  readonly contentJson?: any;
  readonly authorId: string;
  readonly postId: string;
  readonly parentId?: string;
  readonly isApproved: boolean;
  readonly isReported: boolean;
  readonly reportReason?: string;
  readonly isEdited: boolean;
  readonly likesCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly editedAt?: string;
  // Relacionamentos
  readonly author?: User;
  readonly post?: Post;
}

/**
 * Curtida em post (relação N:N entre User e Post)
 */
export interface Like {
  readonly id: string;
  readonly userId: string;
  readonly postId: string;
  readonly createdAt: string;
  // Relacionamentos
  readonly user?: User;
  readonly post?: Post;
}

/**
 * Post salvo pelo usuário para leitura posterior
 */
export interface Bookmark {
  readonly id: string;
  readonly userId: string;
  readonly postId: string;
  readonly collection?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  // Relacionamentos
  readonly user?: User;
  readonly post?: Post;
}

/**
 * Notificação do sistema enviada ao usuário
 */
export interface Notification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly link?: string;
  readonly metadata?: any;
  readonly isRead: boolean;
  readonly userId: string;
  readonly createdAt: string;
  readonly readAt?: string;
  // Relacionamentos
  readonly user?: User;
}

// ============================================================================
// DTOs para Criação
// ============================================================================

/**
 * Dados para criar um usuário
 */
export interface CreateUserData {
  readonly username: string;
  readonly email: string;
  readonly name: string;
  readonly bio?: string;
  readonly avatar?: string;
  readonly website?: string;
  readonly socialLinks?: Record<string, string>;
  readonly role?: UserRole;
}

/**
 * Dados para criar um post
 */
export interface CreatePostData {
  readonly title: string;
  readonly slug: string;
  readonly content: any;
  readonly subcategoryId: string;
  readonly authorId: string;
  readonly status?: PostStatus;
  readonly featured?: boolean;
  readonly allowComments?: boolean;
  readonly pinned?: boolean;
  readonly priority?: number;
}

/**
 * Dados para criar uma categoria
 */
export interface CreateCategoryData {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order?: number;
  readonly metaDescription?: string;
  readonly isActive?: boolean;
}

/**
 * Dados para criar um comentário
 */
export interface CreateCommentData {
  readonly content: string;
  readonly contentJson?: any;
  readonly authorId: string;
  readonly postId: string;
  readonly parentId?: string;
}

/**
 * Dados para criar um like
 */
export interface CreateLikeData {
  readonly userId: string;
  readonly postId: string;
}

/**
 * Dados para criar um bookmark
 */
export interface CreateBookmarkData {
  readonly userId: string;
  readonly postId: string;
  readonly collection?: string;
  readonly notes?: string;
}

/**
 * Dados para criar uma notificação
 */
export interface CreateNotificationData {
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly link?: string;
  readonly metadata?: any;
  readonly userId: string;
}

// ============================================================================
// DTOs para Atualização
// ============================================================================

/**
 * Dados para atualizar um usuário
 */
export interface UpdateUserData {
  readonly name?: string;
  readonly bio?: string;
  readonly avatar?: string;
  readonly website?: string;
  readonly socialLinks?: Record<string, string>;
  readonly role?: UserRole;
  readonly isActive?: boolean;
  readonly isBanned?: boolean;
  readonly banReason?: string;
}

/**
 * Dados para atualizar um post
 */
export interface UpdatePostData {
  readonly title?: string;
  readonly slug?: string;
  readonly content?: any;
  readonly subcategoryId?: string;
  readonly status?: PostStatus;
  readonly featured?: boolean;
  readonly allowComments?: boolean;
  readonly pinned?: boolean;
  readonly priority?: number;
}

/**
 * Dados para atualizar uma categoria
 */
export interface UpdateCategoryData {
  readonly name?: string;
  readonly slug?: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order?: number;
  readonly metaDescription?: string;
  readonly isActive?: boolean;
}

/**
 * Dados para atualizar um comentário
 */
export interface UpdateCommentData {
  readonly content?: string;
  readonly contentJson?: any;
  readonly isApproved?: boolean;
  readonly isReported?: boolean;
  readonly reportReason?: string;
}

/**
 * Dados para atualizar um bookmark
 */
export interface UpdateBookmarkData {
  readonly collection?: string;
  readonly notes?: string;
}

/**
 * Dados para atualizar uma notificação
 */
export interface UpdateNotificationData {
  readonly isRead?: boolean;
}

// ============================================================================
// DTOs para Autenticação
// ============================================================================

/**
 * Dados para registro de usuário
 */
export interface RegisterData {
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly name: string;
}

/**
 * Dados para login
 */
export interface LoginData {
  readonly email: string;
  readonly password: string;
}

/**
 * Dados para confirmar email
 */
export interface ConfirmEmailData {
  readonly email: string;
  readonly code: string;
}

/**
 * Dados para renovar token
 */
export interface RefreshTokenData {
  readonly refreshToken: string;
}

/**
 * Dados para recuperar senha
 */
export interface ForgotPasswordData {
  readonly email: string;
}

/**
 * Dados para redefinir senha
 */
export interface ResetPasswordData {
  readonly email: string;
  readonly code: string;
  readonly newPassword: string;
}

// ============================================================================
// DTOs para Filtros e Paginação
// ============================================================================

/**
 * Filtros para listar posts
 */
export interface PostFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: PostStatus;
  readonly subcategoryId?: string;
  readonly authorId?: string;
  readonly featured?: boolean;
  readonly search?: string;
}

/**
 * Filtros para listar usuários
 */
export interface UserFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly role?: UserRole;
  readonly search?: string;
  readonly isActive?: boolean;
}

/**
 * Filtros para listar categorias
 */
export interface CategoryFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly parentId?: string;
  readonly isActive?: boolean;
  readonly search?: string;
}

/**
 * Filtros para listar comentários
 */
export interface CommentFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly postId?: string;
  readonly authorId?: string;
  readonly isApproved?: boolean;
  readonly parentId?: string;
}

/**
 * Filtros para listar notificações
 */
export interface NotificationFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly userId: string;
  readonly isRead?: boolean;
  readonly type?: NotificationType;
}

// ============================================================================
// Respostas da API
// ============================================================================

/**
 * Resposta paginada da API
 */
export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
  };
}

/**
 * Resposta de sucesso da API
 */
export interface ApiSuccessResponse<T = any> {
  readonly success: true;
  readonly message?: string;
  readonly data: T;
}

/**
 * Resposta de erro da API
 */
export interface ApiErrorResponse {
  readonly success: false;
  readonly message: string;
  readonly error?: string;
  readonly statusCode?: number;
  readonly details?: any;
}

/**
 * Resposta da API (sucesso ou erro)
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================================
// Health Check
// ============================================================================

/**
 * Resposta do health check básico
 */
export interface HealthCheckResponse {
  readonly status: 'ok' | 'error';
  readonly timestamp: string;
  readonly uptime: number;
  readonly memory: {
    readonly used: number;
    readonly total: number;
    readonly percentage: number;
  };
}

/**
 * Resposta do health check detalhado
 */
export interface DetailedHealthCheckResponse extends HealthCheckResponse {
  readonly database: {
    readonly provider: 'PRISMA' | 'DYNAMODB';
    readonly status: 'connected' | 'disconnected' | 'error';
    readonly description: string;
    readonly endpoint?: string;
  };
  readonly environment: string;
  readonly version: string;
}
