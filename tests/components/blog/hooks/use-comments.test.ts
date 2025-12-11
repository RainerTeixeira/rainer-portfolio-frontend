/**
 * Testes para hook useComments
 */

import { useComments } from '@/components/domain/blog/hooks/use-comments';
import { renderHook, waitFor } from '@testing-library/react';

// Mock do commentsService
jest.mock('@/lib/api', () => ({
  commentsService: {
    getCommentsByPost: jest.fn(() => Promise.resolve([])),
    createComment: jest.fn(),
  },
}));

describe('useComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar estado inicial', async () => {
    const { result } = renderHook(() => useComments('post-1'));

    expect(result.current).toHaveProperty('comments');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('addComment');
    expect(Array.isArray(result.current.comments)).toBe(true);
    expect(typeof result.current.loading).toBe('boolean');
    expect(typeof result.current.addComment).toBe('function');

    // Aguarda o hook finalizar o carregamento
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );
  });
});
