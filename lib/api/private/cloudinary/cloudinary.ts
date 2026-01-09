/**
 * @fileoverview Serviços Privados de Cloudinary
 * 
 * Contém funções para comunicação com endpoints privados de upload
 * de imagens (integração com Cloudinary).
 * Requer autenticação.
 * 
 * @module lib/api/private/cloudinary/cloudinary
 */

import { privateClient } from '../../clients/private-client';
import {
  UploadImageDto,
  UploadResponse,
  ImageValidation,
  TransformOptions,
  TransformResponse,
  DeleteImageResponse,
  ImageMetadata,
} from '../../types/private/cloudinary';

// Interfaces exportadas para compatibilidade com dashboard
export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  url: string;
  thumbnail_url?: string;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  transformation?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'pad' | 'limit';
    quality?: 'auto' | 'best' | 'lossless' | number;
    fetch_format?: 'auto' | 'webp' | 'jpg' | 'png';
    lossless?: boolean;
  };
  tags?: readonly string[] | string[];
  context?: Record<string, string>;
}

// Presets para diferentes tipos de imagem
export const CLOUDINARY_PRESETS = {
  blogCover: {
    folder: 'blog/covers',
    transformation: {
      width: 1200,
      height: 630,
      crop: 'fill' as const,
      quality: 'auto' as const,
      fetch_format: 'auto' as const,
    },
    tags: ['blog', 'cover'],
  },
  blogContent: {
    folder: 'blog/content',
    transformation: {
      width: 1200,
      quality: 'auto' as const,
      fetch_format: 'auto' as const,
    },
    tags: ['blog', 'content'],
  },
  webpAnimated: {
    folder: 'blog/animated',
    transformation: {
      quality: 'lossless' as const,
      fetch_format: 'webp' as const,
      lossless: true,
    },
    tags: ['blog', 'animated', 'webp', 'lossless'],
  },
  webpLossless: {
    folder: 'blog/lossless',
    transformation: {
      quality: 'lossless' as const,
      fetch_format: 'webp' as const,
      lossless: true,
    },
    tags: ['blog', 'lossless', 'webp'],
  },
  avatar: {
    folder: 'avatars',
    transformation: {
      width: 400,
      height: 400,
      crop: 'fill' as const,
      quality: 'auto' as const,
      fetch_format: 'auto' as const,
    },
    tags: ['avatar'],
  },
  avatarLossless: {
    folder: 'avatars',
    transformation: {
      width: 400,
      height: 400,
      crop: 'fill' as const,
      quality: 'lossless' as const,
      fetch_format: 'webp' as const,
      lossless: true,
    },
    tags: ['avatar', 'lossless'],
  },
  thumbnail: {
    folder: 'thumbnails',
    transformation: {
      width: 600,
      height: 400,
      crop: 'fill' as const,
      quality: 'auto' as const,
      fetch_format: 'auto' as const,
    },
    tags: ['thumbnail'],
  },
} as const;

/**
 * Faz upload de imagem para o blog
 * 
 * @param file - Arquivo de imagem a ser enviado
 * @param options - Opções de upload (opcional)
 * @returns Promise<UploadResponse> - Dados da imagem enviada
 * 
 * @example
 * ```typescript
 * const result = await uploadBlogImage(file, {
 *   folder: 'blog/posts',
 *   filename: 'my-image'
 * });
 * console.log(result.data.url);
 * ```
 */
export const uploadBlogImage = async (
  file: File,
  options?: { folder?: string; filename?: string }
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  if (options?.folder) {
    formData.append('folder', options.folder);
  }
  
  if (options?.filename) {
    formData.append('filename', options.filename);
  }

  const response = await privateClient.post('/cloudinary/upload/blog-image', formData);
  
  return response.data;
};

/**
 * Faz upload de avatar de usuário
 * 
 * @param file - Arquivo de imagem a ser enviado
 * @param options - Opções de upload (opcional)
 * @returns Promise<UploadResponse> - Dados da imagem enviada
 * 
 * @example
 * ```typescript
 * const result = await uploadAvatar(file);
 * console.log(result.data.secureUrl);
 * ```
 */
export const uploadAvatar = async (
  file: File,
  options?: { folder?: string; filename?: string }
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  if (options?.folder) {
    formData.append('folder', options.folder);
  }
  
  if (options?.filename) {
    formData.append('filename', options.filename);
  }

  const response = await privateClient.post('/cloudinary/upload/avatar', formData);
  
  return response.data;
};

/**
 * Valida um arquivo de imagem antes do upload
 * 
 * @param file - Arquivo a ser validado
 * @param type - Tipo de upload (blog-image ou avatar)
 * @returns Promise<ImageValidation> - Resultado da validação
 * 
 * @example
 * ```typescript
 * const validation = await validateImage(file, 'blog-image');
 * if (!validation.valid) {
 *   console.error(validation.error);
 * }
 * ```
 */
