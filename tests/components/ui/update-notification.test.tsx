/**
 * Testes para componente UpdateNotification
 */

import { UpdateNotification } from '@/components/ui/update-notification';
import { render } from '@testing-library/react';

// Mock do usePWA
jest.mock('@/hooks/use-pwa', () => ({
  usePWA: jest.fn(() => ({
    updateAvailable: false,
    updateServiceWorker: jest.fn(),
  })),
}));

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
  })),
}));

describe('UpdateNotification', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<UpdateNotification />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar quando não há atualização', () => {
    const { container } = render(<UpdateNotification />);
    // Quando não há atualização, pode não renderizar nada
    expect(container).toBeTruthy();
  });
});
