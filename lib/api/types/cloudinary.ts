/**
 * Cloudinary Types
 *
 * Tipos relacionados ao serviço de upload de imagens Cloudinary.
 *
 * @module lib/api/types/cloudinary
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Upload Types
// ============================================================================

/**
 * Resposta de upload de imagem
 */
export interface UploadImageResponse {
  /** Indica se o upload foi bem-sucedido */
  readonly success: boolean;
  /** URL curta da imagem (formato: /blog/nome_arquivo) */
  readonly url: string;
  /** URL completa do Cloudinary (opcional) */
  readonly fullUrl?: string;
  /** Public ID no Cloudinary */
  readonly publicId?: string;
  /** Formato da imagem */
  readonly format?: string;
  /** Largura da imagem em pixels */
  readonly width?: number;
  /** Altura da imagem em pixels */
  readonly height?: number;
  /** Tamanho do arquivo em bytes */
  readonly bytes?: number;
}

/**
 * Dados para upload de imagem do blog
 */
export interface UploadBlogImageData {
  /** Arquivo de imagem */
  readonly image: File;
  /** Nome customizado para a imagem (opcional) */
  readonly fileName?: string;
}

/**
 * Dados para upload de avatar
 */
export interface UploadAvatarData {
  /** Arquivo de imagem */
  readonly image: File;
}

/**
 * Transformações de imagem Cloudinary
 */
export interface CloudinaryTransformation {
  /** Largura da imagem */
  readonly width?: number;
  /** Altura da imagem */
  readonly height?: number;
  /** Modo de crop */
  readonly crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit' | 'pad';
  /** Qualidade da imagem (1-100) */
  readonly quality?: number;
  /** Formato de saída */
  readonly format?: 'jpg' | 'png' | 'webp' | 'avif';
  /** Gravidade para crop */
  readonly gravity?:
    | 'auto'
    | 'center'
    | 'face'
    | 'faces'
    | 'north'
    | 'south'
    | 'east'
    | 'west';
}

/**
 * Configurações de upload Cloudinary
 */
export interface CloudinaryUploadConfig {
  /** Pasta no Cloudinary */
  readonly folder?: string;
  /** Tags para organização */
  readonly tags?: string[];
  /** Transformações a aplicar */
  readonly transformation?: CloudinaryTransformation;
  /** Sobrescrever arquivo existente */
  readonly overwrite?: boolean;
}

/**
 * Tipos de imagem suportados
 */
export type SupportedImageType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp';

/**
 * Tipo de upload
 */
export type UploadType = 'blog' | 'avatar' | 'profile' | 'post';

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Resultado de validação de imagem
 */
export interface ImageValidationResult {
  /** Indica se a imagem é válida */
  readonly valid: boolean;
  /** Mensagem de erro (se inválida) */
  readonly error?: string;
  /** Warnings (não impedem upload) */
  readonly warnings?: string[];
}

/**
 * Configurações de validação de imagem
 */
export interface ImageValidationConfig {
  /** Tamanho máximo em bytes */
  readonly maxSize?: number;
  /** Tamanho mínimo em bytes */
  readonly minSize?: number;
  /** Tipos permitidos */
  readonly allowedTypes?: SupportedImageType[];
  /** Largura máxima em pixels */
  readonly maxWidth?: number;
  /** Altura máxima em pixels */
  readonly maxHeight?: number;
  /** Largura mínima em pixels */
  readonly minWidth?: number;
  /** Altura mínima em pixels */
  readonly minHeight?: number;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Tipos de erro de upload
 */
export enum CloudinaryErrorType {
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  FILE_TOO_SMALL = 'FILE_TOO_SMALL',
  INVALID_DIMENSIONS = 'INVALID_DIMENSIONS',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Erro de upload Cloudinary
 */
export interface CloudinaryError {
  /** Tipo de erro */
  readonly type: CloudinaryErrorType;
  /** Mensagem de erro */
  readonly message: string;
  /** Detalhes adicionais */
  readonly details?: Record<string, unknown>;
}

