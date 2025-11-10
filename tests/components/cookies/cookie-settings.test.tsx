/**
 * Testes para componente CookieSettings
 */

import {
  CookieSettings,
  CookieSettingsButton,
} from '@/components/cookies/cookie-settings';
import type { CookiePreferences } from '@/lib/cookies/cookie-manager';
import {
  getCookieManager,
  saveCookieConsent,
} from '@/lib/cookies/cookie-manager';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock do window.dispatchEvent
const dispatchEventMock = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: dispatchEventMock,
  writable: true,
});

// Mock do Next.js Link
jest.mock('next/link', () => {
  return function Link({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    resolvedTheme: 'light',
  })),
}));

describe('CookieSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    (getCookieManager() as any).instance = undefined;
  });

  it('deve renderizar o componente', () => {
    const { container } = render(<CookieSettings />);
    expect(container).toBeTruthy();
  });

  it('deve exibir todas as categorias de cookies', () => {
    render(<CookieSettings />);

    expect(screen.getByText(/cookies essenciais/i)).toBeInTheDocument();
    expect(screen.getByText(/cookies de performance/i)).toBeInTheDocument();
    expect(screen.getByText(/cookies de funcionalidade/i)).toBeInTheDocument();
    expect(screen.getByText(/cookies de analytics/i)).toBeInTheDocument();
  });

  it('deve carregar preferências salvas', () => {
    const preferences: CookiePreferences = {
      essential: true,
      performance: false,
      functionality: true,
      analytics: false,
    };

    saveCookieConsent(preferences);

    render(<CookieSettings />);

    // Verifica se os switches refletem as preferências
    const performanceSwitch = screen
      .getByLabelText(/cookies de performance/i)
      .closest('label')
      ?.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(performanceSwitch?.checked).toBe(false);
  });

  it('deve permitir toggle de preferências (exceto essenciais)', () => {
    render(<CookieSettings />);

    const analyticsSwitch = screen
      .getByLabelText(/cookies de analytics/i)
      .closest('label')
      ?.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if (analyticsSwitch) {
      const initialValue = analyticsSwitch.checked;
      fireEvent.click(analyticsSwitch);

      // Deve mudar o estado
      expect(analyticsSwitch.checked).toBe(!initialValue);
    }
  });

  it('não deve permitir desativar cookies essenciais', () => {
    render(<CookieSettings />);

    const essentialSwitch = screen
      .getByLabelText(/cookies essenciais/i)
      .closest('label')
      ?.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if (essentialSwitch) {
      expect(essentialSwitch.disabled).toBe(true);
    }
  });

  it('deve salvar preferências ao clicar em "Salvar Preferências"', async () => {
    render(<CookieSettings />);

    // Toggle analytics
    const analyticsSwitch = screen
      .getByLabelText(/cookies de analytics/i)
      .closest('label')
      ?.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if (analyticsSwitch) {
      fireEvent.click(analyticsSwitch);
    }

    // Clica em salvar
    const saveButton = screen.getByText(/salvar preferências/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(true);
    });
  });

  it('deve aceitar todos os cookies ao clicar em "Aceitar Todos"', async () => {
    render(<CookieSettings />);

    const acceptButton = screen.getByText(/aceitar todos/i);
    fireEvent.click(acceptButton);

    await waitFor(() => {
      const manager = getCookieManager();
      const preferences = manager.getPreferences();
      expect(preferences?.analytics).toBe(true);
      expect(preferences?.performance).toBe(true);
      expect(preferences?.functionality).toBe(true);
    });
  });

  it('deve rejeitar cookies opcionais ao clicar em "Rejeitar Opcionais"', async () => {
    render(<CookieSettings />);

    const rejectButton = screen.getByText(/rejeitar opcionais/i);
    fireEvent.click(rejectButton);

    await waitFor(() => {
      const manager = getCookieManager();
      const preferences = manager.getPreferences();
      expect(preferences?.essential).toBe(true);
      expect(preferences?.analytics).toBe(false);
      expect(preferences?.performance).toBe(false);
      expect(preferences?.functionality).toBe(false);
    });
  });

  it('deve exibir links para políticas', () => {
    render(<CookieSettings />);

    expect(screen.getByText(/política de cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/política de privacidade/i)).toBeInTheDocument();
  });

  it('deve exibir lista de cookies por categoria', () => {
    render(<CookieSettings />);

    // Verifica se há menção a cookies utilizados
    expect(
      screen.getByText(/cookies utilizados/i, { exact: false })
    ).toBeInTheDocument();
  });

  it('deve renderizar como dialog quando asDialog é true', () => {
    render(<CookieSettings asDialog open={true} onOpenChange={jest.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('deve fechar dialog quando onOpenChange é chamado', () => {
    const onOpenChange = jest.fn();
    render(<CookieSettings asDialog open={true} onOpenChange={onOpenChange} />);

    // Simula salvar (que deve fechar o dialog)
    const saveButton = screen.getByText(/salvar preferências/i);
    fireEvent.click(saveButton);

    // onOpenChange deve ser chamado com false
    expect(onOpenChange).toHaveBeenCalled();
  });
});

describe('CookieSettingsButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    (getCookieManager() as any).instance = undefined;
  });

  it('deve renderizar o botão', () => {
    render(<CookieSettingsButton />);
    expect(screen.getByText(/gerenciar cookies/i)).toBeInTheDocument();
  });

  it('deve abrir dialog ao clicar no botão', () => {
    render(<CookieSettingsButton />);

    const button = screen.getByText(/gerenciar cookies/i);
    fireEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('deve fechar dialog ao salvar', async () => {
    render(<CookieSettingsButton />);

    const button = screen.getByText(/gerenciar cookies/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const saveButton = screen.getByText(/salvar preferências/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
