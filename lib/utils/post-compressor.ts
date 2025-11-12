/**
 * Post Compressor - Otimização de Posts para DynamoDB
 *
 * Comprime o JSON do Tiptap em formato ultra-compacto para armazenamento no DynamoDB.
 * Mantém toda a estrutura necessária para renderização e geração de TOC.
 *
 * Otimizações de imagem:
 * - Detecta formato e animação
 * - Preserva informações para otimização posterior
 * - Recomenda conversão para WebP quando apropriado
 */

import type { JSONContent } from '@tiptap/core';

/**
 * Tipo para nó Tiptap genérico (aceita qualquer estrutura)
 */
type TiptapNode = JSONContent | Record<string, unknown>;

// Mapeamento de tipos Tiptap para chaves compactas
const TYPE_MAP: Record<string, string> = {
  heading: 'h',
  paragraph: 'p',
  bulletList: 'ul',
  orderedList: 'ol',
  listItem: 'li',
  image: 'img',
  codeBlock: 'code',
  table: 'tbl',
  tableRow: 'tr',
  tableCell: 'td',
  tableHeader: 'th',
  blockquote: 'q',
  horizontalRule: 'hr',
  hardBreak: 'br',
  bold: 'b',
  italic: 'i',
  link: 'a',
  callout: 'info', // Callout de informação
  'callout-success': 'success', // Callout de sucesso
};

// Mapeamento reverso para descompressão
const TYPE_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(TYPE_MAP).map(([k, v]) => [v, k])
);

// Níveis de heading para TOC (reservado para uso futuro)
// const HEADING_LEVELS: Record<number, string> = {
//   1: 'h1',
//   2: 'h2',
//   3: 'h3',
// };

/**
 * Analisa uma URL de imagem para extrair informações sobre formato e animação
 */
function analyzeImage(url: string): {
  format?: string;
  animated: boolean;
} {
  if (!url) return { animated: false };

  // Extrair extensão da URL
  const urlLower = url.toLowerCase();
  const extensionMatch = urlLower.match(
    /\.(webp|gif|jpg|jpeg|png|svg|avif)(\?|$)/
  );
  const extension = extensionMatch ? extensionMatch[1] : null;

  // Detectar se é animada (GIF animado ou WebP animado)
  // Nota: GIFs são geralmente animados, mas precisamos verificar
  // WebP pode ser animado também (mas menos comum)
  const animated =
    extension === 'gif' ||
    urlLower.includes('animated') ||
    urlLower.includes('anim');

  // Detectar formato
  let format: string | undefined;
  if (extension) {
    if (extension === 'jpeg') format = 'jpg';
    else if (extension === 'svg') format = 'svg';
    else format = extension;
  }

  return {
    format,
    animated,
  };
}

/**
 * Tipo para nó comprimido
 */
type CompressedNode = Record<string, unknown> | string | number | boolean;

/**
 * Comprime um nó do Tiptap
 */
