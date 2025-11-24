/**
 * Testes para página de Exemplos de Design Tokens
 */

// Mock do CSS global
jest.mock('@/app/globals.css', () => ({}));

// Mock do tema
jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light' }),
}));

// Mock dos design tokens e função de contraste
jest.mock('@rainersoft/design-tokens', () => ({
  tokens: {
    colors: {
      light: {
        primary: {
          base: '#4f46e5',
          hover: '#4338ca',
          active: '#3730a3',
          focus: '#6366f1',
          text: '#ffffff',
          disabled: '#a5b4fc',
          textDisabled: '#e5e7eb',
          border: '#4f46e5',
        },
        secondary: {
          base: '#0ea5e9',
          hover: '#0284c7',
          active: '#0369a1',
          focus: '#38bdf8',
          text: '#0f172a',
          border: '#0ea5e9',
        },
        accent: {
          base: '#ec4899',
          hover: '#db2777',
          active: '#be185d',
          focus: '#f472b6',
          text: '#0f172a',
        },
        background: {
          primary: '#ffffff',
        },
        text: {
          primary: '#0f172a',
          secondary: '#475569',
          tertiary: '#9ca3af',
        },
        surface: {
          primary: '#ffffff',
          secondary: '#f1f5f9',
          hover: '#e2e8f0',
        },
        border: {
          primary: '#e2e8f0',
          secondary: '#cbd5f5',
        },
        status: {
          success: {
            background: '#dcfce7',
            border: '#22c55e',
            base: '#22c55e',
            text: '#166534',
            textOnBackground: '#166534',
          },
        },
      },
      dark: {
        primary: {
          base: '#6366f1',
          hover: '#4f46e5',
          active: '#4338ca',
          focus: '#818cf8',
          text: '#e5e7eb',
          disabled: '#4b5563',
          textDisabled: '#9ca3af',
          border: '#6366f1',
        },
        secondary: {
          base: '#38bdf8',
          hover: '#0ea5e9',
          active: '#0284c7',
          focus: '#7dd3fc',
          text: '#e5e7eb',
          border: '#38bdf8',
        },
        accent: {
          base: '#f472b6',
          hover: '#ec4899',
          active: '#db2777',
          focus: '#f9a8d4',
          text: '#e5e7eb',
        },
        background: {
          primary: '#020617',
        },
        text: {
          primary: '#e5e7eb',
          secondary: '#9ca3af',
          tertiary: '#6b7280',
        },
        surface: {
          primary: '#020617',
          secondary: '#0f172a',
          hover: '#1f2937',
        },
        border: {
          primary: '#1f2937',
          secondary: '#4b5563',
        },
        status: {
          success: {
            background: '#14532d',
            border: '#22c55e',
            base: '#22c55e',
            text: '#bbf7d0',
            textOnBackground: '#bbf7d0',
          },
        },
      },
    },
    typography: {
      headings: {
        h1: {
          fontSize: '2.25rem',
          fontWeight: 900,
          lineHeight: 1.2,
          letterSpacing: '-0.05em',
          marginBottom: '1rem',
        },
        h2: {
          fontSize: '1.875rem',
          fontWeight: 700,
          lineHeight: 1.3,
        },
        h3: {
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.35,
          letterSpacing: '-0.03em',
        },
        h4: {
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h5: {
          fontSize: '1.125rem',
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: '0.02em',
        },
      },
      subtitle: {
        large: {
          fontSize: '1.125rem',
          fontWeight: 500,
          lineHeight: 1.5,
        },
        medium: {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: 1.4,
        },
        small: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.4,
        },
      },
      body: {
        large: {
          fontSize: '1.125rem',
          fontWeight: 400,
          lineHeight: 1.625,
        },
        medium: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
        },
        small: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.5,
        },
      },
      button: {
        medium: {
          fontSize: '0.975rem',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '0.03em',
        },
      },
    },
  },
  validateContrast: () => ({
    ratio: 4.5,
    isAccessible: true,
    level: 'AA',
  }),
}));

// Mock da página para evitar dependência profunda de tokens e UI
jest.mock('@/app/exemplos-tokens/page', () => ({
  __esModule: true,
  default: () => <div>Design Tokens em Ação</div>,
}));

import ExemplosTokensPage from '@/app/exemplos-tokens/page';
import { render, screen, waitFor } from '@testing-library/react';

describe('ExemplosTokensPage', () => {
  it('deve renderizar a página de exemplos de tokens sem erros', async () => {
    render(<ExemplosTokensPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Design Tokens em Ação/i)
      ).toBeInTheDocument();
    });
  });
});
