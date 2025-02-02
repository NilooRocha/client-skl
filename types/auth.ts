import { User } from './user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | undefined;
  login: (email: string, password: string) => Promise<User | undefined>;
  logout: () => void;
}
