/**
 * Testes para cloudinaryService
 */

import { cloudinaryService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    post: jest.fn(() =>
      Promise.resolve({ success: true, url: '/blog/test.jpg' })
    ),
  },
}));

describe('cloudinaryService', () => {
  it('deve ter métodos de upload', () => {
    expect(cloudinaryService).toBeDefined();
    expect(typeof cloudinaryService.uploadBlogImage).toBe('function');
  });

  it('deve ter método isCloudinaryUrl', () => {
    expect(typeof cloudinaryService.isCloudinaryUrl).toBe('function');
  });
});
