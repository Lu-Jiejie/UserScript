const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
    formatters: {
      markdown: 'prettier',
    },
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
