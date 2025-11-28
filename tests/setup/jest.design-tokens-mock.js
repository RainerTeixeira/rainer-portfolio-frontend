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

// Cores do tema light
const lightThemeColors = {
  primitive: {
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
jest.mock('@rainersoft/design-tokens', () => ({
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
    colors: {
      light: baseLightColors,
      dark: baseDarkColors,
    },
    hero: heroTokens,
  },
  
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
}));

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