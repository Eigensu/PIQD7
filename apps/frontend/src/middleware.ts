import { auth } from './auth';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/signin', '/register'];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isPublic = PUBLIC_PATHS.includes(pathname);

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL('/brands', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|icon\\.svg).*)'],
};
