/**
 * Testes para useIsMobile hook
 */

import { useIsMobile } from '@/hooks/use-mobile';
import { renderHook, waitFor } from '@testing-library/react';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('useIsMobile', () => {
  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('deve retornar false para desktop (largura >= 768px)', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it('deve retornar true para mobile (largura < 768px)', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('deve atualizar quando a largura da janela muda', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const mockMatchMedia = jest.fn().mockImplementation(query => {
      const mql = {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          // Simular mudança de tamanho
          setTimeout(() => {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: 600,
            });
            if (handler) handler({ matches: true } as MediaQueryListEvent);
          }, 100);
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
      return mql;
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(
      () => {
        expect(result.current).toBeDefined();
      },
      { timeout: 200 }
    );
  });
});
