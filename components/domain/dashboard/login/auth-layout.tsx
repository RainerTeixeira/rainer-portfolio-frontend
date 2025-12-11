/**
 * Auth Layout Component
 *
 * Layout compartilhado para páginas de autenticação (login, register, etc).
 * Fornece design split-screen responsivo com branding e área de conteúdo.
 *
 * @module components/domain/dashboard/login/auth-layout
 * @fileoverview Layout compartilhado para páginas de autenticação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/portfolio';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { AuthBranding } from './auth-branding';

interface AuthLayoutProps {
  /** Conteúdo principal (formulário) */
  children: ReactNode;
  /** Título da página (ex: "Entre na sua conta") */
  title?: string;
  /** Descrição/subtítulo */
  description?: string;
  /** Se deve mostrar o branding no lado esquerdo (desktop) */
  showBranding?: boolean;
  /** Conteúdo adicional após o card principal */
  footer?: ReactNode;
  /** Classes customizadas para o container */
  className?: string;
  /** Largura máxima do card de conteúdo */
  maxWidth?: 'sm' | 'md' | 'lg';
}

/**
 * AuthLayout Component
 *
 * Layout responsivo para páginas de autenticação com:
 * - Design split-screen em desktop (branding + formulário)
 * - Layout centralizado em mobile
 * - Responsivo e adaptável a diferentes tamanhos de tela
 *
 * @param {AuthLayoutProps} props - Propriedades do componente
 * @returns {JSX.Element} Layout de autenticação
 */
export function AuthLayout({
  children,
  title,
  description,
  showBranding = true,
  footer,
  className,
  maxWidth = 'sm',
}: AuthLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        'min-h-screen grid relative overflow-hidden',
        // Desktop: split-screen, Mobile: single column
        'lg:grid-cols-2',
        className
      )}
    >
      {/* Background Animado com Gradiente */}
      <div
        className={cn(
          'absolute inset-0 -z-10',
          'bg-linear-to-br',
          'from-cyan-50/30 via-blue-50/20 to-purple-50/30',
          'dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-purple-950/20',
          'transition-opacity duration-1000'
        )}
        style={{
          backgroundPosition: `${50 + mousePosition.x}% ${50 + mousePosition.y}%`,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Partículas Flutuantes Decorativas */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute rounded-full blur-xl opacity-20',
              i % 3 === 0 && 'bg-cyan-400',
              i % 3 === 1 && 'bg-blue-400',
              i % 3 === 2 && 'bg-purple-400'
            )}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Lado Esquerdo: Branding (apenas desktop) */}
      {showBranding && <AuthBranding />}

      {/* Lado Direito: Conteúdo Principal */}
      <div
        className={cn(
          'flex items-center justify-center relative',
          // Padding responsivo
          'p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12',
          'bg-background/80 backdrop-blur-sm'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          className={cn('w-full space-y-6', maxWidthClasses[maxWidth])}
        >
          {/* Header Mobile (apenas quando não há branding visível) */}
          {!showBranding && (
            <div className="text-center mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1
                  className={cn(
                    'text-2xl sm:text-3xl font-semibold tracking-tight mb-2',
                    `${GRADIENT_DIRECTIONS.TO_RIGHT} bg-clip-text text-transparent`,
                    'from-cyan-400 via-purple-400 to-pink-400'
                  )}
                >
                  {SITE_CONFIG.fullName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Dashboard de Administração
                </p>
              </motion.div>
            </div>
          )}

          {/* Card Principal com Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.2,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            className={cn(
              // Glassmorphism effect
              'bg-card/80 backdrop-blur-xl',
              'border border-border/50',
              'rounded-lg',
              'shadow-2xl',
              // Glow effect sutil
              'shadow-cyan-500/5 dark:shadow-cyan-400/10',
              // Padding responsivo
              'p-6 sm:p-7 md:p-8',
              // Transições suaves
              'transition-all duration-200 ease-in-out',
              // Hover effect
              'hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/20',
              'hover:border-primary/30'
            )}
          >
            {/* Título e Descrição */}
            {(title || description) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 sm:mb-7 md:mb-8"
              >
                {title && (
                  <h1
                    className={cn(
                      'text-xl sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2',
                      'bg-linear-to-r from-foreground to-foreground/70 bg-clip-text'
                    )}
                  >
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </motion.div>
            )}

            {/* Conteúdo (formulário) */}
            {children}

            {/* Footer adicional */}
            {footer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-6 border-t border-border/50"
              >
                {footer}
              </motion.div>
            )}
          </motion.div>

          {/* Footer padrão (link para home) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <motion.a
              href="/"
              className={cn(
                'text-sm text-muted-foreground hover:text-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
                'relative inline-block',
                'transition-colors duration-150'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">← Voltar para home</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


