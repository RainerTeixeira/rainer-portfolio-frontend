/**
 * Analytics System
 *
 * Sistema de rastreamento de eventos para analytics.
 * Centraliza tracking de ações do usuário.
 *
 * Características:
 * - Type-safe events
 * - Fácil integração com GA4, Mixpanel, etc
 * - Desabilitado em desenvolvimento
 * - Events estruturados
 * - Privacy-first
 *
 * @fileoverview Sistema de analytics da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { env } from '@/lib/config/env';
import { logger } from './logger';
import { isCookieAllowed } from '@/lib/privacy/manager';

// ============================================================================
// Types
// ============================================================================

/**
 * Categorias de eventos
 */
type EventCategory =
  | 'page_view'
  | 'user_action'
  | 'navigation'
  | 'form_submission'
  | 'error'
  | 'performance';

/**
 * Propriedades de evento
 */
interface EventProperties {
  readonly [key: string]: string | number | boolean | undefined;
}

/**
 * Evento de analytics
 */
interface AnalyticsEvent {
  readonly category: EventCategory;
  readonly action: string;
  readonly label?: string;
  readonly value?: number;
  readonly properties?: EventProperties;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Eventos predefinidos da aplicação
 */
export const ANALYTICS_EVENTS = {
  // Page Views
  PAGE_VIEW: (page: string) => ({
    category: 'page_view' as const,
    action: 'view',
    label: page,
  }),

  // User Actions
  BLOG_POST_VIEW: (postId: string, title: string) => ({
    category: 'user_action' as const,
    action: 'blog_post_view',
    label: title,
    properties: { postId },
  }),

  BLOG_POST_LIKE: (postId: string) => ({
    category: 'user_action' as const,
    action: 'blog_post_like',
    properties: { postId },
  }),

  DOWNLOAD_CV: () => ({
    category: 'user_action' as const,
    action: 'download_cv',
  }),

  THEME_TOGGLE: (theme: string) => ({
    category: 'user_action' as const,
    action: 'theme_toggle',
    label: theme,
  }),

  // Navigation
  NAVIGATION_CLICK: (destination: string) => ({
    category: 'navigation' as const,
    action: 'click',
    label: destination,
  }),

  EXTERNAL_LINK_CLICK: (url: string) => ({
    category: 'navigation' as const,
    action: 'external_link',
    label: url,
  }),

  // Form Submissions
  CONTACT_FORM_SUBMIT: (success: boolean) => ({
    category: 'form_submission' as const,
    action: 'contact_form',
    label: success ? 'success' : 'failure',
  }),

  NEWSLETTER_SUBSCRIBE: (email: string) => ({
    category: 'form_submission' as const,
    action: 'newsletter_subscribe',
    properties: { email },
  }),

  LOGIN_ATTEMPT: (success: boolean) => ({
    category: 'form_submission' as const,
    action: 'login',
    label: success ? 'success' : 'failure',
  }),

  // Errors
  ERROR_OCCURRED: (errorMessage: string, component?: string) => ({
    category: 'error' as const,
    action: 'error_caught',
    label: errorMessage,
    properties: { component },
  }),

  // Performance
  PAGE_LOAD_TIME: (page: string, timeMs: number) => ({
    category: 'performance' as const,
    action: 'page_load',
    label: page,
    value: timeMs,
  }),
} as const;

// ============================================================================
// Analytics Class
// ============================================================================

/**
 * Classe principal de Analytics
 */
class Analytics {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled =
      !!env.NEXT_PUBLIC_ENABLE_ANALYTICS && 
      env.NEXT_PUBLIC_ENV === 'production' &&
      isCookieAllowed('analytics');
  }

