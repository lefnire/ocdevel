const {
  override,
  addWebpackModuleRule
} = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.mdx$/,
    // use: ['babel-loader', '@mdx-js/loader']
    use: [
      {
          loader: 'babel-loader',
          options: {presets: ['@babel/preset-env', "@babel/preset-react"]}
      },
      '@mdx-js/loader'
    ]
  })
)