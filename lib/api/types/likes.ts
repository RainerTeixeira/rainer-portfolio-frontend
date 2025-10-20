export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface CreateLikeData {
  userId: string;
  postId: string;
}
