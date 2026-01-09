/**
 * Tiptap Utils - Utilitários Completos para Tiptap
 *
 * Biblioteca completa para trabalhar com conteúdo Tiptap (JSON).
 * Inclui conversão para HTML, extração de texto, validação e criação de conteúdo.
 *
 * @fileoverview Utilitários completos para conteúdo Tiptap
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

import type { TiptapJSON, TiptapNode } from '@/lib/api/types/common';

// ============================================================================
// TEXT EXTRACTION
// ============================================================================

/**
 * Extrai texto puro do JSON do Tiptap
 *
 * Percorre recursivamente a estrutura JSON do Tiptap e extrai todo o texto.
 * Útil para gerar excerpts, contar palavras, tempo de leitura, etc.
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
 * Perfeito para previews, meta descriptions, etc.
 *
 * @param content - Conteúdo JSON do Tiptap
 * @param maxLength - Tamanho máximo do excerpt (padrão: 160 caracteres)
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
// CONTENT CREATION
// ============================================================================

/**
 * Cria conteúdo JSON vazio do Tiptap
 *
 * Retorna uma estrutura Tiptap válida mas vazia.
 * Útil para inicializar editores ou criar novos posts.
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
// HTML RENDERING
// ============================================================================

/**
 * Converte JSON do Tiptap em HTML
 *
 * Função completa que renderiza o JSON do Tiptap como HTML com estilos.
 * Para produção, considere usar generateHTML do @tiptap/html para melhor performance.
 *
 * @param json - Conteúdo JSON do Tiptap ou string HTML
 * @returns HTML renderizado com classes Tailwind
 *
 * @example
 * ```ts
 * const html = tiptapJSONtoHTML(tiptapContent);
 * // <p class="mb-4 leading-relaxed">Conteúdo...</p>
 * ```
 */
export function tiptapJSONtoHTML(json: TiptapJSON | string): string {
  // Se já for string, retorna direto
  if (typeof json === 'string') {
    return json;
  }

  // Se não tiver conteúdo
  if (!json || !json.content || json.content.length === 0) {
    return '';
  }

  return renderNodes(json.content);
}

/**
 * Renderiza array de nós do Tiptap
 *
 * @param nodes - Array de nós Tiptap
 * @returns HTML concatenado
 */
function renderNodes(nodes: TiptapNode[]): string {
  return nodes.map(renderNode).join('');
}

/**
 * Renderiza um nó do Tiptap
 *
 * @param node - Nó Tiptap individual
 * @returns HTML do nó com estilos apropriados
 */
function renderNode(node: TiptapNode): string {
  // Texto simples com marcações
  if (node.text) {
    let text = node.text;

    // Aplica marcações (bold, italic, etc)
    if (node.marks) {
      node.marks.forEach(mark => {
        switch (mark.type) {
          case 'bold':
            text = `<strong>${text}</strong>`;
            break;
          case 'italic':
            text = `<em>${text}</em>`;
            break;
          case 'code':
            text = `<code class="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">${text}</code>`;
            break;
          case 'strike':
            text = `<s>${text}</s>`;
            break;
          case 'link':
            const href = mark.attrs?.href || '#';
            text = `<a href="${href}" class="text-cyan-500 hover:text-cyan-400 underline transition-colors" target="_blank" rel="noopener noreferrer">${text}</a>`;
            break;
        }
      });
    }

    return text;
  }

  // Nós com conteúdo aninhado
  const content = node.content ? renderNodes(node.content) : '';

  switch (node.type) {
    case 'doc':
      return content;

    case 'paragraph':
      return `<p class="mb-4 leading-relaxed dark:text-gray-300">${content || '<br>'}</p>`;

    case 'heading':
      const level = Math.min(Math.max((node.attrs?.level as number) || 1, 1), 6);
      const headingClasses = 'font-bold dark:text-cyan-200 mb-3 mt-6 scroll-mt-20';
      const sizes = {
        1: 'text-4xl md:text-5xl',
        2: 'text-3xl md:text-4xl',
        3: 'text-2xl md:text-3xl',
        4: 'text-xl md:text-2xl',
        5: 'text-lg md:text-xl',
        6: 'text-base md:text-lg',
      };
      return `<h${level} class="${headingClasses} ${sizes[level as keyof typeof sizes] || sizes[1]}">${content}</h${level}>`;

    case 'bulletList':
      return `<ul class="list-disc list-inside mb-4 space-y-2 dark:text-gray-300">${content}</ul>`;

    case 'orderedList':
      return `<ol class="list-decimal list-inside mb-4 space-y-2 dark:text-gray-300">${content}</ol>`;

    case 'listItem':
      return `<li class="ml-4">${content}</li>`;

    case 'blockquote':
      return `<blockquote class="border-l-4 border-cyan-400 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-r">${content}</blockquote>`;

    case 'codeBlock':
      const language = node.attrs?.language || 'plaintext';
      return `<div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 my-4 overflow-x-auto border border-cyan-400/20">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-500 font-mono">${language}</span>
        </div>
        <pre class="text-sm font-mono text-gray-200"><code class="language-${language}">${content}</code></pre>
      </div>`;

    case 'horizontalRule':
      return `<hr class="my-6 border-t border-gray-300 dark:border-cyan-400/30" />`;

    case 'image':
      const src = node.attrs?.src || '';
      const alt = node.attrs?.alt || '';
      const title = node.attrs?.title || '';
      return `<img src="${src}" alt="${alt}" title="${title}" class="max-w-full h-auto rounded-lg my-4 shadow-md" loading="lazy" />`;

    case 'table':
      return `<div class="overflow-x-auto my-4 border border-gray-300 dark:border-cyan-400/20 rounded-lg">
        <table class="min-w-full">${content}</table>
      </div>`;

    case 'tableRow':
      return `<tr class="border-b border-gray-300 dark:border-cyan-400/20 hover:bg-gray-50 dark:hover:bg-gray-800/50">${content}</tr>`;

    case 'tableHeader':
      return `<th class="px-4 py-2 text-left bg-gray-100 dark:bg-gray-800 font-semibold dark:text-cyan-200 border-r border-gray-300 dark:border-cyan-400/20 last:border-r-0">${content}</th>`;

    case 'tableCell':
      return `<td class="px-4 py-2 border border-gray-300 dark:border-cyan-400/20 dark:text-gray-300">${content}</td>`;

    case 'hardBreak':
      return '<br />';

    default:
      return content;
  }
}

