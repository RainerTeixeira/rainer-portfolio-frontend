/**
 * Testes para lib/cookies/cookie-manager.ts
 */

import {
  COOKIE_CONSENT_KEY,
  COOKIE_PREFERENCES_KEY,
  COOKIE_VERSION,
  CookieManager,
  getCookieManager,
  getCookiePreferences,
  hasCookieConsent,
  isCookieAllowed,
  saveCookieConsent,
  type CookieConsent,
  type CookiePreferences,
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

// Mock do window
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock do window.dispatchEvent
const dispatchEventMock = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: dispatchEventMock,
  writable: true,
});

// Mock do document
const documentMock = {
  cookie: '',
  querySelectorAll: jest.fn(() => []),
};
Object.defineProperty(window, 'document', {
  value: documentMock,
  writable: true,
});

describe('CookieManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    documentMock.cookie = '';
    dispatchEventMock.mockClear();
    // Reset singleton instance
    (CookieManager as any).instance = undefined;
  });

  describe('getInstance', () => {
    it('deve retornar a mesma instância (singleton)', () => {
      const instance1 = CookieManager.getInstance();
      const instance2 = CookieManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('hasConsent', () => {
    it('deve retornar false quando não há consentimento salvo', () => {
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(false);
    });

    it('deve retornar true quando há consentimento salvo', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      const consent: CookieConsent = {
        version: COOKIE_VERSION,
        consented: true,
        timestamp: Date.now(),
        preferences,
      };

      localStorageMock.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(true);
    });

    it('deve retornar false quando consentimento é inválido', () => {
      localStorageMock.setItem(COOKIE_CONSENT_KEY, 'invalid-json');

      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(false);
    });
  });

  describe('getPreferences', () => {
    it('deve retornar null quando não há preferências salvas', () => {
      const manager = getCookieManager();
      expect(manager.getPreferences()).toBeNull();
    });

    it('deve retornar preferências salvas', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: true,
        analytics: false,
      };

      const consent: CookieConsent = {
        version: COOKIE_VERSION,
        consented: true,
        timestamp: Date.now(),
        preferences,
      };

      localStorageMock.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

      const manager = getCookieManager();
      const result = manager.getPreferences();

      expect(result).toEqual(preferences);
    });

    it('deve retornar null quando JSON é inválido', () => {
      localStorageMock.setItem(COOKIE_CONSENT_KEY, 'invalid-json');

      const manager = getCookieManager();
      expect(manager.getPreferences()).toBeNull();
    });
  });

  describe('saveConsent', () => {
    it('deve salvar consentimento no localStorage', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY,
        expect.any(String)
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        COOKIE_PREFERENCES_KEY,
        JSON.stringify(preferences)
      );
    });

    it('deve disparar evento cookie-consent-updated', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);

      expect(dispatchEventMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'cookie-consent-updated',
          detail: preferences,
        })
      );
    });

    it('deve salvar timestamp e versão', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);

      const savedConsent = JSON.parse(
        localStorageMock.getItem(COOKIE_CONSENT_KEY) || '{}'
      );

      expect(savedConsent.version).toBe(COOKIE_VERSION);
      expect(savedConsent.consented).toBe(true);
      expect(savedConsent.timestamp).toBeGreaterThan(0);
      expect(savedConsent.preferences).toEqual(preferences);
    });
  });

  describe('updatePreferences', () => {
    it('deve atualizar preferências existentes', () => {
      const initialPreferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      const manager = getCookieManager();
      manager.saveConsent(initialPreferences);

      const newPreferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      manager.updatePreferences(newPreferences);

      const updated = manager.getPreferences();
      expect(updated).toEqual(newPreferences);
    });
  });

  describe('revokeConsent', () => {
    it('deve remover consentimento do localStorage', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);
      manager.revokeConsent();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        COOKIE_PREFERENCES_KEY
      );
    });

    it('deve disparar evento cookie-consent-revoked', () => {
      const manager = getCookieManager();
      manager.revokeConsent();

      expect(dispatchEventMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'cookie-consent-revoked',
        })
      );
    });
  });

  describe('isAllowed', () => {
    it('deve retornar true para cookies essenciais quando há consentimento', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);

      expect(manager.isAllowed('essential')).toBe(true);
    });

    it('deve retornar false para cookies não permitidos', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);

      expect(manager.isAllowed('analytics')).toBe(false);
    });

    it('deve retornar true para cookies permitidos', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      const manager = getCookieManager();
      manager.saveConsent(preferences);

      expect(manager.isAllowed('analytics')).toBe(true);
      expect(manager.isAllowed('performance')).toBe(true);
      expect(manager.isAllowed('functionality')).toBe(true);
    });

    it('deve retornar false quando não há consentimento', () => {
      const manager = getCookieManager();
      expect(manager.isAllowed('analytics')).toBe(false);
    });
  });
});

describe('Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    (CookieManager as any).instance = undefined;
  });

  describe('getCookieManager', () => {
    it('deve retornar instância do CookieManager', () => {
      const manager = getCookieManager();
      expect(manager).toBeInstanceOf(CookieManager);
    });
  });

  describe('hasCookieConsent', () => {
    it('deve retornar false quando não há consentimento', () => {
      expect(hasCookieConsent()).toBe(false);
    });

    it('deve retornar true quando há consentimento', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      expect(hasCookieConsent()).toBe(true);
    });
  });

  describe('getCookiePreferences', () => {
    it('deve retornar null quando não há preferências', () => {
      expect(getCookiePreferences()).toBeNull();
    });

    it('deve retornar preferências salvas', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: true,
        analytics: false,
      };

      saveCookieConsent(preferences);
      expect(getCookiePreferences()).toEqual(preferences);
    });
  });

  describe('saveCookieConsent', () => {
    it('deve salvar preferências', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      expect(hasCookieConsent()).toBe(true);
      expect(getCookiePreferences()).toEqual(preferences);
    });
  });

  describe('isCookieAllowed', () => {
    it('deve retornar false quando não há consentimento', () => {
      expect(isCookieAllowed('analytics')).toBe(false);
    });

    it('deve retornar true quando cookie é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: true,
        functionality: true,
        analytics: true,
      };

      saveCookieConsent(preferences);
      expect(isCookieAllowed('analytics')).toBe(true);
    });

    it('deve retornar false quando cookie não é permitido', () => {
      const preferences: CookiePreferences = {
        essential: true,
        performance: false,
        functionality: false,
        analytics: false,
      };

      saveCookieConsent(preferences);
      expect(isCookieAllowed('analytics')).toBe(false);
    });
  });
});
