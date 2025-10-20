export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  collection?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookmarkData {
  userId: string;
  postId: string;
  collection?: string;
  notes?: string;
}

export interface UpdateBookmarkData {
  collection?: string;
  notes?: string;
}
