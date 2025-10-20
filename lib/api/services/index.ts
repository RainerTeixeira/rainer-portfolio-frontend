// ============================================================================
// Exportações dos Serviços da API
// ============================================================================

/**
 * Exportações centralizadas de todos os serviços da API
 * 
 * @fileoverview Barrel exports para serviços da API
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// Importar explicitamente antes de usar nas instâncias agregadas
import { AuthService, authService } from './auth.service';
import { BookmarksService, bookmarksService } from './bookmarks.service';
import { CategoriesService, categoriesService } from './categories.service';
import { CommentsService, commentsService } from './comments.service';
import { HealthService, healthService } from './health.service';
import { LikesService, likesService } from './likes.service';
import { NotificationsService, notificationsService } from './notifications.service';
import { PostsService, postsService } from './posts.service';
import { UsersService, usersService } from './users.service';

// Re-exportar tipos e instâncias
export {
  AuthService,
  authService,
  BookmarksService,
  bookmarksService,
  CategoriesService,
  categoriesService,
  CommentsService,
  commentsService,
  HealthService,
  healthService,
  LikesService,
  likesService,
  NotificationsService,
  notificationsService,
  PostsService,
  postsService,
  UsersService,
  usersService,
};

// Instâncias singleton para uso direto
export const services = {
  auth: authService,
  users: usersService,
  posts: postsService,
  categories: categoriesService,
  comments: commentsService,
  likes: likesService,
  bookmarks: bookmarksService,
  notifications: notificationsService,
  health: healthService,
} as const;
