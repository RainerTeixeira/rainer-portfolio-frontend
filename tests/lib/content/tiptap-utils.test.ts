/**
 * Testes para lib/content/tiptap-utils.ts
 */

import {
  createEmptyTiptapContent,
  extractTextFromTiptap,
  generateExcerpt,
  isContentEmpty,
} from '@/lib/content/tiptap-utils';
import type { TiptapJSON } from '@/lib/api/types/common';

describe('lib/content/tiptap-utils', () => {
  describe('extractTextFromTiptap', () => {
    it('deve extrair texto de conteúdo Tiptap', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Olá mundo' }],
          },
        ],
      };

      expect(extractTextFromTiptap(content)).toBe('Olá mundo');
    });

    it('deve extrair texto de múltiplos parágrafos', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Primeiro parágrafo' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Segundo parágrafo' }],
          },
        ],
      };

      expect(extractTextFromTiptap(content)).toBe('Primeiro parágrafo Segundo parágrafo');
    });

    it('deve retornar string vazia para conteúdo vazio', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [],
      };

      expect(extractTextFromTiptap(content)).toBe('');
    });
  });

  describe('generateExcerpt', () => {
    it('deve gerar excerpt do conteúdo', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Este é um texto longo que será truncado para gerar um excerpt',
              },
            ],
          },
        ],
      };

      const excerpt = generateExcerpt(content, 20);
      expect(excerpt.length).toBeLessThanOrEqual(23); // 20 + "..."
      expect(excerpt).toContain('...');
    });

    it('deve retornar texto completo se menor que maxLength', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Texto curto' }],
          },
        ],
      };

      expect(generateExcerpt(content, 100)).toBe('Texto curto');
    });
  });

  describe('createEmptyTiptapContent', () => {
    it('deve criar conteúdo Tiptap vazio', () => {
      const content = createEmptyTiptapContent();

      expect(content.type).toBe('doc');
      expect(content.content).toEqual([]);
    });
  });

  describe('isContentEmpty', () => {
    it('deve retornar true para conteúdo vazio', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [],
      };

      expect(isContentEmpty(content)).toBe(true);
    });

    it('deve retornar false para conteúdo com texto', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Texto' }],
          },
        ],
      };

      expect(isContentEmpty(content)).toBe(false);
    });
  });
});

