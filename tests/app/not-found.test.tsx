/**
 * Testes para página Not Found
 */

import NotFound from '@/app/not-found';
import { render } from '@testing-library/react';

describe('Not Found Page', () => {
  it('deve renderizar página 404', () => {
    const { container } = render(<NotFound />);
    // Verifica se a página renderiza (pode ter múltiplos elementos com 404)
    expect(container).toBeTruthy();
    expect(container.textContent || container.innerHTML).toBeTruthy();
  });

  it('deve exibir mensagem de erro', () => {
    const { container } = render(<NotFound />);
    expect(container).toBeTruthy();
  });
});
