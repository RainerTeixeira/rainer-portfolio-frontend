/**
 * Testes para hook useBookmark
 */

import { useBookmark } from '@/components/blog/hooks/use-bookmark';
import { renderHook } from '@testing-library/react';

// Mock do bookmarksService
jest.mock('@/lib/api', () => ({
  bookmarksService: {
    toggleBookmark: jest.fn(() => Promise.resolve({ success: true })),
    getBookmarks: jest.fn(() => Promise.resolve({ bookmarks: [] })),
  },
}));

describe('useBookmark', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useBookmark('post-1', false));

    expect(result.current).toHaveProperty('isBookmarked');
    expect(result.current).toHaveProperty('handleBookmark');
    expect(result.current).toHaveProperty('isAnimating');
    expect(typeof result.current.isBookmarked).toBe('boolean');
    expect(typeof result.current.handleBookmark).toBe('function');
  });

  it('deve ter função handleBookmark', () => {
    const { result } = renderHook(() => useBookmark('post-1', false));
    expect(typeof result.current.handleBookmark).toBe('function');
  });
});
