/**
 * Testes para hook useAutosave
 */

import { useAutosave } from '@/components/dashboard/hooks/use-autosave';
import { renderHook } from '@testing-library/react';

describe('useAutosave', () => {
  it('deve retornar função de autosave', () => {
    const { result } = renderHook(() => useAutosave({} as any, jest.fn()));
    expect(typeof result.current.save).toBe('function');
  });

  it('deve ter estado de salvamento', () => {
    const { result } = renderHook(() => useAutosave({} as any, jest.fn()));
    expect(result.current).toHaveProperty('isSaving');
    expect(typeof result.current.isSaving).toBe('boolean');
  });
});
