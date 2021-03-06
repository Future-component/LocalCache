var path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      path: path.resolve(__dirname, '../lib'),
      filename: 'localCache.js',
      library: 'localCache',
      libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    },
  }
];