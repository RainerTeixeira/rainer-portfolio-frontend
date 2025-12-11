/**
 * Testes para hook usePasswordStrength
 */

import { usePasswordStrength } from '@/components/domain/dashboard/hooks/use-password-strength';
import { renderHook } from '@testing-library/react';

describe('usePasswordStrength', () => {
  it('deve retornar estado inicial para senha vazia', () => {
    const { result } = renderHook(() => usePasswordStrength(''));
    expect(result.current).toHaveProperty('strength');
    expect(result.current).toHaveProperty('label');
    expect(result.current).toHaveProperty('color');
    expect(result.current.strength).toBe(0);
  });

  it('deve calcular força da senha', () => {
    const { result } = renderHook(() => usePasswordStrength('StrongP@ss123'));
    expect(result.current.strength).toBeGreaterThanOrEqual(0);
    expect(result.current.strength).toBeLessThanOrEqual(5);
    expect(typeof result.current.label).toBe('string');
    expect(typeof result.current.color).toBe('string');
  });
});
