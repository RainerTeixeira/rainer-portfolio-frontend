/**
 * Testes para tiptap-utils
 */

import { tiptapJSONtoHTML } from '@/lib/utils';

describe('tiptap-utils', () => {
  it('deve converter JSON do Tiptap para HTML', () => {
    const tiptapJSON = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello' }],
        },
      ],
    };
    const html = tiptapJSONtoHTML(tiptapJSON as any);
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
  });

  it('deve lidar com conteúdo vazio', () => {
    const tiptapJSON = { type: 'doc', content: [] };
    const html = tiptapJSONtoHTML(tiptapJSON as any);
    expect(typeof html).toBe('string');
  });
});
