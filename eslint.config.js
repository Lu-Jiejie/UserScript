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
  },
).removeRules(
  'import/no-duplicates',
  'import/no-self-import',
  'no-console',
)
