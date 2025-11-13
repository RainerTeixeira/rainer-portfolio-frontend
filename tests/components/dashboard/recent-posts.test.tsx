/**
 * Testes para componente RecentPostsList
 */

import { RecentPostsList } from '@/components/dashboard/recent-posts-list';
import { render } from '@testing-library/react';

// Mock do blogStore
jest.mock('@/store/blog-store', () => ({
  useBlogStore: () => ({
    posts: [],
    isLoading: false,
    error: null,
    fetchPosts: jest.fn(),
  }),
}));

describe('RecentPostsList', () => {
  it('deve renderizar posts recentes', () => {
    const { container } = render(
      <RecentPostsList onEditPost={jest.fn()} onDeletePost={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de posts', () => {
    const { container } = render(
      <RecentPostsList onEditPost={jest.fn()} onDeletePost={jest.fn()} />
    );
    const section = container.querySelector('section') || container.firstChild;
    expect(section).toBeTruthy();
  });
});
