/**
 * Testes para serviços privados de bookmarks (sem legado)
 */
import { privateBookmarks } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('privateBookmarks', () => {
  it('deve ter método createBookmark', () => {
    expect(typeof privateBookmarks.createBookmark).toBe('function');
  });

  it('deve ter método getBookmarks', () => {
    expect(typeof privateBookmarks.getBookmarks).toBe('function');
  });
});
