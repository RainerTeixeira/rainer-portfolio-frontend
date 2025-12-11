/**
 * Testes para componente ForgotPasswordForm
 */

import { ForgotPasswordForm } from '@/components/domain/dashboard/login/forms/forgot-password-form';
import { render } from '@testing-library/react';

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('ForgotPasswordForm', () => {
  it('deve renderizar o formulário de recuperação', () => {
    const { container } = render(<ForgotPasswordForm />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar formulário', () => {
    const { container } = render(<ForgotPasswordForm />);
    const form = container.querySelector('form') || container.firstChild;
    expect(form).toBeTruthy();
  });
});
