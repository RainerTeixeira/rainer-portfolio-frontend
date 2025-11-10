/**
 * Types - Categories
 */

export interface Category {
  readonly id: string;
  readonly name: string; // Backend retorna 'name', não 'fullName'
  readonly fullName?: string; // Mantido para compatibilidade
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly parentId?: string;
  readonly order: number;
  readonly metaDescription?: string;
  readonly isActive: boolean;
  readonly postsCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly parent?: Category;
  readonly children?: Category[];
}

export interface CreateCategoryData {
  readonly fullName: string;
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
  readonly fullName?: string;
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
