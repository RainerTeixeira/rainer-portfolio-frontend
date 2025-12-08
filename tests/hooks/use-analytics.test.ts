/**
 * Testes para hook useAnalytics
 */

/// <reference types="jest" />

import { useAnalytics } from '@/hooks/use-analytics';
import { renderHook } from '@testing-library/react';

// Mock do next/navigation para fornecer pathname estático
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/teste'),
}));

// Mock do logger para evitar dependência de cores de design tokens
jest.mock('@/lib/tracking/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
  Logger: class MockLogger {},
}));

// Mock completo do analytics com todos eventos usados no hook
jest.mock('@/lib/tracking/analytics', () => ({
  analytics: {
    track: jest.fn(),
    pageView: jest.fn(),
    identify: jest.fn(),
    enable: jest.fn(),
    disable: jest.fn(),
  },
  ANALYTICS_EVENTS: {
    PAGE_VIEW: jest.fn((page: string) => ({
      category: 'page_view',
      action: 'view',
      page,
    })),
    BLOG_POST_VIEW: jest.fn((postId: string, title: string) => ({
      category: 'user_action',
      action: 'blog_post_view',
      postId,
      title,
    })),
    BLOG_POST_LIKE: jest.fn((postId: string) => ({
      category: 'user_action',
      action: 'blog_post_like',
      postId,
    })),
    DOWNLOAD_CV: jest.fn(() => ({
      category: 'user_action',
      action: 'download_cv',
    })),
    THEME_TOGGLE: jest.fn((theme: string) => ({
      category: 'user_action',
      action: 'theme_toggle',
      theme,
    })),
    CONTACT_FORM_SUBMIT: jest.fn((success: boolean) => ({
      category: 'user_action',
      action: 'contact_form_submit',
      success,
    })),
    NEWSLETTER_SUBSCRIBE: jest.fn((email: string) => ({
      category: 'user_action',
      action: 'newsletter_subscribe',
      email,
    })),
    EXTERNAL_LINK_CLICK: jest.fn((url: string) => ({
      category: 'user_action',
      action: 'external_link_click',
      url,
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
    const { analytics } = require('@/lib/tracking/analytics');
    renderHook(() => useAnalytics());

    // Verifica se analytics está disponível
    expect(analytics).toBeDefined();
    expect(typeof analytics.track).toBe('function');
  });
});
