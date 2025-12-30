/**
 * Testes de integração para usuários (mínimos, sem legado)
 */
import { privateUsers } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('privateUsers - Integração', () => {
  it('deve ter método getProfile', () => {
    expect(typeof privateUsers.getProfile).toBe('function');
  });

  it('deve ter método updateProfile', () => {
    expect(typeof privateUsers.updateProfile).toBe('function');
  });
});
