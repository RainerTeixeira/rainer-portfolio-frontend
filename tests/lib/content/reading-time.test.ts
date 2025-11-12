/**
 * Testes para lib/content/reading-time.ts
 */

import { calculateReadingTime } from '@/lib/content/reading-time';
import type { TiptapJSON } from '@/lib/api/types/common';

describe('lib/content/reading-time', () => {
  describe('calculateReadingTime', () => {
    it('deve calcular tempo de leitura para conteúdo Tiptap', () => {
      const content: TiptapJSON = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Este é um texto de teste para calcular o tempo de leitura. '.repeat(50),
              },
            ],
          },
        ],
      };

      const time = calculateReadingTime(content);
      expect(time).toBeGreaterThan(0);
    });

    it('deve calcular tempo de leitura para texto simples', () => {
      const text = 'Este é um texto de teste. '.repeat(50);
      const time = calculateReadingTime(text);
      expect(time).toBeGreaterThan(0);
    });

    it('deve calcular tempo de leitura para HTML', () => {
      const html = '<p>Este é um texto de teste.</p>'.repeat(50);
      const time = calculateReadingTime(html);
      expect(time).toBeGreaterThan(0);
    });

    it('deve retornar mínimo de 1 minuto', () => {
      expect(calculateReadingTime('')).toBe(1);
      expect(calculateReadingTime('Texto muito curto')).toBe(1);
    });

    it('deve aceitar wordsPerMinute personalizado', () => {
      const text = 'Palavra '.repeat(300);
      const time = calculateReadingTime(text, 300);
      expect(time).toBeGreaterThanOrEqual(1);
    });
  });
});

