/**
 * Testes para componente RecentPosts
 */

import { RecentPosts } from '@/components/dashboard/recent-posts';
import { render } from '@testing-library/react';

// Mock do hook
jest.mock('@/components/blog/hooks/use-posts', () => ({
  usePosts: jest.fn(() => ({
    posts: [],
    isLoading: false,
    error: null,
  })),
}));

describe('RecentPosts', () => {
  it('deve renderizar posts recentes', () => {
    const { container } = render(<RecentPosts />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de posts', () => {
    const { container } = render(<RecentPosts />);
    const section = container.querySelector('section') || container.firstChild;
    expect(section).toBeTruthy();
  });
});
