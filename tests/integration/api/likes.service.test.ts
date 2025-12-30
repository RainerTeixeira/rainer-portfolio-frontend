/**
 * Testes de integração para likes (mínimos, sem legado)
 */
import { privateLikes } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('privateLikes - Integração', () => {
  it('deve ter método createLike', () => {
    expect(typeof privateLikes.createLike).toBe('function');
  });

  it('deve ter método removeLike', () => {
    expect(typeof privateLikes.removeLike).toBe('function');
  });

  it('deve ter método getLikes', () => {
    expect(typeof privateLikes.getLikes).toBe('function');
  });
});