function compressNode(node: TiptapNode): CompressedNode {
  if (!node || typeof node !== 'object') return node as CompressedNode;

  const nodeType =
    'type' in node && typeof node.type === 'string' ? node.type : '';
  const compressedType = TYPE_MAP[nodeType] || nodeType;

  const nodeContent =
    'content' in node && Array.isArray(node.content) ? node.content : [];
  const nodeAttrs =
    'attrs' in node && typeof node.attrs === 'object' && node.attrs !== null
      ? (node.attrs as Record<string, unknown>)
      : {};

  // Casos especiais por tipo
  switch (nodeType) {
    case 'doc':
      return {
        v: 1, // versão do formato
        b: nodeContent.map(n => compressNode(n as TiptapNode)), // blocos
      } as CompressedNode;

    case 'heading': {
      const level = (nodeAttrs.level as number) || 1;
      const id = nodeAttrs.id as string | undefined;
      return {
        t: `${compressedType}${level}`, // h1, h2, h3
        c: extractText(nodeContent),
        ...(id ? { id } : {}),
      } as CompressedNode;
    }

    case 'paragraph':
      return {
        t: compressedType,
        c: extractInlineContent(nodeContent),
      } as CompressedNode;

    case 'bulletList':
    case 'orderedList':
      return {
        t: compressedType,
        i: nodeContent.map(n => compressNode(n as TiptapNode)), // items
      } as CompressedNode;

    case 'listItem':
      return {
        t: compressedType,
        c: nodeContent.map(n => compressNode(n as TiptapNode)),
      } as CompressedNode;

    case 'image': {
      const src = (nodeAttrs.src as string) || '';
      const imageInfo = analyzeImage(src);

      return {
        t: compressedType,
        s: src, // src
        ...(imageInfo.format ? { f: imageInfo.format } : {}), // format (webp, gif, jpg, png)
        ...(imageInfo.animated ? { anim: true } : {}), // animated flag
        ...(nodeAttrs.alt ? { a: nodeAttrs.alt } : {}), // alt
        ...(nodeAttrs.title ? { title: nodeAttrs.title } : {}), // title
        ...(nodeAttrs.width ? { w: nodeAttrs.width } : {}), // width
        ...(nodeAttrs.height ? { h: nodeAttrs.height } : {}), // height
        ...(nodeAttrs.align ? { align: nodeAttrs.align } : {}), // align
      } as CompressedNode;
    }

    case 'codeBlock': {
      const language = (nodeAttrs.language as string) || 'plaintext';
      return {
        t: compressedType,
        lang: language,
        code: extractText(nodeContent),
      } as CompressedNode;
    }

    case 'table':
      return {
        t: compressedType,
        rows: nodeContent.map(n => compressNode(n as TiptapNode)),
      } as CompressedNode;

    case 'tableRow':
      return {
        t: compressedType,
        cells: nodeContent.map(n => compressNode(n as TiptapNode)),
      } as CompressedNode;

    case 'tableCell':
    case 'tableHeader':
      return {
        t: compressedType,
        c: extractInlineContent(nodeContent),
      } as CompressedNode;

    case 'blockquote':
      return {
        t: compressedType,
        c: nodeContent.map(n => compressNode(n as TiptapNode)),
      } as CompressedNode;

    case 'horizontalRule':
      return {
        t: compressedType,
      } as CompressedNode;

    case 'callout': {
      const variant = (nodeAttrs.variant as string) || 'info';
      const title = nodeAttrs.title as string | undefined;
      return {
        t: variant === 'success' ? 'success' : 'info',
        c: nodeContent.map(n => compressNode(n as TiptapNode)),
        ...(title ? { title } : {}),
      } as CompressedNode;
    }

    default: {
      // Tipo genérico - tentar compactar
      const result: Record<string, unknown> = {
        t: compressedType,
      };

      if (nodeContent.length > 0) {
        result.c = nodeContent.map(n => compressNode(n as TiptapNode));
      }

      if (nodeAttrs && Object.keys(nodeAttrs).length > 0) {
        result.a = nodeAttrs;
      }

      return result as CompressedNode;
    }
  }
}

/**
 * Extrai texto puro de um array de nós
 */
function extractText(nodes: TiptapNode[]): string {
  return nodes
    .map(node => {
      if (typeof node === 'string') return node;
      if (typeof node === 'object' && node !== null) {
        if ('type' in node && node.type === 'text' && 'text' in node) {
          return (node.text as string) || '';
        }
        if ('content' in node && Array.isArray(node.content)) {
          return extractText(node.content as TiptapNode[]);
        }
      }
      return '';
    })
    .join('');
}

/**
 * Extrai conteúdo inline (texto com formatação)
 */
function extractInlineContent(nodes: TiptapNode[]): CompressedNode[] {
  return nodes.map(node => {
    if (
      typeof node === 'object' &&
      node !== null &&
      'type' in node &&
      node.type === 'text'
    ) {
      const text = 'text' in node ? (node.text as string) || '' : '';
      const result: Record<string, unknown> = {
        text,
      };

      // Adicionar marks (formatação)
      if ('marks' in node && Array.isArray(node.marks)) {
        const marks = node.marks.map((mark: unknown) => {
          if (
            typeof mark === 'object' &&
            mark !== null &&
            'type' in mark &&
            typeof mark.type === 'string'
          ) {
            const markType = TYPE_MAP[mark.type] || mark.type;
            if (markType === 'a') {
              // Link
              const markAttrs =
                'attrs' in mark &&
                typeof mark.attrs === 'object' &&
                mark.attrs !== null
                  ? (mark.attrs as Record<string, unknown>)
                  : {};
              return {
                t: markType,
                h: (markAttrs.href as string) || '', // href
                ...(markAttrs.target ? { target: markAttrs.target } : {}),
              };
            }
            return markType; // b, i, etc.
          }
          return '';
        });
        result.m = marks;
      }

      return result as CompressedNode;
    }

    // Hard break
    if (
      typeof node === 'object' &&
      node !== null &&
      'type' in node &&
      node.type === 'hardBreak'
    ) {
      return { t: 'br' } as CompressedNode;
    }

    return compressNode(node);
  });
}

/**
 * Comprime um post completo
 */
