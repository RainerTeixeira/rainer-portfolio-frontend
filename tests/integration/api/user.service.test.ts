import { profileService, usersService } from '@/lib/api/services/user.service';
import { api } from '@/lib/api/client';

jest.mock('@/lib/api/client');

describe('ProfileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not send email in updateProfile', async () => {
    const mockApi = jest.spyOn(api, 'patch').mockResolvedValue({
      success: true,
      data: {
        id: 'user-id',
        cognitoSub: 'cognito-123',
        username: 'testuser',
        fullName: 'New Name',
        bio: 'New Bio',
        role: 'AUTHOR',
        isActive: true,
        isBanned: false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    } as any);

    await profileService.updateProfile('user-id', {
      fullName: 'New Name',
      bio: 'New Bio',
    });

    expect(mockApi).toHaveBeenCalledWith(
      '/users/user-id',
      expect.not.objectContaining({ email: expect.anything() })
    );
  });

  it('should call getUserByCognitoSub with correct endpoint', async () => {
    const mockApi = jest.spyOn(api, 'get').mockResolvedValue({
      success: true,
      data: {
        id: 'user-id',
        cognitoSub: 'cognito-123',
        username: 'testuser',
        fullName: 'Test User',
        role: 'AUTHOR',
        isActive: true,
        isBanned: false,
        postsCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    } as any);

    await profileService.getUserByCognitoSub('cognito-123');

    expect(mockApi).toHaveBeenCalledWith('/users/cognito/cognito-123');
  });

  it('should call BaseUserService.getUserById via profileService with correct endpoint', async () => {
    const mockApi = jest.spyOn(api, 'get').mockResolvedValue({
      success: true,
      data: {
        id: 'mongo-or-cognito-id',
        fullName: 'Test User',
      },
    } as any);

    const user = await profileService.getUserById('mongo-or-cognito-id');

    expect(mockApi).toHaveBeenCalledWith('/users/mongo-or-cognito-id');
    expect(user.id).toBe('mongo-or-cognito-id');
  });
});

describe('UsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listUsers envia page/limit/role/search na query string', async () => {
    const mockApi = jest.spyOn(api, 'get').mockResolvedValue({
      success: true,
      data: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    } as any);

    await usersService.listUsers({
      page: 3,
      limit: 20,
      role: 'ADMIN',
      search: 'john',
      isActive: true,
      isBanned: false,
    } as any);

    expect(mockApi).toHaveBeenCalledTimes(1);
    const calledUrl = mockApi.mock.calls[0][0] as string;
    const url = new URL(calledUrl, 'http://localhost');

    expect(url.pathname.endsWith('/users')).toBe(true);
    expect(url.searchParams.get('page')).toBe('3');
    expect(url.searchParams.get('limit')).toBe('20');
    expect(url.searchParams.get('role')).toBe('ADMIN');
    expect(url.searchParams.get('search')).toBe('john');
    expect(url.searchParams.get('isActive')).toBe('true');
    expect(url.searchParams.get('isBanned')).toBe('false');
  });

  it('getUserByNickname usa BaseUserService com endpoint correto', async () => {
    const mockApi = jest.spyOn(api, 'get').mockResolvedValue({
      success: true,
      data: {
        id: 'u2',
        nickname: 'joaosilva',
        fullName: 'João Silva',
      },
    } as any);

    const user = await usersService.getUserByNickname('joaosilva');

    expect(mockApi).toHaveBeenCalledWith('/users/nickname/joaosilva');
    expect(user.nickname).toBe('joaosilva');
  });
});
