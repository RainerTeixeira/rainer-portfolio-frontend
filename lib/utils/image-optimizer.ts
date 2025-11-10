/**
 * Image Optimizer - Utilitário para otimização de imagens
 *
 * Fornece funções para analisar e otimizar imagens antes do upload
 */

export interface ImageAnalysis {
  format: string;
  animated: boolean;
  needsConversion: boolean;
  recommendedFormat: 'webp' | 'original';
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

/**
 * Analisa uma URL ou arquivo de imagem para determinar formato e características
 */
export function analyzeImage(source: string | File): ImageAnalysis {
  let url = '';
  let size = 0;
  let format = '';
  let animated = false;

  if (source instanceof File) {
    url = source.name.toLowerCase();
    size = source.size;
    format = extractFormatFromFilename(url);
    // GIFs de arquivo são potencialmente animados
    animated = format === 'gif';
  } else {
    url = source.toLowerCase();
    format = extractFormatFromUrl(url);
    animated =
      url.includes('animated') || url.includes('anim') || format === 'gif';
  }

  // Determinar se precisa conversão
  const needsConversion = format !== 'webp' && !animated;
  const recommendedFormat: 'webp' | 'original' = animated ? 'original' : 'webp';

  return {
    format,
    animated,
    needsConversion,
    recommendedFormat,
    size,
  };
}

/**
 * Extrai formato da URL
 */
function extractFormatFromUrl(url: string): string {
  const match = url.match(/\.(webp|gif|jpg|jpeg|png|svg|avif)(\?|$)/i);
  if (match) {
    const ext = match[1].toLowerCase();
    return ext === 'jpeg' ? 'jpg' : ext;
  }
  return '';
}

/**
 * Extrai formato do nome do arquivo
 */
function extractFormatFromFilename(filename: string): string {
  const match = filename.match(/\.(webp|gif|jpg|jpeg|png|svg|avif)$/i);
  if (match) {
    const ext = match[1].toLowerCase();
    return ext === 'jpeg' ? 'jpg' : ext;
  }
  return '';
}

/**
 * Verifica se uma imagem é animada (GIF animado)
 *
 * Nota: Esta é uma verificação heurística baseada na URL/nome.
 * Para verificação precisa, seria necessário analisar os bytes do arquivo.
 */
export function isAnimatedImage(url: string | File): boolean {
  if (url instanceof File) {
    return url.type === 'image/gif' || url.name.toLowerCase().endsWith('.gif');
  }

  const urlLower = url.toLowerCase();
  return (
    urlLower.includes('.gif') ||
    urlLower.includes('animated') ||
    urlLower.includes('anim') ||
    urlLower.includes('_anim')
  );
}

/**
 * Obtém recomendações de otimização para uma imagem
 */
export function getOptimizationRecommendations(analysis: ImageAnalysis): {
  shouldConvertToWebP: boolean;
  shouldPreserveAnimation: boolean;
  compressionLevel: 'high' | 'medium' | 'low';
  notes: string[];
} {
  const notes: string[] = [];
  let shouldConvertToWebP = false;
  let shouldPreserveAnimation = analysis.animated;
  let compressionLevel: 'high' | 'medium' | 'low' = 'medium';

  if (analysis.animated) {
    shouldPreserveAnimation = true;
    notes.push('Imagem animada detectada - preservar formato original');
    compressionLevel = 'medium'; // GIFs animados: compressão média para manter qualidade
  } else if (analysis.format === 'png' && analysis.needsConversion) {
    shouldConvertToWebP = true;
    notes.push(
      'PNG detectado - recomenda conversão para WebP (melhor compressão)'
    );
    compressionLevel = 'high';
  } else if (
    ['jpg', 'jpeg'].includes(analysis.format) &&
    analysis.needsConversion
  ) {
    shouldConvertToWebP = true;
    notes.push(
      'JPEG detectado - recomenda conversão para WebP (menor tamanho)'
    );
    compressionLevel = 'high';
  } else if (analysis.format === 'webp') {
    notes.push('Já está em WebP - otimização adicional recomendada');
    compressionLevel = 'medium';
  } else if (analysis.format === 'svg') {
    notes.push('SVG detectado - manter formato original (vetorial)');
    compressionLevel = 'low';
  }

  return {
    shouldConvertToWebP,
    shouldPreserveAnimation,
    compressionLevel,
    notes,
  };
}
