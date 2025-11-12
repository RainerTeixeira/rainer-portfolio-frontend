/**
 * Testes para lib/utils/scroll.ts
 */

import {
  onReducedMotionChange,
  prefersReducedMotion,
  scrollToPosition,
  scrollToTop,
  smoothScrollTo,
} from '@/lib/utils/scroll';

// Mock window.matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('lib/utils/scroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    // Mock Element.scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  describe('prefersReducedMotion', () => {
    it('deve retornar false quando prefers-reduced-motion não está ativo', () => {
      mockMatchMedia.mockReturnValue({
        matches: false,
      });

      expect(prefersReducedMotion()).toBe(false);
    });

    it('deve retornar true quando prefers-reduced-motion está ativo', () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
      });

      expect(prefersReducedMotion()).toBe(true);
    });
  });

  describe('scrollToTop', () => {
    it('deve chamar window.scrollTo', () => {
      scrollToTop();
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe('scrollToPosition', () => {
    it('deve chamar window.scrollTo com posição', () => {
      scrollToPosition(100, 50);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        left: 50,
        behavior: 'auto',
      });
    });

    it('deve usar left 0 quando não fornecido', () => {
      scrollToPosition(100);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        left: 0,
        behavior: 'auto',
      });
    });
  });

  describe('smoothScrollTo', () => {
    it('deve chamar scrollIntoView quando elemento é fornecido', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      smoothScrollTo(element);

      expect(element.scrollIntoView).toHaveBeenCalled();
    });

    it('deve buscar elemento por seletor quando string é fornecida', () => {
      const element = document.createElement('div');
      element.id = 'test-element';
      document.body.appendChild(element);

      smoothScrollTo('#test-element');

      expect(element.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('onReducedMotionChange', () => {
    it('deve retornar função de cleanup', () => {
      const cleanup = onReducedMotionChange(() => {});
      expect(typeof cleanup).toBe('function');
    });
  });
});

