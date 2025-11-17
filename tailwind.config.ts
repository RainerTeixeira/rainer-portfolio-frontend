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
        background: tokens.colors.light.background?.primary || '#ffffff',
        foreground: tokens.colors.light.text?.primary || '#171717',
        card: {
          DEFAULT: tokens.colors.light.surface?.primary || '#ffffff',
          foreground: tokens.colors.light.text?.primary || '#171717',
        },
        primary: {
          DEFAULT: tokens.colors.light.primary?.base || '#0891b2',
          foreground: tokens.colors.light.primary?.text || '#ffffff',
        },
        secondary: {
          DEFAULT: tokens.colors.light.secondary?.base || '#9333ea',
          foreground: tokens.colors.light.secondary?.text || '#ffffff',
        },
        muted: {
          DEFAULT: tokens.colors.light.surface?.secondary || '#fafafa',
          foreground: tokens.colors.light.text?.tertiary || '#737373',
        },
        accent: {
          DEFAULT: tokens.colors.light.accent?.base || '#db2777',
          foreground: tokens.colors.light.accent?.text || '#ffffff',
        },
        destructive: {
          DEFAULT: tokens.colors.light.status?.error?.base || '#ef4444',
          foreground: tokens.colors.light.status?.error?.text || '#ffffff',
        },
        border: tokens.colors.light.border?.primary || '#e5e5e5',
        input: tokens.colors.light.border?.primary || '#e5e5e5',
        ring:
          tokens.colors.light.primary?.focus ||
          tokens.colors.light.primary?.base ||
          '#0891b2',

        // ===== TODAS AS CORES DOS TOKENS (PARA USO AVANÇADO) =====
        // Background completo
        'background-primary':
          tokens.colors.light.background?.primary || '#ffffff',
        'background-secondary':
          tokens.colors.light.background?.secondary || '#fafafa',
        'background-tertiary':
          tokens.colors.light.background?.tertiary || '#f5f5f5',
        'background-inverse':
          tokens.colors.light.background?.inverse || '#0a0a0f',

        // Surface completo
        'surface-primary': tokens.colors.light.surface?.primary || '#ffffff',
        'surface-secondary':
          tokens.colors.light.surface?.secondary || '#fafafa',
        'surface-tertiary': tokens.colors.light.surface?.tertiary || '#f5f5f5',
        'surface-elevated': tokens.colors.light.surface?.elevated || '#ffffff',

        // Text completo
        'text-primary': tokens.colors.light.text?.primary || '#171717',
        'text-secondary': tokens.colors.light.text?.secondary || '#404040',
        'text-tertiary': tokens.colors.light.text?.tertiary || '#737373',
        'text-inverse': tokens.colors.light.text?.inverse || '#ffffff',
        'text-disabled': tokens.colors.light.text?.disabled || '#a3a3a3',
        'text-link': tokens.colors.light.text?.link || '#0891b2',
        'text-link-hover': tokens.colors.light.text?.linkHover || '#0e7490',

        // Border completo
        'border-primary': tokens.colors.light.border?.primary || '#e5e5e5',
        'border-secondary': tokens.colors.light.border?.secondary || '#d4d4d4',
        'border-tertiary': tokens.colors.light.border?.tertiary || '#a3a3a3',
        'border-focus': tokens.colors.light.border?.focus || '#0891b2',

        // Primary completo (nova estrutura)
        'primary-base': tokens.colors.light.primary?.base || '#0891b2',
        'primary-hover': tokens.colors.light.primary?.hover || '#0e7490',
        'primary-active': tokens.colors.light.primary?.active || '#155e75',
        'primary-disabled': tokens.colors.light.primary?.disabled || '#d4d4d4',
        'primary-focus': tokens.colors.light.primary?.focus || '#0891b2',
        'primary-background':
          tokens.colors.light.primary?.background || '#ecfeff',
        'primary-background-hover':
          tokens.colors.light.primary?.backgroundHover || '#cffafe',
        'primary-background-active':
          tokens.colors.light.primary?.backgroundActive || '#a5f3fc',
        'primary-border': tokens.colors.light.primary?.border || '#0891b2',
        'primary-border-hover':
          tokens.colors.light.primary?.borderHover || '#0e7490',
        'primary-border-focus':
          tokens.colors.light.primary?.borderFocus || '#06b6d4',
        'primary-text': tokens.colors.light.primary?.text || '#ffffff',
        'primary-text-hover':
          tokens.colors.light.primary?.textHover || '#ffffff',
        'primary-text-disabled':
          tokens.colors.light.primary?.textDisabled || '#a3a3a3',

        // Secondary completo (nova estrutura)
        'secondary-base': tokens.colors.light.secondary?.base || '#9333ea',
        'secondary-hover': tokens.colors.light.secondary?.hover || '#7e22ce',
        'secondary-active': tokens.colors.light.secondary?.active || '#6b21a8',
        'secondary-disabled':
          tokens.colors.light.secondary?.disabled || '#d4d4d4',
        'secondary-focus': tokens.colors.light.secondary?.focus || '#9333ea',
        'secondary-background':
          tokens.colors.light.secondary?.background || '#faf5ff',
        'secondary-background-hover':
          tokens.colors.light.secondary?.backgroundHover || '#f3e8ff',
        'secondary-background-active':
          tokens.colors.light.secondary?.backgroundActive || '#e9d5ff',
        'secondary-border': tokens.colors.light.secondary?.border || '#9333ea',
        'secondary-border-hover':
          tokens.colors.light.secondary?.borderHover || '#7e22ce',
        'secondary-border-focus':
          tokens.colors.light.secondary?.borderFocus || '#a855f7',
        'secondary-text': tokens.colors.light.secondary?.text || '#ffffff',
        'secondary-text-hover':
          tokens.colors.light.secondary?.textHover || '#ffffff',
        'secondary-text-disabled':
          tokens.colors.light.secondary?.textDisabled || '#a3a3a3',

        // Accent completo (nova estrutura)
        'accent-base': tokens.colors.light.accent?.base || '#db2777',
        'accent-hover': tokens.colors.light.accent?.hover || '#be185d',
        'accent-active': tokens.colors.light.accent?.active || '#9f1239',
        'accent-disabled': tokens.colors.light.accent?.disabled || '#d4d4d4',
        'accent-focus': tokens.colors.light.accent?.focus || '#db2777',
        'accent-background':
          tokens.colors.light.accent?.background || '#fdf2f8',
        'accent-background-hover':
          tokens.colors.light.accent?.backgroundHover || '#fce7f3',
        'accent-background-active':
          tokens.colors.light.accent?.backgroundActive || '#fbcfe8',
        'accent-border': tokens.colors.light.accent?.border || '#db2777',
        'accent-border-hover':
          tokens.colors.light.accent?.borderHover || '#be185d',
        'accent-border-focus':
          tokens.colors.light.accent?.borderFocus || '#ec4899',
        'accent-text': tokens.colors.light.accent?.text || '#ffffff',
        'accent-text-hover': tokens.colors.light.accent?.textHover || '#ffffff',
        'accent-text-disabled':
          tokens.colors.light.accent?.textDisabled || '#a3a3a3',

        // Status completo (nova estrutura expandida)
        'status-success-base':
          tokens.colors.light.status?.success?.base || '#22c55e',
        'status-success-hover':
          tokens.colors.light.status?.success?.hover || '#16a34a',
        'status-success-active':
          tokens.colors.light.status?.success?.active || '#15803d',
        'status-success-background':
          tokens.colors.light.status?.success?.background || '#f0fdf4',
        'status-success-background-hover':
          tokens.colors.light.status?.success?.backgroundHover || '#dcfce7',
        'status-success-background-active':
          tokens.colors.light.status?.success?.backgroundActive || '#bbf7d0',
        'status-success-border':
          tokens.colors.light.status?.success?.border || '#86efac',
        'status-success-border-hover':
          tokens.colors.light.status?.success?.borderHover || '#4ade80',
        'status-success-border-focus':
          tokens.colors.light.status?.success?.borderFocus || '#22c55e',
        'status-success-text':
          tokens.colors.light.status?.success?.text || '#ffffff',
        'status-success-text-hover':
          tokens.colors.light.status?.success?.textHover || '#ffffff',
        'status-success-text-disabled':
          tokens.colors.light.status?.success?.textDisabled || '#a3a3a3',
        'status-success-text-on-background':
          tokens.colors.light.status?.success?.textOnBackground || '#166534',

        'status-warning-base':
          tokens.colors.light.status?.warning?.base || '#f59e0b',
        'status-warning-hover':
          tokens.colors.light.status?.warning?.hover || '#d97706',
        'status-warning-active':
          tokens.colors.light.status?.warning?.active || '#b45309',
        'status-warning-background':
          tokens.colors.light.status?.warning?.background || '#fffbeb',
        'status-warning-background-hover':
          tokens.colors.light.status?.warning?.backgroundHover || '#fef3c7',
        'status-warning-background-active':
          tokens.colors.light.status?.warning?.backgroundActive || '#fde68a',
        'status-warning-border':
          tokens.colors.light.status?.warning?.border || '#fcd34d',
        'status-warning-border-hover':
          tokens.colors.light.status?.warning?.borderHover || '#fbbf24',
        'status-warning-border-focus':
          tokens.colors.light.status?.warning?.borderFocus || '#f59e0b',
        'status-warning-text':
          tokens.colors.light.status?.warning?.text || '#ffffff',
        'status-warning-text-hover':
          tokens.colors.light.status?.warning?.textHover || '#ffffff',
        'status-warning-text-disabled':
          tokens.colors.light.status?.warning?.textDisabled || '#a3a3a3',
        'status-warning-text-on-background':
          tokens.colors.light.status?.warning?.textOnBackground || '#92400e',

        'status-error-base':
          tokens.colors.light.status?.error?.base || '#ef4444',
        'status-error-hover':
          tokens.colors.light.status?.error?.hover || '#dc2626',
        'status-error-active':
          tokens.colors.light.status?.error?.active || '#b91c1c',
        'status-error-background':
          tokens.colors.light.status?.error?.background || '#fef2f2',
        'status-error-background-hover':
          tokens.colors.light.status?.error?.backgroundHover || '#fee2e2',
        'status-error-background-active':
          tokens.colors.light.status?.error?.backgroundActive || '#fecaca',
        'status-error-border':
          tokens.colors.light.status?.error?.border || '#fca5a5',
        'status-error-border-hover':
          tokens.colors.light.status?.error?.borderHover || '#f87171',
        'status-error-border-focus':
          tokens.colors.light.status?.error?.borderFocus || '#ef4444',
        'status-error-text':
          tokens.colors.light.status?.error?.text || '#ffffff',
        'status-error-text-hover':
          tokens.colors.light.status?.error?.textHover || '#ffffff',
        'status-error-text-disabled':
          tokens.colors.light.status?.error?.textDisabled || '#a3a3a3',
        'status-error-text-on-background':
          tokens.colors.light.status?.error?.textOnBackground || '#991b1b',

        'status-info-base': tokens.colors.light.status?.info?.base || '#3b82f6',
        'status-info-hover':
          tokens.colors.light.status?.info?.hover || '#2563eb',
        'status-info-active':
          tokens.colors.light.status?.info?.active || '#1d4ed8',
        'status-info-background':
          tokens.colors.light.status?.info?.background || '#eff6ff',
        'status-info-background-hover':
          tokens.colors.light.status?.info?.backgroundHover || '#dbeafe',
        'status-info-background-active':
          tokens.colors.light.status?.info?.backgroundActive || '#bfdbfe',
        'status-info-border':
          tokens.colors.light.status?.info?.border || '#93c5fd',
        'status-info-border-hover':
          tokens.colors.light.status?.info?.borderHover || '#60a5fa',
        'status-info-border-focus':
          tokens.colors.light.status?.info?.borderFocus || '#3b82f6',
        'status-info-text': tokens.colors.light.status?.info?.text || '#ffffff',
        'status-info-text-hover':
          tokens.colors.light.status?.info?.textHover || '#ffffff',
        'status-info-text-disabled':
          tokens.colors.light.status?.info?.textDisabled || '#a3a3a3',
        'status-info-text-on-background':
          tokens.colors.light.status?.info?.textOnBackground || '#1e40af',
      },

      // ============================================
      // TIPOGRAFIA - TOKENS DE TIPOGRAFIA
      // ============================================
      fontFamily: {
        ...designTokensConfig.theme?.extend?.fontFamily,
        ...tokens.typography.fontFamily,
      },
      fontSize: {
        ...designTokensConfig.theme?.extend?.fontSize,
        ...tokens.typography.fontSize,
      },
      fontWeight: {
        ...designTokensConfig.theme?.extend?.fontWeight,
        ...tokens.typography.fontWeight,
      },
      lineHeight: {
        ...designTokensConfig.theme?.extend?.lineHeight,
        ...tokens.typography.lineHeight,
      },
      letterSpacing: {
        ...designTokensConfig.theme?.extend?.letterSpacing,
        ...tokens.typography.letterSpacing,
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
