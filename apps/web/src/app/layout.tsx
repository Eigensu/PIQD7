import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monorepo Template',
  description: 'A minimal Next.js frontend connected to NestJS.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
