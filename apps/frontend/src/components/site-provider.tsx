'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const KEY = 'jl-your-edit';

type Site = {
  edit: string[];
  lov: (id: string) => void;
  remove: (id: string) => void;
};

const SiteContext = createContext<Site | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [edit, setEdit] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setEdit(parsed.filter((x): x is string => typeof x === 'string'));
      }
    } catch {
      // storage unavailable (private mode) — Your Edit just won't persist
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(edit));
    } catch {
      // storage unavailable (private mode) — Your Edit just won't persist
    }
  }, [edit, ready]);

  const lov = useCallback(
    (id: string) => setEdit((cur) => (cur.includes(id) ? cur : [...cur, id])),
    [],
  );
  const remove = useCallback(
    (id: string) => setEdit((cur) => cur.filter((x) => x !== id)),
    [],
  );

  const value = useMemo(() => ({ edit, lov, remove }), [edit, lov, remove]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
