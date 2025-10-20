// ============================================================================
// Serviço de Comentários - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar comentários dos posts
 * 
 * @fileoverview Serviço de comentários com métodos para CRUD e moderação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  Comment,
  CommentFilters,
  CreateCommentData,
  PaginatedResponse,
  UpdateCommentData
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

export class CommentsService {
  private readonly basePath = '/comments';

  /**
   * Lista comentários com paginação e filtros
   */
  async listComments(filters: CommentFilters = {}): Promise<PaginatedResponse<Comment>> {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.postId) params.append('postId', filters.postId);
    if (filters.authorId) params.append('authorId', filters.authorId);
    if (filters.isApproved !== undefined) params.append('isApproved', filters.isApproved.toString());
    if (filters.parentId !== undefined) params.append('parentId', filters.parentId);

    const queryString = params.toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;
    
    const response = await api.get<ApiResponse<PaginatedResponse<Comment>>>(url);
    return response.data;
  }

  /**
   * Busca um comentário por ID
   */
  async getCommentById(id: string): Promise<Comment> {
    const response = await api.get<ApiResponse<Comment>>(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Lista comentários de um post específico
   */
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    const response = await api.get<ApiResponse<Comment[]>>(`${this.basePath}/post/${postId}`);
    return response.data;
  }

  /**
   * Lista comentários de um autor específico
   */
  async getCommentsByAuthor(authorId: string): Promise<Comment[]> {
    const response = await api.get<ApiResponse<Comment[]>>(`${this.basePath}/user/${authorId}`);
    return response.data;
  }

  /**
   * Cria um novo comentário
   */
  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await api.post<ApiResponse<Comment>>(this.basePath, data);
    return response.data;
  }

  /**
   * Atualiza um comentário existente
   */
  async updateComment(id: string, data: UpdateCommentData): Promise<Comment> {
    const response = await api.put<ApiResponse<Comment>>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  /**
   * Deleta um comentário
   */
  async deleteComment(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Aprova um comentário (moderação)
   */
  async approveComment(id: string): Promise<Comment> {
    const response = await api.patch<ApiResponse<Comment>>(`${this.basePath}/${id}/approve`);
    return response.data;
  }

  /**
   * Reprova um comentário (moderação)
   */
  async disapproveComment(id: string): Promise<Comment> {
    const response = await api.patch<ApiResponse<Comment>>(`${this.basePath}/${id}/disapprove`);
    return response.data;
  }

  /**
   * Lista comentários aprovados de um post
   */
  async getApprovedCommentsByPost(postId: string): Promise<Comment[]> {
    const response = await this.listComments({ postId, isApproved: true });
    return response.data;
  }

  /**
   * Lista comentários pendentes de aprovação
   */
  async getPendingComments(): Promise<Comment[]> {
    const response = await this.listComments({ isApproved: false });
    return response.data;
  }

  /**
   * Lista comentários reportados
   */
  async getReportedComments(): Promise<Comment[]> {
    const response = await this.listComments({ isApproved: false });
    return response.data.filter(comment => comment.isReported);
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const commentsService = new CommentsService();