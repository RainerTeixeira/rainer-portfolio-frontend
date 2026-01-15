/**
 * @file jest.design-tokens-mock.js
 * @description Mock do pacote '@rainersoft/design-tokens' para testes Jest
 * @version 1.0.0
 * @author Rainer Teixeira
 */

// Cores base para tema light
const baseLightColors = {
  primary: {
    base: '#0891b2',
    hover: '#0e7490',
    active: '#155e75',
    text: '#ffffff',
  },
};

// Cores base para tema dark
const baseDarkColors = {
  primitive: {
    cyan: {
      400: '#22d3ee',
    },
    purple: {
      400: '#a855f7',
    },
    pink: {
      500: '#ec4899',
    },
    neutral: {
      50: '#f5f5f5',
      950: '#0a0a0f',
    },
  },
};

// Direções de gradiente
const GRADIENT_DIRECTIONS = {
  TO_RIGHT: 'bg-linear-to-r',
  TO_BR: 'bg-gradient-to-br',
};

// Backgrounds
const BACKGROUND = {
  GRADIENT_OVERLAY: 'bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20',
  FULL: 'bg-slate-950',
  SECTION_CYAN: 'bg-cyan-900/40',
  SECTION_PURPLE_VIA: 'bg-purple-900/40',
  SECTION_PINK_VIA: 'bg-pink-900/40',
  SECTION_CYAN_VIA: 'bg-cyan-900/40',
};

// Cores do tema light (shape compatível com a lib real)
const lightThemeColors = {
  primitive: {
    cyan: {
      600: '#0ea5e9',
    },
    purple: {
      600: '#8b5cf6',
    },
    pink: {
      600: '#ec4899',
    },
    emerald: {
      600: '#10b981',
    },
    blue: {
      600: '#3b82f6',
    },
    orange: {
      500: '#f97316',
    },
    neutral: {
      50: '#f5f5f5',
      950: '#0a0a0f',
    },
  },
};

// Paleta de cores para logging
const COLOR_NEUTRAL = { 500: '#6b7280' };
const COLOR_BLUE = { 500: '#3b82f6' };
const COLOR_AMBER = { 500: '#f59e0b' };
const COLOR_RED = { 500: '#ef4444' };

// Tema base
const theme = {
  colors: baseLightColors,
  typography: {},
  spacing: {},
  radius: {},
  shadows: {},
};

// Tokens de animação
const motionTokens = {
  duration: {
    normal: '300ms',
    fast: '150ms',
    slow: '400ms',
    slower: '600ms',
  },
  easing: {
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
  },
  delay: {
    short: '150ms',
    long: '250ms',
  },
};

// Tokens do Hero Section
const heroTokens = {
  title: {
    fontSize: { clamp: 'clamp(2rem, 4vw, 3rem)' },
    lineHeight: '1.1',
    letterSpacing: '-0.04em',
    wordSpacing: '0.12em',
    textShadow: {
      dark: '0 0 25px rgba(34, 211, 238, 0.7)',
      light: '0 0 18px rgba(59, 130, 246, 0.6)',
    },
    filter: 'drop-shadow(0 0 25px rgba(59,130,246,0.7))',
  },
  subtitle: {
    fontSize: { clamp: 'clamp(1rem, 2vw, 1.25rem)' },
    lineHeight: '1.5',
    letterSpacing: '-0.01em',
    textShadow: {
      dark: '0 0 16px rgba(34,197,235,0.55)',
      light: '0 0 12px rgba(37,99,235,0.5)',
    },
    maxWidth: '52rem',
  },
  container: {
    maxWidth: {
      lg: '72rem',
    },
    padding: {
      top: '3rem',
      bottom: '3rem',
      x: {
        mobile: '1.5rem',
      },
    },
    gap: '1.5rem',
  },
};

// Tokens responsivos
const RESPONSIVE = {
  SPACING: {
    RESPONSIVE_Y: 'py-8 sm:py-12 lg:py-16',
    RESPONSIVE_X: 'px-4 sm:px-6 lg:px-8',
  },
};

