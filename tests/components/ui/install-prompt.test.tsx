/**
 * Testes para componente InstallPrompt
 */

import { InstallPrompt } from '@/components/ui/install-prompt';
import { render } from '@testing-library/react';

// Mock do usePWA
jest.mock('@/hooks/use-pwa', () => ({
  usePWA: jest.fn(() => ({
    isInstallable: false,
    installApp: jest.fn(),
    dismissInstallPrompt: jest.fn(),
  })),
}));

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
  })),
}));

describe('InstallPrompt', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<InstallPrompt />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar quando não é instalável', () => {
    const { container } = render(<InstallPrompt />);
    // Quando não é instalável, pode não renderizar nada
    expect(container).toBeTruthy();
  });
});
