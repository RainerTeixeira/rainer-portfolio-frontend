/**
 * Testes para função calculateReadingTime
 *
 * Nota: O hook useReadingTime não existe, mas a função calculateReadingTime existe em lib/content/reading-time.ts
 */

import { calculateReadingTime } from '@/lib/content/reading-time';

describe('calculateReadingTime', () => {
  it('deve calcular tempo de leitura', () => {
    const result = calculateReadingTime('Test content here');

    expect(result).toBeDefined();
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  it('deve retornar tempo mínimo para texto curto', () => {
    const result = calculateReadingTime('Short');

    expect(result).toBeDefined();
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('deve calcular tempo para texto longo', () => {
    const longText = 'Lorem ipsum '.repeat(100);
    const result = calculateReadingTime(longText);

    expect(result).toBeDefined();
    expect(result).toBeGreaterThanOrEqual(1);
  });
});
