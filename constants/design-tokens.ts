/**
 * Design Tokens
 * 
 * Sistema centralizado de tokens de design para toda a aplicação.
 * Define valores consistentes para animações, espaçamentos, cores e efeitos.
 * 
 * Características:
 * - Valores reutilizáveis
 * - Single source of truth
 * - Type-safe com readonly
 * - Fácil manutenção
 * - Consistência garantida
 * 
 * @fileoverview Design tokens centralizados da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Animation Tokens
// ============================================================================

/**
 * Durações de animação em milissegundos
 */
export const ANIMATION_DURATION_MS = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const

/**
 * Delays de animação para efeitos staggered
 */
export const ANIMATION_DELAYS = {
  NONE: '0s',
  SHORT: '0.1s',
  MEDIUM: '0.3s',
  LONG: '0.5s',
  PARTICLE_1: '0s',
  PARTICLE_2: '1s',
  PARTICLE_3: '2s',
} as const

/**
 * Configurações de spring animation
 */
export const SPRING_CONFIGS = {
  SMOOTH: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  BOUNCY: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
  GENTLE: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 40,
  },
} as const

// ============================================================================
// Scroll Tokens
// ============================================================================

/**
 * Thresholds de scroll em pixels
 */
export const SCROLL_THRESHOLDS = {
  BACK_TO_TOP: 300,
  NAVBAR_GLASSMORPHISM: 10,
  SECTION_REVEAL: 100,
} as const

/**
 * Comportamentos de scroll
 */
export const SCROLL_BEHAVIOR = {
  SMOOTH: 'smooth' as const,
  INSTANT: 'auto' as const,
} as const

// ============================================================================
// Spacing Tokens
// ============================================================================

/**
 * Espaçamentos padronizados para seções
 */
export const SECTION_SPACING = {
  PADDING_Y: {
    MOBILE: 'py-12',
    TABLET: 'sm:py-16',
    DESKTOP: 'md:py-20',
    LARGE: 'lg:py-24',
  },
  MARGIN_BOTTOM: {
    SMALL: 'mb-8',
    MEDIUM: 'mb-12',
    LARGE: 'mb-16',
    XLARGE: 'mb-20',
  },
  GAP: {
    SMALL: 'gap-4',
    MEDIUM: 'gap-6',
    LARGE: 'gap-8',
    XLARGE: 'gap-12',
  },
} as const

// ============================================================================
// Typography Tokens
// ============================================================================

/**
 * Classes de tipografia padronizadas
 */
export const TYPOGRAPHY = {
  HEADING_1: 'text-4xl sm:text-5xl md:text-6xl font-black',
  HEADING_2: 'text-3xl sm:text-4xl md:text-5xl font-bold',
  HEADING_3: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  HEADING_4: 'text-xl sm:text-2xl font-semibold',
  BODY_LARGE: 'text-lg sm:text-xl',
  BODY: 'text-base',
  BODY_SMALL: 'text-sm',
  CAPTION: 'text-xs',
} as const

// ============================================================================
// Gradient Tokens
// ============================================================================

/**
 * Gradientes reutilizáveis
 */
export const GRADIENTS = {
  PRIMARY: 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600',
  PRIMARY_DARK: 'dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400',
  CYAN_BLUE: 'from-cyan-500 to-blue-600',
  PURPLE_PINK: 'from-purple-500 to-pink-600',
  ORANGE_AMBER: 'from-orange-500 to-amber-600',
  GREEN_EMERALD: 'from-green-500 to-emerald-600',
} as const

// ============================================================================
// Shadow Tokens
// ============================================================================

/**
 * Sombras padronizadas
 */
export const SHADOWS = {
  SMALL: 'shadow-sm',
  MEDIUM: 'shadow-md',
  LARGE: 'shadow-lg',
  XLARGE: 'shadow-xl',
  XXLARGE: 'shadow-2xl',
  GLOW_CYAN: 'shadow-cyan-500/20',
  GLOW_PURPLE: 'shadow-purple-500/20',
  GLOW_PINK: 'shadow-pink-500/20',
} as const

// ============================================================================
// Z-Index Tokens
// ============================================================================

/**
 * Sistema de z-index hierárquico
 * 
 * Previne conflitos de camadas com valores bem definidos
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  PARTICLES: 0,
  CONTENT: 10,
  OVERLAY: 20,
  DROPDOWN: 30,
  STICKY: 40,
  NAVBAR: 50,
  MODAL: 60,
  POPOVER: 70,
  TOOLTIP: 80,
  TOAST: 90,
  MAX: 9999,
} as const

// ============================================================================
// Breakpoint Tokens
// ============================================================================

/**
 * Breakpoints responsivos em pixels
 */
export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// ============================================================================
// Border Radius Tokens
// ============================================================================

/**
 * Border radius padronizados
 */
