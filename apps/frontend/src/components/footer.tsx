'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AUTH_ROUTES = ['/signin', '/register'];

export function Footer() {
  const pathname = usePathname();
  if (AUTH_ROUTES.includes(pathname)) return null;

  return (
    <footer className="site-footer">
      <div className="footer shell">
        <span>Just Lovedit / Drop 01 / 2026</span>
        <nav aria-label="Footer navigation">
          <Link href="/brands">This drop</Link>
          <Link href="/edit">Your Edit</Link>
        </nav>
      </div>
    </footer>
  );
}
