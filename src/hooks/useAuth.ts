"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

export function useAuth(): AuthState {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const user: AuthUser | null = data?.user
    ? {
        name: data.user.name,
        email: data.user.email,
        image: data.user.image,
      }
    : null;

  const logout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return { user, loading: isPending, logout };
}
