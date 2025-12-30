/**
 * Testes para serviços privados de cloudinary (sem legado)
 */
import { privateCloudinary } from '@/lib/api';

jest.mock('@/lib/api/clients/private-client', () => ({
  privateClient: {
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('privateCloudinary', () => {
  it('deve ter método uploadImage', () => {
    expect(typeof privateCloudinary.uploadImage).toBe('function');
  });
});
