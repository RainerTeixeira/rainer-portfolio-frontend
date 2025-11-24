/**
 * Category Filter Component
 *
 * Componente para filtros de categoria do blog com badges interativos.
 * Usado na página de blog para filtrar posts por categoria.
 *
 * @module components/blog/category-filter
 * @fileoverview Filtro de categorias do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  totalPosts: number;
  getCategoryCount: (category: string) => number;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  totalPosts,
  getCategoryCount,
  className,
}: CategoryFilterProps) {
  const handleCategoryClick = (category: string | null) => {
    onCategoryChange(category);
  };

  const handleKeyDown = (e: React.KeyboardEvent, category: string | null) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryClick(category);
    }
  };

  return (
    <div
      className={cn('flex items-center gap-2 flex-wrap', className)}
      role="group"
      aria-labelledby="category-filters-label"
    >
      <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <span
        id="category-filters-label"
        className="text-sm text-muted-foreground dark:text-gray-400"
      >
        Categoria:
      </span>
      <Badge
        variant={!selectedCategory ? 'default' : 'outline'}
        className="cursor-pointer hover:bg-cyan-400/10 dark:border-cyan-400/30 transition-colors"
        onClick={() => handleCategoryClick(null)}
        role="button"
        tabIndex={0}
        onKeyDown={e => handleKeyDown(e, null)}
        aria-label="Mostrar todos os posts"
        aria-pressed={!selectedCategory}
      >
        Todos ({totalPosts})
      </Badge>
      {categories.map(category => (
        <Badge
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-cyan-400/10 dark:border-cyan-400/30 transition-colors"
          onClick={() => handleCategoryClick(category)}
          role="button"
          tabIndex={0}
          onKeyDown={e => handleKeyDown(e, category)}
          aria-label={`Filtrar por categoria ${category}`}
          aria-pressed={selectedCategory === category}
        >
          {category} ({getCategoryCount(category)})
        </Badge>
      ))}
    </div>
  );
}
