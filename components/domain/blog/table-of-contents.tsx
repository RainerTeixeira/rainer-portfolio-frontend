/**
 * Table of Contents Component
 *
 * Tabela de conteúdos para navegação por seções do artigo. Componente sticky
 * com highlight automático da seção ativa e scroll suave para navegação.
 *
 * @module components/domain/blog/table-of-contents
 * @fileoverview Componente de tabela de conteúdos com navegação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <TableOfContents containerRef={articleRef} />
 * ```
 *
 * Características:
 * - Navegação por seções do artigo
 * - Highlight automático da seção ativa
 * - Scroll suave para seções
 * - Suporte a múltiplos níveis (h2, h3, h4)
 * - Integração com hook useTableOfContents
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

import { cn } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
<<<<<<< HEAD
import { useTableOfContents } from '@/hooks';
=======
import { useTableOfContents } from '@rainersoft/utils';
>>>>>>> 37a9ca0b91e93f600ba06236ec3f69f5d3d432d6

interface TableOfContentsProps {
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export function TableOfContents({
  containerRef,
  className,
}: TableOfContentsProps) {
<<<<<<< HEAD
  const { items: headings, activeId, scrollToItem: scrollToHeading } =
    useTableOfContents(containerRef?.current?.innerHTML || null);
=======
  const { headings, activeId, scrollToHeading } =
    useTableOfContents({ containerRef });
>>>>>>> 37a9ca0b91e93f600ba06236ec3f69f5d3d432d6

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={cn('space-y-1', className)}>
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <ChevronRight className="h-4 w-4" />
        Neste artigo
      </h3>

      <ul className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          // Usar combinação de id e index para garantir chave única
          const uniqueKey = `${heading.id}-${index}-${heading.level}`;

          return (
            <li
              key={uniqueKey}
              style={{
                paddingLeft: `${(heading.level - 2) * 12}px`,
              }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'w-full text-left text-sm py-1.5 px-2 rounded transition-colors relative',
                  isActive
                    ? 'text-foreground font-medium bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {/* Indicador de seção ativa */}
                {isActive && (
                  <motion.div
                    layoutId="active-heading"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-r"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <span className="line-clamp-2">{heading.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


