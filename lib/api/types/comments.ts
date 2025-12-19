/**
 * Types - Comments
 */

import type { TiptapJSON } from './common';

export interface Comment {
  readonly id: string;
  readonly content: string;
  readonly contentJson?: TiptapJSON;
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
  readonly author?: {
    readonly id: string;
    readonly fullName: string;
    readonly nickname: string;
    readonly avatar?: string;
  };
  readonly post?: {
    readonly id: string;
    readonly title: string;
    readonly slug: string;
  };
  readonly replies?: Comment[];
}

export interface CreateCommentData {
  readonly content: string;
  readonly contentJson?: TiptapJSON;
  readonly authorId: string;
  readonly postId: string;
  readonly parentId?: string;
}

export interface UpdateCommentData {
  readonly content?: string;
  readonly contentJson?: TiptapJSON;
  readonly isApproved?: boolean;
  readonly isReported?: boolean;
  readonly reportReason?: string;
}

export interface CommentFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly postId?: string;
  readonly authorId?: string;
  readonly isApproved?: boolean;
  readonly parentId?: string;
}
