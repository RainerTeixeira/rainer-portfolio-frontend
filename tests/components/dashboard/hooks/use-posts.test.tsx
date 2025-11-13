/**
 * Testes para hook usePosts (Dashboard)
 */

import { usePosts } from '@/components/dashboard/hooks/use-posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import React from 'react';

// Mock do getPosts (api-client)
jest.mock('@/components/dashboard/lib/api-client', () => ({
  getPosts: jest.fn(() =>
    Promise.resolve({
      posts: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
    })
  ),
}));

describe('usePosts (Dashboard)', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => usePosts(), { wrapper });
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
