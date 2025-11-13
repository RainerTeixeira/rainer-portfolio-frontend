import { commentsService } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('commentsService', () => {
  afterEach(() => resetFetchMock());

  test('listComments envia params page/limit', async () => {
    const mock = mockFetchOnce({ success: true, data: [] });
    await commentsService.listComments({ page: 2, limit: 5 });
    const urlString = (mock as any).mock.calls[0][0];
    // Se for URL relativa, adiciona base URL
    const url = urlString.startsWith('http')
      ? new URL(urlString)
      : new URL(urlString, 'http://localhost:4000');
    expect(url.pathname.endsWith('/comments')).toBe(true);
    expect(url.searchParams.get('page')).toBe('2');
    expect(url.searchParams.get('limit')).toBe('5');
  });

  test('getCommentsByPost retorna lista por postId', async () => {
    mockFetchOnce({
      success: true,
      data: [
        {
          id: 'c1',
          postId: 'p1',
          authorId: 'u1',
          content: 'Nice!',
          createdAt: '',
          updatedAt: '',
        },
      ],
    });
    const res = await commentsService.getCommentsByPost('p1');
    expect(res[0].postId).toBe('p1');
  });

  test('approveComment faz PATCH', async () => {
    const mock = mockFetchOnce({
      success: true,
      data: { id: 'c1', approved: true },
    });
    await commentsService.approveComment('c1');
    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('PATCH');
  });
});
