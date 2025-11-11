/**
 * Tailwind CSS Configuration
 *
 * Configuração profissional do Tailwind CSS integrada com @rainer/design-tokens.
 * Utiliza tokens semânticos e primitivos da biblioteca para garantir consistência
 * e escalabilidade do design system.
 *
 * @module tailwind.config
 * @author Rainer Teixeira
 * @version 3.0.0
 */

import * as DesignTokens from '@rainer/design-tokens';
import type { Config } from 'tailwindcss';
const COLOR_PRIMITIVES =
  (DesignTokens as any).COLOR_PRIMITIVES ??
  (DesignTokens as any).default?.COLOR_PRIMITIVES ??
  (DesignTokens as any).colors ??
  {};

/**
 * Configuração completa do Tailwind CSS
 * Integrada com design tokens profissionais
 */
export default {
  // Modo dark baseado em classe
  darkMode: 'class',

  // Arquivos a serem processados
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      /**
       * Sistema de cores integrado com design tokens
       * Utiliza variáveis CSS para suporte a temas dinâmicos
       */
      colors: {
        // Cores do sistema (shadcn/ui compatível)
        border: 'hsl(var(--color-border) / <alpha-value>)',
        input: 'hsl(var(--color-input) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)',
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',

        // Cores primárias
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
        },

        // Cores secundárias
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
        },

        // Cores de destaque
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)',
        },

        // Cores de card
        card: {
          DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
          foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)',
        },

        // Cores de popover
        popover: {
          DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)',
          foreground: 'hsl(var(--color-popover-foreground) / <alpha-value>)',
        },

        // Cores muted
        muted: {
          DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
          foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',
        },

        // Cores destrutivas
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
          foreground:
            'hsl(var(--color-destructive-foreground) / <alpha-value>)',
        },

        // Cores da sidebar
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar) / <alpha-value>)',
          foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
          primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
          'primary-foreground':
            'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
          accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
          'accent-foreground':
            'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
          border: 'hsl(var(--sidebar-border) / <alpha-value>)',
          ring: 'hsl(var(--sidebar-ring) / <alpha-value>)',
        },

        // Paletas de cores primitivas da biblioteca
        neutral: COLOR_PRIMITIVES.neutral,
        cyan: COLOR_PRIMITIVES.cyan,
        purple: COLOR_PRIMITIVES.purple,
        pink: COLOR_PRIMITIVES.pink,
        blue: COLOR_PRIMITIVES.blue,
        green: COLOR_PRIMITIVES.green,
        orange: COLOR_PRIMITIVES.orange,
        red: COLOR_PRIMITIVES.red,
        amber: COLOR_PRIMITIVES.amber,
        emerald: COLOR_PRIMITIVES.emerald,
      },

      /**
       * Border radius baseado em design tokens
       */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      /**
       * Animações customizadas
       */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },

      /**
       * Animações
       */
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
      },
    },
  },

  /**
   * Plugins do Tailwind CSS
   */
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
