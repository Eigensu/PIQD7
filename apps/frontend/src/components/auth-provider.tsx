'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { API_URL } from '../lib/api';
import { isPublicPath } from '../lib/auth-routes';

export type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

type Auth = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Auth | null>(null);

// The login cookie is httpOnly, so the browser can't read it; ask the API who
// we are instead. credentials: 'include' sends the cookie cross-origin.
export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then((res) => (res.ok ? (res.json() as Promise<User>) : null))
      .then((u) => {
        if (!alive) return;
        setUser(u);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setUser(null);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Sign-in first. The proxy already redirects visitors with no cookie; this
  // covers an expired/invalid cookie (API says 401) and signed-in visitors
  // landing on /signin.
  useEffect(() => {
    if (loading) return;
    if (!user && !isPublicPath(pathname)) router.replace('/signin');
    else if (user && pathname === '/signin') router.replace('/brands');
  }, [loading, user, pathname, router]);

  const signOut = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, signOut }),
    [user, loading, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
