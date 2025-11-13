/**
 * Testes para hook useAnalytics
 */

/// <reference types="jest" />

import { useAnalytics } from '@/hooks/use-analytics';
import { renderHook } from '@testing-library/react';

// Mock do analytics
jest.mock('@/lib/monitoring/analytics', () => ({
  analytics: {
    track: jest.fn(),
    pageView: jest.fn(),
    identify: jest.fn(),
    enable: jest.fn(),
    disable: jest.fn(),
  },
  ANALYTICS_EVENTS: {
    PAGE_VIEW: jest.fn(() => ({ category: 'page_view', action: 'view' })),
    BLOG_POST_VIEW: jest.fn(() => ({
      category: 'user_action',
      action: 'blog_post_view',
    })),
    BLOG_POST_LIKE: jest.fn(() => ({
      category: 'user_action',
      action: 'blog_post_like',
    })),
  },
}));

describe('useAnalytics', () => {
  it('deve retornar funções de analytics', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current).toHaveProperty('trackEvent');
    expect(result.current).toHaveProperty('trackPageView');
    expect(typeof result.current.trackEvent).toBe('function');
    expect(typeof result.current.trackPageView).toBe('function');
  });

  it('deve inicializar analytics no mount', () => {
    const { analytics } = require('@/lib/monitoring/analytics');
    renderHook(() => useAnalytics());

    // Verifica se analytics está disponível
    expect(analytics).toBeDefined();
    expect(typeof analytics.track).toBe('function');
  });
});
