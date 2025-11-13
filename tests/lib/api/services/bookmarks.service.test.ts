/**
 * Testes para bookmarksService
 */

import { bookmarksService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('bookmarksService', () => {
  it('deve ter método toggleBookmark', () => {
    expect(typeof bookmarksService.toggleBookmark).toBe('function');
  });

  it('deve ter método getBookmarksByUser', () => {
    expect(typeof bookmarksService.getBookmarksByUser).toBe('function');
  });
});
