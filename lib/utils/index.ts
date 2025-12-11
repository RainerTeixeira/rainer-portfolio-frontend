/**
 * Utilitários do Frontend (Portfolio-specific)
 * 
 * Este arquivo contém utilitários que são específicos do domínio
 * do portfolio e não devem ser migrados para @rainersoft/utils.
 * 
 * Utilitários genéricos devem ser importados de @rainersoft/utils.
 */

// ============================================================================
// IMPORTAÇÕES DAS BIBLIOTECAS @rainersoft
// ============================================================================

// Funções genéricas migradas para @rainersoft/utils
export { 
  validateEmail, 
  validatePassword, 
  validateUrl, 
  validatePhone, 
  validateUsername, 
  validateSlug,
  validateText,
  textToSlug,
  formatDate,
  formatRelativeDate,
  formatCurrency,
  formatNumber,
  prefersReducedMotion,
  scrollToTop,
  scrollToElement,
  onReducedMotionChange,
  // Novas funções
  usePasswordStrength,
  useCarouselKeyboard,
  useTableOfContents,
  extractInitials,
  generateUniqueId,
  truncateText,
  capitalize,
  cleanText,
  countWords,
  isEmpty,
  normalizeSpaces,
  formatNumber as formatLargeNumber,
  calculateChange,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
  calculateMovingAverage,
  findMinMax
} from '@rainersoft/utils';

// Componentes e utilitários de UI migrados para @rainersoft/ui
export {
  Avatar,
  isAcceptedFormat,
  isWebP,
  supportsWebP,
  getImageInfo,
  resizeImage,
  convertToWebP,
  prepareImageForUpload,
  generatePlaceholder
} from '@rainersoft/ui';

// ============================================================================
// AVATAR E IMAGEM (Portfolio-specific)
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
// IMAGEM E MÍDIA (Portfolio-specific)
// ============================================================================
// Todas as funções de imagem foram migradas para @rainersoft/ui

// ============================================================================
// VALIDAÇÃO (Portfolio-specific)
// ============================================================================

/**
 * Valida mensagem de contato (específico do portfolio)
 * Usa validateText do @rainersoft/utils com configurações específicas
 */
export function validateMessage(message: string): boolean | { isValid: boolean; errors?: string[] } {
  // Import dinâmico para usar a função genérica com configurações específicas
  try {
    const { validateText: utilsValidateText } = require('@rainersoft/utils');
    return utilsValidateText(message, {
      minLength: 10,
      maxLength: 1000,
      fieldName: 'Mensagem'
    }, 'pt-BR');
  } catch {
    // Fallback caso @rainersoft/utils não esteja disponível
    const isValid = message.length >= 10 && message.length <= 1000;
    
    if (!isValid) {
      return {
        isValid: false,
        errors: ['Mensagem deve ter entre 10 e 1000 caracteres']
      };
    }
    
    return isValid;
  }
}

// ============================================================================
// BUSCA (Portfolio-specific)
// ============================================================================

/**
 * Busca conteúdo no portfolio
 */
export function searchContent(query: string, content: any[]): any[] {
  if (!query.trim()) return content;
  
  const lowercaseQuery = query.toLowerCase();
  
  return content.filter(item => {
    // Busca em título
    if (item.title?.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    // Busca em descrição
    if (item.description?.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    // Busca em conteúdo
    if (item.content?.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    // Busca em tags
    if (item.tags?.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))) {
      return true;
    }
    
    return false;
  });
}

// ============================================================================
// STATUS (Portfolio-specific)
// ============================================================================

/**
 * Traduz status de posts do blog
 */
export function translatePostStatus(status: string): string {
  const statusMap: Record<string, string> = {
    draft: 'Rascunho',
    published: 'Publicado',
    archived: 'Arquivado',
    scheduled: 'Agendado',
    pending_review: 'Aguardando Revisão'
  };
  
  return statusMap[status] || status;
}
