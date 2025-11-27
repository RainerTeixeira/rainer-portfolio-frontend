/**
 * Cookie Manager
 *
 * Sistema profissional de gerenciamento de cookies.
 * Gerencia consentimento, carrega scripts condicionalmente e
 * fornece API para outros componentes.
 *
 * @module lib/cookies/cookie-manager
 * @fileoverview Sistema de gerenciamento de cookies profissional
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

// ============================================================================
// Constants
// ============================================================================

export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';
export const COOKIE_VERSION = '1.0.0';

// ============================================================================
// Types
// ============================================================================

export interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functionality: boolean;
  analytics: boolean;
}

export interface CookieConsent {
  version: string;
  consented: boolean;
  timestamp: number;
  preferences: CookiePreferences;
}

// ============================================================================
// Cookie Manager Class
// ============================================================================

/**
 * CookieManager
 *
 * Classe singleton para gerenciar cookies e consentimento.
 * Fornece métodos para salvar, carregar e gerenciar preferências de cookies.
 */
export class CookieManager {
  private static instance: CookieManager;

  private constructor() {
    // Singleton pattern
  }

  /**
   * Obtém instância única do CookieManager
   */
  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  /**
   * Verifica se há consentimento salvo
   */
  public hasConsent(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) return false;

      const consentData: CookieConsent = JSON.parse(consent);
      return consentData.consented === true;
    } catch (error) {
      console.error('Erro ao verificar consentimento:', error);
      return false;
    }
  }

  /**
   * Obtém preferências de cookies salvas
   */
  public getPreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) return null;

      const consentData: CookieConsent = JSON.parse(consent);
      return consentData.preferences || null;
    } catch (error) {
      console.error('Erro ao obter preferências:', error);
      return null;
    }
  }

  /**
   * Salva consentimento e preferências
   */
  public saveConsent(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return;

    try {
      const consent: CookieConsent = {
        version: COOKIE_VERSION,
        consented: true,
        timestamp: Date.now(),
        preferences,
      };

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));

      // Dispara evento customizado
      window.dispatchEvent(
        new CustomEvent('cookie-consent-updated', { detail: preferences })
      );

      // Carrega scripts baseados no consentimento
      this.loadScripts(preferences);
    } catch (error) {
      console.error('Erro ao salvar consentimento:', error);
    }
  }

  /**
   * Atualiza preferências de cookies
   */
  public updatePreferences(preferences: CookiePreferences): void {
    this.saveConsent(preferences);
  }

  /**
   * Revoga consentimento (remove todas as preferências)
   */
  public revokeConsent(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);

      // Remove cookies de analytics
      this.clearAnalyticsCookies();

      // Dispara evento
      window.dispatchEvent(
        new CustomEvent('cookie-consent-revoked', { detail: null })
      );
    } catch (error) {
      console.error('Erro ao revogar consentimento:', error);
    }
  }

  /**
   * Verifica se um tipo específico de cookie está permitido
   */
  public isAllowed(type: keyof CookiePreferences): boolean {
    const preferences = this.getPreferences();
    if (!preferences) return false;

    // Cookies essenciais são sempre permitidos se há consentimento
    if (type === 'essential') {
      return preferences.essential === true;
    }

    return preferences[type] === true;
  }

  /**
   * Carrega scripts baseados no consentimento
   */
  private loadScripts(preferences: CookiePreferences): void {
    // Analytics
    if (preferences.analytics) {
      this.loadGoogleAnalytics();
    } else {
      this.unloadGoogleAnalytics();
    }

    // Performance (pode incluir outros serviços)
    if (preferences.performance) {
      // Carregar scripts de performance se necessário
    }

    // Funcionalidade
    if (preferences.functionality) {
      // Carregar scripts de funcionalidade se necessário
    }
  }

  /**
   * Carrega Google Analytics condicionalmente
   * Nota: A inicialização real é feita pelo componente CookieInitializer
   * usando a função initGoogleAnalytics do módulo analytics.ts
   */
  private loadGoogleAnalytics(): void {
    // A inicialização é feita pelo CookieInitializer
    // Este método existe para compatibilidade
  }

  /**
   * Remove Google Analytics
   */
  private unloadGoogleAnalytics(): void {
    // Remove scripts do Google Analytics
    const scripts = document.querySelectorAll(
      'script[src*="googletagmanager.com"], script[src*="google-analytics.com"]'
    );
    scripts.forEach(script => script.remove());

    // Remove cookies do Google Analytics
    this.clearAnalyticsCookies();

    // Limpa dataLayer
    if (window.dataLayer) {
      window.dataLayer = [];
    }

    // Remove função gtag
    if (window.gtag) {
      delete window.gtag;
    }
  }

  /**
   * Remove cookies de analytics
   */
  private clearAnalyticsCookies(): void {
    if (typeof document === 'undefined') return;

    // Lista de cookies do Google Analytics para remover
    const analyticsCookies = [
      '_ga',
      '_ga_*',
      '_gid',
      '_gat',
      '_gat_gtag_*',
      '__utma',
      '__utmt',
      '__utmb',
      '__utmc',
      '__utmz',
      '__utmv',
    ];

    // Remove cookies do domínio atual
    analyticsCookies.forEach(cookieName => {
      // Remove cookie exato
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      // Remove cookie com wildcard
      if (cookieName.includes('*')) {
        const baseName = cookieName.replace('*', '');
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
          const parts = cookie.split('=');
          if (parts.length === 0) return;
          const name = parts[0]?.trim();
          if (!name || !name.startsWith(baseName)) return;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          // Também tenta remover para subdomínios
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        });
      }
    });
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Obtém instância do CookieManager
 */
export function getCookieManager(): CookieManager {
  return CookieManager.getInstance();
}

/**
 * Verifica se há consentimento
 */
export function hasCookieConsent(): boolean {
  return getCookieManager().hasConsent();
}

/**
 * Obtém preferências de cookies
 */
export function getCookiePreferences(): CookiePreferences | null {
  return getCookieManager().getPreferences();
}

/**
 * Salva consentimento
 */
export function saveCookieConsent(preferences: CookiePreferences): void {
  getCookieManager().saveConsent(preferences);
}

/**
 * Verifica se um tipo de cookie está permitido
 */
export function isCookieAllowed(type: keyof CookiePreferences): boolean {
  return getCookieManager().isAllowed(type);
}

// ============================================================================
// Window Type Extensions
// ============================================================================

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
