export interface PublicUserProfile {
  id: string;
  username: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: string;
  role?: string;
}

export interface UpdateUserData {
  name?: string;
  bio?: string;
  avatar?: string;
  role?: string;
}

export interface ListUsersParams {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}
