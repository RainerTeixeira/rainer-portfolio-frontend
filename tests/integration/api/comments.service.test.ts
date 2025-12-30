/**
 * Testes de integração para comentários (mínimos, sem legado)
 */
import { privateComments } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('privateComments - Integração', () => {
  it('deve ter método createComment', () => {
    expect(typeof privateComments.createComment).toBe('function');
  });

  it('deve ter método getComments', () => {
    expect(typeof privateComments.getComments).toBe('function');
  });

  it('deve ter método updateComment', () => {
    expect(typeof privateComments.updateComment).toBe('function');
  });
});
