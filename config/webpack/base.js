const { merge, webpackConfig } = require('shakapacker')

const options = {
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.tsx'],
  },
}

module.exports = merge({}, webpackConfig, options)
