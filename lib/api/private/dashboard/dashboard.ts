/**
 * Dashboard Services (Consolidated)
 * 
 * Serviços centralizados para operações administrativas do dashboard.
 * Contém todos os serviços, utilitários e funções em um único arquivo.
 * 
 * @fileoverview Biblioteca completa do Dashboard
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { 
  privateBlogPosts,
  privateBlogCategories,
  privateUsers,
  publicBlogPosts,
  API_ENDPOINTS 
} from '@/lib/api';

import type { 
  CreatePostDto, 
  UpdatePostDto, 
  PostMutationResponse,
  GetPostsAdminParams,
  BlogStats
} from '@/lib/api/types/private/blog';

import type { 
  Post, 
  PostStatus,
  GetPostsParams 
} from '@/lib/api/types/public/blog';

import type { 
  UpdateProfileData,
  User 
} from '@/lib/api/types/public/users';

import type {
  DashboardStats,
  DashboardAnalytics,
  DashboardResponse,
  GetAnalyticsParams
} from '@/lib/api/types/private/dashboard';

// Posts Service
export const postsService = {
  // List posts (admin view)
  getPosts: async (params?: GetPostsAdminParams) => {
    return await privateBlogPosts.getPostsAdmin(params);
  },

  // Get post by slug (using public service since it's available)
  getPostBySlug: async (slug: string) => {
    return await publicBlogPosts.getPublicPostBySlug(slug);
  },

  // Create post
  createPost: async (data: CreatePostDto) => {
    return await privateBlogPosts.createPost(data);
  },

  // Update post
  updatePost: async (id: string, data: UpdatePostDto) => {
    return await privateBlogPosts.updatePost(id, data);
  },

  // Delete post
  deletePost: async (id: string) => {
    return await privateBlogPosts.deletePost(id);
  },

  // Publish post
  publishPost: async (id: string) => {
    return await privateBlogPosts.publishPost(id);
  },

  // Unpublish post (archive)
  unpublishPost: async (id: string) => {
    return await privateBlogPosts.archivePost(id);
  },

  // Increment views (using public service)
  incrementViews: async (id: string) => {
    return await publicBlogPosts.incrementPostViews(id);
  },

  // Validate slug
  validateSlug: async (slug: string, postId?: string) => {
    return await privateBlogPosts.validatePostSlug(slug, postId);
  },

  // Duplicate post
  duplicatePost: async (id: string, newTitle?: string) => {
    return await privateBlogPosts.duplicatePost(id, newTitle);
  },

  // Get blog stats
  getStats: async () => {
    return await privateBlogPosts.getBlogStats();
  },

  // Get dashboard stats (general)
  getDashboardStats: async () => {
    return await privateBlogPosts.getBlogStats();
  },

  // Get dashboard analytics
  getDashboardAnalytics: async (params?: GetAnalyticsParams): Promise<DashboardAnalytics> => {
    // TODO: Implement analytics endpoint in backend
    // This should call a real analytics endpoint when available
    throw new Error('Analytics endpoint not implemented yet');
  }
};

// Categories Service
export const categoriesService = {
  // List categories (admin)
  getCategories: async () => {
    return await privateBlogCategories.getCategoriesAdmin();
  },

  // Create category
  createCategory: async (data: any) => {
    return await privateBlogCategories.createCategory(data);
  },

  // Update category
  updateCategory: async (id: string, data: any) => {
    return await privateBlogCategories.updateCategory(id, data);
  },

  // Delete category
  deleteCategory: async (id: string) => {
    return await privateBlogCategories.deleteCategory(id);
  },

  // Reorder categories
  reorderCategories: async (categories: string[]) => {
    return await privateBlogCategories.reorderCategories(categories);
  },

  // Validate category name
  validateCategoryName: async (name: string, categoryId?: string) => {
    return await privateBlogCategories.validateCategoryName(name, categoryId);
  },

  // Merge categories
  mergeCategories: async (sourceId: string, targetId: string) => {
    return await privateBlogCategories.mergeCategories(sourceId, targetId);
  }
};

// Users Service (simplified - using available methods)
export const usersService = {
  // TODO: Implement getProfile and updateProfile in private users service
  // For now, returning mock implementations
  getProfile: async () => {
    // Mock implementation - should be implemented in private users service
    return {} as User;
  },

  updateProfile: async (data: UpdateProfileData) => {
    // Mock implementation - should be implemented in private users service
    return { success: true };
  }
};

// Engagement Services (simplified - TODO: implement in private services)
export const engagementService = {
  // TODO: Implement engagement methods in private services
  likePost: async (postId: string) => ({ success: true }),
  unlikePost: async (postId: string) => ({ success: true }),
  bookmarkPost: async (postId: string) => ({ success: true }),
  unbookmarkPost: async (postId: string) => ({ success: true }),
  getComments: async (postId: string) => [],
  addComment: async (postId: string, content: string) => ({ success: true })
};

// Dashboard functions
export const getDashboardStats = postsService.getDashboardStats;
export const getDashboardAnalytics = postsService.getDashboardAnalytics;

// Export all services
export { API_ENDPOINTS };

// Cloudinary (re-export da API principal)
export {
  uploadToCloudinary,
  uploadBlogContentImage,
  uploadBlogCover,
  type CloudinaryUploadResponse,
  type CloudinaryUploadOptions,
  CLOUDINARY_PRESETS,
  getCloudinaryThumbnail,
  extractPublicId,
  isCloudinaryUrl,
  uploadWebPAnimatedLossless,
  uploadLossless
} from '../cloudinary/cloudinary';

// Re-exportar utilitários genéricos úteis para o dashboard
export {
  formatNumber,
  formatNumber as formatLargeNumber,
  calculateChange,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
  tiptapJSONtoHTML,
  tiptapJSONToMarkdown,
  markdownToTiptapJSON
} from '@/lib/utils';