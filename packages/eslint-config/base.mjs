import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * Shared ESLint flat config for every TypeScript app in the workspace.
 *
 * App-specific overrides — build-output ignores, framework plugins — belong in
 * each app's own `eslint.config.mjs`, which spreads this array first.
 */
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
