/**
 * Analytics Integration
 *
 * Integração condicional com serviços de analytics baseada no consentimento de cookies.
 * Carrega Google Analytics e Vercel Analytics apenas se o usuário consentir.
 *
 * @module lib/cookies/analytics
 * @fileoverview Integração de analytics condicional
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { isCookieAllowed } from './cookie-manager';

// ============================================================================
// Google Analytics
// ============================================================================

/**
 * Inicializa Google Analytics se consentido
 */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Verifica se analytics está permitido
  if (!isCookieAllowed('analytics')) {
    return;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) {
    console.warn('Google Analytics ID não configurado');
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
}

/**
 * Track page view no Google Analytics
 */
export function trackPageView(url: string): void {
  if (typeof window === 'undefined') return;
  if (!isCookieAllowed('analytics')) return;
  if (!window.gtag) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
    page_path: url,
  });
}

/**
 * Track event no Google Analytics
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
// Vercel Analytics
// ============================================================================

/**
 * Verifica se Vercel Analytics deve ser carregado
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
