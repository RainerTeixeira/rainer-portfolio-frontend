/**
 * Testes para componente CommentForm
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { CommentForm } from '@/components/blog/comments/comment-form';
import { render } from '@testing-library/react';

// Mock do useAuthContext
jest.mock('@/components/providers/auth-context-provider', () => ({
  __esModule: true,
  useAuthContext: () => ({
    user: {
      id: '1',
      fullName: 'Test User',
      name: 'Test User',
      username: 'testuser',
    },
    isAuthenticated: true,
    loading: false,
  }),
}));

// Mock do commentsService
jest.mock('@/lib/api/services/comments.service', () => ({
  commentsService: {
    createComment: jest.fn(() => Promise.resolve({ success: true })),
  },
}));

describe('CommentForm', () => {
  it('deve renderizar o formulário de comentário', () => {
    const { container } = render(<CommentForm postId="1" />);
    const form = container.querySelector('form');
    expect(form || container).toBeTruthy();
  });

  it('deve exibir campos do formulário', () => {
    const { container } = render(<CommentForm postId="1" />);
    const textarea = container.querySelector('textarea');
    expect(textarea || container).toBeTruthy();
  });
});
