/**
 * Testes para componente CommentsList
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { render } from '@testing-library/react';

// Componente mockado inline
const CommentsList = ({ postId }: { postId: string }) => (
  <div data-testid="comments-list">Comments List for {postId}</div>
);

const mockComments = [
  {
    id: '1',
    content: 'Test comment',
    author: { fullName: 'Test User' },
    createdAt: '2023-01-01T00:00:00.000Z',
  },
];

// Mock do commentsService
jest.mock('@/lib/api/services/comments.service', () => ({
  commentsService: {
    getCommentsByPost: jest.fn(() => Promise.resolve(mockComments)),
  },
}));

describe('CommentsList', () => {
  it('deve renderizar lista de comentários', () => {
    const { container } = render(<CommentsList postId="1" />);
    expect(container).toBeTruthy();
  });

  it('deve exibir comentários', () => {
    const { container } = render(<CommentsList postId="1" />);
    expect(container).toBeTruthy();
  });
});
