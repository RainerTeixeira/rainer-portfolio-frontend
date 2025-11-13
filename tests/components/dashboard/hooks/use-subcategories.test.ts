/**
 * Testes para hook useSubcategories
 */

import { useSubcategories } from '@/components/dashboard/hooks/use-subcategories';
import { renderHook, waitFor } from '@testing-library/react';

// Mock do toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock do categoriesService
jest.mock('@/lib/api', () => ({
  categoriesService: {
    getSubcategoriesOnly: jest.fn(() => Promise.resolve([])),
  },
}));

describe('useSubcategories', () => {
  it('deve retornar estado inicial', async () => {
    const { result } = renderHook(() => useSubcategories());
    expect(result.current).toHaveProperty('subcategories');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(Array.isArray(result.current.subcategories)).toBe(true);
    expect(typeof result.current.loading).toBe('boolean');

    // Aguarda o hook finalizar o carregamento
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );
  });
});
