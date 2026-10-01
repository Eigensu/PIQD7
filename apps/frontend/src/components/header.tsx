'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wordmark } from './marks';
import { useSite } from './site-provider';
import { pad } from '../lib/brands';

const links = [
  { href: '/', label: 'Home', count: false },
  { href: '/brands', label: 'This drop', count: false },
  { href: '/edit', label: 'Your Edit', count: true },
];

export function Header() {
  const pathname = usePathname();
  const { edit } = useSite();
  const [open, setOpen] = useState(false);
  const isAuth = pathname === '/register' || pathname === '/signin';

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="topbar shell">
        <Link href="/" className="logo" aria-label="Just Lovedit home">
          <Wordmark height={34} ink="#151515" accent="#9B1457" />
        </Link>
        <nav
          id="main-nav"
          className={`nav${open ? ' open' : ''}`}
          aria-label="Main navigation"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? 'nav-active' : undefined}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
              {l.count && <span className="count">{pad(edit.length)}</span>}
            </Link>
          ))}
          {!isAuth && (
            <Link href="/register" className="nav-cta">
              Get started
            </Link>
          )}
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
