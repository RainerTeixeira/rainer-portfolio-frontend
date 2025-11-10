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
  Post,
  PostFilters,
  PostsListResponse,
  UpdatePostData,
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

/**
 * Serviço responsável pelo CRUD de posts e operações relacionadas.
 */
export class PostsService {
  private readonly basePath = '/posts';

  /**
   * Lista posts com paginação e filtros
   * Retorna: { success: true, posts: Post[], pagination: {...} }
   */
  /**
   * Lista posts com filtros opcionais e paginação.
   * @param filters Filtros de listagem (status, autor, subcategoria, etc.)
   */
  async listPosts(filters: PostFilters = {}): Promise<PostsListResponse> {
    return this.getPosts(filters);
  }

  /**
   * Alias para listPosts (compatibilidade com testes).
   */
  async getPosts(filters: PostFilters = {}): Promise<PostsListResponse> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.subcategoryId)
      params.append('subcategoryId', filters.subcategoryId);
    if (filters.authorId) params.append('authorId', filters.authorId);
    if (filters.featured !== undefined)
      params.append('featured', filters.featured.toString());
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response = await api.get<PostsListResponse>(url);
    return response;
  }

  /**
   * Busca um post por ID
   */
  /**
   * Busca post por ID.
   */
  async getPostById(id: string): Promise<ApiResponse<Post>> {
    const response = await api.get<ApiResponse<Post>>(`${this.basePath}/${id}`);
    return response;
  }

  /**
   * Busca um post por slug
   */
  /**
   * Busca post por slug.
   */
  async getPostBySlug(slug: string): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(
      `${this.basePath}/slug/${slug}`
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Erro ao buscar post');
  }

  /**
   * Cria um novo post
   */
  /**
   * Cria novo post.
   */
  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>(this.basePath, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Erro ao criar post');
  }

  /**
   * Atualiza um post existente
   */
  /**
   * Atualiza post existente.
   */
  async updatePost(
    id: string,
    data: UpdatePostData
  ): Promise<ApiResponse<Post>> {
    const response = await api.put<ApiResponse<Post>>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  /**
   * Deleta um post
   */
  /**
   * Deleta post por ID.
   */
  async deletePost(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Publica um post (muda status para PUBLISHED)
   */
  /**
   * Publica post (status → PUBLISHED).
   */
  async publishPost(id: string): Promise<ApiResponse<Post>> {
    const response = await api.patch<ApiResponse<Post>>(
      `${this.basePath}/${id}/publish`
    );
    return response;
  }

  /**
   * Despublica um post (muda status para DRAFT)
   */
  /**
   * Despublica post (status → DRAFT).
   */
  async unpublishPost(id: string): Promise<ApiResponse<Post>> {
    const response = await api.patch<ApiResponse<Post>>(
      `${this.basePath}/${id}/unpublish`
    );
    return response;
  }

  /**
   * Lista posts por subcategoria
   */
  /**
   * Lista posts por subcategoria.
   */
  async getPostsBySubcategory(
    subcategoryId: string
  ): Promise<ApiResponse<Post[]>> {
    const response = await api.get<ApiResponse<Post[]>>(
      `${this.basePath}/subcategory/${subcategoryId}`
    );
    return response;
  }

  /**
   * Lista posts por autor
   */
  /**
   * Lista posts por autor.
   */
  async getPostsByAuthor(authorId: string): Promise<ApiResponse<Post[]>> {
    const response = await api.get<ApiResponse<Post[]>>(
      `${this.basePath}/author/${authorId}`
    );
    return response;
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const postsService = new PostsService();
