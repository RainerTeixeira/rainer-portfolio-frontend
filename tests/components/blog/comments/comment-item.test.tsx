/**
 * Testes para componente CommentItem
 */

import { CommentItem } from '@/components/blog/comments/comment-item';
import { render } from '@testing-library/react';

// Mock do toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockComment = {
  id: '1',
  content: 'Test comment',
  authorId: 'user-1',
  postId: 'post-1',
  isApproved: true,
  isReported: false,
  isEdited: false,
  likesCount: 0,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  author: {
    fullName: 'Test User',
    avatar: '/avatar.jpg',
  },
};

describe('CommentItem', () => {
  it('deve renderizar o item de comentário', () => {
    const { container } = render(
      <CommentItem comment={mockComment} postId="post-1" />
    );
    expect(container).toBeTruthy();
  });

  it('deve exibir conteúdo do comentário', () => {
    const { container } = render(
      <CommentItem comment={mockComment} postId="post-1" />
    );
    expect(container.textContent).toContain('Test comment');
  });
});
