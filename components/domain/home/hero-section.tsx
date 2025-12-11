/**
 * Hero Section Component
 *
 * Componente de seção hero com design holográfico futurista, carousel animado
 * e conteúdo dinâmico rotativo. Primeira impressão visual da página inicial
 * com múltiplos slides e navegação por teclado.
 *
 * @module components/domain/home/hero-section
 * @fileoverview Hero section com carousel animado e conteúdo dinâmico
 * 
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <HeroSection />
 * ```
 *
 * Características:
 * - Carousel animado com múltiplos slides
 * - Design holográfico futurista
 * - Conteúdo dinâmico rotativo
 * - Animações suaves com Framer Motion
 * - Suporte a tema claro/escuro
 * - Navegação por teclado
 * - Loading state otimizado
 */

'use client';

import { cn } from '@/lib/portfolio';
import { hexToRGBA, MatrixBackground } from '@rainersoft/ui';
import {
  GRADIENTS,
  GRADIENT_DIRECTIONS,
  tokens,
  motionTokens,
  breakpointTokens,
  zIndexTokens,
  MOTION,
  Z_INDEX,
  RESPONSIVE,
} from '@rainersoft/design-tokens';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { CONTEUDO_HERO, ESTILOS_HERO, CTA_HERO } from '@/constants/content/home/hero';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
// HeroLoadingState removido - não é mais necessário
<<<<<<< HEAD
import { useCarouselKeyboard } from '@/hooks';
=======
import { useCarouselKeyboard } from '@rainersoft/utils';
>>>>>>> 37a9ca0b91e93f600ba06236ec3f69f5d3d432d6

// ============================================================================
// Dynamic Imports
// ============================================================================

// Importação dinâmica do carousel com tratamento de erro
const Carousel = dynamic(
  () => import('./carousel').catch(() => {
    // Em caso de erro, retornar componente vazio
    return { default: () => null };
  }),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  }
);
  
// ============================================================================
// Constants
// ============================================================================

/**
 * Textos principais exibidos no hero
 */
// Usando constantes centralizadas
const HERO_TITLES = CONTEUDO_HERO.titulos;

/**
 * Subtítulos descritivos correspondentes aos títulos
 */
const HERO_SUBTITLES = CONTEUDO_HERO.subtitulos;

/**
 * Duração de cada slide em milissegundos
 */
const SLIDE_DURATION_MS = 6000;

// ============================================================================
// Types
// ============================================================================

interface HeroContentOverlayProps {
  readonly currentSlideIndex: number;
  readonly isDarkTheme: boolean;
  readonly goToSlide?: (index: number) => void;
}

// ============================================================================
// Components
// ============================================================================

// HeroLoadingState removido - loading acontece apenas no loading-screen

