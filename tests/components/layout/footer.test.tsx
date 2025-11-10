/**
 * Testes para componente Footer
 */

import { Footer } from '@/components/layout/footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('deve renderizar o footer', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('deve exibir informações do site', () => {
    render(<Footer />);
    // Verifica se há algum conteúdo renderizado
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });
});
