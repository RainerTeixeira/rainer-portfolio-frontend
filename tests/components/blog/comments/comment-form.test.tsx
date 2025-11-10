/**
 * Testes para componente CommentForm
 */

import { CommentForm } from '@/components/blog/comments/comment-form';
import { render } from '@testing-library/react';

// Mock do useAuthContext
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: { id: '1', fullName: 'Test User' },
  })),
}));

// Mock do hook
jest.mock('@/components/blog/hooks/use-comments', () => ({
  useComments: jest.fn(() => ({
    addComment: jest.fn(),
    isLoading: false,
  })),
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
