/**
 * Testes para página de Configurações de Cookies
 */

import CookieSettingsPage from '@/app/cookies/settings/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
  PageHeader: ({ title, description }: any) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
  ParticlesEffect: () => <div data-testid="particles-effect">Particles</div>,
}));

jest.mock('@/components/cookies/cookie-settings', () => ({
  CookieSettings: () => <div data-testid="cookie-settings">Cookie Settings</div>,
}));

describe('Cookie Settings Page', () => {
  it('deve renderizar a página de configurações de cookies', () => {
    render(<CookieSettingsPage />);
    expect(screen.getByText('Configurações de Cookies')).toBeInTheDocument();
  });

  it('deve exibir descrição da página', () => {
    render(<CookieSettingsPage />);
    expect(
      screen.getByText(
        /Gerencie suas preferências de cookies e controle como seus dados são utilizados/i
      )
    ).toBeInTheDocument();
  });

  it('deve exibir o componente CookieSettings', () => {
    render(<CookieSettingsPage />);
    expect(screen.getByTestId('cookie-settings')).toBeInTheDocument();
  });

  it('deve renderizar componentes de UI corretamente', () => {
    render(<CookieSettingsPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByTestId('particles-effect')).toBeInTheDocument();
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });
});

