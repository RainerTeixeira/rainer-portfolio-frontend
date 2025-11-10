import { likesService } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('likesService', () => {
  afterEach(() => resetFetchMock());

  test('likePost faz POST e normaliza resposta', async () => {
    const mock = mockFetchOnce({
      success: true,
      data: { id: 'l1', userId: 'u1', postId: 'p1', createdAt: '' },
    });
    const like = await likesService.likePost({ userId: 'u1', postId: 'p1' });
    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('POST');
    expect(like.postId).toBe('p1');
  });

  test('getLikesCount retorna number', async () => {
    mockFetchOnce({ success: true, data: 7 });
    const count = await likesService.getLikesCount('p1');
    expect(count).toBe(7);
  });

  test('hasUserLiked retorna boolean', async () => {
    mockFetchOnce({ success: true, data: true });
    const has = await likesService.hasUserLiked('u1', 'p1');
    expect(has).toBe(true);
  });
});
