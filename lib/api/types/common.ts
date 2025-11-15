/**
 * Types - Common
 */

export interface ApiSuccessResponse<T = unknown> {
  readonly success: true;
  readonly message?: string;
  readonly data: T;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly message: string;
  readonly error?: string;
  readonly statusCode?: number;
  readonly details?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
}

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
// Tiptap Types
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Estrutura JSON do Tiptap
 * Representa o documento completo do editor
 */
export interface TiptapJSON {
  readonly type: 'doc';
  readonly content?: TiptapNode[];
}

/**
 * Tipo para atributos de nós Tiptap
 */
type TiptapAttrs = Record<string, unknown>;

/**
 * Nó do documento Tiptap
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
 */
export interface TiptapMark {
  readonly type: string;
  readonly attrs?: TiptapAttrs;
}
