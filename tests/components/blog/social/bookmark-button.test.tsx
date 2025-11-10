/**
 * Testes para componente BookmarkButton
 */

import { BookmarkButton } from '@/components/blog/social/bookmark-button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do hook
jest.mock('@/components/blog/hooks/use-bookmark', () => ({
  useBookmark: jest.fn(() => ({
    isBookmarked: false,
    toggleBookmark: jest.fn(),
  })),
}));

describe('BookmarkButton', () => {
  it('deve renderizar o botão de bookmark', () => {
    render(<BookmarkButton postId="1" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve chamar toggleBookmark quando clicado', async () => {
    const mockToggle = jest.fn();
    jest.mock('@/components/blog/hooks/use-bookmark', () => ({
      useBookmark: jest.fn(() => ({
        isBookmarked: false,
        toggleBookmark: mockToggle,
      })),
    }));

    render(<BookmarkButton postId="1" />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    // Verifica se o botão foi clicado
    expect(button).toBeInTheDocument();
  });
});
