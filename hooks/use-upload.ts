/**
 * Hook de Upload de Imagens
 * 
 * Gerencia upload de imagens com progress e preview.
 * Usa Cloudinary como servidor de imagens.
 * 
 * @fileoverview Hook para upload de arquivos via Cloudinary
 * @author Rainer Teixeira
 * @version 2.0.0
 */

"use client"

import { useState, useCallback } from 'react'
import { uploadToCloudinary, uploadBlogCover, uploadBlogContentImage } from '@/lib/cloudinary'
import { toast } from 'sonner'

export interface UploadState {
  isUploading: boolean
  progress: number
  error: string | null
  uploadedUrl: string | null
}

/**
 * Hook para upload de imagens via Cloudinary
 * 
 * @param type - Tipo de imagem (cover, content, avatar)
 * @returns Funções e estado de upload
 */
export function useUpload(type: 'cover' | 'content' | 'general' = 'general') {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    uploadedUrl: null,
  })

  /**
   * Faz upload de arquivo para Cloudinary
   */
  const upload = useCallback(async (file: File): Promise<string | null> => {
    // Validações
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Arquivo deve ter no máximo 10MB')
      return null
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Apenas imagens são permitidas (JPEG, PNG, WebP, GIF)')
      return null
    }

    setState({
      isUploading: true,
      progress: 0,
      error: null,
      uploadedUrl: null,
    })

    try {
      // Escolhe função de upload baseada no tipo
      let url: string
      
      if (type === 'cover') {
        url = await uploadBlogCover(file, (progress) => {
          setState(prev => ({ ...prev, progress }))
        })
      } else if (type === 'content') {
        url = await uploadBlogContentImage(file, (progress) => {
          setState(prev => ({ ...prev, progress }))
        })
      } else {
        url = await uploadToCloudinary(file, {
          folder: 'blog/general',
          transformation: {
            width: 1200,
            quality: 'auto',
            fetch_format: 'auto'
          }
        }, (progress) => {
          setState(prev => ({ ...prev, progress }))
        })
      }

      setState({
        isUploading: false,
        progress: 100,
        error: null,
        uploadedUrl: url,
      })

      toast.success('Imagem enviada para Cloudinary!')
      return url
    } catch (error: any) {
      setState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Erro no upload',
        uploadedUrl: null,
      })

      toast.error(error.message || 'Erro ao enviar imagem')
      return null
    }
  }, [type])

  /**
   * Reseta estado
   */
  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      error: null,
      uploadedUrl: null,
    })
  }, [])

  /**
   * Upload com preview local (antes de enviar)
   */
  const uploadWithPreview = useCallback(async (file: File): Promise<{
    url: string | null
    previewUrl: string
  }> => {
    // Cria preview local
    const previewUrl = URL.createObjectURL(file)
    
    // Faz upload para Cloudinary
    const url = await upload(file)
    
    return { url, previewUrl }
  }, [upload])

  return {
    ...state,
    upload,
    uploadWithPreview,
    reset,
  }
}

/**
 * Hook específico para upload de imagens de capa de blog
 */
export function useBlogCoverUpload() {
  return useUpload('cover')
}

/**
 * Hook específico para upload de imagens de conteúdo de blog
 */
export function useBlogContentUpload() {
  return useUpload('content')
}

/**
 * Hook para compressão de imagem client-side
 * 
 * Reduz tamanho antes de enviar para economizar banda.
 */
export function useImageCompression() {
  const compress = useCallback(async (
    file: File,
    maxWidth: number = 1920,
    maxHeight: number = 1080,
    quality: number = 0.9
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const img = new Image()
        
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let { width, height } = img
          
          // Calcula dimensões mantendo aspect ratio
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
          
          canvas.width = width
          canvas.height = height
          
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Erro ao criar canvas'))
            return
          }
          
          ctx.drawImage(img, 0, 0, width, height)
          
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Erro ao comprimir imagem'))
                return
              }
              
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              
              resolve(compressedFile)
            },
            file.type,
            quality
          )
        }
        
        img.onerror = () => reject(new Error('Erro ao carregar imagem'))
        img.src = e.target?.result as string
      }
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
      reader.readAsDataURL(file)
    })
  }, [])

  return { compress }
}

