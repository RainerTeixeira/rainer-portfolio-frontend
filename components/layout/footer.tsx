/**
 * Footer Component - Clean Professional Design
 *
 * Rodapé profissional limpo e minimalista, organizando informações essenciais
 * em layout otimizado. Design dual (minimalista light, cyberpunk dark) com
 * partículas sutis e animações suaves.
 *
 * @module components/layout/footer
 * @fileoverview Componente de rodapé profissional clean
 * @author Rainer Teixeira
 * @version 5.0.0
 * @since 1.0.0
 */

// ============================================================================
// Constants & Configuration
// ============================================================================

import { FOOTER_CONFIG, NAVIGATION, SITE_CONFIG } from '@/constants';

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
// Utils
// ============================================================================

import { cn } from '@/lib/utils';
import {
  BACKGROUND,
  BADGE,
  BORDER_RADIUS,
  DIVIDER,
  FONT_WEIGHT,
  GRADIENT_DIRECTIONS,
  ICON,
  LINK,
  OPACITY,
  PARTICLE,
  TEXT,
  TRANSITIONS,
} from '@rainer/design-tokens';
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
        BACKGROUND.BORDER_TOP,
        BACKGROUND.BASE,
        BACKGROUND.DARK_GRADIENT
      )}
      role="contentinfo"
    >
      {/* Camada de brilho de fundo sutil */}
      <div
        className={cn(
          'absolute inset-0 blur-2xl pointer-events-none opacity-20 dark:opacity-10',
          GRADIENT_DIRECTIONS.TO_RIGHT,
          BACKGROUND.GRADIENT_OVERLAY
        )}
        aria-hidden="true"
      />

      {/* Partículas decorativas sutis (reduzidas) */}
      <div className={cn(PARTICLE.CONTAINER)} aria-hidden="true">
        <div
          className={cn(
            'absolute top-1/3 left-1/4 animate-pulse',
            PARTICLE.SIZES.SMALL,
            PARTICLE.COLORS.CYAN,
            PARTICLE.OPACITY.LOW,
            BORDER_RADIUS.FULL,
            PARTICLE.SHADOWS.CYAN
          )}
          style={{ animationDelay: '2s' }}
        />
        <div
          className={cn(
            'absolute bottom-1/3 right-1/4 animate-pulse',
            PARTICLE.SIZES.SMALL,
            PARTICLE.COLORS.PURPLE,
            PARTICLE.OPACITY.LOW,
            BORDER_RADIUS.FULL,
            PARTICLE.SHADOWS.PURPLE
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
                  TEXT.SIZES.LG,
                  FONT_WEIGHT.BOLD,
                  TEXT.COLORS.FOREGROUND,
                  TEXT.COLORS.DARK_CYAN_300,
                  'dark:font-mono'
                )}
              >
                {SITE_CONFIG.fullName}
              </h3>
              <p
                className={cn(
                  TEXT.SIZES.SM,
                  TEXT.COLORS.MUTED,
                  TEXT.COLORS.DARK_GRAY_300,
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
                    BORDER_RADIUS.FULL,
                    BADGE.GRADIENTS.PRIMARY,
                    BADGE.TEXT.PRIMARY,
                    BADGE.BORDERS.PRIMARY,
                    FONT_WEIGHT.SEMIBOLD,
                    TEXT.SIZES.XS
                  )}
                >
                  <CheckCircle2 className={cn(ICON.SIZES.TINY)} />
                  {SITE_CONFIG.experience} Anos
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1',
                    BORDER_RADIUS.FULL,
                    BADGE.GRADIENTS.SUCCESS,
                    BADGE.TEXT.SUCCESS,
                    BADGE.BORDERS.SUCCESS,
                    FONT_WEIGHT.SEMIBOLD,
                    TEXT.SIZES.XS
                  )}
                >
                  <Shield className={cn(ICON.SIZES.TINY)} />
                  LGPD
                </span>
              </div>
            </div>

            {/* 2. Navegação */}
            <div className="flex flex-col space-y-4">
              <h4
                className={cn(
                  TEXT.SIZES.BASE,
                  FONT_WEIGHT.SEMIBOLD,
                  TEXT.COLORS.FOREGROUND,
                  TEXT.COLORS.DARK_CYAN_300
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
                          TEXT.SIZES.SM,
                          TEXT.COLORS.MUTED,
                          TEXT.COLORS.DARK_GRAY_300,
                          TEXT.COLORS.HOVER_PRIMARY,
                          TEXT.COLORS.HOVER_CYAN,
                          TRANSITIONS.COLORS
                        )}
                      >
                        <ArrowRight
                          className={cn(
                            ICON.SIZES.TINY,
                            OPACITY.NONE,
                            'group-hover:opacity-100 group-hover:translate-x-1',
                            TRANSITIONS.TRANSFORM,
                            TRANSITIONS.OPACITY
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
                  TEXT.SIZES.BASE,
                  FONT_WEIGHT.SEMIBOLD,
                  TEXT.COLORS.FOREGROUND,
                  TEXT.COLORS.DARK_CYAN_300
                )}
              >
                Serviços
              </h4>
              <ul className="space-y-2">
                {FOOTER_CONFIG.services.items.slice(0, 4).map(service => (
                  <li key={service.fullName}>
                    <div
                      className={cn(
                        TEXT.SIZES.SM,
                        TEXT.COLORS.MUTED,
                        TEXT.COLORS.DARK_GRAY_300,
                        TEXT.COLORS.HOVER_FOREGROUND,
                        TEXT.COLORS.HOVER_CYAN,
                        TRANSITIONS.COLORS,
                        'cursor-default leading-relaxed'
                      )}
                    >
                      {service.fullName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Contato */}
            <div className="flex flex-col space-y-4">
              <h4
                className={cn(
                  TEXT.SIZES.BASE,
                  FONT_WEIGHT.SEMIBOLD,
                  TEXT.COLORS.FOREGROUND,
                  TEXT.COLORS.DARK_CYAN_300
                )}
              >
                Contato
              </h4>
              <div className="space-y-3">
                {/* Email */}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email.address}`}
                  className={cn(
                    'flex items-center gap-2 group',
                    TEXT.SIZES.SM,
                    TEXT.COLORS.MUTED,
                    TEXT.COLORS.DARK_GRAY_300,
                    TEXT.COLORS.HOVER_PRIMARY,
                    TEXT.COLORS.HOVER_CYAN,
                    TRANSITIONS.COLORS
                  )}
                  aria-label={`Enviar email para ${SITE_CONFIG.contact.email.address}`}
                >
                  <Mail className={cn(ICON.SIZES.SMALL, ICON.COLORS.PRIMARY)} />
                  <span className="break-all text-xs">
                    {SITE_CONFIG.contact.email.address}
                  </span>
                </a>

                {/* Telefone */}
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.number.replace(/\s/g, '')}`}
                  className={cn(
                    'flex items-center gap-2 group',
                    TEXT.SIZES.SM,
                    TEXT.COLORS.MUTED,
                    TEXT.COLORS.DARK_GRAY_300,
                    TEXT.COLORS.HOVER_PRIMARY,
                    TEXT.COLORS.HOVER_CYAN,
                    TRANSITIONS.COLORS
                  )}
                  aria-label={`Ligar para ${SITE_CONFIG.contact.phone.number}`}
                >
                  <Phone
                    className={cn(ICON.SIZES.SMALL, ICON.COLORS.PRIMARY)}
                  />
                  <span>{SITE_CONFIG.contact.phone.number}</span>
                </a>

                {/* Localização */}
                <div
                  className={cn(
                    'flex items-center gap-2',
                    TEXT.SIZES.SM,
                    TEXT.COLORS.MUTED,
                    TEXT.COLORS.DARK_GRAY_300
                  )}
                >
                  <MapPin
                    className={cn(ICON.SIZES.SMALL, ICON.COLORS.PRIMARY)}
                  />
                  <span>{SITE_CONFIG.contact.location.city}</span>
                </div>

                {/* Redes sociais */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'p-2 rounded-lg transition-all',
                      TEXT.COLORS.MUTED,
                      TEXT.COLORS.HOVER_PRIMARY,
                      TEXT.COLORS.HOVER_CYAN,
                      LINK.HOVER_BG,
                      'hover:scale-110',
                      TRANSITIONS.COLORS,
                      TRANSITIONS.TRANSFORM
                    )}
                    aria-label="Visitar GitHub"
                  >
                    <GitHubIcon className={cn(ICON.SIZES.DEFAULT)} />
                  </a>
                  <a
                    href={SITE_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'p-2 rounded-lg transition-all',
                      TEXT.COLORS.MUTED,
                      TEXT.COLORS.HOVER_PRIMARY,
                      TEXT.COLORS.HOVER_CYAN,
                      LINK.HOVER_BG,
                      'hover:scale-110',
                      TRANSITIONS.COLORS,
                      TRANSITIONS.TRANSFORM
                    )}
                    aria-label="Visitar LinkedIn"
                  >
                    <Linkedin className={cn(ICON.SIZES.DEFAULT)} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor sutil full-width */}
        <div
          className={cn('w-full border-t', DIVIDER.BORDER)}
          aria-hidden="true"
        />

        {/* Rodapé inferior minimalista */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p
                className={cn(
                  TEXT.SIZES.SM,
                  TEXT.COLORS.MUTED,
                  TEXT.COLORS.DARK_GRAY_400
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
                  TEXT.SIZES.XS,
                  TEXT.COLORS.MUTED,
                  TEXT.COLORS.HOVER_PRIMARY,
                  TEXT.COLORS.HOVER_CYAN,
                  TRANSITIONS.COLORS
                )}
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className={cn(
                  TEXT.SIZES.XS,
                  TEXT.COLORS.MUTED,
                  TEXT.COLORS.HOVER_PRIMARY,
                  TEXT.COLORS.HOVER_CYAN,
                  TRANSITIONS.COLORS
                )}
              >
                Termos
              </Link>
              <Link
                href="/cookies"
                className={cn(
                  TEXT.SIZES.XS,
                  TEXT.COLORS.MUTED,
                  TEXT.COLORS.HOVER_PRIMARY,
                  TEXT.COLORS.HOVER_CYAN,
                  TRANSITIONS.COLORS
                )}
              >
                Cookies
              </Link>
              <Link
                href="/cookies/settings"
                className={cn(
                  TEXT.SIZES.XS,
                  TEXT.COLORS.MUTED,
                  TEXT.COLORS.HOVER_PRIMARY,
                  TEXT.COLORS.HOVER_CYAN,
                  TRANSITIONS.COLORS
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
