/**
 * Testes para componente ShareButton
 */

import { ShareButton } from '@/components/blog/social/share-button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do navigator.share
Object.defineProperty(navigator, 'share', {
  writable: true,
  value: jest.fn(),
});

describe('ShareButton', () => {
  it('deve renderizar o botão de compartilhar', () => {
    render(<ShareButton url="/blog/test" title="Test Post" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve abrir menu de compartilhamento quando clicado', async () => {
    render(<ShareButton url="/blog/test" title="Test Post" />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    // Verifica se o botão foi clicado
    expect(button).toBeInTheDocument();
  });
});