// ============================================================================
// CONTENT VALIDATION
// ============================================================================

/**
 * Verifica se conteúdo Tiptap está vazio
 *
 * Extrai texto do conteúdo e verifica se há texto não vazio.
 * Útil para validação de formulários e lógica de UI.
 *
 * @param content - Conteúdo JSON do Tiptap ou string
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
export function isContentEmpty(content: TiptapJSON | string): boolean {
  if (typeof content === 'string') {
    return content.trim().length === 0;
  }

  if (!content || !content.content) {
    return true;
  }

  const text = extractTextFromTiptap(content);
  return text.trim().length === 0;
}

// ============================================================================
// UTILITÁRIOS ADICIONAIS
// ============================================================================

/**
 * Conta o número de palavras no conteúdo Tiptap
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns Número de palavras
 *
 * @example
 * ```ts
 * const wordCount = countWords(tiptapContent);
 * // 42
 * ```
 */
export function countWords(content: TiptapJSON): number {
  const text = extractTextFromTiptap(content);
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Conta o número de caracteres no conteúdo Tiptap
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns Número de caracteres
 *
 * @example
 * ```ts
 * const charCount = countCharacters(tiptapContent);
 * // 250
 * ```
 */
export function countCharacters(content: TiptapJSON): number {
  return extractTextFromTiptap(content).length;
}

/**
 * Obtém o tempo de leitura estimado em minutos
 *
 * Baseado na velocidade média de leitura de 200 palavras por minuto.
 *
 * @param content - Conteúdo JSON do Tiptap
 * @param wordsPerMinute - Velocidade de leitura (padrão: 200)
 * @returns Tempo de leitura em minutos (mínimo: 1)
 *
 * @example
 * ```ts
 * const readingTime = getReadingTime(tiptapContent);
 * // 3 minutos
 * ```
 */
export function getReadingTime(content: TiptapJSON, wordsPerMinute: number = 200): number {
  const wordCount = countWords(content);
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Limpa e normaliza o conteúdo Tiptap
 *
 * Remove nós vazios, marcações duplicadas e normaliza a estrutura.
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns Conteúdo limpo e normalizado
 *
 * @example
 * ```ts
 * const cleanContent = cleanTiptapContent(dirtyContent);
 * ```
 */
export function cleanTiptapContent(content: TiptapJSON): TiptapJSON {
  /**
   * Limpa um nó recursivamente
   */
  function cleanNode(node: TiptapNode): TiptapNode | null {
    // Se for texto vazio, remove
    if (node.text && node.text.trim() === '') {
      return null;
    }

    // Se tiver conteúdo, limpa os filhos
    if (node.content && Array.isArray(node.content)) {
      const cleanedChildren = node.content
        .map(cleanNode)
        .filter((child): child is TiptapNode => child !== null);

      // Se não tiver filhos válidos, remove o nó
      if (cleanedChildren.length === 0 && !node.text) {
        return null;
      }

      return { ...node, content: cleanedChildren };
    }

    return node;
  }

  if (!content.content) {
    return content;
  }

  const cleanedContent = content.content
    .map(cleanNode)
    .filter((node): node is TiptapNode => node !== null);

  return {
    ...content,
    content: cleanedContent,
  };
}

// ============================================================================
// TYPES
// ============================================================================

/**
 * Opções para renderização HTML
 */
export interface TiptapRenderOptions {
  /** Incluir classes CSS do Tailwind */
  includeClasses?: boolean;
  /** Tema (light/dark) */
  theme?: 'light' | 'dark';
  /** Abrir links em nova aba */
  externalLinks?: boolean;
}

/**
 * Estatísticas do conteúdo
 */
export interface ContentStats {
  /** Número de palavras */
  wordCount: number;
  /** Número de caracteres */
  characterCount: number;
  /** Tempo de leitura em minutos */
  readingTime: number;
  /** Número de parágrafos */
  paragraphCount: number;
  /** Número de headings */
  headingCount: number;
}

/**
 * Obtém estatísticas completas do conteúdo
 *
 * @param content - Conteúdo JSON do Tiptap
 * @returns Objeto com estatísticas do conteúdo
 *
 * @example
 * ```ts
 * const stats = getContentStats(tiptapContent);
 * // { wordCount: 150, characterCount: 800, readingTime: 1, paragraphCount: 3, headingCount: 2 }
 * ```
 */
export function getContentStats(content: TiptapJSON): ContentStats {
  const text = extractTextFromTiptap(content);
  const wordCount = countWords(content);
  const characterCount = text.length;
  const readingTime = getReadingTime(content);

  // Conta elementos específicos
  let paragraphCount = 0;
  let headingCount = 0;

  function countElements(node: TiptapNode) {
    switch (node.type) {
      case 'paragraph':
        paragraphCount++;
        break;
      case 'heading':
        headingCount++;
        break;
    }

    if (node.content) {
      node.content.forEach(countElements);
    }
  }

  if (content.content) {
    content.content.forEach(countElements);
  }

  return {
    wordCount,
    characterCount,
    readingTime,
    paragraphCount,
    headingCount,
  };
}