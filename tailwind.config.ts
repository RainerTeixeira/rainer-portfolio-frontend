/**
 * Tailwind CSS Configuration
 * 
 * Single Source of Truth: @rainersoft/design-tokens
 * Todas as cores, espaçamentos e tipografia vêm exclusivamente dos tokens.
 * 
 * @module tailwind.config
 * @author Rainer Teixeira
 */
import type { Config } from 'tailwindcss';
import { tokens } from '@rainersoft/design-tokens';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: tokens.primitives.spacing['4'],
      screens: { '2xl': tokens.primitives.breakpoints['2xl'] },
    },
    extend: {
      colors: {
        // Cores semânticas via CSS variables (definidas em @rainersoft/design-tokens/formats/css-vars.css)
        background: 'var(--color-background-primary)',
        foreground: 'var(--color-text-primary)',
        card: 'var(--color-surface-primary)',
        'card-foreground': 'var(--color-text-primary)',
        popover: 'var(--color-surface-elevated)',
        'popover-foreground': 'var(--color-text-primary)',
        primary: 'var(--color-primary-base)',
        'primary-foreground': 'var(--color-primary-text)',
        secondary: 'var(--color-secondary-base)',
        'secondary-foreground': 'var(--color-secondary-text)',
        muted: 'var(--color-background-muted)',
        'muted-foreground': 'var(--color-text-tertiary)',
        accent: 'var(--color-accent-base)',
        'accent-foreground': 'var(--color-accent-text)',
        destructive: 'var(--color-error-base)',
        'destructive-foreground': 'var(--color-error-text)',
        border: 'var(--color-border-primary)',
        input: 'var(--color-border-primary)',
        ring: 'var(--color-primary-base)',
        
        // Cores primitivas do design system (acesso direto para casos especiais)
        ...tokens.primitives.color,
      },
      
      // Design tokens - spacing e breakpoints
      spacing: tokens.primitives.spacing,
      screens: tokens.primitives.breakpoints,
      borderRadius: tokens.primitives.radius,
      
      // Tipografia dos tokens
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...tokens.primitives.typography.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...tokens.primitives.typography.fontFamily.mono],
      },
      fontSize: tokens.primitives.typography.fontSize,
      fontWeight: tokens.primitives.typography.fontWeight,
      lineHeight: tokens.primitives.typography.lineHeight,
      
      // Sombras dos tokens
      boxShadow: tokens.primitives.shadows,
      
      // Z-index dos tokens
      zIndex: tokens.primitives.zIndex,
      
      // Animações usando motion tokens
      animation: {
        'accordion-down': `accordion-down ${tokens.primitives.motion.duration.normal} ${tokens.primitives.motion.easing.easeOut}`,
        'accordion-up': `accordion-up ${tokens.primitives.motion.duration.normal} ${tokens.primitives.motion.easing.easeOut}`,
        'fade-in': `fade-in ${tokens.primitives.motion.duration.slow} ${tokens.primitives.motion.easing.easeOut}`,
        'fade-out': `fade-out ${tokens.primitives.motion.duration.slow} ${tokens.primitives.motion.easing.easeOut}`,
        'slide-in': `slide-in ${tokens.primitives.motion.duration.slow} ${tokens.primitives.motion.easing.easeOut}`,
        'scale-in': `scale-in ${tokens.primitives.motion.duration.slow} ${tokens.primitives.motion.easing.easeOut}`,
        'spin-slow': 'spin 3s linear infinite',
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
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'slide-in': { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
        'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;