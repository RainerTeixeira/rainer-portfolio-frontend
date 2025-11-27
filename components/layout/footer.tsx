"use client";

/**
 * Footer Component - Clean Professional Design
 *
 * Rodapé profissional limpo e minimalista, organizando informações essenciais
 * em layout otimizado. Design dual (minimalista light, cyberpunk dark) com
 * partículas sutis e animações suaves.
 *
 * @module components/layout/footer
 * @fileoverview Componente de rodapé profissional clean usando design tokens
 * @author Rainer Teixeira
 * @version 6.0.0 - Migrado para design tokens
 * @since 1.0.0
 */

// ============================================================================
// Constants & Configuration
// ============================================================================

import { NAVIGATION, SERVICOS, SITE_CONFIG, METRICAS } from '@/constants';

// ============================================================================
// Icons
// ============================================================================

import {
  ArrowRight,
  CheckCircle2,
  Github as GitHubIcon,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
} from 'lucide-react';

// ============================================================================
// Design Tokens
// ============================================================================

import {
  GRADIENT_DIRECTIONS,
  MOTION,
  SHADOWS,
  RESPONSIVE,
  lightThemeColors,
  darkThemeColors,
} from '@rainersoft/design-tokens';

// ============================================================================
// Utils
// ============================================================================

import { cn } from '@/lib/portfolio';
import Link from 'next/link';
// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do rodapé clean e profissional
 */
