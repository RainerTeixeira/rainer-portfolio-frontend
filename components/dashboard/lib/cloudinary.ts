/**
 * Cloudinary Integration
 *
 * Serviço de upload e gerenciamento de imagens via Cloudinary.
 * Armazena apenas URLs no banco de dados.
 *
 * Configuração necessária em .env.local:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (unsigned preset)
 *
 * @fileoverview Integração com Cloudinary para upload de imagens
 * @author Rainer Teixeira
 * @version 1.0.0
 */

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
    quality?: 'auto' | 'best' | 'lossless' | number; // 'lossless' para compressão sem perdas
    fetch_format?: 'auto' | 'webp' | 'jpg' | 'png';
    lossless?: boolean; // Flag para compressão lossless (sem perdas)
  };
  tags?: readonly string[] | string[];
  context?: Record<string, string>;
}

/**
 * Configuração do Cloudinary
 */
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'blog_images';

/**
 * Valida se o Cloudinary está configurado
 */
export function isCloudinaryConfigured(): boolean {
  return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
}

/**
 * Upload de imagem para o Cloudinary
 *
 * Faz upload direto do client-side usando unsigned upload preset.
 * Retorna a URL segura (HTTPS) da imagem hospedada.
 *
 * @param file - Arquivo de imagem
 * @param options - Opções de upload e transformação
 * @param onProgress - Callback de progresso (0-100)
 * @returns URL da imagem no Cloudinary
 *
 * @example
 * const url = await uploadToCloudinary(file, {
 *   folder: 'blog/covers',
 *   transformation: { width: 1200, quality: 'auto', fetch_format: 'auto' }
 * })
 */
export async function uploadToCloudinary(
  file: File,
  options: CloudinaryUploadOptions = {},
  onProgress?: (progress: number) => void
): Promise<string> {
  // Validação
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary não configurado. Defina NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME e NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET no .env.local'
    );
  }

  // Validação do arquivo
  if (!file.type.startsWith('image/')) {
    throw new Error('Apenas arquivos de imagem são permitidos');
  }

  // Limite de tamanho (10MB para unsigned uploads)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Imagem deve ter no máximo 10MB');
  }

  // Prepara FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  // Adiciona folder
  if (options.folder) {
    formData.append('folder', options.folder);
  }

  // Adiciona tags
  if (options.tags && options.tags.length > 0) {
    formData.append('tags', options.tags.join(','));
  }

  // Adiciona context
  if (options.context) {
    const contextStr = Object.entries(options.context)
      .map(([key, value]) => `${key}=${value}`)
      .join('|');
    formData.append('context', contextStr);
  }

  // Adiciona transformação
  if (options.transformation) {
    const { width, height, crop, quality, fetch_format, lossless } =
      options.transformation;
    const transformations: string[] = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);

    // Qualidade: suporta 'lossless', 'best', 'auto' ou número
    if (quality) {
      if (quality === 'lossless') {
        // Compressão lossless: usar flag fl_lossless (sem q_)
        formData.append('flags', 'lossless');
        // Lossless não precisa de q_, apenas fl_lossless
      } else if (quality === 'best') {
        transformations.push('q_best');
      } else if (quality === 'auto') {
        transformations.push('q_auto');
      } else {
        transformations.push(`q_${quality}`);
      }
    }

    // Flag lossless explícita (sobrescreve quality se necessário)
    if (lossless) {
      formData.append('flags', 'lossless');
      // Remove q_ se já foi adicionado, pois lossless não precisa
      const qualityIndex = transformations.findIndex(t => t.startsWith('q_'));
      if (qualityIndex !== -1) {
        transformations.splice(qualityIndex, 1);
      }
    }

    if (fetch_format) {
      // Cloudinary usa fl_lossless para compressão lossless, não f_webp:lossless
      // Para WebP lossless, usar fl_lossless (já adicionado acima) e f_webp
      transformations.push(`f_${fetch_format}`);
    }

    if (transformations.length > 0) {
      formData.append('transformation', transformations.join(','));
    }
  }

  // URL do endpoint de upload
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  try {
    // Upload com XMLHttpRequest para tracking de progresso
    const response = await new Promise<CloudinaryUploadResponse>(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Progress tracking
        xhr.upload.addEventListener('progress', e => {
          if (e.lengthComputable && onProgress) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            onProgress(percentComplete);
          }
        });

        // Success
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch {
              reject(new Error('Erro ao processar resposta do Cloudinary'));
            }
          } else {
            try {
              const error = JSON.parse(xhr.responseText);
              reject(new Error(error.error?.message || 'Erro no upload'));
            } catch {
              reject(new Error(`Erro no upload: ${xhr.statusText}`));
            }
          }
        });

        // Error
        xhr.addEventListener('error', () => {
          reject(new Error('Erro de rede ao fazer upload'));
        });

        // Timeout
        xhr.addEventListener('timeout', () => {
          reject(new Error('Timeout no upload'));
        });

        // Envia requisição
        xhr.open('POST', uploadUrl);
        xhr.timeout = 60000; // 60 segundos
        xhr.send(formData);
      }
    );

    // Retorna URL segura
    return response.secure_url;
  } catch (error: unknown) {
    console.error('Erro ao fazer upload para Cloudinary:', error);
    throw error;
  }
}

