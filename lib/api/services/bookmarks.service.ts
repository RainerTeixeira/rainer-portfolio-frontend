// ============================================================================
// Serviço de Bookmarks - Integração com API do Backend
// ============================================================================

/**
 * Serviço para gerenciar posts salvos pelos usuários
 * 
 * @fileoverview Serviço de bookmarks com métodos para salvar/remover e organizar
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { api } from '../client';
import type {
  ApiResponse,
  Bookmark,
  CreateBookmarkData,
  UpdateBookmarkData
} from '../types';

// ============================================================================
// Classe do Serviço
// ============================================================================

export class BookmarksService {
  private readonly basePath = '/bookmarks';

  /**
   * Salvar um post (criar bookmark)
   */
  async savePost(data: CreateBookmarkData): Promise<ApiResponse<Bookmark>> {
    const response = await api.post<ApiResponse<Bookmark>>(this.basePath, data);
    return response;
  }

  /**
   * Busca um bookmark por ID
   */
  async getBookmarkById(id: string): Promise<ApiResponse<Bookmark>> {
    const response = await api.get<ApiResponse<Bookmark>>(`${this.basePath}/${id}`);
    return response;
  }

  /**
   * Lista bookmarks de um usuário
   */
  async getBookmarksByUser(userId: string): Promise<ApiResponse<Bookmark[]>> {
    const response = await api.get<ApiResponse<Bookmark[]>>(`${this.basePath}/user/${userId}`);
    return response;
  }

  /**
   * Lista bookmarks de uma coleção específica
   */
  async getBookmarksByCollection(userId: string, name: string): Promise<ApiResponse<Bookmark[]>> {
    const response = await api.get<ApiResponse<Bookmark[]>>(
      `${this.basePath}/user/${userId}/collection`,
      { params: { name } }
    );
    return response;
  }

  /**
   * Atualiza um bookmark existente
   */
  async updateBookmark(id: string, data: UpdateBookmarkData): Promise<ApiResponse<Bookmark>> {
    const response = await api.put<ApiResponse<Bookmark>>(`${this.basePath}/${id}`, data);
    return response;
  }

  /**
   * Remove um bookmark específico
   */
  async removeBookmark(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Remove um post dos bookmarks de um usuário
   */
  async removePostFromBookmarks(userId: string, postId: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/user/${userId}/post/${postId}`);
  }

  /**
   * Verifica se um usuário salvou um post específico
   */
  async hasUserBookmarkedPost(userId: string, postId: string): Promise<boolean> {
    try {
      const bookmarksResponse = await this.getBookmarksByUser(userId);
      if (bookmarksResponse.success && bookmarksResponse.data) {
        return bookmarksResponse.data.some(bookmark => bookmark.postId === postId);
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Toggle save/unsave de um post
   */
  async toggleBookmark(userId: string, postId: string, collection?: string, notes?: string): Promise<{ bookmarked: boolean; bookmark?: Bookmark }> {
    const hasBookmarked = await this.hasUserBookmarkedPost(userId, postId);
    
    if (hasBookmarked) {
      // Encontrar o bookmark e removê-lo
      const bookmarksResponse = await this.getBookmarksByUser(userId);
      if (bookmarksResponse.success && bookmarksResponse.data) {
        const bookmark = bookmarksResponse.data.find(b => b.postId === postId);
        if (bookmark) {
          await this.removeBookmark(bookmark.id);
        }
      }
      return { bookmarked: false };
    } else {
      const bookmarkResponse = await this.savePost({ userId, postId, collection, notes });
      if (bookmarkResponse.success) {
        return { bookmarked: true, bookmark: bookmarkResponse.data };
      }
      throw new Error(bookmarkResponse.message);
    }
  }

  /**
   * Lista todas as coleções de um usuário
   */
  async getUserCollections(userId: string): Promise<string[]> {
    const bookmarksResponse = await this.getBookmarksByUser(userId);
    if (bookmarksResponse.success && bookmarksResponse.data) {
      const collections = new Set(bookmarksResponse.data.map(b => b.collection).filter(Boolean) as string[]);
      return Array.from(collections);
    }
    return [];
  }

  /**
   * Move um bookmark para outra coleção
   */
  async moveToCollection(bookmarkId: string, collection: string): Promise<Bookmark> {
    const response = await this.updateBookmark(bookmarkId, { collection });
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }

  /**
   * Adiciona ou atualiza notas de um bookmark
   */
  async updateNotes(bookmarkId: string, notes: string): Promise<Bookmark> {
    const response = await this.updateBookmark(bookmarkId, { notes });
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message);
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const bookmarksService = new BookmarksService();