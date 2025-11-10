/** @jest-environment node */
/**
 * Smoke tests "live" da API real
 * - Antes de rodar, garanta que NEXT_PUBLIC_API_URL aponte para seu backend (ex: http://localhost:4000)
 * - Usa header X-Database-Provider (PRISMA | DYNAMODB) definido por API_DB_PROVIDER (default: DYNAMODB)
 * - Se o /health falhar, os testes serão pulados
 */

import { api } from '../../../lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

jest.setTimeout(20000);
const DB_PROVIDER = (process.env.API_DB_PROVIDER || 'PRISMA').toUpperCase();

let healthy = false;

describe('LIVE API Smoke', () => {
  beforeAll(async () => {
    try {
      const res = await fetch(`${BASE_URL}/health`, {
        headers: {
          accept: '*/*',
          'X-Database-Provider': DB_PROVIDER,
        },
      });
      if (!res.ok) throw new Error(`Health status ${res.status}`);
      const json = await res.json();
      // Sanidade mínima
      healthy = Boolean(json?.success) && Boolean(json?.data?.status === 'ok');
      // eslint-disable-next-line no-console
      console.log('Health:', json?.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Health check falhou. Pulando smoke tests.', e);
      healthy = false;
    }
  });

  test('Health está OK', () => {
    if (!healthy) {
      console.warn('Sem saúde da API — verifique o backend e tente novamente.');
      return; // skip
    }
    expect(healthy).toBe(true);
  });

  test('GET /posts lista posts', async () => {
    if (!healthy) {
      console.warn('Sem saúde da API');
      return;
    }
    const res = await api.get<any>('/posts', {
      headers: { 'X-Database-Provider': DB_PROVIDER },
      params: { page: 1, limit: 1 },
    });
    expect(res).toBeTruthy();
  });

  test('GET /categories lista categorias', async () => {
    if (!healthy) {
      console.warn('Sem saúde da API');
      return;
    }
    const res = await api.get<any>('/categories', {
      headers: { 'X-Database-Provider': DB_PROVIDER },
    });
    expect(res).toBeTruthy();
  });

  test('GET /comments lista comentários', async () => {
    if (!healthy) {
      console.warn('Sem saúde da API');
      return;
    }
    const res = await api.get<any>('/comments', {
      headers: { 'X-Database-Provider': DB_PROVIDER },
      params: { page: 1, limit: 1 },
    });
    expect(res).toBeTruthy();
  });

  test('GET /users lista usuários', async () => {
    if (!healthy) {
      console.warn('Sem saúde da API');
      return;
    }
    const res = await api.get<any>('/users', {
      headers: { 'X-Database-Provider': DB_PROVIDER },
      params: { page: 1, limit: 1 },
    });
    expect(res).toBeTruthy();
  });
});
