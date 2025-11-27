/**
 * Tiptap Utils
 *
 * Utilitários para trabalhar com conteúdo Tiptap (JSON).
 * Inclui funções para extrair texto, gerar excerpts e verificar conteúdo vazio.
 *
 * @fileoverview Utilitários para conteúdo Tiptap
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { TiptapJSON, TiptapNode } from '@/lib/api/types/common';

// ============================================================================
// Text Extraction
// ============================================================================

/**
 * Extrai texto puro do JSON do Tiptap
 *
 * Percorre recursivamente a estrutura JSON do Tiptap e extrai todo o texto.
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns Texto puro extraído do conteúdo
 *
 * @example
 * ```ts
 * const content = {
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] }
 *   ]
 * };
 * extractTextFromTiptap(content) // "Olá mundo"
 * ```
 */
export function extractTextFromTiptap(content: TiptapJSON): string {
  /**
   * Extrai texto de um nó Tiptap (recursivo)
   *
   * @param node - Nó do Tiptap (JSON ou Node)
   * @returns Texto extraído do nó
   */
  function extractFromNode(node: TiptapJSON | TiptapNode): string {
    if ('text' in node && typeof node.text === 'string') {
      return node.text;
    }

    if ('content' in node && Array.isArray(node.content)) {
      return node.content
        .map((child: TiptapNode) => extractFromNode(child))
        .join(' ');
    }

    return '';
  }

  return extractFromNode(content).trim();
}

/**
 * Gera excerpt (resumo) do conteúdo Tiptap
 *
 * Extrai texto do conteúdo e limita a um tamanho máximo.
 *
 * @param content - Conteúdo JSON do Tiptap
 * @param maxLength - Tamanho máximo do excerpt (padrão: 160)
 * @returns Excerpt formatado com "..." se truncado
 *
 * @example
 * ```ts
 * const content = { type: 'doc', content: [...] };
 * generateExcerpt(content, 50) // "Primeiros 50 caracteres..."
 * ```
 */
export function generateExcerpt(
  content: TiptapJSON,
  maxLength: number = 160
): string {
  const text = extractTextFromTiptap(content);

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}

// ============================================================================
// Content Creation
// ============================================================================

/**
 * Cria conteúdo JSON vazio do Tiptap
 *
 * Retorna uma estrutura Tiptap válida mas vazia.
 *
 * @returns Documento vazio do Tiptap
 *
 * @example
 * ```ts
 * const emptyContent = createEmptyTiptapContent();
 * // { type: 'doc', content: [] }
 * ```
 */
export function createEmptyTiptapContent(): TiptapJSON {
  return {
    type: 'doc',
    content: [],
  };
}

// ============================================================================
// Content Validation
// ============================================================================

/**
 * Verifica se conteúdo Tiptap está vazio
 *
 * Extrai texto do conteúdo e verifica se há texto não vazio.
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns `true` se o conteúdo estiver vazio, `false` caso contrário
 *
 * @example
 * ```ts
 * const empty = { type: 'doc', content: [] };
 * isContentEmpty(empty) // true
 *
 * const withText = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }] };
 * isContentEmpty(withText) // false
 * ```
 */
export function isContentEmpty(content: TiptapJSON): boolean {
  const text = extractTextFromTiptap(content);
  return text.trim().length === 0;
}
