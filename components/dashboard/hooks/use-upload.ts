/**
 * Upload Hook
 *
 * Hook que gerencia upload de imagens para o Cloudinary, incluindo validação,
 * progress tracking, preview e tratamento de erros. Suporta múltiplos tipos
 * de upload (cover, content, general) com otimização automática.
 *
 * @module components/dashboard/hooks/use-upload
 * @fileoverview Hook para upload de imagens via Cloudinary
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import {
  uploadBlogContentImage,
  uploadBlogCover,
  uploadToCloudinary,
} from '@/components/dashboard/lib/cloudinary';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

/**
 * Estado do processo de upload
 *
 * @interface UploadState
 * @property {boolean} isUploading - Indica se há upload em andamento
 * @property {number} progress - Progresso do upload (0-100)
 * @property {string | null} error - Mensagem de erro (null se sem erro)
 * @property {string | null} uploadedUrl - URL da imagem no Cloudinary (null antes do upload)
 */
export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  uploadedUrl: string | null;
}

/**
 * Hook useUpload
 *
 * Hook principal para gerenciamento de upload de imagens para o Cloudinary.
 * Realiza validações, tracking de progresso e retorna a URL da imagem hospedada.
 *
 * Fluxo de Operação:
 * 1. Validação de arquivo (tipo e tamanho)
 * 2. Início do upload com estado de loading
 * 3. Upload para Cloudinary com callbacks de progresso
 * 4. Otimização automática (qualidade, formato, dimensões)
 * 5. Retorno da URL otimizada
 *
 * @param {('cover' | 'content' | 'general')} [type='general'] - Tipo de upload
 *
 * @returns {Object} Estado e funções de upload
 * @returns {boolean} isUploading - Se está fazendo upload no momento
 * @returns {number} progress - Progresso do upload (0-100)
 * @returns {string | null} error - Mensagem de erro se houver
 * @returns {string | null} uploadedUrl - URL final da imagem no Cloudinary
 * @returns {Function} upload - Função para fazer upload de arquivo
 * @returns {Function} uploadWithPreview - Upload com preview local
 * @returns {Function} reset - Reseta o estado do upload
 *
 * @example
 * // Upload simples de imagem
 * import { useUpload } from '@/components/dashboard/hooks'
 *
 * function ImageUploader() {
 *   const { upload, isUploading, progress, uploadedUrl } = useUpload('cover')
 *
 *   const handleFile = async (file: File) => {
 *     const url = await upload(file)
 *     if (url) {
 *       console.log('Imagem enviada:', url)
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       <input type="file" onChange={(e) => handleFile(e.target.files[0])} />
 *       {isUploading && <ProgressBar value={progress} />}
 *       {uploadedUrl && <img src={uploadedUrl} />}
 *     </div>
 *   )
 * }
 *
 * @example
 * // Upload com preview e diferentes tipos
 * function BlogCoverUploader() {
 *   const { uploadWithPreview, isUploading } = useUpload('cover')
 *   const [preview, setPreview] = useState<string | null>(null)
 *
 *   const handleUpload = async (file: File) => {
 *     const { url, previewUrl } = await uploadWithPreview(file)
 *     setPreview(previewUrl) // Preview imediato
 *     // url contém a URL do Cloudinary
 *   }
 *
 *   return (
 *     <div>
 *       <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
 *       {preview && <img src={preview} alt="Preview" />}
 *     </div>
 *   )
 * }
 *
 * @see {@link useBlogCoverUpload} - Hook específico para capas
 * @see {@link useBlogContentUpload} - Hook específico para conteúdo
 * @see {@link useImageCompression} - Hook para compressão
 */
export function useUpload(type: 'cover' | 'content' | 'general' = 'general') {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    uploadedUrl: null,
  });

  /**
   * Faz upload de arquivo para Cloudinary
   */
  const upload = useCallback(
    async (file: File): Promise<string | null> => {
      // Validações
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Arquivo deve ter no máximo 10MB');
        return null;
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Apenas imagens são permitidas (JPEG, PNG, WebP, GIF)');
        return null;
      }

      setState({
        isUploading: true,
        progress: 0,
        error: null,
        uploadedUrl: null,
      });

      try {
        // Escolhe função de upload baseada no tipo
        let url: string;

        if (type === 'cover') {
          url = await uploadBlogCover(file, progress => {
            setState(prev => ({ ...prev, progress }));
          });
        } else if (type === 'content') {
          url = await uploadBlogContentImage(file, progress => {
            setState(prev => ({ ...prev, progress }));
          });
        } else {
          url = await uploadToCloudinary(
            file,
            {
              folder: 'blog/general',
              transformation: {
                width: 1200,
                quality: 'auto',
                fetch_format: 'auto',
              },
            },
            progress => {
              setState(prev => ({ ...prev, progress }));
            }
          );
        }

        setState({
          isUploading: false,
          progress: 100,
          error: null,
          uploadedUrl: url,
        });

        toast.success('Imagem enviada para Cloudinary!');
        return url;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro ao fazer upload';
        toast.error(errorMessage);
        setState({
          isUploading: false,
          progress: 0,
          error: errorMessage,
          uploadedUrl: null,
        });
        return null;
      }
    },
    [type]
  );

  /**
   * Reseta estado
   */
  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      error: null,
      uploadedUrl: null,
    });
  }, []);

  /**
   * Upload com preview local (antes de enviar)
   */
  const uploadWithPreview = useCallback(
    async (
      file: File
    ): Promise<{
      url: string | null;
      previewUrl: string;
    }> => {
      // Cria preview local
      const previewUrl = URL.createObjectURL(file);

      // Faz upload para Cloudinary
      const url = await upload(file);

      return { url, previewUrl };
    },
    [upload]
  );

  return {
    ...state,
    upload,
    uploadWithPreview,
    reset,
  };
}

