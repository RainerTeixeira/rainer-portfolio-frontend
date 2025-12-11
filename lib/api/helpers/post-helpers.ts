/**
 * Post Helpers
 *
 * Helpers para preparar dados de posts para a API.
 * Converte dados de formulários para o formato esperado pelo backend.
 *
 * @fileoverview Helpers para preparação de dados de posts
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { TiptapJSON } from '@/lib/api/types/common';
import type {
  CreatePostData,
  PostStatus,
  UpdatePostData,
} from '@/lib/api/types/posts';
import { extractTextFromTiptap } from '@/lib/blog';
import { textToSlug } from '@/lib/utils';

// ============================================================================
// Post Preparation
// ============================================================================

/**
 * Prepara dados do formulário para criar post no backend
 *
 * Converte dados do formulário do dashboard para o formato CreatePostData
 * esperado pela API. Gera slug automaticamente a partir do título.
 *
 * @param formData - Dados do formulário do dashboard
 * @param authorId - ID do autor (do contexto de autenticação)
 * @returns Dados prontos para enviar para API (CreatePostData)
 *
 * @example
 * ```ts
 * const postData = preparePostForCreate({
 *   title: 'Meu Post',
 *   content: tiptapJSON,
 *   subcategoryId: 'cat-123',
 *   status: 'DRAFT'
 * }, user.id);
 * await postsService.createPost(postData);
 * ```
 */
export function preparePostForCreate(
  formData: {
    title: string;
    content: TiptapJSON;
    subcategoryId?: string;
    status?: PostStatus;
    featured?: boolean;
    pinned?: boolean;
    priority?: number;
  },
  authorId: string
): CreatePostData {
  const slug = textToSlug(formData.title);

  const dto: CreatePostData = {
    title: formData.title,
    slug,
    content: formData.content,
    authorId,
    subcategoryId: formData.subcategoryId || '',
    status: formData.status ?? 'DRAFT' as PostStatus,
    featured: formData.featured ?? false,
    allowComments: true,
    pinned: formData.pinned ?? false,
    priority: formData.priority ?? 0,
  };

  return dto;
}

/**
 * Prepara dados do formulário para atualizar post no backend
 *
 * Converte dados parciais do formulário para o formato UpdatePostData.
 * Gera slug automaticamente se o título for atualizado.
 *
 * @param formData - Dados parciais do formulário do dashboard
 * @returns Dados prontos para enviar para API (UpdatePostData)
 *
 * @example
 * ```ts
 * const updateData = preparePostForUpdate({
 *   title: 'Novo Título',
 *   status: 'PUBLISHED'
 * });
 * await postsService.updatePost(postId, updateData);
 * ```
 */
export function preparePostForUpdate(
  formData: Partial<{
    title: string;
    content: TiptapJSON;
    subcategoryId?: string;
    status?: PostStatus;
    featured?: boolean;
    pinned?: boolean;
    priority?: number;
  }>
): UpdatePostData {
  // Construir objeto diretamente, incluindo apenas propriedades definidas
  const dto: UpdatePostData = {
    ...(formData.title && {
      title: formData.title,
      slug: textToSlug(formData.title),
    }),
    ...(formData.content && { content: formData.content }),
    ...(formData.subcategoryId !== undefined && {
      subcategoryId: formData.subcategoryId,
    }),
    ...(formData.status !== undefined && { status: formData.status }),
    ...(formData.featured !== undefined && { featured: formData.featured }),
    ...(formData.pinned !== undefined && { pinned: formData.pinned }),
    ...(formData.priority !== undefined && { priority: formData.priority }),
  };

  return dto;
}

// ============================================================================
// Post Validation
// ============================================================================

/**
 * Valida dados de post antes de enviar para API
 *
 * Verifica regras de validação básicas:
 * - Título: mínimo 3 caracteres, máximo 200
 * - Conteúdo: mínimo 10 caracteres de texto
 *
 * @param data - Dados a validar (CreatePostData ou UpdatePostData)
 * @returns Lista de erros (vazia se válido)
 *
 * @example
 * ```ts
 * const errors = validatePostData(postData);
 * if (errors.length > 0) {
 *   console.error('Erros de validação:', errors);
 * }
 * ```
 */
export function validatePostData(
  data: CreatePostData | UpdatePostData
): string[] {
  const errors: string[] = [];

  // Validar título
  if ('title' in data && data.title) {
    if (data.title.length < 3) {
      errors.push('Título deve ter pelo menos 3 caracteres');
    }
    if (data.title.length > 200) {
      errors.push('Título não pode ter mais de 200 caracteres');
    }
  }

  // Validar conteúdo
  if ('content' in data && data.content) {
    const text = extractTextFromTiptap(data.content);
    if (text.length < 10) {
      errors.push('Conteúdo muito curto (mínimo 10 caracteres)');
    }
  }

  return errors;
}
