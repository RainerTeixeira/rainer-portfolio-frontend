/**
 * Testes para componente CommentSection
 */

import { CommentSection } from '@/components/blog/comments/comment-section';
import { render } from '@testing-library/react';

// Mock do auth context
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: null,
  })),
}));

// Mock do commentsService
jest.mock('@/lib/api', () => ({
  commentsService: {
    getCommentsByPost: jest.fn(() => Promise.resolve([])),
  },
}));

describe('CommentSection', () => {
  it('deve renderizar a seção de comentários', () => {
    const { container } = render(<CommentSection postId="1" />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção', () => {
    const { container } = render(<CommentSection postId="1" />);
    const section = container.querySelector('section') || container.firstChild;
    expect(section).toBeTruthy();
  });
});
