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
  it('deve ter método uploadBlogImage', () => {
    expect(typeof privateCloudinary.uploadBlogImage).toBe('function');
  });

  it('deve ter método uploadAvatar', () => {
    expect(typeof privateCloudinary.uploadAvatar).toBe('function');
  });

  it('deve ter método validateImage', () => {
    expect(typeof privateCloudinary.validateImage).toBe('function');
  });
});
