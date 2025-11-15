import { tailwindConfig as designTokensConfig } from '@rainer/design-tokens/formats/tailwind.config';
import { tokens } from '@rainer/design-tokens/tokens';
import type { Config } from 'tailwindcss';

const config: Config = {
  // Inherit from design tokens
  ...designTokensConfig,

  // Frontend specific content paths
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],

  // Extend design tokens with frontend-specific customizations
  theme: {
    ...designTokensConfig.theme,
    extend: {
      ...designTokensConfig.theme?.extend,

      // ============================================
      // CORES - USANDO TODOS OS TOKENS DISPONÍVEIS
      // ============================================
      colors: {
        // Primeiro, espalha todas as cores dos design tokens
        ...designTokensConfig.theme?.extend?.colors,

        // ===== SHADCN/UI SEMANTIC COLORS =====
        background: tokens.colors.light.background.primary,
        foreground: tokens.colors.light.text.primary,
        card: {
          DEFAULT: tokens.colors.light.surface.primary,
          foreground: tokens.colors.light.text.primary,
        },
        primary: {
          DEFAULT: tokens.colors.light.brand.primary,
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: tokens.colors.light.surface.secondary,
          foreground: tokens.colors.light.text.primary,
        },
        muted: {
          DEFAULT: tokens.colors.light.surface.secondary,
          foreground: tokens.colors.light.text.tertiary,
        },
        accent: {
          DEFAULT: tokens.colors.light.surface.tertiary,
          foreground: tokens.colors.light.text.primary,
        },
        destructive: {
          DEFAULT: tokens.colors.light.status.error,
          foreground: '#ffffff',
        },
        border: tokens.colors.light.border.primary,
        input: tokens.colors.light.border.primary,
        ring: tokens.colors.light.border.focus,

        // ===== TODAS AS CORES DOS TOKENS (PARA USO AVANÇADO) =====
        // Background completo
        'background-primary': tokens.colors.light.background.primary,
        'background-secondary': tokens.colors.light.background.secondary,
        'background-tertiary': tokens.colors.light.background.tertiary,
        'background-inverse': tokens.colors.light.background.inverse,

        // Surface completo
        'surface-primary': tokens.colors.light.surface.primary,
        'surface-secondary': tokens.colors.light.surface.secondary,
        'surface-tertiary': tokens.colors.light.surface.tertiary,
        'surface-elevated': tokens.colors.light.surface.elevated,

        // Text completo
        'text-primary': tokens.colors.light.text.primary,
        'text-secondary': tokens.colors.light.text.secondary,
        'text-tertiary': tokens.colors.light.text.tertiary,
        'text-inverse': tokens.colors.light.text.inverse,
        'text-disabled': tokens.colors.light.text.disabled,
        'text-link': tokens.colors.light.text.link,
        'text-link-hover': tokens.colors.light.text.linkHover,

        // Border completo
        'border-primary': tokens.colors.light.border.primary,
        'border-secondary': tokens.colors.light.border.secondary,
        'border-tertiary': tokens.colors.light.border.tertiary,
        'border-focus': tokens.colors.light.border.focus,

        // Brand completo
        'brand-primary': tokens.colors.light.brand.primary,
        'brand-primary-hover': tokens.colors.light.brand.primaryHover,
        'brand-primary-active': tokens.colors.light.brand.primaryActive,
        'brand-secondary': tokens.colors.light.brand.secondary,
        'brand-secondary-hover': tokens.colors.light.brand.secondaryHover,
        'brand-secondary-active': tokens.colors.light.brand.secondaryActive,
        'brand-accent': tokens.colors.light.brand.accent,
        'brand-accent-hover': tokens.colors.light.brand.accentHover,
        'brand-accent-active': tokens.colors.light.brand.accentActive,

        // Status completo
        'status-success': tokens.colors.light.status.success,
        'status-success-bg': tokens.colors.light.status.successBackground,
        'status-success-border': tokens.colors.light.status.successBorder,
        'status-warning': tokens.colors.light.status.warning,
        'status-warning-bg': tokens.colors.light.status.warningBackground,
        'status-warning-border': tokens.colors.light.status.warningBorder,
        'status-error': tokens.colors.light.status.error,
        'status-error-bg': tokens.colors.light.status.errorBackground,
        'status-error-border': tokens.colors.light.status.errorBorder,
        'status-info': tokens.colors.light.status.info,
        'status-info-bg': tokens.colors.light.status.infoBackground,
        'status-info-border': tokens.colors.light.status.infoBorder,

        // Interactive completo
        'interactive-default': tokens.colors.light.interactive.default,
        'interactive-hover': tokens.colors.light.interactive.hover,
        'interactive-active': tokens.colors.light.interactive.active,
        'interactive-disabled': tokens.colors.light.interactive.disabled,
        'interactive-disabled-text':
          tokens.colors.light.interactive.disabledText,
      },

      // ============================================
      // SOMBRAS - TODAS AS SOMBRAS DISPONÍVEIS
      // ============================================
      boxShadow: {
        ...designTokensConfig.theme?.extend?.boxShadow,
        // Sombras light
        'xs-light': tokens.shadows.light.xs,
        'sm-light': tokens.shadows.light.sm,
        'base-light': tokens.shadows.light.base,
        'md-light': tokens.shadows.light.md,
        'lg-light': tokens.shadows.light.lg,
        'xl-light': tokens.shadows.light.xl,
        '2xl-light': tokens.shadows.light['2xl'],
        'inner-light': tokens.shadows.light.inner,
        // Sombras dark
        'xs-dark': tokens.shadows.dark.xs,
        'sm-dark': tokens.shadows.dark.sm,
        'base-dark': tokens.shadows.dark.base,
        'md-dark': tokens.shadows.dark.md,
        'lg-dark': tokens.shadows.dark.lg,
        'xl-dark': tokens.shadows.dark.xl,
        '2xl-dark': tokens.shadows.dark['2xl'],
        'inner-dark': tokens.shadows.dark.inner,
        // Glow effects (cyberpunk)
        'glow-cyan': tokens.shadows.dark.glow.cyan,
        'glow-pink': tokens.shadows.dark.glow.pink,
        'glow-purple': tokens.shadows.dark.glow.purple,
        'glow-green': tokens.shadows.dark.glow.green,
      },

      // Additional frontend-specific extensions
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },

      // Animation extensions
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-in',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'box-glow': 'box-glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'neon-glow': {
          '0%, 100%': {
            textShadow:
              '0 0 10px rgba(0, 230, 255, 0.8), 0 0 20px rgba(0, 230, 255, 0.5)',
          },
          '50%': {
            textShadow:
              '0 0 20px rgba(0, 230, 255, 1), 0 0 40px rgba(0, 230, 255, 0.8)',
          },
        },
        'box-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 20px rgba(0, 230, 255, 0.5), 0 0 40px rgba(0, 230, 255, 0.3)',
          },
          '50%': {
            boxShadow:
              '0 0 30px rgba(0, 230, 255, 0.8), 0 0 60px rgba(0, 230, 255, 0.5)',
          },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
};

export default config;
