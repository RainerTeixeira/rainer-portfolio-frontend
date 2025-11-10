/**
 * Testes para hook useCategories
 */

import { useCategories } from '@/components/blog/hooks/use-categories';
import { renderHook } from '@testing-library/react';

// Mock do categoriesService
jest.mock('@/lib/api', () => ({
  categoriesService: {
    listCategories: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));

describe('useCategories', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useCategories());
    expect(result.current).toHaveProperty('categories');
    expect(result.current).toHaveProperty('isLoading');
    expect(Array.isArray(result.current.categories)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
