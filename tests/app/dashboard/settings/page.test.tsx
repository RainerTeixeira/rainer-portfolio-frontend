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
  })),
}));

// Mock dos componentes
jest.mock('@/components/dashboard/profile-form', () => ({
  ProfileForm: () => <div data-testid="settings-form">Settings</div>,
}));

jest.mock('@/components/ui/back-to-top', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
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
