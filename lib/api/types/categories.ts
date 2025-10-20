export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
}
