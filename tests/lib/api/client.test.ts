/**
 * Teste mínimo para ApiError (compat)
 */
import { ApiError } from '@/lib/api/utils/error-handler';

describe('ApiError', () => {
  it('deve expor status e data', () => {
    const err = new ApiError('msg', 500, 'CODE', { a: 1 });
    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(500);
    expect(err.code).toBe('CODE');
    expect(err.details).toEqual({ a: 1 });
  });
});
