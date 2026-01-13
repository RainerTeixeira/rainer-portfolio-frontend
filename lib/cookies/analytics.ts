/**
 * Analytics Cookies - Gerenciamento de Analytics
 * 
 * Sistema para gerenciar cookies de analytics conforme consentimento do usuário.
 * 
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { hasConsent } from './cookie-manager';

export interface AnalyticsConfig {
  /** Google Analytics ID */
  gaId?: string;
  /** Debug mode */
  debug?: boolean;
  /** Anonymize IP */
  anonymizeIp?: boolean;
}

/**
 * Inicializa o Google Analytics se houver consentimento
 */
export function initializeAnalytics(config: AnalyticsConfig = {}): void {
  if (!hasConsent('analytics')) {
    console.log('🍪 Analytics desabilitado - sem consentimento');
    return;
  }

  if (!config.gaId) {
    console.warn('⚠️ GA ID não fornecido');
    return;
  }

  // Verificar se gtag já foi carregado
  if (typeof window !== 'undefined' && !(window as any).gtag) {
    // Inserir script do Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaId}`;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    const gtag = function(...args: any[]) {
      window.dataLayer?.push(arguments);
    };
    
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', config.gaId, {
      debug: config.debug || false,
      anonymize_ip: config.anonymizeIp || true,
      cookie_flags: 'SameSite=Lax;Secure'
    });

    console.log('✅ Google Analytics inicializado');
  }
}

/**
 * Envia evento de page view
 */
export function trackPageView(path?: string): void {
  if (!hasConsent('analytics')) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: path || window.location.pathname
    });
  }
}

/**
 * Envia evento customizado
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (!hasConsent('analytics')) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
}

/**
 * Verifica se analytics está disponível
 */
export function isAnalyticsAvailable(): boolean {
  return (
    typeof window !== 'undefined' &&
    hasConsent('analytics') &&
    !!(window as any).gtag
  );
}

/**
 * Limpa cookies de analytics
 */
export function clearAnalyticsCookies(): void {
  if (typeof window === 'undefined') return;

  const cookiesToClear = [
    '_ga',
    '_gid',
    '_gat',
    '_ga_*',
    'analytics_consent'
  ];

  cookiesToClear.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  console.log('🧹 Cookies de analytics limpos');
}
