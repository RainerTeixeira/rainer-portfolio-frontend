/**
 * Testes para lib/utils/string.ts
 */

import {
  formatDate,
  formatDateTime,
  textToSlug,
  translatePostStatus,
  translateStatus,
} from '@/lib/utils/string';
import { PostStatus } from '@/lib/api/types/posts';

describe('lib/utils/string', () => {
  describe('textToSlug', () => {
    it('deve converter texto para slug', () => {
      expect(textToSlug('Meu Primeiro Post!')).toBe('meu-primeiro-post');
      expect(textToSlug('Teste com Acentos áéíóú')).toBe('teste-com-acentos-aeiou');
    });

    it('deve remover caracteres especiais', () => {
      expect(textToSlug('Café & Pão')).toBe('cafe-pao');
      expect(textToSlug('Teste@#$%')).toBe('teste');
    });

    it('deve remover hífens duplicados', () => {
      expect(textToSlug('Teste---com---hífens')).toBe('teste-com-hifens');
    });

    it('deve remover hífens do início e fim', () => {
      expect(textToSlug('-teste-')).toBe('teste');
    });
  });

  describe('formatDate', () => {
    it('deve formatar data em português', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const formatted = formatDate(date);

      expect(formatted).toContain('janeiro');
      expect(formatted).toContain('2024');
    });

    it('deve formatar data a partir de string ISO', () => {
      const formatted = formatDate('2024-01-15T00:00:00Z');

      expect(formatted).toContain('janeiro');
      expect(formatted).toContain('2024');
    });
  });

  describe('formatDateTime', () => {
    it('deve formatar data e hora em português', () => {
      const date = new Date('2024-01-15T14:30:00Z');
      const formatted = formatDateTime(date);

      expect(formatted).toContain('janeiro');
      expect(formatted).toContain('2024');
    });
  });

  describe('translatePostStatus', () => {
    it('deve traduzir status de post', () => {
      expect(translatePostStatus(PostStatus.DRAFT)).toBe('Rascunho');
      expect(translatePostStatus(PostStatus.PUBLISHED)).toBe('Publicado');
      expect(translatePostStatus(PostStatus.ARCHIVED)).toBe('Arquivado');
    });

    it('deve traduzir status como string', () => {
      expect(translatePostStatus('draft')).toBe('Rascunho');
      expect(translatePostStatus('published')).toBe('Publicado');
    });
  });

  describe('translateStatus', () => {
    it('deve traduzir status (alias)', () => {
      expect(translateStatus(PostStatus.DRAFT)).toBe('Rascunho');
      expect(translateStatus(PostStatus.PUBLISHED)).toBe('Publicado');
    });
  });
});

