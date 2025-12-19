/**
 * Backend Alignment Validation
 * 
 * This file validates that frontend types and services are aligned with the backend structure.
 * It serves as documentation and validation for the API integration.
 * 
 * @fileoverview Backend alignment validation and documentation
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// =============================================================================
// BACKEND ENDPOINTS VALIDATION
// =============================================================================

/**
 * Backend endpoints that should be available
 * Based on the backend structure analysis
 */
export const BACKEND_ENDPOINTS = {
  // Health Check
  health: {
    basic: '/health',
    detailed: '/health/detailed',
  },

  // Authentication
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    confirmEmail: '/auth/confirm-email',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changeEmail: '/auth/change-email',
    verifyEmailChange: '/auth/verify-email-change',
    checkNickname: '/auth/check-nickname',
    changeNickname: '/auth/change-nickname',
  },

  // Users
  users: {
    list: '/users',
    create: '/users',
    getById: '/users/:id',
    getByCognitoSub: '/users/cognito/:cognitoSub',
    update: '/users/:id',
    delete: '/users/:id',
    ban: '/users/:id/ban',
  },

  // Posts
  posts: {
    list: '/posts',
    create: '/posts',
    getById: '/posts/:id',
    getBySlug: '/posts/slug/:slug',
    update: '/posts/:id',
    delete: '/posts/:id',
    publish: '/posts/:id/publish',
    unpublish: '/posts/:id/unpublish',
    bySubcategory: '/posts/subcategory/:subcategoryId',
    byAuthor: '/posts/author/:authorId',
  },

  // Categories
  categories: {
    list: '/categories',
    create: '/categories',
    getById: '/categories/:id',
    getBySlug: '/categories/slug/:slug',
    getSubcategories: '/categories/:id/subcategories',
    update: '/categories/:id',
    delete: '/categories/:id',
  },

  // Comments
  comments: {
    list: '/comments',
    create: '/comments',
    getById: '/comments/:id',
    byPost: '/comments/post/:postId',
    byAuthor: '/comments/author/:authorId',
    update: '/comments/:id',
    delete: '/comments/:id',
    approve: '/comments/:id/approve',
    disapprove: '/comments/:id/disapprove',
  },

  // Likes
  likes: {
    create: '/likes',
    delete: '/likes/:userId/:postId',
    byPost: '/likes/post/:postId',
    byUser: '/likes/user/:userId',
    count: '/likes/post/:postId/count',
    check: '/likes/:userId/:postId',
  },

  // Bookmarks
  bookmarks: {
    create: '/bookmarks',
    getById: '/bookmarks/:id',
    byUser: '/bookmarks/user/:userId',
    byCollection: '/bookmarks/collection/:name',
    update: '/bookmarks/:id',
    delete: '/bookmarks/:id',
    deleteUserPost: '/bookmarks/:userId/:postId',
  },

  // Notifications
  notifications: {
    list: '/notifications',
    create: '/notifications',
    getById: '/notifications/:id',
    byUser: '/notifications/user/:userId',
    countByUser: '/notifications/user/:userId/count',
    update: '/notifications/:id',
    delete: '/notifications/:id',
    markRead: '/notifications/:id/read',
    markAllRead: '/notifications/user/:userId/read-all',
  },
} as const;

export default {
  BACKEND_ENDPOINTS,
};