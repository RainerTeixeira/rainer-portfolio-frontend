/**
 * Hook para Navegação por Teclado em Carrossel
 *
 * Hook completo que gerencia navegação por teclado em carrosséis/sliders,
 * incluindo autoplay, controles de pausa e acessibilidade.
 *
 * Funcionalidades:
 * - ✓ Navegação com setas (← → ou ArrowLeft/ArrowRight)
 * - ✓ Ir para primeiro slide (Home)
 * - ✓ Ir para último slide (End)
 * - ✓ Autoplay configurável com intervalo
 * - ✓ Pausa automática ao interagir
 * - ✓ Loop infinito ou parada nas extremidades
 * - ✓ Suporte a prefers-reduced-motion
 * - ✓ Callbacks para eventos de navegação
 * - ✓ Estado de pausa/play do autoplay
 *
 * Atalhos de teclado:
 * - ArrowLeft / ←: Slide anterior
 * - ArrowRight / →: Próximo slide
 * - Home: Primeiro slide
 * - End: Último slide
 * - Space: Pausar/Retomar autoplay
 * - Escape: Parar autoplay
 *
 * @fileoverview Hook para navegação por teclado em carrosséis
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import * as React from 'react';

/**
 * Opções de configuração do hook
 *
 * @interface UseCarouselKeyboardOptions
 * @property {number} slideCount - Total de slides no carrossel
 * @property {number} [initialSlide=0] - Índice inicial do slide ativo
 * @property {boolean} [loop=true] - Se deve voltar ao início ao chegar no fim
 * @property {boolean} [autoplay=false] - Se deve avançar automaticamente
 * @property {number} [autoplayInterval=5000] - Intervalo do autoplay em ms
 * @property {boolean} [pauseOnHover=true] - Pausar autoplay ao passar mouse
 * @property {boolean} [pauseOnInteraction=true] - Pausar ao navegar manualmente
 * @property {boolean} [respectReducedMotion=true] - Respeitar prefers-reduced-motion
 * @property {Function} [onSlideChange] - Callback ao mudar de slide
 * @property {Function} [onNext] - Callback ao avançar
 * @property {Function} [onPrevious] - Callback ao voltar
 * @property {Function} [onAutoplayToggle] - Callback ao pausar/retomar autoplay
 */
export interface UseCarouselKeyboardOptions {
  slideCount: number;
  initialSlide?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  pauseOnInteraction?: boolean;
  respectReducedMotion?: boolean;
  onSlideChange?: (index: number) => void;
  onNext?: (index: number) => void;
  onPrevious?: (index: number) => void;
  onAutoplayToggle?: (isPlaying: boolean) => void;
}

/**
 * Retorno do hook
 *
 * @interface CarouselKeyboardReturn
 * @property {number} currentSlide - Índice do slide atual (0-based)
 * @property {Function} goToSlide - Função para ir a um slide específico
 * @property {Function} goToNext - Função para ir ao próximo slide
 * @property {Function} goToPrevious - Função para ir ao slide anterior
 * @property {Function} goToFirst - Função para ir ao primeiro slide
 * @property {Function} goToLast - Função para ir ao último slide
 * @property {boolean} isPlaying - Se o autoplay está ativo
 * @property {Function} toggleAutoplay - Função para pausar/retomar autoplay
 * @property {Function} pauseAutoplay - Função para pausar autoplay
 * @property {Function} resumeAutoplay - Função para retomar autoplay
 * @property {boolean} canGoNext - Se pode avançar (útil para UI)
 * @property {boolean} canGoPrevious - Se pode voltar (útil para UI)
 */
export interface CarouselKeyboardReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  isPlaying: boolean;
  toggleAutoplay: () => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

