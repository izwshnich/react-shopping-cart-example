const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.tsx'
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    alias: {
      components: path.join(__dirname, './src/components'),
      contexts: path.join(__dirname, './src/contexts'),
      hooks: path.join(__dirname, './src/hooks'),
      plugins: path.join(__dirname, './src/plugins'),
    }
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3000,
    hot: true,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({ tslint: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
  ]
};