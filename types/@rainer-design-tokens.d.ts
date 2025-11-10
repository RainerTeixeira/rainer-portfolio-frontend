/**
 * Type declarations for @rainer/design-tokens
 * Temporary shim until TypeScript resolves the module correctly
 */

declare module '@rainer/design-tokens' {
  export const ANIMATION_DURATION_MS: {
    readonly INSTANT: 0;
    readonly FAST: 150;
    readonly NORMAL: 300;
    readonly SLOW: 500;
    readonly VERY_SLOW: 1000;
  };

  export const ANIMATION_DURATION: {
    readonly INSTANT: string;
    readonly FAST: string;
    readonly NORMAL: string;
    readonly SLOW: string;
    readonly VERY_SLOW: string;
    [key: string]: string;
  };

  export const GRADIENTS: {
    readonly PRIMARY: string;
    readonly PRIMARY_DARK: string;
    readonly TEXT_PRIMARY: string;
    readonly TEXT_CYAN_PURPLE: string;
    readonly TEXT_CYAN_PURPLE_PINK: string;
    readonly BUTTON_CYAN_BLUE: string;
    readonly BUTTON_PURPLE_PINK: string;
    readonly DECORATIVE_PRIMARY: string;
    [key: string]: string;
  };

  export const SHADOWS: {
    readonly NONE: string;
    readonly SMALL: string;
    readonly MEDIUM: string;
    readonly LARGE: string;
    readonly XLARGE: string;
    readonly XXLARGE: string;
    [key: string]: string;
  };

  export const BACKGROUND: {
    readonly BASE: string;
    readonly BASE_SOLID: string;
    readonly FULL: string;
    readonly GRADIENT_OVERLAY: string;
    readonly BACKDROP: string;
    [key: string]: string | Record<string, string>;
  };

  export const GRADIENT_DIRECTIONS: {
    readonly TO_RIGHT: string;
    readonly TO_LEFT: string;
    readonly TO_BOTTOM: string;
    readonly TO_TOP: string;
    readonly TO_BR: string;
    readonly TO_BL: string;
    readonly TO_TR: string;
    readonly TO_TL: string;
    [key: string]: string;
  };

  export const PARTICLE: {
    readonly CONTAINER: string;
    readonly SIZES: {
      readonly SMALL: string;
      readonly MEDIUM: string;
      readonly LARGE: string;
      [key: string]: string;
    };
    readonly COLORS: {
      readonly CYAN: string;
      readonly PURPLE: string;
      readonly PINK: string;
      [key: string]: string;
    };
    readonly OPACITY: {
      readonly LOW: string;
      readonly MEDIUM: string;
      readonly HIGH: string;
      [key: string]: string;
    };
    readonly SHADOWS: {
      readonly CYAN: string;
      readonly PURPLE: string;
      readonly PINK: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };

  export const DIVIDER: {
    readonly HEIGHT_THIN: string;
    readonly HEIGHT_THICK: string;
    readonly GRADIENT: {
      readonly THIN: string;
      readonly THICK: string;
      readonly CYAN: string;
      readonly PURPLE: string;
      readonly PINK: string;
      [key: string]: string;
    };
    readonly BORDER: string;
    [key: string]: string | Record<string, string>;
  };

  export const DOT: {
    readonly SIZES: {
      readonly TINY: string;
      readonly SMALL: string;
      readonly MEDIUM: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };

  export const TRANSITIONS: {
    readonly OPACITY_VERY_SLOW: string;
    [key: string]: string;
  };

  export const BORDER_RADIUS: {
    readonly FULL: string;
    [key: string]: string;
  };

  export const BACKDROP_BLUR: {
    readonly NONE: string;
    readonly SM: string;
    readonly DEFAULT: string;
    readonly MD: string;
    readonly LG: string;
    readonly XL: string;
    readonly '2XL': string;
    readonly '3XL': string;
    [key: string]: string;
  };

  export const ICON_SIZES: {
    readonly XS: string;
    readonly SM: string;
    readonly MD: string;
    readonly LG: string;
    readonly XL: string;
    readonly '2XL': string;
    readonly '3XL': string;
    [key: string]: string;
  };

  export const OPACITY: {
    readonly FULL: string;
    readonly HIGH: string;
    readonly MEDIUM: string;
    readonly LOW: string;
    readonly VERY_LOW: string;
    readonly NONE: string;
    [key: string]: string;
  };

  export const Z_INDEX_CLASSES: {
    readonly AUTO: string;
    readonly CONTENT: string;
    readonly OVERLAY: string;
    readonly DROPDOWN: string;
    readonly STICKY: string;
    readonly NAVBAR: string;
    readonly MODAL: string;
    readonly POPOVER: string;
    [key: string]: string;
  };

  export const FONT_WEIGHT: {
    readonly THIN: string;
    readonly LIGHT: string;
    readonly NORMAL: string;
    readonly MEDIUM: string;
    readonly SEMIBOLD: string;
    readonly BOLD: string;
    readonly EXTRABOLD: string;
    readonly BLACK: string;
    [key: string]: string;
  };

  export const TEXT: {
    readonly SIZES: {
      readonly XS: string;
      readonly SM: string;
      readonly BASE: string;
      readonly LG: string;
      readonly XL: string;
      [key: string]: string;
    };
    readonly COLORS: {
      readonly FOREGROUND: string;
      readonly MUTED: string;
      readonly PRIMARY: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };

  export const BADGE: {
    readonly GRADIENTS: {
      readonly PRIMARY: string;
      readonly SUCCESS: string;
      readonly BRAND: string;
      [key: string]: string;
    };
    readonly BORDERS: {
      readonly PRIMARY: string;
      readonly SUCCESS: string;
      [key: string]: string;
    };
    readonly TEXT: {
      readonly SUCCESS: string;
      readonly BRAND: string;
      readonly PRIMARY: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };

  export const ICON: {
    readonly SIZES: {
      readonly TINY: string;
      readonly SMALL: string;
      readonly DEFAULT: string;
      readonly MEDIUM: string;
      readonly LARGE: string;
      [key: string]: string;
    };
    readonly COLORS: {
      readonly PRIMARY: string;
      readonly MUTED: string;
      readonly FOREGROUND: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };

  export const LINK: {
    readonly COLOR: string;
    readonly HOVER_COLOR: string;
    readonly HOVER_BG: string;
    readonly HOVER_BORDER: string;
    readonly PADDING: string;
    readonly TRANSITION: string;
    [key: string]: string;
  };

  export const ANIMATIONS: {
    readonly SLIDE_DOWN: string;
    readonly SLIDE_UP: string;
    readonly FADE_IN: string;
    readonly FADE_OUT: string;
    readonly SCALE_IN: string;
    readonly SCALE_OUT: string;
    [key: string]: string;
  };

  export const COLORS: {
    readonly BACKGROUND: {
      readonly BASE: string;
      readonly CARD: string;
      readonly MUTED: string;
      [key: string]: string;
    };
    readonly BORDER: {
      readonly BASE: string;
      readonly MUTED: string;
      readonly PRIMARY: string;
      [key: string]: string;
    };
    readonly TEXT: {
      readonly PRIMARY: string;
      readonly MUTED: string;
      readonly FOREGROUND: string;
      [key: string]: string;
    };
    [key: string]: string | Record<string, string>;
  };
}
