/**
 * Testes de integração para sistema de cookies
 *
 * Testa o fluxo completo do sistema de cookies, incluindo
 * banner, configurações, persistência e integração com analytics.
 */

import {
  initGoogleAnalytics,
  trackEvent,
  trackPageView,
} from '@/lib/cookies/analytics';
import type { CookiePreferences } from '@/lib/cookies/cookie-manager';
import {
  CookieManager,
  getCookieManager,
  isCookieAllowed,
  saveCookieConsent,
} from '@/lib/cookies/cookie-manager';

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock do window.gtag
const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  writable: true,
  value: mockGtag,
  configurable: true,
});

// Mock parcial do document: espiona criação de scripts sem sobrescrever window.document inteiro
const mockScripts: HTMLScriptElement[] = [];
const originalCreateElement = document.createElement.bind(document);

const createElementMock = jest
  .spyOn(document, 'createElement')
  .mockImplementation((tag: any) => {
    if (tag === 'script') {
      const script = originalCreateElement('script') as HTMLScriptElement;
      mockScripts.push(script);
      return script;
    }
    return originalCreateElement(tag);
  });

const appendChildMock = jest
  .spyOn(document.head, 'appendChild')
  .mockImplementation((node: any) => {
    if (node && (node as HTMLElement).tagName === 'SCRIPT') {
      mockScripts.push(node as HTMLScriptElement);
    }
    // chama implementação original
    return (HTMLHeadElement.prototype.appendChild as any).call(
      document.head,
      node,
    );
  });

// Mock do process.env
const originalEnv = process.env;

describe('Cookie System Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    mockGtag.mockClear();
    mockScripts.length = 0;
    (CookieManager as any).instance = undefined;
    (window as any).gtag = undefined;
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  afterAll(() => {
    createElementMock.mockRestore();
    appendChildMock.mockRestore();
  });

  describe('Fluxo completo de consentimento', () => {
    it('deve completar fluxo: sem consentimento -> banner -> aceitar -> analytics ativo', () => {
      // 1. Estado inicial: sem consentimento
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(false);
      expect(manager.getPreferences()).toBeNull();

      // 2. Usuário aceita todos os cookies
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);

      // 3. Verifica consentimento salvo
      expect(manager.hasConsent()).toBe(true);
      expect(manager.getPreferences()).toEqual(preferences);

      // 4. Verifica permissões
      expect(isCookieAllowed('essential')).toBe(true);
      expect(isCookieAllowed('analytics')).toBe(true);
      expect(isCookieAllowed('performance')).toBe(true);
      expect(isCookieAllowed('functionality')).toBe(true);
    });

    it('deve completar fluxo: rejeitar opcionais -> apenas essenciais ativos', () => {
      // 1. Estado inicial
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(false);

      // 2. Usuário rejeita cookies opcionais
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);

      // 3. Verifica permissões
      expect(isCookieAllowed('essential')).toBe(true);
      expect(isCookieAllowed('analytics')).toBe(false);
      expect(isCookieAllowed('performance')).toBe(false);
      expect(isCookieAllowed('functionality')).toBe(false);
    });

    it('deve completar fluxo: personalizar -> salvar preferências específicas', () => {
      // 1. Estado inicial
      const manager = getCookieManager();

      // 2. Usuário personaliza preferências
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: false,
        analytics: true,
      };

      saveCookieConsent(preferences);

      // 3. Verifica permissões específicas
      expect(isCookieAllowed('essential')).toBe(true);
      expect(isCookieAllowed('performance')).toBe(true);
      expect(isCookieAllowed('functionality')).toBe(false);
      expect(isCookieAllowed('analytics')).toBe(true);
    });
  });

  describe('Integração com Analytics', () => {
    it('deve carregar Google Analytics quando analytics é permitido', () => {
      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';

      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      initGoogleAnalytics();

      expect(createElementMock).toHaveBeenCalled();
      expect(mockScripts.length).toBeGreaterThan(0);
    });

    it('não deve carregar Google Analytics quando analytics não é permitido', () => {
      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';

      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);
      initGoogleAnalytics();

      // Não deve criar scripts
      expect(mockScripts.length).toBe(0);
    });

    it('deve rastrear page view quando analytics é permitido', () => {
      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';

      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

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

    it('não deve rastrear page view quando analytics não é permitido', () => {
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

    it('deve rastrear eventos quando analytics é permitido', () => {
      process.env.NEXT_PUBLIC_GA_ID = 'GA-123456789';

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
  });

  describe('Persistência e recuperação', () => {
    it('deve persistir preferências entre sessões', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      // Salva preferências
      saveCookieConsent(preferences);

      // Simula nova instância (como se fosse um reload)
      (CookieManager as any).instance = undefined;

      // Recupera preferências
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(true);
      expect(manager.getPreferences()).toEqual(preferences);
    });

    it('deve atualizar preferências existentes', () => {
      const initialPreferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(initialPreferences);

      const newPreferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(newPreferences);

      const manager = getCookieManager();
      expect(manager.getPreferences()).toEqual(newPreferences);
    });

    it('deve revogar consentimento e limpar preferências', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);

      const manager = getCookieManager();
      manager.revokeConsent();

      expect(manager.hasConsent()).toBe(false);
      expect(manager.getPreferences()).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('deve lidar com JSON inválido no localStorage', () => {
      localStorageMock.setItem('cookie-consent', 'invalid-json');

      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(false);
      expect(manager.getPreferences()).toBeNull();
    });

    it('deve lidar com preferências faltando no consentimento', () => {
      const invalidConsent = {
        version: '1.0.0',
        consented: true,
        timestamp: Date.now(),
        // preferences faltando
      };

      localStorageMock.setItem(
        'cookie-consent',
        JSON.stringify(invalidConsent)
      );

      const manager = getCookieManager();
      expect(manager.getPreferences()).toBeNull();
    });

    it('deve sempre permitir cookies essenciais quando há consentimento', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);

      expect(isCookieAllowed('essential')).toBe(true);
    });

    it('deve retornar false para qualquer cookie quando não há consentimento', () => {
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(false);

      expect(isCookieAllowed('essential')).toBe(false);
      expect(isCookieAllowed('analytics')).toBe(false);
      expect(isCookieAllowed('performance')).toBe(false);
      expect(isCookieAllowed('functionality')).toBe(false);
    });
  });
});
