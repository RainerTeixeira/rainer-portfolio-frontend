/**
 * Testes para analyticsService
 */

import { analyticsService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('analyticsService', () => {
  it('deve ter método getAnalytics', () => {
    expect(typeof analyticsService.getAnalytics).toBe('function');
  });
});
