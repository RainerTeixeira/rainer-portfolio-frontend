/**
 * Testes para componente CommentsList
 */

import { CommentsList } from '@/components/blog/comments/comments-list';
import { render } from '@testing-library/react';

const mockComments = [
  {
    id: '1',
    content: 'Test comment',
    author: { fullName: 'Test User' },
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

// Mock do hook
jest.mock('@/components/blog/hooks/use-comments', () => ({
  useComments: jest.fn(() => ({
    comments: mockComments,
    isLoading: false,
    error: null,
  })),
}));

describe('CommentsList', () => {
  it('deve renderizar lista de comentários', () => {
    const { container } = render(<CommentsList postId="1" />);
    expect(container).toBeTruthy();
  });

  it('deve exibir comentários', () => {
    const { getByText } = render(<CommentsList postId="1" />);
    expect(getByText('Test comment')).toBeInTheDocument();
  });
});
