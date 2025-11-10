import { bookmarksService } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('bookmarksService', () => {
  afterEach(() => resetFetchMock());

  test('createBookmark faz POST e retorna bookmark', async () => {
    const payload = { userId: 'u1', postId: 'p1', collection: 'Favoritos' };
    const response = {
      success: true,
      data: { id: 'b1', ...payload, createdAt: '', updatedAt: '' },
    };
    const mock = mockFetchOnce(response);

    const bookmark = await bookmarksService.createBookmark(payload);
    expect(bookmark.id).toBe('b1');
    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('POST');
  });

  test('getBookmarksByCollection usa query fullName', async () => {
    const mock = mockFetchOnce({ success: true, data: [] });
    await bookmarksService.getBookmarksByCollection('u1', 'Favoritos');
    const url = new URL((mock as any).mock.calls[0][0]);
    expect(url.pathname.endsWith('/bookmarks/user/u1/collection')).toBe(true);
    expect(url.searchParams.get('fullName')).toBe('Favoritos');
  });
});
