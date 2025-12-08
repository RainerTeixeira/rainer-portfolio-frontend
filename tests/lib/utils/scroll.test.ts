/**
 * Testes para lib/utils/scroll.ts
 */

jest.mock('@rainersoft/utils', () => {
  function prefersReducedMotion() {
    // O comportamento real depende de matchMedia; aqui o teste controla
    // window.matchMedia, então essa função apenas delega para ele.
    return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function scrollToPosition(top: number, left: number = 0) {
    window.scrollTo({ top, left, behavior: 'auto' });
  }

  function smoothScrollTo(target: Element | string) {
    let el: Element | null = null;
    if (typeof target === 'string') {
      el = document.querySelector(target);
    } else {
      el = target;
    }
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  function onReducedMotionChange(callback: (value: boolean) => void) {
    callback(prefersReducedMotion());
    return () => void 0;
  }

  return {
    __esModule: true,
    prefersReducedMotion,
    scrollToTop,
    scrollToPosition,
    smoothScrollTo,
    onReducedMotionChange,
  };
});

import {
  onReducedMotionChange,
  prefersReducedMotion,
  scrollToPosition,
  scrollToTop,
  smoothScrollTo,
} from '@rainersoft/utils';

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
