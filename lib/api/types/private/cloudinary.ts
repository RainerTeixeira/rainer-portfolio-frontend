/**
 * @fileoverview Tipos para APIs Privadas de Cloudinary
 * 
 * Define os tipos TypeScript utilizados para comunicação com os endpoints
 * privados de upload de imagens (Cloudinary integration).
 * 
 * @module lib/api/types/private/cloudinary
 */

/**
 * Interface para upload de imagem
 */
export interface UploadImageDto {
  /** Arquivo de imagem */
  file: File;
  /** Tipo de upload */
  type: 'blog-image' | 'avatar';
  /** Pasta de destino (opcional) */
  folder?: string;
  /** Nome do arquivo (opcional) */
  filename?: string;
}

/**
 * Interface para resposta de upload
 */
export interface UploadResponse {
  /** Mensagem de sucesso */
  message: string;
  /** Dados da imagem */
  data: {
    /** URL pública da imagem */
    url: string;
    /** URL segura (HTTPS) */
    secureUrl: string;
    /** ID público do recurso */
    publicId: string;
    /** Formato da imagem */
    format: string;
    /** Largura original */
    width: number;
    /** Altura original */
    height: number;
    /** Tamanho em bytes */
    size: number;
    /** URL da thumbnail */
    thumbnailUrl?: string;
  };
}

/**
 * Interface para validação de imagem
 */
export interface ImageValidation {
  /** Arquivo válido */
  valid: boolean;
  /** Erro de validação */
  error?: string;
  /** Formatos aceitos */
  acceptedFormats: string[];
  /** Tamanho máximo em bytes */
  maxSizeBytes: number;
}

/**
 * Interface para opções de transformação
 */
export interface TransformOptions {
  /** Largura desejada */
  width?: number;
  /** Altura desejada */
  height?: number;
  /** Qualidade (1-100) */
  quality?: number;
  /** Crop */
  crop?: 'fill' | 'fit' | 'crop' | 'scale';
  /** Gravidade do crop */
  gravity?: 'auto' | 'center' | 'face' | 'north' | 'south' | 'east' | 'west';
}

/**
 * Interface para resposta de transformação
 */
export interface TransformResponse {
  /** URL transformada */
  url: string;
  /** Dimensões */
  dimensions: {
    width: number;
    height: number;
  };
  /** Tamanho em bytes */
  size: number;
}

/**
 * Interface para deletar imagem
 */
export interface DeleteImageResponse {
  /** Mensagem de sucesso */
  message: string;
  /** ID público deletado */
  publicId: string;
  /** Status da operação */
  deleted: boolean;
}

/**
 * Interface para metadados da imagem
 */
export interface ImageMetadata {
  /** ID público */
  publicId: string;
  /** URL */
  url: string;
  /** Formato */
  format: string;
  /** Dimensões */
  dimensions: {
    width: number;
    height: number;
  };
  /** Tamanho */
  size: number;
  /** Data de upload */
  createdAt: string;
  /** Tags */
  tags?: string[];
}
