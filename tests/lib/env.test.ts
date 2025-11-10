/**
 * Testes para lib/env.ts
 */

import { getEnvVar, validateEnv } from '@/lib/env';

describe('lib/env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getEnvVar', () => {
    it('deve retornar valor da variável de ambiente', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getEnvVar('TEST_VAR')).toBe('test-value');
    });

    it('deve retornar valor padrão quando variável não existe', () => {
      delete process.env.TEST_VAR;
      expect(getEnvVar('TEST_VAR', 'default')).toBe('default');
    });

    it('deve lançar erro quando variável é obrigatória e não existe', () => {
      delete process.env.TEST_VAR;
      expect(() => getEnvVar('TEST_VAR')).toThrow();
    });
  });

  describe('validateEnv', () => {
    it('deve validar variáveis de ambiente', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
      expect(() => validateEnv()).not.toThrow();
    });
  });
});
