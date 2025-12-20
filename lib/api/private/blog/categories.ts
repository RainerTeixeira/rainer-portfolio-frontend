/**
 * @fileoverview Serviços Privados de Categorias
 * 
 * Contém funções para comunicação com endpoints privados de categorias.
 * Requer autenticação.
 * 
 * @module lib/api/private/blog/categories
 */

import { privateClient } from '../../clients/private-client';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryMutationResponse,
  DeleteCategoryResponse,
} from '../../types/private/blog';
import { PostCategory } from '../../types/public/blog';

/**
 * Cria uma nova categoria
 * 
 * @param data - Dados da categoria a ser criada
 * @returns Promise<CategoryMutationResponse> - Categoria criada
 * 
 * @example
 * ```typescript
 * const novaCategoria = await createCategory({
 *   name: 'Tecnologia',
 *   description: 'Posts sobre tecnologia',
 *   color: '#3B82F6',
 *   icon: 'cpu'
 * });
 * 
 * console.log('Categoria criada:', novaCategoria.data.name);
 * ```
 */
export const createCategory = async (data: CreateCategoryDto): Promise<CategoryMutationResponse> => {
  const response = await privateClient.post('/categories', data);
  return response.data;
};

/**
 * Atualiza uma categoria existente
 * 
 * @param id - ID da categoria a ser atualizada
 * @param data - Dados a serem atualizados
 * @returns Promise<CategoryMutationResponse> - Categoria atualizada
 * 
 * @example
 * ```typescript
 * const categoriaAtualizada = await updateCategory('123', {
 *   name: 'Tecnologia e Inovação',
 *   color: '#10B981'
 * });
 * 
 * console.log('Categoria atualizada:', categoriaAtualizada.data.name);
 * ```
 */
export const updateCategory = async (
  id: string,
  data: UpdateCategoryDto
): Promise<CategoryMutationResponse> => {
  const response = await privateClient.patch(`/categories/${id}`, data);
  return response.data;
};

/**
 * Remove uma categoria permanentemente
 * 
 * @param id - ID da categoria a ser removida
 * @returns Promise<DeleteCategoryResponse> - Confirmação da remoção
 * 
 * @example
 * ```typescript
 * const resultado = await deleteCategory('123');
 * 
 * if (resultado.deleted) {
 *   console.log('Categoria removida com sucesso');
 * }
 * ```
 */
export const deleteCategory = async (id: string): Promise<DeleteCategoryResponse> => {
  const response = await privateClient.delete(`/categories/${id}`);
  return response.data;
};

/**
 * Busca todas as categorias com dados administrativos
 * 
 * @returns Promise<PostCategory[]> - Lista de categorias com contadores
 * 
 * @example
 * ```typescript
 * const categorias = await getCategoriesAdmin();
 * 
 * categorias.forEach(cat => {
 *   console.log(`${cat.name}: ${cat.postsCount} posts`);
 * });
 * ```
 */
export const getCategoriesAdmin = async (): Promise<PostCategory[]> => {
  const response = await privateClient.get('/categories/admin');
  return response.data.data;
};

/**
 * Reordena categorias
 * 
 * @param categories - Array com IDs na ordem desejada
 * @returns Promise<{ message: string }> - Confirmação da reordenação
 * 
 * @example
 * ```typescript
 * await reorderCategories(['456', '123', '789']);
 * console.log('Categorias reordenadas');
 * ```
 */
export const reorderCategories = async (categories: string[]): Promise<{ message: string }> => {
  const response = await privateClient.post('/categories/reorder', { categories });
  return response.data;
};

/**
 * Valida se o nome de uma categoria está disponível
 * 
 * @param name - Nome da categoria a ser validado
 * @param categoryId - ID da categoria (para edição, opcional)
 * @returns Promise<{ available: boolean; suggestedName?: string }> - Resultado da validação
 * 
 * @example
 * ```typescript
 * const validacao = await validateCategoryName('JavaScript');
 * 
 * if (validacao.available) {
 *   console.log('Nome disponível!');
 * } else {
 *   console.log('Nome em uso, sugerido:', validacao.suggestedName);
 * }
 * ```
 */
export const validateCategoryName = async (
  name: string,
  categoryId?: string
): Promise<{ available: boolean; suggestedName?: string }> => {
  const response = await privateClient.post('/categories/validate-name', {
    name,
    categoryId
  });
  return response.data;
};

/**
 * Mescla uma categoria em outra
 * 
 * @param sourceId - ID da categoria de origem (será removida)
 * @param targetId - ID da categoria de destino (receberá os posts)
 * @returns Promise<{ message: string; mergedCount: number }> - Resultado da mesclagem
 * 
 * @example
 * ```typescript
 * const resultado = await mergeCategories('123', '456');
 * 
 * console.log(`${resultado.mergedCount} posts movidos`);
 * ```
 */
export const mergeCategories = async (
  sourceId: string,
  targetId: string
): Promise<{ message: string; mergedCount: number }> => {
  const response = await privateClient.post('/categories/merge', {
    sourceId,
    targetId
  });
  return response.data;
};
