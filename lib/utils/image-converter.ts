/**
 * Image Converter Utility
 *
 * Utilitário para conversão de imagens no navegador (client-side).
 * Converte qualquer formato de imagem para WebP usando Canvas API.
 *
 * @fileoverview Conversão client-side de imagens para WebP
 * @author Rainer Teixeira
 * @version 1.0.0
 *
 * @example
 * ```typescript
 * import { convertToWebP, prepareImageForUpload } from '@/lib/utils/image-converter';
 *
 * // Conversão simples
 * const webpFile = await convertToWebP(originalFile);
 *
 * // Preparar para upload (converte apenas se necessário)
 * const readyFile = await prepareImageForUpload(originalFile);
 * ```
 */

/**
 * Formatos de imagem aceitos diretamente pelo Cloudinary sem conversão
 */
const CLOUDINARY_ACCEPTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

/**
 * Qualidade padrão para conversão WebP (0-1)
 * 0.85 oferece boa qualidade com tamanho reduzido
 */
const DEFAULT_WEBP_QUALITY = 0.85;

/**
 * Tamanho máximo de avatar em pixels (largura ou altura)
 */
const MAX_AVATAR_SIZE = 512;

/**
 * Verifica se o formato da imagem é aceito pelo Cloudinary
 * @param mimeType - Tipo MIME da imagem (ex: 'image/jpeg')
 * @returns true se o formato é aceito
 */
export function isAcceptedFormat(mimeType: string): boolean {
  return CLOUDINARY_ACCEPTED_FORMATS.includes(mimeType);
}

/**
 * Verifica se a imagem já está em WebP
 * @param mimeType - Tipo MIME da imagem
 * @returns true se já é WebP
 */
export function isWebP(mimeType: string): boolean {
  return mimeType === 'image/webp';
}

/**
 * Carrega uma imagem a partir de um File e retorna um HTMLImageElement
 * @param file - Arquivo de imagem
 * @returns Promise com o elemento de imagem carregado
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Não foi possível carregar a imagem'));
    };

    img.src = url;
  });
}

/**
 * Calcula as dimensões para redimensionar a imagem mantendo a proporção
 * @param width - Largura original
 * @param height - Altura original
 * @param maxSize - Tamanho máximo permitido
 * @returns Novas dimensões { width, height }
 */
function calculateResizedDimensions(
  width: number,
  height: number,
  maxSize: number
): { width: number; height: number } {
  if (width <= maxSize && height <= maxSize) {
    return { width, height };
  }

  const ratio = Math.min(maxSize / width, maxSize / height);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

/**
 * Converte uma imagem para WebP usando Canvas API
 *
 * @param file - Arquivo de imagem original (qualquer formato suportado pelo navegador)
 * @param options - Opções de conversão
 * @param options.quality - Qualidade WebP (0-1), padrão 0.85
 * @param options.maxSize - Tamanho máximo em pixels (redimensiona se maior)
 * @param options.fileName - Nome do arquivo de saída (sem extensão)
 * @returns Promise com o arquivo WebP convertido
 *
 * @example
 * ```typescript
 * const webpFile = await convertToWebP(originalFile, {
 *   quality: 0.9,
 *   maxSize: 512,
 *   fileName: 'avatar'
 * });
 * ```
 */
export async function convertToWebP(
  file: File,
  options: {
    quality?: number;
    maxSize?: number;
    fileName?: string;
  } = {}
): Promise<File> {
  const {
    quality = DEFAULT_WEBP_QUALITY,
    maxSize = MAX_AVATAR_SIZE,
    fileName,
  } = options;

  // Carrega a imagem
  const img = await loadImage(file);

  // Calcula dimensões finais
  const { width, height } = calculateResizedDimensions(
    img.width,
    img.height,
    maxSize
  );

  // Cria canvas e desenha a imagem redimensionada
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Não foi possível criar contexto de canvas');
  }

  // Desenha a imagem no canvas
  ctx.drawImage(img, 0, 0, width, height);

  // Converte para WebP
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Falha ao converter imagem para WebP'));
          return;
        }

        // Gera nome do arquivo
        const baseName = fileName || file.name.replace(/\.[^.]+$/, '');
        const webpFileName = `${baseName}.webp`;

        // Cria novo File a partir do Blob
        const webpFile = new File([blob], webpFileName, {
          type: 'image/webp',
          lastModified: Date.now(),
        });

        resolve(webpFile);
      },
      'image/webp',
      quality
    );
  });
}

