/**
 * Cookie Initializer Component
 *
 * Componente que inicializa scripts de analytics baseado no consentimento de cookies.
 * Deve ser renderizado no layout principal após o consentimento.
 *
 * @module components/cookies/cookie-initializer
 * @fileoverview Inicializador de scripts baseado em consentimento
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

// ============================================================================
// React Hooks
// ============================================================================

import { useEffect } from 'react';

// ============================================================================
// Cookie Manager
// ============================================================================

import { useCookieConsent } from '@rainersoft/ui';
import { initGoogleAnalytics, getCookieManager } from '@/lib/privacy';

// ============================================================================
// Main Component
// ============================================================================

/**
 * CookieInitializer Component
 *
 * Inicializa scripts de analytics e outros serviços baseado no consentimento.
 * Renderiza nada, apenas executa side effects.
 *
 * @component
 * @returns {null} Não renderiza nada
 */
export function CookieInitializer() {
  const preferences = useCookieConsent();
  const cookieManager = getCookieManager();

  useEffect(() => {
    // Se há consentimento, carrega scripts
    if (preferences) {
      cookieManager.updatePreferences(preferences);
    } else if (cookieManager.hasConsent()) {
      // Carrega preferências salvas e inicializa scripts
      const savedPreferences = cookieManager.getPreferences();
      if (savedPreferences) {
        cookieManager.updatePreferences(savedPreferences);
      }
    }
  }, [preferences, cookieManager]);

  // Inicializa Google Analytics se permitido
  useEffect(() => {
    if (preferences?.analytics) {
      initGoogleAnalytics();
    }
  }, [preferences?.analytics]);

  return null;
}


