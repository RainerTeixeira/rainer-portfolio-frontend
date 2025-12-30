import { privateBookmarks } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('bookmarksService', () => {
  afterEach(() => resetFetchMock());

  test('createBookmark faz POST e retorna bookmark', async () => {
    const payload: { type: 'post'; resourceId: string } = { type: 'post', resourceId: 'p1' };
    const response = {
      success: true,
      data: { id: 'b1', userId: 'u1', type: 'post', resourceId: 'p1', createdAt: '', updatedAt: '' },
      bookmarked: true,
    };
    const mock = mockFetchOnce(response);

    const bookmark = await privateBookmarks.createBookmark(payload);
    expect(bookmark.data.id).toBe('b1');
    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('POST');
  });

  test('getBookmarks retorna lista', async () => {
    const mock = mockFetchOnce({ data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } });
    await privateBookmarks.getBookmarks({ userId: 'u1', type: 'post' });
    const url = new URL((mock as any).mock.calls[0][0]);
    expect(url.pathname.endsWith('/bookmarks')).toBe(true);
    expect(url.searchParams.get('userId')).toBe('u1');
  });
});
