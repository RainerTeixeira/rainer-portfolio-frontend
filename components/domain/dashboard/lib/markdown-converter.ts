/**
 * Conversor Markdown ↔ Tiptap JSON
 *
 * Economiza espaço no banco armazenando apenas Markdown (texto simples)
 * e convertendo para JSON do Tiptap no frontend ao carregar.
 *
 * Seguindo documentação oficial do Tiptap: https://tiptap.dev/
 *
 * @fileoverview Conversão otimizada para economia de espaço
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { JSONContent } from '@tiptap/core';

/**
 * Converte JSON do Tiptap para Markdown (compacto para salvar no banco)
 *
 * @param json - JSON do Tiptap
 * @returns Markdown string (muito mais compacto que JSON)
 */
export function tiptapJSONToMarkdown(
  json: JSONContent | string | unknown
): string {
  // Se já for string (Markdown), retorna direto
  if (typeof json === 'string') {
    return json;
  }

  // Tipo guard para JSONContent
  if (
    typeof json === 'object' &&
    json !== null &&
    'content' in json &&
    Array.isArray(json.content)
  ) {
    return convertNodesToMarkdown(json.content);
  }

  // Se não tiver conteúdo válido, retorna vazio
  return '';
}

/**
 * Converte nós do Tiptap para Markdown
 */
function convertNodesToMarkdown(nodes: JSONContent[]): string {
  return nodes.map(node => convertNodeToMarkdown(node)).join('\n\n');
}

/**
 * Converte um nó do Tiptap para Markdown
 */
function convertNodeToMarkdown(node: JSONContent): string {
  const { type, content, text, marks, attrs } = node;

  // Texto simples com marcações
  if (text) {
    let output = text;

    // Aplica marcações (negrito, itálico, código, etc)
    if (marks && Array.isArray(marks)) {
      // Ordem importante: código primeiro, depois negrito/itálico
      marks.forEach(mark => {
        if (!mark || typeof mark !== 'object' || !('type' in mark)) return;
        const markType = mark.type as string;
        switch (markType) {
          case 'code':
            output = `\`${output}\``;
            break;
          case 'bold':
            output = `**${output}**`;
            break;
          case 'italic':
            output = `*${output}*`;
            break;
          case 'strike':
            output = `~~${output}~~`;
            break;
          case 'link': {
            const markAttrs =
              mark.attrs && typeof mark.attrs === 'object'
                ? (mark.attrs as { href?: string })
                : undefined;
            const href = markAttrs?.href || '';
            output = `[${output}](${href})`;
            break;
          }
        }
      });
    }

    return output;
  }

  // Nós com conteúdo
  if (content && Array.isArray(content)) {
    const innerContent = content.map(c => convertNodeToMarkdown(c)).join('');

    switch (type) {
      case 'doc':
        return convertNodesToMarkdown(content);

      case 'paragraph':
        return innerContent || '';

      case 'heading':
        const level = attrs?.level || 1;
        const prefix = '#'.repeat(level);
        return `${prefix} ${innerContent}`;

      case 'bulletList':
        return content
          .map(item => {
            if (item.type === 'listItem') {
              const itemContent =
                item.content?.map(c => convertNodeToMarkdown(c)).join('\n') ||
                '';
              // Indenta se tiver múltiplas linhas
              const lines = itemContent.split('\n');
              return lines
                .map((line, i) => (i === 0 ? `- ${line}` : `  ${line}`))
                .join('\n');
            }
            return convertNodeToMarkdown(item);
          })
          .join('\n');

      case 'orderedList':
        return content
          .map((item, index) => {
            if (item.type === 'listItem') {
              const itemContent =
                item.content?.map(c => convertNodeToMarkdown(c)).join('\n') ||
                '';
              const lines = itemContent.split('\n');
              return lines
                .map((line, i) =>
                  i === 0 ? `${index + 1}. ${line}` : `   ${line}`
                )
                .join('\n');
            }
            return convertNodeToMarkdown(item);
          })
          .join('\n');

      case 'blockquote':
        const quoteContent = innerContent.split('\n');
        return quoteContent.map(line => `> ${line}`).join('\n');

      case 'codeBlock':
        const language = attrs?.language || '';
        const codeContent = content.map(c => c.text || '').join('');
        return `\`\`\`${language}\n${codeContent}\n\`\`\``;

      case 'horizontalRule':
        return '---';

      case 'image':
        const src = attrs?.src || '';
        const alt = attrs?.alt || '';
        // Garantir que apenas URLs sejam salvas (não base64 ou dados locais)
        // Se for base64 ou data URI, não salvar (imagem deve ser enviada para Cloudinary primeiro)
        if (src && !src.startsWith('data:') && src.startsWith('http')) {
          return `![${alt}](${src})`;
        }
        // Se for base64 ou local, retornar vazio (não salvar)
        return '';

      case 'hardBreak':
        return '\n';

      case 'table':
        // Tabelas são complexas, mantém como HTML simples no Markdown
        return innerContent;

      default:
        return innerContent;
    }
  }

  return '';
}

/**
 * Converte Markdown para JSON do Tiptap (para carregar no editor)
 *
 * @param markdown - String Markdown
 * @returns JSON do Tiptap
 */
