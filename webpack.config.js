const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const ENV = process.env.NODE_ENV || 'development'
console.log(`"${ENV}"`)

const pages = [
  'index',
  'login',
  'sign-up'
]

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = path.join(__dirname, "src", 'pages', `${page}.js`)
    return config
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: ENV,
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "src", "assets"), to: path.join(__dirname, 'docs') }
      ],
    })
  ].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: path.join(__dirname, "src", `index.html`),
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  devServer: {
    historyApiFallback: true,
  }
}
//
// new HtmlWebpackPlugin({
//   template: path.join(__dirname, "src", "index.html"),
// })
