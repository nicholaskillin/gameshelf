const { inliningCss, merge, webpackConfig } = require('shakapacker')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

if (isDevelopment && inliningCss) {
  webpackConfig.plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: webpackConfig.devServer.port,
      },
    })
  )
}

// See the shakacode/shakapacker README and docs directory
// for advice on customizing your webpackConfig.

const options = {
  resolve: {
    extensions: ['.css', '.js', '.jsx'],
  },
}

module.exports = merge({}, webpackConfig, options)
