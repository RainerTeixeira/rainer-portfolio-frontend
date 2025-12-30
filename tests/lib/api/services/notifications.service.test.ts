/**
 * Testes para serviços privados de notificações (sem legado)
 */
import { privateNotifications } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}));

describe('privateNotifications', () => {
  it('deve ter método getNotifications', () => {
    expect(typeof privateNotifications.getNotifications).toBe('function');
  });

  it('deve ter método markAllAsRead', () => {
    expect(typeof privateNotifications.markAllAsRead).toBe('function');
  });
});
