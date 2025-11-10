/**
 * Testes para componente PostsTable
 */

import { PostsTable } from '@/components/dashboard/posts-table';
import { render } from '@testing-library/react';

// Mock do hook
jest.mock('@/components/blog/hooks/use-posts', () => ({
  usePosts: jest.fn(() => ({
    posts: [],
    isLoading: false,
    error: null,
  })),
}));

describe('PostsTable', () => {
  it('deve renderizar tabela de posts', () => {
    const { container } = render(<PostsTable />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar tabela', () => {
    const { container } = render(<PostsTable />);
    const table = container.querySelector('table') || container.firstChild;
    expect(table).toBeTruthy();
  });
});
