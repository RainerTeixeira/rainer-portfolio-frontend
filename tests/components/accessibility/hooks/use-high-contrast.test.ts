/**
 * Testes para hook useHighContrast
 */

import { useHighContrast } from '@/components/accessibility/hooks/use-high-contrast';
import { act, renderHook } from '@testing-library/react';

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useHighContrast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('deve retornar estado inicial de alto contraste', () => {
    const { result } = renderHook(() => useHighContrast());

    expect(result.current).toHaveProperty('isHighContrast');
    expect(result.current).toHaveProperty('toggleHighContrast');
    expect(typeof result.current.isHighContrast).toBe('boolean');
    expect(typeof result.current.toggleHighContrast).toBe('function');
  });

  it('deve alternar alto contraste', () => {
    const { result } = renderHook(() => useHighContrast());

    const initialValue = result.current.isHighContrast;

    act(() => {
      result.current.toggleHighContrast();
    });

    expect(result.current.isHighContrast).toBe(!initialValue);
  });
});
