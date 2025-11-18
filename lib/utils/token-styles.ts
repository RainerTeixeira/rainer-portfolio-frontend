/**
 * Token Styles Utilities
 * 
 * Utilitários para usar design tokens diretamente em estilos inline,
 * sem depender de classes do Tailwind CSS.
 * 
 * @fileoverview Utilitários para estilos baseados em tokens
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// Importação dinâmica para evitar erros de tipo em build
// Os tokens são acessados via variáveis CSS, não diretamente

/**
 * Obtém o tema atual baseado na classe 'dark' no documento
 */
export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Utilitários para criar estilos baseados em tokens
 */
export const tokenStyles = {
  /**
   * Obtém uma cor de background usando variável CSS do token
   */
  background: {
    primary: 'var(--color-background-primary)',
    secondary: 'var(--color-background-secondary)',
    tertiary: 'var(--color-background-tertiary)',
    inverse: 'var(--color-background-inverse)',
    overlay: 'var(--color-background-overlay)',
    muted: 'var(--color-background-muted)',
  },

  /**
   * Obtém uma cor de surface usando variável CSS do token
   */
  surface: {
    primary: 'var(--color-surface-primary)',
    secondary: 'var(--color-surface-secondary)',
    tertiary: 'var(--color-surface-tertiary)',
    elevated: 'var(--color-surface-elevated)',
    overlay: 'var(--color-surface-overlay)',
    glass: 'var(--color-surface-glass, rgba(15, 15, 26, 0.7))',
    hover: 'var(--color-surface-hover)',
    active: 'var(--color-surface-active)',
  },

  /**
   * Obtém uma cor de texto usando variável CSS do token
   */
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
    disabled: 'var(--color-text-disabled)',
    link: 'var(--color-text-link)',
    linkHover: 'var(--color-text-link-hover)',
    linkActive: 'var(--color-text-link-active)',
    onPrimary: 'var(--color-text-on-primary)',
    onSecondary: 'var(--color-text-on-secondary)',
    onAccent: 'var(--color-text-on-accent)',
    // Dark theme specific
    glow: 'var(--color-text-glow)',
    neonCyan: 'var(--color-text-neon-cyan)',
    neonPink: 'var(--color-text-neon-pink)',
    neonPurple: 'var(--color-text-neon-purple)',
    neonGreen: 'var(--color-text-neon-green)',
  },

  /**
   * Obtém uma cor de borda usando variável CSS do token
   */
  border: {
    primary: 'var(--color-border-primary)',
    secondary: 'var(--color-border-secondary)',
    tertiary: 'var(--color-border-tertiary)',
    focus: 'var(--color-border-focus)',
    focusRing: 'var(--color-border-focus-ring)',
    inverse: 'var(--color-border-inverse)',
    hover: 'var(--color-border-hover)',
    active: 'var(--color-border-active)',
    disabled: 'var(--color-border-disabled)',
    // Dark theme specific
    neon: 'var(--color-border-neon)',
    neonGlow: 'var(--color-border-neon-glow)',
  },

  /**
   * Obtém cores de status usando variável CSS do token
   */
  status: {
    success: {
      base: 'var(--color-status-success-base)',
      hover: 'var(--color-status-success-hover)',
      active: 'var(--color-status-success-active)',
      background: 'var(--color-status-success-background)',
      backgroundHover: 'var(--color-status-success-background-hover)',
      border: 'var(--color-status-success-border)',
      text: 'var(--color-status-success-text)',
      textOnBackground: 'var(--color-status-success-text-on-background)',
    },
    warning: {
      base: 'var(--color-status-warning-base)',
      hover: 'var(--color-status-warning-hover)',
      active: 'var(--color-status-warning-active)',
      background: 'var(--color-status-warning-background)',
      backgroundHover: 'var(--color-status-warning-background-hover)',
      border: 'var(--color-status-warning-border)',
      text: 'var(--color-status-warning-text)',
      textOnBackground: 'var(--color-status-warning-text-on-background)',
    },
    error: {
      base: 'var(--color-status-error-base)',
      hover: 'var(--color-status-error-hover)',
      active: 'var(--color-status-error-active)',
      background: 'var(--color-status-error-background)',
      backgroundHover: 'var(--color-status-error-background-hover)',
      border: 'var(--color-status-error-border)',
      text: 'var(--color-status-error-text)',
      textOnBackground: 'var(--color-status-error-text-on-background)',
    },
    info: {
      base: 'var(--color-status-info-base)',
      hover: 'var(--color-status-info-hover)',
      active: 'var(--color-status-info-active)',
      background: 'var(--color-status-info-background)',
      backgroundHover: 'var(--color-status-info-background-hover)',
      border: 'var(--color-status-info-border)',
      text: 'var(--color-status-info-text)',
      textOnBackground: 'var(--color-status-info-text-on-background)',
    },
  },

  /**
   * Obtém sombras usando variável CSS do token
   */
  shadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    base: 'var(--shadow-base)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    '2xl': 'var(--shadow-2xl)',
    inner: 'var(--shadow-inner)',
    // Dark theme specific
    glowCyan: 'var(--shadow-glow-cyan)',
    glowPink: 'var(--shadow-glow-pink)',
    glowPurple: 'var(--shadow-glow-purple)',
    glowGreen: 'var(--shadow-glow-green)',
  },

  /**
   * Obtém gradientes usando variável CSS do token
   */
  gradient: {
    primary: 'var(--gradient-primary)',
    secondary: 'var(--gradient-secondary)',
    accent: 'var(--gradient-accent)',
    background: 'var(--gradient-background)',
  },

  /**
   * Obtém raios de borda usando variável CSS do token
   */
  radius: {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    base: 'var(--radius-base)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    full: 'var(--radius-full)',
  },
} as const;

