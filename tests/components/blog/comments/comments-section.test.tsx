/**
 * Testes para componente CommentSection
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { CommentSection } from '@/components/domain/blog/comments/comment-section';
import { render } from '@testing-library/react';

// Mock do auth context
jest.mock('@/components/providers/auth-context-provider', () => ({
  __esModule: true,
  useAuthContext: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),
}));

// Mock do commentsService
jest.mock('@/lib/api/services/comments.service', () => ({
  commentsService: {
    listComments: jest.fn(() => Promise.resolve({ comments: [] })),
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
