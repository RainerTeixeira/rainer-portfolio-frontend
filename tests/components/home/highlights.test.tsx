/**
 * Testes para componente Highlights
 */

import { Highlights } from '@/components/home/highlights';
import { render, screen } from '@testing-library/react';

describe('Highlights', () => {
  it('deve renderizar o componente', () => {
    render(<Highlights />);
    // Busca pela seção que tem aria-labelledby
    const section = document.querySelector(
      '[aria-labelledby="highlights-heading"]'
    );
    expect(section).toBeInTheDocument();
  });

  it('deve exibir seção de destaques', () => {
    render(<Highlights />);
    // Verifica se existe um heading ou seção
    const heading =
      screen.queryByText(/destaques/i) ||
      document.querySelector('[aria-labelledby="highlights-heading"]');
    expect(heading).toBeTruthy();
  });
});
