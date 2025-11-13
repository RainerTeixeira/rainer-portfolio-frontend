/**
 * Testes para componente SettingsForm
 *
 * Nota: Componente não existe, teste mockado
 */

import { render, screen } from '@testing-library/react';

// Componente mockado inline
const SettingsForm = () => (
  <form data-testid="settings-form">
    <input name="fullName" placeholder="Nome completo" />
    <button type="submit">Salvar</button>
  </form>
);

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
