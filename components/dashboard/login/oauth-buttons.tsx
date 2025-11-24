/**
 * @fileoverview Componente de Botões OAuth
 * 
 * @description
 * Componente profissional de botões para autenticação social via OAuth.
 * Suporta Google e GitHub com design consistente, animações suaves
 * e integração completa com o design system.
 * 
 * Recursos:
 * - Botões estilizados para Google e GitHub
 * - Animações de hover e tap
 * - Efeito shimmer no hover
 * - Ícones SVG otimizados
 * - Estados de disabled
 * - Totalmente responsivo
 * - Integração com design tokens
 * 
 * @module components/dashboard/login/oauth-buttons
 * @version 3.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * import { OAuthButtons } from '@/components/dashboard/login/oauth-buttons';
 * 
 * function LoginPage() {
 *   return (
 *     <OAuthButtons
 *       onGoogleLogin={() => window.location.href = '/auth/google'}
 *       onGitHubLogin={() => window.location.href = '/auth/github'}
 *       disabled={isLoading}
 *     />
 *   );
 * }
 * ```
 */

'use client';

import { Button } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { MOTION, SHADOWS, motionTokens } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';

/**
 * Converte um easing em string `cubic-bezier(...)` para array numérico aceito pelo Motion
 */
function parseCubicBezier(
  easing: string | undefined
): [number, number, number, number] | undefined {
  if (!easing) return undefined;
  const match = easing.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) return undefined;
  const parts = match[1]
    .split(',')
    .map(value => Number.parseFloat(value.trim()));
  if (parts.length !== 4 || parts.some(Number.isNaN)) return undefined;
  return parts as [number, number, number, number];
}

/**
 * Configurações de animação para botões OAuth
 * 
 * @description
 * Configurações reutilizáveis para animações usando tokens do design system.
 * Garante consistência nas durações e delays em todos os botões.
 * 
 * @constant
 * @readonly
 */
const ANIMATION_CONFIG = {
  /** Duração padrão das animações em segundos */
  duration: Number(motionTokens.duration.normal.replace('ms', '')) / 1000,
  /** Duração do efeito shimmer */
  shimmerDuration: Number(motionTokens.duration.slower.replace('ms', '')) / 1000 * 3,
  /** Delay entre botões */
  staggerDelay: Number(motionTokens.delay.short.replace('ms', '')) / 1000,
  /** Easing suave */
  easeInOut: parseCubicBezier(motionTokens.easing.easeInOut) ?? 'easeInOut',
} as const;

/**
 * Classes CSS para botões OAuth
 * 
 * @description
 * Classes Tailwind CSS organizadas e reutilizáveis para botões OAuth.
 * Usa tokens do design system para garantir consistência visual.
 * 
 * @constant
 * @readonly
 */
const BUTTON_STYLES = {
  /** Classes base para todos os botões */
  base: 'w-full h-9 sm:h-10 relative overflow-hidden group',
  /** Classes de texto */
  text: 'text-sm font-normal',
  /** Classes de borda */
  border: 'border-border',
  /** Classes de hover */
  hover: 'hover:border-primary/50 hover:bg-accent/50',
  /** Classes de background */
  background: 'bg-background/50 backdrop-blur-sm',
  /** Classes de shadow */
  shadow: 'shadow-sm hover:shadow-md',
  /** Classes de border radius */
  radius: 'rounded-md', // radiusTokens.md
  /** Transição suave */
  transition: MOTION.TRANSITION.DEFAULT,
  /** Estados de disabled */
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
} as const;

/**
 * Propriedades do componente OAuthButtons
 * 
 * @interface OAuthButtonsProps
 * 
 * @property {Function} onGoogleLogin - Função callback para login com Google.
 *   Chamada quando o usuário clica no botão do Google.
 *   
 * @property {Function} onGitHubLogin - Função callback para login com GitHub.
 *   Chamada quando o usuário clica no botão do GitHub.
 *   
 * @property {boolean} [disabled=false] - Indica se os botões devem estar desabilitados.
 *   Útil durante processo de autenticação para prevenir cliques múltiplos.
 *   
 * @property {string} [className] - Classes CSS adicionais para o container.
 *   Útil para customização de espaçamento e layout.
 *   
 * @example
 * ```tsx
 * <OAuthButtons
 *   onGoogleLogin={handleGoogleAuth}
 *   onGitHubLogin={handleGitHubAuth}
 *   disabled={isAuthenticating}
 * />
 * ```
 */
