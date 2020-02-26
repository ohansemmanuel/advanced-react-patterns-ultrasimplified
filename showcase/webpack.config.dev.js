const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 4646,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
    historyApiFallback: true
  },
  devtool: 'source-map'
})
