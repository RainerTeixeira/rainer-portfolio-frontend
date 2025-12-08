/**
 * @fileoverview Componente de Botão OAuth para Google
 * 
 * @description
 * Componente profissional de botão para autenticação social via OAuth com Google.
 * Design consistente, animações suaves e integração completa com o design system.
 * 
 * Recursos:
 * - Botão estilizado para Google
 * - Animações de hover e tap
 * - Efeito shimmer no hover
 * - Ícone SVG otimizado
 * - Estados de disabled
 * - Totalmente responsivo
 * - Integração com design tokens
 * 
 * @module components/dashboard/login/oauth-button
 * @version 3.1.0
 * @author Rainer Teixeira
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * import { OAuthButton } from '@/components/dashboard/login/oauth-button';
 * 
 * function LoginPage() {
 *   return (
 *     <OAuthButton
 *       onGoogleLogin={() => window.location.href = '/auth/google'}
 *       disabled={isLoading}
 *     />
 *   );
 * }
 * ```
 */

'use client';

import { Button } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
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
  const parts = match[1]!
    .split(',')
    .map(value => Number.parseFloat(value.trim()));
  if (parts.length !== 4 || parts.some(Number.isNaN)) return undefined;
  return parts as [number, number, number, number];
}

/**
 * Configurações de animação para botão OAuth
 */
const ANIMATION_CONFIG = {
  duration: Number(motionTokens.duration.normal.replace('ms', '')) / 1000,
  shimmerDuration: Number(motionTokens.duration.slower.replace('ms', '')) / 1000 * 3,
  easeInOut: parseCubicBezier(motionTokens.easing.easeInOut) ?? 'easeInOut',
} as const;

/**
 * Classes CSS para botão OAuth
 */
const BUTTON_STYLES = {
  base: 'w-full h-9 sm:h-10 relative overflow-hidden group',
  text: 'text-sm font-normal',
  border: 'border-border',
  hover: 'hover:border-primary/50 hover:bg-accent/50',
  background: 'bg-background/50 backdrop-blur-sm',
  shadow: 'shadow-sm hover:shadow-md',
  radius: 'rounded-md',
  transition: MOTION.TRANSITION.DEFAULT,
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
} as const;

/**
 * Propriedades do componente OAuthButton
 */
interface OAuthButtonProps {
  onGoogleLogin: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente OAuthButton
 * 
 * @description
 * Renderiza botão profissional para autenticação social com Google.
 */
export function OAuthButton({
  onGoogleLogin,
  disabled = false,
  className,
}: OAuthButtonProps) {
  return (
    <div className={cn('w-full', className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
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
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ 
              duration: ANIMATION_CONFIG.shimmerDuration, 
              ease: ANIMATION_CONFIG.easeInOut 
            }}
          />
          <motion.div
            className="relative z-10 flex items-center justify-center"
            whileHover={{ x: 2 }}
            transition={{ duration: ANIMATION_CONFIG.duration }}
          >
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
    </div>
  );
}