  /**
   * Rastreia evento
   *
   * @param event - Evento a rastrear
   *
   * @example
   * ```tsx
   * analytics.track(ANALYTICS_EVENTS.PAGE_VIEW('/blog'))
   * ```
   */
  track(event: AnalyticsEvent): void {
    // Verificar consentimento em tempo real
    if (!isCookieAllowed('analytics')) {
      logger.debug('Analytics bloqueado por consentimento:', { event });
      return;
    }

    if (!this.isEnabled) {
      logger.debug('Analytics event (desabilitado):', { event });
      return;
    }

    try {
      // Google Analytics 4
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-expect-error - gtag é injetado globalmente
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.properties,
        });
      }

      // Plausible Analytics (alternativa privacy-first)
      if (typeof window !== 'undefined' && 'plausible' in window) {
        // @ts-expect-error - plausible é injetado globalmente
        window.plausible(event.action, {
          props: {
            category: event.category,
            label: event.label,
            ...event.properties,
          },
        });
      }

      logger.debug('Analytics event tracked:', { event });
    } catch (error) {
      logger.error('Erro ao rastrear evento de analytics', error, { event });
    }
  }

  /**
   * Rastreia page view
   *
   * @param page - URL da página
   */
  pageView(page: string): void {
    this.track(ANALYTICS_EVENTS.PAGE_VIEW(page));
  }

  /**
   * Identifica usuário (para analytics avançado)
   *
   * @param userId - ID do usuário
   * @param properties - Propriedades do usuário
   */
  identify(userId: string, properties?: EventProperties): void {
    if (!this.isEnabled) return;

    try {
      // Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-expect-error - gtag é injetado globalmente
        window.gtag('set', { user_id: userId, ...properties });
      }

      logger.debug('User identified:', { userId, properties });
    } catch (error) {
      logger.error('Erro ao identificar usuário no analytics', error);
    }
  }

  /**
   * Habilita analytics manualmente
   */
  enable(): void {
    this.isEnabled = true;
    logger.info('Analytics habilitado');
  }

  /**
   * Desabilita analytics (GDPR compliance)
   */
  disable(): void {
    this.isEnabled = false;
    logger.info('Analytics desabilitado');
  }
}

// ============================================================================
// Export
// ============================================================================

/**
 * Instância singleton do analytics
 *
 * @example
 * ```tsx
 * import { analytics, ANALYTICS_EVENTS } from '@/lib/tracking/analytics'
 *
 * analytics.track(ANALYTICS_EVENTS.BLOG_POST_VIEW('123', 'Título'))
 * analytics.pageView('/blog')
 * ```
 */
export const analytics = new Analytics();

// ============================================================================
// Google Analytics Integration (Privacy-First)
// ============================================================================

/**
 * Inicializa Google Analytics se consentido
 * Função migrada de lib/privacy/analytics.ts
 */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Verifica se analytics está permitido
  if (!isCookieAllowed('analytics')) {
    logger.debug('Google Analytics bloqueado por consentimento');
    return;
  }

  const gaId = env.NEXT_PUBLIC_GA_ID;
  if (!gaId) {
    if (env.NEXT_PUBLIC_ENV === 'production') {
      logger.warn('Google Analytics ID não configurado');
    }
    return;
  }

  // Verifica se já foi inicializado
  if (window.gtag) {
    return;
  }

  // Carrega script do Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script1);

  // Inicializa Google Analytics
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      anonymize_ip: true,
      respect_dnt: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  `;
  document.head.appendChild(script2);

  logger.info('Google Analytics inicializado');
}

/**
 * Track page view no Google Analytics (legado)
 * Função migrada de lib/privacy/analytics.ts
 */
export function trackPageView(url: string): void {
  if (typeof window === 'undefined') return;
  if (!isCookieAllowed('analytics')) return;
  if (!window.gtag) return;

  window.gtag('config', env.NEXT_PUBLIC_GA_ID || '', {
    page_path: url,
  });
}

/**
 * Track event no Google Analytics (legado)
 * Função migrada de lib/privacy/analytics.ts
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === 'undefined') return;
  if (!isCookieAllowed('analytics')) return;
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// ============================================================================
// Vercel Analytics Integration
// ============================================================================

/**
 * Verifica se Vercel Analytics deve ser carregado
 * Função migrada de lib/privacy/analytics.ts
 */
export function shouldLoadVercelAnalytics(): boolean {
  return isCookieAllowed('analytics');
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

/**
 * Export da classe para extensão
 */
export { Analytics };
