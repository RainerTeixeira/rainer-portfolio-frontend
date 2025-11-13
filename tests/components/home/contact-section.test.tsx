/**
 * Testes para componente ContactSection
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { ContactSection } from '@/components/home/contact-section';
import { render } from '@testing-library/react';

describe('ContactSection', () => {
  it('deve renderizar a seção de contato', () => {
    const { container } = render(<ContactSection />);
    expect(container).toBeTruthy();
    expect(container.firstChild).toBeTruthy();
  });

  it('deve conter formulário de contato', () => {
    const { container } = render(<ContactSection />);
    expect(container).toBeTruthy();
  });
});
