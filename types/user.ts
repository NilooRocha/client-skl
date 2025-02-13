export interface User {
  id: string;
  fullName: string;
  email: string;
  location: string;
  isVerified: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  fullName?: string;
  location?: string;
}
