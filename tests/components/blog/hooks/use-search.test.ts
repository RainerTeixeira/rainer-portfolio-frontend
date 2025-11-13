/**
 * Testes para hook useSearch
 */

import { useSearch } from '@/components/blog/hooks/use-search';
import { renderHook } from '@testing-library/react';

// Mock do postsService
jest.mock('@/lib/api/services/posts.service', () => ({
  postsService: {
    listPosts: jest.fn(() =>
      Promise.resolve({
        posts: [],
        pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
      })
    ),
  },
}));

describe('useSearch', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current).toHaveProperty('open');
    expect(result.current).toHaveProperty('setOpen');
    expect(result.current).toHaveProperty('query');
    expect(result.current).toHaveProperty('setQuery');
    expect(result.current).toHaveProperty('results');
    expect(result.current).toHaveProperty('recentSearches');
    expect(result.current).toHaveProperty('isLoading');
    expect(typeof result.current.query).toBe('string');
    expect(Array.isArray(result.current.results)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('deve ter funções de busca', () => {
    const { result } = renderHook(() => useSearch());
    expect(typeof result.current.handleSelect).toBe('function');
    expect(typeof result.current.clearRecentSearches).toBe('function');
  });
});
