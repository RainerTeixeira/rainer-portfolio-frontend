/**
 * Types - Likes
 */

export interface Like {
  readonly id: string;
  readonly userId: string;
  readonly postId: string;
  readonly createdAt: string;
}

export interface CreateLikeData {
  readonly userId: string;
  readonly postId: string;
}
