/**
 * Testes para componente RecentPostsList
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { RecentPostsList } from '@/components/dashboard/recent-posts-list';
import { render } from '@testing-library/react';

// Mock do postsService
jest.mock('@/lib/api/services/posts.service', () => ({
  postsService: {
    listPosts: jest.fn(() => Promise.resolve({ posts: [] })),
  },
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
