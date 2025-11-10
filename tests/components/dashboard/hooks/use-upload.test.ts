/**
 * Testes para hook useUpload
 */

import { useUpload } from '@/components/dashboard/hooks/use-upload';
import { renderHook } from '@testing-library/react';

// Mock do toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock do cloudinaryService
jest.mock('@/lib/api/services/cloudinary.service', () => ({
  cloudinaryService: {
    uploadBlogImage: jest.fn(() => Promise.resolve('/blog/test.jpg')),
  },
}));

describe('useUpload', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useUpload());
    expect(result.current).toHaveProperty('uploading');
    expect(result.current).toHaveProperty('progress');
    expect(typeof result.current.uploading).toBe('boolean');
    expect(typeof result.current.progress).toBe('number');
  });

  it('deve ter função de upload', () => {
    const { result } = renderHook(() => useUpload());
    expect(typeof result.current.uploadFile).toBe('function');
  });
});
