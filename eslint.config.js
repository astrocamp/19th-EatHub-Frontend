import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import cypressPlugin from 'eslint-plugin-cypress';

export default defineConfig([
  {
    files: [
      '**/*.{js,mjs,cjs,ts,cts,mts}',
      '**/*.vue',
      'cypress/**/*.js',
      'cypress/**/*.ts',
      '**/*.cy.js',
      '**/*.cy.ts',
    ],
    ignores: ['dist/**', 'node_modules/**'],
    plugins: {
      js,
      vue: pluginVue,
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs['flat/essential'],
]);
