/**
 * Testes para hook useAutosave
 */

import { useAutosave } from '@/components/dashboard/hooks/use-autosave';
import { renderHook } from '@testing-library/react';

// Mock do toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useAutosave', () => {
  it('deve retornar função de autosave', () => {
    const mockOnSave = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useAutosave({
        onSave: mockOnSave,
      })
    );
    expect(typeof result.current.saveNow).toBe('function');
  });

  it('deve ter propriedades de autosave', () => {
    const mockOnSave = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useAutosave({
        onSave: mockOnSave,
      })
    );
    expect(result.current).toHaveProperty('saveNow');
    expect(result.current).toHaveProperty('lastSave');
    expect(result.current).toHaveProperty('getTimeSinceLastSave');
    expect(typeof result.current.saveNow).toBe('function');
    expect(typeof result.current.getTimeSinceLastSave).toBe('function');
  });
});
