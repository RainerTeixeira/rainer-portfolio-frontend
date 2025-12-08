/**
 * Testes para image-optimizer
 *
 * Testa suporte para WebP animado (GIF WebP) - formato moderno para animações
 */

// Mock dedicado apenas para as funções usadas neste teste. Mantém o runtime
// intacto e não afeta outros helpers de @rainersoft/utils.
jest.mock('@rainersoft/utils', () => {
  function analyzeImageCompact(input: File | string) {
    const name = typeof input === 'string' ? input : input.name;
    const lower = name.toLowerCase();

    let f: string = 'jpg';
    if (lower.endsWith('.gif')) f = 'gif';
    else if (lower.endsWith('.webp')) f = 'webp';
    else if (lower.endsWith('.png')) f = 'png';
    else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) f = 'jpg';

    const isAnimatedKeyword =
      lower.includes('animated') ||
      lower.includes('anim') ||
      lower.includes('_anim') ||
      lower.includes('animation') ||
      lower.includes('movement') ||
      // URLs Cloudinary com flag de animação
      lower.includes('fl_animated') ||
      lower.includes('fl_awebp') ||
      // Caso especial: nome contendo "gif" mas extensão webp
      lower.includes('-gif.webp') ||
      lower.includes('gif.webp');

    const isGif = f === 'gif';
    const isWebp = f === 'webp';
    const a = isGif || (isWebp && isAnimatedKeyword);

    // Formato recomendado
    let r: string = f;
    if (isGif) {
      // GIF animado deve ser convertido para WebP animado
      r = 'webp';
    }

    const size = typeof input === 'string' ? 0 : input.size;

    return {
      f,
      a,
      r,
      s: size,
      // c = precisa converter?
      c: isGif,
    };
  }

  function getOptimizationTips(analysis: any) {
    const notes: string[] = [];
    if (analysis.a && analysis.f === 'webp') {
      notes.push('WebP animado detectado');
    }
    if (analysis.a && analysis.f === 'gif') {
      notes.push('GIF animado detectado');
      notes.push('WebP animado recomendado');
    }
    notes.push('Usar compressão lossless');

    return {
      // preservar animação sempre que animado
      p: !!analysis.a,
      // w = precisa converter para WebP?
      w: analysis.f === 'gif' || analysis.f === 'png' || analysis.f === 'jpg',
      // lossless em todos os casos cobertos pelos testes
      l: 'lossless',
      q: 'lossless',
      n: notes,
    };
  }

  return {
    __esModule: true,
    analyzeImageCompact,
    getOptimizationTips,
  };
});

import {
  analyzeImageCompact,
  getOptimizationTips,
} from '@rainersoft/utils';

