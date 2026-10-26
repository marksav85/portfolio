import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import hooks from 'eslint-plugin-react-hooks';
export default [
  { ignores: ['node_modules/**', 'dist/**', '.wrangler/**'] },
  {
    ...js.configs.recommended,
    files: ['**/*.cjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  { ...hooks.configs.flat.recommended, files: ['src/**/*.tsx'] },
  ...ts.configs.recommended.map((config) => ({ ...config, files: ['**/*.ts', '**/*.tsx'] })),
];
