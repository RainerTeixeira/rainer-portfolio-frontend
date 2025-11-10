// ============================================================================
// Serviço de Cloudinary - Upload de Imagens para Blog
// ============================================================================

/**
 * Serviço para upload de imagens para Cloudinary
 *
 * @fileoverview Serviço de upload de imagens otimizadas
 * @author Rainer Teixeira
 */

import { api } from '../client';

interface UploadImageResponse {
  success: boolean;
  url: string; // URL curta: /blog/nome_arquivo
  fullUrl?: string; // URL completa do Cloudinary (opcional)
}

/**
 * Serviço para upload de imagens do blog para Cloudinary
 */
export class CloudinaryService {
  private readonly basePath = '/cloudinary';

  /**
   * Faz upload de uma imagem para o blog
   *
   * @param file - Arquivo de imagem (File)
   * @param fileName - Nome customizado para a imagem (opcional, formato: foto1.jpg)
   * @returns URL da imagem otimizada no Cloudinary (formato curto: /blog/foto1.jpg)
   * @throws Error se o upload falhar
   */
  async uploadBlogImage(file: File, fileName?: string): Promise<string> {
    // Validar arquivo
    if (!file.type.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      throw new Error('Apenas imagens são permitidas (JPG, PNG, GIF, WebP)');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Imagem muito grande. Máximo 5MB.');
    }

    try {
      // Criar FormData
      const formData = new FormData();
      formData.append('image', file);
      if (fileName) {
        formData.append('fileName', fileName);
      }

      // Fazer upload via POST com FormData
      const response = await api.post<UploadImageResponse>(
        `${this.basePath}/upload/blog-image`,
        formData // FormData será processado corretamente pelo cliente API
      );

      if (response.success && response.url) {
        // Retornar URL curta (formato: /blog/nome_arquivo)
        // Se precisar da URL completa do Cloudinary, usar response.fullUrl
        return response.url;
      }

      throw new Error('Upload falhou: resposta inválida');
    } catch (error) {
      const err = error as Error;
      throw new Error(`Erro ao fazer upload: ${err.message}`);
    }
  }

  /**
   * Verifica se uma URL já está no Cloudinary
   *
   * @param url - URL da imagem
   * @returns true se a URL é do Cloudinary
   */
  isCloudinaryUrl(url: string): boolean {
    return url.includes('cloudinary.com') || url.startsWith('/blog/');
  }

  /**
   * Converte URL curta (/blog/nome_arquivo) para URL completa do Cloudinary
   * Se já for uma URL completa, retorna como está
   *
   * @param shortUrl - URL curta no formato /blog/nome_arquivo
   * @returns URL completa do Cloudinary ou a própria URL se já for completa
   */
  expandUrl(shortUrl: string): string {
    // Se já é uma URL completa do Cloudinary, retornar como está
    if (shortUrl.includes('cloudinary.com') || shortUrl.startsWith('http')) {
      return shortUrl;
    }

    // Se é uma URL curta (/blog/nome_arquivo), construir URL completa
    if (shortUrl.startsWith('/blog/')) {
      // const fileName = shortUrl.replace('/blog/', '');
      // Retornar URL curta mesmo - o backend pode expandir quando necessário
      // ou usar um proxy/loader do Next.js para servir do Cloudinary
      return shortUrl;
    }

    return shortUrl;
  }

  /**
   * Faz upload de um avatar
   *
   * @param file - Arquivo de imagem (File)
   * @returns URL da imagem otimizada no Cloudinary
   * @throws Error se o upload falhar
   */
  async uploadAvatar(file: File): Promise<string> {
    // Validar arquivo
    if (!file.type.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      throw new Error('Apenas imagens são permitidas (JPG, PNG, GIF, WebP)');
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Imagem muito grande. Máximo 2MB.');
    }

    try {
      // Criar FormData
      const formData = new FormData();
      formData.append('image', file);

      // Fazer upload via POST com FormData
      const response = await api.post<UploadImageResponse>(
        `${this.basePath}/upload/avatar`,
        formData // FormData será processado corretamente pelo cliente API
      );

      if (response.success && response.url) {
        console.log('✅ Imagem enviada para Cloudinary:', response.url);
        return response.url;
      }

      throw new Error('Upload falhou: resposta inválida');
    } catch (error) {
      const err = error as Error;
      throw new Error(`Erro ao fazer upload: ${err.message}`);
    }
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const cloudinaryService = new CloudinaryService();
