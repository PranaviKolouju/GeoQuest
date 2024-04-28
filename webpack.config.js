const path = require('path');

module.exports = {

  devServer: {
    static: {
      directory: path.join(__dirname, 'src'), 
    },
    mimeTypes: { 'application/wasm': ['wasm'] }, 
    compress: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'self': 'window',
      'globalThis': 'window'
    })
  ]
};