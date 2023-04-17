const { inliningCss, webpackConfig } = require('shakapacker')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const config = require('./base')

if (inliningCss) {
  config.plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: webpackConfig.devServer.port,
      },
    })
  )
}

module.exports = config
