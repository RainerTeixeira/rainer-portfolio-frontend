const mockState = {
  user: null as any,
  isAuthenticated: false,
  loading: false,
};

export const useAuth = () => {
  const login = jest.fn(async (email: string, password: string) => {
    mockState.user = { email };
    mockState.isAuthenticated = true;
    return { user: mockState.user, tokens: { accessToken: 'token' } };
  });

  const logout = jest.fn(() => {
    mockState.user = null;
    mockState.isAuthenticated = false;
  });

  return {
    user: mockState.user,
    isAuthenticated: mockState.isAuthenticated,
    loading: mockState.loading,
    login,
    logout,
  };
};

export default { useAuth };