/**
 * Hook useBlogCoverUpload
 *
 * Variante especializada do useUpload otimizada para imagens de capa de posts.
 * Aplica transformações específicas para banners (dimensões e qualidade).
 *
 * @returns {ReturnType<typeof useUpload>} Mesmas propriedades do useUpload
 *
 * @example
 * import { useBlogCoverUpload } from '@/components/dashboard/hooks'
 *
 * function CoverImageUpload() {
 *   const { upload, isUploading, uploadedUrl } = useBlogCoverUpload()
 *
 *   return (
 *     <input type="file" onChange={(e) => upload(e.target.files[0])} />
 *   )
 * }
 */
export function useBlogCoverUpload() {
  return useUpload('cover');
}

/**
 * Hook useBlogContentUpload
 *
 * Variante especializada do useUpload otimizada para imagens de conteúdo de posts.
 * Aplica transformações adequadas para imagens inline em artigos.
 *
 * @returns {ReturnType<typeof useUpload>} Mesmas propriedades do useUpload
 *
 * @example
 * import { useBlogContentUpload } from '@/components/dashboard/hooks'
 *
 * function ArticleImageUpload() {
 *   const { upload } = useBlogContentUpload()
 *
 *   const insertImage = async (file: File) => {
 *     const url = await upload(file)
 *     // Insere URL no editor de texto
 *   }
 *
 *   return <input type="file" onChange={(e) => insertImage(e.target.files[0])} />
 * }
 */
export function useBlogContentUpload() {
  return useUpload('content');
}

/**
 * Hook useImageCompression
 *
 * Comprime imagens no lado do cliente antes do upload para economizar banda
 * e acelerar o processo. Mantém aspect ratio e permite controle de qualidade.
 *
 * Funcionalidades:
 * - Redimensiona imagens grandes mantendo proporções
 * - Comprime com qualidade ajustável (0-1)
 * - Processa no navegador (sem servidor)
 * - Retorna novo File pronto para upload
 *
 * @returns {Object} Objeto com função de compressão
 * @returns {Function} compress - Função que comprime a imagem
 *
 * @example
 * // Comprimir antes de fazer upload
 * import { useImageCompression, useUpload } from '@/components/dashboard/hooks'
 *
 * function OptimizedUploader() {
 *   const { compress } = useImageCompression()
 *   const { upload } = useUpload()
 *
 *   const handleFile = async (file: File) => {
 *     // Comprime para max 1920x1080 com qualidade 90%
 *     const compressed = await compress(file, 1920, 1080, 0.9)
 *
 *     // Faz upload da imagem comprimida
 *     const url = await upload(compressed)
 *   }
 *
 *   return <input type="file" onChange={(e) => handleFile(e.target.files[0])} />
 * }
 *
 * @example
 * // Compressão customizada
 * function CustomCompression() {
 *   const { compress } = useImageCompression()
 *
 *   const compressForThumbnail = async (file: File) => {
 *     // Thumbnail pequeno (600x400, qualidade 80%)
 *     return await compress(file, 600, 400, 0.8)
 *   }
 *
 *   return <input type="file" onChange={(e) => compressForThumbnail(e.target.files[0])} />
 * }
 */
export function useImageCompression() {
  const compress = useCallback(
    async (
      file: File,
      maxWidth: number = 1920,
      maxHeight: number = 1080,
      quality: number = 0.9
    ): Promise<File> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = e => {
          const img = new Image();

          img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            // Calcula dimensões mantendo aspect ratio
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Erro ao criar canvas'));
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              blob => {
                if (!blob) {
                  reject(new Error('Erro ao comprimir imagem'));
                  return;
                }

                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });

                resolve(compressedFile);
              },
              file.type,
              quality
            );
          };

          img.onerror = () => reject(new Error('Erro ao carregar imagem'));
          img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
        reader.readAsDataURL(file);
      });
    },
    []
  );

  return { compress };
}
