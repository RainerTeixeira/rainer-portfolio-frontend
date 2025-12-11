/**
 * Reading Time Component
 *
 * Componente que calcula e exibe o tempo estimado de leitura de um post.
 * Suporta conteúdo em texto simples ou JSON do Tiptap, com taxa de leitura
 * configurável.
 *
 * @module components/domain/blog/social/reading-time
 * @fileoverview Componente de tempo de leitura estimado
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Com texto simples
 * <ReadingTime content="Texto do post..." />
 *
 * // Com JSON do Tiptap
 * <ReadingTime content={tiptapJson} />
 *
 * // Customizado
 * <ReadingTime
 *   content={content}
 *   wordsPerMinute={200}
 *   showIcon={true}
 * />
 * ```
 *
 * Características:
 * - Cálculo automático de tempo de leitura
 * - Suporte a texto simples e JSON Tiptap
 * - Taxa de leitura configurável (padrão: 250 palavras/minuto)
 * - Ícone opcional
 * - Extração de texto de conteúdo estruturado
 * - Acessibilidade completa
 */

import type { TiptapJSON } from '@/lib/api/types/common';
import { calculateReadingTime } from '@/lib/blog';
import { cn } from '@/lib/portfolio';
import { Clock } from 'lucide-react';

interface ReadingTimeProps {
  /** Conteúdo do post (TiptapJSON, HTML ou texto simples) */
  content: string | TiptapJSON;
  /** Palavras por minuto (padrão: 250) */
  wordsPerMinute?: number;
  /** Classes CSS adicionais */
  className?: string;
  /** Exibir ícone de relógio */
  showIcon?: boolean;
}

export function ReadingTime({
  content,
  wordsPerMinute = 250,
  className,
  showIcon = true,
}: ReadingTimeProps) {
  const minutes = calculateReadingTime(content, wordsPerMinute);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-muted-foreground',
        className
      )}
    >
      {showIcon && <Clock className="h-4 w-4" />}
      <span>{minutes} min de leitura</span>
    </div>
  );
}