export const BORDER_RADIUS = {
  NONE: 'rounded-none',
  SM: 'rounded-sm',
  DEFAULT: 'rounded',
  MD: 'rounded-md',
  LG: 'rounded-lg',
  XL: 'rounded-xl',
  '2XL': 'rounded-2xl',
  '3XL': 'rounded-3xl',
  FULL: 'rounded-full',
} as const

// ============================================================================
// Icon Size Tokens
// ============================================================================

/**
 * Tamanhos de ícones padronizados
 */
export const ICON_SIZES = {
  XS: 'h-3 w-3',
  SM: 'h-4 w-4',
  MD: 'h-5 w-5',
  LG: 'h-6 w-6',
  XL: 'h-8 w-8',
  '2XL': 'h-10 w-10',
  '3XL': 'h-12 w-12',
} as const

// ============================================================================
// Transition Tokens
// ============================================================================

/**
 * Classes de transição padronizadas
 */
export const TRANSITIONS = {
  FAST: 'transition-all duration-150',
  NORMAL: 'transition-all duration-300',
  SLOW: 'transition-all duration-500',
  COLORS: 'transition-colors duration-300',
  TRANSFORM: 'transition-transform duration-300',
  OPACITY: 'transition-opacity duration-300',
} as const

// ============================================================================
// Backdrop Blur Tokens
// ============================================================================

/**
 * Valores de backdrop blur
 */
export const BACKDROP_BLUR = {
  NONE: 'backdrop-blur-none',
  SM: 'backdrop-blur-sm',
  DEFAULT: 'backdrop-blur',
  MD: 'backdrop-blur-md',
  LG: 'backdrop-blur-lg',
  XL: 'backdrop-blur-xl',
  '2XL': 'backdrop-blur-2xl',
  '3XL': 'backdrop-blur-3xl',
} as const

// ============================================================================
// Container Tokens
// ============================================================================

/**
 * Classes de container padronizadas
 */
export const CONTAINER = {
  MAX_WIDTH: {
    SM: 'max-w-sm',
    MD: 'max-w-md',
    LG: 'max-w-lg',
    XL: 'max-w-xl',
    '2XL': 'max-w-2xl',
    '3XL': 'max-w-3xl',
    '4XL': 'max-w-4xl',
    '5XL': 'max-w-5xl',
    '6XL': 'max-w-6xl',
    '7XL': 'max-w-7xl',
    FULL: 'max-w-full',
  },
  PADDING: {
    MOBILE: 'px-4',
    TABLET: 'sm:px-6',
    DESKTOP: 'lg:px-8',
  },
} as const

// ============================================================================
// Loading States
// ============================================================================

/**
 * Números padrão para skeleton loaders
 */
export const SKELETON_COUNTS = {
  BLOG_POSTS: 4,
  DASHBOARD_STATS: 4,
  RECENT_POSTS: 5,
  PORTFOLIO_ITEMS: 6,
} as const

// ============================================================================
// Feature Limits
// ============================================================================

/**
 * Limites de features
 */
export const LIMITS = {
  MAX_FEATURED_POSTS: 3,
  MAX_RECENT_POSTS: 5,
  MAX_RELATED_POSTS: 3,
  MAX_TESTIMONIALS: 6,
  POST_EXCERPT_LENGTH: 160,
  META_DESCRIPTION_LENGTH: 160,
} as const

// ============================================================================
// Timing Tokens
// ============================================================================

/**
 * Tempos em milissegundos para operações
 */
export const TIMING = {
  DEBOUNCE_SEARCH: 300,
  TOAST_DURATION: 3000,
  SAVE_DELAY: 500,
  SAVE_SUCCESS_DISPLAY: 2000,
  SLIDE_DURATION: 6000,
  AUTO_HIDE_NOTIFICATION: 5000,
} as const

// ============================================================================
// Local Storage Keys
// ============================================================================

/**
 * Chaves do localStorage organizadas
 */
export const STORAGE_KEYS = {
  AUTH_USER: 'auth_user',
  THEME: 'theme',
  BLOG_POSTS: 'blog_posts',
  NEWSLETTER_SUBSCRIBED: 'newsletter_subscribed',
  INSTALL_PROMPT_DISMISSED: 'install_prompt_dismissed',
  HIGH_SCORE: 'cyberworlds-highscore',
  WORLDS_COMPLETED: 'cyberworlds-completed',
} as const

// ============================================================================
// API Endpoints (Mock)
// ============================================================================

/**
 * Endpoints de API (preparado para backend real)
 */
