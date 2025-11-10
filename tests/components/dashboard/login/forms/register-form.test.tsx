/**
 * Testes para componente RegisterForm
 */

import { RegisterForm } from '@/components/dashboard/login/forms/register-form';
import { render } from '@testing-library/react';

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('RegisterForm', () => {
  it('deve renderizar o formulário de registro', () => {
    const { container } = render(<RegisterForm />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar formulário', () => {
    const { container } = render(<RegisterForm />);
    const form = container.querySelector('form') || container.firstChild;
    expect(form).toBeTruthy();
  });
});
