/**
 * @fileoverview Serviços Públicos de Categorias
 * 
 * Contém funções para comunicação com endpoints públicos de categorias.
 * Não requer autenticação.
 * 
 * @module lib/api/public/blog/categories
 */

import { publicClient } from '../../clients/public-client';
import { PostCategory } from '../../types/public/blog';

/**
 * Busca todas as categorias cadastradas
 * 
 * @returns Promise<PostCategory[]> - Lista de categorias
 * 
 * @example
 * ```typescript
 * const categorias = await getPublicCategories();
 * categorias.forEach(cat => console.log(cat.name));
 * ```
 */
export const getPublicCategories = async (): Promise<PostCategory[]> => {
  const response = await publicClient.get('/categories');
  return response.data.data;
};

/**
 * Busca uma categoria específica pelo seu ID
 * 
 * @param id - ID único da categoria
 * @returns Promise<PostCategory> - Categoria encontrada
 * 
 * @example
 * ```typescript
 * const categoria = await getPublicCategoryById('123');
 * console.log(categoria.name);
 * ```
 */
export const getPublicCategoryById = async (id: string): Promise<PostCategory> => {
  const response = await publicClient.get(`/categories/${id}`);
  return response.data.data;
};

/**
 * Busca uma categoria específica pelo seu slug (URL-friendly)
 * 
 * @param slug - Slug da categoria
 * @returns Promise<PostCategory> - Categoria encontrada
 * 
 * @example
 * ```typescript
 * const categoria = await getPublicCategoryBySlug('tecnologia');
 * console.log(categoria.name);
 * ```
 */
export const getPublicCategoryBySlug = async (slug: string): Promise<PostCategory> => {
  const response = await publicClient.get(`/categories/slug/${slug}`);
  return response.data.data;
};

/**
 * Busca categorias principais (sem pai)
 * 
 * @returns Promise<PostCategory[]> - Lista de categorias principais
 * 
 * @example
 * ```typescript
 * const principais = await getMainCategories();
 * console.log(`Existem ${principais.length} categorias principais`);
 * ```
 */
export const getMainCategories = async (): Promise<PostCategory[]> => {
  const response = await publicClient.get('/categories/main');
  return response.data.data;
};

/**
 * Busca subcategorias de uma categoria pai
 * 
 * @param parentId - ID da categoria pai
 * @returns Promise<PostCategory[]> - Lista de subcategorias
 * 
 * @example
 * ```typescript
 * const subcategorias = await getSubcategories('123');
 * subcategorias.forEach(sub => console.log(sub.name));
 * ```
 */
export const getSubcategories = async (parentId: string): Promise<PostCategory[]> => {
  const response = await publicClient.get(`/categories/${parentId}/subcategories`);
  return response.data.data;
};

/**
 * Busca categorias populares (com mais posts)
 * 
 * @param limit - Número máximo de categorias (padrão: 10)
 * @returns Promise<PostCategory[]> - Lista de categorias populares
 * 
 * @example
 * ```typescript
 * const populares = await getPopularCategories(5);
 * populares.forEach(cat => console.log(`${cat.name}: ${cat.postsCount} posts`));
 * ```
 */
export const getPopularCategories = async (
  limit: number = 10
): Promise<PostCategory[]> => {
  const response = await publicClient.get('/categories/popular', {
    params: { limit }
  });
  return response.data.data;
};