export function compressPost(postContent: TiptapNode | string): string {
  try {
    // Parse se for string
    let content: TiptapNode;
    if (typeof postContent === 'string') {
      content = JSON.parse(postContent) as TiptapNode;
    } else {
      content = postContent;
    }

    // Comprimir
    const compressed = compressNode(content);

    // Retornar como string JSON minificada
    return JSON.stringify(compressed);
  } catch (error) {
    console.error('Erro ao comprimir post:', error);
    // Fallback: retornar como está
    return typeof postContent === 'string'
      ? postContent
      : JSON.stringify(postContent);
  }
}

/**
 * Descomprime um nó
 */
function decompressNode(node: CompressedNode): TiptapNode {
  if (!node || typeof node !== 'object') return node as TiptapNode;

  const compressed = node as Record<string, unknown>;

  // Documento compacto
  if ('v' in compressed && 'b' in compressed) {
    const blocks = Array.isArray(compressed.b) ? compressed.b : [];
    return {
      type: 'doc',
      content: blocks.map(b => decompressNode(b as CompressedNode)),
    } as TiptapNode;
  }

  const type = (compressed.t as string) || '';
  const originalType = TYPE_MAP_REVERSE[type] || type;

  // Casos especiais
  if (type?.startsWith('h') && /^\d$/.test(type.slice(1))) {
    // Heading (h1, h2, h3)
    const level = parseInt(type.slice(1), 10);
    const id = compressed.id as string | undefined;
    const content = compressed.c as string | undefined;
    return {
      type: 'heading',
      attrs: {
        level,
        ...(id ? { id } : {}),
      },
      content: decompressInlineText(content || ''),
    } as TiptapNode;
  }

  switch (type) {
    case 'p': {
      const content = Array.isArray(compressed.c) ? compressed.c : [];
      return {
        type: 'paragraph',
        content: decompressInlineContent(content as CompressedNode[]),
      } as TiptapNode;
    }

    case 'ul':
    case 'ol': {
      const items = Array.isArray(compressed.i) ? compressed.i : [];
      return {
        type: type === 'ul' ? 'bulletList' : 'orderedList',
        content: items.map(i => decompressNode(i as CompressedNode)),
      } as TiptapNode;
    }

    case 'li': {
      const content = Array.isArray(compressed.c) ? compressed.c : [];
      return {
        type: 'listItem',
        content: content.map(c => decompressNode(c as CompressedNode)),
      } as TiptapNode;
    }

    case 'img': {
      const attrs: Record<string, unknown> = {
        src: (compressed.s as string) || '',
      };

      // Adicionar atributos opcionais
      if (compressed.a) attrs.alt = compressed.a;
      if (compressed.title) attrs.title = compressed.title;
      if (compressed.w) attrs.width = compressed.w;
      if (compressed.h) attrs.height = compressed.h;
      if (compressed.align) attrs.align = compressed.align;

      // Preservar informações de formato e animação (útil para otimização posterior)
      if (compressed.f) attrs.format = compressed.f;
      if (compressed.anim) attrs.animated = true;

      return {
        type: 'image',
        attrs,
      } as TiptapNode;
    }

    case 'code': {
      const language = (compressed.lang as string) || 'plaintext';
      const code = (compressed.code as string) || '';
      return {
        type: 'codeBlock',
        attrs: {
          language,
        },
        content: [
          {
            type: 'text',
            text: code,
          },
        ],
      } as TiptapNode;
    }

    case 'tbl': {
      const rows = Array.isArray(compressed.rows) ? compressed.rows : [];
      return {
        type: 'table',
        content: rows.map(r => decompressNode(r as CompressedNode)),
      } as TiptapNode;
    }

    case 'tr': {
      const cells = Array.isArray(compressed.cells) ? compressed.cells : [];
      return {
        type: 'tableRow',
        content: cells.map(c => decompressNode(c as CompressedNode)),
      } as TiptapNode;
    }

    case 'td':
    case 'th': {
      const content = Array.isArray(compressed.c) ? compressed.c : [];
      return {
        type: type === 'th' ? 'tableHeader' : 'tableCell',
        content: decompressInlineContent(content as CompressedNode[]),
      } as TiptapNode;
    }

    case 'q': {
      const content = Array.isArray(compressed.c) ? compressed.c : [];
      return {
        type: 'blockquote',
        content: content.map(c => decompressNode(c as CompressedNode)),
      } as TiptapNode;
    }

    case 'hr':
      return {
        type: 'horizontalRule',
      } as TiptapNode;

    case 'info':
    case 'success': {
      const title = compressed.title as string | undefined;
      const content = Array.isArray(compressed.c) ? compressed.c : [];
      return {
        type: 'callout',
        attrs: {
          variant: type === 'success' ? 'success' : 'info',
          ...(title ? { title } : {}),
        },
        content: content.map(c => decompressNode(c as CompressedNode)),
      } as TiptapNode;
    }

    default: {
      // Tipo genérico
      const result: Record<string, unknown> = {
        type: originalType,
      };

      if (compressed.c && Array.isArray(compressed.c)) {
        result.content = (compressed.c as CompressedNode[]).map(decompressNode);
      }

      if (compressed.a) {
        result.attrs = compressed.a;
      }

      return result as TiptapNode;
    }
  }
}

