/**
 * Types - Comments
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
}

export interface CreateCommentData {
  readonly content: string;
  readonly contentJson?: any;
  readonly authorId: string;
  readonly postId: string;
  readonly parentId?: string;
}

export interface UpdateCommentData {
  readonly content?: string;
  readonly contentJson?: any;
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
