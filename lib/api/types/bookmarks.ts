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
  readonly user?: {
    readonly id: string;
    readonly fullName: string;
    readonly nickname: string;
    readonly avatar?: string;
  };
  readonly post?: {
    readonly id: string;
    readonly title: string;
    readonly slug: string;
    readonly excerpt?: string;
    readonly coverImage?: string;
  };
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
