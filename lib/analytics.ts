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

// ============================================================================
// Environment
// ============================================================================

import { env } from './env';
import { logger } from './logger';

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
      env.NEXT_PUBLIC_ENABLE_ANALYTICS && env.NODE_ENV === 'production';
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
 * import { analytics, ANALYTICS_EVENTS } from '@/lib/analytics'
 *
 * // Em componentes
 * analytics.track(ANALYTICS_EVENTS.BLOG_POST_VIEW('123', 'Título'))
 * analytics.pageView('/blog')
 * ```
 */
export const analytics = new Analytics();

/**
 * Export da classe para extensão
 */
export { Analytics };