export function markdownToTiptapJSON(markdown: string): JSONContent {
  if (!markdown || markdown.trim() === '') {
    return {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    };
  }

  // Parse Markdown básico para JSON do Tiptap
  const lines = markdown.split('\n');
  const content: JSONContent[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockLanguage: string | undefined = undefined;
  let codeBlockContent: string[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      content.push({
        type: 'paragraph',
        content: parseInlineMarkdown(currentParagraph.join(' ')),
      });
      currentParagraph = [];
    }
  }

  function flushCodeBlock() {
    if (codeBlockContent.length > 0) {
      content.push({
        type: 'codeBlock',
        attrs: { language: codeBlockLanguage || undefined },
        content: [
          {
            type: 'text',
            text: codeBlockContent.join('\n'),
          },
        ],
      });
      codeBlockContent = [];
      codeBlockLanguage = undefined;
    }
  }

  function flushBlockquote() {
    if (blockquoteContent.length > 0) {
      content.push({
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: parseInlineMarkdown(blockquoteContent.join('\n')),
          },
        ],
      });
      blockquoteContent = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const trimmed = line.trim();

    // Code block start/end
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushBlockquote();
        codeBlockLanguage = trimmed.slice(3).trim() || undefined;
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***') {
      flushParagraph();
      flushBlockquote();
      content.push({ type: 'horizontalRule' });
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch && headingMatch[1] && headingMatch[2]) {
      flushParagraph();
      flushBlockquote();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      content.push({
        type: 'heading',
        attrs: { level },
        content: parseInlineMarkdown(text),
      });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      flushParagraph();
      if (!inBlockquote) {
        inBlockquote = true;
      }
      blockquoteContent.push(trimmed.slice(1).trim());
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
      inBlockquote = false;
    }

    // List items (bullet and ordered)
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);

    if (bulletMatch || orderedMatch) {
      flushParagraph();
      flushBlockquote();
      const itemText = bulletMatch?.[1] || orderedMatch?.[1];
      if (itemText) {
        // Simplificado: cria lista com um item
        // Para listas completas, seria necessário agrupar itens consecutivos
        content.push({
          type: bulletMatch ? 'bulletList' : 'orderedList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: parseInlineMarkdown(itemText),
                },
              ],
            },
          ],
        });
      }
      continue;
    }

    // Image
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch && imageMatch[2]) {
      flushParagraph();
      flushBlockquote();
      content.push({
        type: 'image',
        attrs: {
          src: imageMatch[2],
          alt: imageMatch[1] || '',
        },
      });
      continue;
    }

    // Empty line
    if (trimmed === '') {
      flushParagraph();
      continue;
    }

    // Regular paragraph
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushCodeBlock();
  flushBlockquote();

  // Se não tiver conteúdo, adiciona parágrafo vazio
  if (content.length === 0) {
    content.push({ type: 'paragraph' });
  }

  return {
    type: 'doc',
    content,
  };
}

/**
 * Parse inline Markdown (negrito, itálico, código, links)
 */
function parseInlineMarkdown(text: string): JSONContent[] {
  const result: JSONContent[] = [];
  let currentText = '';
  let i = 0;

  while (i < text.length) {
    // Code inline `code`
    if (text[i] === '`' && i + 1 < text.length && text[i + 1] !== '`') {
      if (currentText) {
        result.push({ type: 'text', text: currentText });
        currentText = '';
      }

      const endIndex = text.indexOf('`', i + 1);
      if (endIndex !== -1) {
        const codeText = text.substring(i + 1, endIndex);
        result.push({
          type: 'text',
          text: codeText,
          marks: [{ type: 'code' }],
        });
        i = endIndex + 1;
        continue;
      }
    }

    // Link [text](url)
    if (text[i] === '[') {
      if (currentText) {
        result.push({ type: 'text', text: currentText });
        currentText = '';
      }

      const linkEnd = text.indexOf(']', i + 1);
      if (linkEnd !== -1 && text[linkEnd + 1] === '(') {
        const urlEnd = text.indexOf(')', linkEnd + 2);
        if (urlEnd !== -1) {
          const linkText = text.substring(i + 1, linkEnd);
          const linkUrl = text.substring(linkEnd + 2, urlEnd);
          result.push({
            type: 'text',
            text: linkText,
            marks: [{ type: 'link', attrs: { href: linkUrl } }],
          });
          i = urlEnd + 1;
          continue;
        }
      }
    }

    // Bold **text**
    if (text[i] === '*' && text[i + 1] === '*') {
      if (currentText) {
        result.push({ type: 'text', text: currentText });
        currentText = '';
      }

      const endIndex = text.indexOf('**', i + 2);
      if (endIndex !== -1) {
        const boldText = text.substring(i + 2, endIndex);
        result.push({
          type: 'text',
          text: boldText,
          marks: [{ type: 'bold' }],
        });
        i = endIndex + 2;
        continue;
      }
    }

    // Italic *text*
    if (text[i] === '*' && text[i + 1] !== '*') {
      // Verifica se não é negrito
      const nextStar = text.indexOf('*', i + 1);
      if (
        nextStar !== -1 &&
        (nextStar === i + 1 || text[nextStar + 1] !== '*')
      ) {
        if (currentText) {
          result.push({ type: 'text', text: currentText });
          currentText = '';
        }

        result.push({
          type: 'text',
          text: text.substring(i + 1, nextStar),
          marks: [{ type: 'italic' }],
        });
        i = nextStar + 1;
        continue;
      }
    }

    // Strike ~~text~~
    if (text[i] === '~' && text[i + 1] === '~') {
      if (currentText) {
        result.push({ type: 'text', text: currentText });
        currentText = '';
      }

      const endIndex = text.indexOf('~~', i + 2);
      if (endIndex !== -1) {
        const strikeText = text.substring(i + 2, endIndex);
        result.push({
          type: 'text',
          text: strikeText,
          marks: [{ type: 'strike' }],
        });
        i = endIndex + 2;
        continue;
      }
    }

    currentText += text[i];
    i++;
  }

  if (currentText) {
    result.push({ type: 'text', text: currentText });
  }

  return result.length > 0 ? result : [{ type: 'text', text: '' }];
}

