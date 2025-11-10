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
 * Comprime um nó do Tiptap
 */
function compressNode(node: any): any {
  if (!node || typeof node !== 'object') return node;

  const type = node.type;
  const compressedType = TYPE_MAP[type] || type;

  // Casos especiais por tipo
  switch (type) {
    case 'doc':
      return {
        v: 1, // versão do formato
        b: (node.content || []).map(compressNode), // blocos
      };

    case 'heading':
      const level = node.attrs?.level || 1;
      return {
        t: `${compressedType}${level}`, // h1, h2, h3
        c: extractText(node.content || []),
        ...(node.attrs?.id ? { id: node.attrs.id } : {}),
      };

    case 'paragraph':
      return {
        t: compressedType,
        c: extractInlineContent(node.content || []),
      };

    case 'bulletList':
    case 'orderedList':
      return {
        t: compressedType,
        i: (node.content || []).map(compressNode), // items
      };

    case 'listItem':
      return {
        t: compressedType,
        c: (node.content || []).map(compressNode),
      };

    case 'image':
      const src = node.attrs?.src || '';
      const imageInfo = analyzeImage(src);

      return {
        t: compressedType,
        s: src, // src
        ...(imageInfo.format ? { f: imageInfo.format } : {}), // format (webp, gif, jpg, png)
        ...(imageInfo.animated ? { anim: true } : {}), // animated flag
        ...(node.attrs?.alt ? { a: node.attrs.alt } : {}), // alt
        ...(node.attrs?.title ? { title: node.attrs.title } : {}), // title
        ...(node.attrs?.width ? { w: node.attrs.width } : {}), // width
        ...(node.attrs?.height ? { h: node.attrs.height } : {}), // height
        ...(node.attrs?.align ? { align: node.attrs.align } : {}), // align
      };

    case 'codeBlock':
      return {
        t: compressedType,
        lang: node.attrs?.language || 'plaintext',
        code: extractText(node.content || []),
      };

    case 'table':
      return {
        t: compressedType,
        rows: (node.content || []).map(compressNode),
      };

    case 'tableRow':
      return {
        t: compressedType,
        cells: (node.content || []).map(compressNode),
      };

    case 'tableCell':
    case 'tableHeader':
      return {
        t: compressedType,
        c: extractInlineContent(node.content || []),
      };

    case 'blockquote':
      return {
        t: compressedType,
        c: (node.content || []).map(compressNode),
      };

    case 'horizontalRule':
      return {
        t: compressedType,
      };

    case 'callout':
      const variant = node.attrs?.variant || 'info';
      return {
        t: variant === 'success' ? 'success' : 'info',
        c: (node.content || []).map(compressNode),
        ...(node.attrs?.title ? { title: node.attrs.title } : {}),
      };

    default:
      // Tipo genérico - tentar compactar
      const result: any = {
        t: compressedType,
      };

      if (node.content && Array.isArray(node.content)) {
        result.c = node.content.map(compressNode);
      }

      if (node.attrs && Object.keys(node.attrs).length > 0) {
        result.a = node.attrs;
      }

      return result;
  }
}

/**
 * Extrai texto puro de um array de nós
 */
function extractText(nodes: any[]): string {
  return nodes
    .map(node => {
      if (typeof node === 'string') return node;
      if (node.type === 'text') return node.text || '';
      if (node.content) return extractText(node.content);
      return '';
    })
    .join('');
}

/**
 * Extrai conteúdo inline (texto com formatação)
 */
function extractInlineContent(nodes: any[]): any[] {
  return nodes.map(node => {
    if (node.type === 'text') {
      const result: any = {
        text: node.text || '',
      };

      // Adicionar marks (formatação)
      if (node.marks && node.marks.length > 0) {
        const marks = node.marks.map((mark: any) => {
          const markType = TYPE_MAP[mark.type] || mark.type;
          if (markType === 'a') {
            // Link
            return {
              t: markType,
              h: mark.attrs?.href || '', // href
              ...(mark.attrs?.target ? { target: mark.attrs.target } : {}),
            };
          }
          return markType; // b, i, etc.
        });
        result.m = marks;
      }

      return result;
    }

    // Hard break
    if (node.type === 'hardBreak') {
      return { t: 'br' };
    }

    return compressNode(node);
  });
}

/**
 * Comprime um post completo
 */
