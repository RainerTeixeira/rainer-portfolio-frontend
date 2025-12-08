/**
 * Testes para utilitários de API helpers
 *
 * @deprecated Este arquivo de teste agrupa funções de múltiplos módulos.
 * Considere separar em testes específicos:
 * - String utils → tests/lib/utils/string.test.ts
 * - Content utils → tests/lib/content/tiptap-utils.test.ts, tests/lib/content/reading-time.test.ts
 * - Post helpers → tests/lib/api/helpers/post-helpers.test.ts
 *
 * Testa funções migradas para módulos específicos:
 * - String utils: textToSlug, formatDate, formatDateTime, translateStatus
 * - Content utils: extractTextFromTiptap, generateExcerpt, createEmptyTiptapContent, isContentEmpty, calculateReadingTime
 * - Post helpers: preparePostForCreate, preparePostForUpdate, validatePostData
 */

import {
  calculateReadingTime,
  createEmptyTiptapContent,
  extractTextFromTiptap,
  generateExcerpt,
  isContentEmpty,
} from '@/lib/content';

import {
  preparePostForCreate,
  preparePostForUpdate,
  validatePostData,
} from '@/lib/api/helpers';

import {
  formatDate,
  formatDateTime,
  textToSlug,
  translateStatus,
} from '@rainersoft/utils';

describe('api-helpers', () => {
  describe('textToSlug', () => {
    it('deve converter texto para slug', () => {
      expect(textToSlug('Meu Primeiro Post!')).toBe('meu-primeiro-post');
      expect(textToSlug('Teste com Acentos áéíóú')).toBe(
        'teste-com-acentos-aeiou'
      );
    });
  });

  describe('calculateReadingTime', () => {
    it('deve calcular tempo de leitura', () => {
      const text = 'Lorem ipsum '.repeat(50);
      expect(calculateReadingTime(text)).toBeGreaterThan(0);
    });

    it('deve retornar mínimo de 1 minuto', () => {
      expect(calculateReadingTime('')).toBe(1);
    });
  });

  describe('extractTextFromTiptap', () => {
    it('deve extrair texto do JSON do Tiptap', () => {
      const tiptapContent = {
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        ],
      };
      expect(extractTextFromTiptap(tiptapContent as any)).toContain('Hello');
    });
  });

  describe('generateExcerpt', () => {
    it('deve gerar excerpt do conteúdo', () => {
      const content = {
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Long text here' }],
          },
        ],
      };
      const excerpt = generateExcerpt(content as any, 10);
      expect(excerpt.length).toBeLessThanOrEqual(13); // 10 chars + '...'
    });
  });

  describe('preparePostForCreate', () => {
    it('deve preparar dados para criar post', () => {
      const formData = {
        title: 'Test Post',
        content: { type: 'doc', content: [] },
      };
      const result = preparePostForCreate(formData as any, 'author-1');
      expect(result.title).toBe('Test Post');
      expect(result.authorId).toBe('author-1');
    });
  });

  describe('preparePostForUpdate', () => {
    it('deve preparar dados para atualizar post', () => {
      const formData = {
        title: 'Updated Post',
        content: { type: 'doc', content: [] },
      };
      const result = preparePostForUpdate(formData);
      expect(result.title).toBe('Updated Post');
      expect(result.slug).toBe('updated-post');
    });
  });

  describe('validatePostData', () => {
    it('deve validar dados de post válidos', () => {
      const data = {
        title: 'Valid Post',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Long content here' }],
            },
          ],
        },
      };
      const errors = validatePostData(data as any);
      expect(errors.length).toBe(0);
    });

    it('deve retornar erros para título muito curto', () => {
      const data = {
        title: 'AB',
        content: { type: 'doc', content: [] },
      };
      const errors = validatePostData(data as any);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('createEmptyTiptapContent', () => {
    it('deve criar conteúdo vazio do Tiptap', () => {
      const content = createEmptyTiptapContent();
      expect(content.type).toBe('doc');
      expect(content.content).toEqual([]);
    });
  });

  describe('isContentEmpty', () => {
    it('deve retornar true para conteúdo vazio', () => {
      const content = { type: 'doc', content: [] };
      expect(isContentEmpty(content)).toBe(true);
    });

    it('deve retornar false para conteúdo preenchido', () => {
      const content = {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        ],
      };
      expect(isContentEmpty(content)).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('deve formatar data', () => {
      const date = new Date('2023-01-01');
      const formatted = formatDate(date);
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });

  describe('formatDateTime', () => {
    it('deve formatar data e hora', () => {
      const date = new Date('2023-01-01T12:00:00');
      const formatted = formatDateTime(date);
      expect(formatted).toContain('2023');
    });
  });

  describe('translateStatus', () => {
    it('deve traduzir status', () => {
      expect(translateStatus('DRAFT')).toBe('Rascunho');
      expect(translateStatus('PUBLISHED')).toBe('Publicado');
    });
  });
});
