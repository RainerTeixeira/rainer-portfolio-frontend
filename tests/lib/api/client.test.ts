/**
 * Teste mínimo para ApiError (compat)
 */
import { ApiError } from '@/lib/api/client';

describe('ApiError', () => {
  it('deve expor status e data', () => {
    const err = new ApiError('msg', 500, 'CODE', '/endpoint', '/url', 'GET', { a: 1 });
    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(500);
    expect(err.data).toEqual({ a: 1 });
  });
});
