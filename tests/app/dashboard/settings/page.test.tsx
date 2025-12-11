/**
 * Testes para página Settings
 */

import SettingsPage from '@/app/dashboard/settings/page';
import { render, screen } from '@testing-library/react';

// Mock do useAuthContext
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: { id: '1', fullName: 'Test User' },
    isAuthenticated: true,
    loading: false,
  })),
}));

// Mock dos componentes
jest.mock('@/components/domain/dashboard/profile-form', () => ({
  ProfileForm: () => <div data-testid="settings-form">Settings</div>,
}));

jest.mock('@rainersoft/ui', () => ({
  __esModule: true,
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@rainersoft/design-tokens', () => ({
  __esModule: true,
  GRADIENT_DIRECTIONS: {
    TO_BR: 'to-br',
    TO_RIGHT: 'to-right',
  },
}));

describe('Settings Page', () => {
  it('deve renderizar a página de configurações', async () => {
    render(await SettingsPage());
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('deve exibir formulário de configurações', async () => {
    render(await SettingsPage());
    expect(screen.getByTestId('settings-form')).toBeInTheDocument();
  });
});
