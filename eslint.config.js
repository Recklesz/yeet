// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    extends: [
      'prettier', // Disables ESLint rules that conflict with Prettier
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error', // Shows Prettier issues as ESLint errors
    },
  },
]);
