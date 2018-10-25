var path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: path.resolve('./test/example.txt'),
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      // 关于模块配置
      rules: [
        {
          test: /\.txt$/,
          use: {
            loader: path.resolve(__dirname, '../test/loader.js'),
            options: {
              name: 'Beth'
            }
          }
        }
      ]
    },
  }
];