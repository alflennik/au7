const webpack = require('webpack')
const AureliaWebPackPlugin = require('aurelia-webpack-plugin')
const path = require('path')

// Change your configuration based on the environment
// Set by npm scripts in package.json
const isProduction = process.env.NODE_ENV === 'production'
const platform = process.env.PLATFORM // 'default' by default

module.exports = {
  entry: {
    main: [
      './src/main.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'www/dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css?$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'url-loader',
        options: { limit: '25000' }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new AureliaWebPackPlugin(),
    new webpack.DefinePlugin({
      // Allows these constants to be accessed by the aurelia app
      PRODUCTION: JSON.stringify(isProduction),
      PLATFORM: JSON.stringify(platform)
    })
  ],
  devServer: {
    port: 3000
  }
}
