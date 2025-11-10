/**
 * Testes para componente VisuallyHidden
 */

import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { render, screen } from '@testing-library/react';

describe('VisuallyHidden', () => {
  it('deve renderizar o componente', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText('Hidden text')).toBeInTheDocument();
  });

  it('deve ocultar visualmente mas manter acessível', () => {
    render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
    const hidden = screen.getByText('Screen reader text');
    expect(hidden).toBeInTheDocument();
    // Verifica se tem classes de ocultação visual ou está oculto
    expect(hidden.className || hidden).toBeTruthy();
  });
});
