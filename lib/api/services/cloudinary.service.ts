// ============================================================================
// Serviço de Cloudinary - Upload de Imagens para Blog
// ============================================================================

/**
 * Serviço para upload de imagens para Cloudinary
 *
 * Suporta WebP animado (GIF WebP) - formato moderno para imagens em movimento.
 * WebP animado oferece melhor compressão que GIF tradicional.
 *
 * Todas as imagens são convertidas para WebP no cliente antes do upload,
 * garantindo arquivos leves e otimizados.
 *
 * @fileoverview Serviço de upload de imagens otimizadas
 * @author Rainer Teixeira
 * @version 1.1.0
 */

import { api } from '../client';
import type { UploadImageResponse } from '../types/cloudinary';
import { prepareAvatarForUpload, prepareImageForUpload } from '@/lib/utils/image-converter';

/**
 * Serviço para upload de imagens do blog para Cloudinary
 */
export class CloudinaryService {
  private readonly basePath = '/cloudinary';

  /**
   * Faz upload de uma imagem para o blog
   *
   * Suporta WebP animado (GIF WebP) - formato moderno para animações.
   * WebP animado oferece melhor compressão que GIF tradicional.
   *
   * @param file - Arquivo de imagem (File) - suporta JPG, PNG, GIF, WebP (incluindo WebP animado)
   * @param fileName - Nome customizado para a imagem (opcional, formato: foto1.jpg)
   * @returns URL da imagem otimizada no Cloudinary (formato curto: /blog/foto1.jpg)
   * @throws Error se o upload falhar
   */
  async uploadBlogImage(file: File, fileName?: string): Promise<string> {
    // Validar arquivo - aceita JPG, PNG, GIF, WebP (incluindo WebP animado)
    if (!file.type.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      throw new Error(
        'Apenas imagens são permitidas (JPG, PNG, GIF, WebP, WebP animado)'
      );
    }

    // WebP animado pode ser maior que imagens estáticas, mas mantemos limite de 5MB
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
   * Aceita QUALQUER formato de imagem suportado pelo navegador.
   * A imagem é automaticamente convertida para WebP no cliente antes do upload,
   * garantindo arquivos leves e otimizados.
   *
   * @param file - Arquivo de imagem (File) - aceita qualquer formato (JPG, PNG, GIF, WebP, HEIC, BMP, etc.)
   * @returns URL da imagem otimizada no Cloudinary (sempre WebP)
   * @throws Error se o upload ou conversão falhar
   *
   * @example
   * ```typescript
   * // Aceita qualquer formato - conversão automática para WebP
   * const url = await cloudinaryService.uploadAvatar(heicFile);
   * ```
   */
  async uploadAvatar(file: File): Promise<string> {
    // Validar se é uma imagem (qualquer tipo)
    if (!file.type.startsWith('image/')) {
      throw new Error('Apenas arquivos de imagem são permitidos');
    }

    // Limite de 10MB para arquivo original (será reduzido após conversão)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Imagem muito grande. Máximo 10MB.');
    }

    try {
      console.log(`🔄 Preparando avatar para upload: ${file.name} (${file.type})`);

      // Converter para WebP no cliente (sempre)
      // - Redimensiona para max 512x512
      // - Comprime com qualidade 0.85
      const webpFile = await prepareAvatarForUpload(file);

      console.log(
        `✅ Imagem convertida: ${webpFile.name} (${webpFile.type}) - ` +
        `${Math.round(file.size / 1024)}KB → ${Math.round(webpFile.size / 1024)}KB`
      );

      // Criar FormData com a imagem WebP
      const formData = new FormData();
      formData.append('image', webpFile);

      // Fazer upload via POST com FormData
      const response = await api.post<UploadImageResponse>(
        `${this.basePath}/upload/avatar`,
        formData
      );

      if (response.success && response.url) {
        console.log('✅ Avatar enviado para Cloudinary:', response.url);
        return response.url;
      }

      throw new Error('Upload falhou: resposta inválida');
    } catch (error) {
      const err = error as Error;
      throw new Error(`Erro ao fazer upload do avatar: ${err.message}`);
    }
  }
}

// ============================================================================
// Instância Singleton
// ============================================================================

export const cloudinaryService = new CloudinaryService();
