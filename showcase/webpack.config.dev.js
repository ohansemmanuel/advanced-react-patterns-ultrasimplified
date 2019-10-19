const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 4646,
    open: 'Google Chrome',
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true
  },
  devtool: 'source-map'
})
