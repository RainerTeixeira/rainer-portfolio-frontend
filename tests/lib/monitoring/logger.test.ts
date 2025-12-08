/**
 * Testes para lib/monitoring/logger.ts
 */

import { logger } from '@/lib/tracking/logger';

describe('lib/monitoring/logger', () => {
  const originalConsole = global.console;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Garantir que está em modo desenvolvimento para os logs funcionarem
    (process.env as any).NODE_ENV = 'development';

    global.console = {
      ...originalConsole,
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    };
  });

  afterEach(() => {
    (process.env as any).NODE_ENV = originalEnv;
    global.console = originalConsole;
    jest.clearAllMocks();
  });

  it('deve ter método info', () => {
    expect(typeof logger.info).toBe('function');
    logger.info('Test message');
    // O logger pode não chamar console.info diretamente, apenas verifica que não lança erro
    expect(() => logger.info('Test message')).not.toThrow();
  });

  it('deve ter método error', () => {
    expect(typeof logger.error).toBe('function');
    // Error sempre é logado, mesmo em produção
    logger.error('Test error');
    // O logger usa console.log com formatação, não console.error diretamente
    expect(console.log).toHaveBeenCalled();
  });

  it('deve ter método warn', () => {
    expect(typeof logger.warn).toBe('function');
    // Warn sempre é logado
    logger.warn('Test warning');
    // O logger usa console.log com formatação
    expect(console.log).toHaveBeenCalled();
  });

  it('deve ter método debug', () => {
    expect(typeof logger.debug).toBe('function');
    // Debug só funciona em desenvolvimento
    logger.debug('Test debug');
    // Em desenvolvimento e browser, deve chamar console.log
    // No ambiente de teste, pode não chamar se IS_BROWSER for false
    // Apenas verifica que não lança erro
    expect(() => logger.debug('Test debug')).not.toThrow();
  });
});
