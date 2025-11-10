/**
 * Empty State Component
 *
 * Componente para estado vazio quando não há posts para exibir.
 * Usado na página de blog quando não há posts ou quando filtros não retornam resultados.
 *
 * @module components/blog/empty-state
 * @fileoverview Estado vazio do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        'text-center py-20 dark:bg-black/30 dark:border-cyan-400/20',
        className
      )}
    >
      <CardContent className="space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 mb-6 mx-auto">
          <FileText className="w-10 h-10 text-cyan-400" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold mb-2 dark:text-cyan-200 dark:font-mono">
            {title}
          </h2>
          <p className="text-muted-foreground dark:text-gray-400 max-w-md mx-auto">
            {description}
          </p>
        </div>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="outline"
            className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
            aria-label={actionLabel}
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
