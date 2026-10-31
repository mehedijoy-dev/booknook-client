export interface AuthUser {
  name: string;
  email: string;
  image?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Temporary stub. It will be replaced with the real BetterAuth session.
export function useAuth(): AuthState {
  return {
    user: null,
    loading: false,
    logout: async () => {},
  };
}
