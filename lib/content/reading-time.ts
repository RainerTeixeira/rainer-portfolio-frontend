/**
 * Reading Time Utils
 *
 * Utilitários para calcular tempo de leitura de conteúdo.
 * Suporta conteúdo Tiptap (JSON) e texto simples/HTML.
 *
 * @fileoverview Utilitários para cálculo de tempo de leitura
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { TiptapJSON } from '@/lib/api/types/common';
import { extractTextFromTiptap } from './tiptap-utils';

// ============================================================================
// Reading Time Calculation
// ============================================================================

/**
 * Calcula tempo de leitura baseado no conteúdo
 *
 * Suporta múltiplos formatos:
 * - JSON do Tiptap (objeto com `type: 'doc'`)
 * - HTML (string)
 * - Texto simples (string)
 *
 * @param content - Conteúdo a analisar (TiptapJSON, HTML ou texto)
 * @param wordsPerMinute - Palavras por minuto (padrão: 200)
 * @returns Tempo de leitura em minutos (mínimo: 1)
 *
 * @example
 * ```ts
 * // Tiptap JSON
 * const tiptapContent = { type: 'doc', content: [...] };
 * calculateReadingTime(tiptapContent) // 5
 *
 * // HTML
 * calculateReadingTime('<p>Texto longo...</p>') // 3
 *
 * // Texto simples
 * calculateReadingTime('Texto simples') // 1
 * ```
 */
export function calculateReadingTime(
  content: string | TiptapJSON,
  wordsPerMinute: number = 200
): number {
  let text = '';

  // Se for JSON do Tiptap (objeto com type)
  if (typeof content === 'object' && content !== null && 'type' in content) {
    text = extractTextFromTiptap(content as TiptapJSON);
  } else if (typeof content === 'string') {
    // Se for HTML ou texto simples, remove tags HTML
    text = content.replace(/<[^>]*>/g, '');
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  const time = Math.ceil(words / wordsPerMinute);

  // Retorna no mínimo 1 minuto
  return time > 0 ? time : 1;
}
