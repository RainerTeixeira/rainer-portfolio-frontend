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

export const dynamic = 'force-dynamic';

import React from 'react';
import { cn } from '@rainersoft/ui';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTableOfContents } from '@rainersoft/ui';

interface TableOfContentsProps {
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export function TableOfContents({
  containerRef,
  className,
}: TableOfContentsProps) {
  const { items, activeId, scrollToItem } =
    useTableOfContents({ 
      containerRef: containerRef as React.RefObject<HTMLElement> || React.createRef<HTMLElement>() 
    });

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={cn('space-y-1', className)}>
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <ChevronRight className="h-4 w-4" />
        Neste artigo
      </h3>

      <ul className="space-y-1">
        {items.map((item: any, index: number) => {
          const isActive = activeId === item.id;
          // Usar combinação de id e index para garantir chave única
          const uniqueKey = `${item.id}-${index}-${item.level}`;

          return (
            <li
              key={uniqueKey}
              style={{
                paddingLeft: `${(item.level - 2) * 12}px`,
              }}
            >
              <button
                onClick={() => scrollToItem(item.id)}
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

                <span className="line-clamp-2">{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}



