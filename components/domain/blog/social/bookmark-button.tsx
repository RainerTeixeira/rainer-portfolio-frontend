/**
 * Bookmark Button Component
 *
 * Botão de bookmark/salvar para salvar posts para ler depois. Inclui animação
 * suave, estado persistente e múltiplas variantes visuais.
 *
 * @module components/domain/blog/social/bookmark-button
 * @fileoverview Botão de bookmark com animação e estado persistente
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <BookmarkButton
 *   postId="post-123"
 *   initialIsBookmarked={false}
 *   variant="ghost"
 *   size="sm"
 * />
 * ```
 *
 * Características:
 * - Animação suave ao salvar/remover
 * - Estado persistente com localStorage
 * - Múltiplas variantes (default, ghost, outline)
 * - Tamanhos configuráveis (sm, default, lg)
 * - Callbacks opcionais (onBookmark, onUnbookmark)
 * - Integração com hook useBookmark
 * - Acessibilidade completa
 */

'use client';

import { Button } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useBookmark } from '../hooks';

interface BookmarkButtonProps {
  postId: string;
  initialIsBookmarked?: boolean;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
  onBookmark?: () => void;
  onUnbookmark?: () => void;
}

export function BookmarkButton({
  postId,
  initialIsBookmarked = false,
  variant = 'ghost',
  size = 'sm',
  showLabel = true,
  onBookmark,
  onUnbookmark,
}: BookmarkButtonProps) {
  const { isBookmarked, isAnimating, handleBookmark } = useBookmark(
    postId,
    initialIsBookmarked,
    onBookmark,
    onUnbookmark
  );

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBookmark}
      className={cn(
        'gap-2',
        isBookmarked &&
          variant === 'ghost' &&
          'text-yellow-600 dark:text-yellow-500'
      )}
    >
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.3, 1],
                rotate: [0, -15, 15, 0],
              }
            : {}
        }
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <Bookmark
          className={cn(
            'h-4 w-4 transition-all',
            isBookmarked && 'fill-current'
          )}
        />
      </motion.div>
      {showLabel && <span>{isBookmarked ? 'Salvo' : 'Salvar'}</span>}
    </Button>
  );
}


