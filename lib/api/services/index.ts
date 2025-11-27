/**
 * API Services - Barrel Export
 *
 * @fileoverview Exporta todos os serviços da API para integração com o backend.
 * @author Rainer Teixeira
 * @version 1.0.0
 *
 * @description
 * Este arquivo consolida e exporta os serviços da API, incluindo:
 * - Autenticação e Autorização
 * - Gerenciamento de Usuários
 * - Gerenciamento de Posts, Categorias, Comentários e Curtidas
 * - Gerenciamento de Posts Salvos e Notificações
 * - Analytics e Estatísticas
 * - Upload de Imagens (Cloudinary)
 * - Health Check da API
 *
 * @see {@link authService}
 * @see {@link usersService}
 * @see {@link postsService}
 * @see {@link categoriesService}
 * @see {@link commentsService}
 * @see {@link likesService}
 * @see {@link bookmarksService}
 * @see {@link notificationsService}
 * @see {@link dashboardService}
 * @see {@link cloudinaryService}
 * @see {@link healthService}
 */

// Serviços de Autenticação e Autorização
export * from './auth.service';

// Serviços de Usuários
export * from './users.service';

// Serviços de Posts e Categorias
export * from './posts.service';
export * from './categories.service';

// Serviços de Interações (Comentários, Curtidas, Salvos)
export * from './comments.service';
export * from './likes.service';
export * from './bookmarks.service';

// Serviços de Notificações
export * from './notifications.service';

// Serviços de Analytics e Estatísticas
export * from './dashboard.service';

// Serviços de Upload de Imagens
export * from './cloudinary.service';

// Serviços de Health Check
export * from './health.service';