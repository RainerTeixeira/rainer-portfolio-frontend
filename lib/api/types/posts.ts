/**
 * Types - Posts
 */

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  SCHEDULED = 'SCHEDULED',
  TRASH = 'TRASH',
}

import type { TiptapJSON } from './common';

export interface Post {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly content: TiptapJSON;
  readonly excerpt?: string;
  readonly coverImage?: string;
  readonly tags?: string[];
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
  readonly author?: {
    readonly id: string;
    readonly fullName: string;
    readonly nickname: string;
    readonly avatar?: string;
  };
  readonly subcategory?: {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly color?: string;
  };
}

export interface CreatePostData {
  readonly title: string;
  readonly slug: string;
  readonly content: TiptapJSON;
  readonly excerpt?: string;
  readonly coverImage?: string;
  readonly tags?: string[];
  readonly subcategoryId: string;
  readonly authorId: string;
  readonly status?: PostStatus;
  readonly featured?: boolean;
  readonly allowComments?: boolean;
  readonly pinned?: boolean;
  readonly priority?: number;
}

export interface UpdatePostData {
  readonly title?: string;
  readonly slug?: string;
  readonly content?: TiptapJSON;
  readonly excerpt?: string;
  readonly coverImage?: string;
  readonly tags?: string[];
  readonly subcategoryId?: string;
  readonly status?: PostStatus;
  readonly featured?: boolean;
  readonly allowComments?: boolean;
  readonly pinned?: boolean;
  readonly priority?: number;
}

export interface PostFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: PostStatus;
  readonly subcategoryId?: string;
  readonly authorId?: string;
  readonly featured?: boolean;
  readonly search?: string;
}

export interface PostsListResponse {
  readonly success: true;
  readonly posts: Post[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

/**
 * Post com relações populadas
 * Extends Post com dados relacionados (author, category, comments)
 */
export interface PostWithRelations extends Post {
  readonly author?: {
    readonly id: string;
    readonly fullName: string;
    readonly nickname: string;
    readonly avatar?: string;
    readonly email?: string;
  };
  readonly subcategory?: {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly color?: string;
    readonly description?: string;
  };
  readonly comments?: import('./comments').Comment[];
}

/**
 * @deprecated Use CreatePostData instead
 * Alias para compatibilidade com código legado
 */
export type CreatePostDTO = CreatePostData;

/**
 * @deprecated Use UpdatePostData instead
 * Alias para compatibilidade com código legado
 */
export type UpdatePostDTO = UpdatePostData;
