export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
  isReported?: boolean;
  approved?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
}

export interface UpdateCommentData {
  content?: string;
}

export interface ListCommentsParams {
  [key: string]: string | number | boolean | undefined;
  limit?: number;
  page?: number;
  postId?: string;
  authorId?: string;
  isApproved?: boolean;
  parentId?: string;
}
