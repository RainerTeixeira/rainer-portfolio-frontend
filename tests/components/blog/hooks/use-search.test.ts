/**
 * Testes para hook useSearch
 */

import { useSearch } from '@/components/blog/hooks/use-search';
import { renderHook } from '@testing-library/react';

describe('useSearch', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current).toHaveProperty('query');
    expect(result.current).toHaveProperty('results');
    expect(result.current).toHaveProperty('isSearching');
    expect(typeof result.current.query).toBe('string');
    expect(Array.isArray(result.current.results)).toBe(true);
    expect(typeof result.current.isSearching).toBe('boolean');
  });

  it('deve ter função de busca', () => {
    const { result } = renderHook(() => useSearch());
    expect(typeof result.current.search).toBe('function');
    expect(typeof result.current.clearSearch).toBe('function');
  });
});
