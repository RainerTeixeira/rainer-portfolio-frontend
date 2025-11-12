/**
 * Image Optimizer (Formato Post-Compressor)
 *
 * Utilitário inspirado no estilo do post-compressor para análise e otimização de imagens.
 * Estrutura compacta, funções puras e todas as decisões condensadas em objetos tipo map.
 */

/**
 * Tipos compactos de formato de imagem
 */
type ImageFormat = 'webp' | 'gif' | 'jpg' | 'png' | 'svg' | 'avif' | '';

/**
 * Mapeia formatos semelhantes para uma única key
 */
const FORMAT_REMAP: Record<string, ImageFormat> = {
  jpeg: 'jpg',
  jpg: 'jpg',
  png: 'png',
  webp: 'webp',
  gif: 'gif',
  svg: 'svg',
  avif: 'avif',
};

/**
 * Mapeamento para recomendações com base no formato/estado
 * Similar aos mapas do post-compressor
 */
const FORMAT_OPTIMIZATION: Record<
  ImageFormat,
  {
    recommended: 'webp' | 'original';
    compression: 'high' | 'medium' | 'low';
    notes: string;
    needsConversion: (animated: boolean) => boolean;
  }
> = {
  webp: {
    recommended: 'webp',
    compression: 'medium',
    notes: 'Já está em WebP - considerar apenas otimização leve.',
    needsConversion: () => false,
  },
  gif: {
    recommended: 'original',
    compression: 'medium',
    notes: 'GIF animado - manter formato original (pode ser animado).',
    needsConversion: animated => !animated, // só converte GIF estático
  },
  jpg: {
    recommended: 'webp',
    compression: 'high',
    notes: 'JPEG detectado - recomenda conversão para WebP.',
    needsConversion: () => true,
  },
  png: {
    recommended: 'webp',
    compression: 'high',
    notes: 'PNG detectado - recomenda conversão para WebP.',
    needsConversion: () => true,
  },
  svg: {
    recommended: 'original',
    compression: 'low',
    notes: 'SVG detectado - manter formato vetorial (sem compressão bitmap).',
    needsConversion: () => false,
  },
  avif: {
    recommended: 'original',
    compression: 'medium',
    notes: 'AVIF detectado - alta compressão, manter formato salvo indicação contrária.',
    needsConversion: () => false,
  },
  '': {
    recommended: 'original',
    compression: 'medium',
    notes: 'Formato desconhecido.',
    needsConversion: () => false,
  },
};

/**
 * Estrutura ultra-compacta para análise e recomendação de imagem
 */
export type ImageAnalysisCompact = {
  f: ImageFormat; // format
  a: boolean;     // animated
  c: boolean;     // needs conversion
  r: 'webp' | 'original'; // recommended
  s: number;      // size
  d?: [number, number]; // dimensions: [w, h]
};

/**
 * Analisa imagem (arquivo ou url) como no padrão post-compressor
 */
export function analyzeImageCompact(
  src: string | File,
  dims?: { width: number; height: number }
): ImageAnalysisCompact {
  let filename = '';
  let size = 0;
  let format: ImageFormat = '';
  let animated = false;

  if (src instanceof File) {
    filename = src.name.toLowerCase();
    size = src.size;
    format = extractFormat(filename);
    animated = isGifOrAnimatedName(filename, src.type);
  } else {
    filename = src.toLowerCase();
    format = extractFormat(filename);
    animated = isAnimatedHeuristic(filename);
    size = 0; // Não disponível para string
  }

  const opt = FORMAT_OPTIMIZATION[format] || FORMAT_OPTIMIZATION[''];
  const needsConversion = opt.needsConversion(animated);
  const recommended = animated ? 'original' : opt.recommended;

  const result: ImageAnalysisCompact = {
    f: format,
    a: animated,
    c: needsConversion,
    r: recommended,
    s: size,
  };
  if (dims) {
    result.d = [dims.width, dims.height];
  }
  return result;
}

/**
 * Extrator compacto de formato de arquivo
 */
function extractFormat(filename: string): ImageFormat {
  const match = filename.match(/\.(webp|gif|jpg|jpeg|png|svg|avif)(\?|$)/i);
  if (match && match[1]) {
    return FORMAT_REMAP[match[1].toLowerCase()] ?? '';
  }
  return '';
}

/**
 * Heurística para GIF animado em arquivo
 */
function isGifOrAnimatedName(filename: string, mime?: string): boolean {
  return (
    filename.includes('.gif') ||
    (mime && mime === 'image/gif') ||
    filename.includes('animated') ||
    filename.includes('anim')
  );
}

/**
 * Heurística para animação via string/url
 */
function isAnimatedHeuristic(str: string): boolean {
  const l = str.toLowerCase();
  return (
    l.includes('.gif') ||
    l.includes('animated') ||
    l.includes('anim') ||
    l.includes('_anim')
  );
}

/**
 * Get recomendações de otimização, formato compacto
 */
export type OptimizationTipsCompact = {
  w: boolean; // shouldConvertToWebP
  p: boolean; // shouldPreserveAnimation
  l: 'high' | 'medium' | 'low'; // compression level
  n: string[]; // notes
};

/**
 * Obtenha recomendações baseadas na análise compacta (post-compressor style)
 */
export function getOptimizationTips(an: ImageAnalysisCompact): OptimizationTipsCompact {
  const notes: string[] = [];
  let shouldConvertToWebP = false;
  let shouldPreserveAnimation = an.a;
  let compressionLevel: 'high' | 'medium' | 'low' = 'medium';

  const opt = FORMAT_OPTIMIZATION[an.f] || FORMAT_OPTIMIZATION[''];

  if (an.a) {
    shouldPreserveAnimation = true;
    compressionLevel = 'medium';
    notes.push('Imagem animada detectada - preservar formato original');
  }
  if ((an.f === 'png' || an.f === 'jpg') && an.c) {
    shouldConvertToWebP = true;
    notes.push(opt.notes);
    compressionLevel = 'high';
  }
  if (an.f === 'webp') {
    notes.push(opt.notes);
    compressionLevel = 'medium';
  }
  if (an.f === 'svg') {
    notes.push(opt.notes);
    compressionLevel = 'low';
  }
  if (!notes.length) {
    notes.push(opt.notes);
  }

  return {
    w: shouldConvertToWebP,
    p: shouldPreserveAnimation,
    l: compressionLevel,
    n: notes,
  };
}
