module.exports = {
  parserOptions: {
    ecmaversion: 2019,
  },
  env: {
    mocha: true,
    node: true
  },
  plugins: ['node', 'prettier'],
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  rules: {
    'node/no-unpublished-require': 0,
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  overrides: [{
    files: ['tests/**/*.js'],
    rules: {
      'node/no-unsupported-features/es-syntax': 0
    }
  }]
};
