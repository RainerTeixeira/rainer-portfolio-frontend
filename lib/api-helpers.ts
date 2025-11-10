/**
 * API Helpers
 *
 * Funções utilitárias para preparar dados para o backend MongoDB.
 * Converte entre formatos do Editor e do banco de dados.
 *
 * @fileoverview Helpers para comunicação com API
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { TiptapJSON, TiptapNode } from '@/lib/api/types/common';
import type {
  CreatePostDTO,
  PostStatus,
  UpdatePostDTO,
} from '@/lib/api/types/posts';

/**
 * Converte string para slug URL-friendly
 *
 * @param text - Texto para converter
 * @returns Slug formatado
 *
 * @example
 * textToSlug("Meu Primeiro Post!") // "meu-primeiro-post"
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífen
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-+|-+$/g, ''); // Remove hífens do início/fim
}

/**
 * Calcula tempo de leitura baseado no conteúdo
 *
 * @param text - Texto completo do post
 * @returns Tempo em minutos
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time > 0 ? time : 1;
}

/**
 * Extrai texto puro do JSON do Tiptap
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns Texto puro
 */
export function extractTextFromTiptap(content: TiptapJSON): string {
  function extractFromNode(node: TiptapJSON | TiptapNode): string {
    if ('text' in node && typeof node.text === 'string') {
      return node.text;
    }

    if ('content' in node && Array.isArray(node.content)) {
      return node.content
        .map((child: TiptapNode) => extractFromNode(child))
        .join(' ');
    }

    return '';
  }

  return extractFromNode(content).trim();
}

/**
 * Gera excerpt (resumo) do conteúdo
 *
 * @param content - Conteúdo JSON do Tiptap
 * @param maxLength - Tamanho máximo do excerpt
 * @returns Excerpt formatado
 */
export function generateExcerpt(
  content: TiptapJSON,
  maxLength: number = 160
): string {
  const text = extractTextFromTiptap(content);

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Prepara dados do formulário para criar post no backend (Schema Simplificado)
 *
 * @param formData - Dados do formulário do dashboard
 * @param authorId - ID do autor (do contexto de autenticação)
 * @returns DTO pronto para enviar para API
 *
 * @example
 * const post = preparePostForCreate({
 *   title: "Meu Post",
 *   content: tiptapJSON
 * }, user.id)
 */
export function preparePostForCreate(
  formData: {
    title: string;
    content: TiptapJSON;
    categoryId?: string;
    status?: PostStatus;
    featured?: boolean;
    pinned?: boolean;
    priority?: number;
  },
  authorId: string = 'mock-author-id' // Mock até ter autenticação real
): CreatePostDTO {
  const slug = textToSlug(formData.title);

  return {
    title: formData.title,
    slug,
    content: formData.content,
    authorId,
    categoryId: formData.categoryId,
    status: (formData.status || 'DRAFT') as PostStatus,
    featured: formData.featured || false,
    allowComments: true,
    pinned: formData.pinned || false,
    priority: formData.priority || 0,
    publishedAt: formData.status === 'PUBLISHED' ? new Date() : undefined,
  };
}

/**
 * Prepara dados do formulário para atualizar post no backend (Schema Simplificado)
 *
 * @param formData - Dados do formulário do dashboard
 * @returns DTO pronto para enviar para API
 */
export function preparePostForUpdate(
  formData: Partial<{
    title: string;
    content: TiptapJSON;
    categoryId?: string;
    status?: PostStatus;
    featured?: boolean;
    pinned?: boolean;
    priority?: number;
  }>
): UpdatePostDTO {
  const dto: UpdatePostDTO = {};

  if (formData.title) {
    dto.title = formData.title;
    dto.slug = textToSlug(formData.title);
  }

  if (formData.content) {
    dto.content = formData.content;
  }

  if (formData.categoryId !== undefined) dto.categoryId = formData.categoryId;
  if (formData.status) {
    dto.status = formData.status;
    // Auto-define publishedAt ao publicar
    if (formData.status === 'PUBLISHED') {
      dto.publishedAt = new Date();
    }
  }
  if (formData.featured !== undefined) dto.featured = formData.featured;
  if (formData.pinned !== undefined) dto.pinned = formData.pinned;
  if (formData.priority !== undefined) dto.priority = formData.priority;

  return dto;
}

/**
 * Valida dados de post antes de enviar (Schema Simplificado)
 *
 * @param data - Dados a validar
 * @returns Lista de erros (vazia se válido)
 */
export function validatePostData(
  data: CreatePostDTO | UpdatePostDTO
): string[] {
  const errors: string[] = [];

  if ('title' in data && data.title) {
    if (data.title.length < 3) {
      errors.push('Título deve ter pelo menos 3 caracteres');
    }
    if (data.title.length > 200) {
      errors.push('Título não pode ter mais de 200 caracteres');
    }
  }

  if ('content' in data && data.content) {
    const text = extractTextFromTiptap(data.content);
    if (text.length < 10) {
      errors.push('Conteúdo muito curto (mínimo 10 caracteres)');
    }
  }

  // Schema simplificado não tem mais excerpt, metaDescription, tags validados aqui

  return errors;
}

/**
 * Cria conteúdo JSON vazio do Tiptap
 *
 * @returns Documento vazio do Tiptap
 */
export function createEmptyTiptapContent(): TiptapJSON {
  return {
    type: 'doc',
    content: [],
  };
}

/**
 * Verifica se conteúdo está vazio
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns true se vazio
 */
export function isContentEmpty(content: TiptapJSON): boolean {
  const text = extractTextFromTiptap(content);
  return text.trim().length === 0;
}

/**
 * Formata data para exibição
 *
 * @param date - Data a formatar
 * @returns Data formatada em pt-BR
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formata data e hora para exibição
 *
 * @param date - Data a formatar
 * @returns Data e hora formatadas
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Converte status do post para português
 *
 * @param status - Status em inglês
 * @returns Status traduzido
 */
export function translateStatus(status: PostStatus): string {
  const translations: Record<PostStatus, string> = {
    DRAFT: 'Rascunho',
    PUBLISHED: 'Publicado',
    ARCHIVED: 'Arquivado',
    SCHEDULED: 'Agendado',
    TRASH: 'Lixeira',
  };

  return translations[status] || status;
}
