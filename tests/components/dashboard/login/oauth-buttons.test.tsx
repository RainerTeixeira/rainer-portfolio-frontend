/**
 * OAuth Buttons Component Tests
 *
 * Testes unitários para o componente OAuthButtons.
 * Valida renderização, handlers e estados.
 *
 * @module tests/components/dashboard/login/oauth-buttons
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { OAuthButtons } from '@/components/dashboard/login';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

// ============================================================================
// Mock Framer Motion
// ============================================================================
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
}));

// Mock leve de '@/constants' para evitar carregar módulos que dependem
// diretamente de design tokens (ex: constants/home/servicos)
jest.mock('@/constants', () => ({
  SITE_CONFIG: {
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
    url: 'https://example.com',
  },
}));

// ============================================================================
// Tests
// ============================================================================

describe('OAuthButtons', () => {
  // Mock handlers
  const mockOnGoogleLogin = jest.fn();
  const mockOnGitHubLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================================================
  // Renderização
  // ==========================================================================

  describe('Renderização', () => {
    it('deve renderizar ambos os botões OAuth', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      expect(
        screen.getByRole('button', { name: /continuar com google/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /continuar com github/i })
      ).toBeInTheDocument();
    });

    it('deve renderizar com classes customizadas', () => {
      const { container } = render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
          className="custom-class"
        />
      );

      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });

    it('deve renderizar ícones corretos', () => {
      const { container } = render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      // Verificar se há SVGs (ícones) renderizados
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(2); // Google + GitHub
    });
  });

  // ==========================================================================
  // Interações
  // ==========================================================================

  describe('Interações', () => {
    it('deve chamar onGoogleLogin ao clicar no botão Google', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      fireEvent.click(googleButton);

      expect(mockOnGoogleLogin).toHaveBeenCalledTimes(1);
      expect(mockOnGitHubLogin).not.toHaveBeenCalled();
    });

    it('deve chamar onGitHubLogin ao clicar no botão GitHub', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });
      fireEvent.click(githubButton);

      expect(mockOnGitHubLogin).toHaveBeenCalledTimes(1);
      expect(mockOnGoogleLogin).not.toHaveBeenCalled();
    });

    it('não deve chamar handlers quando botões estão desabilitados', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
          disabled={true}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });

      fireEvent.click(googleButton);
      fireEvent.click(githubButton);

      expect(mockOnGoogleLogin).not.toHaveBeenCalled();
      expect(mockOnGitHubLogin).not.toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Estados
  // ==========================================================================

  describe('Estados', () => {
    it('deve desabilitar ambos os botões quando disabled=true', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
          disabled={true}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });

      expect(googleButton).toBeDisabled();
      expect(githubButton).toBeDisabled();
    });

    it('deve habilitar ambos os botões quando disabled=false', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
          disabled={false}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });

      expect(googleButton).not.toBeDisabled();
      expect(githubButton).not.toBeDisabled();
    });

    it('deve habilitar ambos os botões por padrão', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });

      expect(googleButton).not.toBeDisabled();
      expect(githubButton).not.toBeDisabled();
    });
  });

  // ==========================================================================
  // Acessibilidade
  // ==========================================================================

  describe('Acessibilidade', () => {
    it('deve ter type="button" nos botões', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });

      expect(googleButton).toHaveAttribute('type', 'button');
      expect(githubButton).toHaveAttribute('type', 'button');
    });

    it('deve ter textos descritivos nos botões', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      expect(
        screen.getByRole('button', { name: /continuar com google/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /continuar com github/i })
      ).toBeInTheDocument();
    });

    it('deve ter aria-hidden nos ícones SVG', () => {
      const { container } = render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgs.length).toBeGreaterThanOrEqual(2); // Google + GitHub
    });
  });

  // ==========================================================================
  // Integração
  // ==========================================================================

  describe('Integração', () => {
    it('deve permitir cliques múltiplos quando não desabilitado', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });

      // Clicar múltiplas vezes
      fireEvent.click(googleButton);
      fireEvent.click(googleButton);
      fireEvent.click(googleButton);

      expect(mockOnGoogleLogin).toHaveBeenCalledTimes(3);
    });

    it('deve alternar entre botões corretamente', () => {
      render(
        <OAuthButtons
          onGoogleLogin={mockOnGoogleLogin}
          onGitHubLogin={mockOnGitHubLogin}
        />
      );

      const googleButton = screen.getByRole('button', {
        name: /continuar com google/i,
      });
      const githubButton = screen.getByRole('button', {
        name: /continuar com github/i,
      });

      // Clicar alternadamente
      fireEvent.click(googleButton);
      fireEvent.click(githubButton);
      fireEvent.click(googleButton);

      expect(mockOnGoogleLogin).toHaveBeenCalledTimes(2);
      expect(mockOnGitHubLogin).toHaveBeenCalledTimes(1);
    });
  });
});

