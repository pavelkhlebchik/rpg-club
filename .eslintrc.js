module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'object-curly-newline': ['error', { consistent: true }],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  },
};
