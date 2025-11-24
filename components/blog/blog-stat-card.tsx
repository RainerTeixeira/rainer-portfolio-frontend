/**
 * Blog Stat Card Component
 *
 * Componente de card para exibir estatísticas do blog (artigos, visualizações, curtidas, etc).
 * Usado na página de blog para mostrar métricas impressionantes.
 *
 * @module components/blog/blog-stat-card
 * @fileoverview Card de estatística do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { ComponentType } from 'react';

interface BlogStatCardProps {
  icon: ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  borderColor: string;
  iconColor: string;
  className?: string;
}

export function BlogStatCard({
  icon: Icon,
  value,
  label,
  borderColor,
  iconColor,
  className,
}: BlogStatCardProps) {
  return (
    <Card
      className={cn(
        'group/stat relative overflow-hidden transition-all duration-300',
        'bg-card/80 dark:bg-black/30 backdrop-blur-sm',
        'border-border/50',
        borderColor,
        'hover:shadow-lg hover:shadow-cyan-500/10',
        'hover:scale-105',
        className
      )}
    >
      <CardContent className="p-4 text-center">
        <Icon
          className={cn(
            'h-6 w-6 mx-auto mb-2 transition-colors duration-300',
            iconColor,
            'group-hover/stat:scale-110'
          )}
          aria-hidden="true"
        />
        <div className="text-2xl font-bold dark:text-gray-100 mb-1">
          {value}
        </div>
        <div className="text-xs text-muted-foreground dark:text-gray-400">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