export function compressPost(postContent: any): string {
  try {
    // Parse se for string
    let content = postContent;
    if (typeof postContent === 'string') {
      content = JSON.parse(postContent);
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
function decompressNode(node: any): any {
  if (!node || typeof node !== 'object') return node;

  // Documento compacto
  if ('v' in node && 'b' in node) {
    return {
      type: 'doc',
      content: (node.b || []).map(decompressNode),
    };
  }

  const type = node.t;
  const originalType = TYPE_MAP_REVERSE[type] || type;

  // Casos especiais
  if (type?.startsWith('h') && /^\d$/.test(type.slice(1))) {
    // Heading (h1, h2, h3)
    const level = parseInt(type.slice(1), 10);
    return {
      type: 'heading',
      attrs: {
        level,
        ...(node.id ? { id: node.id } : {}),
      },
      content: decompressInlineText(node.c || ''),
    };
  }

  switch (type) {
    case 'p':
      return {
        type: 'paragraph',
        content: decompressInlineContent(node.c || []),
      };

    case 'ul':
    case 'ol':
      return {
        type: type === 'ul' ? 'bulletList' : 'orderedList',
        content: (node.i || []).map(decompressNode),
      };

    case 'li':
      return {
        type: 'listItem',
        content: (node.c || []).map(decompressNode),
      };

    case 'img':
      const attrs: any = {
        src: node.s || '',
      };

      // Adicionar atributos opcionais
      if (node.a) attrs.alt = node.a;
      if (node.title) attrs.title = node.title;
      if (node.w) attrs.width = node.w;
      if (node.h) attrs.height = node.h;
      if (node.align) attrs.align = node.align;

      // Preservar informações de formato e animação (útil para otimização posterior)
      if (node.f) attrs.format = node.f;
      if (node.anim) attrs.animated = true;

      return {
        type: 'image',
        attrs,
      };

    case 'code':
      return {
        type: 'codeBlock',
        attrs: {
          language: node.lang || 'plaintext',
        },
        content: [
          {
            type: 'text',
            text: node.code || '',
          },
        ],
      };

    case 'tbl':
      return {
        type: 'table',
        content: (node.rows || []).map(decompressNode),
      };

    case 'tr':
      return {
        type: 'tableRow',
        content: (node.cells || []).map(decompressNode),
      };

    case 'td':
    case 'th':
      return {
        type: type === 'th' ? 'tableHeader' : 'tableCell',
        content: decompressInlineContent(node.c || []),
      };

    case 'q':
      return {
        type: 'blockquote',
        content: (node.c || []).map(decompressNode),
      };

    case 'hr':
      return {
        type: 'horizontalRule',
      };

    case 'info':
    case 'success':
      return {
        type: 'callout',
        attrs: {
          variant: type === 'success' ? 'success' : 'info',
          ...(node.title ? { title: node.title } : {}),
        },
        content: (node.c || []).map(decompressNode),
      };

    default:
      // Tipo genérico
      const result: any = {
        type: originalType,
      };

      if (node.c && Array.isArray(node.c)) {
        result.content = node.c.map(decompressNode);
      }

      if (node.a) {
        result.attrs = node.a;
      }

      return result;
  }
}

/**
 * Descomprime conteúdo inline
 */
function decompressInlineContent(nodes: any[]): any[] {
  return nodes.map(node => {
    if (typeof node === 'string') {
      return {
        type: 'text',
        text: node,
      };
    }

    if (node.text !== undefined) {
      // Nó de texto com marks
      const result: any = {
        type: 'text',
        text: node.text,
      };

      if (node.m && node.m.length > 0) {
        result.marks = node.m.map((mark: any) => {
          if (typeof mark === 'string') {
            return {
              type: TYPE_MAP_REVERSE[mark] || mark,
            };
          }

          if (mark.t === 'a') {
            return {
              type: 'link',
              attrs: {
                href: mark.h || '',
                ...(mark.target ? { target: mark.target } : {}),
              },
            };
          }

          return {
            type: TYPE_MAP_REVERSE[mark.t] || mark.t,
          };
        });
      }

      return result;
    }

    if (node.t === 'br') {
      return {
        type: 'hardBreak',
      };
    }

    return decompressNode(node);
  });
}

/**
 * Descomprime texto inline (para headings)
 */
function decompressInlineText(text: string): any[] {
  if (!text) return [];
  return [
    {
      type: 'text',
      text,
    },
  ];
}

/**
 * Descomprime um post
 */
export function decompressPost(compressedContent: string): any {
  try {
    // Parse JSON
    const compressed = JSON.parse(compressedContent);

    // Descomprimir
    return decompressNode(compressed);
  } catch (error) {
    console.error('Erro ao descomprimir post:', error);
    // Fallback: tentar parse direto
    try {
      return JSON.parse(compressedContent);
    } catch {
      return {
        type: 'doc',
        content: [],
      };
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

    blocks.forEach((block: any, index: number) => {
      if (block.t && /^h[1-3]$/.test(block.t)) {
        const level = parseInt(block.t.slice(1), 10);
        toc.push({
          level,
          text: block.c || '',
          id: block.id,
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
