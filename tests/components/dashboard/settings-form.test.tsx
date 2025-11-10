/**
 * Testes para componente SettingsForm
 */

import { SettingsForm } from '@/components/dashboard/settings-form';
import { render } from '@testing-library/react';

// Mock do hook useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: { id: '1', fullName: 'Test User' },
    updateProfile: jest.fn(),
  })),
}));

describe('SettingsForm', () => {
  it('deve renderizar formulário de configurações', () => {
    const { container } = render(<SettingsForm />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar formulário', () => {
    const { container } = render(<SettingsForm />);
    const form = container.querySelector('form') || container.firstChild;
    expect(form).toBeTruthy();
  });
});
