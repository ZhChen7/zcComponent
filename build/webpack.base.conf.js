const path = require('path')
console.log('base');
module.exports = {
  entry: path.resolve(__dirname, '../src/index'),
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx', '.scss']
  },
}
