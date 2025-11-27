/**
 * Image Optimizer (Formato Post-Compressor)
 *
 * Utilitário inspirado no estilo do post-compressor para análise e otimização de imagens.
 * Estrutura compacta, funções puras e todas as decisões condensadas em objetos tipo map.
 *
 * Suporta WebP animado (GIF WebP) - formato moderno para imagens em movimento.
 *
 * @rules Regras de Otimização:
 * 1. WebP animado: manter como WebP com compressão lossless (sem perdas)
 * 2. GIF animado: converter para WebP animado com compressão lossless (melhor compressão, sem perdas)
 * 3. WebP estático: manter como WebP com compressão lossless (preservar qualidade)
 * 4. PNG/JPG estático: converter para WebP com compressão lossless (otimização sem perdas)
 * 5. SVG: manter formato vetorial (sem compressão bitmap)
 *
 * Compressão lossless: não sacrifica qualidade, reduz tamanho sem perdas
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
    recommendedAnimated: 'webp' | 'original'; // Recomendação específica para animado
  }
> = {
  webp: {
    recommended: 'webp',
    compression: 'medium',
    notes: 'WebP detectado - formato moderno otimizado.',
    needsConversion: () => false,
    recommendedAnimated: 'webp', // WebP animado mantém formato WebP
  },
  gif: {
    recommended: 'webp',
    compression: 'medium',
    notes:
      'GIF detectado - considerar conversão para WebP animado (melhor compressão).',
    needsConversion: animated => !animated, // só converte GIF estático, GIF animado pode ser convertido para WebP animado
    recommendedAnimated: 'webp', // GIF animado deve ser convertido para WebP animado
  },
  jpg: {
    recommended: 'webp',
    compression: 'high',
    notes: 'JPEG detectado - recomenda conversão para WebP.',
    needsConversion: () => true,
    recommendedAnimated: 'webp',
  },
  png: {
    recommended: 'webp',
    compression: 'high',
    notes: 'PNG detectado - recomenda conversão para WebP.',
    needsConversion: () => true,
    recommendedAnimated: 'webp',
  },
  svg: {
    recommended: 'original',
    compression: 'low',
    notes: 'SVG detectado - manter formato vetorial (sem compressão bitmap).',
    needsConversion: () => false,
    recommendedAnimated: 'original',
  },
  avif: {
    recommended: 'original',
    compression: 'medium',
    notes:
      'AVIF detectado - alta compressão, manter formato salvo indicação contrária.',
    needsConversion: () => false,
    recommendedAnimated: 'original',
  },
  '': {
    recommended: 'original',
    compression: 'medium',
    notes: 'Formato desconhecido.',
    needsConversion: () => false,
    recommendedAnimated: 'original',
  },
};

/**
 * Estrutura ultra-compacta para análise e recomendação de imagem
 */
export type ImageAnalysisCompact = {
  f: ImageFormat; // format
  a: boolean; // animated
  c: boolean; // needs conversion
  r: 'webp' | 'original'; // recommended
  s: number; // size
  d?: [number, number]; // dimensions: [w, h]
};

/**
 * Analisa imagem (arquivo ou url) como no padrão post-compressor
 * Suporta detecção de WebP animado (GIF WebP) - formato moderno para animações
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
    animated = isAnimatedFile(filename, src.type);
  } else {
    filename = src.toLowerCase();
    format = extractFormat(filename);
    animated = isAnimatedHeuristic(filename);
    size = 0; // Não disponível para string
  }

  const opt = FORMAT_OPTIMIZATION[format] || FORMAT_OPTIMIZATION[''];
  const needsConversion = opt.needsConversion(animated);

  // Lógica de recomendação conforme regras:
  // 1. WebP animado: manter como WebP (não converter)
  // 2. GIF animado: converter para WebP animado
  // 3. WebP estático: manter como WebP (não converter)
  const recommended = animated
    ? format === 'webp'
      ? 'webp' // WebP animado: manter como WebP
      : opt.recommendedAnimated // GIF animado: converter para WebP animado
    : opt.recommended; // WebP estático: manter como WebP

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
 * Detecta se um arquivo é animado (GIF ou WebP animado)
 * Suporta detecção de WebP animado via nome do arquivo
 *
 * Nota: WebP estático e animado têm o mesmo MIME type ('image/webp'),
 * então a detecção é baseada em heurísticas do nome do arquivo.
 */
function isAnimatedFile(filename: string, mime?: string): boolean {
  const l = filename.toLowerCase();

  // Detecção por extensão GIF - sempre animado
  if (l.includes('.gif')) return true;

  // Detecção por MIME type GIF
  if (mime === 'image/gif') return true;

  // Detecção de WebP animado (GIF WebP)
  // WebP animado não pode ser detectado apenas pelo MIME type (sempre 'image/webp')
  // Então usamos heurísticas baseadas no nome do arquivo
  if (l.includes('.webp')) {
    // Indicadores de WebP animado no nome:
    return (
      l.includes('animated') ||
      l.includes('anim') ||
      l.includes('_anim') ||
      l.includes('_animated') ||
      l.includes('gif') || // GIF convertido para WebP pode ter "gif" no nome
      l.includes('animation') ||
      l.includes('movement') ||
      l.match(/anim.*\.webp$/i) !== null // Nome termina com "anim.webp"
    );
  }

  // Detecção por palavras-chave genéricas no nome
  return (
    l.includes('animated') ||
    l.includes('anim') ||
    l.includes('_anim') ||
    l.includes('_animated')
  );
}

