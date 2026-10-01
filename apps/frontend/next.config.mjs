/* global process, URL */
// One .env at the repo root is shared with the backend. Next only reads env
// files from its own folder, so load the root one first. Variables already in
// the environment (CI, hosting) win over the file.
try {
  process.loadEnvFile(new URL('../../.env', import.meta.url));
} catch {
  // no root .env (e.g. CI) — defaults below apply
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Only this value is exposed to the browser; secrets in .env are not.
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  },
};

export default nextConfig;
