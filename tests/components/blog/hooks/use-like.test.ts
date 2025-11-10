/**
 * Testes para hook useLike
 */

import { useLike } from '@/components/blog/hooks/use-like';
import { act, renderHook } from '@testing-library/react';

// Mock do likesService
jest.mock('@/lib/api', () => ({
  likesService: {
    toggleLike: jest.fn(),
  },
}));

describe('useLike', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    const { likesService } = require('@/lib/api');
    likesService.toggleLike.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useLike('post-1', 10, false));

    const initialLiked = result.current.isLiked;

    await act(async () => {
      await result.current.handleLike();
    });

    // Verifica se o estado mudou
    expect(result.current.isLiked).toBe(!initialLiked);
  });
});
