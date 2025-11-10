/**
 * Testes para hook usePWA
 */

import { usePWA } from '@/hooks/use-pwa';
import { renderHook } from '@testing-library/react';

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('usePWA', () => {
  it('deve retornar funções e estado do PWA', () => {
    const { result } = renderHook(() => usePWA());

    expect(result.current).toHaveProperty('isInstallable');
    expect(result.current).toHaveProperty('isInstalled');
    expect(result.current).toHaveProperty('install');
    expect(typeof result.current.isInstallable).toBe('boolean');
    expect(typeof result.current.isInstalled).toBe('boolean');
    expect(typeof result.current.install).toBe('function');
  });
});