export const validateImage = async (
  file: File,
  type: 'blog-image' | 'avatar'
): Promise<ImageValidation> => {
  // Validação básica no frontend
  const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const maxSizeBytes = type === 'avatar' ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB avatar, 5MB blog
  
  const format = file.name.split('.').pop()?.toLowerCase();
  
  if (!format || !acceptedFormats.includes(format)) {
    return {
      valid: false,
      error: `Formato não aceito. Formatos aceitos: ${acceptedFormats.join(', ')}`,
      acceptedFormats,
      maxSizeBytes,
    };
  }
  
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${maxSizeBytes / (1024 * 1024)}MB`,
      acceptedFormats,
      maxSizeBytes,
    };
  }
  
  return {
    valid: true,
    acceptedFormats,
    maxSizeBytes,
  };
};

/**
 * Transforma uma imagem (crop, resize, etc.)
 * 
 * @param publicId - ID público da imagem
 * @param options - Opções de transformação
 * @returns Promise<TransformResponse> - URL transformada
 * 
 * @example
 * ```typescript
 * const transformed = await transformImage('blog/image1', {
 *   width: 800,
 *   height: 600,
 *   crop: 'fill',
 *   quality: 80
 * });
 * ```
 */
export const transformImage = async (
  publicId: string,
  options: TransformOptions
): Promise<TransformResponse> => {
  const response = await privateClient.post('/cloudinary/transform', {
    publicId,
    ...options,
  });
  
  return response.data;
};

/**
 * Remove uma imagem do Cloudinary
 * 
 * @param publicId - ID público da imagem
 * @returns Promise<DeleteImageResponse> - Confirmação da remoção
 * 
 * @example
 * ```typescript
 * const result = await deleteImage('blog/image1');
 * if (result.deleted) {
 *   console.log('Imagem removida');
 * }
 * ```
 */
export const deleteImage = async (publicId: string): Promise<DeleteImageResponse> => {
  const response = await privateClient.delete(`/cloudinary/image/${publicId}`);
  
  return response.data;
};

/**
 * Obtém metadados de uma imagem
 * 
 * @param publicId - ID público da imagem
 * @returns Promise<ImageMetadata> - Metadados da imagem
 * 
 * @example
 * ```typescript
 * const metadata = await getImageMetadata('blog/image1');
 * console.log(`Dimensões: ${metadata.dimensions.width}x${metadata.dimensions.height}`);
 * ```
 */
export const getImageMetadata = async (publicId: string): Promise<ImageMetadata> => {
  const response = await privateClient.get('/cloudinary/metadata', {
    params: { publicId },
  });
  
  return response.data;
};

// Funções utilitárias do dashboard consolidadas

/**
 * Upload de imagem para o Cloudinary (função unificada)
 *
 * Faz upload via backend com opções avançadas.
 *
 * @param file - Arquivo de imagem
 * @param options - Opções de upload e transformação
 * @param onProgress - Callback de progresso (0-100)
 * @returns URL da imagem no Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  options: CloudinaryUploadOptions = {},
  onProgress?: (progress: number) => void
): Promise<string> {
  // Validação do arquivo
  if (!file.type.startsWith('image/')) {
    throw new Error('Apenas arquivos de imagem são permitidos');
  }

  // Limite de tamanho (10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Imagem deve ter no máximo 10MB');
  }

  // Faz upload via backend
  const response = await uploadBlogImage(file, { folder: options.folder });
  return response.data.secureUrl;
}

/**
 * Gera URL de thumbnail do Cloudinary
 *
 * Cria uma versão redimensionada/otimizada de uma imagem já hospedada.
 *
 * @param imageUrl - URL da imagem no Cloudinary
 * @param options - Opções de transformação
 * @returns URL do thumbnail
 */
export function getCloudinaryThumbnail(
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'pad' | 'limit';
    quality?: 'auto' | 'best' | 'lossless' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    lossless?: boolean;
  } = {}
): string {
  // Se não for URL do Cloudinary, retorna original
  if (!imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }

  // Extrai public_id da URL
  const match = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
  if (!match) return imageUrl;

  // Constrói transformações
  const transformations: string[] = [];
  const flags: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);

  const useLossless = options.quality === 'lossless' || options.lossless;

  if (options.quality) {
    if (options.quality === 'lossless') {
      flags.push('lossless');
    } else if (options.quality === 'best') {
      transformations.push('q_best');
    } else if (options.quality === 'auto') {
      transformations.push('q_auto');
    } else {
      transformations.push(`q_${options.quality}`);
    }
  }

  if (options.lossless && !flags.includes('lossless')) {
    flags.push('lossless');
    const qualityIndex = transformations.findIndex(t => t.startsWith('q_'));
    if (qualityIndex !== -1) {
      transformations.splice(qualityIndex, 1);
    }
  }

  if (options.format) {
    if (useLossless && options.format === 'webp') {
      transformations.push('f_webp');
    } else {
      transformations.push(`f_${options.format}`);
    }
  }

  if (transformations.length === 0 && flags.length === 0) return imageUrl;

  let transformStr = transformations.join(',');
  if (flags.length > 0) {
    transformStr = `fl_${flags.join(',')}/${transformStr}`;
  }

  return imageUrl.replace(/\/upload\//, `/upload/${transformStr}/`);
}

/**
 * Extrai public_id de uma URL do Cloudinary
 */
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  return match ? (match[1] ?? null) : null;
}

/**
 * Verifica se uma URL é do Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return (
    url.includes('res.cloudinary.com') || url.includes('cloudinary.com/image')
  );
}

// Helper functions para tipos específicos de upload
export async function uploadBlogCover(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.blogCover, onProgress);
}

export async function uploadBlogContentImage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.blogContent, onProgress);
}

export async function uploadWebPAnimatedLossless(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.webpAnimated, onProgress);
}

export async function uploadLossless(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.webpLossless, onProgress);
}
