const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 2000,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};