module.exports = {
  rules: {
    'type-enum': [2, 'always', [
      'feat', // 新功能（feature）
      'fix', // 修补bug
      'refactor', // 更新某功能，性能优化（不是 feat, 不是 fix）
      'style', // 格式化（不影响代码运行的变动）
      'docs', // 文档（documentation）
      'chore', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup，Travis，Jenkins，GitLab CI，Circle等 的配置等)及依赖包升级的提交
      'test', // 增加测试
      'revert', // 回滚某个更早之前的提交
    ]],
    'subject-full-stop': [2, 'never', '.'], // subject结尾不加'.'
    'type-case': [2, 'always', 'lowerCase'], // type小写
    'type-empty': [2, 'never'] // type不为空
  }
}