/**
 * Prepara uma imagem para upload, convertendo para WebP se necessário
 *
 * Esta função:
 * 1. Verifica se o formato é aceito pelo Cloudinary
 * 2. Se não for aceito, converte para WebP
 * 3. Se já for aceito mas não for WebP, converte para WebP (otimização)
 * 4. Se já for WebP, retorna o arquivo original
 *
 * @param file - Arquivo de imagem original
 * @param options - Opções de conversão
 * @param options.forceWebP - Força conversão para WebP mesmo se já for formato aceito (padrão: true)
 * @param options.quality - Qualidade WebP (0-1), padrão 0.85
 * @param options.maxSize - Tamanho máximo em pixels
 * @param options.fileName - Nome do arquivo de saída
 * @returns Promise com o arquivo pronto para upload (sempre WebP se forceWebP=true)
 *
 * @example
 * ```typescript
 * // Sempre converte para WebP
 * const readyFile = await prepareImageForUpload(originalFile);
 *
 * // Mantém formatos aceitos, só converte formatos não suportados
 * const readyFile = await prepareImageForUpload(originalFile, { forceWebP: false });
 * ```
 */
export async function prepareImageForUpload(
  file: File,
  options: {
    forceWebP?: boolean;
    quality?: number;
    maxSize?: number;
    fileName?: string;
  } = {}
): Promise<File> {
  const { forceWebP = true, ...convertOptions } = options;

  // Se já é WebP, apenas redimensiona se necessário
  if (isWebP(file.type)) {
    // Se não precisa redimensionar, retorna o original
    if (!convertOptions.maxSize) {
      return file;
    }

    // Carrega para verificar dimensões
    const img = await loadImage(file);
    const { width, height } = calculateResizedDimensions(
      img.width,
      img.height,
      convertOptions.maxSize
    );

    // Se não precisa redimensionar, retorna o original
    if (width === img.width && height === img.height) {
      return file;
    }

    // Precisa redimensionar - converte
    return convertToWebP(file, convertOptions);
  }

  // Se forceWebP=true, sempre converte
  if (forceWebP) {
    return convertToWebP(file, convertOptions);
  }

  // Se o formato é aceito e não forçamos WebP, apenas redimensiona se necessário
  if (isAcceptedFormat(file.type)) {
    // Para formatos aceitos sem forceWebP, retorna original
    // (o Cloudinary pode otimizar no servidor)
    return file;
  }

  // Formato não aceito - deve converter
  return convertToWebP(file, convertOptions);
}

/**
 * Prepara uma imagem de avatar para upload
 *
 * Wrapper conveniente para `prepareImageForUpload` com configurações
 * otimizadas para avatares:
 * - Sempre converte para WebP
 * - Limita tamanho a 512x512 pixels
 * - Qualidade 0.85
 *
 * @param file - Arquivo de imagem do avatar
 * @param fileName - Nome opcional para o arquivo (sem extensão)
 * @returns Promise com o arquivo WebP pronto para upload
 *
 * @example
 * ```typescript
 * const avatarFile = await prepareAvatarForUpload(originalFile, 'user-avatar');
 * await cloudinaryService.uploadAvatar(avatarFile);
 * ```
 */
export async function prepareAvatarForUpload(
  file: File,
  fileName?: string
): Promise<File> {
  return prepareImageForUpload(file, {
    forceWebP: true,
    quality: DEFAULT_WEBP_QUALITY,
    maxSize: MAX_AVATAR_SIZE,
    fileName,
  });
}

/**
 * Verifica se o navegador suporta conversão para WebP
 * @returns true se o navegador suporta WebP
 */
export function supportsWebP(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}

/**
 * Obtém informações sobre um arquivo de imagem
 * @param file - Arquivo de imagem
 * @returns Promise com informações da imagem
 */
export async function getImageInfo(file: File): Promise<{
  width: number;
  height: number;
  size: number;
  type: string;
  name: string;
  isWebP: boolean;
  isAccepted: boolean;
}> {
  const img = await loadImage(file);

  return {
    width: img.width,
    height: img.height,
    size: file.size,
    type: file.type,
    name: file.name,
    isWebP: isWebP(file.type),
    isAccepted: isAcceptedFormat(file.type),
  };
}
