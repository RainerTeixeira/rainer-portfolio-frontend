/**
 * Auth Branding Component
 *
 * Componente de branding para o lado esquerdo das páginas de autenticação.
 * Exibe logo, descrição e cards informativos com design gradiente.
 *
 * @module components/domain/dashboard/login/auth-branding
 * @fileoverview Componente de branding para autenticação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/portfolio';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';

interface AuthBrandingProps {
  /** Classes customizadas */
  className?: string;
}

/**
 * AuthBranding Component
 *
 * Branding side panel para páginas de autenticação.
 * Visível apenas em telas grandes (lg+) com design gradiente.
 *
 * @param {AuthBrandingProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de branding
 */
export function AuthBranding({ className }: AuthBrandingProps): JSX.Element {
  return (
    <div
      className={cn(
        'hidden lg:flex flex-col justify-between relative overflow-hidden',
        // Padding responsivo
        'p-8 xl:p-10 2xl:p-12',
        'text-white',
        // Gradiente animado
        GRADIENT_DIRECTIONS.TO_BR,
        'from-cyan-500 via-blue-600 to-purple-700',
        'bg-size-[200%_200%]',
        'animate-gradient-shift',
        className
      )}
    >
      {/* Overlay com padrão */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Partículas brilhantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.2,
              repeat: Infinity,
              delay: Math.random() * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header com Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.15,
            }}
          >
            <Link
              href="/"
              className={cn(
                'inline-block mb-5 xl:mb-7 2xl:mb-8',
                'group',
                'transition-all duration-200 ease-in-out'
              )}
            >
              <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tight drop-shadow-2xl">
                {SITE_CONFIG.fullName}
              </h1>
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.15,
            }}
            className="text-cyan-100/90 text-lg xl:text-xl 2xl:text-2xl drop-shadow-lg font-medium"
          >
            Dashboard de Administração
          </motion.p>
        </motion.div>

        {/* Cards Informativos */}
        <div className="space-y-4 xl:space-y-5 2xl:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.2,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.02,
              x: 5,
              transition: {
                duration: 0.15,
              },
            }}
          >
            <div
              className={cn(
                'flex items-start gap-4',
                'p-5 xl:p-6',
                'bg-white/10',
                'backdrop-blur-md',
                'rounded-lg',
                'border border-white/20',
                'shadow-2xl',
                'shadow-black/10',
                'transition-all duration-200 ease-in-out',
                'hover:bg-white/15 hover:border-white/30',
                'hover:shadow-black/20'
              )}
            >
              <motion.div
                className={cn(
                  'p-2.5',
                  'bg-white/10',
                  'backdrop-blur-sm',
                  'rounded-md',
                  'border border-white/20'
                )}
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Shield className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 drop-shadow-md" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-semibold text-base xl:text-lg mb-2 drop-shadow-sm">
                  Autenticação Segura
                </h3>
                <p className="text-sm xl:text-base text-cyan-100/80 leading-relaxed">
                  Integração com AWS Cognito para máxima segurança
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card de Visual Moderno - Destaque */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.266,
              duration: 0.2,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.03,
              x: 8,
              transition: {
                duration: 0.2,
              },
            }}
            className="relative group/card"
          >
            {/* Glow effect no hover */}
            <div
              className={cn(
                'absolute -inset-1',
                'rounded-xl',
                'opacity-0 group-hover/card:opacity-100',
                GRADIENT_DIRECTIONS.TO_RIGHT,
                'from-cyan-400/30 via-purple-400/30 to-pink-400/30',
                'backdrop-blur-xl',
                'transition-all duration-200 ease-in-out',
                '-z-10'
              )}
            />

            <div
              className={cn(
                'relative flex flex-col gap-4 xl:gap-5',
                'p-6 xl:p-8 2xl:p-10',
                'bg-white/15',
                'backdrop-blur-xl',
                'rounded-xl',
                'border-2 border-white/30',
                'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]',
                'shadow-black/20',
                'transition-all duration-200 ease-in-out',
                'hover:bg-white/20 hover:border-white/40',
                'hover:shadow-cyan-500/30'
              )}
            >
              {/* Header do Card */}
              <div className="flex items-center gap-4">
                <motion.div
                  className={cn(
                    'p-3 xl:p-4',
                    'bg-white/20',
                    'backdrop-blur-sm',
                    'rounded-lg',
                    'border border-white/30',
                    'shadow-2xl'
                  )}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="w-6 h-6 xl:w-8 xl:h-8 text-cyan-200 drop-shadow-lg" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg xl:text-xl 2xl:text-2xl mb-1 drop-shadow-md">
                    Experiência Moderna
                  </h3>
                  <p className="text-xs xl:text-sm text-cyan-100/80">
                    Design inovador e único
                  </p>
                </div>
              </div>

              {/* Conteúdo Expandido */}
              <div className="space-y-3">
                <p className="text-base xl:text-lg 2xl:text-xl text-white/90 leading-relaxed font-medium">
                  Interface intuitiva e responsiva para todos os dispositivos
                </p>

                {/* Features destacadas */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div
                    className={cn(
                      'p-3 xl:p-4',
                      'bg-white/10',
                      'backdrop-blur-sm',
                      'rounded-md',
                      'border border-white/20'
                    )}
                  >
                    <div className="text-xs xl:text-sm font-semibold text-cyan-200 mb-1">
                      ✨ Design Único
                    </div>
                    <div className="text-xs text-cyan-100/70">
                      Interface exclusiva
                    </div>
                  </div>
                  <div
                    className={cn(
                      'p-3 xl:p-4',
                      'bg-white/10',
                      'backdrop-blur-sm',
                      'rounded-md',
                      'border border-white/20'
                    )}
                  >
                    <div className="text-xs xl:text-sm font-semibold text-cyan-200 mb-1">
                      🚀 Performance
                    </div>
                    <div className="text-xs text-cyan-100/70">
                      Rápido e fluido
                    </div>
                  </div>
                </div>

                {/* Badge de destaque */}
                <div
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-4 py-2',
                    GRADIENT_DIRECTIONS.TO_RIGHT,
                    'from-cyan-400/30 to-purple-400/30',
                    'backdrop-blur-sm',
                    'rounded-full',
                    'border border-white/30',
                    'shadow-2xl'
                  )}
                >
                  <span className="text-xs xl:text-sm font-bold text-white">
                    🎨 UI/UX Premium
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


