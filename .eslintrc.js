module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 'off',
    'vue/no-v-html': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'linebreak-style': ['error', 'unix'],
  },
  overrides: [
    {
      files: ['translations/**/*.ts'],
      rules: {
        'prettier/prettier': ['error', { printWidth: 2137 }],
      },
    },
  ],
}
