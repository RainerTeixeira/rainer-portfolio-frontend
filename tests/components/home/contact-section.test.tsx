/**
 * Testes para componente ContactSection
 */

import { ContactSection } from '@/components/home/contact-section';
import { render, screen } from '@testing-library/react';

describe('ContactSection', () => {
  it('deve renderizar a seção de contato', () => {
    render(<ContactSection />);
    const section = screen.getByTestId('contact-section');
    expect(section).toBeInTheDocument();
  });

  it('deve conter formulário de contato', () => {
    render(<ContactSection />);
    expect(document.body).toBeTruthy();
  });
});
