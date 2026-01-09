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

import { initGoogleAnalytics } from '@/lib/tracking';
import { getCookieManager } from '@/lib/privacy';

// ============================================================================
// Cookie Preferences Type
// ============================================================================

interface CookiePreferences {
  analytics?: boolean;
  marketing?: boolean;
  functional?: boolean;
}

// ============================================================================
// Cookie Consent Hook
// ============================================================================

/**
 * Hook que obtém as preferências de cookie do usuário
 */
function useCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('cookie-preferences');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

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
    if (preferences && 
        typeof preferences === 'object' && 
        'essential' in preferences && 
        'performance' in preferences && 
        'functionality' in preferences && 
        'analytics' in preferences) {
      cookieManager.updatePreferences(preferences as CookiePreferences);
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


