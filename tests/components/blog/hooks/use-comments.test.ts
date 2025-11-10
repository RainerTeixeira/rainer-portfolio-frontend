/**
 * Testes para hook useComments
 */

import { useComments } from '@/components/blog/hooks/use-comments';
import { renderHook } from '@testing-library/react';

// Mock do commentsService
jest.mock('@/lib/api', () => ({
  commentsService: {
    getComments: jest.fn(),
    createComment: jest.fn(),
  },
}));

describe('useComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useComments('post-1'));

    expect(result.current).toHaveProperty('comments');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('addComment');
    expect(Array.isArray(result.current.comments)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
    expect(typeof result.current.addComment).toBe('function');
  });
});
