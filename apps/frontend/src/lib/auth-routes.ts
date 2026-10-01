// Name of the login cookie the API sets (see apps/backend AUTH_COOKIE).
export const AUTH_COOKIE = 'jl_token';

// Pages a signed-out visitor may see. Everything else sends them to /signin.
export const PUBLIC_PATHS = ['/signin', '/register'];

export const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.includes(pathname);