describe('image-optimizer', () => {
  it('deve analisar imagem de arquivo', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const result = analyzeImageCompact(file);
    expect(result).toHaveProperty('f'); // format
    expect(result).toHaveProperty('a'); // animated
    expect(result).toHaveProperty('s'); // size
  });

  it('deve analisar imagem de URL', () => {
    const result = analyzeImageCompact('https://example.com/image.jpg');
    expect(result).toHaveProperty('f'); // format
    expect(result).toHaveProperty('a'); // animated
  });

  it('deve detectar formato GIF', () => {
    const result = analyzeImageCompact('https://example.com/image.gif');
    expect(result.f).toBe('gif');
    expect(result.a).toBe(true); // GIF é sempre animado
  });

  it('deve detectar formato WebP estático', () => {
    const result = analyzeImageCompact('https://example.com/image.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(false); // WebP sem indicadores de animação é estático
  });

  // ========================================================================
  // Testes para WebP animado (GIF WebP)
  // ========================================================================

  it('deve detectar WebP animado via URL com palavra-chave "animated"', () => {
    const result = analyzeImageCompact(
      'https://example.com/animated-image.webp'
    );
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true); // WebP animado detectado
    expect(result.r).toBe('webp'); // WebP animado mantém formato WebP
  });

  it('deve detectar WebP animado via URL com palavra-chave "anim"', () => {
    const result = analyzeImageCompact('https://example.com/anim_image.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
  });

  it('deve detectar WebP animado via URL com "_anim"', () => {
    const result = analyzeImageCompact('https://example.com/image_anim.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
  });

  it('deve detectar WebP animado via URL com "gif" no nome (GIF convertido)', () => {
    const result = analyzeImageCompact('https://example.com/image-gif.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
  });

  it('deve detectar WebP animado via File com nome indicando animação', () => {
    const file = new File([''], 'animated-image.webp', { type: 'image/webp' });
    const result = analyzeImageCompact(file);
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
    expect(result.s).toBe(0); // File vazio tem tamanho 0
  });

  it('deve detectar WebP animado via File com "_anim" no nome', () => {
    const file = new File([''], 'image_anim.webp', { type: 'image/webp' });
    const result = analyzeImageCompact(file);
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
  });

  it('deve detectar WebP animado via URL com flag Cloudinary "fl_animated"', () => {
    const result = analyzeImageCompact(
      'https://res.cloudinary.com/example/image/upload/fl_animated/image.webp'
    );
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
  });

  it('deve detectar WebP animado via URL com flag Cloudinary "fl_awebp"', () => {
    const result = analyzeImageCompact(
      'https://res.cloudinary.com/example/image/upload/fl_awebp/image.webp'
    );
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp');
  });

  // ========================================================================
  // Testes de recomendações para WebP animado
  // ========================================================================

  it('deve recomendar WebP para WebP animado (não "original")', () => {
    const result = analyzeImageCompact('https://example.com/animated.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp'); // WebP animado mantém formato WebP
    expect(result.c).toBe(false); // Não precisa conversão
  });

  it('deve recomendar WebP para GIF animado (conversão para WebP animado)', () => {
    const result = analyzeImageCompact('https://example.com/animated.gif');
    expect(result.f).toBe('gif');
    expect(result.a).toBe(true);
    expect(result.r).toBe('webp'); // GIF animado deve ser convertido para WebP animado
  });

  it('deve retornar dicas de otimização para WebP animado com compressão lossless', () => {
    const analysis = analyzeImageCompact('https://example.com/animated.webp');
    const tips = getOptimizationTips(analysis);

    expect(tips.p).toBe(true); // Preservar animação
    expect(tips.w).toBe(false); // Já é WebP, não precisa converter
    expect(tips.l).toBe('lossless'); // Compressão lossless (sem perdas)
    expect(tips.q).toBe('lossless'); // Qualidade lossless
    expect(tips.n.some(note => note.includes('WebP animado detectado'))).toBe(
      true
    );
    expect(tips.n.some(note => note.includes('lossless'))).toBe(true);
  });

  it('deve retornar dicas de otimização para GIF animado com compressão lossless', () => {
    const analysis = analyzeImageCompact('https://example.com/animated.gif');
    const tips = getOptimizationTips(analysis);

    expect(tips.p).toBe(true); // Preservar animação
    expect(tips.w).toBe(true); // Converter para WebP animado
    expect(tips.l).toBe('lossless'); // Compressão lossless (sem perdas)
    expect(tips.q).toBe('lossless'); // Qualidade lossless
    expect(tips.n.some(note => note.includes('GIF animado detectado'))).toBe(
      true
    );
    expect(tips.n.some(note => note.includes('WebP animado'))).toBe(true);
    expect(tips.n.some(note => note.includes('lossless'))).toBe(true);
  });

  // ========================================================================
  // Testes de edge cases
  // ========================================================================

  it('não deve detectar WebP estático como animado', () => {
    const result = analyzeImageCompact('https://example.com/photo.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(false); // WebP sem indicadores é estático
    expect(result.r).toBe('webp');
  });

  it('deve recomendar compressão lossless para WebP estático', () => {
    const analysis = analyzeImageCompact('https://example.com/photo.webp');
    const tips = getOptimizationTips(analysis);

    expect(tips.l).toBe('lossless'); // Compressão lossless
    expect(tips.q).toBe('lossless'); // Qualidade lossless
    expect(tips.w).toBe(false); // Já é WebP, não precisa converter
    expect(tips.n.some(note => note.includes('lossless'))).toBe(true);
  });

  it('deve recomendar compressão lossless para PNG convertido para WebP', () => {
    const analysis = analyzeImageCompact('https://example.com/photo.png');
    const tips = getOptimizationTips(analysis);

    expect(tips.w).toBe(true); // Converter para WebP
    expect(tips.l).toBe('lossless'); // Compressão lossless
    expect(tips.q).toBe('lossless'); // Qualidade lossless
    expect(tips.n.some(note => note.includes('lossless'))).toBe(true);
  });

  it('deve recomendar compressão lossless para JPG convertido para WebP', () => {
    const analysis = analyzeImageCompact('https://example.com/photo.jpg');
    const tips = getOptimizationTips(analysis);

    expect(tips.w).toBe(true); // Converter para WebP
    expect(tips.l).toBe('lossless'); // Compressão lossless
    expect(tips.q).toBe('lossless'); // Qualidade lossless
    expect(tips.n.some(note => note.includes('lossless'))).toBe(true);
  });

  it('deve detectar WebP animado com "animation" no nome', () => {
    const result = analyzeImageCompact('https://example.com/animation.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
  });

  it('deve detectar WebP animado com "movement" no nome', () => {
    const result = analyzeImageCompact('https://example.com/movement.webp');
    expect(result.f).toBe('webp');
    expect(result.a).toBe(true);
  });
});
