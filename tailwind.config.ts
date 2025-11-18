/**
 * Tailwind CSS Config
 *
 * @description Configuração usando EXCLUSIVAMENTE os design tokens
 * da biblioteca @rainersoft/design-tokens como fonte única de verdade.
 * Nenhum valor fixo é permitido. Consistência total em cores, tipografia,
 * espaçamento, raios e sombras.
 *
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { tailwindConfig as designTokensConfig } from '@rainersoft/design-tokens/formats/tailwind.config';
import { tokens } from '@rainersoft/design-tokens';
import tailwindcssAnimate from 'tailwindcss-animate';
import type { Config } from 'tailwindcss';

const config: Config = {
  // Herda toda a configuração dos design tokens (theme, darkMode, etc.)
  ...designTokensConfig,

  // Caminhos específicos do frontend para escanear componentes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],

  // Extensões específicas do frontend (SEM valores de design)
  theme: {
    extend: {
      // Tudo vem EXCLUSIVAMENTE dos design tokens
      ...designTokensConfig.theme?.extend,

      // Shadcn UI semantic colors via CSS variables (valores dos tokens)
      colors: {
        ...designTokensConfig.theme?.extend?.colors,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      // Container usando tokens de espaçamento
      container: {
        center: true,
        padding: tokens.spacing['8'], // '2rem' dos tokens
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },

  plugins: [
    tailwindcssAnimate,
    // Plugin inline: define variáveis CSS usando tokens para dark mode
    function ({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
      function colorToHsl(color: string): string {
        // Se é rgba, extrai RGB e converte para HSL (ignora alpha)
        if (color.startsWith('rgba')) {
          const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
          if (match && match[1] && match[2] && match[3]) {
            const r = parseInt(match[1], 10) / 255;
            const g = parseInt(match[2], 10) / 255;
            const b = parseInt(match[3], 10) / 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let hVal = 0;
            let s = 0;
            const l = (max + min) / 2;
            if (max !== min) {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case r:
                  hVal = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                  break;
                case g:
                  hVal = ((b - r) / d + 2) / 6;
                  break;
                case b:
                  hVal = ((r - g) / d + 4) / 6;
                  break;
              }
            }
            return `${Math.round(hVal * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
          }
          return color;
        }
        
        // Se é hex, converte para HSL
        if (color.startsWith('#')) {
          const h = color.replace('#', '');
          const r = parseInt(h.substring(0, 2), 16) / 255;
          const g = parseInt(h.substring(2, 4), 16) / 255;
          const b = parseInt(h.substring(4, 6), 16) / 255;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          let hVal = 0;
          let s = 0;
          const l = (max + min) / 2;
          if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
              case r:
                hVal = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
              case g:
                hVal = ((b - r) / d + 2) / 6;
                break;
              case b:
                hVal = ((r - g) / d + 4) / 6;
                break;
            }
          }
          return `${Math.round(hVal * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
        }
        
        return color;
      }

      addBase({
        ':root': {
          '--background': colorToHsl(tokens.colors.light.background.primary),
          '--foreground': colorToHsl(tokens.colors.light.text.primary),
          '--card': colorToHsl(tokens.colors.light.surface.primary),
          '--card-foreground': colorToHsl(tokens.colors.light.text.primary),
          '--popover': colorToHsl(tokens.colors.light.surface.primary),
          '--popover-foreground': colorToHsl(tokens.colors.light.text.primary),
          '--primary': colorToHsl(tokens.colors.light.primary.base),
          '--primary-foreground': colorToHsl(tokens.colors.light.primary.text),
          '--secondary': colorToHsl(tokens.colors.light.secondary.base),
          '--secondary-foreground': colorToHsl(tokens.colors.light.secondary.text),
          '--muted': colorToHsl(tokens.colors.light.surface.secondary),
          '--muted-foreground': colorToHsl(tokens.colors.light.text.tertiary),
          '--accent': colorToHsl(tokens.colors.light.accent.base),
          '--accent-foreground': colorToHsl(tokens.colors.light.accent.text),
          '--destructive': colorToHsl(tokens.colors.light.status.error.base),
          '--destructive-foreground': colorToHsl(tokens.colors.light.status.error.text),
          '--border': colorToHsl(tokens.colors.light.border.primary),
          '--input': colorToHsl(tokens.colors.light.border.primary),
          '--ring': colorToHsl(tokens.colors.light.border.focus),
          '--radius': tokens.radius.lg, // '0.5rem' dos tokens
        },
        '.dark': {
          '--background': colorToHsl(tokens.colors.dark.background.primary),
          '--foreground': colorToHsl(tokens.colors.dark.text.primary),
          '--card': colorToHsl(tokens.colors.dark.surface.primary),
          '--card-foreground': colorToHsl(tokens.colors.dark.text.primary),
          '--popover': colorToHsl(tokens.colors.dark.surface.primary),
          '--popover-foreground': colorToHsl(tokens.colors.dark.text.primary),
          '--primary': colorToHsl(tokens.colors.dark.primary.base),
          '--primary-foreground': colorToHsl(tokens.colors.dark.primary.text),
          '--secondary': colorToHsl(tokens.colors.dark.secondary.base),
          '--secondary-foreground': colorToHsl(tokens.colors.dark.secondary.text),
          '--muted': colorToHsl(tokens.colors.dark.surface.secondary),
          '--muted-foreground': colorToHsl(tokens.colors.dark.text.tertiary),
          '--accent': colorToHsl(tokens.colors.dark.accent.base),
          '--accent-foreground': colorToHsl(tokens.colors.dark.accent.text),
          '--destructive': colorToHsl(tokens.colors.dark.status.error.base),
          '--destructive-foreground': colorToHsl(tokens.colors.dark.status.error.text),
          '--border': colorToHsl(tokens.colors.dark.border.primary),
          '--input': colorToHsl(tokens.colors.dark.border.primary),
          '--ring': colorToHsl(tokens.colors.dark.border.focus),
        },
      });
    },
  ],
};

export default config;