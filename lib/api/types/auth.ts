export interface UserProfile {
  id: string;
  cognitoSub: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  role: 'ADMIN' | 'AUTHOR' | 'READER';
  bio?: string;
  website?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserProfile;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  username?: string;
  bio?: string;
  website?: string;
  avatar?: string;
}
