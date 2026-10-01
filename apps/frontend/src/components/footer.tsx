import Link from 'next/link';

export function Footer() {
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
