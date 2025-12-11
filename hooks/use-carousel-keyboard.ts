/**
 * Hook para controlar carrossel com teclado
 * Suporta navegação com setas e atalhos
 */
import { useEffect, useCallback } from 'react';

export interface UseCarouselKeyboardOptions {
  totalItems: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function useCarouselKeyboard({
  totalItems,
  currentIndex,
  onIndexChange,
  loop = true,
  autoPlay = false,
  autoPlayInterval = 5000
}: UseCarouselKeyboardOptions) {
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else if (loop) {
      onIndexChange(totalItems - 1);
    }
  }, [currentIndex, totalItems, onIndexChange, loop]);

  const goToNext = useCallback(() => {
    if (currentIndex < totalItems - 1) {
      onIndexChange(currentIndex + 1);
    } else if (loop) {
      onIndexChange(0);
    }
  }, [currentIndex, totalItems, onIndexChange, loop]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalItems) {
      onIndexChange(index);
    }
  }, [totalItems, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Home':
          event.preventDefault();
          goToIndex(0);
          break;
        case 'End':
          event.preventDefault();
          goToIndex(totalItems - 1);
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          // Toggle pause/play if autoPlay is enabled
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, goToIndex, totalItems]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  return {
    goToPrevious,
    goToNext,
    goToIndex
  };
}
