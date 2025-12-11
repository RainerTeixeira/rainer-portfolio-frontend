/**
 * Utilitários do Tiptap
 *
 * Funções para trabalhar com conteúdo JSON do Tiptap
 *
 * @fileoverview Utilidades para converter JSON Tiptap em HTML
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { TiptapJSON, TiptapNode } from '@/lib/api/types';

/**
 * Converte JSON do Tiptap em HTML
 *
 * Função simples que renderiza o JSON do Tiptap como HTML.
 * Para produção, use generateHTML do @tiptap/html
 *
 * @param json - Conteúdo JSON do Tiptap
 * @returns HTML renderizado
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
 */
function renderNodes(nodes: TiptapNode[]): string {
  return nodes.map(renderNode).join('');
}

/**
 * Renderiza um nó do Tiptap
 */
function renderNode(node: TiptapNode): string {
  // Texto simples
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
            text = `<code class="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm">${text}</code>`;
            break;
          case 'strike':
            text = `<s>${text}</s>`;
            break;
          case 'link':
            const href = mark.attrs?.href || '#';
            text = `<a href="${href}" class="text-cyan-500 hover:text-cyan-400 underline">${text}</a>`;
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
      const level = node.attrs?.level || 1;
      const headingClasses = 'font-bold dark:text-cyan-200 mb-3 mt-6';
      const sizes = {
        1: 'text-3xl',
        2: 'text-2xl',
        3: 'text-xl',
      };
      return `<h${level} class="${headingClasses} ${sizes[level as keyof typeof sizes] || sizes[1]}">${content}</h${level}>`;

    case 'bulletList':
      return `<ul class="list-disc list-inside mb-4 space-y-2 dark:text-gray-300">${content}</ul>`;

    case 'orderedList':
      return `<ol class="list-decimal list-inside mb-4 space-y-2 dark:text-gray-300">${content}</ol>`;

    case 'listItem':
      return `<li class="ml-4">${content}</li>`;

    case 'blockquote':
      return `<blockquote class="border-l-4 border-cyan-400 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400">${content}</blockquote>`;

    case 'codeBlock':
      // const language = node.attrs?.language || 'plaintext' // Pode ser usado futuramente para syntax highlighting
      return `<pre class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 my-4 overflow-x-auto border border-cyan-400/20"><code class="text-sm font-mono text-gray-200">${content}</code></pre>`;

    case 'horizontalRule':
      return `<hr class="my-6 border-t border-gray-300 dark:border-cyan-400/30" />`;

    case 'image':
      const src = node.attrs?.src || '';
      const alt = node.attrs?.alt || '';
      return `<img src="${src}" alt="${alt}" class="max-w-full h-auto rounded-lg my-4" />`;

    case 'table':
      return `<div class="overflow-x-auto my-4"><table class="min-w-full border border-gray-300 dark:border-cyan-400/20">${content}</table></div>`;

    case 'tableRow':
      return `<tr class="border-b border-gray-300 dark:border-cyan-400/20">${content}</tr>`;

    case 'tableHeader':
      return `<th class="px-4 py-2 text-left bg-gray-100 dark:bg-gray-800 font-semibold dark:text-cyan-200">${content}</th>`;

    case 'tableCell':
      return `<td class="px-4 py-2 border border-gray-300 dark:border-cyan-400/20">${content}</td>`;

    case 'hardBreak':
      return '<br />';

    default:
      return content;
  }
}

/**
 * Verifica se o conteúdo está vazio
 */
export function isContentEmpty(content: TiptapJSON | string): boolean {
  if (typeof content === 'string') {
    return content.trim().length === 0;
  }

  if (!content || !content.content) {
    return true;
  }

  // Verifica se tem algum texto
  const text = extractText(content);
  return text.trim().length === 0;
}

/**
 * Extrai texto puro do JSON
 */
function extractText(json: TiptapJSON): string {
  if (!json.content) return '';

  return json.content.map(node => extractNodeText(node)).join(' ');
}

/**
 * Extrai texto de um nó
 */
function extractNodeText(node: TiptapNode): string {
  if (node.text) {
    return node.text;
  }

  if (node.content) {
    return node.content.map(extractNodeText).join(' ');
  }

  return '';
}

