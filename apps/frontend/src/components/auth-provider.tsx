'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import {
  SessionProvider,
  useSession,
  signOut as nextSignOut,
} from 'next-auth/react';

export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string;
};

type Auth = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Auth | null>(null);

function AuthState({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const user = session?.user
    ? {
        id: session.user.id ?? session.user.email ?? '',
        email: session.user.email ?? '',
        name: session.user.name ?? undefined,
        image: session.user.image ?? undefined,
      }
    : null;

  const signOut = useCallback(async () => {
    await nextSignOut({ callbackUrl: '/signin' });
  }, []);

  const value = useMemo(
    () => ({ user, loading: status === 'loading', signOut }),
    [user, status, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <AuthState>{children}</AuthState>
    </SessionProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
