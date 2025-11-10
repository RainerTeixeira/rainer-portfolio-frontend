/**
 * Testes para componente ThemeToggle
 */

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock do next-themes
const mockSetTheme = jest.fn();
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: mockSetTheme,
  })),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o toggle de tema', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve alternar tema quando clicado', async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
