const webpack = require('webpack');
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css" }, // "style-loader!css-loader?importLoaders=1"
      { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader' } //'url-loader?limit=100000'
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ] : [],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
