/**
 * @fileoverview Exportações Principais da API - Versão 2.0
 * 
 * Arquivo central que exporta todas as funções, tipos e utilitários
 * da API para facilitar a importação em outros componentes.
 * 
 * Estrutura organizada em:
 * - APIs Públicas (sem autenticação)
 * - APIs Privadas (com autenticação)
 * - Clientes HTTP
 * - Tipos TypeScript
 * - Utilitários e configurações
 * 
 * @module lib/api
 * @version 2.0.0
 */

// Clientes HTTP
export { publicClient } from './clients/public-client';
export { privateClient } from './clients/private-client';

// Serviços Públicos
export * as publicBlogPosts from './public/blog/posts';
export * as publicBlogCategories from './public/blog/categories';
export * as publicAuth from './public/auth/auth';
export * as publicHealth from './public/health/health';
export * as publicUsers from './public/users/users';

// Serviços Privados
export * as privateBlogPosts from './private/blog/posts';
export * as privateBlogCategories from './private/blog/categories';
export * as privateUsers from './private/users/users';
export * as privateComments from './private/comments/comments';
export * as privateLikes from './private/likes/likes';
export * as privateBookmarks from './private/bookmarks/bookmarks';
export * as privateNotifications from './private/notifications/notifications';
export * as privateDashboard from './private/dashboard/dashboard';
export * as privateCloudinary from './private/cloudinary/cloudinary';

// Tipos Públicos
export type {
  Post,
  PostListItem,
  PostAuthor,
  PostCategory,
  PostTag,
  PaginationMeta,
  PaginatedPostsResponse,
  SinglePostResponse,
  GetPostsParams,
  PostViewResponse,
} from './types/public/blog';

export type {
  LoginCredentials,
  SignupData,
  ConfirmEmailData,
  ForgotPasswordData,
  ResetPasswordData,
  RefreshTokenData,
  OAuthCallbackData,
  AuthResponse,
  SignupResponse,
  ConfirmEmailResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  OAuthUrlResponse,
  AuthError as AuthErrorType,
} from './types/public/auth';

export type {
  PublicUser,
  PublicUsersResponse,
  GetUsersParams,
} from './types/public/users';

export type {
  HealthResponse,
  DetailedHealthResponse,
} from './types/public/health';

// Tipos Privados
export type {
  CreatePostDto,
  UpdatePostDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  PostMutationResponse,
  DeletePostResponse,
  PostStatusResponse,
  CategoryMutationResponse,
  DeleteCategoryResponse,
  BlogStats,
  GetPostsAdminParams,
  SlugValidationResponse,
} from './types/private/blog';

export type {
  PrivateUser,
  CreateUserDto,
  UpdateUserDto,
  UserMutationResponse,
  DeleteUserResponse,
  GetUsersAdminParams,
  UserStats,
} from './types/private/users';

export type {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
  CommentMutationResponse,
  DeleteCommentResponse,
  ModerationResponse,
  GetCommentsParams,
  PaginatedCommentsResponse,
  CommentStats,
} from './types/private/comments';

export type {
  Like,
  CreateLikeDto,
  LikeMutationResponse,
  LikeCheckResponse,
  GetLikesParams,
  PaginatedLikesResponse,
  LikeStats,
} from './types/private/likes';

export type {
  Bookmark,
  CreateBookmarkDto,
  BookmarkMutationResponse,
  BookmarkCheckResponse,
  GetBookmarksParams,
  PaginatedBookmarksResponse,
  BookmarkStats,
} from './types/private/bookmarks';

export type {
  Notification,
  CreateNotificationDto,
  NotificationMutationResponse,
  DeleteNotificationResponse,
  UnreadCountResponse,
  MarkAsReadResponse,
  GetNotificationsParams,
  PaginatedNotificationsResponse,
  NotificationStats,
} from './types/private/notifications';

export type {
  DashboardStats,
  DashboardAnalytics,
  DashboardResponse,
  GetAnalyticsParams,
} from './types/private/dashboard';

export type {
  UploadImageDto,
  UploadResponse,
  ImageValidation,
  TransformOptions,
  TransformResponse,
  DeleteImageResponse,
  ImageMetadata,
} from './types/private/cloudinary';

// Configurações
export { API_ENDPOINTS, buildEndpoint, buildQueryEndpoint } from './config/endpoints';

// Utilitários
export {
  ApiError,
  handleApiError,
  formatErrorMessage,
  isAuthError,
  isNetworkError,
  isValidationError,
  ERROR_CODES,
} from './utils/error-handler';


/**
 * Objeto de conveniência com todas as funções da API
 */
export const api = {
  // Clientes
  clients: {
    public: () => import('./clients/public-client').then(m => m.publicClient),
    private: () => import('./clients/private-client').then(m => m.privateClient),
  },
  
  // APIs Públicas
  public: {
    auth: () => import('./public/auth/auth'),
    blog: {
      posts: () => import('./public/blog/posts'),
      categories: () => import('./public/blog/categories'),
    },
    health: () => import('./public/health/health'),
    users: () => import('./public/users/users'),
  },
  
  // APIs Privadas
  private: {
    blog: {
      posts: () => import('./private/blog/posts'),
      categories: () => import('./private/blog/categories'),
    },
    users: () => import('./private/users/users'),
    comments: () => import('./private/comments/comments'),
    likes: () => import('./private/likes/likes'),
    bookmarks: () => import('./private/bookmarks/bookmarks'),
    notifications: () => import('./private/notifications/notifications'),
    dashboard: () => import('./private/dashboard/dashboard'),
    cloudinary: () => import('./private/cloudinary/cloudinary'),
  },
  
  // Utilitários
  utils: {
    error: () => import('./utils/error-handler'),
  },
} as const;

/**
 * Versão da API client
 */
export const API_CLIENT_VERSION = '2.0.0';

/**
 * Configuração padrão da API
 */
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
  retries: 3,
} as const;