function parseCubicBezier(easing: string | undefined): [number, number, number, number] | undefined {
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
 * Overlay de conteúdo do hero com animações
 */
function HeroContentOverlay({
  currentSlideIndex,
  isDarkTheme,
  goToSlide,
}: HeroContentOverlayProps) {
  const [hasMounted, setHasMounted] = useState(false);

  // Durante SSR, sempre usar tema claro para garantir consistência
  const safeIsDarkTheme = hasMounted ? isDarkTheme : false;

  // Marcar como montado após primeiro render no cliente (após hidratação)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Garantir índice estável durante SSR (sempre 0)
  // Isso garante que o conteúdo seja idêntico entre servidor e cliente
  // Durante SSR e primeiro render: stableIndex = 0
  // Após hidratação: stableIndex = currentSlideIndex (com validação)
  const displayIndex = hasMounted ? currentSlideIndex : 0;
  const safeIndex = Math.max(0, Math.min(displayIndex, HERO_TITLES.length - 1));
  const stableIndex = hasMounted ? safeIndex : 0;
  const displayTitle = HERO_TITLES[stableIndex];
  const displaySubtitle = HERO_SUBTITLES[stableIndex];

  // Estilos dos tokens (sem inline styles)
  const titleStyle: CSSProperties = {
    fontSize: tokens.hero.title.fontSize.clamp,
    lineHeight: tokens.hero.title.lineHeight,
    letterSpacing: tokens.hero.title.letterSpacing,
    wordSpacing: tokens.hero.title.wordSpacing,
    textShadow: safeIsDarkTheme
      ? tokens.hero.title.textShadow.dark
      : tokens.hero.title.textShadow.light,
    filter: tokens.hero.title.filter,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: tokens.hero.subtitle.fontSize.clamp,
    lineHeight: tokens.hero.subtitle.lineHeight,
    letterSpacing: tokens.hero.subtitle.letterSpacing,
    textShadow: safeIsDarkTheme
      ? tokens.hero.subtitle.textShadow.dark
      : tokens.hero.subtitle.textShadow.light,
    maxWidth: tokens.hero.subtitle.maxWidth,
  };

  return (
    <>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none",
          RESPONSIVE.SPACING.RESPONSIVE_Y,
          RESPONSIVE.SPACING.RESPONSIVE_X,
          Z_INDEX.PRIORITY
        )}
        aria-live="polite"
        aria-atomic="true"
      >
      <div className="relative z-10 w-full mx-auto pointer-events-auto" style={{ maxWidth: tokens.hero.container.maxWidth.lg }}>
        <div
          className="text-center relative z-20 flex flex-col justify-center items-center"
          style={{
            paddingTop: tokens.hero.container.padding.top,
            paddingBottom: tokens.hero.container.padding.bottom,
            paddingLeft: tokens.hero.container.padding.x.mobile,
            paddingRight: tokens.hero.container.padding.x.mobile,
            gap: tokens.hero.container.gap,
          }}
        >
          {/* Título principal - Key baseado no índice para permitir animações entre slides */}
          <motion.h1
            key={`title-${stableIndex}`}
            initial={hasMounted ? { opacity: 0, y: 30, scale: 0.9 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              hasMounted 
                ? { 
                    delay: Number(motionTokens.delay.long.replace('ms', '')) / 1000,
                    duration: Number(motionTokens.duration.slower.replace('ms', '')) / 1000,
                    ease: parseCubicBezier(motionTokens.easing.easeOut) ?? 'easeOut'
                  } 
                : { duration: 0 }
            }
            className={cn(
              'font-extrabold tracking-tight px-2 sm:px-0',
              'text-white drop-shadow-lg',
              'cyberpunk-title'
            )}
            style={titleStyle}
            suppressHydrationWarning
          >
            {displayTitle}
          </motion.h1>

          {/* Subtítulo - Key baseado no índice para permitir animações entre slides */}
          <motion.p
            key={`subtitle-${stableIndex}`}
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              hasMounted 
                ? { 
                    delay: 0.3,  // delay.longer não existe mais, usando valor fixo
                    duration: Number(motionTokens.duration.slow.replace('ms', '')) / 1000,
                    ease: parseCubicBezier(motionTokens.easing.easeInOut) ?? 'easeInOut'
                  } 
                : { duration: 0 }
            }
            className="font-normal text-emerald-400 dark:text-emerald-400 px-4 sm:px-0 max-w-4xl mx-auto"
            style={subtitleStyle}
            suppressHydrationWarning
          >
            {displaySubtitle}
          </motion.p>
        </div>
      </div>
      </div>
    </>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do Hero Section
 *
 * Renderiza uma seção hero full-screen com:
 * - Carousel animado de fundo
 * - Conteúdo dinâmico rotativo
 * - Suporte a tema claro/escuro
 * - Gradientes de overlay
 */
export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Previne erro de hidratação SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ==========================================================
     HOOK DE NAVEGAÇÃO POR TECLADO COM AUTOPLAY 🎹
     ========================================================== */
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  const { goToNext, goToPrevious, goToIndex } = useCarouselKeyboard({
    totalItems: HERO_TITLES.length,
    currentIndex: currentSlideIndex,
    onIndexChange: setCurrentSlideIndex,
    loop: true,
    autoPlay: false,
    autoPlayInterval: SLIDE_DURATION_MS
  });

  const pauseAutoplay = () => {}; // Placeholder
  const resumeAutoplay = () => {}; // Placeholder
  const goToSlide = goToIndex;

  // Durante SSR, sempre usar índice 0 para garantir hidratação correta
  const safeSlideIndex = isMounted ? currentSlideIndex : 0;
  const isDarkTheme = isMounted && resolvedTheme === 'dark';

  // Iniciar autoplay apenas após hidratação completa
  useEffect(() => {
    if (!isMounted) return undefined;

    // Delay para garantir que a hidratação terminou antes de iniciar autoplay
    const timer = setTimeout(() => {
      resumeAutoplay();
    }, 1000);
    return () => clearTimeout(timer);
  }, [isMounted, resumeAutoplay]);

  return (
    <header
      className={
        'relative w-full h-svh sm:h-screen flex items-center justify-center overflow-hidden'
      }
      style={{
        minHeight: 'max(100svh, 600px)',
        maxHeight: '100svh',
      }}
      aria-label="Seção principal de apresentação"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Layer 1: Matrix Rain Effect (apenas no hero) */}
      {isMounted && (
        <div className="absolute inset-0 z-[5] opacity-85" aria-hidden="true">
          <MatrixBackground variant="local" />
        </div>
      )}

      {/* Layer 2: Gradiente de overlay */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          'z-10', // Um pouco acima do base
          GRADIENT_DIRECTIONS.TO_BOTTOM,
          'from-black/50 via-transparent to-black/60'
        )}
        aria-hidden="true"
      />

      {/* Layer 3: Conteúdo principal (z-20) */}
      <HeroContentOverlay
        currentSlideIndex={safeSlideIndex}
        isDarkTheme={isDarkTheme}
        goToSlide={goToSlide}
      />

      {/* Controles de navegação - Profissionais */}
      {isMounted && (
        <>
          {/* Botão Anterior */}
          <button
            onClick={goToPrevious}
            className={cn(
              "absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 group",
              "z-50" // Acima do conteúdo
            )}
            aria-label="Slide anterior"
          >
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md bg-black/30 dark:bg-black/50 border border-cyan-400/30 dark:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:bg-black/50 dark:hover:bg-black/70 hover:border-cyan-400/60">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          </button>

          {/* Botão Próximo */}
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 group",
              "z-50" // Acima do conteúdo
            )}
            aria-label="Próximo slide"
          >
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md bg-black/30 dark:bg-black/50 border border-cyan-400/30 dark:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:bg-black/50 dark:hover:bg-black/70 hover:border-cyan-400/60">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          </button>
        </>
      )}

      {/* Layer 4: Gradiente inferior */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none',
          GRADIENT_DIRECTIONS.TO_TOP,
          'from-black/80 via-black/40 to-transparent'
        )}
        aria-hidden="true"
      />
    </header>
  );
}


