// prettier配置
module.exports = {
  eslintIntegration: true,
  stylelintIntegration: true,
  bracketSpacing: true,
  semi: false, // 不添加行尾分号
  singleQuote: true, // 文件使用单引号
  jsxSingleQuote: true, // jsx 使用单引号
  jsxBracketSameLine: true, // jsx 标签结束符'>'换行
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  trailingComma: 'es5', // 末尾逗号（type 定义除外）
  requirePragma: true,
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 2,
      },
    },
  ],
}
