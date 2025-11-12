/**
 * Testes para lib/monitoring/logger.ts
 */

import { logger } from '@/lib/monitoring/logger';

describe('lib/monitoring/logger', () => {
  const originalConsole = global.console;

  beforeEach(() => {
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
    global.console = originalConsole;
  });

  it('deve ter método info', () => {
    expect(typeof logger.info).toBe('function');
    logger.info('Test message');
    expect(console.info).toHaveBeenCalled();
  });

  it('deve ter método error', () => {
    expect(typeof logger.error).toBe('function');
    logger.error('Test error');
    expect(console.error).toHaveBeenCalled();
  });

  it('deve ter método warn', () => {
    expect(typeof logger.warn).toBe('function');
    logger.warn('Test warning');
    expect(console.warn).toHaveBeenCalled();
  });

  it('deve ter método debug', () => {
    expect(typeof logger.debug).toBe('function');
    logger.debug('Test debug');
    expect(console.debug).toHaveBeenCalled();
  });
});

