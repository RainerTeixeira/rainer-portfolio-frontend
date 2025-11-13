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

// Mock das funções de upload do Cloudinary
jest.mock('@/components/dashboard/lib/cloudinary', () => ({
  uploadBlogCover: jest.fn(() => Promise.resolve('/blog/cover.jpg')),
  uploadBlogContentImage: jest.fn(() => Promise.resolve('/blog/content.jpg')),
  uploadToCloudinary: jest.fn(() => Promise.resolve('/blog/general.jpg')),
}));

describe('useUpload', () => {
  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useUpload());
    expect(result.current).toHaveProperty('isUploading');
    expect(result.current).toHaveProperty('progress');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('uploadedUrl');
    expect(typeof result.current.isUploading).toBe('boolean');
    expect(typeof result.current.progress).toBe('number');
  });

  it('deve ter funções de upload', () => {
    const { result } = renderHook(() => useUpload());
    expect(typeof result.current.upload).toBe('function');
    expect(typeof result.current.uploadWithPreview).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });
});
