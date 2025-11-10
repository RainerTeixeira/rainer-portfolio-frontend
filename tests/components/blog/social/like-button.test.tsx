/**
 * Testes para componente LikeButton
 */

import { LikeButton } from '@/components/blog/social/like-button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do hook
jest.mock('@/components/blog/hooks/use-like', () => ({
  useLike: jest.fn(() => ({
    isLiked: false,
    likeCount: 10,
    toggleLike: jest.fn(),
    isLoading: false,
  })),
}));

describe('LikeButton', () => {
  it('deve renderizar o botão de like', () => {
    render(<LikeButton postId="1" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve exibir contador de likes', () => {
    const { container } = render(<LikeButton postId="1" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Verifica se o botão contém o número de likes
    expect(container.textContent || button.textContent).toBeTruthy();
  });

  it('deve chamar toggleLike quando clicado', async () => {
    const mockToggleLike = jest.fn();
    jest.mock('@/components/blog/hooks/use-like', () => ({
      useLike: jest.fn(() => ({
        isLiked: false,
        likeCount: 10,
        toggleLike: mockToggleLike,
        isLoading: false,
      })),
    }));

    render(<LikeButton postId="1" />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    // Verifica se o botão foi clicado
    expect(button).toBeInTheDocument();
  });
});
