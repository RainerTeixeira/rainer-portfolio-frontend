/**
 * Testes para hook useNewsletter
 */

import { useNewsletter } from '@/components/blog/hooks/use-newsletter';
import { act, renderHook } from '@testing-library/react';

// Mock do fetch
global.fetch = jest.fn();

describe('useNewsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useNewsletter());

    expect(result.current).toHaveProperty('email');
    expect(result.current).toHaveProperty('setEmail');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isSubscribed');
    expect(typeof result.current.setEmail).toBe('function');
    expect(typeof result.current.handleSubmit).toBe('function');
  });

  it('deve atualizar email', () => {
    const { result } = renderHook(() => useNewsletter());

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
  });
});
