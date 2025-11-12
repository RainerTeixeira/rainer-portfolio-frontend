/**
 * Testes para lib/monitoring/analytics.ts
 */

import { analytics, ANALYTICS_EVENTS } from '@/lib/monitoring/analytics';

// Mock do window.gtag se existir
const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  writable: true,
  value: mockGtag,
});

describe('lib/monitoring/analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve ter método track', () => {
    expect(typeof analytics.track).toBe('function');
  });

  it('deve ter método trackPageView', () => {
    expect(typeof analytics.trackPageView).toBe('function');
  });

  it('deve ter método initialize', () => {
    expect(typeof analytics.initialize).toBe('function');
  });

  it('deve rastrear eventos', () => {
    // Verifica se a função pode ser chamada sem erro
    expect(() => analytics.track('click', { button: 'test' })).not.toThrow();
  });

  it('deve ter constantes ANALYTICS_EVENTS', () => {
    expect(ANALYTICS_EVENTS).toBeDefined();
    expect(typeof ANALYTICS_EVENTS).toBe('object');
  });
});

