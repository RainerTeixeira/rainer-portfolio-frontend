/**
 * Sort Controls Component
 *
 * Componente para controles de ordenação do blog (recentes, populares, trending).
 * Usado na página de blog para ordenar posts.
 *
 * @module components/blog/sort-controls
 * @fileoverview Controles de ordenação do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Button } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { Clock, Eye, SortDesc, TrendingUp } from 'lucide-react';

export type SortOption = 'recent' | 'popular' | 'trending';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

export function SortControls({
  currentSort,
  onSortChange,
  className,
}: SortControlsProps) {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      role="group"
      aria-labelledby="sort-controls-label"
    >
      <SortDesc className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <span
        id="sort-controls-label"
        className="text-sm text-muted-foreground dark:text-gray-400"
      >
        Ordenar:
      </span>
      <div
        className="flex gap-1"
        role="radiogroup"
        aria-label="Opções de ordenação"
      >
        <Button
          variant={currentSort === 'recent' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange('recent')}
          className="text-xs dark:border-cyan-400/30"
          aria-label="Ordenar por mais recentes"
          role="radio"
          aria-checked={currentSort === 'recent'}
        >
          <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
          Recentes
        </Button>
        <Button
          variant={currentSort === 'popular' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange('popular')}
          className="text-xs dark:border-cyan-400/30"
          aria-label="Ordenar por mais populares"
          role="radio"
          aria-checked={currentSort === 'popular'}
        >
          <Eye className="h-3 w-3 mr-1" aria-hidden="true" />
          Populares
        </Button>
        <Button
          variant={currentSort === 'trending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange('trending')}
          className="text-xs dark:border-cyan-400/30"
          aria-label="Ordenar por trending"
          role="radio"
          aria-checked={currentSort === 'trending'}
        >
          <TrendingUp className="h-3 w-3 mr-1" aria-hidden="true" />
          Trending
        </Button>
      </div>
    </div>
  );
}
