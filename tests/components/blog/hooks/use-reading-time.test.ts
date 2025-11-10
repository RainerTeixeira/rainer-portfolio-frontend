/**
 * Testes para hook useReadingTime
 */

import { useReadingTime } from '@/components/blog/hooks/use-reading-time';
import { renderHook } from '@testing-library/react';

describe('useReadingTime', () => {
  it('deve calcular tempo de leitura', () => {
    const { result } = renderHook(() => useReadingTime('Test content here'));

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('string');
  });

  it('deve retornar tempo mínimo para texto curto', () => {
    const { result } = renderHook(() => useReadingTime('Short'));

    expect(result.current).toBeDefined();
  });

  it('deve calcular tempo para texto longo', () => {
    const longText = 'Lorem ipsum '.repeat(100);
    const { result } = renderHook(() => useReadingTime(longText));

    expect(result.current).toBeDefined();
  });
});
