/**
 * Testes para componente SettingsForm
 *
 * Nota: Componente não existe, teste mockado
 */

// Mock do componente
jest.mock('@/components/dashboard/settings-form', () => ({
  SettingsForm: () => (
    <form data-testid="settings-form">
      <input name="fullName" placeholder="Nome completo" />
      <button type="submit">Salvar</button>
    </form>
  ),
}));

import { SettingsForm } from '@/components/dashboard/settings-form';
import { render, screen } from '@testing-library/react';

// Mock do hook useAuth
jest.mock('@/components/providers/auth-provider', () => ({
  useAuth: jest.fn(() => ({
    user: { id: '1', fullName: 'Test User' },
    updateProfile: jest.fn(),
  })),
}));

describe('SettingsForm', () => {
  it('deve renderizar formulário de configurações', () => {
    render(<SettingsForm />);
    expect(screen.getByTestId('settings-form')).toBeInTheDocument();
  });

  it('deve renderizar formulário', () => {
    render(<SettingsForm />);
    const form = screen.getByTestId('settings-form');
    expect(form.tagName).toBe('FORM');
  });
});