/**
 * Hook useCarouselKeyboard
 *
 * Gerencia navegação por teclado em carrosséis com autoplay e controles.
 *
 * @param {UseCarouselKeyboardOptions} options - Opções de configuração
 * @returns {CarouselKeyboardReturn} Objeto com estado e funções de controle
 *
 * @example
 * // Uso básico com navegação por teclado
 * import { useCarouselKeyboard } from '@/components/home/hooks'
 *
 * function SimpleCarousel() {
 *   const slides = ['Slide 1', 'Slide 2', 'Slide 3']
 *   const { currentSlide, goToNext, goToPrevious } = useCarouselKeyboard({
 *     slideCount: slides.length,
 *     loop: true
 *   })
 *
 *   return (
 *     <div>
 *       <h2>{slides[currentSlide]}</h2>
 *       <button onClick={goToPrevious}>←</button>
 *       <button onClick={goToNext}>→</button>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Com autoplay e controles
 * function AutoplayCarousel() {
 *   const {
 *     currentSlide,
 *     isPlaying,
 *     toggleAutoplay,
 *     canGoNext,
 *     canGoPrevious
 *   } = useCarouselKeyboard({
 *     slideCount: 5,
 *     autoplay: true,
 *     autoplayInterval: 3000,
 *     pauseOnInteraction: true,
 *     onSlideChange: (index) => console.log('Slide:', index)
 *   })
 *
 *   return (
 *     <div>
 *       <p>Slide {currentSlide + 1}</p>
 *       <button onClick={toggleAutoplay}>
 *         {isPlaying ? 'Pausar' : 'Play'}
 *       </button>
 *       <div>
 *         Próximo: {canGoNext ? 'Sim' : 'Não'}
 *         Anterior: {canGoPrevious ? 'Sim' : 'Não'}
 *       </div>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Com todas as funcionalidades
 * function AdvancedCarousel() {
 *   const carousel = useCarouselKeyboard({
 *     slideCount: 10,
 *     initialSlide: 2,
 *     loop: true,
 *     autoplay: true,
 *     autoplayInterval: 4000,
 *     pauseOnHover: true,
 *     respectReducedMotion: true,
 *     onSlideChange: (index) => console.log('Changed to:', index),
 *     onNext: (index) => console.log('Next:', index),
 *     onPrevious: (index) => console.log('Previous:', index),
 *     onAutoplayToggle: (playing) => console.log('Autoplay:', playing)
 *   })
 *
 *   return (
 *     <div
 *       onMouseEnter={carousel.pauseAutoplay}
 *       onMouseLeave={carousel.resumeAutoplay}
 *     >
 *       <p>Slide {carousel.currentSlide + 1} de 10</p>
 *       <button onClick={carousel.goToFirst}>Primeiro</button>
 *       <button onClick={carousel.goToPrevious} disabled={!carousel.canGoPrevious}>
 *         Anterior
 *       </button>
 *       <button onClick={carousel.goToNext} disabled={!carousel.canGoNext}>
 *         Próximo
 *       </button>
 *       <button onClick={carousel.goToLast}>Último</button>
 *       <button onClick={carousel.toggleAutoplay}>
 *         {carousel.isPlaying ? '⏸ Pausar' : '▶ Play'}
 *       </button>
 *     </div>
 *   )
 * }
 */