// Breakpoints
const breakpointTokens = {
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

// Z-index
const zIndexTokens = {
  base: 1,
  overlay: 10,
  modal: 50,
};

// Mock do pacote @rainersoft/design-tokens
const designTokensMock = {
  __esModule: true,
  
  // Gradientes e sombras
  GRADIENTS: {},
  SHADOWS: {},
  
  // Z-index
  Z_INDEX: {
    DROPDOWN: 'z-[1000]',
    MODAL: 'z-[1050]',
    PRIORITY: 'z-[1100]',
  },
  
  // Transições
  MOTION: {
    TRANSITION: {
      COLOR: 'transition-colors duration-200 ease-in-out',
      TRANSFORM: 'transition-transform duration-200 ease-in-out',
      DEFAULT: 'transition-all duration-200 ease-in-out',
    },
  },
  
  // Tokens
  motionTokens,
  tokens: {
    primitives: {
      color: {
        palette: baseLightColors,
        cyan: {
          '400': '#22d3ee',
          '500': '#06b6d4',
          '600': '#0891b2',
        },
        pink: {
          '400': '#f472b6',
          '500': '#ec4899',
          '600': '#db2777',
        },
        gray: {
          '100': '#f3f4f6',
          '200': '#e5e7eb',
          '300': '#d1d5db',
          '600': '#4b5563',
          '800': '#1f2937',
        },
        blue: {
          '500': '#3b82f6',
        },
        purple: {
          '400': '#a855f7',
          '500': '#8b5cf6',
        },
        green: {
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
        },
        emerald: {
          '400': '#34d399',
        },
      },
      typography: {
        fontSize: {
          '6xl': '3.75rem',
          xl: '1.25rem',
        },
        lineHeight: {
          relaxed: '1.625',
        },
      },
      spacing: {
        '0': '0px',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      gradients: {
        text: {
          primary: 'linear-gradient(135deg, #00e6ff 0%, #7d00ff 100%)',
        },
      },
      shadows: {
        lg: '0 10px 30px rgba(0,0,0,0.15)',
      },
      motion: motionTokens,
      breakpoints: breakpointTokens,
      breakpointsPrimitive: {
        '3xl': '1920px',
        '2xl': '1536px',
        xl: '1280px',
        lg: '1024px',
        md: '768px',
        sm: '640px',
      },
      zIndex: zIndexTokens,
    },
    semantics: {
      color: {
        roles: {
          primary: { base: baseLightColors.primary.base },
          secondary: { base: '#8b5cf6' },
          accent: { base: '#ec4899' },
        }
      }
    },
    themes: {
      light: {
        text: {
          primary: '#000000',
          secondary: '#666666',
        },
        primitive: lightThemeColors.primitive,
      },
      dark: {
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
        },
        primitive: baseDarkColors.primitive,
      },
    },
    colors: {
      light: baseLightColors,
      dark: baseDarkColors,
    },
    hero: heroTokens,
  },
  // Funções de acesso a paletas (espelham contrato da lib real)
  // Formato compatível com uso em PostCard: colors.primary/secondary/accent.base
  getLightColors: () => ({
    primary: { base: baseLightColors.primary.base },
    secondary: { base: '#8b5cf6' },
    accent: { base: '#ec4899' },
  }),
  getDarkColors: () => ({
    primary: { base: '#0ea5e9' },
    secondary: { base: '#8b5cf6' },
    accent: { base: '#ec4899' },
  }),
  
  // Utilitários
  breakpointTokens,
  zIndexTokens,
  RESPONSIVE,
  
  // Cores
  COLOR_NEUTRAL,
  COLOR_BLUE,
  COLOR_AMBER,
  COLOR_RED,
  
  // Backgrounds e gradientes
  BACKGROUND,
  GRADIENT_DIRECTIONS,
  
  // Temas
  lightThemeColors,
  darkThemeColors: baseDarkColors,
  lightTheme: theme,
  darkTheme: theme,
  themes: {
    light: theme,
    dark: theme,
  },
  
  // Funções utilitárias
  validateContrast: () => ({
    valid: true,
    level: 'AA',
    contrast: 4.5,
    message: 'mock-contrast',
  }),
};

// Aplica o mock
jest.mock('@rainersoft/design-tokens', () => designTokensMock);

// Export para uso em testes específicos
module.exports = {
  baseLightColors,
  baseDarkColors,
  GRADIENT_DIRECTIONS,
  BACKGROUND,
  lightThemeColors,
  COLOR_NEUTRAL,
  COLOR_BLUE,
  COLOR_AMBER,
  COLOR_RED,
  theme,
  motionTokens,
  heroTokens,
  RESPONSIVE,
  breakpointTokens,
  zIndexTokens,
};