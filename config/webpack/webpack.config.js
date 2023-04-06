const { merge, webpackConfig } = require('shakapacker')

// See the shakacode/shakapacker README and docs directory
// for advice on customizing your webpackConfig.

const options = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}

module.exports = merge({}, webpackConfig, options)
