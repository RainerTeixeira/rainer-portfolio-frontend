/**
 * Types - Categories
 */

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order?: number;
  readonly metaDescription?: string;
  readonly isActive: boolean;
  readonly postsCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly parent?: Category;
  readonly children?: Category[];
}

export interface CreateCategoryData {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order?: number;
  readonly metaDescription?: string;
  readonly isActive?: boolean;
}

export interface UpdateCategoryData {
  readonly name?: string;
  readonly slug?: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order?: number;
  readonly metaDescription?: string;
  readonly isActive?: boolean;
}

export interface CategoryFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly parentId?: string;
  readonly isActive?: boolean;
  readonly search?: string;
}
