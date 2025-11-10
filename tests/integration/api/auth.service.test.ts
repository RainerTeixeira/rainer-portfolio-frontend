import { authService } from '@/lib/api';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should extract Cognito user from token', () => {
    const mockPayload = {
      sub: 'cognito-123',
      email: 'test@example.com',
      email_verified: true,
      fullName: 'Test User',
      'cognito:username': 'testuser',
    };

    const mockToken = `header.${btoa(JSON.stringify(mockPayload))}.signature`;
    localStorage.setItem('accessToken', mockToken);

    const cognitoUser = authService.getCognitoUserFromToken();

    expect(cognitoUser).toBeDefined();
    expect(cognitoUser?.sub).toBe('cognito-123');
    expect(cognitoUser?.email).toBe('test@example.com');
    expect(cognitoUser?.email_verified).toBe(true);
  });

  it('should return null if no token', () => {
    const cognitoUser = authService.getCognitoUserFromToken();
    expect(cognitoUser).toBeNull();
  });
});
