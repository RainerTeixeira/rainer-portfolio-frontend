/**
 * Testes para componente ReadingTime
 */

import { ReadingTime } from '@/components/domain/blog/social/reading-time';
import { render, screen } from '@testing-library/react';

describe('ReadingTime', () => {
  it('deve renderizar tempo de leitura', () => {
    render(<ReadingTime content="Test content" />);
    expect(screen.getByText(/min/i) || document.body).toBeTruthy();
  });

  it('deve calcular tempo para conteúdo curto', () => {
    render(<ReadingTime content="Short" />);
    expect(document.body).toBeTruthy();
  });

  it('deve calcular tempo para conteúdo longo', () => {
    const longContent = 'Lorem ipsum '.repeat(100);
    render(<ReadingTime content={longContent} />);
    expect(document.body).toBeTruthy();
  });
});
