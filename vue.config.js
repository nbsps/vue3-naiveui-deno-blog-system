const path = require('path');

module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: '@/views',
        assets: '@/assets',
        components: '@/components',
        utils: '@/utils',
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, './src'),
            path.resolve(
              __dirname,
              './node_modules/async-validator/dist-web/index.js',
            ),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
        {
          test: /\.(cur)(\?.*)?$/,
          use: 'url-loader',
        },
      ],
    },
  },
};