/**
 * Gera URL de thumbnail do Cloudinary
 *
 * Cria uma versão redimensionada/otimizada de uma imagem já hospedada.
 *
 * @param imageUrl - URL da imagem no Cloudinary
 * @param options - Opções de transformação
 * @returns URL do thumbnail
 *
 * @example
 * const thumb = getCloudinaryThumbnail(originalUrl, {
 *   width: 400,
 *   height: 300,
 *   crop: 'fill',
 *   quality: 'auto'
 * })
 */
export function getCloudinaryThumbnail(
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'pad' | 'limit';
    quality?: 'auto' | 'best' | 'lossless' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    lossless?: boolean; // Flag para compressão lossless
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

  // Qualidade: suporta 'lossless', 'best', 'auto' ou número
  const useLossless = options.quality === 'lossless' || options.lossless;

  if (options.quality) {
    if (options.quality === 'lossless') {
      flags.push('lossless');
      // Lossless não precisa de q_, apenas fl_lossless
    } else if (options.quality === 'best') {
      transformations.push('q_best');
    } else if (options.quality === 'auto') {
      transformations.push('q_auto');
    } else {
      transformations.push(`q_${options.quality}`);
    }
  }

  // Flag lossless explícita
  if (options.lossless && !flags.includes('lossless')) {
    flags.push('lossless');
    // Remove q_ se já foi adicionado, pois lossless não precisa
    const qualityIndex = transformations.findIndex(t => t.startsWith('q_'));
    if (qualityIndex !== -1) {
      transformations.splice(qualityIndex, 1);
    }
  }

  if (options.format) {
    // Cloudinary usa fl_lossless para compressão lossless, não f_webp:lossless
    if (useLossless && options.format === 'webp') {
      // Para WebP lossless, usar fl_lossless (já adicionado acima) e f_webp
      transformations.push('f_webp');
    } else {
      transformations.push(`f_${options.format}`);
    }
  }

  // Se não houver transformações, retorna original
  if (transformations.length === 0 && flags.length === 0) return imageUrl;

  // Constrói URL com transformações e flags
  let transformStr = transformations.join(',');
  if (flags.length > 0) {
    transformStr = `fl_${flags.join(',')}/${transformStr}`;
  }

  // Substitui na URL
  return imageUrl.replace(/\/upload\//, `/upload/${transformStr}/`);
}

/**
 * Deleta imagem do Cloudinary
 *
 * NOTA: Requer backend com credenciais do Cloudinary,
 * pois unsigned presets não permitem deleção.
 *
 * @param publicId - Public ID da imagem
 * @returns Promise resolvida quando deletado
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // Esta função requer um endpoint no backend
  // pois deleção necessita de autenticação com API Secret

  const response = await fetch('/api/cloudinary/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao deletar imagem');
  }
}

/**
 * Extrai public_id de uma URL do Cloudinary
 *
 * @param url - URL da imagem no Cloudinary
 * @returns Public ID ou null
 *
 * @example
 * const publicId = extractPublicId('https://res.cloudinary.com/.../v123/blog/image.jpg')
 * // => 'blog/image'
 */
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  return match ? (match[1] ?? null) : null;
}

/**
 * Verifica se uma URL é do Cloudinary
 *
 * @param url - URL a verificar
 * @returns true se for URL do Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return (
    url.includes('res.cloudinary.com') || url.includes('cloudinary.com/image')
  );
}

/**
 * Opções padrão para diferentes tipos de imagem
 *
 * Presets com compressão lossless para WebP animado e imagens de alta qualidade
 */
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
  // Preset para WebP animado com compressão lossless (sem perdas)
  webpAnimated: {
    folder: 'blog/animated',
    transformation: {
      quality: 'lossless' as const,
      fetch_format: 'webp' as const,
      lossless: true,
    },
    tags: ['blog', 'animated', 'webp', 'lossless'],
  },
  // Preset para imagens estáticas com compressão lossless
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
  // Avatar com compressão lossless para alta qualidade
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
 * Helper: Upload de imagem de capa de blog
 */
export async function uploadBlogCover(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.blogCover, onProgress);
}

/**
 * Helper: Upload de imagem para conteúdo de blog
 */
export async function uploadBlogContentImage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.blogContent, onProgress);
}

/**
 * Helper: Upload de avatar
 */
export async function uploadAvatar(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.avatar, onProgress);
}

/**
 * Helper: Upload de WebP animado com compressão lossless
 *
 * Usa compressão lossless para preservar qualidade máxima sem perdas
 *
 * @param file - Arquivo de imagem (WebP animado ou GIF)
 * @param onProgress - Callback de progresso (0-100)
 * @returns URL da imagem no Cloudinary
 */
export async function uploadWebPAnimatedLossless(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.webpAnimated, onProgress);
}

/**
 * Helper: Upload de imagem com compressão lossless
 *
 * Usa compressão lossless para preservar qualidade máxima sem perdas
 *
 * @param file - Arquivo de imagem
 * @param onProgress - Callback de progresso (0-100)
 * @returns URL da imagem no Cloudinary
 */
export async function uploadLossless(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadToCloudinary(file, CLOUDINARY_PRESETS.webpLossless, onProgress);
}

