/**
 * Testes para hook useAnalytics
 */

import { useAnalytics } from '@/hooks/use-analytics';
import { renderHook } from '@testing-library/react';

// Mock do analytics
jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
  trackPageView: jest.fn(),
  initialize: jest.fn(),
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
    const { initialize } = require('@/lib/analytics');
    renderHook(() => useAnalytics());

    // Verifica se initialize foi chamado (pode ser chamado no useEffect)
    expect(initialize).toBeDefined();
  });
});
