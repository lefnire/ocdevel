const {
  override,
  addBabelPresets,
  addWebpackModuleRule
} = require('customize-cra');

module.exports = override(
  // ...addBabelPresets("@babel/preset-env", "@babel/preset-react"),
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