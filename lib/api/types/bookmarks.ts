/**
 * Types - Bookmarks
 */

export interface Bookmark {
  readonly id: string;
  readonly userId: string;
  readonly postId: string;
  readonly collection?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateBookmarkData {
  readonly userId: string;
  readonly postId: string;
  readonly collection?: string;
  readonly notes?: string;
}

export interface UpdateBookmarkData {
  readonly collection?: string;
  readonly notes?: string;
}
