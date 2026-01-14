export const authService = {
  login: jest.fn(async () => ({ token: 'mock-token' })),
  register: jest.fn(async () => ({ userId: 'mock-user' })),
  forgotPassword: jest.fn(async () => ({ success: true })),
  resetPassword: jest.fn(async () => ({ success: true })),
  verifyEmailAdmin: jest.fn(async () => ({ success: true })),
};

export default { authService };
