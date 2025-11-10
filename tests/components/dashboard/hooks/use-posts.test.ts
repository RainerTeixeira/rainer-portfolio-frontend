/**
 * Testes para hook usePosts (Dashboard)
 */

import { usePosts } from '@/components/dashboard/hooks/use-posts';
import { renderHook } from '@testing-library/react';

// Mock do postsService
jest.mock('@/lib/api', () => ({
  postsService: {
    listPosts: jest.fn(() => Promise.resolve({ posts: [] })),
  },
}));

describe('usePosts (Dashboard)', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => usePosts());
    expect(result.current).toHaveProperty('posts');
    expect(result.current).toHaveProperty('isLoading');
    expect(Array.isArray(result.current.posts)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
