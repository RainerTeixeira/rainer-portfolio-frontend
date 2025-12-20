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