/**
 * Cria um objeto de estilo React com background usando gradiente do token
 */
export function gradientStyle(
  gradient: 'primary' | 'secondary' | 'accent' | 'background' = 'primary'
): React.CSSProperties {
  return {
    background: tokenStyles.gradient[gradient],
  };
}

/**
 * Cria um objeto de estilo React com background usando cor do token
 */
export function backgroundStyle(
  color: keyof typeof tokenStyles.background
): React.CSSProperties {
  return {
    backgroundColor: tokenStyles.background[color],
  };
}

/**
 * Cria um objeto de estilo React com cor de texto usando token
 */
export function textStyle(
  color: keyof typeof tokenStyles.text
): React.CSSProperties {
  return {
    color: tokenStyles.text[color],
  };
}

/**
 * Cria um objeto de estilo React com cor de borda usando token
 */
export function borderStyle(
  color: keyof typeof tokenStyles.border
): React.CSSProperties {
  return {
    borderColor: tokenStyles.border[color],
  };
}

/**
 * Cria um objeto de estilo React com sombra usando token
 */
export function shadowStyle(
  shadow: keyof typeof tokenStyles.shadow
): React.CSSProperties {
  return {
    boxShadow: tokenStyles.shadow[shadow],
  };
}

/**
 * Cria um objeto de estilo React completo usando múltiplos tokens
 */
export function createTokenStyle(options: {
  background?: keyof typeof tokenStyles.background;
  gradient?: 'primary' | 'secondary' | 'accent' | 'background';
  text?: keyof typeof tokenStyles.text;
  border?: keyof typeof tokenStyles.border;
  shadow?: keyof typeof tokenStyles.shadow;
  radius?: keyof typeof tokenStyles.radius;
  padding?: string;
  margin?: string;
}): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (options.gradient) {
    style.background = tokenStyles.gradient[options.gradient];
  } else if (options.background) {
    style.backgroundColor = tokenStyles.background[options.background];
  }

  if (options.text) {
    style.color = tokenStyles.text[options.text];
  }

  if (options.border) {
    style.borderColor = tokenStyles.border[options.border];
  }

  if (options.shadow) {
    style.boxShadow = tokenStyles.shadow[options.shadow];
  }

  if (options.radius) {
    style.borderRadius = tokenStyles.radius[options.radius];
  }

  if (options.padding) {
    style.padding = options.padding;
  }

  if (options.margin) {
    style.margin = options.margin;
  }

  return style;
}

