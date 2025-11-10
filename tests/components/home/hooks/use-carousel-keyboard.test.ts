/**
 * Testes para hook useCarouselKeyboard
 */

import { useCarouselKeyboard } from '@/components/home/hooks/use-carousel-keyboard';
import { renderHook } from '@testing-library/react';

describe('useCarouselKeyboard', () => {
  it('deve retornar handlers de teclado', () => {
    const { result } = renderHook(() =>
      useCarouselKeyboard({
        onNext: jest.fn(),
        onPrevious: jest.fn(),
      })
    );
    expect(result.current).toBeDefined();
  });
});
