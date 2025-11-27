/**
 * Analytics Hook
 *
 * Hook customizado para tracking de analytics.
 * Facilita uso de analytics em componentes React.
 *
 * Características:
 * - Auto-track de page views
 * - Funções helper para eventos comuns
 * - Type-safe
 * - Fácil integração
 *
 * @fileoverview Custom hook para analytics
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

// ============================================================================
// Monitoring
// ============================================================================

import { analytics, ANALYTICS_EVENTS } from '@/lib/tracking';
import { logger } from '@/lib/tracking';

// ============================================================================
// Types
// ============================================================================

interface UseAnalyticsReturn {
  readonly trackEvent: typeof analytics.track;
  readonly trackPageView: (page: string) => void;
  readonly trackBlogPostView: (postId: string, title: string) => void;
  readonly trackBlogPostLike: (postId: string) => void;
  readonly trackDownloadCV: () => void;
  readonly trackThemeToggle: (theme: string) => void;
  readonly trackContactForm: (success: boolean) => void;
  readonly trackNewsletterSubscribe: (email: string) => void;
  readonly trackExternalLink: (url: string) => void;
}

// ============================================================================
// Main Hook
// ============================================================================

/**
 * Hook de analytics
 *
 * Fornece funções para rastrear eventos de analytics.
 * Auto-rastreia page views na navegação.
 *
 * @returns Funções de tracking
 *
 * @example
 * ```tsx
 * function BlogPost() {
 *   const { trackBlogPostView, trackBlogPostLike } = useAnalytics()
 *
 *   useEffect(() => {
 *     trackBlogPostView('123', 'Título do Post')
 *   }, [])
 *
 *   return (
 *     <button onClick={() => trackBlogPostLike('123')}>
 *       Curtir
 *     </button>
 *   )
 * }
 * ```
 */
export function useAnalytics(): UseAnalyticsReturn {
  const pathname = usePathname();

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Auto-track page views quando rota muda
   */
  useEffect(() => {
    if (pathname) {
      analytics.pageView(pathname);
    }
  }, [pathname]);

  // ============================================================================
  // Callback Functions
  // ============================================================================

  /**
   * Rastreia evento genérico
   */
  const trackEvent = useCallback(analytics.track.bind(analytics), []);

  /**
   * Rastreia visualização de página
   */
  const trackPageView = useCallback((page: string) => {
    analytics.track(ANALYTICS_EVENTS.PAGE_VIEW(page));
  }, []);

  /**
   * Rastreia visualização de post
   */
  const trackBlogPostView = useCallback((postId: string, title: string) => {
    analytics.track(ANALYTICS_EVENTS.BLOG_POST_VIEW(postId, title));
  }, []);

  /**
   * Rastreia curtida de post
   */
  const trackBlogPostLike = useCallback((postId: string) => {
    analytics.track(ANALYTICS_EVENTS.BLOG_POST_LIKE(postId));
  }, []);

  /**
   * Rastreia download de CV
   */
  const trackDownloadCV = useCallback(() => {
    analytics.track(ANALYTICS_EVENTS.DOWNLOAD_CV());
  }, []);

  /**
   * Rastreia alternância de tema
   */
  const trackThemeToggle = useCallback((theme: string) => {
    analytics.track(ANALYTICS_EVENTS.THEME_TOGGLE(theme));
  }, []);

  /**
   * Rastreia submissão de formulário de contato
   */
  const trackContactForm = useCallback((success: boolean) => {
    analytics.track(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT(success));
  }, []);

  /**
   * Rastreia inscrição em newsletter
   */
  const trackNewsletterSubscribe = useCallback((email: string) => {
    analytics.track(ANALYTICS_EVENTS.NEWSLETTER_SUBSCRIBE(email));
  }, []);

  /**
   * Rastreia clique em link externo
   */
  const trackExternalLink = useCallback((url: string) => {
    analytics.track(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK(url));
  }, []);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    trackEvent,
    trackPageView,
    trackBlogPostView,
    trackBlogPostLike,
    trackDownloadCV,
    trackThemeToggle,
    trackContactForm,
    trackNewsletterSubscribe,
    trackExternalLink,
  };
}

// ============================================================================
// Component Wrapper HOC
// ============================================================================

/**
 * HOC para tracking automático de componentes
 *
 * Rastreia montagem e desmontagem de componentes.
 *
 * @param Component - Componente a envolver
 * @param componentName - Nome para tracking
 * @returns Componente envolvido
 *
 * @example
 * ```tsx
 * export default withAnalytics(BlogPage, 'BlogPage')
 * ```
 */
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function AnalyticsWrapper(props: P) {
    useEffect(() => {
      logger.debug(`Componente montado: ${componentName}`);

      return () => {
        logger.debug(`Componente desmontado: ${componentName}`);
      };
    }, []);

    return React.createElement(Component, props);
  };
}

