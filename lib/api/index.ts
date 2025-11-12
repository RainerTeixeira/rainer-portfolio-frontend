/**
 * API - Barrel Export Global
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

// Services
export * from './services/auth.service';
export * from './services/bookmarks.service';
export * from './services/categories.service';
export * from './services/comments.service';
export * from './services/dashboard.service';
export * from './services/health.service';
export * from './services/likes.service';
export * from './services/notifications.service';
export * from './services/posts.service';
export * from './services/user.service';
export * from './services/users.service';

// Blog Public API
export * from './blog-public-api';
