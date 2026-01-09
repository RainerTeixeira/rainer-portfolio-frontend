/**
 * Componente de Cabeçalho do PostCard
 *
 * Componente de cabeçalho com título, categoria e data.
 * Inclui badge de categoria animado e título com efeito gradient.
 * 
 * @module components/domain/blog/post-card/post-header
 * @fileoverview Componente de cabeçalho com metadados do post
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * <PostHeader
 *   title="Como usar Next.js 14"
 *   category="Tutorial"
 *   date="há 2 dias"
 *   accentCyan="#00bcd4"
 *   accentPurple="#7c3aed"
 *   accentPink="#ec4899"
 * />
 * ```
 */

'use client';

import { Badge } from '@rainersoft/ui';
import {
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';

/**
 * Propriedades do componente PostHeader
 * 
 * @interface PostHeaderProps
 * @property {string} title - Título do post
 * @property {string} [category] - Categoria do post
 * @property {string} [date] - Data formatada de publicação
 * @property {string} accentCyan - Cor primária para gradientes
 * @property {string} accentPurple - Cor secundária para gradientes
 * @property {string} accentPink - Cor de destaque para gradientes
 */
export interface PostHeaderProps {
  title: string;
  category?: string;
  date?: string;
  accentCyan: string;
  accentPurple: string;
  accentPink: string;
}

/**
 * Componente PostHeader
 * 
 * Renderiza cabeçalho do post com:
 * - Badge de categoria com cores vibrantes e animação hover
 * - Título com efeito gradient no hover
 * - Data de publicação formatada
 * 
 * @function PostHeader
 * @param {PostHeaderProps} props - Propriedades do cabeçalho
 * @returns {JSX.Element} Cabeçalho renderizado
 */
export function PostHeader({
  title,
  category,
  date,
  accentCyan,
  accentPurple,
  accentPink,
}: PostHeaderProps) {
  return (
    <CardHeader className="space-y-4 relative z-10">
      {/* Metadados */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {category && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1"
          >
            <Tag className="w-3 h-3 text-cyan-400" aria-hidden="true" />
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-mono',
                'bg-linear-to-r from-cyan-500/10 to-purple-500/10',
                'border border-cyan-400/30',
                'text-cyan-600 dark:text-cyan-300',
                'hover:from-cyan-500/20 hover:to-purple-500/20',
                'transition-all duration-200'
              )}
              aria-label={`Categoria: ${category}`}
            >
              {category}
            </Badge>
          </motion.div>
        )}
        {date && (
          <div
            className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400"
            aria-label={`Data de publicação: ${date}`}
          >
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <time dateTime={date} className="font-mono">
              {date}
            </time>
          </div>
        )}
      </div>

      {/* Título com gradient no hover */}
      <CardTitle
        id={`post-title-${title}`}
        className={cn(
          'text-xl leading-tight transition-all duration-300',
          'group-hover:text-transparent group-hover:bg-clip-text',
          'dark:text-gray-100'
        )}
        style={
          {
            '--gradient-from': accentCyan,
            '--gradient-via': accentPurple,
            '--gradient-to': accentPink,
          } as React.CSSProperties
        }
      >
        {title}
      </CardTitle>
    </CardHeader>
  );
}
