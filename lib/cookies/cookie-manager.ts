/**
 * Cookie Manager - Gerenciamento de Cookies
 * 
 * Sistema centralizado para gerenciamento de cookies do site,
 * incluindo cookies de analytics, funcionais e de marketing.
 * 
 * @author Rainer Teixeira
 * @version 1.0.0
 */

export interface CookiePreferences {
  /** Cookies analíticos (Google Analytics, etc.) */
  analytics: boolean;
  /** Cookies funcionais (sessão, preferências) */
  functional: boolean;
  /** Cookies de marketing/publicidade */
  marketing: boolean;
  /** Data do consentimento */
  consentDate?: string;
  /** Versão da política de cookies */
  version?: string;
}

export interface CookieCategory {
  id: keyof CookiePreferences;
  name: string;
  description: string;
  required?: boolean;
  cookies: string[];
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'functional',
    name: 'Cookies Funcionais',
    description: 'Essenciais para o funcionamento do site',
    required: true,
    cookies: ['session', 'preferences', 'csrf_token']
  },
  {
    id: 'analytics',
    name: 'Cookies de Análise',
    description: 'Ajuda a entender como os visitantes usam o site',
    cookies: ['_ga', '_gid', '_gat', 'analytics_consent']
  },
  {
    id: 'marketing',
    name: 'Cookies de Marketing',
    description: 'Usados para personalizar anúncios',
    cookies: ['ads_consent', 'personalization']
  }
];

const COOKIE_PREFERENCES_KEY = 'cookie_preferences';
const CONSENT_VERSION = '1.0';

/**
 * Salva as preferências de cookies
 */
export function saveCookiePreferences(preferences: CookiePreferences): void {
  const data = {
    ...preferences,
    consentDate: new Date().toISOString(),
    version: CONSENT_VERSION
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(data));
  }
}

/**
 * Carrega as preferências de cookies
 */
export function loadCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    
    // Verificar versão
    if (data.version !== CONSENT_VERSION) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao carregar preferências de cookies:', error);
    return null;
  }
}

/**
 * Verifica se o usuário deu consentimento para uma categoria
 */
export function hasConsent(category: keyof CookiePreferences): boolean {
  const preferences = loadCookiePreferences();
  return Boolean(preferences?.[category] ?? false);
}

/**
 * Verifica se o usuário já deu consentimento
 */
export function hasGivenConsent(): boolean {
  return loadCookiePreferences() !== null;
}

/**
 * Limpa todas as preferências de cookies
 */
export function clearCookiePreferences(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
  }
}

/**
 * Aceita todos os cookies
 */
export function acceptAllCookies(): void {
  const preferences: CookiePreferences = {
    functional: true,
    analytics: true,
    marketing: true
  };
  saveCookiePreferences(preferences);
}

/**
 * Rejeita todos os cookies exceto os funcionais
 */
export function rejectNonEssentialCookies(): void {
  const preferences: CookiePreferences = {
    functional: true,
    analytics: false,
    marketing: false
  };
  saveCookiePreferences(preferences);
}