export function Footer() {
  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden border-t',
        // Background usando tokens
        'bg-[var(--color-background-primary)]',
        'dark:bg-[var(--color-background-primary)]',
        // Border usando tokens
        'border-[var(--color-border-primary)]',
        'dark:border-[var(--color-primary-base)]/20'
      )}
      role="contentinfo"
    >
      {/* Camada de brilho de fundo sutil */}
      <div
        className={cn(
          'absolute inset-0 blur-2xl pointer-events-none opacity-20 dark:opacity-10',
          GRADIENT_DIRECTIONS.TO_RIGHT,
          // Cores de gradiente usando tokens primitivos
          'from-[var(--color-primitive-cyan-500)]/5',
          'via-[var(--color-primitive-purple-500)]/5',
          'to-[var(--color-primitive-pink-500)]/5',
          'dark:from-[var(--color-primitive-cyan-400)]/5',
          'dark:via-[var(--color-primitive-purple-400)]/5',
          'dark:to-[var(--color-primitive-pink-400)]/5'
        )}
        aria-hidden="true"
      />

      {/* Partículas decorativas sutis (reduzidas) */}
      <div
        className={cn(
          'fixed inset-0 -z-10 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute top-1/3 left-1/4 animate-pulse',
            'w-1.5 h-1.5',
            // Cor usando token primário
            'bg-[var(--color-primary-base)]',
            'opacity-40',
            'rounded-full',
            // Shadow usando token com cor primária
            SHADOWS.LARGE,
            'shadow-[var(--color-primary-base)]/50'
          )}
          style={{ animationDelay: '2s' }}
        />
        <div
          className={cn(
            'absolute bottom-1/3 right-1/4 animate-pulse',
            'w-1.5 h-1.5',
            // Cor usando token secundário
            'bg-[var(--color-secondary-base)]',
            'opacity-40',
            'rounded-full',
            // Shadow usando token com cor secundária
            SHADOWS.LARGE,
            'shadow-[var(--color-secondary-base)]/50'
          )}
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Container principal full-width */}
      <div className="relative z-10 w-full">
        {/* Conteúdo principal com max-width centralizado */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
          {/* Grid principal - 4 colunas limpas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 items-start">
            {/* 1. Sobre */}
            <div className="flex flex-col space-y-4">
              <h3
                className={cn(
                  'text-lg',
                  'font-bold',
                  // Text usando tokens
                  'text-[var(--color-text-primary)]',
                  'dark:text-[var(--color-primary-hover)]',
                  'dark:font-mono'
                )}
              >
                {SITE_CONFIG.fullName}
              </h3>
              <p
                className={cn(
                  'text-sm',
                  // Text usando tokens
                  'text-[var(--color-text-secondary)]',
                  'dark:text-[var(--color-primitive-neutral-300)]',
                  'leading-relaxed'
                )}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {SITE_CONFIG.description}
              </p>

              {/* Badges mínimos */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1',
                    'rounded-full',
                    // Gradiente usando tokens
                    `${GRADIENT_DIRECTIONS.TO_BR}`,
                    'from-[var(--color-primary-base)]/10',
                    'to-[var(--color-primary-base)]/20',
                    'text-[var(--color-primary-base)]',
                    'border border-[var(--color-primary-base)]/30',
                    'font-semibold',
                    'text-xs'
                  )}
                >
                  <CheckCircle2 className={cn('h-3 w-3')} />
                  {METRICAS.anosExperiencia} Anos
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1',
                    'rounded-full',
                    // Gradiente usando tokens de status success
                    `${GRADIENT_DIRECTIONS.TO_BR}`,
                    'from-[var(--color-status-success-base)]/10',
                    'to-[var(--color-primitive-green-600)]/20',
                    'text-[var(--color-primitive-green-600)]',
                    'dark:text-[var(--color-primitive-green-400)]',
                    'border border-[var(--color-status-success-base)]/30',
                    'font-semibold',
                    'text-xs'
                  )}
                >
                  <Shield className={cn('h-3 w-3')} />
                  LGPD
                </span>
              </div>
            </div>

            {/* 2. Navegação */}
            <div className="flex flex-col space-y-4">
              <h4
                className={cn(
                  'text-base',
                  'font-semibold',
                  // Text usando tokens
                  'text-[var(--color-text-primary)]',
                  'dark:text-[var(--color-primary-hover)]'
                )}
              >
                Navegação
              </h4>
              <nav aria-label="Navegação rápida">
                <ul className="space-y-2">
                  {NAVIGATION.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'inline-flex items-center gap-2 group',
                          'text-sm',
                          // Text usando tokens
                          'text-[var(--color-text-secondary)]',
                          'dark:text-[var(--color-primitive-neutral-300)]',
                          'hover:text-[var(--color-primary-base)]',
                          'dark:hover:text-[var(--color-primary-base)]',
                          // Transition usando token MOTION
                          MOTION.TRANSITION.COLOR
                        )}
                      >
                        <ArrowRight
                          className={cn(
                            'h-3 w-3',
                            'opacity-0',
                            'group-hover:opacity-100 group-hover:translate-x-1',
                            'transition-transform duration-200 ease-in-out',
                            'transition-opacity duration-200 ease-in-out'
                          )}
                        />
                        {item.fullName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* 3. Serviços */}
            <div className="flex flex-col space-y-4">
              <h4
                className={cn(
                  'text-base',
                  'font-semibold',
                  // Text usando tokens
                  'text-[var(--color-text-primary)]',
                  'dark:text-[var(--color-primary-hover)]'
                )}
              >
                Serviços
              </h4>
              <ul className="space-y-2">
                {SERVICOS.slice(0, 4).map(service => (
                  <li key={service.titulo}>
                    <div
                      className={cn(
                        'text-sm',
                        // Text usando tokens
                        'text-[var(--color-text-secondary)]',
                        'dark:text-[var(--color-primitive-neutral-300)]',
                        'hover:text-[var(--color-text-primary)]',
                        'dark:hover:text-[var(--color-primary-base)]',
                        // Transition usando token MOTION
                        MOTION.TRANSITION.COLOR,
                        'cursor-default leading-relaxed'
                      )}
                    >
                      {service.titulo}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Contato */}
            <div className="flex flex-col space-y-4">
              <h4
                className={cn(
                  'text-base',
                  'font-semibold',
                  // Text usando tokens
                  'text-[var(--color-text-primary)]',
                  'dark:text-[var(--color-primary-hover)]'
                )}
              >
                Contato
              </h4>
              <div className="space-y-3">
                {/* Email principal (comercial) */}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email.comercial}`}
                  className={cn(
                    'flex items-center gap-2 group',
                    'text-sm',
                    // Text usando tokens
                    'text-[var(--color-text-secondary)]',
                    'dark:text-[var(--color-primitive-neutral-300)]',
                    'hover:text-[var(--color-primary-base)]',
                    'dark:hover:text-[var(--color-primary-base)]',
                    // Transition usando token MOTION
                    MOTION.TRANSITION.COLOR
                  )}
                  aria-label={`Enviar email para ${SITE_CONFIG.contact.email.comercial}`}
                >
                  <Mail
                    className={cn(
                      'h-4 w-4',
                      'text-[var(--color-primary-base)]',
                      'dark:text-[var(--color-primary-base)]'
                    )}
                  />
                  <span className="break-all text-xs">
                    {SITE_CONFIG.contact.email.comercial}
                  </span>
                </a>

                {/* Telefone (prioriza WhatsApp, senão comercial) */}
                {(() => {
                  const contact = SITE_CONFIG.contact;
                  const phone = contact?.phone;
                  const rawPhone = phone?.whatsapp || phone?.comercial;

                  if (!rawPhone) return null;

                  const telHref = `tel:${rawPhone}`;

                  return (
                    <a
                      href={telHref}
                      className={cn(
                        'flex items-center gap-2 group',
                        'text-sm',
                        // Text usando tokens
                        'text-[var(--color-text-secondary)]',
                        'dark:text-[var(--color-primitive-neutral-300)]',
                        'hover:text-[var(--color-primary-base)]',
                        'dark:hover:text-[var(--color-primary-base)]',
                        // Transition usando token MOTION
                        MOTION.TRANSITION.COLOR
                      )}
                      aria-label={`Ligar para ${rawPhone}`}
                    >
                      <Phone
                        className={cn(
                          'h-4 w-4',
                          'text-[var(--color-primary-base)]',
                          'dark:text-[var(--color-primary-base)]'
                        )}
                      />
                      <span>{rawPhone}</span>
                    </a>
                  );
                })()}

                {/* Localização (sede principal) */}
                <div
                  className={cn(
                    'flex items-center gap-2',
                    'text-sm',
                    // Text usando tokens
                    'text-[var(--color-text-secondary)]',
                    'dark:text-[var(--color-primitive-neutral-300)]'
                  )}
                >
                  <MapPin
                    className={cn(
                      'h-4 w-4',
                      'text-[var(--color-primary-base)]',
                      'dark:text-[var(--color-primary-base)]'
                    )}
                  />
                  <span>{SITE_CONFIG.contact.location.headquarters.city}</span>
                </div>

                {/* Redes sociais */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'p-2 rounded-lg',
                      // Text usando tokens
                      'text-[var(--color-text-secondary)]',
                      'hover:text-[var(--color-primary-base)]',
                      'dark:hover:text-[var(--color-primary-base)]',
                      'hover:bg-[var(--color-accent-base)]/50',
                      'hover:scale-110',
                      // Transitions usando tokens MOTION
                      MOTION.TRANSITION.COLOR,
                      MOTION.TRANSITION.TRANSFORM
                    )}
                    aria-label="Visitar GitHub"
                  >
                    <GitHubIcon className={cn('h-5 w-5')} />
                  </a>
                  <a
                    href={SITE_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'p-2 rounded-lg',
                      // Text usando tokens
                      'text-[var(--color-text-secondary)]',
                      'hover:text-[var(--color-primary-base)]',
                      'dark:hover:text-[var(--color-primary-base)]',
                      'hover:bg-[var(--color-accent-base)]/50',
                      'hover:scale-110',
                      // Transitions usando tokens MOTION
                      MOTION.TRANSITION.COLOR,
                      MOTION.TRANSITION.TRANSFORM
                    )}
                    aria-label="Visitar LinkedIn"
                  >
                    <Linkedin className={cn('h-5 w-5')} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor sutil full-width */}
        <div
          className={cn(
            'w-full border-t',
            // Border usando tokens
            'border-[var(--color-border-primary)]/50',
            'dark:border-[var(--color-primary-base)]/20'
          )}
          aria-hidden="true"
        />

        {/* Rodapé inferior minimalista */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p
                className={cn(
                  'text-sm',
                  // Text usando tokens
                  'text-[var(--color-text-secondary)]',
                  'dark:text-[var(--color-primitive-neutral-400)]'
                )}
              >
                &copy; {new Date().getFullYear()} {SITE_CONFIG.fullName}. Todos
                os direitos reservados.
              </p>
            </div>

            {/* Links legais */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/privacidade"
                className={cn(
                  'text-xs',
                  // Text usando tokens
                  'text-[var(--color-text-secondary)]',
                  'hover:text-[var(--color-primary-base)]',
                  'dark:hover:text-[var(--color-primary-base)]',
                  // Transition usando token MOTION
                  MOTION.TRANSITION.COLOR
                )}
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className={cn(
                  'text-xs',
                  // Text usando tokens
                  'text-[var(--color-text-secondary)]',
                  'hover:text-[var(--color-primary-base)]',
                  'dark:hover:text-[var(--color-primary-base)]',
                  // Transition usando token MOTION
                  MOTION.TRANSITION.COLOR
                )}
              >
                Termos
              </Link>
              <Link
                href="/cookies"
                className={cn(
                  'text-xs',
                  // Text usando tokens
                  'text-[var(--color-text-secondary)]',
                  'hover:text-[var(--color-primary-base)]',
                  'dark:hover:text-[var(--color-primary-base)]',
                  // Transition usando token MOTION
                  MOTION.TRANSITION.COLOR
                )}
              >
                Cookies
              </Link>
              <Link
                href="/cookies/settings"
                className={cn(
                  'text-xs',
                  // Text usando tokens
                  'text-[var(--color-text-secondary)]',
                  'hover:text-[var(--color-primary-base)]',
                  'dark:hover:text-[var(--color-primary-base)]',
                  // Transition usando token MOTION
                  MOTION.TRANSITION.COLOR
                )}
              >
                Gerenciar Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