interface OAuthButtonsProps {
  onGoogleLogin: () => void;
  onGitHubLogin: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente OAuthButtons
 * 
 * @description
 * Renderiza botões profissionais para autenticação social com Google e GitHub.
 * 
 * O componente gerencia animações individuais de cada botão e delega a lógica
 * de autenticação para callbacks fornecidos via props.
 * 
 * Recursos implementados:
 * - Animações de entrada sequenciais (stagger)
 * - Micro-animações em hover e tap
 * - Efeito shimmer animado
 * - Ícones SVG inline otimizados
 * - Estados visuais claros (normal, hover, disabled)
 * - Totalmente acessível (buttons, aria-hidden)
 * - Responsivo (mobile-first)
 * 
 * @component
 * @param {OAuthButtonsProps} props - Propriedades do componente
 * @returns {JSX.Element} Container com botões OAuth renderizados
 * 
 * @example
 * ```tsx
 * <OAuthButtons
 *   onGoogleLogin={loginWithGoogle}
 *   onGitHubLogin={loginWithGitHub}
 *   disabled={loading}
 * />
 * ```
 */
export function OAuthButtons({
  onGoogleLogin,
  onGitHubLogin,
  disabled = false,
  className,
}: OAuthButtonsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* ==================== Botão Google ==================== */}
      
      {/** 
       * Botão de Login com Google
       * 
       * @description
       * Botão para iniciar autenticação OAuth com Google.
       * Inclui ícone do Google, animações de hover e efeito shimmer.
       */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: ANIMATION_CONFIG.staggerDelay,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.easeInOut,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleLogin}
          disabled={disabled}
          className={cn(
            BUTTON_STYLES.base,
            BUTTON_STYLES.text,
            BUTTON_STYLES.border,
            BUTTON_STYLES.hover,
            BUTTON_STYLES.background,
            BUTTON_STYLES.shadow,
            BUTTON_STYLES.radius,
            BUTTON_STYLES.transition,
            BUTTON_STYLES.disabled
          )}
        >
          {/** 
           * Efeito shimmer no hover
           * 
           * @description
           * Animação de brilho que percorre o botão no hover.
           * Cria uma experiência visual premium.
           */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ 
              duration: ANIMATION_CONFIG.shimmerDuration, 
              ease: ANIMATION_CONFIG.easeInOut 
            }}
          />
          {/** Conteúdo do botão com micro-animação */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            whileHover={{ x: 2 }}
            transition={{ duration: ANIMATION_CONFIG.duration }}
          >
            {/** Ícone do Google com animação de rotação */}
            <motion.svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ 
                duration: ANIMATION_CONFIG.duration * 2.5,
              }}
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </motion.svg>
            <span>Continuar com Google</span>
          </motion.div>
        </Button>
      </motion.div>

      {/* ==================== Botão GitHub ==================== */}
      
      {/** 
       * Botão de Login com GitHub
       * 
       * @description
       * Botão para iniciar autenticação OAuth com GitHub.
       * Inclui ícone do GitHub (Octocat), animações de hover e efeito shimmer.
       */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: ANIMATION_CONFIG.staggerDelay * 2,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.easeInOut,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onGitHubLogin}
          disabled={disabled}
          className={cn(
            BUTTON_STYLES.base,
            BUTTON_STYLES.text,
            BUTTON_STYLES.border,
            BUTTON_STYLES.hover,
            BUTTON_STYLES.background,
            BUTTON_STYLES.shadow,
            BUTTON_STYLES.radius,
            BUTTON_STYLES.transition,
            BUTTON_STYLES.disabled
          )}
        >
          {/** 
           * Efeito shimmer no hover
           * 
           * @description
           * Animação de brilho que percorre o botão no hover.
           * Cria uma experiência visual premium.
           */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ 
              duration: ANIMATION_CONFIG.shimmerDuration, 
              ease: ANIMATION_CONFIG.easeInOut 
            }}
          />
          {/** Conteúdo do botão com micro-animação */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            whileHover={{ x: 2 }}
            transition={{ duration: ANIMATION_CONFIG.duration }}
          >
            {/** Ícone do GitHub (Octocat) com animação de rotação */}
            <motion.svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              whileHover={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: ANIMATION_CONFIG.duration * 2.5,
              }}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </motion.svg>
            <span>Continuar com GitHub</span>
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
