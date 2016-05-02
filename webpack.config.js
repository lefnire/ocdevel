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
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
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
