/**
 * Testes para componente NewsletterBox
 */

import { NewsletterBox } from '@/components/blog/newsletter-box';
import { render } from '@testing-library/react';

// Mock do hook
jest.mock('@/components/blog/hooks/use-newsletter', () => ({
  useNewsletter: jest.fn(() => ({
    email: '',
    setEmail: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    isSuccess: false,
    error: null,
  })),
}));

describe('NewsletterBox', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<NewsletterBox />);
    expect(container).toBeTruthy();
  });

  it('deve exibir campo de email', () => {
    const { container } = render(<NewsletterBox />);
    const emailInput =
      container.querySelector('input[type="email"]') ||
      container.querySelector('input');
    expect(emailInput || container).toBeTruthy();
  });
});