/**
 * Heurística para animação via string/URL
 * Suporta detecção de WebP animado e GIF
 */
function isAnimatedHeuristic(str: string): boolean {
  const l = str.toLowerCase();

  // Detecção de GIF
  if (l.includes('.gif')) return true;

  // Detecção de WebP animado (GIF WebP)
  if (l.includes('.webp')) {
    // WebP animado pode ser indicado por:
    // - Nome com "animated", "anim", "_anim", "animation", "movement"
    // - Nome com "gif" (GIF convertido para WebP)
    // - Parâmetros na URL indicando animação
    return (
      l.includes('animated') ||
      l.includes('anim') ||
      l.includes('_anim') ||
      l.includes('animation') ||
      l.includes('movement') ||
      l.includes('gif') || // GIF convertido para WebP
      l.includes('fl_animated') || // Cloudinary flag para animado
      l.includes('fl_awebp') // Cloudinary flag para WebP animado
    );
  }

  // Detecção por palavras-chave genéricas
  return l.includes('animated') || l.includes('anim') || l.includes('_anim');
}

/**
 * Get recomendações de otimização, formato compacto
 */
export type OptimizationTipsCompact = {
  w: boolean; // shouldConvertToWebP
  p: boolean; // shouldPreserveAnimation
  l: 'high' | 'medium' | 'low' | 'lossless'; // compression level
  q: 'lossless' | 'high' | 'medium' | 'low' | 'auto'; // quality setting
  n: string[]; // notes
};

/**
 * Obtenha recomendações baseadas na análise compacta (post-compressor style)
 * Suporta recomendações para WebP animado (GIF WebP) com compressão lossless
 *
 * Compressão lossless: não sacrifica qualidade, reduz tamanho sem perdas
 */
export function getOptimizationTips(
  an: ImageAnalysisCompact
): OptimizationTipsCompact {
  const notes: string[] = [];
  let shouldConvertToWebP = false;
  let shouldPreserveAnimation = an.a;
  let compressionLevel: 'high' | 'medium' | 'low' | 'lossless' = 'medium';
  let qualitySetting: 'lossless' | 'high' | 'medium' | 'low' | 'auto' = 'auto';

  const opt = FORMAT_OPTIMIZATION[an.f] || FORMAT_OPTIMIZATION[''];

  // Regra 1: WebP animado - manter como WebP com compressão lossless (sem perdas)
  if (an.a && an.f === 'webp') {
    shouldPreserveAnimation = true;
    compressionLevel = 'lossless'; // Compressão lossless para WebP animado
    qualitySetting = 'lossless'; // Qualidade lossless - sem perdas
    notes.push(
      'WebP animado detectado - usar compressão lossless (sem perdas de qualidade)'
    );
    shouldConvertToWebP = false; // Já é WebP, não precisa converter
  }
  // Regra 2: GIF animado - converter para WebP animado com compressão lossless
  else if (an.a && an.f === 'gif') {
    shouldPreserveAnimation = true;
    shouldConvertToWebP = true; // Converter GIF para WebP animado
    compressionLevel = 'lossless'; // Compressão lossless para preservar qualidade
    qualitySetting = 'lossless'; // Qualidade lossless - sem perdas
    notes.push(
      'GIF animado detectado - converter para WebP animado com compressão lossless (melhor compressão, sem perdas)'
    );
  }
  // Outras imagens animadas (não GIF, não WebP)
  else if (an.a) {
    shouldPreserveAnimation = true;
    compressionLevel = 'medium';
    qualitySetting = 'high'; // Alta qualidade para animações
    notes.push(
      'Imagem animada detectada - preservar animação com alta qualidade'
    );
    if (an.r === 'webp') {
      shouldConvertToWebP = true;
      qualitySetting = 'lossless'; // Lossless para conversão para WebP animado
      notes.push(
        'Recomenda conversão para WebP animado com compressão lossless'
      );
    }
  }

  // Regra 3: WebP estático - manter como WebP com compressão lossless (opcional)
  // Outras imagens estáticas (PNG, JPG) - converter para WebP
  if (!an.a) {
    if (an.f === 'webp') {
      // WebP estático: manter como WebP com compressão lossless (preservar qualidade)
      compressionLevel = 'lossless'; // Lossless para preservar qualidade máxima
      qualitySetting = 'lossless'; // Qualidade lossless - sem perdas
      notes.push(
        'WebP estático - usar compressão lossless para preservar qualidade'
      );
      shouldConvertToWebP = false; // Já é WebP, não precisa converter
    } else if ((an.f === 'png' || an.f === 'jpg') && an.c) {
      // PNG/JPG estático: converter para WebP com compressão lossless
      shouldConvertToWebP = true;
      compressionLevel = 'lossless'; // Lossless para preservar qualidade
      qualitySetting = 'lossless'; // Qualidade lossless - sem perdas
      notes.push(
        'Converter para WebP com compressão lossless (sem perdas de qualidade)'
      );
    } else if (an.f === 'svg') {
      // SVG: manter formato vetorial
      notes.push(opt.notes);
      compressionLevel = 'low';
      qualitySetting = 'auto';
    }
  }

  if (!notes.length) {
    notes.push(opt.notes);
  }

  return {
    w: shouldConvertToWebP,
    p: shouldPreserveAnimation,
    l: compressionLevel,
    q: qualitySetting,
    n: notes,
  };
}
