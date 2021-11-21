var HtmlWebpackPlugin = require('html-webpack-plugin'); var path = require('path');
module.exports = {
  entry: './src/index.js', output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  /*optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 244000,
      minChunks: 2,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
        },
        default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
        }
      }
    }
  }*/
};