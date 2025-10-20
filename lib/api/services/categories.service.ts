// ============================================================================
// Serviço de Categorias - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar categorias hierárquicas do blog
 * 
 * @fileoverview Serviço de categorias com métodos para CRUD e operações hierárquicas
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  Category,
  CategoryFilters,
  CreateCategoryData,
  PaginatedResponse,
  UpdateCategoryData
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

export class CategoriesService {
  private readonly basePath = '/categories';

  /**
   * Lista categorias com paginação e filtros
   */
  async listCategories(filters: CategoryFilters = {}): Promise<PaginatedResponse<Category>> {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.parentId !== undefined) params.append('parentId', filters.parentId);
    if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
    
    const response = await api.get<ApiResponse<PaginatedResponse<Category>>>(url);
    return response.data;
  }

  /**
   * Busca uma categoria por ID
   */
  async getCategoryById(id: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Busca uma categoria por slug
   */
  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(`${this.basePath}/slug/${slug}`);
    return response.data;
  }

  /**
   * Lista subcategorias de uma categoria principal
   */
  async getSubcategories(parentId: string): Promise<Category[]> {
    const response = await api.get<ApiResponse<Category[]>>(`${this.basePath}/${parentId}/subcategories`);
    return response.data;
  }

  /**
   * Cria uma nova categoria
   */
  async createCategory(data: CreateCategoryData): Promise<Category> {
    const response = await api.post<ApiResponse<Category>>(this.basePath, data);
    return response.data;
  }

  /**
   * Atualiza uma categoria existente
   */
  async updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
    const response = await api.put<ApiResponse<Category>>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  /**
   * Deleta uma categoria
   */
  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Lista apenas categorias principais (parentId = null)
   */
  async getMainCategories(): Promise<Category[]> {
    const response = await this.listCategories({ parentId: null, isActive: true });
    return response.data;
  }

  /**
   * Lista apenas subcategorias (parentId != null)
   */
  async getSubcategoriesOnly(): Promise<Category[]> {
    const response = await this.listCategories({ isActive: true });
    return response.data.filter(category => category.parentId);
  }

  /**
   * Obtém a hierarquia completa de categorias
   */
  async getCategoryHierarchy(): Promise<Category[]> {
    const mainCategories = await this.getMainCategories();
    const subcategories = await this.getSubcategoriesOnly();
    
    return mainCategories.map(mainCategory => ({
      ...mainCategory,
      children: subcategories.filter(sub => sub.parentId === mainCategory.id)
    }));
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const categoriesService = new CategoriesService();