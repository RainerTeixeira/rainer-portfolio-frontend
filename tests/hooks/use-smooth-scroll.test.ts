/**
 * Testes para useSmoothScroll hook
 */

import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import * as scrollUtils from '@/lib/scroll-utils';
import { renderHook, waitFor } from '@testing-library/react';

// Mock scroll-utils
jest.mock('@/lib/scroll-utils', () => ({
  prefersReducedMotion: jest.fn(() => false),
  smoothScrollTo: jest.fn(),
  scrollToTop: jest.fn(),
  scrollToPosition: jest.fn(),
  onReducedMotionChange: jest.fn(() => jest.fn()), // Retorna cleanup function
}));

describe('useSmoothScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar funções de scroll e estados', () => {
    const { result } = renderHook(() => useSmoothScroll());

    expect(result.current).toHaveProperty('scrollTo');
    expect(result.current).toHaveProperty('scrollToTop');
    expect(result.current).toHaveProperty('scrollToPosition');
    expect(result.current).toHaveProperty('reducedMotion');
    expect(result.current).toHaveProperty('shouldAnimate');
  });

  it('deve chamar smoothScrollTo quando scrollTo é chamado', () => {
    const { result } = renderHook(() => useSmoothScroll());
    const element = document.createElement('div');

    result.current.scrollTo(element);

    expect(scrollUtils.smoothScrollTo).toHaveBeenCalledWith(element, undefined);
  });

  it('deve chamar scrollToTop quando scrollToTop é chamado', () => {
    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToTop();

    expect(scrollUtils.scrollToTop).toHaveBeenCalled();
  });

  it('deve chamar scrollToPosition quando scrollToPosition é chamado', () => {
    const { result } = renderHook(() => useSmoothScroll());

    result.current.scrollToPosition(100, 50);

    expect(scrollUtils.scrollToPosition).toHaveBeenCalledWith(100, 50);
  });

  it('deve detectar prefers-reduced-motion inicialmente', () => {
    (scrollUtils.prefersReducedMotion as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useSmoothScroll());

    expect(result.current.reducedMotion).toBe(true);
    expect(result.current.shouldAnimate).toBe(false);
  });

  it('deve atualizar quando preferências de movimento mudam', async () => {
    let changeCallback: ((matches: boolean) => void) | null = null;

    (scrollUtils.onReducedMotionChange as jest.Mock).mockImplementation(cb => {
      changeCallback = cb;
      return jest.fn(); // cleanup
    });

    const { result } = renderHook(() => useSmoothScroll());

    // Verificar valor inicial
    expect(typeof result.current.reducedMotion).toBe('boolean');

    // Simular mudança de preferência
    if (changeCallback) {
      changeCallback(true);
    }

    await waitFor(() => {
      expect(result.current.reducedMotion).toBe(true);
      expect(result.current.shouldAnimate).toBe(false);
    });
  });
});
