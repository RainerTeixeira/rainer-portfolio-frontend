/**
 * Testes para hook useCategories
 */

import { useCategories } from '@/components/blog/hooks/use-categories';
import { renderHook, waitFor } from '@testing-library/react';

// Mock do categoriesService
jest.mock('@/lib/api', () => ({
  categoriesService: {
    listCategories: jest.fn(() =>
      Promise.resolve({
        success: true,
        data: [],
        pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
      })
    ),
  },
}));

describe('useCategories', () => {
  it('deve retornar estado inicial', async () => {
    const { result } = renderHook(() => useCategories());

    expect(result.current).toHaveProperty('categories');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(Array.isArray(result.current.categories)).toBe(true);
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
