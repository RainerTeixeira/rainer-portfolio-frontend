/**
 * Testes para componente CookieBanner
 */

import { CookieBanner, useCookieConsent } from '@/components/ui/cookie-banner';
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

describe('CookieBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();
    (getCookieManager() as any).instance = undefined;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('não deve renderizar quando já há consentimento', () => {
    const preferences: CookiePreferences = {
      essential: true,
      performance: true,
      functionality: true,
      analytics: true,
    };

    saveCookieConsent(preferences);

    const { container } = render(<CookieBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('deve renderizar banner após delay quando não há consentimento', async () => {
    const { container } = render(<CookieBanner />);

    // Antes do delay
    expect(container.firstChild).toBeNull();

    // Avança o timer
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/utilizamos cookies/i)).toBeInTheDocument();
    });
  });

  it('deve exibir opções de ação', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/aceitar todos/i)).toBeInTheDocument();
      expect(screen.getByText(/rejeitar opcionais/i)).toBeInTheDocument();
      expect(screen.getByText(/personalizar/i)).toBeInTheDocument();
    });
  });

  it('deve aceitar todos os cookies ao clicar em "Aceitar Todos"', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/aceitar todos/i)).toBeInTheDocument();
    });

    const acceptButton = screen.getByText(/aceitar todos/i);
    fireEvent.click(acceptButton);

    await waitFor(() => {
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(true);
    });

    const manager = getCookieManager();
    const preferences = manager.getPreferences();
    expect(preferences?.analytics).toBe(true);
    expect(preferences?.performance).toBe(true);
    expect(preferences?.functionality).toBe(true);
  });

  it('deve rejeitar cookies opcionais ao clicar em "Rejeitar Opcionais"', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/rejeitar opcionais/i)).toBeInTheDocument();
    });

    const rejectButton = screen.getByText(/rejeitar opcionais/i);
    fireEvent.click(rejectButton);

    await waitFor(() => {
      const manager = getCookieManager();
      expect(manager.hasConsent()).toBe(true);
    });

    const manager = getCookieManager();
    const preferences = manager.getPreferences();
    expect(preferences?.essential).toBe(true);
    expect(preferences?.analytics).toBe(false);
    expect(preferences?.performance).toBe(false);
    expect(preferences?.functionality).toBe(false);
  });

  it('deve abrir personalização ao clicar em "Personalizar"', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/personalizar/i)).toBeInTheDocument();
    });

    const customizeButton = screen.getByText(/personalizar/i);
    fireEvent.click(customizeButton);

    await waitFor(() => {
      expect(
        screen.getByText(/personalizar cookies/i, { exact: false })
      ).toBeInTheDocument();
    });
  });

  it('deve fechar banner ao clicar no botão X', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByLabelText(/fechar banner/i)).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText(/fechar banner/i);
    fireEvent.click(closeButton);

    // Banner deve desaparecer (não renderizar mais)
    await waitFor(() => {
      expect(screen.queryByText(/utilizamos cookies/i)).not.toBeInTheDocument();
    });
  });

  it('deve ter link para política de cookies', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      const link = screen.getByText(/saiba mais/i);
      expect(link.closest('a')).toHaveAttribute('href', '/cookies');
    });
  });

  it('deve ter descrição sobre cookies', async () => {
    render(<CookieBanner />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(
        screen.getByText(/utilizamos cookies para melhorar/i)
      ).toBeInTheDocument();
    });
  });
});

describe('useCookieConsent Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    (getCookieManager() as any).instance = undefined;
  });

  it('deve retornar null quando não há consentimento', () => {
    // Este teste requer um componente de teste
    const TestComponent = () => {
      const preferences = useCookieConsent();
      return <div>{preferences ? 'has consent' : 'no consent'}</div>;
    };

    const { getByText } = render(<TestComponent />);
    expect(getByText('no consent')).toBeInTheDocument();
  });

  it('deve retornar preferências quando há consentimento', () => {
    const preferences: CookiePreferences = {
      essential: true,
      performance: true,
      functionality: true,
      analytics: true,
    };

    saveCookieConsent(preferences);

    const TestComponent = () => {
      const prefs = useCookieConsent();
      return (
        <div>
          {prefs?.analytics ? 'analytics enabled' : 'analytics disabled'}
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);
    expect(getByText('analytics enabled')).toBeInTheDocument();
  });
});
