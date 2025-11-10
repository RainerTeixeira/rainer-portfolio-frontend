/**
 * Testes para hook useSubcategories
 */

import { useSubcategories } from '@/components/dashboard/hooks/use-subcategories';
import { renderHook } from '@testing-library/react';

// Mock do categoriesService
jest.mock('@/lib/api', () => ({
  categoriesService: {
    listCategories: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));

describe('useSubcategories', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useSubcategories());
    expect(result.current).toHaveProperty('subcategories');
    expect(result.current).toHaveProperty('isLoading');
    expect(Array.isArray(result.current.subcategories)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
