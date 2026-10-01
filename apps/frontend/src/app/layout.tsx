import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteProvider } from '../components/site-provider';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const metadata: Metadata = {
  title: {
    default: 'Just Lovedit — Find your uncommon.',
    template: '%s — Just Lovedit',
  },
  description:
    'One week. Seven labels worth knowing. Lov what stays with you, pass what does not.',
};

export const viewport: Viewport = { themeColor: '#F8F4ED' };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Poppins:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <SiteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
