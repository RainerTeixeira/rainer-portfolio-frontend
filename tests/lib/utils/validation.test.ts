/**
 * Testes para lib/utils/validation.ts
 */

import {
  validateEmail,
  validateMessage,
  validatePassword,
  validatePhone,
  validateSlug,
  validateUrl,
  validateUsername,
} from '@/lib/utils/validation';

describe('lib/utils/validation', () => {
  describe('validateEmail', () => {
    it('deve validar email válido', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar email inválido', () => {
      expect(validateEmail('invalid-email').isValid).toBe(false);
      expect(validateEmail('@example.com').isValid).toBe(false);
      expect(validateEmail('test@').isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('deve validar senha válida', () => {
      const result = validatePassword('senha123456');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar senha muito curta', () => {
      const result = validatePassword('123');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('deve validar username válido', () => {
      const result = validateUsername('testuser');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar username muito curto', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('deve validar telefone válido', () => {
      // Formato esperado: +55 (11) 99999-9999 ou similar
      const result = validatePhone('5511999999999');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar telefone inválido', () => {
      const result = validatePhone('123');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateMessage', () => {
    it('deve validar mensagem válida', () => {
      const result = validateMessage('Test message with enough characters');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar mensagem muito curta', () => {
      const result = validateMessage('Hi');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('deve validar URL válida', () => {
      const result = validateUrl('https://example.com');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar URL inválida', () => {
      const result = validateUrl('not-a-url');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateSlug', () => {
    it('deve validar slug válido', () => {
      const result = validateSlug('test-slug-123');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar slug inválido', () => {
      const result = validateSlug('Invalid Slug!');
      expect(result.isValid).toBe(false);
    });
  });
});