/**
 * Descomprime conteúdo inline
 */
function decompressInlineContent(nodes: CompressedNode[]): TiptapNode[] {
  return nodes.map(node => {
    if (typeof node === 'string') {
      return {
        type: 'text',
        text: node,
      } as TiptapNode;
    }

    if (typeof node === 'object' && node !== null) {
      const nodeObj = node as Record<string, unknown>;

      if ('text' in nodeObj && typeof nodeObj.text === 'string') {
        // Nó de texto com marks
        const result: Record<string, unknown> = {
          type: 'text',
          text: nodeObj.text,
        };

        if (nodeObj.m && Array.isArray(nodeObj.m)) {
          result.marks = nodeObj.m.map((mark: unknown) => {
            if (typeof mark === 'string') {
              return {
                type: TYPE_MAP_REVERSE[mark] || mark,
              };
            }

            if (
              typeof mark === 'object' &&
              mark !== null &&
              't' in mark &&
              mark.t === 'a'
            ) {
              const markObj = mark as Record<string, unknown>;
              return {
                type: 'link',
                attrs: {
                  href: (markObj.h as string) || '',
                  ...(markObj.target ? { target: markObj.target } : {}),
                },
              };
            }

            if (
              typeof mark === 'object' &&
              mark !== null &&
              't' in mark &&
              typeof mark.t === 'string'
            ) {
              return {
                type: TYPE_MAP_REVERSE[mark.t] || mark.t,
              };
            }

            return { type: '' };
          });
        }

        return result as TiptapNode;
      }

      if ('t' in nodeObj && nodeObj.t === 'br') {
        return {
          type: 'hardBreak',
        } as TiptapNode;
      }
    }

    return decompressNode(node);
  });
}

/**
 * Descomprime texto inline (para headings)
 */
function decompressInlineText(text: string): TiptapNode[] {
  if (!text) return [];
  return [
    {
      type: 'text',
      text,
    } as TiptapNode,
  ];
}

/**
 * Descomprime um post
 */
export function decompressPost(compressedContent: string): TiptapNode {
  try {
    // Parse JSON
    const compressed = JSON.parse(compressedContent) as CompressedNode;

    // Descomprimir
    return decompressNode(compressed);
  } catch (error) {
    console.error('Erro ao descomprimir post:', error);
    // Fallback: tentar parse direto
    try {
      return JSON.parse(compressedContent) as TiptapNode;
    } catch {
      return {
        type: 'doc',
        content: [],
      } as TiptapNode;
    }
  }
}

/**
 * Gera TOC (Table of Contents) a partir do conteúdo comprimido
 */
export function generateTOC(compressedContent: string): Array<{
  level: number;
  text: string;
  id?: string;
  index: number;
}> {
  try {
    const content = JSON.parse(compressedContent);
    const blocks = content.b || [];
    const toc: Array<{
      level: number;
      text: string;
      id?: string;
      index: number;
    }> = [];

    blocks.forEach((block: CompressedNode, index: number) => {
      if (
        typeof block === 'object' &&
        block !== null &&
        't' in block &&
        typeof block.t === 'string' &&
        /^h[1-3]$/.test(block.t)
      ) {
        const blockObj = block as Record<string, unknown>;
        const level = parseInt(blockObj.t.slice(1), 10);
        const text = (blockObj.c as string) || '';
        const id = blockObj.id as string | undefined;
        toc.push({
          level,
          text,
          id,
          index,
        });
      }
    });

    return toc;
  } catch (error) {
    console.error('Erro ao gerar TOC:', error);
    return [];
  }
}

/**
 * Estima redução de tamanho
 */
export function estimateCompression(
  original: string,
  compressed: string
): {
  originalSize: number;
  compressedSize: number;
  reduction: number;
  reductionPercent: number;
} {
  const originalSize = new Blob([original]).size;
  const compressedSize = new Blob([compressed]).size;
  const reduction = originalSize - compressedSize;
  const reductionPercent = (reduction / originalSize) * 100;

  return {
    originalSize,
    compressedSize,
    reduction,
    reductionPercent,
  };
}
