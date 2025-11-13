/**
 * Testes para commentsService
 */

import { commentsService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ success: true, data: [] })),
    post: jest.fn(() => Promise.resolve({ success: true, data: {} })),
    put: jest.fn(() => Promise.resolve({ success: true, data: {} })),
    delete: jest.fn(() => Promise.resolve({ success: true })),
  },
}));

describe('commentsService', () => {
  it('deve ter método listComments', () => {
    expect(typeof commentsService.listComments).toBe('function');
  });

  it('deve ter método createComment', () => {
    expect(typeof commentsService.createComment).toBe('function');
  });
});
