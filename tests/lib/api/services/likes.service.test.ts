/**
 * Testes para serviços privados de likes (sem legado)
 */
import { privateLikes } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('privateLikes', () => {
  it('deve ter método createLike', () => {
    expect(typeof privateLikes.createLike).toBe('function');
  });

  it('deve ter método getLikes', () => {
    expect(typeof privateLikes.getLikes).toBe('function');
  });

  it('deve ter método checkPostLiked', () => {
    expect(typeof privateLikes.checkPostLiked).toBe('function');
  });
});
