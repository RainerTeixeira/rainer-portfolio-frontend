import { usersService } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('usersService', () => {
  afterEach(() => resetFetchMock());

  test('listUsers envia page/limit/role/search', async () => {
    const mock = mockFetchOnce({ success: true, data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } });
    await usersService.listUsers({ page: 3, limit: 20, role: 'ADMIN', search: 'john' });
    const url = new URL((mock as any).mock.calls[0][0]);
    expect(url.pathname.endsWith('/users')).toBe(true);
    expect(url.searchParams.get('page')).toBe('3');
    expect(url.searchParams.get('limit')).toBe('20');
    expect(url.searchParams.get('role')).toBe('ADMIN');
    expect(url.searchParams.get('search')).toBe('john');
  });

  test('getUserByUsername retorna user', async () => {
    mockFetchOnce({ success: true, data: { id: 'u1', username: 'jane', name: 'Jane', createdAt: '', updatedAt: '' } });
    const user = await usersService.getUserByUsername('jane');
    expect(user.username).toBe('jane');
  });
});
