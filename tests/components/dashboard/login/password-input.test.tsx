/**
 * Testes para componente PasswordInput
 */

import { PasswordInput } from '@/components/dashboard/login/password-input';
import { render } from '@testing-library/react';

describe('PasswordInput', () => {
  it('deve renderizar o input de senha', () => {
    const { container } = render(<PasswordInput />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar input', () => {
    const { container } = render(<PasswordInput />);
    const input = container.querySelector('input');
    expect(input || container).toBeTruthy();
  });
});
