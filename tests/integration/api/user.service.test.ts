import { userService } from '@/lib/api';
import { api } from '@/lib/api/client';

jest.mock('@/lib/api/client');

describe('UserService', () => {
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

    await userService.updateProfile('user-id', {
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

    await userService.getUserByCognitoSub('cognito-123');

    expect(mockApi).toHaveBeenCalledWith('/users/cognito/cognito-123');
  });
});
