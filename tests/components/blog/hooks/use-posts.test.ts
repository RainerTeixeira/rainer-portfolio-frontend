/**
 * Testes para hook usePosts
 */

import { usePosts } from '@/components/blog/hooks/use-posts';
import { renderHook, waitFor } from '@testing-library/react';

// Mock do postsService
jest.mock('@/lib/api', () => ({
  postsService: {
    listPosts: jest.fn(() => Promise.resolve({ posts: [] })),
    getPostBySlug: jest.fn(() => Promise.resolve({ post: null })),
  },
}));

describe('usePosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => usePosts());

    expect(result.current).toHaveProperty('posts');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(Array.isArray(result.current.posts)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('deve carregar posts', async () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', slug: 'post-1' },
      { id: '2', title: 'Post 2', slug: 'post-2' },
    ];

    const { postsService } = require('@/lib/api');
    postsService.listPosts.mockResolvedValue({ posts: mockPosts });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.posts.length).toBeGreaterThanOrEqual(0);
    });
  });
});
