/**
 * Testes para image-optimizer
 */

import { analyzeImage } from '@/lib/utils/image-optimizer';

describe('image-optimizer', () => {
  it('deve analisar imagem de arquivo', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const result = analyzeImage(file);
    expect(result).toHaveProperty('format');
    expect(result).toHaveProperty('animated');
    expect(result).toHaveProperty('size');
  });

  it('deve analisar imagem de URL', () => {
    const result = analyzeImage('https://example.com/image.jpg');
    expect(result).toHaveProperty('format');
    expect(result).toHaveProperty('animated');
  });

  it('deve detectar formato GIF', () => {
    const result = analyzeImage('https://example.com/image.gif');
    expect(result.format).toBe('gif');
  });

  it('deve detectar formato WebP', () => {
    const result = analyzeImage('https://example.com/image.webp');
    expect(result.format).toBe('webp');
  });
});
