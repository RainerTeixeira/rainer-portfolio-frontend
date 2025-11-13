/**
 * Testes para hook useLike
 */

import { useLike } from '@/components/blog/hooks/use-like';
import { act, renderHook, waitFor } from '@testing-library/react';

// Mock do fetch global
global.fetch = jest.fn();

describe('useLike', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
  });

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useLike('post-1', 10, false));

    expect(result.current).toHaveProperty('isLiked');
    expect(result.current).toHaveProperty('likes');
    expect(result.current).toHaveProperty('isAnimating');
    expect(result.current).toHaveProperty('handleLike');
    expect(typeof result.current.isLiked).toBe('boolean');
    expect(typeof result.current.likes).toBe('number');
    expect(typeof result.current.handleLike).toBe('function');
  });

  it('deve alternar like', async () => {
    const { result } = renderHook(() => useLike('post-1', 10, false));

    const initialLiked = result.current.isLiked;
    const initialLikes = result.current.likes;

    await act(async () => {
      await result.current.handleLike();
    });

    // Aguarda a animação finalizar
    await waitFor(
      () => {
        expect(result.current.isAnimating).toBe(false);
      },
      { timeout: 1000 }
    );

    // Verifica se o estado mudou (optimistic update)
    expect(result.current.isLiked).toBe(!initialLiked);
    expect(result.current.likes).toBe(
      initialLiked ? initialLikes - 1 : initialLikes + 1
    );
    expect(global.fetch).toHaveBeenCalled();
  });
});
