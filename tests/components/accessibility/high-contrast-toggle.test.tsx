/**
 * Testes para componente HighContrastToggle
 */

import { HighContrastToggle } from '@/components/accessibility/high-contrast-toggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('HighContrastToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('deve renderizar o toggle', () => {
    render(<HighContrastToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve alternar alto contraste quando clicado', async () => {
    render(<HighContrastToggle />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });
});
