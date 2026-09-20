export type Role = 'USER' | 'ADMIN' | 'STORE_OWNER';

export interface User {
  id?: string;
  name: string;
  email: string;
  role: Role;
  address?: string;
  createdAt?: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId?: string;
  owner?: User;
  ratings?: Rating[];
  averageRating?: number;
  totalRatings?: number;
  userRating?: number | null;
  createdAt?: string;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  user?: {
    name: string;
    email: string;
  };
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  tokens: string;
}

export interface ApiErrorResponse {
  error?: string;
  message?: string;
}
