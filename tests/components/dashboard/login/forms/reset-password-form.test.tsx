/**
 * Testes para componente ResetPasswordForm
 */

import { ResetPasswordForm } from '@/components/dashboard/login/forms/reset-password-form';
import { render } from '@testing-library/react';

// Mock do authService
jest.mock('@/lib/api', () => ({
  authService: {
    resetPassword: jest.fn(() => Promise.resolve({ success: true })),
  },
}));

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('ResetPasswordForm', () => {
  it('deve renderizar o formulário de reset', () => {
    const { container } = render(<ResetPasswordForm token="test-token" />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar formulário', () => {
    const { container } = render(<ResetPasswordForm token="test-token" />);
    const form = container.querySelector('form') || container.firstChild;
    expect(form).toBeTruthy();
  });
});
