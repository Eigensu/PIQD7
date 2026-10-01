import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, isPublicPath } from './lib/auth-routes';

// Sign-in comes first: a visitor with no login cookie is sent to /signin from
// every other page. This only checks that the cookie exists, to avoid a flash
// of protected pages; the API still verifies the JWT on every request, and
// AuthProvider sends anyone with an expired or invalid cookie back to /signin.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname) || request.cookies.has(AUTH_COOKIE)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/signin';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and static files (anything with a file extension).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*[.].*).*)'],
};
