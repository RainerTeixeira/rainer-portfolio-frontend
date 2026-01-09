/**
 * Domain-Specific Helpers
 * 
 * Funções específicas do domínio do portfolio.
 * Avatar, status, validações e utilidades de negócio.
 */

// ============================================================================
// AVATAR E IMAGENS
// ============================================================================

/**
 * Prepara avatar para upload (específico do portfolio)
 */
export async function prepareAvatarForUpload(file: File): Promise<File> {
  const { prepareImageForUpload } = await import('@rainersoft/ui');
  return prepareImageForUpload(file, {
    maxWidth: 512,
    maxHeight: 512,
    quality: 0.9,
    shouldConvertToWebP: true
  });
}

/**
 * Gera URL do avatar com base no ID do usuário
 */
export function getAvatarUrl(userId: string, size: number = 200): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userId)}&size=${size}&background=0891b2&color=fff&font-size=0.5`;
}

/**
 * Extrai nome do Cloudinary da URL
 */
export function setCloudNameFromUrl(url: string, cloudName: string): string {
  if (!url) return url;
  
  // Se já for uma URL do Cloudinary com o cloud name correto, retorna como está
  if (url.includes(`https://cloudinary.com/${cloudName}/`)) {
    return url;
  }
  
  // Substitui o cloud name na URL do Cloudinary
  return url.replace(/https:\/\/cloudinary\.com\/[^\/]+\//, `https://cloudinary.com/${cloudName}/`);
}

// ============================================================================
// VALIDAÇÃO ESPECÍFICA
// ============================================================================

/**
 * Re-export validateMessage da biblioteca @rainersoft/utils
 * Migrado para a biblioteca para reutilização em outros projetos
 */
export { validateMessage } from '@rainersoft/utils';

// ============================================================================
// STATUS E TRADUÇÃO
// ============================================================================

/**
 * Re-export translatePostStatus da biblioteca @rainersoft/utils
 * Migrado para a biblioteca para reutilização em outros projetos
 */
export { translatePostStatus } from '@rainersoft/utils';
