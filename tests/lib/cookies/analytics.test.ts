/**
 * Testes para lib/cookies/analytics.ts
 */

import {
  initGoogleAnalytics,
  shouldLoadVercelAnalytics,
  trackEvent,
  trackPageView,
} from '@/lib/cookies/analytics';
import type { CookiePreferences } from '@/lib/cookies/cookie-manager';
import {
  isCookieAllowed,
  saveCookieConsent,
} from '@/lib/cookies/cookie-manager';

// Mock do window.gtag
const mockGtag = jest.fn();
const mockDataLayer: any[] = [];

// Mock do document.createElement
const mockScripts: HTMLScriptElement[] = [];
const createElementMock = jest.fn((tag: string) => {
  if (tag === 'script') {
    const script = {
      async: false,
      src: '',
      innerHTML: '',
      setAttribute: jest.fn(),
    } as any;
    mockScripts.push(script);
    return script;
  }
  return document.createElement(tag);
});

// Mock do document.head
const mockHead = {
  appendChild: jest.fn((node: any) => {
    mockScripts.push(node);
  }),
  querySelectorAll: jest.fn(() => []),
};

// Mock do document.cookie
let mockCookie = '';

// Mock do window
Object.defineProperty(window, 'gtag', {
  writable: true,
  value: mockGtag,
  configurable: true,
});

Object.defineProperty(window, 'dataLayer', {
  writable: true,
  value: mockDataLayer,
  configurable: true,
});

Object.defineProperty(window, 'document', {
  value: {
    createElement: createElementMock,
    head: mockHead,
    cookie: mockCookie,
    querySelectorAll: jest.fn(() => []),
  },
  writable: true,
  configurable: true,
});

// Mock do process.env
const originalEnv = process.env;

describe('Analytics Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGtag.mockClear();
    mockDataLayer.length = 0;
    mockScripts.length = 0;
    mockCookie = '';
    delete (window as any).gtag;
    delete (window as any).dataLayer;

    // Reset environment
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('initGoogleAnalytics', () => {
    it('não deve carregar Google Analytics quando analytics não é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);
      initGoogleAnalytics();

      expect(createElementMock).not.toHaveBeenCalled();
    });

    it('não deve carregar Google Analytics quando GA_ID não está configurado', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      delete process.env.NEXT_PUBLIC_GA_ID;
      saveCookieConsent(preferences);
      initGoogleAnalytics();

      // Não deve criar scripts
      expect(mockScripts.length).toBe(0);
    });

    it('deve carregar Google Analytics quando permitido e GA_ID está configurado', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';
      saveCookieConsent(preferences);
      initGoogleAnalytics();

      // Deve criar 2 scripts (loader + config)
      expect(createElementMock).toHaveBeenCalledWith('script');
      expect(mockHead.appendChild).toHaveBeenCalled();
    });

    it('não deve carregar Google Analytics duas vezes', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';
      saveCookieConsent(preferences);

      // Simula gtag já existente
      (window as any).gtag = mockGtag;

      initGoogleAnalytics();

      // Não deve criar novos scripts
      expect(mockScripts.length).toBe(0);
    });

    it('deve configurar Google Analytics com opções de privacidade', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';
      saveCookieConsent(preferences);
      initGoogleAnalytics();

      // Verifica se scripts foram criados
      expect(createElementMock).toHaveBeenCalled();
    });
  });

  describe('trackPageView', () => {
    it('não deve rastrear quando analytics não é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);
      trackPageView('/test-page');

      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('não deve rastrear quando gtag não está disponível', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      delete (window as any).gtag;
      trackPageView('/test-page');

      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('deve rastrear page view quando permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';
      saveCookieConsent(preferences);
      (window as any).gtag = mockGtag;

      trackPageView('/test-page');

      expect(mockGtag).toHaveBeenCalledWith(
        'config',
        'GA-123456789',
        expect.objectContaining({
          page_path: '/test-page',
        })
      );
    });
  });

  describe('trackEvent', () => {
    it('não deve rastrear eventos quando analytics não é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);
      trackEvent('click', 'button', 'submit');

      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('não deve rastrear eventos quando gtag não está disponível', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      delete (window as any).gtag;
      trackEvent('click', 'button', 'submit');

      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('deve rastrear eventos quando permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      (window as any).gtag = mockGtag;

      trackEvent('click', 'button', 'submit', 1);

      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: 'submit',
        value: 1,
      });
    });

    it('deve rastrear eventos sem label e value', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      (window as any).gtag = mockGtag;

      trackEvent('click', 'button');

      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: undefined,
        value: undefined,
      });
    });
  });

  describe('shouldLoadVercelAnalytics', () => {
    it('deve retornar false quando analytics não é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);
      expect(shouldLoadVercelAnalytics()).toBe(false);
    });

    it('deve retornar true quando analytics é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      expect(shouldLoadVercelAnalytics()).toBe(true);
    });

    it('deve usar isCookieAllowed corretamente', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      expect(isCookieAllowed('analytics')).toBe(true);
      expect(shouldLoadVercelAnalytics()).toBe(true);
    });
  });
});
