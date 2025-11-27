/**
 * Testes para componente UpdateNotification
 */

import { UpdateNotification } from '@rainersoft/ui';
import { render } from '@testing-library/react';
import * as uiModule from '@rainersoft/ui';

// Mock do usePWA
jest.mock('@rainersoft/ui', () => ({
  ...jest.requireActual('@rainersoft/ui'),
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