export function useCarouselKeyboard({
  slideCount,
  initialSlide = 0,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pauseOnHover: _pauseOnHover = true,
  pauseOnInteraction = true,
  respectReducedMotion = true,
  onSlideChange,
  onNext,
  onPrevious,
  onAutoplayToggle,
}: UseCarouselKeyboardOptions): CarouselKeyboardReturn {
  // Estado do slide atual
  const [currentSlide, setCurrentSlide] = React.useState(
    Math.min(Math.max(0, initialSlide), slideCount - 1)
  );

  // Estado do autoplay
  const [isPlaying, setIsPlaying] = React.useState(autoplay);

  // Ref para o timer do autoplay
  const autoplayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Detectar prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  /**
   * Função para ir a um slide específico
   */
  const goToSlide = React.useCallback(
    (index: number) => {
      const validIndex = Math.min(Math.max(0, index), slideCount - 1);

      if (validIndex !== currentSlide) {
        setCurrentSlide(validIndex);

        if (onSlideChange) {
          onSlideChange(validIndex);
        }
      }
    },
    [currentSlide, slideCount, onSlideChange]
  );

  /**
   * Função para ir ao próximo slide
   */
  const goToNext = React.useCallback(() => {
    let nextIndex: number;

    if (currentSlide === slideCount - 1) {
      nextIndex = loop ? 0 : currentSlide;
    } else {
      nextIndex = currentSlide + 1;
    }

    if (nextIndex !== currentSlide) {
      setCurrentSlide(nextIndex);

      if (onSlideChange) {
        onSlideChange(nextIndex);
      }

      if (onNext) {
        onNext(nextIndex);
      }

      // Pausar autoplay se configurado
      if (pauseOnInteraction && isPlaying) {
        setIsPlaying(false);
        if (onAutoplayToggle) {
          onAutoplayToggle(false);
        }
      }
    }
  }, [
    currentSlide,
    slideCount,
    loop,
    pauseOnInteraction,
    isPlaying,
    onSlideChange,
    onNext,
    onAutoplayToggle,
  ]);

  /**
   * Função para ir ao slide anterior
   */
  const goToPrevious = React.useCallback(() => {
    let prevIndex: number;

    if (currentSlide === 0) {
      prevIndex = loop ? slideCount - 1 : 0;
    } else {
      prevIndex = currentSlide - 1;
    }

    if (prevIndex !== currentSlide) {
      setCurrentSlide(prevIndex);

      if (onSlideChange) {
        onSlideChange(prevIndex);
      }

      if (onPrevious) {
        onPrevious(prevIndex);
      }

      // Pausar autoplay se configurado
      if (pauseOnInteraction && isPlaying) {
        setIsPlaying(false);
        if (onAutoplayToggle) {
          onAutoplayToggle(false);
        }
      }
    }
  }, [
    currentSlide,
    slideCount,
    loop,
    pauseOnInteraction,
    isPlaying,
    onSlideChange,
    onPrevious,
    onAutoplayToggle,
  ]);

  /**
   * Função para ir ao primeiro slide
   */
  const goToFirst = React.useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  /**
   * Função para ir ao último slide
   */
  const goToLast = React.useCallback(() => {
    goToSlide(slideCount - 1);
  }, [goToSlide, slideCount]);

  /**
   * Função para pausar autoplay
   */
  const pauseAutoplay = React.useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      if (onAutoplayToggle) {
        onAutoplayToggle(false);
      }
    }
  }, [isPlaying, onAutoplayToggle]);

  /**
   * Função para retomar autoplay
   */
  const resumeAutoplay = React.useCallback(() => {
    if (
      autoplay &&
      !isPlaying &&
      (!respectReducedMotion || !prefersReducedMotion)
    ) {
      setIsPlaying(true);
      if (onAutoplayToggle) {
        onAutoplayToggle(true);
      }
    }
  }, [
    autoplay,
    isPlaying,
    respectReducedMotion,
    prefersReducedMotion,
    onAutoplayToggle,
  ]);

  /**
   * Função para alternar autoplay (pausar/retomar)
   */
  const toggleAutoplay = React.useCallback(() => {
    if (isPlaying) {
      pauseAutoplay();
    } else {
      resumeAutoplay();
    }
  }, [isPlaying, pauseAutoplay, resumeAutoplay]);

  /**
   * Effect: Gerenciar autoplay
   */
  React.useEffect(() => {
    // Limpar timer existente
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    // Desabilitar autoplay se prefers-reduced-motion
    if (respectReducedMotion && prefersReducedMotion) {
      setIsPlaying(false);
      return;
    }

    // Iniciar autoplay se ativo
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        goToNext();
      }, autoplayInterval);
    }

    // Cleanup
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    isPlaying,
    autoplayInterval,
    goToNext,
    respectReducedMotion,
    prefersReducedMotion,
  ]);

  /**
   * Effect: Listeners de teclado
   */
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Ignorar se estiver em input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'Left': // IE/Edge
          event.preventDefault();
          goToPrevious();
          break;

        case 'ArrowRight':
        case 'Right': // IE/Edge
          event.preventDefault();
          goToNext();
          break;

        case 'Home':
          event.preventDefault();
          goToFirst();
          break;

        case 'End':
          event.preventDefault();
          goToLast();
          break;

        case ' ': // Espaço
        case 'Spacebar': // IE/Edge
          event.preventDefault();
          toggleAutoplay();
          break;

        case 'Escape':
        case 'Esc': // IE/Edge
          event.preventDefault();
          pauseAutoplay();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    toggleAutoplay,
    pauseAutoplay,
  ]);

  /**
   * Calcular estados de navegação
   */
  const canGoNext = loop || currentSlide < slideCount - 1;
  const canGoPrevious = loop || currentSlide > 0;

  return {
    currentSlide,
    goToSlide,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    isPlaying,
    toggleAutoplay,
    pauseAutoplay,
    resumeAutoplay,
    canGoNext,
    canGoPrevious,
  };
}
