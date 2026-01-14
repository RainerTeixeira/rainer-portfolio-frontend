/**
 * Componente de Conteúdo do PostCard
 *
 * Componente de conteúdo com descrição e tempo de leitura.
 * Utiliza line-clamp para limitar linhas e manter layout consistente.
 * 
 * @module components/domain/blog/post-card/post-content
 * @fileoverview Componente de conteúdo do post com descrição e tempo de leitura
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * <PostContent
 *   description="Aprenda os fundamentos do Next.js 14..."
 *   readTime={5}
 * />
 * ```
 */

'use client';

export const dynamic = 'force-dynamic';

import {
  CardContent,
  CardDescription,
} from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';

/**
 * Propriedades do componente PostContent
 * 
 * @interface PostContentProps
 * @property {string} [description] - Descrição/resumo do post
 * @property {number} [readTime] - Tempo estimado de leitura em minutos
 */
export interface PostContentProps {
  description?: string;
  readTime?: number;
}

/**
 * Componente PostContent
 * 
 * Renderiza conteúdo principal do post com:
 * - Descrição com line-clamp para limite de 3 linhas
 * - Tempo de leitura formatado
 * - Layout responsivo e acessível
 * 
 * @function PostContent
 * @param {PostContentProps} props - Propriedades do conteúdo
 * @returns {JSX.Element} Conteúdo renderizado
 */
export function PostContent({
  description,
  readTime,
}: PostContentProps) {
  return (
    <CardContent className="space-y-4 relative z-10">
      {/* Descrição */}
      {description && (
        <CardDescription
          className={cn(
            'text-sm leading-relaxed line-clamp-3',
            'dark:text-gray-400'
          )}
        >
          {description}
        </CardDescription>
      )}
      
      {/* Tempo de leitura */}
      {readTime && (
        <div className="text-xs text-muted-foreground">
          {readTime} min de leitura
        </div>
      )}
    </CardContent>
  );
}

