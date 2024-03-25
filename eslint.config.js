const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    rules: {
      // 允许console语句
      'no-console': 'off',
      // 禁止结尾逗号
      'style/comma-dangle': ['error', 'never'],
      // JSON格式不需排序
      'jsonc/sort-keys': 'off'
    }
  }
)
