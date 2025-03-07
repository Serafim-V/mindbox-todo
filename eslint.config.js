import js from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from "eslint-plugin-prettier"
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/tc': stylisticTs,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': 'warn',
      '@stylistic/tc/padding-line-between-statements': [
        'error',
        {
          blankLine: 'never',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: ['if', 'multiline-let', 'multiline-const'],
        },
        {
          blankLine: 'always',
          prev: ['if', 'multiline-let', 'multiline-const'],
          next: '*',
        },
      ],
      '@stylistic/tc/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['interface', 'type', 'return', 'export'],
        },
        {
          blankLine: 'always',
          prev: ['interface', 'type'],
          next: '*',
        },
        {
          blankLine: 'never',
          prev: ['interface', 'type'],
          next: ['interface', 'type'],
        },
      ],
    },
  },
)
