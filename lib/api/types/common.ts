/**
 * Types - Common
 * 
 * Tipos comuns utilizados em toda a aplicação para respostas de API,
 * paginação e estruturas de conteúdo Tiptap.
 * 
 * @module lib/api/types/common
 * @fileoverview Tipos comuns para API e conteúdo
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ═══════════════════════════════════════════════════════════════════════════
// Tipos de Resposta da API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Interface para resposta de sucesso da API
 * 
 * @template T - Tipo dos dados retornados
 * @interface ApiSuccessResponse
 * @readonly
 * 
 * @example
 * ```typescript
 * const response: ApiSuccessResponse<User> = {
 *   success: true,
 *   message: 'Usuário criado com sucesso',
 *   data: { id: '1', name: 'João' }
 * };
 * ```
 */
export interface ApiSuccessResponse<T = unknown> {
  readonly success: true;
  readonly message?: string;
  readonly data: T;
}

/**
 * Interface para resposta de erro da API
 * 
 * @interface ApiErrorResponse
 * @readonly
 * 
 * @example
 * ```typescript
 * const error: ApiErrorResponse = {
 *   success: false,
 *   message: 'Usuário não encontrado',
 *   statusCode: 404
 * };
 * ```
 */
export interface ApiErrorResponse {
  readonly success: false;
  readonly message: string;
  readonly error?: string;
  readonly statusCode?: number;
  readonly details?: unknown;
}

/**
 * Tipo union para resposta da API (sucesso ou erro)
 * 
 * @template T - Tipo dos dados em caso de sucesso
 * @typedef {ApiSuccessResponse<T> | ApiErrorResponse} ApiResponse
 * 
 * @example
 * ```typescript
 * async function fetchUser(id: string): Promise<ApiResponse<User>> {
 *   // Pode retornar sucesso ou erro
 * }
 * ```
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// ═══════════════════════════════════════════════════════════════════════════
// Tipos de Paginação
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Interface para metadados de paginação
 * 
 * @interface PaginationMeta
 * @readonly
 * 
 * @example
 * ```typescript
 * const meta: PaginationMeta = {
 *   page: 1,
 *   limit: 10,
 *   total: 100,
 *   totalPages: 10
 * };
 * ```
 */
export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
}

/**
 * Interface para resposta paginada da API
 * 
 * @template T - Tipo dos itens na lista
 * @interface PaginatedResponse
 * @readonly
 * 
 * @example
 * ```typescript
 * const response: PaginatedResponse<Post> = {
 *   success: true,
 *   data: [{ id: '1', title: 'Post 1' }],
 *   pagination: { page: 1, limit: 10, total: 50, totalPages: 5 }
 * };
 * ```
 */
export interface PaginatedResponse<T> {
  readonly success: true;
  readonly data: T[];
  readonly pagination: PaginationMeta;
}

// ============================================================================
// Note: HealthCheckResponse and DetailedHealthCheckResponse moved to health.ts
// Import from '@/lib/api/types/health' instead
// ============================================================================

// ═══════════════════════════════════════════════════════════════════════════
// Tipos do Tiptap
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Estrutura JSON do Tiptap
 * 
 * Representa o documento completo do editor Tiptap.
 * O tipo raiz sempre é 'doc' e pode conter uma lista de nós filhos.
 * 
 * @interface TiptapJSON
 * @readonly
 * 
 * @example
 * ```typescript
 * const doc: TiptapJSON = {
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] }
 *   ]
 * };
 * ```
 */
export interface TiptapJSON {
  readonly type: 'doc';
  readonly content?: TiptapNode[];
}

/**
 * Tipo para atributos de nós Tiptap
 * 
 * Representa um objeto de atributos genéricos que podem ser
 * aplicados a nós e marcas do Tiptap.
 * 
 * @typedef {Record<string, unknown>} TiptapAttrs
 */
type TiptapAttrs = Record<string, unknown>;

/**
 * Nó do documento Tiptap
 * 
 * Representa um nó individual na árvore do documento Tiptap.
 * Pode ser um parágrafo, heading, imagem, texto, etc.
 * 
 * @interface TiptapNode
 * @readonly
 * 
 * @example
 * ```typescript
 * const paragraph: TiptapNode = {
 *   type: 'paragraph',
 *   content: [
 *     { type: 'text', text: 'Texto em ', marks: [{ type: 'bold' }] },
 *     { type: 'text', text: 'negrito' }
 *   ]
 * };
 * ```
 */
export interface TiptapNode {
  readonly type: string;
  readonly attrs?: TiptapAttrs;
  readonly content?: TiptapNode[];
  readonly marks?: TiptapMark[];
  readonly text?: string;
}

/**
 * Marca de formatação do Tiptap
 * 
 * Representa uma marca de formatação aplicada ao texto,
 * como negrito, itálico, link, etc.
 * 
 * @interface TiptapMark
 * @readonly
 * 
 * @example
 * ```typescript
 * const boldMark: TiptapMark = { type: 'bold' };
 * const linkMark: TiptapMark = {
 *   type: 'link',
 *   attrs: { href: 'https://example.com', target: '_blank' }
 * };
 * ```
 */
export interface TiptapMark {
  readonly type: string;
  readonly attrs?: TiptapAttrs;
}
