// ============================================================================
// Serviço de Posts - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar posts do blog
 * 
 * @fileoverview Serviço de posts com métodos para CRUD e operações específicas
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  CreatePostData,
  PaginatedResponse,
  Post,
  PostFilters,
  UpdatePostData
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

export class PostsService {
  private readonly basePath = '/posts';

  /**
   * Lista posts com paginação e filtros
   */
  async listPosts(filters: PostFilters = {}): Promise<PaginatedResponse<Post>> {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.subcategoryId) params.append('subcategoryId', filters.subcategoryId);
    if (filters.authorId) params.append('authorId', filters.authorId);
    if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
    
    const response = await api.get<ApiResponse<PaginatedResponse<Post>>>(url);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Busca um post por ID
   */
  async getPostById(id: string): Promise<ApiResponse<Post>> {
    const response = await api.get<ApiResponse<Post>>(`${this.basePath}/${id}`);
    return response;
  }

  /**
   * Busca um post por slug
   */
  async getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
    const response = await api.get<ApiResponse<Post>>(`${this.basePath}/slug/${slug}`);
    return response;
  }

  /**
   * Cria um novo post
   */
  async createPost(data: CreatePostData): Promise<ApiResponse<Post>> {
    const response = await api.post<ApiResponse<Post>>(this.basePath, data);
    return response;
  }

  /**
   * Atualiza um post existente
   */
  async updatePost(id: string, data: UpdatePostData): Promise<ApiResponse<Post>> {
    const response = await api.put<ApiResponse<Post>>(`${this.basePath}/${id}`, data);
    return response;
  }

  /**
   * Deleta um post
   */
  async deletePost(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Publica um post (muda status para PUBLISHED)
   */
  async publishPost(id: string): Promise<ApiResponse<Post>> {
    const response = await api.patch<ApiResponse<Post>>(`${this.basePath}/${id}/publish`);
    return response;
  }

  /**
   * Despublica um post (muda status para DRAFT)
   */
  async unpublishPost(id: string): Promise<ApiResponse<Post>> {
    const response = await api.patch<ApiResponse<Post>>(`${this.basePath}/${id}/unpublish`);
    return response;
  }

  /**
   * Lista posts por subcategoria
   */
  async getPostsBySubcategory(subcategoryId: string): Promise<ApiResponse<Post[]>> {
    const response = await api.get<ApiResponse<Post[]>>(`${this.basePath}/subcategory/${subcategoryId}`);
    return response;
  }

  /**
   * Lista posts por autor
   */
  async getPostsByAuthor(authorId: string): Promise<ApiResponse<Post[]>> {
    const response = await api.get<ApiResponse<Post[]>>(`${this.basePath}/author/${authorId}`);
    return response;
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const postsService = new PostsService();