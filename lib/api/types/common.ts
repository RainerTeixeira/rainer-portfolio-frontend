/**
 * Types - Common
 */

export interface ApiSuccessResponse<T = any> {
  readonly success: true;
  readonly message?: string;
  readonly data: T;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly message: string;
  readonly error?: string;
  readonly statusCode?: number;
  readonly details?: any;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

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

export interface HealthCheckResponse {
  readonly status: 'ok' | 'error';
  readonly timestamp: string;
  readonly uptime: number;
  readonly memory: {
    readonly used: number;
    readonly total: number;
    readonly percentage: number;
  };
}

export interface DetailedHealthCheckResponse extends HealthCheckResponse {
  readonly database: {
    readonly provider: 'PRISMA' | 'DYNAMODB';
    readonly status: 'connected' | 'disconnected' | 'error';
    readonly description: string;
    readonly endpoint?: string;
  };
  readonly environment: string;
  readonly version: string;
}

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
 * Nó do documento Tiptap
 */
export interface TiptapNode {
  readonly type: string;
  readonly attrs?: Record<string, any>;
  readonly content?: TiptapNode[];
  readonly marks?: TiptapMark[];
  readonly text?: string;
}

/**
 * Marca de formatação do Tiptap
 */
export interface TiptapMark {
  readonly type: string;
  readonly attrs?: Record<string, any>;
}
