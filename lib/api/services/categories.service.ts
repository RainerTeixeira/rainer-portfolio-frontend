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
  ApiSuccessResponse,
  Category,
  CategoryFilters,
  CreateCategoryData,
  PaginatedResponse,
  UpdateCategoryData,
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável pelo CRUD de categorias e navegação hierárquica.
 */
export class CategoriesService {
  private readonly basePath = '/categories';

  /**
   * Lista categorias com paginação e filtros
   */
  /**
   * Lista categorias com filtros e paginação.
   */
  async listCategories(
    filters: CategoryFilters = {}
  ): Promise<PaginatedResponse<Category>> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.parentId !== undefined)
      params.append('parentId', filters.parentId);
    if (filters.isActive !== undefined)
      params.append('isActive', filters.isActive.toString());
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response =
      await api.get<ApiResponse<PaginatedResponse<Category>>>(url);
    if (!response.success) {
      throw new Error(response.message || 'Erro ao listar categorias');
    }
    return (response as ApiSuccessResponse<PaginatedResponse<Category>>).data;
  }

  /**
   * Busca uma categoria por ID
   */
  /**
   * Busca categoria por ID.
   */
  async getCategoryById(id: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(
      `${this.basePath}/${id}`
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar categoria');
    }
    return (response as ApiSuccessResponse<Category>).data;
  }

  /**
   * Busca uma categoria por slug
   */
  /**
   * Busca categoria por slug.
   */
  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(
      `${this.basePath}/slug/${slug}`
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar categoria');
    }
    return (response as ApiSuccessResponse<Category>).data;
  }

  /**
   * Lista subcategorias de uma categoria principal
   */
  /**
   * Lista subcategorias de uma categoria principal.
   */
  async getSubcategories(parentId: string): Promise<Category[]> {
    const response = await api.get<ApiResponse<Category[]>>(
      `${this.basePath}/${parentId}/subcategories`
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar subcategorias');
    }
    return (response as ApiSuccessResponse<Category[]>).data;
  }

  /**
   * Cria uma nova categoria
   */
  /**
   * Cria nova categoria.
   */
  async createCategory(data: CreateCategoryData): Promise<Category> {
    const response = await api.post<ApiResponse<Category>>(this.basePath, data);
    if (!response.success) {
      throw new Error(response.message || 'Erro ao criar categoria');
    }
    return (response as ApiSuccessResponse<Category>).data;
  }

  /**
   * Atualiza uma categoria existente
   */
  /**
   * Atualiza categoria existente.
   */
  async updateCategory(
    id: string,
    data: UpdateCategoryData
  ): Promise<Category> {
    const response = await api.put<ApiResponse<Category>>(
      `${this.basePath}/${id}`,
      data
    );
    if (!response.success) {
      throw new Error(response.message || 'Erro ao atualizar categoria');
    }
    return (response as ApiSuccessResponse<Category>).data;
  }

  /**
   * Deleta uma categoria
   */
  /**
   * Deleta uma categoria por ID.
   */
  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Lista apenas categorias principais (parentId = null)
   */
  /**
   * Lista categorias principais (parentId = null).
   */
  async getMainCategories(): Promise<Category[]> {
    const response = await this.listCategories({
      parentId: undefined,
      isActive: true,
    });
    return response.data;
  }

  /**
   * Lista apenas subcategorias (parentId != null)
   */
  /**
   * Lista apenas subcategorias (parentId != null).
   */
  async getSubcategoriesOnly(): Promise<Category[]> {
    try {
      // Tenta usar o endpoint específico para todas as subcategorias
      const response = await api.get<ApiResponse<Category[]>>(
        `${this.basePath}/subcategories/all`
      );
      if (!response.success) {
        throw new Error(response.message || 'Erro ao buscar subcategorias');
      }
      return (response as ApiSuccessResponse<Category[]>).data;
    } catch {
      // Fallback: busca todas as categorias e filtra no cliente
      const response = await this.listCategories({ isActive: true });
      return response.data.filter(category => category.parentId);
    }
  }

  /**
   * Obtém a hierarquia completa de categorias
   */
  /**
   * Retorna a hierarquia completa Category → children.
   */
  async getCategoryHierarchy(): Promise<Category[]> {
    const mainCategories = await this.getMainCategories();
    const subcategories = await this.getSubcategoriesOnly();

    return mainCategories.map(mainCategory => ({
      ...mainCategory,
      children: subcategories.filter(sub => sub.parentId === mainCategory.id),
    }));
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const categoriesService = new CategoriesService();