export const API_ENDPOINTS = {
  BLOG: {
    LIST: '/api/blog',
    GET: (slug: string) => `/api/blog/${slug}`,
    CREATE: '/api/blog',
    UPDATE: (id: string) => `/api/blog/${id}`,
    DELETE: (id: string) => `/api/blog/${id}`,
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  CONTACT: {
    SEND: '/api/contact',
  },
  NEWSLETTER: {
    SUBSCRIBE: '/api/newsletter/subscribe',
  },
} as const

// ============================================================================
// Error Messages
// ============================================================================

/**
 * Mensagens de erro padronizadas
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PASSWORD: 'Senha deve ter no mínimo 8 caracteres',
  LOGIN_FAILED: 'Credenciais inválidas',
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
  GENERIC_ERROR: 'Algo deu errado. Tente novamente.',
  UNAUTHORIZED: 'Você não tem permissão para esta ação',
  NOT_FOUND: 'Recurso não encontrado',
} as const

/**
 * Mensagens de sucesso padronizadas
 */
export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post criado com sucesso!',
  POST_UPDATED: 'Post atualizado com sucesso!',
  POST_DELETED: 'Post deletado com sucesso!',
  DATA_SAVED: 'Dados salvos com sucesso!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  EMAIL_SENT: 'Email enviado com sucesso!',
  SUBSCRIBED: 'Inscrição realizada com sucesso!',
} as const

// ============================================================================
// Regex Patterns
// ============================================================================

/**
 * Expressões regulares para validação
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_BR: /^\+?55\s?\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/,
  URL: /^https?:\/\/.+/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const

// ============================================================================
// Feature Flags
// ============================================================================

/**
 * Feature flags para controle de funcionalidades
 */
export const FEATURE_FLAGS = {
  ENABLE_BLOG_COMMENTS: false,
  ENABLE_DARK_MODE: true,
  ENABLE_PWA: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NEWSLETTER: true,
  ENABLE_CONTACT_FORM: true,
  ENABLE_DASHBOARD: true,
  ENABLE_EASTER_EGG_404: true,
} as const

// ============================================================================
// External Links
// ============================================================================

/**
 * Links externos organizados
 */
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/rainerteixeira',
  LINKEDIN: 'https://linkedin.com/in/rainerteixeira',
  WEBSITE: 'https://rainersoft.com.br',
  EMAIL: 'mailto:suporte@rainersoft.com.br',
  WHATSAPP: 'https://wa.me/5524999137382',
} as const

// ============================================================================
// PWA Tokens
// ============================================================================

/**
 * Configurações PWA
 */
export const PWA_CONFIG = {
  APP_NAME: 'Rainer Soft',
  SHORT_NAME: 'RainerSoft',
  DESCRIPTION: 'Empresa de Desenvolvimento Full-Stack',
  THEME_COLOR: '#000000',
  BACKGROUND_COLOR: '#000000',
} as const

// ============================================================================
// SEO Tokens
// ============================================================================

/**
 * Configurações de SEO
 */
export const SEO_CONFIG = {
  DEFAULT_TITLE_SUFFIX: ' | Rainer Soft',
  MAX_TITLE_LENGTH: 60,
  MAX_DESCRIPTION_LENGTH: 160,
  DEFAULT_OG_IMAGE: '/og-image.png',
  DEFAULT_TWITTER_IMAGE: '/twitter-image.png',
} as const

// ============================================================================
// Form Tokens
// ============================================================================

/**
 * Configurações de formulários
 */
export const FORM_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
  DEBOUNCE_TIME_MS: 300,
} as const

// ============================================================================
// Grid Tokens
// ============================================================================

/**
 * Configurações de grid responsivo
 */
export const GRID_COLUMNS = {
  MOBILE: 'grid-cols-1',
  TABLET: 'sm:grid-cols-2',
  DESKTOP: 'lg:grid-cols-3',
  LARGE: 'xl:grid-cols-4',
  STATS: 'grid-cols-2 md:grid-cols-4',
  BLOG: 'grid-cols-1 md:grid-cols-2',
  PORTFOLIO: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const

// ============================================================================
// Image Tokens
// ============================================================================

/**
 * Configurações de imagens
 */
export const IMAGE_CONFIG = {
  AVATAR_SIZE: 160,
  THUMBNAIL_SIZE: 400,
  COVER_SIZE: 1200,
  QUALITY: 85,
  FORMATS: ['image/webp', 'image/avif', 'image/jpeg'] as const,
} as const

// ============================================================================
// Accessibility Tokens
// ============================================================================

/**
 * Configurações de acessibilidade
 */
export const A11Y_CONFIG = {
  FOCUS_RING: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  FOCUS_RING_DARK: 'dark:ring-offset-black dark:focus-visible:ring-cyan-400',
  SKIP_TO_CONTENT_ID: 'main-content',
} as const

// ============================================================================
// Type Exports
// ============================================================================

/**
 * Type helpers para melhor autocomplete
 */
export type AnimationDuration = keyof typeof ANIMATION_DURATION_MS
export type AnimationDelay = keyof typeof ANIMATION_DELAYS
export type ScrollThreshold = keyof typeof SCROLL_THRESHOLDS
export type Gradient = keyof typeof GRADIENTS
export type Shadow = keyof typeof SHADOWS
export type ZIndex = keyof typeof Z_INDEX
export type Breakpoint = keyof typeof BREAKPOINTS
export type BorderRadius = keyof typeof BORDER_RADIUS
export type IconSize = keyof typeof ICON_SIZES
export type Typography = keyof typeof TYPOGRAPHY

