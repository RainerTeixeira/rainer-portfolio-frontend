/**
 * API - Barrel Export Global
 *
 * Ponto de entrada centralizado para toda a API do frontend.
 * Exporta client HTTP, serviços, tipos e helpers para integração com backend.
 *
 * ## Estrutura
 *
 * ### Client & Config
 * - `api` - Cliente HTTP singleton para requisições
 * - `ApiError` - Classe de erro customizada para erros de API
 * - `API_CONFIG` - Configurações da API (URL, timeout, retries)
 * - `API_ENDPOINTS` - Endpoints organizados por módulo
 * - `HTTP_STATUS` - Códigos de status HTTP
 * - `ERROR_MESSAGES` - Mensagens de erro padronizadas
 *
 * ### Services
 * - `authService` - Autenticação e autorização (Cognito)
 * - `postsService` - CRUD de posts do blog
 * - `usersService` - Gerenciamento de usuários
 * - `categoriesService` - Categorias hierárquicas
 * - `commentsService` - Sistema de comentários
 * - `likesService` - Sistema de curtidas
 * - `bookmarksService` - Posts salvos pelos usuários
 * - `notificationsService` - Notificações do sistema
 * - `dashboardService` - Analytics e estatísticas
 * - `healthService` - Health checks da API
 *
 * ### Types
 * - `Post`, `User`, `Category`, `Comment`, etc. - Tipos de dados
 * - `ApiResponse<T>` - Resposta padronizada da API
 * - `PaginatedResponse<T>` - Resposta paginada
 * - `CreatePostData`, `UpdatePostData` - DTOs para operações
 *
 * ### Helpers
 * - `preparePostForCreate` - Prepara dados para criar post
 * - `preparePostForUpdate` - Prepara dados para atualizar post
 * - `validatePostData` - Valida dados de post
 *
 * ### Blog Public API
 * - `blogPublicApi` - API pública para páginas do blog (somente leitura)
 *
 * ## Uso
 *
 * ```typescript
 * import { api, postsService, type Post } from '@/lib/api'
 *
 * // Usando service (recomendado)
 * const posts = await postsService.listPosts({ status: 'PUBLISHED' })
 *
 * // Usando client direto
 * const post = await api.get<Post>('/posts/123')
 *
 * // Com error handling
 * try {
 *   const post = await postsService.getPostById('123')
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.log(error.status, error.message)
 *   }
 * }
 * ```
 *
 * @module lib/api
 * @fileoverview Barrel exports para API do frontend
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

// Client & Config
export * from './client';
export * from './config';

// Types (todos centralizados)
export * from './types/auth';
export * from './types/bookmarks';
export * from './types/categories';
export * from './types/comments';
export * from './types/common';
export * from './types/likes';
export * from './types/notifications';
export * from './types/posts';
export * from './types/users';

// Namespace consolidado para imports limpos
export * as types from './types';

// Services (exportando apenas os services, não os tipos)
export { authService } from './services/auth.service';
export { bookmarksService } from './services/bookmarks.service';
export { categoriesService } from './services/categories.service';
export { cloudinaryService } from './services/cloudinary.service';
export { commentsService } from './services/comments.service';
export { dashboardService } from './services/dashboard.service';
export { likesService } from './services/likes.service';
export { postsService } from './services/posts.service';
export { usersService } from './services/user.service';
export * from './services/user.service';

// Blog Public API
export * from './blog-public-api';
